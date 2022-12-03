// import {useContext, useRef, useState} from "react";
// import {createAccountRequest, login} from "../../lib/api";
// import {useNavigate} from "react-router-dom";
// import AuthContext from "../../store/auth-context";
// import {Link} from "react-router-dom";
// import useHttp from "../../hooks/use-http";
// import LoadingSpinner from "../UI/LoadingSpinner";
// import Notif from "../UI/Notif";

const SendCreateAccountRequestForm = () => {
    // const firstNameInputRef = useRef();
    // const middleNameInputRef = useRef();
    // const lastNameInputRef = useRef();
    // const emailInputRef = useRef();
    // const phoneNumberInputRef = useRef();
    // const reasonInputRef = useRef();
    // // const navigate = useNavigate();
    // const {sendRequest, status, data, error} = useHttp(createAccountRequest);
    // const submitHandler = async (event) => {
    //     event.preventDefault();
    //     const enteredFirstName = firstNameInputRef.current.value;
    //     const enteredMiddleName = middleNameInputRef.current.value;
    //     const enteredLastName = lastNameInputRef.current.value;
    //     const enteredEmail = emailInputRef.current.value;
    //     const enteredPhoneNumber = phoneNumberInputRef.current.value;
    //     const enteredReason = reasonInputRef.current.value;
    //     await sendRequest({
    //         firstName: enteredFirstName,
    //         middleName: enteredMiddleName,
    //         lastName: enteredLastName,
    //         email: enteredEmail,
    //         phoneNumber: enteredPhoneNumber,
    //         reason: enteredReason,
    //     });
    // };
    // console.log(data);
    // return (
    //     <>
    //         <h1 className="uppercase text-center text-2xl font-semibold text-primary mb-4">
    //             Send Create Account Request
    //         </h1>
    //         <div className="flex w-full flex-col items-center gap-4 justify-center">
    //             <div
    //                 className="w-full lg:w-5/12 sm:w-7/12 flex flex-col px-8 py-5 sm:border-2 rounded-none sm:rounded-xl items-center gap-6 bg-white">
    //                 <form
    //                     onSubmit={submitHandler}
    //                     className="flex gap-6 flex-col w-full"
    //                 >
    //                     <div className="flex flex-col gap-3">
    //                         <label htmlFor="email" className="text-primary">
    //                             First Name
    //                         </label>
    //                         <input
    //                             id="first-name"
    //                             name="first-name"
    //                             className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
    //                             type="text"
    //                             ref={firstNameInputRef}
    //                             required
    //                         />
    //                         {/*<small className="text-red-600">*some error*</small>*/}
    //                     </div>
    //                     <div className="flex flex-col gap-3">
    //                         <label htmlFor="password" className="text-primary">
    //                             Middle Name
    //                         </label>
    //                         <input
    //                             id="middle-name"
    //                             name="middle-name"
    //                             className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
    //                             type="text"
    //                             ref={middleNameInputRef}
    //                             // required
    //                         />
    //                         {/*<small className="text-red-600">*some error*</small>*/}
    //                     </div>
    //                     <div className="flex flex-col gap-3">
    //                         <label htmlFor="password" className="text-primary">
    //                             Last Name
    //                         </label>
    //                         <input
    //                             id="last-name"
    //                             name="last-name"
    //                             className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
    //                             type="text"
    //                             ref={lastNameInputRef}
    //                             required
    //                         />
    //                         {/*<small className="text-red-600">*some error*</small>*/}
    //                     </div>
    //                     <div className="flex flex-col gap-3">
    //                         <label htmlFor="password" className="text-primary">
    //                             Email
    //                         </label>
    //                         <input
    //                             id="email"
    //                             name="email"
    //                             className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
    //                             type="email"
    //                             ref={emailInputRef}
    //                             required
    //                         />
    //                         {/*<small className="text-red-600">*some error*</small>*/}
    //                     </div>
    //                     <div className="flex flex-col gap-3">
    //                         <label htmlFor="password" className="text-primary">
    //                             Phone Number
    //                         </label>
    //                         <input
    //                             id="phone-number"
    //                             name="phone-number"
    //                             className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
    //                             type="text"
    //                             ref={phoneNumberInputRef}
    //                             required
    //                         />
    //                         {/*<small className="text-red-600">*some error*</small>*/}
    //                     </div>
    //                     <div className="flex flex-col gap-3">
    //                         <label htmlFor="password" className="text-primary">
    //                             Reason
    //                         </label>
    //                         <textarea
    //                             id="phone-number"
    //                             name="phone-number"
    //                             className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
    //                             ref={reasonInputRef}
    //                             rows={4}
    //                         />
    //                         {/*<small className="text-red-600">*some error*</small>*/}
    //                     </div>
    //                     {
    //                         status === "completed" && error && (
    //                             <Notif status={"fail"} text={error}/>
    //                         )
    //                     }
    //                     {
    //                         status === "completed" && data && (
    //                             <Notif status={"success"}
    //                                    text={"You Request Submitted Successfully, Please wait for reviewing your request and acceptation"}/>)
    //                     }
    //                     {(status === "completed" || !status) && (
    //                         <button
    //                             type="submit"
    //                             id="submit-form"
    //                             name="submit"
    //                             className="rounded bg-primary px-2.5 py-1.5 text-white"
    //                         >
    //                             Send Request
    //                         </button>
    //                     )}
    //                     {status === "pending" && (
    //                         <LoadingSpinner/>
    //                     )}
    //                 </form>
    //             </div>
    //             <div className="flex w-full lg:w-5/12 sm:w-7/12 text-center gap-2 text-primary px-8 flex-col">
    //                 <span className="uppercase">Have account?</span>
    //                 <Link
    //                     to="/login"
    //                     className="rounded-full text-primary border-primary-light border px-2.5 py-1 transition hover:bg-primary hover:text-white"
    //                 >
    //                     Login to Panel
    //                 </Link>
    //             </div>
    //         </div>
    //     </>
    // );
};

export default SendCreateAccountRequestForm;
