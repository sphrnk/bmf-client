import Layout from "../../components/Layout/Dashboard/Layout";
import {useContext, useEffect} from "react";
import AuthContext from "../../store/auth-context";
import {Link} from "react-router-dom";
import useHttp from "../../hooks/use-http";
import {getFiles} from "../../lib/api/files";
import {getPanels} from "../../lib/api/panels";
import {getUsers} from "../../lib/api/users";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import {getAccountRequests} from "../../lib/api/accountRequests";

const IndexPage = () => {
    const authCtx = useContext(AuthContext);
    const {token} = authCtx;
    const {user} = authCtx;
    const today = new Date();
    const {
        sendRequest: getUsersRequest,
        status: usersStatus,
        data: usersData,
        error: usersError
    } = useHttp(getUsers);
    const users = usersData ? usersData.data.users : [];
    let userContent = <p>There is not any new Users</p>;
    // useHttp(getRequests);
    const {
        sendRequest: getFilesRequest,
        status: filesStatus,
        data: filesData,
        error: filesError
    } = useHttp(getFiles);
    const files = filesData ? filesData.data.files : [];
    let filesContent = <p>There is not any new files</p>;
    const {
        sendRequest: getAccountRequestsRequest,
        status: accountRequestsStatus,
        data: accountRequestsData,
        error: accountRequestsError
    } = useHttp(getAccountRequests);
    const accountRequests = accountRequestsData ? accountRequestsData.data.createAccounts : [];
    let accountRequestsContent = <p>There is not any new requests</p>;
    if (usersStatus === "pending") {
        userContent = <LoadingSpinner/>
    }
    if (usersStatus === "completed" && users.length > 0) {
        userContent = users.map((user) => <div key={user._id}
                                               className="bg-white grid grid-cols-1 sm:grid-cols-12 gap-3 p-5 border justify-between rounded">
            <div className="sm:col-span-4 flex gap-3 items-center">
                <i className="fa-regular fa-user"></i>
                <Link to={`/users/${user.email}`} className="text-primary underline">
                    {user.firstName + ' '}
                    {user.middleName + ' '}
                    {user.lastName + ' '}
                </Link>
            </div>
            <div className="sm:col-span-4 flex gap-3 items-center">
                <i className="fa-regular fa-phone"></i>
                <Link className="text-primary underline" to="users/{name}">
                    {user.phoneNumber + ' '}
                </Link>
            </div>
            <div className="sm:col-span-4 overflow-hidden flex gap-3 items-center">
                <i className="fa-regular fa-envelope"></i>
                <Link className="text-primary underline" to={`mailto:${user.email}`}>
                    {user.email}
                </Link>
                <span></span>
            </div>
        </div>);
    }
    if (filesStatus === "pending") {
        filesContent = <LoadingSpinner/>
    }
    if (filesStatus === "completed" && files.length > 0) {
        filesContent = files.map((file) => <div key={file._id}
                                                className="bg-white grid grid-cols-1 sm:grid-cols-12 gap-3 p-5 border justify-between rounded">
            <div className="sm:col-span-6 flex gap-3 items-center">
                <i className=" fa-regular fa-file-pdf"></i>
                <Link to="files" className="text-primary font-semibold">
                    {/* {
                    console.log(new Date(today.getFullYear()))} */}
                    Hello.pdf
                </Link>
            </div>
            <div className="sm:col-span-3 flex gap-3 items-center">
                <i className="fa-regular fa-hard-drive"></i>
                <span>250 KB</span>
            </div>
            <div className="sm:col-span-3 text-gray-400 flex gap-3 items-center justify-end">
                <i className="fa-regular fa-calendar"></i>
                <span>13 Jun</span>
            </div>
        </div>);
    }
    if (accountRequestsStatus === "pending") {
        accountRequestsContent = <LoadingSpinner/>
    }
    if (accountRequestsStatus === "completed" && accountRequests.length > 0) {
        accountRequestsContent = accountRequests.map((request) =>
            (<div key={request._id}
                  className="bg-white grid grid-cols-1 sm:grid-cols-12 gap-3 p-5 border justify-between rounded">
                <div className="sm:col-span-3 flex gap-3 items-center">
                    <i className="fa-regular fa-user-plus"></i>
                    <Link to={`/account-requests/${request._id}`} className="text-primary underline">
                        {request.firstName + " " + request.middleName + " " + request.lastName}
                    </Link>
                </div>
                <div className="sm:col-span-3 flex gap-3 items-center">
                <span>
                    {request.email}
                </span>
                </div>
                <div className="sm:col-span-3 flex gap-3 items-center">
                    <i className="fa-regular fa-phone"></i>
                    <Link className="text-primary underline" to="users/{name}">
                        {request.phoneNumber + ' '}
                    </Link>
                </div>
                <div className="sm:col-span-3 overflow-hidden flex gap-3 items-center">
                    <i className="fa-regular fa-envelope"></i>
                    <Link className="text-primary underline" to={`mailto:${request.email}`}>
                        {request.email}
                    </Link>
                    <span></span>
                </div>
            </div>));
    }
    useEffect(() => {
        if (!usersData && !usersError) {
            getUsersRequest({token});
        }
        if (!filesData && !filesError) {
            getFilesRequest({token, path: '/'});
        }
        if (!accountRequestsData && !accountRequestsError) {
            getAccountRequestsRequest({token});
        }
    }, [getUsersRequest, getFilesRequest, getAccountRequestsRequest, token])
    return (
        <>
            <Layout>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    {user.role !== "client" && (
                        <>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-3xl font-semibold">Recent New Clients</h2>
                                <hr/>
                                {userContent}
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-3xl font-semibold">Recent Account Request</h2>
                                <hr/>
                                {accountRequestsContent}
                            </div>
                            {/*<div className="flex flex-col gap-3">*/}
                            {/*    <h2 className="text-3xl font-semibold">Recent Requests</h2>*/}
                            {/*    <hr/>*/}
                            {/*    <div*/}
                            {/*        className="bg-white  grid grid-cols-1 sm:grid-cols-12 gap-3 p-5 border justify-between rounded">*/}
                            {/*        <div className="sm:col-span-4 flex gap-3 items-center">*/}
                            {/*            <i className="fa-regular fa-user-plus"></i>*/}
                            {/*            <Link to="users/{name}">Sepehr niki</Link>*/}
                            {/*        </div>*/}
                            {/*        <div className="sm:col-span-4 flex gap-4 items-center">*/}
                            {/*            <i className="fa-regular fa-square-info"></i>*/}
                            {/*            <span>Adding Business Plan</span>*/}
                            {/*        </div>*/}
                            {/*        <div*/}
                            {/*            className="sm:col-span-4 flex gap-3 items-center text-gray-400 justify-end">*/}
                            {/*            <i className="fa-regular fa-calendar"></i>*/}
                            {/*            <span>21 Min ago</span>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </>
                    )}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-3xl font-semibold">Recent Files</h2>
                        <hr/>
                        {filesContent}
                    </div>
                </div>
            </Layout>
        </>
    );
};
export default IndexPage;
