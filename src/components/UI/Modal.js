import ReactDOM from "react-dom";


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
            className="fixed z-30 my-4 top-20 left-1/4 flex flex-col p-10 rounded-xl items-center gap-6 bg-white w-2/4">
            <h2 className="font-semibold text-2xl self-start">{props.title}</h2>
            {props.children}
        </div>
    );
};
const Modal = (props) => {
    console.log(props);
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm}/>,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <ModalOverlay title={props.title} children={props.children} onConfirm={props.onConfirm}/>,
                document.getElementById("overlay-root")
            )}
        </>
    );
};

export default Modal;
