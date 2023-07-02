import {QueryClient, useMutation} from "@tanstack/react-query";
import {GRAPHQL_SERVER} from "../constants";
import {KanbanColumn, KanbanItem, KanbanQuery} from "../gql/graphql";
import {getBoardByColumnId, getBoardByItemId} from "../utils/BoardUtils";
import {MUTATE_ADD_ITEM, MUTATE_DONE_ITEM, MUTATE_UPDATE_ITEM} from "../queries/ItemQueries";
import request from "graphql-request";
import {MUTATE_ADD_COLUMN, MUTATE_UPDATE_COLUMN} from "../queries/ColumnQueries";


export function useColumnUpdateMutation(client: QueryClient) {
    return useMutation({
        mutationFn: async (variables: {
            columnId: number,
            newTitle: string
        }) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_UPDATE_COLUMN,
                variables,
            ),
        // update
        onSuccess: (data, variables) => {
            client.setQueryData(['boards'], {boards: data.updateColumn})
        }
    });
}

export function useColumnAddMutation(client: QueryClient) {
    return useMutation({
        mutationFn: async (variables: {
            title: string,
            boardId: number
        }) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_ADD_COLUMN,
                variables,
            ),
        onMutate: async ({title, boardId}) => {
            client.setQueryData(['boards'], (old: KanbanQuery | undefined) => {
                if (!old) return old;
                const boards = old.boards
                const board = boards.find(el => el.id == boardId)
                if (!board) {
                    return old;
                }
                const column: KanbanColumn = {id: -1, name: title, items: [], itemsOrder: ''}
                board.columns.push(column)
                return {boards}
            })
        },
        // update
        onSuccess: (data, variables) => {
            client.setQueryData(['boards'], {boards: data.createColumn})
        }
    });
}