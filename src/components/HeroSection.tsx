import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <main className="dark:bg-gray-800 bg-white relative overflow-hidden h-screen ps-20 pr-20 bg-gradient-to-r from-green-50/50 ">
    <header className="h-24 sm:h-32 flex items-center z-30 w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="uppercase text-gray-800 dark:text-white font-black text-3xl">
                Tech Haven
            </div>
        </div>
    </header>
    <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden bg-gradient-to-r from-green-50/50 ">
        <div className="container mx-auto px-6 flex relative ">
            <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
          <span className="w-20 h-2 bg-gray-800 mb-12"></span>
          <h1 className="font-bebas-neue uppercase  sm:text-2xl md:text-3xl lg:text-4xl font-black flex flex-col leading-none  text-gray-800">
          Welcome to Tech - Haven 
            <span className="sm:text-xl md:text-2xl lg:text-3xl mt-3">Your One-Stop Tech Shop</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-700 mt-5">
          Explore our exclusive collection of top-tier different types of tech product tailored for every need. Whether you are a student, a professional, or a gamer, we have the perfect tech product for you
          </p>
            <div className="flex mt-8">
                    <Link to='/shop' className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400">
                        Get started
                    </Link>
                    <Link to='/' className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md">
                        Read more
                    </Link>
                </div>
        </div>
            <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative lg:ms-[15%]">
          <img
            src="https://www.tailwind-kit.com/images/object/10.png" width={300} height={300} alt="hero image"
          />
        </div>
        </div>
    </div>
</main>
  )
}

export default HeroSection;
