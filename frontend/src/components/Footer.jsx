function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm mb-4">
            &copy; 2025 SkyJourney. All rights reserved.
          </p>
          <ul className="flex justify-center gap-6">
            <li className="list-none">
              <a href="#" className="text-white hover:text-gray-400">
                Privacy Policy
              </a>
            </li>
            <li className="list-none">
              <a href="#" className="text-white hover:text-gray-400">
                Terms of Service
              </a>
            </li>
            <li className="list-none">
              <a href="#" className="text-white hover:text-gray-400">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
