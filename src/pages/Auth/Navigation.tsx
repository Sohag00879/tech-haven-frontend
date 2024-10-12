import { useState } from "react";
import "./Navigation.css";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate, } from "react-router-dom";
import {
    logout,
  selectCurrentUser,
} from "../../redux//features//auth/authSlice.ts";
import { useAppDispatch, useAppSelector } from "../../redux/hook.ts";
import FavouritesCount from "../Products/FavouritesCount.tsx";
import { useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../../redux/features/admin/user/getUserDetailsApi.ts";

type TUser = {
  _id: string;
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

const Navigation = () => {
  const navigate = useNavigate()
    const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser) as TUser;
  const {data:userInfo} = useGetUserDetailsQuery(user?._id)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { cartItems } = useSelector((state: any) => state.cartItems);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem]">CART</span>
          <div className="absolute top-9">
          {cartItems.length > 0 && user && (
            <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                {cartItems.reduce((a:number,c:{qty:number})=> a + c.qty,0)}
            </span>
          )}
        </div>
        </Link>
        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem]">FAVORITE</span>
          <FavouritesCount/>
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? <span className="text-white">{userInfo?.userName}</span> : <></>}
          {user && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && user && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-black text-gray-600 ${
              !user.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {user.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/admin/allproductslist"
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    to="/admin/categorylist"
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Category
                  </Link>
                </li>
                <li> */}
                  {/* <Link
                    to="/admin/orderlist"
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    to="/admin/userlist"
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    to="/admin/offer"
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Offer
                  </Link>
                </li> */}
              </>
            )}

            <li>
              <Link to="/profile" className="px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <span
                onClick={handleLogout }
                className="px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </span>
            </li>
          </ul>
        )}
      </div>
      {!user && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-[3rem] " size={26} />
              <span className="hidden nav-item-name mt-[3rem]">LOGIN</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd className="mr-2 mt-[3rem] " size={26} />
              <span className="hidden nav-item-name mt-[3rem]">REGISTER</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
