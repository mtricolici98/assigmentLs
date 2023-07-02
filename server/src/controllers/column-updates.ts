import prisma from "../db";
import ItemMutations from "./item-mutations";
import boardQueries from "./board-queries";
import BoardQueries from "./board-queries";

class ColumnUpdates {

    static async createColumn({title, boardId}: { title: string, boardId: number }) {
        const newItem = await prisma.column.create(
            {
                data: {
                    name: title,
                    board: {
                        connect: {
                            id: boardId,
                        }
                    },
                    itemsOrder: ''
                },
                include: {
                    board: true
                }
            }
        )
        const oldOrder = newItem.board.columnsOrder.split('|')
        oldOrder.push(newItem.id.toString())
        await prisma.board.update(
            {where: {id: boardId}, data: {columnsOrder: oldOrder.join('|')}}
        )
        return BoardQueries.boards({includeDone: false})

    }


    static async updateColumn({columnId, newTitle}: { columnId: number, newTitle: string }) {
        const item = await prisma.column.update(
            {
                where: {
                    id: columnId,
                },
                data: {
                    name: newTitle,
                },
                include: {
                    board: true
                }
            }
        )
        return item
    }

    static async deleteColumn({columnId}: { columnId: number }) {
        const toDelete = await prisma.column.findUnique(
            {
                where: {id: columnId},
                include: {
                    board: true
                }
            }
        )
        if (!toDelete) {
            return;
        }
        await prisma.item.delete(
            {
                where: {id: columnId}
            }
        )
        return toDelete.board
    }

}

const columnUpdates = {
    createColumn: ColumnUpdates.createColumn,
    updateColumn: ColumnUpdates.updateColumn,
    deleteColumn: ColumnUpdates.deleteColumn
}


export default columnUpdates;