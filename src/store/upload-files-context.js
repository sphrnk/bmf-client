import React, {useCallback, useEffect, useState} from "react";

let logoutTimer;
const UploadFilesContext = React.createContext({
    // user: null,
    files: [],
    addFile: (files) => {
    },
    removeFile: (id) => {
    },
});

export const UploadFilesContextProvider = (props) => {
    const [fileList, setFileList] = useState([]);
    const addFileHandler = (newFiles) => {
        const updatedList = [...fileList, ...newFiles];
        setFileList(updatedList)
    };

    const removeFileHandler = (id) => {
        fileList.filter((file) => file.id !== id);
    };

    const contextValue = {
        files: fileList,
        addFile: addFileHandler,
        removeFile: removeFileHandler
    };
    return (
        <UploadFilesContext.Provider value={contextValue}>
            {props.children}
        </UploadFilesContext.Provider>
    );
};
export default UploadFilesContext;
