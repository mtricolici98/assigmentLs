import React, {forwardRef, useState} from "react";
import {Button, TextField, Typography} from "@mui/material";

export const AddItemComponent =
    function (
        {label, onTextChange, ...props}: { label: string, onTextChange: (newText: string) => void }
    ) {
        const [isEdit, setEdit] = useState<boolean>(false);
        const [text, setText] = useState<string>('');


        if (!isEdit) {
            return (
                <Button onClick={() => setEdit(true)}>{label}</Button>
            )
        } else {
            return (
                <TextField id="standard-basic"
                           label={label} variant="standard"
                           onChange={(event) => setText(event.target.value)}
                           onKeyDown={(event) => {
                               if (event.key === 'Enter') {
                                   onTextChange(text)
                                   setEdit(false)
                                   setText('')
                               }
                               if (event.key === 'Escape') {
                                   setText(text);
                                   setEdit(false)
                                   setText('')
                               }
                           }}
                           value={text}
                />
            )
        }
    }
