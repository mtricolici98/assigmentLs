import {QueryClient, useMutation} from "@tanstack/react-query";
import {KanbanQuery} from "../gql/graphql";
import {getBoardByColumnId} from "../utils/BoardUtils";
import {GRAPHQL_SERVER} from "../constants";
import {MUTATE_MOVE_COLUMN, MUTATE_MOVE_ITEM} from "../queries/BoardQueries";
import request from "graphql-request";

export function useItemBoardMutation(client: QueryClient) {
    return useMutation({
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
            client.setQueryData(['boards'], (old: KanbanQuery | undefined) => {
                if (!old) return old;
                const boards = old.boards
                const board = getBoardByColumnId(boards, toListId);
                if (!board) {
                    return old;
                }
                const columnFrom = board.columns.find(column => column.items.find(item => item.id === itemId))
                const columnTo = board.columns.find(column => column.id === toListId)
                if (!columnFrom || !columnTo) {
                    throw new Error('Column not found')
                }
                const item = columnFrom.items.find(item => item.id === itemId)
                if (!item) {
                    throw new Error('Item not found')
                }
                columnFrom.items = columnFrom.items.filter(item => item.id !== itemId)
                let afterItemIndex = 0
                if (afterItemId) {
                    afterItemIndex = columnTo.items.map((el) => el.id).indexOf(afterItemId) + 1
                }
                columnTo.items.splice(afterItemIndex, 0, item)
                return {boards}
            })
        },
        // update
        onSuccess: (data, variables) => {
            client.setQueryData(['boards'], {boards: data.moveItem})
        }
    });
}

export function useColumnBoardMutation(client: QueryClient) {
    return useMutation({
        mutationFn: async (variables: {
            columnId: number,
            afterColumnId: number,
            doneIncluded: boolean
        }) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_MOVE_COLUMN,
                variables,
            ),
        //optimistic update
        // This is cool...
        onMutate: async ({columnId, afterColumnId}) => {
            client.setQueryData(['boards'], (old: KanbanQuery | undefined) => {
                if (!old) return old;
                const boards = old.boards
                const board = getBoardByColumnId(
                    boards || [],
                    columnId);
                if (!board) {
                    return old;
                }
                const columnToMove = board.columns.find(
                    column => column.id === columnId
                )
                if (!columnToMove) {
                    return old;
                }
                let afterColumnIndex = 0
                board.columns = board.columns.filter(column => column.id !== columnId)
                if (afterColumnId) {
                    afterColumnIndex = board.columns.map((el) => el.id).indexOf(afterColumnId) + 1
                }
                board.columns.splice(afterColumnIndex, 0, columnToMove)
                return {boards}
            })
        },
        // update
        onSuccess: (data, variables) => {
            client.setQueryData(['boards'], {boards: data.moveColumn})
        }
    });
}