import prisma from "../db";
import ItemMutations from "./item-mutations";

class ItemUpdates {

    static async createItem({title, columnId}: { title: string, columnId: number }) {
        return prisma.item.create(
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
    }


    static async updateItem({id, newTitle}: { id: number, newTitle: string }) {
        return prisma.item.update(
            {
                where: {
                    id: id,
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

    static async setDone({id, done}: { id: number, done: boolean }) {
        return prisma.item.update(
            {
                where: {
                    id: id,
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

    static async addImage({itemId, imageData}: { itemId: number, imageData: string }) {
        // TODO: Implement
    }

}

const itemUpdates = {
    createItem: ItemUpdates.createItem,
    updateItem: ItemUpdates.updateItem,
    setDone: ItemUpdates.setDone
}


export default itemUpdates;