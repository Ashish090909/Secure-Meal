import React, { useEffect, useState } from 'react'

const MealTable = ({ mealChart }) => {
    const [data, setData] = useState(mealChart);
    useEffect(() => {
        console.log(data);
    }, [])
    
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] ;
    return (
        <div className='py-12'>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Snacks</th>
                        <th>Dinner</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((meal, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                            <th>{days[index]}</th>
                            <td>{meal.breakfast}</td>
                            <td>{meal.lunch}</td>
                            <td>{meal.snacks}</td>
                            <td>{meal.dinner}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );

}

export default MealTable