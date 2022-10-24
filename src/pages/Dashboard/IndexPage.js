import Layout from "../../components/Dashboard/Layout/Layout";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Link } from "react-router-dom";
const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const { user } = authCtx;
  const today = new Date();
  return (
    <>
      <Layout>
        <div className="container mx-auto py-5 px-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* {user.role !== "client" && ( */}
            <>
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-semibold">Recent New Clients</h2>
                <hr />
                <div className="bg-white grid grid-cols-1 sm:grid-cols-12 gap-3 p-5 border justify-between rounded">
                  <div className="sm:col-span-4 flex gap-3 items-center">
                    <i className="fa-regular fa-user-plus"></i>
                    <Link to="users/{name}" className="text-primary underline">
                      Sepehr niki
                    </Link>
                  </div>
                  <div className="sm:col-span-4 flex gap-3 items-center">
                    <i className="fa-regular fa-phone"></i>
                    <Link className="text-primary underline" to="users/{name}">
                      +1 (425) 781-1201
                    </Link>
                  </div>
                  <div className="sm:col-span-4 overflow-hidden flex gap-3 items-center">
                    <i className="fa-regular fa-envelope"></i>
                    <Link className="text-primary underline" to="users/{name}">
                      sepehrniki@gmail.com
                    </Link>
                    <span></span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-semibold">Recent Requests</h2>
                <hr />
                <div className="bg-white  grid grid-cols-1 sm:grid-cols-12 gap-3 p-5 border justify-between rounded">
                  <div className="sm:col-span-4 flex gap-3 items-center">
                    <i className="fa-regular fa-user-plus"></i>
                    <Link to="users/{name}">Sepehr niki</Link>
                  </div>
                  <div className="sm:col-span-4 flex gap-4 items-center">
                    <i className="fa-regular fa-square-info"></i>
                    <span>Adding Business Plan</span>
                  </div>
                  <div className="sm:col-span-4 flex gap-3 items-center text-gray-400 justify-end">
                    <i className="fa-regular fa-calendar"></i>
                    <span>21 Min ago</span>
                  </div>
                </div>
              </div>
            </>
            {/* )} */}
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-semibold">Recent Files</h2>
              <hr />
              <div className="bg-white  grid grid-cols-1 sm:grid-cols-12 gap-3 p-5 border justify-between rounded">
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
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-semibold">Recent Requests</h2>
              <hr />
              <div className="bg-white grid grid-cols-1 sm:grid-cols-12 gap-3 p-5 border justify-between rounded">
                <div className="sm:col-span-9 flex gap-3 items-center">
                  <i className="fa-regular fa-square-info"></i>
                  <Link to="files">
                    {/* {
                    console.log(new Date(today.getFullYear()))} */}
                    Business Plan
                  </Link>
                </div>
                <div className="sm:col-span-3 text-gray-400 flex gap-3 items-center justify-end">
                  <i className="fa-regular fa-calendar"></i>
                  <span>17 Jun</span>
                </div>
              </div>
              <div className="bg-white grid grid-cols-1 sm:grid-cols-12 gap-3 p-5 border justify-between rounded">
                <div className="sm:col-span-8 flex gap-3 items-center">
                  <i className="fa-regular fa-square-info"></i>
                  <Link to="files">
                    {/* {
                    console.log(new Date(today.getFullYear()))} */}
                    Editing Partners Information
                  </Link>
                </div>
                <div className="sm:col-span-4 text-gray-400 flex gap-3 items-center justify-end">
                  <i className="fa-regular fa-calendar"></i>
                  <span>25 Min Ago</span>
                </div>
              </div>
              <div className="bg-white grid grid-cols-1 sm:grid-cols-12 gap-3 p-5 border justify-between rounded">
                <div className="sm:col-span-9 flex gap-3 items-center">
                  <i className="fa-regular fa-square-info"></i>
                  <Link to="files">
                    {/* {
                    console.log(new Date(today.getFullYear()))} */}
                    Adding Partners Information
                  </Link>
                </div>
                <div className="sm:col-span-3 text-gray-400 flex gap-3 items-center justify-end">
                  <i className="fa-regular fa-calendar"></i>
                  <span>13 Jun</span>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </Layout>
    </>
  );
};
export default ProfilePage;
