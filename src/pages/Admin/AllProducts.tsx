// // import { Link } from "react-router-dom"
// // import Loader from "../../components/Loader"
// // import { useGetAllProductQuery } from "../../redux/features/admin/products/getAllProductApi"
// // import moment from "moment";
// // import AdminMenu from "./AdminMenu";

// // interface Category {
// //     _id: string;
// //     name: string;
// //     __v: number;
// //   }

// //   interface Product {
// //     _id: string;
// //     name: string;
// //     image: string;
// //     brand: string;
// //     quantity: number;
// //     category: Category;
// //     description: string;
// //     rating: number;
// //     numReviews: number;
// //     price: number;
// //     countInStock: number;
// //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //     reviews: any[];
// //     createdAt: string;
// //     updatedAt: string;
// //     __v: number;
// //   }

// // const AllProducts = () => {
// //     const {data:products,isLoading,isError} = useGetAllProductQuery()
// //     if(isLoading){
// //         return <Loader/>
// //     }
// //     if(isError){
// //         return <div>Error loading products</div>
// //     }
// //   return (
// //     <>
// //     <div className="container mx-[9rem]">
// //       <div className="flex flex-col  md:flex-row">
// //         <div className="p-3">
// //          <div className="flex justify-between mt-1">
// //          <div className="ml-[2rem] text-xl font-bold h-12">
// //             All Products ({products.length})
// //           </div>
// //           <div>
// //             <Link to='/admin/create-product' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 mr-10">
// //             <button>Add Product</button>
// //             </Link>
// //           </div>
// //          </div>
// //           <div className="flex flex-wrap justify-around items-center">
// //             {products.map((product:Product) => (
// //               <Link
// //                 key={product._id}
// //                 to={`/admin/product/update/${product._id}`}
// //                 className="block mb-4 overflow-hidden"
// //               >
// //                 <div className="flex">
// //                   <img
// //                     src={product.image}
// //                     alt={product.name}
// //                     className="w-[10rem] object-cover"
// //                   />
// //                   <div className="p-4 flex flex-col justify-around">
// //                     <div className="flex justify-between">
// //                       <h5 className="text-xl font-semibold mb-2">
// //                         {product?.name}
// //                       </h5>

// //                       <p className="text-gray-400 text-xs">
// //                         {moment(product.createdAt).format("MMMM Do YYYY")}
// //                       </p>
// //                     </div>

// //                     <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
// //                       {product?.description?.substring(0, 160)}...
// //                     </p>

// //                     <div className="flex justify-between">
// //                       <Link
// //                         to={`/admin/product/update/${product._id}`}
// //                         className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
// //                       >
// //                         Update Product
// //                         <svg
// //                           className="w-3.5 h-3.5 ml-2"
// //                           aria-hidden="true"
// //                           xmlns="http://www.w3.org/2000/svg"
// //                           fill="none"
// //                           viewBox="0 0 14 10"
// //                         >
// //                           <path
// //                             stroke="currentColor"
// //                             strokeLinecap="round"
// //                             strokeLinejoin="round"
// //                             strokeWidth={2}
// //                             d="M1 5h12m0 0L9 1m4 4L9 9"
// //                           />
// //                         </svg>
// //                       </Link>
// //                       <p>$ {product?.price}</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //         <div className="md:w-1/4 p-3 mt-2">
// //           <AdminMenu />
// //         </div>
// //       </div>
// //     </div>
// //   </>
// //   )
// // }

// // export default AllProducts

// import { Link, useState } from "react";
// import Loader from "../../components/Loader";
// import { useGetAllProductQuery, useGetProductsByCategoryQuery } from "../../redux/features/admin/products/getAllProductApi";
// import { useGetCategoriesQuery } from "../../redux/features/admin/categories/getCategoriesApi";
// import moment from "moment";
// import AdminMenu from "./AdminMenu";

// interface Category {
//   _id: string;
//   name: string;
//   __v: number;
// }

// interface Product {
//   _id: string;
//   name: string;
//   image: string;
//   brand: string;
//   quantity: number;
//   category: Category;
//   description: string;
//   rating: number;
//   numReviews: number;
//   price: number;
//   countInStock: number;
//   reviews: any[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// const AllProducts = () => {
//   // State for selected category
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

//   // Fetch all categories
//   const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();

//   // Fetch products by category or all products if no category is selected
//   const { data: products, isLoading: productsLoading, isError } = selectedCategory
//     ? useGetProductsByCategoryQuery(selectedCategory)
//     : useGetAllProductQuery();

//   if (categoriesLoading || productsLoading) {
//     return <Loader />;
//   }

//   if (isError) {
//     return <div>Error loading products</div>;
//   }

//   return (
//     <>
//       <div className="container mx-[9rem]">
//         <div className="flex flex-col md:flex-row">
//           <div className="p-3">
//             <div className="flex justify-between mt-1">
//               <div className="ml-[2rem] text-xl font-bold h-12">
//                 All Products ({products.length})
//               </div>
//               <div>
//                 <Link
//                   to='/admin/create-product'
//                   className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 mr-10"
//                 >
//                   <button>Add Product</button>
//                 </Link>
//               </div>
//             </div>

