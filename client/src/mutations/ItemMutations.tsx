import {QueryClient, useMutation} from "@tanstack/react-query";
import {GRAPHQL_SERVER} from "../constants";
import {KanbanItem, KanbanQuery} from "../gql/graphql";
import {getBoardByColumnId, getBoardByItemId} from "../utils/BoardUtils";
import {MUTATE_ADD_ITEM, MUTATE_DELETE_ITEM, MUTATE_DONE_ITEM, MUTATE_UPDATE_ITEM} from "../queries/ItemQueries";
import request from "graphql-request";


export function useItemUpdateMutations() {
    return useMutation({
        mutationFn: async (variables: {
            itemId: number,
            newTitle: string,
            instance: KanbanItem
        }) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_UPDATE_ITEM,
                variables,
            ),
        // update
        onSuccess: (data, variables) => {
            variables.instance.title = data.updateItem.title
        }
    });
}

export function useItemDoneMutation(client: QueryClient) {
    return useMutation({
        mutationFn: async (variables: {
            itemId: number,
            done: boolean,
            instance: KanbanItem
        }) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_DONE_ITEM,
                variables,
            ),
        onMutate: ({itemId, done}) => {
            client.setQueryData(['boards'], (old: KanbanQuery | undefined) => {
                if (!old) return old;
                const boards = old.boards
                const board = getBoardByItemId(boards, itemId);
                if (!board) {
                    return old;
                }
                const column = board.columns.find(column => column.items.find(item => itemId === item.id));
                if (!column) {
                    throw new Error('Column not found')
                }
                const item = column.items.find(item => item.id === itemId);
                if (item) {
                    item.done = done
                }
                column.items = column.items.filter(el => el != item)
                return {boards}
            })
        },
        // update
        onSuccess: (data, variables) => {
            client.setQueryData(['boards'], {boards: data.setDone})
        }
    });
}


export function useItemDeleteMutation(client: QueryClient) {
    return useMutation({
        mutationFn: async (variables: {
            itemId: number,
        }) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_DELETE_ITEM,
                variables,
            ),
        onMutate: ({itemId}) => {
            client.setQueryData(['boards'], (old: KanbanQuery | undefined) => {
                if (!old) return old;
                const boards = old.boards
                const board = getBoardByItemId(boards, itemId);
                if (!board) {
                    return old;
                }
                const column = board.columns.find(column => column.items.find(item => itemId === item.id));
                if (!column) {
                    throw new Error('Column not found')
                }
                column.items = column.items.filter(el => el.id != itemId);
                return {boards}
            })
        },
        // update
        onSuccess: (data, variables) => {
            client.setQueryData(['boards'], {boards: data.deleteItem})
        }
    });
}

export function useItemAddMutations(client: QueryClient) {
    return useMutation({
        mutationFn: async (variables: {
            title: string,
            columnId: number
        }) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_ADD_ITEM,
                variables,
            ),
        onMutate: async ({title, columnId}) => {
            client.setQueryData(['boards'], (old: KanbanQuery | undefined) => {
                if (!old) return old;
                const boards = old.boards
                const board = getBoardByColumnId(boards, columnId);
                if (!board) {
                    return old;
                }
                const column = board.columns.find(column => column.id === columnId);
                if (!column) {
                    throw new Error('Column not found')
                }
                // Generating some stale data
                const item: KanbanItem = {id: -1, title: title, done: false}
                column.items.push(item)
                return {boards}
            })
        },
        // update
        onSuccess: (data, variables) => {
            client.setQueryData(['boards'], {boards: data.createItem})
        }
    });
}