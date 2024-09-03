// Login.js

import React, { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { postAPIcalls } from "../utils/apiCalls";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [correctCredentials, setCorrectCredentials] = useState(true);
  const [registrationError, setRegistrationError] = useState(0);
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    instituteId: "",
    number: ""
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
      email:username,
      password,
      name: studentDetails.name,
      roll: studentDetails.roll,
      branch: studentDetails.branch,
      number: studentDetails.number,
      hostelNumber: studentDetails.hostelNumber,
    };
    const mid = "auth/student/register";
    const useremail = "";
    try {
      const response = await postAPIcalls(mid, useremail, credentials);
    if (response.status === 200) {
      localStorage.setItem("cred", JSON.stringify(response.data));
      navigate('/user-dashboard')
    } 
    } catch (error) {
      if (error.response.status === 401) {
        setRegistrationError(1);
        console.log("Ritik chutiya");
      }
    }
  };
  const adminRegistration = async () => {
    const credentials = {
      email:username,
      password,
      name: adminDetails.name,
      instituteId: adminDetails.instituteId,
      number: adminDetails.number,
    }
    const mid = "auth/admin/register";
    const useremail = "";
    
    try {
      const response = await postAPIcalls(mid, useremail, credentials);
      if (response.status === 200) {
        localStorage.setItem("cred", JSON.stringify(response.data));
        navigate('/user-dashboard')
      }
    } catch (error) {
      if (error.response.status === 401) {
        setRegistrationError(1);
        console.log("RItik chutiya");
      }
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





  let navigate = useNavigate();

  const userLogin = async (e) => {
    const mid = "auth/student/login";
    const email = "";

    const credentials = {
      email: username,
      password,
    };
    try {
      const response = await postAPIcalls(mid, email, credentials);
    if (response.status === 200) {
      localStorage.setItem("cred", JSON.stringify(response.data));
      navigate('/user-dashboard');
    } 
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setCorrectCredentials(false);
        console.log("ritik is bad");
      }
    }
      //not login successfully     
  }

  const adminLogin = async (e) => {
    const mid = "auth/admin/login";
    const email = '';
    const credentials = {
      email: username,
      password,
    }
    try {
      const response = await postAPIcalls(mid, email, credentials);
    if (response.status === 200) {
      localStorage.setItem("cred", JSON.stringify(response.data));
      navigate('/user-dashboard');
    }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setCorrectCredentials(false);
        console.log("ritik is bad");
      }
    }
      //not login successfully
    

  }

  const handleLogin = async (e) => {
    e.preventDefault();
    // Add authentication logic here (not implemented in this example)
    const hostel = username.substring(0, 5);
    if (hostel.toLowerCase() === 'btech') {
      userLogin();
    }
    else {
      adminLogin();
    }
    // console.log(response);
    // console.log("Logging in with:", { username, password });
  };

  const toggleRegistration = () => {
    setIsRegistered(!isRegistered);
    console.log(isRegistered)
  };

  return (
    <div>
      {
        isRegistered ?
          <div class="h-screen md:flex">
            <div
              class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
              <div>
                <h1 class="text-white font-bold text-4xl font-sans">Mess Guardian</h1>
                <p class="text-white mt-1">Your Mess Companion</p>

              </div>
              <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
              <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
              <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
              <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            </div>
            <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
              <form class="bg-white">
                <h1 class="text-gray-800 font-bold text-2xl mb-1">Login</h1>
                <p class="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>


                <div class="flex items-center border-2 py-2 px-3 rounded-lg mb-4" >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div class="flex items-center border-2 py-2 px-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <input class="pl-2 outline-none border-none" type="password" name="" id="" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                {
                  correctCredentials ? "" :
                  <div className="text-red-500">Wrong Username or Password!</div>
                }
                <button type="submit" class="block w-full bg-indigo-600 mt-4 py-2 rounded-lg text-white font-semibold mb-2" onClick={handleLogin}>Login</button>
                <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer flex justify-between"><div>Do not have account? </div>
                  <div onClick={toggleRegistration}>Register</div>
                </span><br />
                <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>

              </form>
            </div>
          </div>
          :

          <div class="h-screen md:flex">
            <div
              class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
              <div>
                <h1 class="text-white font-bold text-4xl font-sans">Mess Guardian</h1>
                <p class="text-white mt-1">Your Mess Companion</p>

              </div>
              <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
              <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
              <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
              <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            </div>
            <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
              <form class="bg-white">
                <h1 class="text-gray-800 font-bold text-2xl mb-1">Register</h1>
                <p class="text-sm font-normal text-gray-600 mb-7">Please fill the details</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div class="flex items-center border-2 py-2 px-3 rounded-lg mb-4" >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div class="flex items-center border-2 py-2 px-3 rounded-lg mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clip-rule="evenodd" />
                      </svg>
                      <input class="pl-2 outline-none border-none" type="password" name="" id="" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div>
                      <label>
                        <input type="checkbox" onChange={(e) => setIsAdmin(!isAdmin)} />
                        Are you an Admin?
                      </label>

                    </div>
                  </div>

                  {
                    isAdmin ?
                      <div>
                        <div class="flex items-center border-2 py-2 px-3 rounded-lg mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clip-rule="evenodd" />
                          </svg>
                          <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Full name" onChange={(e) =>
                            setAdminDetails({
                              ...adminDetails,
                              name: e.target.value,
                            })
                          }
                            required />
                        </div>
                        <div class="flex items-center border-2 py-2 px-3 rounded-lg mb-4">
                          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <rect class="stroke-current fill-none stroke-black stroke-linecap-round stroke-linejoin-round" x="5.6751" y="10.9786" width="36.6498" height="26.0429" rx="3" />
                            <circle class="stroke-current fill-none stroke-black stroke-linecap-round stroke-linejoin-round" cx="14.8376" cy="21.4867" r="3.5632" />
                            <path class="stroke-current fill-none stroke-black stroke-linecap-round stroke-linejoin-round" d="M10.3276,31.0945h9.7835a.92.92,0,0,0,.6994-1.5192,7.1719,7.1719,0,0,0-11.1823,0,.92.92,0,0,0,.6994,1.5192Z" />
                            <line class="stroke-current fill-none stroke-black stroke-linecap-round stroke-linejoin-round" x1="28.7085" y1="20.8504" x2="35.7076" y2="20.8504" />
                            <line class="stroke-current fill-none stroke-black stroke-linecap-round stroke-linejoin-round" x1="28.7085" y1="27.7222" x2="35.7076" y2="27.7222" />
                            <line class="stroke-current fill-none stroke-black stroke-linecap-round stroke-linejoin-round" x1="28.7085" y1="24.2863" x2="38.38" y2="24.2863" />
                          </svg>

                          <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Institute Id" className="border rounded w-full py-2 px-3"
                            onChange={(e) =>
                              setAdminDetails({ ...adminDetails, instituteId: e.target.value })
                            }
                            required />
                        </div>
                        <div class="flex items-center border-2 py-2 px-3 rounded-lg mb-4" >
                          <svg class="w-5 h-5" fill="#9ca3af" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" d="M14 2C14 2 16.2 2.2 19 5C21.8 7.8 22 10 22 10" />
                            <path stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" d="M14.207 5.53564C14.207 5.53564 15.197 5.81849 16.6819 7.30341C18.1668 8.78834 18.4497 9.77829 18.4497 9.77829" />
                            <path stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" opacity="0.5" d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z" />
                          </svg>

                          <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Phone Number" onChange={(e) =>
                            setAdminDetails({
                              ...adminDetails,
                              number: e.target.value,
                            })
                          }
                            required />
                        </div>
                      </div> :

                      <div>
                        <div class="flex items-center border-2 py-2 px-3 rounded-lg mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clip-rule="evenodd" />
                          </svg>
                          <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Full name" onChange={(e) =>
                            setStudentDetails({ ...studentDetails, name: e.target.value })
                          }
                            required />
                        </div>
                        <div class="flex items-center border-2 py-2 px-3 rounded-lg mb-4">
                          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <rect class="stroke-current fill-none stroke-black stroke-linecap-round stroke-linejoin-round" x="5.6751" y="10.9786" width="36.6498" height="26.0429" rx="3" />
                            <circle class="stroke-current fill-none stroke-black stroke-linecap-round stroke-linejoin-round" cx="14.8376" cy="21.4867" r="3.5632" />
                            <path class="stroke-current fill-none stroke-black stroke-linecap-round stroke-linejoin-round" d="M10.3276,31.0945h9.7835a.92.92,0,0,0,.6994-1.5192,7.1719,7.1719,0,0,0-11.1823,0,.92.92,0,0,0,.6994,1.5192Z" />
                            <line class="stroke-current fill-none stroke-black stroke-linecap-round stroke-linejoin-round" x1="28.7085" y1="20.8504" x2="35.7076" y2="20.8504" />
                            <line class="stroke-current fill-none stroke-black stroke-linecap-round stroke-linejoin-round" x1="28.7085" y1="27.7222" x2="35.7076" y2="27.7222" />
                            <line class="stroke-current fill-none stroke-black stroke-linecap-round stroke-linejoin-round" x1="28.7085" y1="24.2863" x2="38.38" y2="24.2863" />
                          </svg>

                          <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Roll Number" onChange={(e) =>
                            setStudentDetails({ ...studentDetails, roll: e.target.value })
                          }
                            required />
                        </div>
                        <div class="flex items-center border-2 py-2 px-3 rounded-lg mb-4" >
                          <svg class="w-5 h-" fill="#9ca3af" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" mirror-in-rtl="true">
                            <path d="M7.857 10H2.142C.962 10 0 9.04 0 7.857V2.143C0 .96.96 0 2.142 0h5.715C9.04 0 10 .96 10 2.143v5.714C10 9.04 9.04 10 7.857 10zM2.142 2C2.066 2 2 2.067 2 2.143v5.714c0 .076.066.143.142.143h5.715C7.933 8 8 7.933 8 7.857V2.143C8 2.067 7.933 2 7.857 2H2.142zM7.857 24H2.142C.962 24 0 23.04 0 21.857v-5.715C0 14.962.96 14 2.142 14h5.715C9.04 14 10 14.96 10 16.143v5.715C10 23.038 9.04 24 7.857 24zm-5.715-8c-.076 0-.142.066-.142.143v5.715c0 .076.066.142.142.142h5.715c.076 0 .143-.066.143-.143v-5.715c0-.076-.067-.142-.143-.142H2.142zM21.857 24h-5.715C14.96 24 14 23.04 14 21.857v-5.715C14 14.96 14.96 14 16.142 14h5.715C23.04 14 24 14.96 24 16.14v5.715C24 23.04 23.037 24 21.856 24zm-5.715-8c-.076 0-.143.066-.143.143v5.715c0 .076.065.143.142.143h5.715c.076 0 .143-.065.143-.142v-5.715c0-.076-.066-.143-.143-.143h-5.715zM17.818 12.364c-.55 0-1.098-.208-1.516-.626l-4.04-4.04c-.837-.836-.837-2.196 0-3.03L16.3.625c.808-.808 2.225-.807 3.03 0l4.04 4.04c.837.835.837 2.195 0 3.03l-4.04 4.04c-.418.42-.967.628-1.514.628zm0-10.364c-.028 0-.067.007-.102.04l-4.04 4.04c-.055.055-.055.15 0 .203l4.04 4.04c.055.055.147.056.202 0l4.04-4.04c.055-.054.055-.148 0-.202l-4.04-4.04c-.034-.033-.073-.04-.1-.04z" />
                          </svg>

                          <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Branch" onChange={(e) =>
                            setStudentDetails({
                              ...studentDetails,
                              branch: e.target.value,
                            })
                          }
                            required />
                        </div>
                        <div class="flex items-center border-2 py-2 px-3 rounded-lg mb-4" >
                          <svg class="w-5 h-5" fill="#9ca3af" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" d="M14 2C14 2 16.2 2.2 19 5C21.8 7.8 22 10 22 10" />
                            <path stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" d="M14.207 5.53564C14.207 5.53564 15.197 5.81849 16.6819 7.30341C18.1668 8.78834 18.4497 9.77829 18.4497 9.77829" />
                            <path stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" opacity="0.5" d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z" />
                          </svg>

                          <input class="pl-2 outline-none border-none" type="number" name="" id="" placeholder="Phone Number" className="border rounded w-full py-2 px-3"
                            onChange={(e) =>
                              setStudentDetails({
                                ...studentDetails,
                                number: e.target.value,
                              })
                            }
                            required />
                        </div>
                        <div class="flex items-center border-2 py-2 px-3 rounded-lg">
                          <svg class="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path class="fill-current text-blue-600 opacity-25" d="M5 14.0585C5 13.0494 5 12.5448 5.22166 12.1141C5.44333 11.6833 5.8539 11.3901 6.67505 10.8035L10.8375 7.83034C11.3989 7.42938 11.6795 7.2289 12 7.2289C12.3205 7.2289 12.6011 7.42938 13.1625 7.83034L17.325 10.8035C18.1461 11.3901 18.5567 11.6833 18.7783 12.1141C19 12.5448 19 13.0494 19 14.0585V19C19 19.9428 19 20.4142 18.7071 20.7071C18.4142 21 17.9428 21 17 21H7C6.05719 21 5.58579 21 5.29289 20.7071C5 20.4142 5 19.9428 5 19V14.0585Z" />
                            <path class="fill-current text-gray-400" d="M3 12.3866C3 12.6535 3 12.7869 3.0841 12.8281C3.16819 12.8692 3.27352 12.7873 3.48418 12.6234L10.7721 6.95502C11.362 6.49625 11.6569 6.26686 12 6.26686C12.3431 6.26686 12.638 6.49625 13.2279 6.95502L20.5158 12.6234C20.7265 12.7873 20.8318 12.8692 20.9159 12.8281C21 12.7869 21 12.6535 21 12.3866V11.9782C21 11.4978 21 11.2576 20.8983 11.0497C20.7966 10.8418 20.607 10.6944 20.2279 10.3995L13.2279 4.95502C12.638 4.49625 12.3431 4.26686 12 4.26686C11.6569 4.26686 11.362 4.49625 10.7721 4.95502L3.77212 10.3995C3.39295 10.6944 3.20337 10.8418 3.10168 11.0497C3 11.2576 3 11.4978 3 11.9782V12.3866Z" />
                            <path class="fill-current text-gray-400" d="M12.5 15H11.5C10.3954 15 9.5 15.8954 9.5 17V20.85C9.5 20.9328 9.56716 21 9.65 21H14.35C14.4328 21 14.5 20.9328 14.5 20.85V17C14.5 15.8954 13.6046 15 12.5 15Z" />
                            <rect class="fill-current text-gray-400" x="16" y="5" width="2" height="4" rx="0.5" />
                          </svg>

                          <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Hostel Number" onChange={(e) =>
                            setStudentDetails({
                              ...studentDetails,
                              hostelNumber: e.target.value,
                            })
                          }
                            required />
                        </div>

                      </div>
                  }



                </div>
                  {
                    (registrationError == 1) ? <div className="text-red-500">
                    User already Registered.
                  </div> 
                  : ""
                    
                  }
                <button type="submit" class="block w-full bg-indigo-600 mt-4 py-2 rounded-lg text-white font-semibold mb-2" onClick={handleRegistration}>Register</button>
                <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer flex justify-between">
                  <div className="mx-2">Already have an account? </div>
                  <div onClick={toggleRegistration}>Login</div>
                </span><br />
                <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>

              </form>
            </div>
          </div>

      }
    </div>
  )


};

export default Login;
