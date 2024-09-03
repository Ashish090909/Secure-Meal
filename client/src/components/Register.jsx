// Register.js

import React, { useState } from "react";
import {
  FiUser,
  FiLock,
  FiClipboard,
  FiCheckSquare,
  FiUserCheck,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { postAPIcalls } from "../utils/apiCalls";

const Register = ({ toggleRegistration }) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    instituteId: "",
    number:""
  });
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    roll: "",
    number: "",
    branch: "",
    hostelNumber: "",
  });

  const userRegistration = async () => {
    const credentials = {
      email,
      password,
      name: studentDetails.name,
      roll: studentDetails.roll,
      branch: studentDetails.branch,
      number: studentDetails.number,
      hostelNumber: studentDetails.hostelNumber,
    };
    const mid = "auth/student/register";
    const useremail = "";
    const response = await postAPIcalls(mid, useremail, credentials);
    if (response.status === 200) {
        localStorage.setItem("cred", JSON.stringify(response.data)) ;
        navigate('/user-dashboard')
    } else {
    }
  };
  const adminRegistration = async () => {
    const credentials = {
        email,
        password,
        name: adminDetails.name,
        instituteId: adminDetails.instituteId,
        number: adminDetails.number,
    }
    const mid = "auth/admin/register";
    const useremail = "";
    const response = await postAPIcalls(mid, useremail, credentials);
    if (response.status === 200) {
        localStorage.setItem("cred", JSON.stringify(response.data)) ;
        navigate('/user-dashboard')
    } else {
    }
    // console.log(credentials);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    // Add registration logic here (not implemented in this example)
    // const userDetails = {
    //     email,
    //     password,
    //     isAdmin,
    //     // adminDetails: isAdmin ? { ...adminDetails } : null,
    //     // studentDetails: isAdmin ? null : { ...studentDetails },
    // };
    if (isAdmin) {
      adminRegistration();
    } else {
      userRegistration();
    }
    // console.log("Registering with:", userDetails);
  };

  return (
    <form
      onSubmit={handleRegistration}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <FiUser className="text-gray-500 mr-2" />
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor="email"
            >
              Email
            </label>
          </div>
          <input
            type="email"
            id="email"
            className="border rounded w-full py-2 px-3"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <FiLock className="text-gray-500 mr-2" />
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <input
            type="password"
            id="password"
            className="border rounded w-full py-2 px-3"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <FiClipboard className="text-gray-500 mr-2" />
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor="isAdmin"
            >
              Are you an admin?
            </label>
          </div>
          <input
            type="checkbox"
            id="isAdmin"
            className="mr-2"
            onChange={() => setIsAdmin(!isAdmin)}
          />
          <span className="text-gray-700">Yes</span>
        </div>
      </div>
      <div>
        {isAdmin && (
          <div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <FiUserCheck className="text-gray-500 mr-2" />
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="adminName"
                >
                  Admin Name
                </label>
              </div>
              <input
                type="text"
                id="adminName"
                className="border rounded w-full py-2 px-3"
                onChange={(e) =>
                  setAdminDetails({
                    ...adminDetails,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <FiClipboard className="text-gray-500 mr-2" />
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="adminId"
                >
                  Admin ID
                </label>
              </div>
              <input
                type="text"
                id="adminId"
                className="border rounded w-full py-2 px-3"
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, instituteId: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <FiClipboard className="text-gray-500 mr-2" />
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="adminPhone"
                >
                  Phone Number
                </label>
              </div>
              <input
                type="number"
                id="adminPhone"
                className="border rounded w-full py-2 px-3"
                onChange={(e) =>
                  setAdminDetails({
                    ...adminDetails,
                    number: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
        )}
        {!isAdmin && (
          <div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <FiUserCheck className="text-gray-500 mr-2" />
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="name"
                >
                  Name
                </label>
              </div>
              <input
                type="text"
                id="name"
                className="border rounded w-full py-2 px-3"
                onChange={(e) =>
                  setStudentDetails({ ...studentDetails, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <FiClipboard className="text-gray-500 mr-2" />
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="roll"
                >
                  Roll No
                </label>
              </div>
              <input
                type="text"
                id="roll"
                className="border rounded w-full py-2 px-3"
                onChange={(e) =>
                  setStudentDetails({ ...studentDetails, roll: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <FiClipboard className="text-gray-500 mr-2" />
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="branch"
                >
                  Branch
                </label>
              </div>
              <input
                type="text"
                id="branch"
                className="border rounded w-full py-2 px-3"
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    branch: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <FiClipboard className="text-gray-500 mr-2" />
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="number"
                >
                  Phone Number
                </label>
              </div>
              <input
                type="number"
                id="number"
                className="border rounded w-full py-2 px-3"
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    number: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <FiClipboard className="text-gray-500 mr-2" />
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="hostelNumber"
                >
                  Hostel No
                </label>
              </div>
              <input
                type="number"
                id="hostelNumber"
                className="border rounded w-full py-2 px-3"
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    hostelNumber: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="col-span-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
      >
        Register
      </button>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <span
          className="text-indigo-600 cursor-pointer"
          onClick={toggleRegistration}
        >
          Login here
        </span>
      </p>
    </form>
  );
};

export default Register;
