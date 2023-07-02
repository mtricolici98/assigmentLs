import {forwardRef, useState} from "react";
import {Card, CardContent, CardHeader, CardProps, Stack} from "@mui/material";
import {ShowEditTextComponent} from "../reusables/ShowEditTextComponent";
import {useItemDoneMutation, useItemUpdateMutations} from "../../mutations/ItemMutations";
import {useQueryClient} from "@tanstack/react-query";
import {useColumnUpdateMutation} from "../../mutations/ColumnMutations";

export const KanbanList = forwardRef(function ({
                                                   children,
                                                   title,
                                                   listId,
                                                   ...cardProps
                                               }: {
    children: React.ReactNode,
    title: string,
    listId: number
} & CardProps, ref: any) {

    const [displayTitle, setTitle] = useState(title);
    const queryClient = useQueryClient()
    const updateColumnMutation = useColumnUpdateMutation(queryClient);
    const onTextChanged = (newText: string) => {
        setTitle(title)
        updateColumnMutation.mutate(
            {
                newTitle: newText,
                columnId: listId
            }
        )
    }

    return (
        <Card variant="outlined" sx={{bgcolor: 'grey.200', minWidth: 300, minHeight: 400, maxWidth: 380}}
              ref={ref} {...cardProps}>
            <CardHeader title={<ShowEditTextComponent text={displayTitle} onTextChange={onTextChanged}/>}/>
            <CardContent>
                <Stack spacing={2}>{children}</Stack>
            </CardContent>
        </Card>
    );
})