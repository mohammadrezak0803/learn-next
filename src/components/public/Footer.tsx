const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="mt-2">
          <a
            href="#"
            className="text-gray-400 hover:text-white text-xs sm:text-sm mx-2"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white text-xs sm:text-sm mx-2"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
