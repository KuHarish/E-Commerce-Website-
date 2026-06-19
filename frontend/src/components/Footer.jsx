const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-xl text-primary">ShopSwift</span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Your one-stop shop for everything modern.
            </p>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-300">
            <a href="#" className="hover:text-primary transition-colors">About Us</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} ShopSwift. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
