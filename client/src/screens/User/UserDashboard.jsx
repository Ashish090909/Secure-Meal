import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Popup from "reactjs-popup";
import SideNavbar from "../../components/SideNavbar";
import { LuUserCircle2 } from "react-icons/lu";
import QrCodeScanner from "../../components/QrCodeScanner";
import Loading from "../../components/Loading";
import Close from "../../components/close";
import Check from "../../components/Check";
// import Close from "../../components/Close";


const UserDashboard = () => {

    const [isScanQrCodePopupOpen, setScanQrCodePopupOpen] = useState(false);
    const [newImage, setnewImage] = useState([{}]);

    const openScanQrCodePopup = () => {
        setScanQrCodePopupOpen(true);
    };

    const closeScanQrCodePopup = () => {
        setScanQrCodePopupOpen(false);
    };

    //   const toggleScanQrCodePopup = () => {
    //     setScanQrCodePopupOpen(!isScanQrCodePopupOpen);
    //   };


    const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem("cred")).admin);

    // console.log(JSON.parse(localStorage.getItem("userCred")).admin)
    useEffect(() => {
        setIsAdmin(JSON.parse(localStorage.getItem("cred")).admin)
    }, [])


    const [showElement, setShowElement] = React.useState(true)
    useEffect(() => {
        setTimeout(function () {
            setShowElement(false)
        }, 3000);
    },
        [])

    // const [meal, setMeal] = useState([]);
    const meals = [
        { breakfast: 'omlete' },
        { lunch: 'chawal' },
        { snacks: 'samosa' },
        { dinner: 'biryani' }
    ]

    return (
        <div>
            {
                isAdmin ?
                    <div className="flex h-screen overflow-hidden pb-4">
                        <SideNavbar />
                        <div className="flex flex-col flex-1 overflow-hidden">
                            <Navbar />
                            <div className="flex-1 overflow-y-auto bg-gray-200 py-14 ">
                                <div className="text-right mx-4 ">
                                    <div className="text-2xl">{JSON.parse(localStorage.getItem("cred")).name}</div>
                                    {isAdmin ? <div className="">Admin</div> : <div>Student</div>
                                    }
                                </div>

                                <div className=" px-4 mt-20 justify-center text-center">
                                    <div className="text-center">
                                        <div
                                            className="shadow-md bg-green-500 text-left flex justify-between px-6 py-4 lg:h-16 rounded-lg text-white cursor-pointer"
                                            onClick={openScanQrCodePopup}
                                        >
                                            <div className="text-md etxt-center">Scan QR Code</div>
                                        </div>
                                        {/* <Loading /> */}
                                    </div>

                                    {/* ... Other content ... */}

                                </div>

                                {/* Scan QR Code Popup */}
                                <Popup
                                    open={isScanQrCodePopupOpen}
                                    onClose={closeScanQrCodePopup}
                                    modal
                                    contentStyle={{
                                        width: "80%",
                                        maxHeight: "80%",
                                        margin: "auto",
                                        padding: 0,
                                        borderRadius: "8px",
                                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                                        backgroundColor: "#fff",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div className="w-full h-full p-4 flex flex-col justify-center items-center">
                                        {/* Your popup content goes here */}
                                        <QrCodeScanner />
                                        {/* Add your QR code scanning logic or any other content */}
                                        {/* <button
                                            className="px-4 py-2 rounded mt-4 bg-red-400 text-white hover:bg-red-500 focus:ring-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                            onClick={closeScanQrCodePopup}
                                        >
                                            Close Popup
                                        </button> */}
                                        {showElement ?
                                            <div>
                                                {/* Your content goes here */}
                                                <Check onClick={setShowElement(false)} />
                                            </div> : ""
                                        }
                                        <div onClick={closeScanQrCodePopup}>
                                            <Close />
                                        </div>

                                    </div>
                                </Popup>
                            </div>
                        </div>
                    </div>

                    :

                    <div className="flex h-screen overflow-hidden pb-4">
                        <SideNavbar />
                        <div className="flex flex-col flex-1 overflow-hidden">
                            <Navbar />
                            <div className="flex-1  overflow-y-auto bg-gray-200 py-16  ">
                                <div className="text-right mx-4 ">
                                    <div className="text-3xl font-bold">{JSON.parse(localStorage.getItem("cred")).name}</div>
                                    <div className="">{JSON.parse(localStorage.getItem("cred")).roll}</div>
                                    {isAdmin ? <div className="">Admin</div> : <div>Student</div>
                                    }
                                </div>

                                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 px-4 mt-2 ">
                                    <div>
                                        <div className="shadow-md bg-green-500 text-left flex justify-between px-6 py-4 lg:h-16 rounded-lg text-white">
                                            <div className="text-md">Your Balance:</div>
                                            <div className="text-md">Rs. 25000</div>
                                        </div>
                                        <div className="shadow-md bg-red-100 text-left flex justify-between px-6 py-4 mt-4 rounded-lg">
                                            <div className="">
                                                <div className="text-xl">Notice:</div>
                                                <div className="text-sm">
                                                    Dear hostel-12 students,

                                                    We hope this message finds you in good health and high spirits. As part of our ongoing efforts to foster communication and collaboration within our hostel community, we are excited to announce an upcoming community meeting.
                                                    <br/>
                                                    Date and Time:
                                                    The community meeting is scheduled for [date] at [time]. We encourage all residents to attend and actively participate in shaping the discussions that will impact our shared living environment.
                                                    <br/>
                                                    Agenda Topics:
                                                    <br/>
                                                    Introduction of New Residents
                                                    Updates from the Hostel Administration
                                                    Community Feedback Session
                                                    Upcoming Events and Activities
                                                    Open Floor for Resident Suggestions
                                                    <br/>

                                                    Thank you for being a valued member of our hostel community.
                                                    <br/>
                                                    Best regards,
                                                    <br/>
                                                    Warden, H-12
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="shadow-md bg-gray-100 rounded-lg">

                                            <div className="my-4">Vote for change</div>
                                        </div> */}
                                    </div>

                                    <div className="shadow-md bg-gray-100 rounded-lg block lg:pt-24 lg:pl-16 px-32">
                                        <img className="item-center" src="data:image/png;base64,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" />
                                    </div>
                                    {/* <div className="shadow-md bg-gray-100 rounded-lg">
                                        <div>
                                        <div>Breakfast:
                                            </div>
                                            {meals.breakfast}
                                    </div>
                                    <div className="shadow-md bg-gray-100 rounded-lg">
                                        <div>Lunch:
                                            </div>
                                            {meals.lunch}
                                    </div>
                                    <div className="shadow-md bg-gray-100 rounded-lg">
                                        <div>Snacks:
                                            </div>
                                            {meals.snacks}
                                    </div>
                                    <div className="shadow-md bg-gray-100 rounded-lg">
                                        <div>Dinner:
                                            </div>
                                            {meals.dinner}
                                    </div>
                                            </div> */}



                                </div>

                                <Popup />

                            </div>

                        </div>
                    </div>
            }
        </div>





    );
}

export default UserDashboard