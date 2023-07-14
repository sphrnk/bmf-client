import ReactDOM from "react-dom";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Typography} from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Backdrop = (props) => {
    return (
        <div
            onClick={props.onConfirm}
            className="fixed top-0 left-0 w-full h-screen z-10 bg-black bg-opacity-60"
        ></div>
    );
};
const ModalOverlay = (props) => {

    return (
        <div
            className="overflow-auto h-5/6 fixed z-30 my-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-xl flex flex-col gap-6 bg-white w-3/4 md:w-2/4">
            <h2 className="font-semibold text-2xl self-start">{props.title}</h2>
            <div className="h-full flex">
                {props.children}
            </div>
        </div>
    );
};
const Modal = (props) => {

    return (
        <>
            {/*{ReactDOM.createPortal(*/}
            {/*    <Backdrop onConfirm={props.onConfirm}/>,*/}
            {/*    document.getElementById("backdrop-root")*/}
            {/*)}*/}
            {/*{ReactDOM.createPortal(*/}
            {/*    <ModalOverlay title={props.title} children={props.children} onConfirm={props.onConfirm}/>,*/}
            {/*    document.getElementById("overlay-root")*/}
            {/*)}*/}
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                // fullWidth
                // maxWidth={'xl'}
                keepMounted
                onClose={props.onClose ? props.onClose : null}
            >
                {props.title && <DialogTitle> {props.title}</DialogTitle>}
                <DialogContent>
                    {props.children}
                </DialogContent>
                {props.rejectText && props.resolveText &&
                    <DialogActions>
                        {props.rejectText &&
                            <Button disabled={props.pending} onClick={props.onClose}
                                    variant={'outlined'}
                                    color={"error"}>{props.rejectText}</Button>}
                        {props.resolveText &&
                            <Button disabled={props.pending} type={"submit"} onClick={props.onAction}
                                    variant={'contained'}>
                                {props.pending &&
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                         xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" 
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>}
                                {props.resolveText}
                            </Button>}
                    </DialogActions>
                }
            </Dialog>
        </>
    );
};

export default Modal;
