import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import avatar from '../data/avatar.jpg';
import { useStateContext } from '../contexts/ContextProvider';


const UserProfile = () => {
const { setIsClicked, initialState } = useStateContext();
  const handleClick = (clicked) => {
  setIsClicked((prev) => ({
    ...initialState,
    [clicked]: !prev[clicked], // toggle the clicked item
  }));
};


  return (
    <div className="absolute right-1 top-16 bg-white dark:bg-[#42464D] p-6 rounded-lg w-72 shadow-lg z-50">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <img src={avatar} alt="user" className="w-16 h-16 rounded-full" />
          <div>
            <p className="text-lg font-semibold dark:text-gray-200">Shinkhal Sinha</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Administrator</p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">www.shinkhalsinha.com</p>
          </div>
        </div>
        <button
  onClick={() => handleClick('userProfile')}
  className="text-gray-500 hover:text-red-600 text-xl"
>
  <MdOutlineCancel />
</button>

      </div>

      <button
        className="mt-5 w-full py-2 rounded-lg text-white font-semibold"
        style={{ backgroundColor: '#03C9D7' }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
