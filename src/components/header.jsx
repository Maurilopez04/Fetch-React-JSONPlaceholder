import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-md z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-white text-3xl font-extrabold tracking-wide">
          <a href="https://maurilopez.site" className="hover:text-gray-200 transition duration-300">
            Maurilopez
          </a>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex space-x-8">
        <a href="/" className="text-white text-lg font-medium hover:text-gray-200 transition duration-300 relative group">Posts<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span></a>
          {["Users"].map((item, index) => (
            <a
              key={index}
              href={`${item.toLowerCase()}`}
              className="text-white text-lg font-medium hover:text-gray-200 transition duration-300 relative group"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden focus:outline-none focus:ring-2 focus:ring-white rounded"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } md:hidden bg-white shadow-lg transition-all duration-500 overflow-hidden`}
      >
        <nav className="flex flex-col space-y-4 px-6 py-4">
          {["/", ""].map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="text-gray-800 text-lg font-medium hover:bg-gray-100 hover:text-gray-900 py-2 px-4 rounded-lg transition-all duration-300"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
