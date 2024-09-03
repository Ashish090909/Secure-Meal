
import React, { useState } from 'react';

const TableInput = ({mealChart , handleUpdateMeal}) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [data, setData] = useState(mealChart);

  const handleChange = (e, index, mealType) => {
    const newData = data.map((item, i) =>
      i === index ? { ...item, [mealType]: e.target.value } : item
    );
    setData(newData);
    handleUpdateMeal(newData);
  };



  return (
    <div className="container mx-auto my-8">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2"></th>
            {["Breakfast", "Lunch", "Snacks", "Dinner"].map((meal, index) => (
              <th key={index} className="px-4 py-2">
                {meal}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-bold">{days[index]}</td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={item.breakfast}
                  onChange={(e) => handleChange(e, index, 'breakfast')}
                  className="w-full"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={item.lunch}
                  onChange={(e) => handleChange(e, index, 'lunch')}
                  className="w-full"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={item.snacks}
                  onChange={(e) => handleChange(e, index, 'snacks')}
                  className="w-full"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={item.dinner}
                  onChange={(e) => handleChange(e, index, 'dinner')}
                  className="w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableInput;
