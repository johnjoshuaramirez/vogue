import { useState } from "react";
import { useSignout } from "../hooks/useSignout";
import { Link } from "react-router-dom";
import { HiStar } from "react-icons/hi2";
import { BsHandbag } from "react-icons/bs";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";

const Navbar = () => {
  const { state } = useCartContext()
  const { user } = useAuthContext();
  const { signout } = useSignout();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <nav className="flex relative items-center border-b border-slate-200 py-4 max-w-[1026px] mx-auto w-[90%]">
      <Link to="/" className="mr-6">
        <HiStar className="w-7 h-7" />
      </Link>
      <ul className="items-center gap-6 hidden md:flex">
        <li>
          <Link
            to={{ pathname: "/api/products", search: "?category=men" }}
            className="text-sm hover:text-gray-600 transition-colors"
          >
            Men
          </Link>
        </li>
        <li>
          <Link
            to={{ pathname: "/api/products", search: "?category=women" }}
            className="text-sm hover:text-gray-600 transition-colors"
          >
            Women
          </Link>
        </li>
        <li>
          <Link
            to={{ pathname: "/api/products", search: "?category=kids" }}
            className="text-sm hover:text-gray-600 transition-colors"
          >
            Kids
          </Link>
        </li>
        <li>
          <Link
            to={{ pathname: "/api/products", search: "?category=baby" }}
            className="text-sm hover:text-gray-600 transition-colors"
          >
            Baby
          </Link>
        </li>
      </ul>
      <div className="hidden md:flex items-center gap-4 ml-auto">
        {user && (
          <button
            onClick={() => signout()}
            className="text-sm hover:text-gray-600 transition-colors"
          >
            Sign out
          </button>
        )}
        {!user && (
          <>
            <Link
              to="/auth/signin"
              className="text-sm hover:text-gray-600 transition-colors"
            >
              Sign in
            </Link>
            <span className="border-r border-slate-200 h-6"></span>
            <Link
              to="/auth/signup"
              className="text-sm hover:text-gray-600 transition-colors"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
      <Link
        to={user ? "/cart" : "/auth/signin"}
        className="md:ml-16 flex items-center ml-auto gap-1"
      >
        <BsHandbag className="text-xl text-gray-800 hover:text-gray-600 transition-colors" />
        <span>{state.length}</span>
      </Link>
      {/* Mobile View  */}
      <button
        onClick={toggleMenu}
        type="button"
        className="ml-4 flex items-center md:hidden"
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="text-2xl text-slate-600 hover:text-gray-600 transition-colors"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 8h16M4 16h16"
          ></path>
        </svg>
      </button>
      {/* Dropdown Menu List */}
      {isOpen && (
        <ul className="block absolute md:hidden top-full left-0 right-0 border bg-white p-5 rounded z-30 shadow-lg">
          <h2 className="font-bold text-lg tracking-tight mb-2">Categories</h2>
          <li>
            <Link
              to={{ pathname: "/api/products", search: "?category=men" }}
              className="text-sm hover:text-gray-600 transition-colors"
            >
              Men
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: "/api/products", search: "?category=women" }}
              className="text-sm hover:text-gray-600 transition-colors"
            >
              Women
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: "/api/products", search: "?category=kids" }}
              className="text-sm hover:text-gray-600 transition-colors"
            >
              Kids
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: "/api/products", search: "?category=baby" }}
              className="text-sm hover:text-gray-600 transition-colors"
            >
              Baby
            </Link>
          </li>
          <hr className="bg-gray-100 h-[1px] my-4" />
          <div className="flex items-center gap-2">
            {user && (
              <button
                type="button"
                className="text-sm text-center bg-black rounded py-2 w-full text-white hover:bg-gray-900"
                onClick={signout}
              >
                Sign out
              </button>
            )}
            {!user && (
              <>
                <Link
                  to="/auth/signup"
                  className="text-sm text-center bg-black rounded py-2 w-full text-white hover:bg-gray-900"
                  
                >
                  Sign up
                </Link>
                <Link
                  to="auth/signin"
                  className="text-sm text-center bg-black rounded py-2 w-full text-white hover:bg-gray-900"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
