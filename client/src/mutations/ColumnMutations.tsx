import {QueryClient, useMutation} from "@tanstack/react-query";
import {GRAPHQL_SERVER} from "../constants";
import {KanbanColumn, KanbanQuery} from "../gql/graphql";
import {getBoardByColumnId} from "../utils/BoardUtils";
import request from "graphql-request";
import {MUTATE_ADD_COLUMN, MUTATE_DELETE_COLUMN, MUTATE_UPDATE_COLUMN} from "../queries/ColumnQueries";


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
        onMutate: async ({columnId, newTitle}) => {
            client.setQueryData(['boards'], (old: KanbanQuery | undefined) => {
                if (!old) return old;
                const boards = old.boards
                const board = getBoardByColumnId(boards, columnId);
                if (!board) {
                    return old;
                }
                const column = board.columns.find(column => column.id == columnId)
                if (!column) {
                    return old;
                }
                column.name = newTitle;
                return {boards}
            })
        },
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


export function useColumnDeleteMutation(client: QueryClient) {
    return useMutation({
        mutationFn: async (variables: {
            columnId: number,
        }) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_DELETE_COLUMN,
                variables,
            ),
        onMutate: ({columnId}) => {
            client.setQueryData(['boards'], (old: KanbanQuery | undefined) => {
                if (!old) return old;
                const boards = old.boards
                const board = getBoardByColumnId(boards, columnId);
                if (!board) {
                    return old;
                }
                board.columns = board.columns.filter(column => column.id == columnId);
                return {boards}
            })
        },
        // update
        onSuccess: (data, variables) => {
            client.setQueryData(['boards'], {boards: data.deleteColumn})
        }
    });
}