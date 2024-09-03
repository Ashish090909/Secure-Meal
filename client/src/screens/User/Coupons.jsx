import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { RiCoupon3Line } from "react-icons/ri";
import Button from "../../components/Button";
import PopupBox from "../../components/PopupBox";
import CouponsCarousel from "../../components/CouponsCarousel";
import CouponSlider from "../../components/CouponSlider";
import SideNavbar from "../../components/SideNavbar";
import TimePicker from "react-time-picker";
import { getAPIcalls, postAPIcalls } from "../../utils/apiCalls";
import a from '../../assets/pics/a.png'
import Close from "../../components/close";
import Popup from "reactjs-popup";

const Coupons = () => {
  // const breakfast = () => {
  //   console.log(event.target.value);
  // };

  // const lunch = () => {
  //   console.log(event.target.value);
  // };

  // const snacks = () => {
  //   console.log(event.target.value);
  // };

  // const dinner = () => {
  //   console.log(event.target.value);
  // };

  // const generate = () => {
  //   console.log(event.target.value);
  // };
  
  const [newImage, setnewImage] = useState([{}]) ;

  const [isAdmin, setIsAdmin] = useState(() => {
    console.log(JSON.parse(localStorage.getItem("cred")).admin);
    JSON.parse(localStorage.getItem("cred")).admin;
  });

  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem("cred")).admin);
  }, []);

  const [formData, setFormData] = useState({
    mealOneS: "",
    mealOneE: "",
    mealTwoS: "",
    mealTwoE: "",
    mealThreeS: "",
    mealThreeE: "",
    mealFourS: "",
    mealFourE: "",
  });

  const handleInputChange = (meal, timeType, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${meal}${timeType}`]: value,
    }));
  };

  const generateJSON = async () => {
    const mid = "operation/admin/set-time/";
    const email = JSON.parse(localStorage.getItem("cred")).email;
    try {
      const response = await postAPIcalls(mid, email, formData);
    if (response.status === 200) {
      console.log("good");
      openScanQrCodePopup();
    } 
      
    } catch (error) {
      
    }
    
  };

  const fetching = async () => {
    const mid = "operation/student/get-my-qr/";
    const email = JSON.parse(localStorage.getItem("cred")).email;
    try {
      const response = await getAPIcalls(mid, email);
      // console.log(response.data);
      if (response.status === 200) {
        console.log("changing");
        // setimages([]) ;
        await setnewImage([
          {
            url: response.data.qrCode1.code,
            meal: "Breakfast",
          },
          {
            url: response.data.qrCode2.code,
            meal: "Lunch",
          },
          {
            url: response.data.qrCode3.code,
            meal: "Snacks",
          },
          {
            url: response.data.qrCode4.code,
            meal: "Dinner",
          },
        ]) ;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("ritik is bad");
      }
    }
  };

  useEffect(() => {
    if (isAdmin === false) {
      fetching();
    }
  }, [isAdmin]);

  const handleTest = () => {
    console.log(localStorage.getItem(cred));
  };

  const [isScanQrCodePopupOpen, setScanQrCodePopupOpen] = useState(false);

    const openScanQrCodePopup = () => {
        setScanQrCodePopupOpen(true);
    };

    const closeScanQrCodePopup = () => {
        setScanQrCodePopupOpen(false);
    };

  return (
    <div className="flex h-screen overflow-hidden pb-4">
      <SideNavbar />
      <div className="flex flex-col flex-1 lg:overflow-hidden">
        <Navbar />
        <div className="flex-1  overflow-y-auto bg-gray-200 py-16 px-4 ">
          <div className="text-right text-3xl font-bold mx-4 lg:mb-0 mb-16">
            <div>Your Coupons</div>
          </div>
          {isAdmin === true ? (
            <div>
              <div className="text-2xl font-bold mb-8">Generate Meal</div>
              <div className="flex justify-center items-center text px-8 ">
                <form action="">
                  <div className="grid grid-cols-1 items-center">
                    <label className="text-xl font-bold">Breakfast</label>
                    <div className="grid grid-cols-2 gap-24">
                      <div>
                        <label htmlFor="mealOneS" className="mb-2">
                          Select start time:
                        </label>
                        <input
                          type="time"
                          id="mealOneS"
                          name="mealOneS"
                          className="border p-2 mb-4"
                          onChange={(e) =>
                            handleInputChange("mealOne", "S", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="mealOneE" className="mb-2">
                          Select end time:
                        </label>
                        <input
                          type="time"
                          id="mealOneE"
                          name="mealOneE"
                          className="border p-2 mb-4"
                          onChange={(e) =>
                            handleInputChange("mealOne", "E", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <label className="text-xl font-bold">Lunch</label>
                    <div className="grid grid-cols-2 gap-24">
                      <div>
                        <label htmlFor="mealTwoS" className="mb-2">
                          Select start time:
                        </label>
                        <input
                          type="time"
                          id="mealTwoS"
                          name="mealTwoS"
                          className="border p-2 mb-4"
                          onChange={(e) =>
                            handleInputChange("mealTwo", "S", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="mealTwoE" className="mb-2">
                          Select end time:
                        </label>
                        <input
                          type="time"
                          id="mealTwoE"
                          name="mealTwoE"
                          className="border p-2 mb-4"
                          onChange={(e) =>
                            handleInputChange("mealTwo", "E", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <label className="text-xl font-bold">Snacks</label>
                    <div className="grid grid-cols-2 gap-24">
                      <div>
                        <label htmlFor="mealOneS" className="mb-2">
                          Select start time:
                        </label>
                        <input
                          type="time"
                          id="mealOneS"
                          name="mealOneS"
                          className="border p-2 mb-4"
                          onChange={(e) =>
                            handleInputChange("mealThree", "S", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="mealOneE" className="mb-2">
                          Select end time:
                        </label>
                        <input
                          type="time"
                          id="mealOneE"
                          name="mealOneE"
                          className="border p-2 mb-4"
                          onChange={(e) =>
                            handleInputChange("mealThree", "E", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <label className="text-xl font-bold">Dinner</label>
                    <div className="grid grid-cols-2 gap-24">
                      <div>
                        <label htmlFor="mealOneS" className="mb-2">
                          Select start time:
                        </label>
                        <input
                          type="time"
                          id="mealOneS"
                          name="mealOneS"
                          className="border p-2 mb-4"
                          onChange={(e) =>
                            handleInputChange("mealFour", "S", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="mealOneE" className="mb-2">
                          Select end time:
                        </label>
                        <input
                          type="time"
                          id="mealOneE"
                          name="mealOneE"
                          className="border p-2 mb-4"
                          onChange={(e) =>
                            handleInputChange("mealFour", "E", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    {/* Repeat similar structure for mealThree and mealFour sections */}

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
                                      <div>Coupons generated successfully!</div>
                                      <div onClick={closeScanQrCodePopup}>
                                            <Close />
                                        </div>
                                    </div>
                                </Popup>

                    <button
                      type="button"
                      onClick={generateJSON}
                      className=" px-4 py-2 rounded-lg  bg-green-500 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Generate
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <CouponSlider
              // images={newImage.length==0?images:newImage}
              images={newImage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Coupons;
