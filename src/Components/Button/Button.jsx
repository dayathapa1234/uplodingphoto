import React from "react";
import './Button.css'
import {useDisclosure} from '@chakra-ui/react'
import UploadModal from "../Upload/UploadModal";

const Button = props => {

  const {isOpen, onOpen, onClose} = useDisclosure();

  const onClick = () => {
    onOpen();
  };

  return (
    <div>
      <button onClick={onClick} className="button">
        Click to Upload Pictures
      </button>
      <UploadModal onClose={onClose} isOpen={isOpen}/>
    </div> 
  );
}

export default Button;