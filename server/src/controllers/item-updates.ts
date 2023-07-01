import prisma from "../db";
import ItemMutations from "./item-mutations";
import boardQueries from "./board-queries";
import BoardQueries from "./board-queries";

class ItemUpdates {

    static async createItem({title, columnId}: { title: string, columnId: number }) {
        const newItem = await prisma.item.create(
            {
                data: {
                    title: title,
                    column: {
                        connect: {
                            id: columnId,
                        }
                    }
                },
                include: {
                    column: true
                }
            }
        )
        const oldOrder = newItem.column.itemsOrder.split('|')
        oldOrder.push(newItem.id.toString())
        await prisma.column.update(
            {where: {id: columnId}, data: {itemsOrder: oldOrder.join('|')}}
        )
        return BoardQueries.boards()

    }


    static async updateItem({itemId, newTitle}: { itemId: number, newTitle: string }) {
        const item = await prisma.item.update(
            {
                where: {
                    id: itemId,
                },
                data: {
                    title: newTitle,
                },
                include: {
                    column: true
                }
            }
        )
        return item
    }

    static async setDone({itemId, done}: { itemId: number, done: boolean }) {
        return prisma.item.update(
            {
                where: {
                    id: itemId,
                },
                data: {
                    done: done,
                },
                include: {
                    column: true
                }
            }
        )
    }

    static async deleteItem({itemId}: { itemId: number }) {
        const toDelete = await prisma.item.findUnique(
            {
                where: {id: itemId},
                include: {
                    column: true
                }
            }
        )
        if (!toDelete) {
            return;
        }
        await prisma.item.delete(
            {
                where: {id: itemId}
            }
        )
        return toDelete.column
    }

    static async addImage({itemId, imageData}: { itemId: number, imageData: string }) {
        // TODO: Implement
    }

}

const itemUpdates = {
    createItem: ItemUpdates.createItem,
    updateItem: ItemUpdates.updateItem,
    setDone: ItemUpdates.setDone,
    deleteItem: ItemUpdates.deleteItem
}


export default itemUpdates;