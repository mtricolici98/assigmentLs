import React, {useState} from "react";
import ReactImageUploadComponent from "react-images-upload";
import {Box, IconButton, Modal, Tooltip} from "@mui/material";
import {AddPhotoAlternate} from "@mui/icons-material";
import {getBase64} from "../../utils/utils";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ImageAdd =
    function (
        {onImageUploaded}: { onImageUploaded: (base64files: string[]) => void }
    ) {

        const [modalIsOpen, setIsOpen] = useState(false);

        const openModal = () => {
            setIsOpen(true)
        }

        const closeModal = () => {
            setIsOpen(false)
        }

        const onDrop = (pictureFiles: File[], pictureDataURLs: string[]) => {
            Promise.all(
                pictureFiles.map(
                    (file) => {
                        return getBase64(file)
                    }
                )
            ).then(
                (data) => {
                    closeModal()
                    onImageUploaded(data)
                }
            )
        }

        return (
            <div>
                <Tooltip title="Add Image">
                    <IconButton onClick={openModal}>
                        <AddPhotoAlternate/>
                    </IconButton>
                </Tooltip>
                <Modal
                    open={modalIsOpen}
                    onClose={closeModal}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={style}>
                        <h2>Add Image</h2>
                        <ReactImageUploadComponent
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                        />
                    </Box>
                </Modal>
            </div>
        );
    }
