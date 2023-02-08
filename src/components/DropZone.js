import {useRef, useState} from "react";

const DropZone = (props) => {
    const dropZoneRef = useRef();
    const fileInputRef = useRef();
    const showDropZone = (el) => {
        dropZoneRef.current.classList.add("dragover");
    }

    // const selectFileHandler = () => {
    //     fileInputRef.current.click();
    // }

    const hideDropZone = () => {
        dropZoneRef.current.classList.remove("dragover");
    }

    const onDrop = () => {
        dropZoneRef.current.classList.remove("dragover");
    }

    const handleDrop = (e) => {
        const newFiles = e.target.files;
        console.log(newFiles)
        if (newFiles) {
            Array.from(newFiles).map((file, id) => file.id = id)
            props.onFileChange(newFiles);
        }
        hideDropZone();
    }

    return (
        <div
            ref={dropZoneRef}
            onDragEnter={showDropZone}
            onDragLeave={hideDropZone}
            onDrop={onDrop}
            className="drop-file-input">
            <div className={'drop-file-input__label gap-6'}>
                <i className="fa-regular fa-file-plus fa-4x"></i>
                {props.folder &&
                    <span className={"text-lg font-bold"}>Select folder</span>
                }
                {!props.folder &&
                    <span className={"text-lg font-bold"}>Select files</span>
                }
            </div>
            {props.folder && <input onChange={handleDrop} type="file" webkitdirectory={"true"} multiple/>}
            {!props.folder && <input onChange={handleDrop} type="file" multiple/>}
        </div>
    )
}
export default DropZone;