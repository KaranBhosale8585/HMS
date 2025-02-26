const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 text-center py-4 border-t shadow-md dark:border-gray-700">
      <p className="text-gray-600 dark:text-gray-300">
        &copy; {new Date().getFullYear()} College Hostel. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
