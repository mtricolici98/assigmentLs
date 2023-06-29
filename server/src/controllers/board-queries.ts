import prisma from "../db";
import {it} from "node:test";

class BoardQueries {
    static async board({includeDone}: { includeDone: boolean }) {
        return prisma.column.findMany(
            {
                include: {
                    Items: {
                        // Querying only not-done items by default
                        // Hope undefined works as intended...
                        where: includeDone ? undefined : {done: false},
                        include: {
                            Images: true
                        }
                    }
                }
            }
        )
    }
}


const boardQueries: any = {
    board: BoardQueries.board
};

export default boardQueries;