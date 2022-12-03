import Layout from "../../../components/Layout/Dashboard/Layout";
import NavTab from "../../NavTab/NavTab";

const UserInformation = (props) => {
    const user = props.user;
    return (
        <>

            <div className="flex-col lg:flex-row flex gap-6">
                <div className="basis-full lg:basis-2/12">
                    <div className="flex flex-col gap-6 items-center">
                        <div
                            className="w-56 h-56 rounded-xl drop-shadow-sm shadow-sm flex items-center border"
                        >
                            <img
                                src="./public/images/logo/logo.png"
                                alt=""
                                className="object-fill"
                            />
                        </div>
                        <button
                            id="upload-file-btn"
                            className="rounded bg-primary shadow py-3 px-4 text-white"
                        >
                            <i className="fa-regular fa-pen"></i>
                            Edit Photo
                        </button>
                    </div>
                </div>
                <div className="basis-full lg:basis-10/12">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                        <div
                            className="flex justify-between">
                            <div className="flex flex-col gap-1">
                                <h6 className={""}>First Name:</h6>
                                <span className="font-bold">
                                {user.firstName}
                            </span>
                            </div>
                            <div className="text-opacity-70 text-primary flex items-baseline justify-center gap-x-2">
                                <i className="fa-regular fa-pen-to-square"></i>
                                <span>Edit</span>
                            </div>
                        </div>
                        <div
                            className="flex justify-between">
                            <div className="flex flex-col gap-1">
                                <h6 className={""}>Middle Name:</h6>
                                <span className="font-bold">
                                {user.middleName !== "" ? user.middleName : "null"}
                            </span>
                            </div>
                            <div className="text-opacity-70 text-primary flex items-baseline justify-center gap-x-2">
                                <i className="fa-regular fa-pen-to-square"></i>
                                <span>Edit</span>
                            </div>
                        </div>
                        <div
                            className="flex justify-between">
                            <div className="flex flex-col gap-1">
                                <h6 className={""}>Last Name:</h6>
                                <span className="font-bold">
                                {user.lastName}
                            </span>
                            </div>
                            <div className="text-opacity-70 text-primary flex items-baseline justify-center gap-x-2">
                                <i className="fa-regular fa-pen-to-square"></i>
                                <span>Edit</span>
                            </div>
                        </div>
                        <div
                            className="flex justify-between">
                            <div className="flex flex-col gap-1">
                                <h6 className={""}>Permissions:</h6>
                                <span
                                    className="font-bold">File Manager, Chat, Filling Forms, Meeting
                                </span>
                            </div>
                            <div className="text-opacity-70 text-primary flex items-baseline justify-center gap-x-2">
                                <i className="fa-regular fa-pen-to-square"></i>
                                <span>Edit</span>
                            </div>
                        </div>
                        <div
                            className="flex justify-between">
                            <div className="flex flex-col gap-1">
                                <h6 className={""}>Created At:</h6>
                                <span className="text-gray-400">
                                {user.createdAt}
                            </span>
                            </div>
                        </div>
                        <div
                            className="flex justify-between">
                            <div className="flex flex-col gap-1">
                                <h6 className={""}>Last Update At:</h6>
                                <span className="text-gray-400">
                                {user.updatedAt}
                            </span>
                            </div>
                        </div>
                        {/*<div className="flex justify-between">*/}
                        {/*    <div className="w-5/12 flex justify-between text-primary">*/}
                        {/*        <span className="">Email:</span>*/}
                        {/*        <span>{user.email}</span>*/}
                        {/*    </div>*/}
                        {/*    <span className="text-opacity-70 text-primary">Edit</span>*/}
                        {/*</div>*/}
                        {/*<div className="flex justify-between">*/}
                        {/*    <div className="w-5/12 flex justify-between text-primary">*/}
                        {/*        <span className="">Phone Number:</span>*/}
                        {/*        <span>{user.phoneNumber}</span>*/}
                        {/*    </div>*/}
                        {/*    <span className="text-opacity-70 text-primary">Edit</span>*/}
                        {/*</div>*/}
                        {/*<div className="flex justify-between">*/}
                        {/*    <div className="w-5/12 flex justify-between text-primary">*/}
                        {/*        <span className="">Permissions:</span>*/}
                        {/*        <span>File Manager, Chat, Filling Forms, Meeting</span>*/}
                        {/*    </div>*/}
                        {/*    <span className="text-opacity-70 text-primary">Edit</span>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserInformation;