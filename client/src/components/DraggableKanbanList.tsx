import {Draggable, Droppable} from "react-beautiful-dnd";
import {KanbanList} from "./KanbanList";
import {Button, Stack} from "@mui/material";
import {DraggableKanbanItem} from "./DraggableKanbanItem";

export function DraggableKanbanList({
                                        index,
                                        title, items, id
                                    }: { title: string, id: number, items: { id: number, title: string, done: boolean }[], index: any }) {
    return <Draggable draggableId={id.toString()} index={index}>
        {(provided) => (
            <KanbanList
                title={title}
                {...provided.draggableProps} {...provided.dragHandleProps}
                ref={provided.innerRef}>
                <Droppable droppableId={id.toString()}
                           direction={'vertical'} type={'item'}>
                    {(provided) => (
                        <Stack spacing={2} ref={provided.innerRef}
                               {...provided.droppableProps}>
                            {
                                items.map((item, index) => (
                                    <DraggableKanbanItem key={item.id} item={item} index={index}/>
                                ))
                            }
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
                <Button>Add item</Button>
            </KanbanList>
        )}
    </Draggable>;
}