import React, {forwardRef} from "react";
import {Card, CardContent, CardProps, Checkbox, Stack} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";
import {ShowEditTextComponent} from "../reusables/ShowEditTextComponent";
import {useItemDoneMutation, useItemUpdateMutations} from "../../mutations/ItemMutations";


export const KanbanItem = forwardRef(function ({
                                                   item,
                                                   ...cardProps
                                               }: {
    item: { id: number, title: string, done: boolean, images?: any[] | null }
} & CardProps, ref: any) {

    const updateItemMutation = useItemUpdateMutations();
    const queryClient = useQueryClient()
    const doneItemMutation = useItemDoneMutation(queryClient);
    const onTextChanged = (newText: string) => {
        item.title = newText;
        updateItemMutation.mutate(
            {
                newTitle: newText,
                itemId: item.id,
                instance: item,

            }
        )
    }

    const [done, setDone] = React.useState(item.done);

    const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDone(event.target.checked);
        doneItemMutation.mutate(
            {
                itemId: item.id,
                done: event.target.checked,
                instance: item
            }
        )
    };


    return (
        <Card ref={ref} {...cardProps}>
            <CardContent>
                <Stack spacing={2} direction="row" alignItems="center">
                    <Checkbox checked={done} onChange={onCheckboxChange}/>
                    <ShowEditTextComponent ref={ref} text={item.title} onTextChange={onTextChanged}
                    />
                </Stack>
            </CardContent>
        </Card>
    );
})