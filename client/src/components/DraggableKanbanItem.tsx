import {Draggable} from "react-beautiful-dnd";
import {KanbanItem} from "./KanbanItem";

export function DraggableKanbanItem({
                                        index,
                                        item: {id, title}
                                    }: { item: { id: number; title: string; done: boolean }, index: number }) {
    return <Draggable draggableId={id.toString()}
                      index={index}
    >
        {(provided) => (
            <KanbanItem {...provided.draggableProps} {...provided.dragHandleProps}
                        title={title}
                        ref={provided.innerRef}/>
        )}
    </Draggable>;
}