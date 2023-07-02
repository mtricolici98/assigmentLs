import {graphql} from "../gql";

export const MUTATE_UPDATE_ITEM = graphql(/* GraphQL */`
    mutation UpdateItem($itemId: Int!, $newTitle: String!) {
        updateItem(itemId: $itemId, newTitle: $newTitle) {
            id
            title
            done
            images {
                id
                base64data
            }
        }
    }
`)



export const MUTATE_ADD_ITEM = graphql(/* GraphQL */`
    mutation AddItem($title: String!, $columnId: Int!) {
        # returns the entire board
        createItem(title: $title, columnId: $columnId) {
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



export const MUTATE_DONE_ITEM = graphql(/* GraphQL */`
    mutation setDone($itemId: Int! $done: Boolean!) {
        setDone(itemId: $itemId, done: $done) {
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

export const MUTATE_DELETE_ITEM = graphql(/* GraphQL */`
    mutation DeleteItem($itemId: Int!) {
        deleteItem(itemId: $itemId) {
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