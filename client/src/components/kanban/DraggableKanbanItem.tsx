import {Draggable} from "react-beautiful-dnd";
import {KanbanItem} from "./KanbanItem";

export function DraggableKanbanItem({
                                        index,
                                        item
                                    }: {
    item: { id: number; title: string; done: boolean, images?: any[] | null},
    index: number
}) {
    return <Draggable draggableId={"item." + item.id.toString()}
                      index={index}
    >
        {(provided) => (
            <KanbanItem {...provided.draggableProps} {...provided.dragHandleProps}
                        item={item}
                        ref={provided.innerRef}
                        className={item.done ? 'hidden' : 'visible'}
            />
        )}
    </Draggable>;
}