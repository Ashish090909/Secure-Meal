import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import SideNavbar from "../../components/SideNavbar";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { getAPIcalls } from "../../utils/apiCalls";
// import {api}
// import numberModal from '../../components/numberModal';
// import ReviewModal from '../../components/ReviewModal'

const Profile = () => {
  const navigate = useNavigate();
  const [admin, setadmin] = useState(
    JSON.parse(localStorage.getItem("cred")).admin
  );
  const [student, setstudent] = useState({
    name: "",
    roll: "",
    branch: "",
    number: "",
    ema: "",
    hn: "",
  });
  const [sec, setsec] = useState({
    name: "",
    ema: "",
    number: "",
  });
  const handleLogout = () => {
    localStorage.removeItem("cred");
    navigate("/");
  };
  const fetchingStudent = async () => {
    const email = JSON.parse(localStorage.getItem("cred")).email;
    const mid = "operation/student/get-details/";
    try {
      const response = await getAPIcalls(mid, email);
      if (response.status === 200) {
        setstudent({
          name: response.data.name,
          roll: response.data.roll,
          branch: response.data.branch,
          number: response.data.phone,
          ema: response.data.name,
          hn: response.data.hostelNumber,
        });
      }
    } catch (error) {}
  };
  const fetchingAdmin = async () => {
    const email = JSON.parse(localStorage.getItem("cred")).email;
    const mid = "operation/admin/get-details/";
    try {
      const response = await getAPIcalls(mid, email);
      if (response.status === 200) {
        setsec({
          name: response.data.name,
          ema: response.data.email,
          number: response.data.number,
        });
        console.log(sec.name);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (!admin) fetchingStudent();
    else fetchingAdmin();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden pb-4">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1  overflow-y-auto overflow-x-hidden bg-gray-200 py-16 px-4">
          <div className="text-right mx-4 mb-8 lg:mb-4 font-bold">
            <div className="text-3xl">Profile</div>
          </div>
          <div>
            <div className="max-w-2xl mx-4  sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-20 bg-white shadow-sm rounded-lg text-gray-900">
              <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <img
                  className="object-cover object-center h-32"
                  src="public/user.png"
                  alt="Woman looking front"
                />
              </div>
              <div className="text-center mt-2">
                <h2 className="font-semibold">{!admin ?student.name : sec.name}</h2>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg border">
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                      {!admin ?"Roll Number" : "Institute Id"}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {!admin ?student.roll : "123"}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">{!admin ?"Branch" : "Dep"}</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {!admin ?student.branch : "Clerk"}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {!admin ?student.number : sec.number}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {!admin ?student.ema : sec.ema}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Hostel Number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {!admin ?student.hn : sec.ema.substring(0,2)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <button
            className="bg-red-400 text-white px-4 py-2 mx-2 mt-6 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
