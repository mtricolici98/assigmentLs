import React, {forwardRef, useState} from "react";
import {Card, CardContent, CardHeader, CardProps, IconButton, Stack, Tooltip} from "@mui/material";
import {ShowEditTextComponent} from "../reusables/ShowEditTextComponent";
import {useQueryClient} from "@tanstack/react-query";
import {useColumnDeleteMutation, useColumnUpdateMutation} from "../../mutations/ColumnMutations";
import {Delete} from "@mui/icons-material";

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

    const [columnDeleted, setDeleted] = useState(false);
    const deleteColumnMutation = useColumnDeleteMutation(queryClient);
    const onDeleteClicked = () => {
        setDeleted(true)
        deleteColumnMutation.mutate(
            {
                columnId: listId
            }
        )
    }
    return (
        <Card variant="outlined" sx={{
            bgcolor: 'grey.200', minWidth: 300, minHeight: 400, maxWidth: 380,
            display: columnDeleted ? "none" : undefined
        }}
              ref={ref} {...cardProps}>
            <CardHeader title={
                <Stack justifyContent="space-between" spacing={2} direction="row">
                    <ShowEditTextComponent text={displayTitle} onTextChange={onTextChanged}/>
                    <Tooltip title={"Delete Column"}>
                        <IconButton onClick={onDeleteClicked}>
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                </Stack>
            }/>
            <CardContent>
                <Stack spacing={2}>{children}</Stack>
            </CardContent>
        </Card>
    );
})