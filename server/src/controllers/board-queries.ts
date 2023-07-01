import prisma from "../db";

export class BoardQueries {
    static async boards({includeDone}: { includeDone: boolean }) {
        const boards = await prisma.board.findMany(
            {
                include: {
                    columns: {
                        include: {
                            items: {
                                where: includeDone ? undefined : {done: false},
                                include: {
                                    images: true
                                }
                            }
                        }
                    }
                }
            }
        )
        for (const board of boards) {
            for (const column of board.columns) {
                column.items.sort(
                    (a, b) => column.itemsOrder.indexOf(
                        a.id.toString()) - column.itemsOrder.indexOf(b.id.toString()
                    )
                )
            }
            board.columns.sort(
                (a, b) =>
                    board.columnsOrder.indexOf(a.id.toString()) - board.columnsOrder.indexOf(b.id.toString())
            )
        }
        return boards
    }
}


const boardQueries: any = {
    boards: BoardQueries.boards
};

export default boardQueries;