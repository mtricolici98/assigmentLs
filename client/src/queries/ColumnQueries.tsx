import {graphql} from "../gql";

export const MUTATE_UPDATE_COLUMN = graphql(/* GraphQL */`
    mutation UpdateColumn($columnId: Int!, $newTitle: String!) {
        updateColumn(columnId: $columnId, newTitle: $newTitle) {
            id
            columnsOrder
            columns {
                id
                name
                itemsOrder
                items {
                    id
                    title
                    done
                    images {
                        id
                        base64data
                    }
                }
            }
        }
    }
`)



export const MUTATE_ADD_COLUMN = graphql(/* GraphQL */`
    mutation AddColumn($title: String!, $boardId: Int!) {
        # returns the entire board
        createColumn(title: $title, boardId: $boardId) {
            id
            columnsOrder
            columns {
                id
                name
                itemsOrder
                items {
                    id
                    title
                    done
                    images {
                        id
                        base64data
                    }
                }
            }
        }
    }
`)



export const MUTATE_DELETE_COLUMN = graphql(/* GraphQL */`
    mutation DeleteColumn($columnId: Int!) {
        deleteColumn(columnId: $columnId) {
            id
            columnsOrder
            columns {
                id
                name
                itemsOrder
                items {
                    id
                    title
                    done
                    images {
                        id
                        base64data
                    }
                }
            }
        }
    }
`)