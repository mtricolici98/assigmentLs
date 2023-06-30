import prisma from "../db";
import {Column, Item} from "@prisma/client";

class columnMutations {

    private static async calculateNewOrder(column: Column, item: Item, afterItemId: number) {
        /*
        * We allow null for afterItemId just in case it's the first in the list
        * */
        const itemsOrder = column.itemsOrder.split('|').filter((el) => el).map(
            (el) => Number(el)
        )
        let indexAfter = 0
        if (afterItemId != -1) {
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

    static async moveItem({itemId, toListId, afterItemId, doneIncluded}: {
        itemId: number,
        toListId: number,
        afterItemId: number,
        doneIncluded: boolean
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
        if (itemToMove.columnId !== columnTo.id) {
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
        }
        await this.calculateNewOrder(columnTo, itemToMove, afterItemId);
        return prisma.column.findMany(
            {
                include: {
                    Items: {
                        where: doneIncluded ? undefined : {done: false},
                        include: {
                            Images: true
                        }
                    }
                }
            }
        )
    }

}

const itemMutations = {
    moveItem: columnMutations.moveItem,
}

export default itemMutations;