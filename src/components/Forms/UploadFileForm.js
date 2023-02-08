import useHttp from "../../hooks/use-http";
import {useRef, useContext, useEffect, useState} from "react"
import LoadingSpinner from "../UI/LoadingSpinner";
import Notif from "../UI/Notif";
import AuthContext from "../../store/auth-context";
import {getFiles, uploadFile} from "../../lib/api/files";
import SelectUser from "./SelectUser";
import SelectPanel from "./SelectPanel";
import DropZone from "../DropZone";
import {
    Breadcrumbs,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import {validateZipCode} from "../../lib/utils";

const UploadFileForm = (props) => {
    const [selectedUser, setSelectedUser] = useState();
    const [selectedPanel, setSelectedPanel] = useState();
    const [fileList, setFileList] = useState([]);

    const createAccountSubmitHandler = async (el) => {
        el.preventDefault();
    };
    const fileUploadHandler = (newFiles) => {
        console.log(newFiles);
        const updatedList = [...fileList, ...newFiles];
        setFileList(updatedList)
        props.onChangeFile(updatedList);
    }

    const removeFileHandler = (itemId) => {
        const updatedList = [...fileList].filter(file => file.id !== itemId);
        setFileList(updatedList)
        props.onChangeFile(updatedList);
    }

    return (<form
        onSubmit={createAccountSubmitHandler}
        action="client/src/Layout/Dashboard/Layout#"
        className="flex gap-6 flex-col w-full"
        encType={'multipart/form-data'}
    >

        <Typography component={'h1'} variant={"h6"} fontWeight={"bold"}>
            Upload Files
        </Typography>
        <div className={"flex gap-4"}>
            <DropZone folder onFileChange={fileUploadHandler}/>
            <DropZone onFileChange={fileUploadHandler}/>
        </div>
        {
            fileList.length > 0 ? (
                <div className="drop-file-preview">
                    <p className="drop-file-preview__title">
                        Ready to upload
                    </p>
                    {
                        fileList.map((item, index) => (
                            <div key={index} className="drop-file-preview__item">
                                {/*<img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />*/}
                                <div className="drop-file-preview__item__info">
                                    <p>{item.name}</p>
                                    <p>{item.size}B</p>
                                </div>
                                <span className="drop-file-preview__item__del"
                                      onClick={removeFileHandler.bind(null, item.id)}>x</span>
                            </div>
                        ))
                    }
                </div>
            ) : null
        }
    </form>);
};
export default UploadFileForm;