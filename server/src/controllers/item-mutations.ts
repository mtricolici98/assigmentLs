import prisma from "../db";
import {Column, Item} from "@prisma/client";

class columnMutations {

    private static async calculateNewOrder(column: Column, item: Item, afterItemId: number | null) {
        /*
        * We allow null for afterItemId just in case it's the first in the list
        * */
        const itemsOrder = column.itemsOrder.split('|').filter((el) => el).map(
            (el) => Number(el)
        )
        let indexAfter = 0
        if (afterItemId) {
            indexAfter = itemsOrder.indexOf(afterItemId)
        }
        itemsOrder.splice(indexAfter, 0, item.id)
        await prisma.column.update(
            {
                where: {
                    id: column.id
                },
                data: {
                    itemsOrder: itemsOrder.map(el => el.toString()).join('|')
                }
            }
        )
    }

    static async moveItem({itemId, toListId, afterItemId}: {
        itemId: number,
        toListId: number,
        afterItemId: number | null
    }) {
        /*
         * afterItemid could be null in case it's the first item in the list, thus we set it as first
         */
        const itemToMove = await prisma.item.findUnique(
            {
                where: {
                    id: itemId,
                },
                include: {
                    column: true
                }
            }
        )
        const columnTo = await prisma.column.findUnique(
            {
                where: {
                    id: toListId
                }
            }
        )
        if (!itemToMove) {
            throw new Error('Item to move not found')
        }
        if (!columnTo) {
            throw new Error('Destination column not found')
        }
        // Updating FK ref
        prisma.item.update(
            {
                where: {
                    id: itemToMove.id
                },
                data: {
                    columnId: columnTo.id
                }
            }
        )
        await this.calculateNewOrder(columnTo, itemToMove, afterItemId);
        return prisma.column.findMany(
            {
                include: {
                    Items: true
                }
            }
        )
    }

    static async reOrderItem({itemId, afterItemId}: { itemId: number, afterItemId: number }) {
        const item = await prisma.item.findUnique(
            {
                where: {
                    id: itemId
                },
                include: {
                    column: true
                }
            }
        )
        if (!item) {
            throw new Error('Item not found')
        }
        const column = await item?.column
        if (!column) {
            throw new Error('Item with no column ?!')
        }
        await this.calculateNewOrder(column, item, afterItemId)
        return prisma.column.findMany(
            {
                include: {
                    Items: true
                }
            }
        )
    }

}

const itemMutations = {
    moveItem: columnMutations.moveItem,
    reOrderItem: columnMutations.reOrderItem,
}

export default itemMutations;