//             {/* Category Selection Dropdown */}
//             <div className="mb-4">
//               <label htmlFor="category" className="block text-sm font-medium text-gray-700">Select Category</label>
//               <select
//                 id="category"
//                 value={selectedCategory || ""}
//                 onChange={(e) => setSelectedCategory(e.target.value || null)}
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//               >
//                 <option value="">All Categories</option>
//                 {categories?.map((category: Category) => (
//                   <option key={category._id} value={category.name}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex flex-wrap justify-around items-center">
//               {products.map((product: Product) => (
//                 <Link
//                   key={product._id}
//                   to={`/admin/product/update/${product._id}`}
//                   className="block mb-4 overflow-hidden"
//                 >
//                   <div className="flex">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-[10rem] object-cover"
//                     />
//                     <div className="p-4 flex flex-col justify-around">
//                       <div className="flex justify-between">
//                         <h5 className="text-xl font-semibold mb-2">
//                           {product?.name}
//                         </h5>

//                         <p className="text-gray-400 text-xs">
//                           {moment(product.createdAt).format("MMMM Do YYYY")}
//                         </p>
//                       </div>

//                       <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
//                         {product?.description?.substring(0, 160)}...
//                       </p>

//                       <div className="flex justify-between">
//                         <Link
//                           to={`/admin/product/update/${product._id}`}
//                           className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
//                         >
//                           Update Product
//                           <svg
//                             className="w-3.5 h-3.5 ml-2"
//                             aria-hidden="true"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 14 10"
//                           >
//                             <path
//                               stroke="currentColor"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M1 5h12m0 0L9 1m4 4L9 9"
//                             />
//                           </svg>
//                         </Link>
//                         <p>$ {product?.price}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//           <div className="md:w-1/4 p-3 mt-2">
//             <AdminMenu />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AllProducts;

import { useState } from "react";
import Loader from "../../components/Loader";
import moment from "moment";
import AdminMenu from "./AdminMenu";
import { useGetProductsByCategoryQuery } from "../../redux/features/admin/category/getProductsByCategoryApi";
import { useGetCategoriesQuery } from "../../redux/features/admin/category/getCategoriesApi";
import { Link } from "react-router-dom";
import { useGetAllProductQuery } from "../../redux/features/admin/products/getAllProductApi";

interface Category {
  _id: string;
  name: string;
  __v: number;
}

interface Product {
  _id: string;
  name: string;
  image: string;
  brand: string;
  quantity: number;
  category: Category;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  reviews: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AllProducts = () => {
  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch all categories
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  // Unconditionally fetch both products and products by category
  const {
    data: allProducts,
    isLoading: allProductsLoading,
    isError: allProductsError,
  } = useGetAllProductQuery();
  const {
    data: productsByCategory,
    isLoading: productsByCategoryLoading,
    isError: productsByCategoryError,
  } = useGetProductsByCategoryQuery(selectedCategory, {
    skip: !selectedCategory,
  });

  // Show loader if any loading state is true
  const isLoading =
    allProductsLoading || productsByCategoryLoading || categoriesLoading;
  if (isLoading) {
    return <Loader />;
  }

  // Error handling
  if (allProductsError || productsByCategoryError) {
    return <div>Error loading products</div>;
  }

  // Determine which products to display
  const products = selectedCategory ? productsByCategory : allProducts;

  return (
    <>
      <div className="container mx-[9rem]">
        <div className="flex flex-col md:flex-row">
          <div className="p-3">
            <div className="flex justify-between mt-1">
              <div className="ml-[2rem] text-xl font-bold h-12">
                {selectedCategory
                  ? `Products in ${selectedCategory}`
                  : "All Products"}{" "}
                ({products?.length})
              </div>
              <div>
                <Link
                  to="/admin/create-product"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 mr-10"
                >
                  <button>Add Product</button>
                </Link>
              </div>
            </div>

            {/* Category Selection Dropdown */}
            <div className="mb-6">
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-800"
              >
                Select Category
              </label>
              <select
                id="category"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="mt-2 block w-full pl-4 pr-10 py-2 text-base border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out sm:text-sm"
              >
                <option value="">All Categories</option>
                {categories?.map((category: Category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap justify-around items-center">
              {products?.map((product: Product) => (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="block mb-4 overflow-hidden"
                >
                  <div className="flex">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[10rem] object-cover"
                    />
                    <div className="p-4 flex flex-col justify-around">
                      <div className="flex justify-between">
                        <h5 className="text-xl font-semibold mb-2">
                          {product?.name}
                        </h5>

                        <p className="text-gray-400 text-xs">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>

                      <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        {product?.description?.substring(0, 160)}...
                      </p>

                      <div className="flex justify-between">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                        >
                          Update Product
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                        <p>$ {product?.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 p-3 mt-2">
            <AdminMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
