import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { listUsers } from "../../redux/actions/userActions.js";
import { listTechnicians } from "../../redux/actions/technicianActions.js";

import userAVI from "../../images/User-avatar.svg.png";

const SideBar = ({ variant, menuItems, selectedItem, handleItemClick }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminUserLogin = useSelector((state) => state.adminUserLogin);
  const { adminUserInfo } = adminUserLogin;

  const technicianUserLogin = useSelector((state) => state.technicianUserLogin);
  const { techUserInfo } = technicianUserLogin;

  let loggedInUserName = "";

  if (adminUserInfo && variant === "admin") {
    loggedInUserName = adminUserInfo.user.name;
  } else if (techUserInfo && variant === "technician") {
    loggedInUserName = techUserInfo.user.name;
  } else if (userInfo && variant === "user") {
    loggedInUserName = userInfo.user.name;
  }

  const formattedUserName =
    loggedInUserName.charAt(0).toUpperCase() + loggedInUserName.slice(1);

  const id = adminUserInfo ? adminUserInfo.user._id : null;

  const handleClick = (index, name) => {
    handleItemClick(index);

    if (name === "Users") {
      dispatch(listUsers(id));
    } else if (name === "Technicians") {
      dispatch(listTechnicians());
    }
  };
  return (
    <div className="min-h-screen w-1/6 bg-gray-900 flex flex-col items-center shadow-md p-4">
      <div className="flex flex-col items-center  mb-4">
        <img
          className="w-full rounded-full mr-3"
          src={userAVI}
          alt="User Avatar"
        />
        <h2 className="text-white text-xl text-center font-semibold mb-2 hidden md:block">
          {formattedUserName}
        </h2>
      </div>

      <h2 className="text-xl font-semibold mb-4 flex flex-row items-center">
        <i className="fas fa-gauge-high mr-2"></i>
        <span className="hidden md:block">Dashboard</span>
      </h2>

      <nav className="text-sm">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-3">
              <button
                onClick={() => handleClick(index, item.name)}
                className={`flex flex-row items-center ${
                  selectedItem === index ? "text-white" : "text-gray-400"
                } hover:text-white`}
              >
                <i className={`${item.icon} mr-2`}></i>
                <span className="hidden md:block">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
