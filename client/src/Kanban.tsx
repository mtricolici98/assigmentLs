import {Box, Stack} from "@mui/material";
import {DragDropContext, Droppable, DropResult, ResponderProvided} from 'react-beautiful-dnd'
import request from 'graphql-request'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {graphql} from './gql'
import {useCallback, useState} from "react";
import {DraggableKanbanList} from "./components/DraggableKanbanList";
import {KanbanQuery} from "./gql/graphql";

const GRAPHQL_SERVER = 'http://localhost:4000/graphql';

const KANBAN_QUERY = graphql(/* GraphQL */`
    query Kanban {
        board {
            id
            name
            itemsOrder
            Items {
                id
                title
                done
                Images {
                base64data
                }
            }
        }
    }
`)

const MUTATE_MOVE_ITEM = graphql(/* GraphQL */`
    mutation MoveItem($itemId: Int!, $toListId: Int!, $afterItemId: Int!, $doneIncluded: Boolean!) {
        moveItem(itemId: $itemId, toListId: $toListId, afterItemId: $afterItemId, doneIncluded: $doneIncluded) {
            id
            name
            itemsOrder
            Items {
                id
                title
                done
                Images {
                base64data
                }
            }
        }
    }
`)

export function Kanban() {
    const {data} = useQuery({
        queryKey: ['board'],
        queryFn: async () =>
            request(
                GRAPHQL_SERVER,
                KANBAN_QUERY,
            ),
    });

    const client = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (variables: {
            itemId: number,
            toListId: number,
            afterItemId: number,
            doneIncluded: boolean
        }) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_MOVE_ITEM,
                variables,
            ),
        //optimistic update
        // This is cool...
        onMutate: async ({afterItemId, itemId, toListId}) => {
            // This shows an error that KanbanQuery has no attribute board,
            // I have not found a way to fix it but ignoring works just as well....
            client.setQueryData(['board'], (old: KanbanQuery | undefined) => {
                if (!old) return old;
                const board = old.board
                const columnFrom = board.find(column => column.Items.find(item => item.id === itemId))
                const columnTo = board.find(column => column.id === toListId)
                if (!columnFrom || !columnTo) {
                    throw new Error('Column not found')
                }
                const item = columnFrom.Items.find(item => item.id === itemId)
                if (!item) {
                    throw new Error('Item not found')
                }
                columnFrom.Items = columnFrom.Items.filter(item => item.id !== itemId)
                let afterItemIndex = 0
                if (afterItemId) {
                    afterItemIndex = columnTo.Items.map((el) => el.id).indexOf(afterItemId)
                }
                columnTo.Items.splice(afterItemIndex, 0, item)
                return {board}
            })
        },
        // update
        onSuccess: (data, variables) => {
            client.setQueryData(['board'], {board: data.moveItem})
        }
    });

    const handleOnDragEnd = useCallback(async (result: DropResult, provided: ResponderProvided) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index && result.source.droppableId === result.destination.droppableId) return;
        if (result.reason === 'CANCEL') return;
        if (result.type === 'item' || (result.type === 'column' && result.destination.droppableId === 'kanban')) {
            const boardId = Number(result.destination.droppableId)
            let afterItemId = -1;
            const localData = client.getQueryData<KanbanQuery>(['board']);
            if (result.destination.index >= 0) {
                const destinationBoard = localData?.board.find((el) => el.id == boardId);
                if (!destinationBoard) {
                    return;
                }
                const afterItem = destinationBoard.Items[result.destination.index];
                afterItemId = afterItem.id;
            }
            await mutation.mutate({
                itemId: Number(result.draggableId),
                toListId: boardId,
                afterItemId: afterItemId,
                doneIncluded: true
            });
        }

    }, [])

    return (
        <Box sx={{paddingBottom: 4}}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId={'kanban'} direction={'horizontal'} type={'column'}>
                    {(provided) => (
                        <Stack spacing={2} margin={5} direction="row"
                               ref={provided.innerRef}
                               {...provided.droppableProps}
                        >
                            {
                                data?.board.map((list, index) => (
                                    <DraggableKanbanList key={list.id} id={list.id} title={list.name} items={list.Items}
                                                         index={index}/>
                                ))
                            }
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
}

export default Kanban;