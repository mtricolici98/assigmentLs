import {KanbanBoard} from "../gql/graphql";


export function getBoardByItemId(boards: KanbanBoard[], itemId: number) {
    return boards.find(
        board_ => board_.columns.find(
            column => column.items.find(
                item => item.id == itemId
            )
        )
    )
}

export function getBoardByColumnId(boards: KanbanBoard[], columnId: number) {
    return boards.find(
        board_ => board_.columns.find(
            column => column.id === columnId
        )
    )

}