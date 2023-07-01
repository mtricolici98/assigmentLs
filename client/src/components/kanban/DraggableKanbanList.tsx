import {Draggable, Droppable} from "react-beautiful-dnd";
import {KanbanList} from "./KanbanList";
import {Button, Stack} from "@mui/material";
import {DraggableKanbanItem} from "./DraggableKanbanItem";
import {AddItemComponent} from "../reusables/AddItemComponent";
import {useItemAddMutations} from "../../mutations/ItemMutations";
import {useQueryClient} from "@tanstack/react-query";

export function DraggableKanbanList({
                                        index,
                                        title, items, id
                                    }: {
    title: string,
    id: number,
    items: {
        id: number,
        title: string,
        done: boolean,
        images?: any[] | null
    }[],
    index: any
}) {
    const queryClient = useQueryClient()
    const addMutations = useItemAddMutations(queryClient);

    const onItemConfirmed = (text: string) => {
        addMutations.mutate(
            {title: text, columnId: id}
        )
    }

    return <Draggable draggableId={"list." + id.toString()} index={index}>
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
                <AddItemComponent label={'Add Item'} onTextChange={onItemConfirmed}/>
            </KanbanList>
        )}
    </Draggable>;
}