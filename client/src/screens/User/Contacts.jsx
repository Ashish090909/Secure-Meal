import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import SideNavbar from '../../components/SideNavbar';
import Button from '../../components/Button';
// import numberModal from '../../components/numberModal';
// import ReviewModal from '../../components/ReviewModal'

const Contacts = () => {
  const [showModal, setShowModal] = useState(false);
  const [newnumbert, setNewnumbert] = useState({
    name: '',
    designation: '',
    number: '',
    email: '',
  });

  const inputRef = useRef(null);

  const yournumbers =  [
    {
      name: 'Binod Bihari',
      designation: 'Warden',
      number: '9876543210',
      email: 'warden@bitmesra.ac.in',
    },
    {
      name: 'Rajesh Tudu',
      designation: 'Assistant Warden',
      number: '9876768910',
      email: 'assistantwarden@bitmesra.ac.in',
    },
    {
      name: 'Ayush Raj',
      designation: 'Sweeper 1',
      number: '8797492264',
      email: 'sweeper1@bitmesra.ac.in',
    },
    {
      name: 'Baijnath Mahto',
      designation: 'Laundary Man',
      number: '8789389532',
      email: 'laundary@bitmesra.ac.in',
    },
    {
      name: 'Aditya Agarwal',
      designation: 'Sweeper 2',
      number: '9142353218',
      email: 'sweeper2@bitmesra.ac.in',
    },
    {
      name: 'Binod Bihari',
      designation: 'Warden',
      number: '9876543210',
      email: 'warden@bitmesra.ac.in',
    },
    {
      name: 'Rajesh Tudu',
      designation: 'Assistant Warden',
      number: '9876768910',
      email: 'assistantwarden@bitmesra.ac.in',
    },
    {
      name: 'Ayush Raj',
      designation: 'Sweeper 1',
      number: '8797492264',
      email: 'sweeper1@bitmesra.ac.in',
    },
    {
      name: 'Baijnath Mahto',
      designation: 'Laundary Man',
      number: '8789389532',
      email: 'laundary@bitmesra.ac.in',
    },
    {
      name: 'Aditya Agarwal',
      designation: 'Sweeper 2',
      number: '9142353218',
      email: 'sweeper2@bitmesra.ac.in',
    },
  ];

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // setNewnumbert({
    //   name: '',
    //   designation: '',
    //   number: '',
    // });
    console.log(newnumbert);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewnumbert((prevnumbert) => ({
      ...prevnumbert,
      [name]: value,
    }));
  };

  const handleAddnumbert = () => {
    // Add validation logic if needed
    yournumbers.push(newnumbert);
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

  // const designation = new designation()
  // const today  = designation.toISOString().split('T')[0];

  useEffect(() => {
    setNewnumbert(yournumbers);
  }, [])
  

  return (
    <div className="flex h-screen overflow-hidden pb-4">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1  overflow-y-auto overflow-x-hidden bg-gray-200 py-16 px-4">
          <div className="text-right mx-4 mb-8 lg:mb-4 font-bold">
            <div className="text-3xl">Contacts</div>
          </div>
          {/* <Button value="Having some issues?" className="bg-red-400 text-white hover:bg-red-500 focus:ring-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={openModal} /> */}
          <div>
            {yournumbers.map((obj, index) => (
              <div key={obj.designation} onClick={() => openReviewModal(obj)} className="w-full rounded-lg shadow-sm text-left p-4 bg-white mt-4">
                <div className='text-left justify-between grid grid-cols-2'>
                  <div className='font-bold'>{obj.name}</div>
                  <div className='text-right font-bold'>{obj.designation}</div>
                </div>
                <div >{obj.number}</div>
                <div>{obj.number.length > 50 ? `${obj.number.substring(0, 50)}...` : obj.email}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isReviewModalOpen && (
                <numberModal
                    reviewDetails={selectedReview}
                    onClose={closeReviewModal}
                    onEdit={handleEdit}
                />
            )}

      {/* {showModal && (
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
                  New number
                </h3>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    value={newnumbert.name}
                    onChange={handleInputChange}
                    placeholder="name"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="designation"
                    readOnly
                    value={today}
                    onChange={handleInputChange}
                    placeholder="designation"
                    className="w-full mt-2 p-2 border rounded"
                  />
                  <textarea
                    name="number"
                    value={newnumbert.number}
                    onChange={handleInputChange}
                    placeholder="number"
                    className="w-full mt-2 p-2 border rounded"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleAddnumbert}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add number
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
      )} */}
    </div>
  );
};

export default Contacts;
