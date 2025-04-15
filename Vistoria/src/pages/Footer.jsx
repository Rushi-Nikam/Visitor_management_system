export default function Footer() {


  return (
    <footer className={`flex flex-col bg-gray-200 text-gray-900 p-3    transition-all`}>
      <div className=" flex container mx-auto  justify-center gap-8 text-center md:text-left">
        {/* Quick Links */}
        <div className="flex flex-col items-center w-full">
          {/* <h3 className="text-lg font-semibold ">Quick Links</h3> */}
          {/* <ul className="mt-2 flex gap-10 ">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul> */}
           <div className="mt-2 text-center text-lg font-semibold">
          All rights reserved. &copy; 2025
      </div>
        </div>

        
        {/* Social Media */}
        {/* <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex justify-center md:justify-start mt-3 space-x-4">
            <a href="#" className="text-blue-600 hover:text-blue-800"><FaFacebook size={24} /></a>
            <a href="#" className="text-blue-400 hover:text-blue-600"><FaTwitter size={24} /></a>
            <a href="#" className="text-pink-500 hover:text-pink-700"><FaInstagram size={24} /></a>
            <a href="#" className="text-blue-700 hover:text-blue-900"><FaLinkedin size={24} /></a>
          </div>
        </div> */}
   
      </div>
      
      {/* Dark Mode Toggle */}
      {/* <div className="mt-6 flex justify-center items-center space-x-3">
        <span>Light</span>
        <Switch
          checked={darkMode}
          onChange={setDarkMode}
          className={`${darkMode ? "bg-blue-600" : "bg-gray-400"} relative inline-flex h-6 w-11 items-center rounded-full transition`}
        >
          <span className="sr-only">Enable dark mode</span>
          <span
            className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform bg-white rounded-full transition`}
          />
        </Switch>
        <span>Dark</span>
      </div> */}
    </footer>
  );
}
