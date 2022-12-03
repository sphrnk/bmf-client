import useHttp from "../../hooks/use-http";
import {useRef, useContext, useEffect} from "react";
import {createUser} from "../../lib/api/users";
import LoadingSpinner from "../UI/LoadingSpinner";
import Notif from "../UI/Notif";
import AuthContext from "../../store/auth-context";
import {upload} from "@testing-library/user-event/dist/upload";
import Select from "./UI/Select";

const UploadFileForm = (props) => {
    const {sendRequest, status, data, error} = useHttp(createUser);
    const dropzoneRef = useRef();
    let reqStatus;
    const authCtx = useContext(AuthContext);
    const {token} = authCtx;
    const fileInputRef = useRef();
    const createAccountSubmitHandler = async (el) => {
        el.preventDefault();
    };
    if (status === "pending") {
        reqStatus = <LoadingSpinner/>
    }
    if (data) {
        // console.log(data);
        reqStatus = <Notif status={"success"}
                           text={"Account Created Successfully, if the email is correct user will get his information!"}/>
    }
    if (status === "completed" && error) {
        reqStatus = <Notif status={"failed"} text={error}/>
    }
    const selectFileHandler = () => {
        fileInputRef.current.click();
    }
    const uploadFilesHandler = () => {
        props.uploadFiles(fileInputRef.current.files);
    }
    const showDropZone = (el) => {
        // console.log(dropzoneRef.current)
        dropzoneRef.current.classList.add("border-blue-400", "bg-blue-200");
        //   dropzoneRef.current.style.display = "none";
    }

    const hideDropZone = () => {
        // console.log('draged');
        dropzoneRef.current.classList.remove("border-blue-400", "bg-blue-200");
        //   dropzoneRef.current.style.display = "none";
    }

    const allowDrag = (e) => {
        if (true) {
            // Test that the item being dragged is a valid one
            e.dataTransfer.dropEffect = "copy";
            e.preventDefault();
        }
    }

    const handleDrop = (e) => {
        // console.log(e);
        e.preventDefault();
        hideDropZone();
        fileInputRef.current.files = e.dataTransfer.files;
        uploadFilesHandler();
        //   alert("drop!");
    }

    return (<form
        onSubmit={createAccountSubmitHandler}
        action="client/src/components/Layout/Dashboard/Layout#"
        className="flex gap-6 flex-col w-full"
    >
        <input ref={fileInputRef} onChange={uploadFilesHandler} type="file" name="files[]" multiple
               className="hidden"/>
        <div className={"w-screen h-full fixed -top-1/2 -left-1/2"} onDragLeave={hideDropZone}
             onDragEnter={showDropZone}
             onDragOver={allowDrag}
             onDrop={handleDrop}
        >
        </div>
        <div ref={dropzoneRef}
             className="left-0 cursor-pointer z-50 top-0 bg-opacity-40 border-4 text-primary rounded-lg border-dashed "
             onClick={selectFileHandler}
        >
            <div className="flex items-center justify-center py-6 gap-3 flex-col">
                <i className="fa-regular fa-file-plus fa-4x"></i>
                <span className={"text-lg font-bold"}>Select file to upload</span>
                {!navigator.userAgentData.mobile &&
                    <span className={"text-sm text-gray-400"}>or drag and drop it here</span>}
            </div>
        </div>
        <Select options={['1', '2', 3, 56, 45]} object={"User"}/>
    </form>);
};
export default UploadFileForm;