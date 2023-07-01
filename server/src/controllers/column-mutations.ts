import prisma from "../db";
import {Board, Column, Item} from "@prisma/client";
import logger from "../utils/logging";
import boardQueries from "./board-queries";

class ColumnMutations {

    private static async calculateNewOrder(board: Board, item: Column, afterColumnId: number) {
        /*
        * We allow null for afterItemId just in case it's the first in the list
        * */
        let columnsOrder = board.columnsOrder.split('|').filter((el) => el).map(
            (el) => Number(el)
        )
        logger.info(`Old columns are ${columnsOrder}`,)
        let indexAfter = 0
        if (afterColumnId != -1) {
            indexAfter = columnsOrder.indexOf(afterColumnId) + 1
        }
        columnsOrder = columnsOrder.filter((id) => id != item.id)
        if (!columnsOrder.length) {
            // Could be that the order is empty
            columnsOrder.push(item.id)
        } else {
            columnsOrder.splice(indexAfter, 0, item.id)
        }
        const newColumnsOrder = columnsOrder.map(el => el.toString()).join('|')
        logger.info(`New columns are ${columnsOrder}`)
        await prisma.board.update(
            {
                where: {
                    id: board.id
                },
                data: {
                    columnsOrder: newColumnsOrder
                }
            }
        )
    }

    static async moveColumn({columnId, afterColumnId, doneIncluded}: {
        columnId: number,
        afterColumnId: number,
        doneIncluded: boolean
    }) {
        /*
         * afterItemid could be null in case it's the first item in the list, thus we set it as first
         */

        const columnToMove = await prisma.column.findUnique(
            {
                where: {
                    id: columnId,
                },
                include: {
                    board: true
                }
            }
        )
        if (!columnToMove) {
            throw new Error('Column not found')
        }
        logger.info(`Moving ${columnToMove.name} to ${afterColumnId}`)
        await ColumnMutations.calculateNewOrder(columnToMove.board, columnToMove, afterColumnId);
        return boardQueries.boards({includeDone: doneIncluded})
    }

}

const columnsMutations = {
    moveColumn: ColumnMutations.moveColumn,
}

export default columnsMutations;