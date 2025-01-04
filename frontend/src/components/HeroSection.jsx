import { NavLink } from "react-router-dom";

function HeroSection() {
  return (
    <>
      <div className="flex items-center justify-center w-full  h-[80vh] bg-blue-400">
        <div className="flex flex-col justify-center items-center py-24 md:py-0">
          <div className="block md:hidden w-[80%] mx-auto mb-6">
            <img
              src="https://img.freepik.com/premium-vector/airplane-isolated-white-background-aircraft-front-view_134830-371.jpg?w=1380"
              alt="airplane"
              className="mx-auto rounded-xl"
            />
          </div>
          <div className="ml-4">
            <p className=" text-4xl md:text-6xl lg:text-7xl font-semibold  py-4 whitespace-nowrap">
              Find & Book
            </p>
            <p className=" text-4xl md:text-6xl lg:text-7xl font-semibold  py-4 whitespace-nowrap">
              A Great Experience
            </p>
            <NavLink to={"/register"}>
              <button className="px-6 py-2 my-6 md:my-8 text-xl border border-yellow-700 hover:bg-orange-600 bg-orange-500 text-white transform transition-transform duration-300 ease-in-out hover:translate-y-[-4px]">
                Book Now
              </button>
            </NavLink>
          </div>
        </div>
        <div className="hidden md:block w-1/2">
          <img
            src="planeright.png"
            alt="airplane"
            className="hidden lg:block mx-auto object-cover object-bottom h-full"
          />
          <img
            src="edit2.png"
            alt="airplane"
            className="hidden md:block lg:hidden mx-auto mb-14 object-cover object-bottom w-full "
          />
        </div>
      </div>
    </>
  );
}

export default HeroSection;
