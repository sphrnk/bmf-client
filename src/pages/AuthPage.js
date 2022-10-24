import AuthForm from "../components/Forms/AuthForm";
// import logo from './public/images/logo/logo.png'
import { Link } from "react-router-dom";
const AuthPage = () => {
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
        <AuthForm />
      </main>
      
    </>
  );
};
export default AuthPage;
