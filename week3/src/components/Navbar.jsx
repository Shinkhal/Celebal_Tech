import React, { useEffect } from 'react';
import { AiOutlineMenu, AiOutlineSetting } from 'react-icons/ai'; // added setting icon
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { UserProfile } from '.';
import ThemeSettings from './ThemeSettings'; // import the component
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, onClick, icon, color }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={onClick}
      style={{ color }}
      className="text-xl rounded-full p-3 hover:bg-light-gray"
    >
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
  const handleResize = () => setScreenSize(window.innerWidth);
  window.addEventListener('resize', handleResize);
  handleResize();
  return () => window.removeEventListener('resize', handleResize);
}, [setScreenSize]);

useEffect(() => {
  if (screenSize <= 900) {
    setActiveMenu(false);
  } else {
    setActiveMenu(true);
  }
}, [screenSize, setActiveMenu]);


  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        onClick={() => setActiveMenu(!activeMenu)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      <div className="flex gap-2 items-center">
        <NavButton
          title="Settings"
          onClick={() => setThemeSettings(true)}
          color={currentColor}
          icon={<AiOutlineSetting />}
        />

        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            onClick={() => handleClick('userProfile')}
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          >
            <img src={avatar} alt="user-profile" className="w-8 h-8 rounded-full" />
            <p className="text-gray-400 text-14 font-semibold hidden sm:block">
              Hi, <span className="ml-1">Shinkhal</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>
      </div>

      {isClicked.userProfile && <UserProfile />}
      {themeSettings && <ThemeSettings />}
    </div>
  );
};

export default Navbar;
