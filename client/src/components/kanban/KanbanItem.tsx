import React, {forwardRef} from "react";
import {Card, CardContent, CardProps, Checkbox, Grid, IconButton, Tooltip} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";
import {ShowEditTextComponent} from "../reusables/ShowEditTextComponent";
import {useItemDeleteMutation, useItemDoneMutation, useItemUpdateMutations} from "../../mutations/ItemMutations";
import {Delete} from "@mui/icons-material";


export const KanbanItem = forwardRef(function ({
                                                   item,
                                                   ...cardProps
                                               }: {
    item: { id: number, title: string, done: boolean, images?: any[] | null }
} & CardProps, ref: any) {

    const queryClient = useQueryClient()
    const updateItemMutation = useItemUpdateMutations();
    const doneItemMutation = useItemDoneMutation(queryClient);
    const deleteItemMutation = useItemDeleteMutation(queryClient);
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

    const deleteItem = () => {
        deleteItemMutation.mutate(
            {itemId: item.id}
        )
    }


    return (
        <Card ref={ref} {...cardProps} sx={{alignItems: "center"}}>
            <CardContent sx={{width: '100%'}}>
                <Grid container spacing={2}>
                    <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
                        <Tooltip title="Mark item as Done">
                            <Checkbox checked={done} onChange={onCheckboxChange}/>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={8} display="flex" justifyContent="center" alignItems="center">
                        <ShowEditTextComponent ref={ref} text={item.title} onTextChange={onTextChanged}/>
                    </Grid>
                    <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
                        <Tooltip title="Delete item">
                            <IconButton aria-label="delete" onClick={deleteItem}>
                                <Delete/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
})