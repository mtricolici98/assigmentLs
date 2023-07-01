import {Box, Stack} from "@mui/material";
import {DragDropContext, Droppable, DropResult, ResponderProvided} from 'react-beautiful-dnd'
import request from 'graphql-request'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {useCallback} from "react";
import {DraggableKanbanList} from "./DraggableKanbanList";
import {KanbanQuery} from "../../gql/graphql";
import {getBoardByColumnId} from "../../utils/BoardUtils";
import {useColumnBoardMutation, useItemBoardMutation} from "../../mutations/BoardMutations";
import {GRAPHQL_SERVER} from "../../constants";
import {KANBAN_QUERY} from "../../queries/BoardQueries";


export function Kanban() {
    const {data} = useQuery({
        queryKey: ['boards'],
        queryFn: async () =>
            request(
                GRAPHQL_SERVER,
                KANBAN_QUERY,
            ),
    });

    const client = useQueryClient()

    const itemMutation = useItemBoardMutation(client);
    const columnMutation = useColumnBoardMutation(client);

    const handleDragEnd = useCallback(async (result: DropResult, provided: ResponderProvided) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index && result.source.droppableId === result.destination.droppableId) return;
        if (result.reason === 'CANCEL') return;
        if (result.type === 'item') {
            const columnId = Number(result.destination.droppableId)
            let afterItemId = -1;
            const localData = client.getQueryData<KanbanQuery>(['boards']);
            if (result.destination.index > 0) {
                const destinationBoard = getBoardByColumnId(
                    localData?.boards || [],
                    columnId
                )
                if (!destinationBoard) {
                    return;
                }
                const destinationColumn = destinationBoard.columns.find(
                    el => el.id === columnId
                )
                if (!destinationColumn) {
                    return;
                }
                const afterItem = destinationColumn.items[result.destination.index - 1];
                afterItemId = afterItem.id;
            }
            await itemMutation.mutate({
                itemId: Number(result.draggableId.split('.')[1]),
                toListId: columnId,
                afterItemId: afterItemId,
                doneIncluded: true
            });
        }
        if (result.type === 'column') {
            const columnId = Number(result.draggableId.split('.')[1]);

            let afterColumnId = -1;
            if (result.destination.index > 0) {
                const data = client.getQueryData<KanbanQuery>(['boards']);
                if (!data) {
                    return
                }
                const board = data.boards.find(el => el.id.toString() === result.destination?.droppableId);
                if (!board) {
                    return
                }
                const afterColumn = board.columns[result.destination.index - 1]
                afterColumnId = afterColumn.id;
            }
            await columnMutation.mutate(
                {
                    columnId,
                    afterColumnId,
                    doneIncluded: true
                }
            )
        }

    }, [])

    return (
        <Box>
            {
                data?.boards.map(
                    el => (
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId={el.id.toString()} direction={'horizontal'} type={'column'}>
                                {(provided) => (
                                    <Stack spacing={2} margin={5}
                                           direction="row"
                                           ref={provided.innerRef}
                                           {...provided.droppableProps}
                                    >
                                        {
                                            el.columns.map((list, index) => (
                                                <DraggableKanbanList key={list.id} id={list.id} title={list.name}
                                                                     items={list.items}
                                                                     index={index}/>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </Stack>
                                )}
                            </Droppable>
                        </DragDropContext>
                    ))
            }
        </Box>
    );
}

export default Kanban;