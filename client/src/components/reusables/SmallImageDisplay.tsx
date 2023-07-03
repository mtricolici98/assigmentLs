import React, {useState} from "react";
import {Box, Grid, Modal, Tooltip} from "@mui/material";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const SmallImageDisplay =
    function (
        {imageSrc}: { imageSrc: string }
    ) {

        const [modalIsOpen, setIsOpen] = useState(false);

        const openModal = () => {
            setIsOpen(true)
        }

        const closeModal = () => {
            setIsOpen(false)
        }

        return (
            <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
                <Tooltip title="Click to view">
                        <img src={imageSrc}
                             onClick={openModal}
                             style={{height: '40px', width: '40px'}}
                             alt={"Image for task"}/>
                </Tooltip>
                <Modal
                    open={modalIsOpen}
                    onClose={closeModal}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={style}>
                        <img style={{height: 'auto', width: 'auto'}} src={imageSrc} alt={"Big image"}/>
                    </Box>
                </Modal>
            </Grid>
        );
    }
