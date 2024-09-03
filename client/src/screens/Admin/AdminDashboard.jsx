import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Popup from "reactjs-popup";
import SideNavbar from "../../components/SideNavbar";
import { LuUserCircle2 } from "react-icons/lu";
import QrCodeScanner from "../../components/QrCodeScanner";

const AdminDashboard = () => {
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
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto bg-gray-200 py-14 ">
          <div className="text-left mx-4 ">
            <div className="text-2xl">Aditya Marandi</div>
          </div>

          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 px-4 mt-2 ">
            <div>
              <div
                className="shadow-md bg-green-500 text-left flex justify-between px-6 py-4 lg:h-16 rounded-lg text-white cursor-pointer"
                onClick={openScanQrCodePopup}
              >
                <div className="text-md">Scan QR Code</div>
              </div>
              {/* ... Other content ... */}
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
              <button
                className="px-4 py-2 rounded mt-4 bg-red-400 text-white hover:bg-red-500 focus:ring-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                onClick={closeScanQrCodePopup}
              >
                Close Popup
              </button>
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
