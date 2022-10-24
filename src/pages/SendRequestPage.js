import SendRequestForm from "../components/Forms/SendRequestForm";
// import logo from './public/images/logo/logo.png'
import {Link} from "react-router-dom";

const SendRequestPage = () => {
    return (
        <>
            <header className="px-8 py-5 border-b-2">
                <div className="container flex mx-auto justify-center items-center">
                    <img
                        className="object-scale-down h-10 w-46"
                        src="images/logo/logo.png"
                        alt=""
                    />
                </div>
            </header>
            <main>
                <SendRequestForm/>
            </main>
        </>
    );
};
export default SendRequestPage;
