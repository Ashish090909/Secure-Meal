import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MealTable from "../../components/MealTable";
import { getAPIcalls, postAPIcalls } from "../../utils/apiCalls";
import SideNavbar from "../../components/SideNavbar";
import TableInput from "../../components/TableInput";
import { useNavigate } from "react-router-dom";

const MealChart = () => {
  const [mealChart, setmealChart] = useState([]);
  const fetching = async () => {
    const mid = "operation/student/get-meal-timetable/";
    const email = JSON.parse(localStorage.getItem("cred")).email;
    // console.log(email);
    const response = await getAPIcalls(mid, email);
    setmealChart(response.data);
    console.log(response.data);
  };
  const fetchingAdmin = async () => {
    const mid = "operation/admin/get-meal-timetable/";
    const email = JSON.parse(localStorage.getItem("cred")).email;
    // console.log(email);
    const response = await getAPIcalls(mid, email);
    setmealChart(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cred")).admin) {
      fetchingAdmin();
    } else {
      fetching();
    }
  }, []);
  // useEffect(() => {
    // location.reload() ;
  // }, [mealChart])

  // const [tableInput, setInputOpen] = useState(false);
  // const [mealTable, setMealTable] = useState([mealChart]);

  const [isModalOpen, setModalOpen] = useState(false); // Your existing meal table
  const navigate = useNavigate() ;
  const handleClickUpdate = async() => {
    setModalOpen(false);
    await fetchingUpdate();
    location.reload() ;
    // handleUpdateMealTable();
    // await navigate('/mealchart') ;
  };
  const fetchingUpdate = async () => {
    const mid = "operation/admin/update-hostel-menu/";
    const email = JSON.parse(localStorage.getItem("cred")).email;
    // console.log(email);
    try {
      const response = await postAPIcalls(mid, email, mealChart);
      if (response.status === 200) {
        fetchingAdmin();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("ritik is bad");
      }
    }
  };
  const handleUpdateMealTable = (newData) => {
    setmealChart(newData);
    console.log(mealChart);
    // fetchingUpdate();
    // setModalOpen(false) ;
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("cred")).admin
  );

  // console.log(JSON.parse(localStorage.getItem("userCred")).admin)
  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem("cred")).admin);
    
  }, []);

  // const handleChange = (e, index, mealType) => {

  // };

  return (
    <div className="flex h-screen overflow-hidden pb-4">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1  overflow-y-auto bg-gray-200 py-16 px-4">
          <div className="text-3xl mx-4 font-bold text-right">Meal Chart</div>
          {mealChart.length !== 0 ? (
            <MealTable mealChart={mealChart} />
          ) : (
            "No file"
          )}
          {isAdmin ? (
            <div>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={openModal}
              >
                Update Meal
              </button>

              {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                  <div className="bg-white p-8 rounded-lg">
                    <TableInput
                      handleUpdateMeal={handleUpdateMealTable}
                      mealChart={mealChart}
                      closeModal={closeModal}
                    />
                    <button
                      className="bg-green-400 text-white px-4 py-2 rounded-md"
                      onClick={handleClickUpdate}
                    >
                      Update Meal
                    </button>
                    <button
                      className="bg-red-400 text-white px-4 py-2 mx-2 rounded-md"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}

          <div />
        </div>
      </div>
    </div>
  );
};

export default MealChart;
