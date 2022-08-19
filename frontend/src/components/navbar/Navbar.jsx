import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";
import Container from "./Container";

const Navbar = () => {
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogOut } = useAuth();
  const { isLoggedIn } = authInfo;

  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className="p-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img
              src="./logo2.png"
              className="cursor-pointer h-10"
              alt="appLogo"
            />
          </Link>

          <ul className="flex items-center space-x-4">
            <li>
              <button
                onClick={toggleTheme}
                className="dark:bg-white  bg-dark-subtle p-1 rounded"
              >
                <BsFillSunFill className="text-secondary" size={22} />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 rounded bg-transparent text-l  outline-none focus:border-white transition text-white"
                placeholder="Search a movie"
              />
            </li>
            {isLoggedIn ? (
              <button
                onClick={handleLogOut}
                className="text-white font-semibold text-lg "
              >
                Log Out
              </button>
            ) : (
              <Link className="text-white font-semibold text-lg " to="/signIn">
                <li>Log In</li>
              </Link>
            )}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
