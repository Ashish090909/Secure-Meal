import React from 'react'
import { IoCheckbox } from 'react-icons/io5';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from './Button';
import QrCodeScanner from "./QrCodeScanner"

const PopupBox = (props) => {
    return (
        <>
            <div>
                <Popup trigger=
                    {<button className="inline-flex items-center px-4 py-2 bg-green-400 hover:bg-gray-300 text-white text-sm font-medium rounded-md m-2"> Generate Meal </button>}
                    modal nested>
                    {
                        close => (
                            <div className='modal'>
                                <div className='content'>
                                    <div className='rounded-md'>

                                        <form className='px-2' id='generate-meal-form'>

                                            <label>Breakfast
                                                <input type='checkbox' /></label><br />

                                            <label>Lunch
                                                <input type='checkbox' /></label><br />

                                            <label>Snacks
                                                <input type='checkbox' /></label><br />

                                            <label>Dinner
                                                <input type='checkbox' /></label><br />
                                            <Button type='submit' form='generate-meal-form' value='Generate' className="bg-green-400 text-white"/>
                                            <button className="inline-flex items-center px-4 py-2 bg-red-400 hover:bg-gray-300 text-white text-sm font-medium rounded-md m-2" onClick=
                                                {() => close()}>
                                                Close
                                            </button>
                                        </form>
                                    </div>

                                </div>
                                <div>

                                </div>
                            </div>
                        )
                    }
                </Popup>
            </div>
        </>
    )
}

export default PopupBox