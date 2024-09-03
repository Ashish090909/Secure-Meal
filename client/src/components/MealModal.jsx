import React, { useState } from 'react';

const MealModal = ({ onClose, onUpdateMealTable, initialMealTable }) => {
  const [updatedMealTable, setUpdatedMealTable] = useState(initialMealTable || []);

  const handleChange = (day, mealType, value) => {
    // Find the specific day in the table and update the corresponding meal type
    const updatedTable = updatedMealTable.map((dayEntry) => {
      if (dayEntry.day === day) {
        return {
          ...dayEntry,
          [mealType]: value,
        };
      }
      return dayEntry;
    });

    setUpdatedMealTable(updatedTable);
  };

  // const handleUpdateTable = () => {
  //   // You can perform additional validation before updating the meal table
  //   onUpdateMealTable(updatedMealTable);

  //   // Close the pop-up menu
  //   onClose();
  // };

  const [formData, setFormData] = useState({
    mealOneS: '',
    mealOneE: '',
    mealTwoS: '',
    mealTwoE: '',
    mealThreeS: '',
    mealThreeE: '',
    mealFourS: '',
    mealFourE: '',
  });

  const handleUpdateTable = (meal, timeType, value) => {
    setFormData(prevData => ({
      ...prevData,
      [`${meal}${timeType}`]: value,
    }));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-4">Update Meal Table</h2>
        {updatedMealTable.map((dayEntry) => (
          <div key={dayEntry.day} className="mb-4">
            <h3 className="text-md font-bold mb-2">{dayEntry.day}</h3>
            <div>
              
            </div>
          </div>
        ))}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleUpdateTable}
        >
          Update Table
        </button>
        <button
          className="ml-2 text-gray-600 px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MealModal;
