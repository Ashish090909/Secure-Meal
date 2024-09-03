import React, { useState, useEffect } from "react";
import { Link, useNavigate,  } from 'react-router-dom';
import clsx from "clsx";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { LuUserCircle2 } from "react-icons/lu";
import DropdownMenu from "./DropDownMenu";
import { RiCoupon3Line } from "react-icons/ri";
import { GiMeal } from "react-icons/gi";
import { FaNotEqual } from "react-icons/fa6";
import { TiContacts } from "react-icons/ti";
import { RiHome2Line } from "react-icons/ri";
import { MdOutlineRateReview } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import Button from "./Button";

export const Navbar = () => {
    const [isSideMenuOpen, setMenu] = useState(false);

    const [activeLink, setActiveLink] = useState("/user-dashboard");
    // const [showSidebar, setShowSidebar] = useState(false);

    const navigate = useNavigate();

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

        // On small screens, hide the sidebar after clicking a link
        if (window.innerWidth <= 768) {
            setShowSidebar(false);
        }
    };

    useEffect(() => {
        // Update the state immediately after the click event has been processed
        setActiveLink(window.location.pathname);
    }, []);

    const handleLogout =  () =>{
        localStorage.removeItem("cred");
        navigate("/");
}


    return (
        <div className="px-3 py-3 lg:py-2  w-full bg-stone-100  fixed lg:z-0 z-50">
            
            <nav className="flex  " >
            <HiOutlineMenuAlt1
                            onClick={() => setMenu(true)}
                            className="text-3xl cursor-pointer lg:hidden"
                        />
  

                {/* sidebar mobile menu */}
                <div
                    className={
                        " sidebar shadow-xl left-0 text-whitez-1 ease-in-out duration-300 fixed h-full w-full  bg-black/50 backdrop-blur-sm top-0 right-0 " +
                        (isSideMenuOpen ? "translate-x-0 transition-all" : "-translate-x-full") 
                      }
                >
                    
                    <div className=" shadow-lg bg-white   justify-between  px-2 rounded-lg w-72 border-solid border-1 border-black block  h-full">
                    <div className="text-center">
                    <HiOutlineMenuAlt1 onClick={() => setMenu(false)} className="relative z-50 flex items-center cursor-pointer text-3xl left-60" />
                        <div className="text-2xl mb-10">Mess Guardian</div>
                        <div>
                            {navlinks.map((d, i) => (
                                <Link
                                    key={i}
                                    className={`block rounded-lg m-2 p-4 w-64 text-center ${
                                        activeLink === d.link
                                            ? "px-4 py-2 rounded-lg  bg-gray-700 text-base font-medium text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
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
                      className="bg-red-400 text-white px-4 py-2 mx-2 mt-16 rounded-md"
                      onClick={handleLogout }
                    >Logout</button>
                    </div>
                </div>
                </div>

                {/* last section */}
                <section className="flex items-center gap-4 justify-right">
                   
                    <DropdownMenu />

                </section>
            </nav>
            {false && <hr className=" " />}
        </div>
    );
}

export default Navbar;