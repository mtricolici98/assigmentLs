import prisma from "../db";
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
        return BoardQueries.boards({includeDone: false})

    }


    static async updateItem({itemId, newTitle}: { itemId: number, newTitle: string }) {
        return await prisma.item.update(
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
    }

    static async setDone({itemId, done}: { itemId: number, done: boolean }) {
        await prisma.item.update(
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
        return BoardQueries.boards({includeDone: false})
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
        return BoardQueries.boards({includeDone: false})
    }

    static async addImage({itemId, imageSrc}: { itemId: number, imageSrc: string }) {
        await prisma.image.create(
            {
                data: {
                    base64data: imageSrc,
                    item: {
                        connect: {
                            id: itemId
                        }
                    }
                },
            }
        )
        return BoardQueries.boards({includeDone: false})
    }

}

const itemUpdates = {
    createItem: ItemUpdates.createItem,
    updateItem: ItemUpdates.updateItem,
    setDone: ItemUpdates.setDone,
    deleteItem: ItemUpdates.deleteItem,
    addImage: ItemUpdates.addImage,
}


export default itemUpdates;