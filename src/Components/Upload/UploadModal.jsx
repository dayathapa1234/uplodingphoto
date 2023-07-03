import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React, { useState } from 'react'
import {MdPhoto} from 'react-icons/md';
import './UploadModal.css';
const UploadModal = ({onClose, isOpen}) => {
    const [file, setFile] = useState();
    const [isDragOver, setIsDragOver] = useState();

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile.type.startsWith("image/")){
            setFile(droppedFile);
        }else{
            setFile(null);
            alert("Please Select a Image");
        }
    }

    const handleDragOver = (e) =>{
        e.preventDefault();
        e.dataTransfer.dropEffect="copy";
        setIsDragOver(true);
    }

    const handleDragLeave = () => {
        setIsDragOver(false);
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")){
            setFile(file);
        }else{
            setFile(null);
            alert("Please Select a Image");
        }
    }


  return (
    <div>
        <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay/>
            <ModalContent>
                <div className='flex items-center justify-center py-1 font-bold text-3xl text-gray-500'>
                    Upload a Picture
                </div>
                <hr/>
                <ModalBody>
                    <div className='h-[70vh] flex justify-center'>
                        <div className='w-[50%] flex flex-col justify-center'>
                            {!file &&
                                <div className='drag-drop h-full' onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} setIsDragOver={isDragOver}>
                                   <div className='flex flex-col items-center'>
                                        <MdPhoto className="text-6xl"/>
                                        <p>Drag a Image Here</p>
                                    </div> 
                                    <label htmlFor='file-upload' className='custom-file-upload' accept='image/*'>Select from Computer</label>
                                    <input type="file" id="file-upload" accept='image/*' onChange={handleOnChange}/>
                                </div>
                            }
                            {file && 
                                <img className='max-h-full' src={URL.createObjectURL(file)} alt=''/>
                            }
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>    
        </Modal>
    </div>
  )
}

export default UploadModal