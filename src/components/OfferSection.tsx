import { Link } from "react-router-dom";
import OfferProducts from "../pages/Products/OfferProducts";
import { useGetOfferQuery } from "../redux/features/offer/getOfferApi";

const OfferSection = () => {
  const { data } = useGetOfferQuery();
  const offerData = data?.[0];
  return (
    <>
      {offerData && (
        <section className="px-3 py-5 bg-neutral-100 lg:py-10">
          <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
            <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
              <p className="text-2xl font-bold md:text-5xl text-orange-600">
                {offerData.percentage}% OFF
              </p>
              <p className="text-2xl font-bold md:text-5xl">
                {offerData.offerReason}
              </p>
              <p className="mt-2 text-sm md:text-lg">For limited time only!</p>
             <Link to={'/product/all-offers'}>
             <button className="text-md md:text-xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">
                Shop Now
              </button>
             </Link>
            </div>
            <div className="order-1 lg:order-2">
              <img
                className="h-60 w-60 object-cover lg:w-[350px] lg:h-[350px]"
                src="https://t4.ftcdn.net/jpg/03/64/41/07/360_F_364410756_Ev3WoDfNyxO9c9n4tYIsU5YBQWAP3UF8.jpg"
                alt="offer-img"
              />
            </div>
          </div>
        </section>
      )}

      {offerData && (
        <section>
          <OfferProducts percentage={offerData.percentage} />
        </section>
      )}
    </>
  );
};

export default OfferSection;
