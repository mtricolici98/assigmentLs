const kanban = [
    {
        id: 1,
        name: 'Todo',
        items: [
            {
                id: 1,
                name: 'Item 1',
                done: false
            },
            {
                id: 2,
                name: 'Item 2',
                done: false
            }
        ]
    },
    {
        id: 2,
        name: 'Doing',
        items: [
            {
                id: 3,
                name: 'Item 3',
                done: false
            },
        ],
    },
    {
        id: 3,
        name: 'Done',
        items: [
            {
                id: 4,
                name: 'Item 4',
                done: true
            }
        ]
    }
];


import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.board.deleteMany();
    await prisma.image.deleteMany();
    await prisma.item.deleteMany();
    await prisma.column.deleteMany();
    const board = await prisma.board.create(
        {}
    )
    const columIds = []
    for (const category of kanban) {
        const column = await prisma.column.create(
            {
                data: {
                    name: category.name,
                    itemsOrder: '',
                    board: {
                        connect: {
                            id: board.id
                        }
                    }
                },
            }
        )
        columIds.push(column.id)
        const taskIds = []
        for (const item of category.items) {
            const task = await prisma.item.create(
                {
                    data: {
                        title: item.name,
                        column: {
                            connect: {
                                id: column.id
                            }
                        }
                    }
                }
            )
            taskIds.push(task.id)
        }
        await prisma.column.update(
            {
                where: {
                    id: column.id
                },
                data: {
                    itemsOrder: taskIds.map(el => el.toString()).join('|')
                }
            }
        )
    }
    await prisma.board.update(
        {
            where: {
                id: board.id
            },
            data: {
                columnsOrder: columIds.map(el => el.toString()).join('|')
            }
        }
    )
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })