import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { RiHome2Line } from "react-icons/ri";
import { RiCoupon3Line } from "react-icons/ri";
import { GiMeal } from "react-icons/gi";
import { FaNotEqual, FaRegCircleUser } from "react-icons/fa6";
import { TiContacts } from "react-icons/ti";
import { MdOutlineRateReview } from "react-icons/md";
import Button from "./Button";

export const SideNavbar = () => {
    // const isAdmin = true; // Change this based on your authentication logic
    const [isAdmin, setIsAdmin] = useState(() => {
        console.log(JSON.parse(localStorage.getItem("cred")).admin);
        JSON.parse(localStorage.getItem("cred")).admin;
    });

    // useEffect(() => {
    //   setIsAdmin(JSON.parse(localStorage.getItem("adminCred")).admin)
    // }, [])


    const [activeLink, setActiveLink] = useState("/user-dashboard");

    const navlinks = [
        {
            label: "Dashboard",
            link: "/user-dashboard",
            icon: <RiHome2Line className="text-xl mx-2" />,
        },
        {
            label: "Profile",
            link: "/profile",
            icon: <FaRegCircleUser className="text-xl mx-2"/>
        },
        {
            label: "Coupons",
            link: "/coupons",
            icon: <RiCoupon3Line className="text-xl mx-2" />,
        },
        {
            label: "Meal Chart",
            link: "/mealchart",
            icon: <GiMeal className="text-xl mx-2" />,
        },
        {
            label: "Reviews",
            link: "/reviews",
            icon: <MdOutlineRateReview className="text-xl mx-2" />,
        },
        {
            label: "Complains",
            link: "/complains",
            icon: <FaNotEqual className="text-xl mx-2" />,
        },
        {
            label: "Contacts",
            link: "/contacts",
            icon: <TiContacts className="text-xl mx-2" />,
        }
    ];

    const handleLinkClick = (link) => {
        // Update the state after the click event has been processed
        setActiveLink(link);
    };

    useEffect(() => {
        // Update the state immediately after the click event has been processed
        setActiveLink(window.location.pathname);
    }, [isAdmin]);

    const navigate = useNavigate();
    const handleLogout =  () =>{
            localStorage.removeItem("cred");
            navigate("/")
    }

    return (
        <div className=" shadow-lg bg-white text-left  justify-between  px-2 rounded-lg w-72 border-solid border-1 border-black hidden lg:block h-full m-2 ">
            <div className="text-center">
                <div className="text-2xl mb-6 mt-4">Mess Guardian</div>
                <div>
                    {navlinks.map((d, i) => (
                        <Link
                            key={i}
                            className={`block rounded-lg m-2 p-4 w-64 text-center ${activeLink === d.link
                                    ? " px-4 py-2 rounded-lg  bg-gray-700 text-base font-medium text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
                                    : "hover:text-black"
                                }`}
                            to={d.link}
                            onClick={() => handleLinkClick(d.link)}
                        >
                            <div className="flex">
                                {d.icon}
                                {d.label}
                            </div>
                        </Link>
                    ))}
                </div>
                <button
                      className="bg-red-400 text-white px-4 py-2 mx-2 mt-36 rounded-md "
                      onClick={handleLogout}
                    >Logout</button>
            </div>
        </div>


    );
}

export default SideNavbar;
