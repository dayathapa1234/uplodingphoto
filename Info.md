# React-Guide

## Creating a React Application
Creating a react application in the current folder:
```
npx create-next-app .
```
To run the application on http://localhost:3000/:
```
npm start
```

## TailWind Setup

In `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
In `index.css`:
```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Chakra UI Setup
In `index.js`, we need to wrap the `<App />` component with `ChakraProvider` (https://chakra-ui.com/getting-started):
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
    <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

## Calling the Button Component

```js
import logo from './logo.svg';
import './App.css';
import Button from './Components/Button/Button';

function App() {
  return (
    <div className='App h-[100vh] flex justify-center'>
      <div className="flex flex-col justify-center">
          <Button/>
      </div>
    </div>
  );
}

export default App;
```
- `className` is the same as `class` in html
- The `App` class is using the css file './App.css'
- `h-[100vh]` is the same as `height: 100vh;` and `flex` is same as `flex` and so on ...(https://tailwindcss.com/docs/display)
- The `<Button/>` is calling the Button component from Button.jsx

## Button Component

```jsx
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
```
```css
.button {
  background: linear-gradient(to bottom right,#6495ed  , #4169e1 );
  border: 0;
  border-radius: 12px;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  font-size: 25px;
  font-weight: 500;
  line-height: 2.5;
  outline: transparent;
  padding: 0 1rem;
  text-align: center;
  text-decoration: none;
  transition: box-shadow .2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
}

.button:not([disabled]):focus {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem #add8e6 , .125rem .125rem 1rem #a1caf1;
}

.button:not([disabled]):hover {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem #add8e6 , .125rem .125rem 1rem #a1caf1;
}
```
- `useDisclosure()` is a hook from Chakra-UI, it is used to handle common open, close, or toggle scenarios.
- When the `button` is clicked the `onClick` event triggers a function call `{onClick}`
- When the function `onClick` is called it calls another function `onOpen()` which sets `isOpen` to true
- The `<UploadModal/>` component is passes the `onClose` and `isOpen` value and uses it to know the state of button press to open/close the Modal 

![image](https://github.com/dayathapa1234/React-Training/assets/60889983/a10e8873-bd2b-4f62-93b4-558c6203a912)

## Upload Modal
```jsx
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
```

```css
.drag-drop{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    font-size: 1.5rem;
    color: #999;
    border-radius: 5px;
    cursor: pointer;
}

.drag-drop p{
    margin: 0 0 1rem;
}

.custom-file-upload{
    padding: .5rem 1rem;
    font-weight: 600;
    color: white;
    background-color: #3897f0;
    border: #3897f0;
    cursor: pointer;
}

.custom-file-upload:hover{
    background-color: #2684f0;
    border-color: #2684f0;
}

input[type="file"]{
    display: none;
}
```
- The `UploadModal` component creates a window that is overlaid on primary content using the `Modal` component from Chakra UI. (https://chakra-ui.com/docs/components/modal/usage#make-modal-vertically-centered)
- It uses the `onClose` and `isOpen` to open/close the Modal 
- The `<ModalOverlay/>` component dims the stuff behind the Modal and if the overlay is clicked it closes the Modal
- The `<ModalBody>` is a  wrapper that houses the modal's main content
- `{}` can be used to run javascript code
-  The `useState()` hook is used to keep track of variables/state
-  The `file` variable is used to store the file and `isDragOver` is a flag to know if the dragging of file is over
-  The `{!file && ....}` is used to display the content after && ( the html code) so if there is no file stored (!file) it displays the content where you uplode the picture via drag and drop or upload through File Explorer
- The `div` has `onDrop`, `onDragOver`, `onDragLeave` and `setIsDragOver` to handle the drag and drop of a Image
- The `input` has `onChange` which handles the upload of the image
- The `{file && ....}` is used to display the image if the image is uploaded.

### When the button is pressed 
![image](https://github.com/dayathapa1234/React-Training/assets/60889983/7672f084-61fd-4c21-b226-84b69ec4ef96)

### When the image is uploaded
![image](https://github.com/dayathapa1234/React-Training/assets/60889983/5b9af934-f0a9-4e29-a5f7-11df6a086818)

