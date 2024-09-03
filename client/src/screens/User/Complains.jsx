import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import SideNavbar from '../../components/SideNavbar';
import Button from '../../components/Button';
import ComplainModal from '../../components/ComplainModal';
// import ReviewModal from '../../components/ReviewModal'

const Complains = () => {
  const [showModal, setShowModal] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    date: '',
    complain: '',
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    console.log(JSON.parse(localStorage.getItem("cred")).admin);
    JSON.parse(localStorage.getItem("cred")).admin;
  });

  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem("cred")).admin);
  }, []);

  const inputRef = useRef(null);

  const yourComplains = [
    {
      title: 'Fan not working',
      date: '28/11/2023',
      complain: 'Fan is messed up!',
      status: 'Pending',
    },
    {
      title: 'Slow internet',
      date: '28/11/2023',
      complain: 'Internet speed is too slow!',
      status: 'Pending',
    },
    {
      title: 'Broken chair',
      date: '28/11/2023',
      complain: 'Chair is broken!',
      status: 'Pending',
    },
    {
      title: 'Leaky faucet',
      date: '28/11/2023',
      complain: 'Faucet is leaking!',
      status: 'Pending',
    },
    {
      title: 'Faulty light bulb',
      date: '28/11/2023',
      complain: 'Light bulb is not working!',
      status: 'Pending',
    },
    {
      title: 'Noisy neighbors',
      date: '28/11/2023',
      complain: 'Neighbors are too loud!',
      status: 'Pending',
    },
    {
      title: 'Computer issues',
      date: '28/11/2023',
      complain: 'Computer is acting up!',
      status: 'Pending',
    },
    {
      title: 'Parking problem',
      date: '28/11/2023',
      complain: 'Parking space is too small!',
      status: 'Pending',
    },
    {
      title: 'Dirty common area',
      date: '28/11/2023',
      complain: 'Common area is not clean!',
      status: 'Pending',
    },
    {
      title: 'Faulty door lock',
      date: '28/11/2023',
      complain: 'Door lock is not working properly!',
      status: 'Pending',
    },
  ];

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // setNewComplaint({
    //   title: '',
    //   date: '',
    //   complain: '',
    // });
    console.log(newComplaint);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComplaint((prevComplaint) => ({
      ...prevComplaint,
      [name]: value,
    }));
  };

  const handleAddComplaint = () => {
    // Add validation logic if needed
    yourComplains.push(newComplaint);
    closeModal();
  };


  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const openReviewModal = (review) => {
        setSelectedReview(review);
        setIsReviewModalOpen(true);
        console.log(review);
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
    };

    const handleEdit = (editedReview, editedRating) => {

        // Close the modal after editing
        closeModal();
    }

  const date = new Date()
  const today  = date.toISOString().split('T')[0];

  useEffect(() => {
    setNewComplaint(yourComplains);
  }, [])
  

  return (
    <div className="flex h-screen overflow-hidden pb-4">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1  overflow-y-auto overflow-x-hidden bg-gray-200 py-16 px-4">
          <div className="text-right mx-4 mb-8 lg:mb-4 font-bold">
            <div className="text-3xl">Complains</div>
          </div>
          {
            isAdmin ? <div className='text-2xl font-bold'> Complains of Students</div> :
            <Button value="Having some issues?" className="bg-red-400 text-white hover:bg-red-500 focus:ring-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={openModal} />
          }
          <div>
            {yourComplains.map((obj, index) => (
              <div key={obj.date} onClick={() => openReviewModal(obj)} className="w-full rounded-lg shadow-sm text-left p-4 bg-white mt-4">
                <div className='text-left justify-between grid grid-cols-2'>
                  <div>{obj.date}</div>
                  <div className='text-right'>{obj.status}</div>
                </div>
                <div className='font-bold'>{obj.title}</div>
                <div>{obj.complain.length > 50 ? `${obj.complain.substring(0, 50)}...` : obj.complain}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isReviewModalOpen && (
                <ComplainModal
                    reviewDetails={selectedReview}
                    onClose={closeReviewModal}
                    onEdit={handleEdit}
                />
            )}

      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  New Complaint
                </h3>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    value={newComplaint.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="date"
                    readOnly
                    value={today}
                    onChange={handleInputChange}
                    placeholder="Date"
                    className="w-full mt-2 p-2 border rounded"
                  />
                  <textarea
                    name="complain"
                    value={newComplaint.complain}
                    onChange={handleInputChange}
                    placeholder="Complain"
                    className="w-full mt-2 p-2 border rounded"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleAddComplaint}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Complaint
                </button>
                <button
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complains;
