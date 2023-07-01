import {graphql} from "../gql";

export const KANBAN_QUERY = graphql(/* GraphQL */`
    query Kanban {
        boards {
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
                    columnId
                    images {
                        id
                        base64data
                    }
                }
            }
        }
    }
`)


export const MUTATE_MOVE_ITEM = graphql(/* GraphQL */`
    mutation MoveItem($itemId: Int!, $toListId: Int!, $afterItemId: Int!, $doneIncluded: Boolean!) {
        moveItem(itemId: $itemId, toListId: $toListId, afterItemId: $afterItemId, doneIncluded: $doneIncluded) {
        id
        columnsOrder
        columns {
            id
            name
            itemsOrder
            items {
                id
                title
                columnId
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


export const MUTATE_MOVE_COLUMN = graphql(/* GraphQL */`
    mutation MoveColumn($columnId: Int!, $afterColumnId: Int!, $doneIncluded: Boolean!) {
        moveColumn(columnId: $columnId, afterColumnId: $afterColumnId, doneIncluded: $doneIncluded) {
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
                columnId
                images {
                    id
                    base64data
                }
            }
        }
    }
}
`)
