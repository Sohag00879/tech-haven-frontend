/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../../redux/features/admin/products/getFilteredProductsApi";
import {
  setCategories,
  setChecked,
  setProducts,
} from "../../redux/features/shop/shopSlice";
import { useGetCategoriesQuery } from "../../redux/features/admin/category/getCategoriesApi";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import ProductCard from "../Products/ProductCart";
import { useGetProductsBySearchMutation } from "../../redux/features/admin/products/getProductsBySearchApi";
import SearchProductCard from "../Products/SearchProductCart";

type TProduct = {
  _id: string;
  name: string;
  image: string;
  brand: string;
  quantity: number;
  category: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type TCateogry = {
  _id: string;
  name: string;
  __v: number;
};

const Shop = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { categories, checked, products, radio } = useSelector(
    (state: any) => state.shop
  );
  const categoriesQuery = useGetCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [query, setQuery] = useState("");
  const [getProductsBySearch] = useGetProductsBySearchMutation();
  const [searchProducts, setSearchProducts] = useState([]);
  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      setCategories(categories.data);
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked?.length || !radio?.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data?.filter(
          (product: TProduct) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 0)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBrandClick = (brand: any) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product: TProduct) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCheck = (value: any, id: string) => {
    const updatedChecked = value
      ? [...checked, id]
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        checked.filter((c: any) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product: TProduct) => product.brand)
          .filter((brand: string) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter(e.target.value);
  };

  const getProducts = async () => {
    const res = await getProductsBySearch(query);
    setSearchProducts(res.data);
    console.log(res)
  };

  useEffect(() => {
    getProducts();
  }, [query]);



  return (
    <>
      {/* <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="bg-neutral-100 pl-5 py-3 pr-3 mt-0 mb-0">
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 text-white">
              Filter by Categories
            </h2>

            <div className="p-5 w-[15rem]">
              {categoriesQuery?.data?.map((c: TCateogry) => (
                <div key={c._id} className="mb-2">
                  <div className="flex ietms-center mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c.name)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-sm font-medium text-black dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 text-white">
              Filter by Brands
            </h2>

            <div className="p-5">
              {uniqueBrands?.map((brand: any) => (
                <div key={brand}>
                  <div className="flex items-enter mr-4 mb-5">
                    <input
                      type="radio"
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-sm font-medium text-black dark:text-gray-300"
                    >
                      {brand}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 text-white">
              Filer by Price
            </h2>

            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2  placeholder-gray-600 border border-neutral-400	 rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border my-4 text-black"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3">
            <div className="flex justify-between">
              <h2 className=" text-3xl font-bold text-center mb-2 text-pink-500">
                {searchProducts?.length > 0 ? searchProducts?.length : products?.length} Products
              </h2>
          <div className=" ml-[60%]">
          <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products"
                className="p-1 border block"
              />
          </div>
            </div>

        {searchProducts?.length === 0 && (
              <div className="flex flex-wrap">
              {products?.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p: TProduct) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
        )}
        {searchProducts?.length > 0 && (
              <div className="flex flex-wrap">
              {searchProducts?.length === 0 ? (
                <Loader />
              ) : (
                searchProducts?.map((p: TProduct) => (
                  <div className="p-3" key={p._id}>
                    <SearchProductCard p={p} />
                  </div>
                ))
              )}
            </div>
        )}
          </div>
        </div>
      </div> */}
      <div className="container mx-auto">
  <div className="flex md:flex-row">
    <div className="bg-neutral-100 pl-5 py-3 pr-3 mt-0 mb-0">
      {/* Filter by Categories */}
      <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 text-white">
        Filter by Categories
      </h2>

      <div className="p-5 w-[15rem]">
        {categoriesQuery?.data?.map((c: TCateogry) => (
          <div key={c._id} className="mb-2">
            <div className="flex items-center mr-4">
              <input
                type="checkbox"
                onChange={(e) => handleCheck(e.target.checked, c.name)}
                className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ml-2 text-sm font-medium text-black dark:text-gray-300">
                {c.name}
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Filter by Brands */}
      <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 text-white">
        Filter by Brands
      </h2>

      <div className="p-5">
        {uniqueBrands?.map((brand: any) => (
          <div key={brand}>
            <div className="flex items-enter mr-4 mb-5">
              <input
                type="radio"
                name="brand"
                onChange={() => handleBrandClick(brand)}
                className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:bg-gray-700"
              />
              <label className="ml-2 text-sm font-medium text-black dark:text-gray-300">
                {brand}
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Filter by Price */}
      <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 text-white">
        Filter by Price
      </h2>

      <div className="p-5 w-[15rem]">
        <input
          type="text"
          placeholder="Enter Price"
          value={priceFilter}
          onChange={handlePriceChange}
          className="w-full px-3 py-2 placeholder-gray-600 border border-neutral-400 rounded-lg focus:outline-none focus:ring focus:border-pink-300"
        />
      </div>

      <div className="p-5 pt-0">
        <button
          className="w-full border my-4 text-black"
          onClick={() => window.location.reload()}
        >
          Reset
        </button>
      </div>
    </div>

    {/* Product Grid */}
    <div className="p-3">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-center mb-2 text-pink-500">
          {searchProducts?.length > 0 ? searchProducts.length : products?.length} Products
        </h2>
        <div className="ml-[60%]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products"
            className="p-1 border block"
          />
        </div>
      </div>

      {/* Product Cards */}
      {searchProducts?.length === 0 && (
        <div className="flex flex-wrap">
          {products?.length === 0 ? (
            <Loader />
          ) : (
            products.map((p: TProduct) => (
              <div className="p-3" key={p._id}>
                <ProductCard p={p} />
              </div>
            ))
          )}
        </div>
      )}
      {searchProducts?.length > 0 && (
        <div className="flex flex-wrap">
          {searchProducts.map((p: TProduct) => (
            <div className="p-3" key={p._id}>
              <SearchProductCard p={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>

    </>
  );
};

export default Shop;






