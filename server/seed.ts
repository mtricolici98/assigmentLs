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
    for (const category of kanban) {
        const column = await prisma.column.upsert(
            {
                create: {
                    name: category.name,
                    itemsOrder: '',
                },
                where: {
                    id: category.id
                },
                update: {
                    name: category.name,
                    itemsOrder: '',
                }
            }
        )
        for (const item of category.items) {
            const task = await prisma.item.upsert(
                {
                    where: {
                        id: item.id,
                    },
                    create: {
                        title: item.name,
                        column: {
                            connect: {
                                id: column.id
                            }
                        }
                    }, update: {
                        title: item.name,
                        column: {
                            connect: {
                                id: column.id
                            }
                        }
                    }
                }
            )
        }
        prisma.column.update(
            {
                where: {
                    id: column.id
                },
                data: {
                    itemsOrder: category.items.map(el => el.id).join('|')
                }
            }
        )
    }
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