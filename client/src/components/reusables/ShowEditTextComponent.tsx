import React, {forwardRef, useState} from "react";
import {TextField, Tooltip, Typography} from "@mui/material";

export const ShowEditTextComponent = forwardRef(
    function (
        {text, onTextChange, ...props}: { text: string, onTextChange: (newText: string) => void }, ref: any
    ) {
        const [isEdit, setEdit] = useState<boolean>(false);
        const [updatedText, setUpdatedText] = useState<string>(text);


        if (!isEdit) {
            return (
                <span onDoubleClick={() => setEdit(true)}>
                    <Tooltip title="Double click to change">
            <Typography variant="h6">{text}</Typography>
                    </Tooltip>
                </span>
            )
        } else {
            return (
                <TextField id="standard-basic"
                           label="New text" variant="standard"
                           onChange={(event) => setUpdatedText(event.target.value)}
                           onKeyDown={(event) => {
                               if (event.key === 'Enter') {
                                   onTextChange(updatedText)
                                   setEdit(false)
                               }
                               if (event.key === 'Escape') {
                                   setUpdatedText(text);
                                   setEdit(false)
                               }
                           }}
                           value={updatedText}
                />
            )
        }
    }
)
