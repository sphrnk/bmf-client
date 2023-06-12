import {Link} from "react-router-dom";

const AuthHeader = () => {
    return (
        <header className="px-8 py-5 border-b-2 bg-white">
            <div className="container flex mx-auto justify-center items-center">
                <Link to={'/login'}>
                <img
                    className="object-scale-down h-10 w-46"
                    src={window.location.origin+`/images/logo/brand-logo.png`}
                    alt=""
                />
                </Link>
            </div>
        </header>
    );
};

export default AuthHeader;
