// // import { useNavigate, useParams } from "react-router";
// // import { useGetSingleProductQuery } from "../../redux/features/admin/products/getSingleProductApi";
// // import { useEffect, useState } from "react";
// // import { useGetCategoriesQuery } from "../../redux/features/admin/category/getCategoriesApi";
// // import { useUploadProductImageMutation } from "../../redux/features/admin/products/uploadProductImageApi";
// // import { useUpdateProductMutation } from "../../redux/features/admin/products/updateProductApi";
// // import { useDeleteProductMutation } from "../../redux/features/admin/products/deleteProductApi";
// // import AdminMenu from "./AdminMenu";
// // import { toast } from "react-toastify";
// // import { Link } from "react-router-dom";

// // type TCategory = {
// //   _id: string;
// //   name: string;
// //   __v: number;
// // };

// // const ProductUpdate = () => {
// //   const params = useParams();
// //   const { data: productData } = useGetSingleProductQuery(params._id);
// //   const [image, setImage] = useState(productData?.image || "");
// //   const [name, setName] = useState(productData?.name || "");
// //   const [description, setDescription] = useState(
// //     productData?.description || ""
// //   );
// //   const [price, setPrice] = useState(productData?.price || "");
// //   const [category, setCategory] = useState(productData?.category || "");
// //   const [quantity, setQuantity] = useState(productData?.quantity || "");
// //   const [brand, setBrand] = useState(productData?.brand || "");
// //   const [stock, setStock] = useState(productData?.countInStock || "");
// //   const [discount, setDiscount] = useState(productData?.discount || 0);
// //   const [flashSale, setFlashSale] = useState(productData?.flashSale || "");
// //   const navigate = useNavigate();

// //   const { data: categories = [] } = useGetCategoriesQuery();
// //   const [uploadProductImage] = useUploadProductImageMutation();
// //   const [updateProduct] = useUpdateProductMutation();
// //   const [deleteProduct] = useDeleteProductMutation();

// //   useEffect(() => {
// //     if (productData && productData._id) {
// //       setName(productData.name);
// //       setDescription(productData.description);
// //       setPrice(productData.price);
// //       // setCategory(productData.categories?._id);
// //       setCategory(productData.category);
// //       setQuantity(productData.quantity);
// //       setBrand(productData.brand);
// //       setImage(productData.image);
// //       setStock(productData.countInStock);
// //       setDiscount(productData.discount);
// //       setFlashSale(productData.flashSale);
// //     }
// //   }, [productData]);

// //   const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const input = e.target as HTMLInputElement;
// //     if (!input.files) return;
// //     const formData = new FormData();
// //     formData.append("image", input.files[0]);

// //     try {
// //       const res = await uploadProductImage(formData).unwrap();
// //       toast.success(res.message);
// //       setImage(res.image);
// //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //     } catch (error: any) {
// //       toast.error(error?.data?.message || error.error);
// //     }
// //   };

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();

// //     try {
// //       const formData = new FormData();
// //       formData.append("image", image);
// //       formData.append("name", name);
// //       formData.append("description", description);
// //       formData.append("price", price);
// //       formData.append("category", category);
// //       formData.append("quantity", quantity);
// //       formData.append("brand", brand);
// //       formData.append("countInStock", stock);
// //       formData.append("discount", discount);
// //       formData.append("flashSale", flashSale);

// //       const { data } = await updateProduct({ productId: params._id, formData });

// //      if(data){
// //       navigate(`/product/${data?._id}`);
// //       toast.success('Product is updated')
// //      }
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Product updated failed. Try Again.");
// //     }
// //   };

// //   const handleDelete = async () => {
// //     try {
// //       const answer = window.confirm(
// //         "Are you sure you want to delete this product?"
// //       );
// //       if (!answer) return;

// //       const { data } = await deleteProduct(params._id);
// //       toast.success(`"${data.name}" is deleted`);
// //       navigate("/admin/allproductslist");
// //     } catch (err) {
// //       console.log(err);
// //       toast.error("Delete failed. Try again.");
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="container  xl:mx-[9rem] sm:mx-[0] mb-5">
// //         <div className="flex flex-col md:flex-row">
// //           <AdminMenu />
// //           <div className="md:w-3/4 p-3">
// //             <div className="h-12 text-2xl font-bold">Update / Delete Product</div>

// //             {image && (
// //               <div className="text-center">
// //                 <img
// //                   src={image}
// //                   alt="product"
// //                   className="block mx-auto w-[50%] h-[30%]"
// //                 />
// //               </div>
// //             )}

// //             <div className="mb-3 mt-5">
// //               <label className="text-black  px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 border">
// //                 {image ? image.name : "Upload image"}
// //                 <input
// //                   type="file"
// //                   name="image"
// //                   accept="image/*"
// //                   onChange={uploadFileHandler}
// //                   className="text-white"
// //                 />
// //               </label>
// //             </div>

// //             <form onSubmit={handleSubmit}>
// //               <div className="p-3">
// //                 <div className="flex">
// //                   <div className="one">
// //                     <label htmlFor="name">Name</label> <br />
// //                     <input
// //                       type="text"
// //                       className="p-4 mb-3 w-[30rem] border rounded-lg text-black mr-[5rem]"
// //                       value={name}
// //                       onChange={(e) => setName(e.target.value)}
// //                     />
// //                   </div>

// //                   <div className="two">
// //                     <label htmlFor="name block">Price</label> <br />
// //                     <input
// //                       type="number"
// //                       className="p-4 mb-3 w-[30rem] border rounded-lg text-black "
// //                       value={price}
// //                       onChange={(e) => setPrice(e.target.value)}
// //                     />
// //                   </div>
// //                 </div>

// //                 <div className="flex">
// //                   <div>
// //                     <label htmlFor="name block">Quantity</label> <br />
// //                     <input
// //                       type="number"
// //                       min="1"
// //                       className="p-4 mb-3 w-[30rem] border rounded-lg text-black mr-[5rem]"
// //                       value={quantity}
// //                       onChange={(e) => setQuantity(e.target.value)}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label htmlFor="name block">Brand</label> <br />
// //                     <input
// //                       type="text"
// //                       className="p-4 mb-3 w-[30rem] border rounded-lg  text-black "
// //                       value={brand}
// //                       onChange={(e) => setBrand(e.target.value)}
// //                     />
// //                   </div>
// //                 </div>

// //                 <label htmlFor="" className="my-5">
// //                   Description
// //                 </label>
// //                 <textarea
// //                   className="p-2 mb-3  border rounded-lg w-[95%] text-black"
// //                   value={description}
// //                   onChange={(e) => setDescription(e.target.value)}
// //                 />

// //                 <div className="flex gap-10">
// //                   <div>
// //                     <label htmlFor="name block">Count In Stock</label> <br />
// //                     <input
// //                       type="text"
// //                       className="p-4 mb-3 w-[30rem] border rounded-lg text-black "
// //                       value={stock}
// //                       onChange={(e) => setStock(e.target.value)}
// //                     />
// //                   </div>

// //                   <div>
// //                     <label htmlFor="">Category</label> <br />
// //                     <select
// //                       className="p-4 mb-3 w-[30rem] border rounded-lg text-black mr-[5rem]"
// //                       value={category}
// //                       onChange={(e) => setCategory(e.target.value)}
// //                     >
// //                       <option value={productData?.category?.name}>
// //                         {productData?.category?.name}
// //                       </option>
// //                       {categories?.map((c: TCategory) => (
// //                         <option key={c._id} value={c.name}>
// //                           {c.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 </div>
// //                 <div className="flex gap-10">
// //                   <div>
// //                     <label htmlFor="name block">Discount</label> <br />
// //                     <input
// //                       type="number"
// //                       className="p-4 mb-3 w-[30rem] border rounded-lg  text-black mr-[5rem]"
// //                       value={discount}
// //                       onChange={(e) => setDiscount(e.target.value)}
// //                     />
// //                   </div>
// //                   <label htmlFor="">Flash Sale</label> <br />
// //                   <select
// //                     className="border w-[10rem] h-[3rem] rounded-lg text-black"
// //                     value={flashSale}
// //                     onChange={(e) => setFlashSale(e.target.value)}
// //                   >
// //                     <option value={productData?.flashSale}>
// //                       {productData?.flashSale}
// //                     </option>
// //                     <option value={productData?.flashSale==='true'?'false':'true'}>{productData?.flashSale=='true'?'false':'true'}</option>
// //                   </select>
// //                 </div>

// //                 <div className="flex justify-between">
// //                   <div>
// //                     <button
// //                       type="submit"
// //                       className="py-2 px-5 mt-5 rounded-lg text-lg font-bold text-white bg-green-700 hover:bg-green-600"
// //                     >
// //                       Update
// //                     </button>
// //                   </div>
// //                   <div>
// //                     <button className="py-2 px-5 mt-5 rounded-lg text-lg font-bold bg-slate-950 hover:bg-slate-800 text-white">
// //                       <Link
// //                         to={`/admin/product/update/add-comparison/${productData?._id}`}
// //                       >
// //                         Add Comparison
// //                       </Link>
// //                     </button>
// //                   </div>
// //                   <div>
// //                     <button
// //                       onClick={handleDelete}
// //                       className="py-2 px-5 mt-5 rounded-lg text-lg font-bold  bg-pink-600 hover:bg-pink-500 text-white"
// //                     >
// //                       Delete
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default ProductUpdate;





// import { useNavigate, useParams } from "react-router";
// import { useGetSingleProductQuery } from "../../redux/features/admin/products/getSingleProductApi";
// import { useEffect, useState } from "react";
// import { useGetCategoriesQuery } from "../../redux/features/admin/category/getCategoriesApi";
// import { useUploadProductImageMutation } from "../../redux/features/admin/products/uploadProductImageApi";
// import { useUpdateProductMutation } from "../../redux/features/admin/products/updateProductApi";
// import { useDeleteProductMutation } from "../../redux/features/admin/products/deleteProductApi";
// import AdminMenu from "./AdminMenu";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// type TCategory = {
//   _id: string;
//   name: string;
//   __v: number;
// };

// const ProductUpdate = () => {
//   const params = useParams();
//   const { data: productData, isSuccess: isProductSuccess } = useGetSingleProductQuery(params._id);
//   const [image, setImage] = useState("");
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [brand, setBrand] = useState("");
//   const [stock, setStock] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [flashSale, setFlashSale] = useState("");
//   const navigate = useNavigate();

//   const { data: categories = [] } = useGetCategoriesQuery();
//   const [uploadProductImage] = useUploadProductImageMutation();
//   const [updateProduct] = useUpdateProductMutation();
//   const [deleteProduct] = useDeleteProductMutation();

//   useEffect(() => {
//     if (isProductSuccess && productData) {
//       setName(productData.name);
//       setDescription(productData.description);
//       setPrice(productData.price);
//       setCategory(productData.category);
//       setQuantity(productData.quantity);
//       setBrand(productData.brand);
//       setImage(productData.image);
//       setStock(productData.countInStock);
//       setDiscount(productData.discount);
//       setFlashSale(productData.flashSale);
//     }
//   }, [isProductSuccess, productData]);

//   const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const input = e.target as HTMLInputElement;
//     if (!input.files) return;
//     const formData = new FormData();
//     formData.append("image", input.files[0]);

//     try {
//       const res = await uploadProductImage(formData).unwrap();
//       toast.success(res.message);
//       setImage(res.image);
//     } catch (error: any) {
//       toast.error(error?.data?.message || error.error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("image", image);
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("price", price);
//       formData.append("category", category);
//       formData.append("quantity", quantity);
//       formData.append("brand", brand);
//       formData.append("countInStock", stock);
//       formData.append("discount", discount?.toString());
//       formData.append("flashSale", flashSale);

//       const { data } = await updateProduct({ productId: params._id, formData });

//       if (data) {
//         navigate(`/product/${data._id}`);
//         toast.success("Product is updated");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Product update failed. Try again.");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const answer = window.confirm(
//         "Are you sure you want to delete this product?"
//       );
//       if (!answer) return;

//       const { data } = await deleteProduct(params._id);
//       toast.success(`"${data.name}" is deleted`);
//       navigate("/admin/allproductslist");
//     } catch (err) {
//       console.log(err);
//       toast.error("Delete failed. Try again.");
//     }
//   };

//   return (
//     <div className="container xl:mx-[9rem] sm:mx-[0] mb-5">
//       <div className="flex flex-col md:flex-row">
//         <AdminMenu />
//         <div className="md:w-3/4 p-3">
//           <div className="h-12 text-2xl font-bold">Update / Delete Product</div>

//           {image && (
//             <div className="text-center">
//               <img
//                 src={image}
//                 alt="product"
//                 className="block mx-auto w-[50%] h-[30%]"
//               />
//             </div>
//           )}

//           <div className="mb-3 mt-5">
//             <label className="text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 border">
//               Upload image
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={uploadFileHandler}
//                 className="text-white"
//               />
//             </label>
//           </div>

//           {isProductSuccess && (
//             <form onSubmit={handleSubmit}>
//               <div className="p-3">
//                 {/* Form fields */}
//                 <div className="flex">
//                   <div className="one">
//                     <label htmlFor="name">Name</label>
//                     <input
//                       type="text"
//                       className="p-4 mb-3 w-[30rem] border rounded-lg text-black mr-[5rem]"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                     />
//                   </div>

//                   <div className="two">
//                     <label htmlFor="price">Price</label>
//                     <input
//                       type="number"
//                       className="p-4 mb-3 w-[30rem] border rounded-lg text-black"
//                       value={price}
//                       onChange={(e) => setPrice(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="flex">
//                   <div>
//                     <label htmlFor="quantity">Quantity</label>
//                     <input
//                       type="number"
//                       min="1"
//                       className="p-4 mb-3 w-[30rem] border rounded-lg text-black mr-[5rem]"
//                       value={quantity}
//                       onChange={(e) => setQuantity(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="brand">Brand</label>
//                     <input
//                       type="text"
//                       className="p-4 mb-3 w-[30rem] border rounded-lg text-black"
//                       value={brand}
//                       onChange={(e) => setBrand(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <label htmlFor="description" className="my-5">
//                   Description
//                 </label>
//                 <textarea
//                   className="p-2 mb-3 border rounded-lg w-[95%] text-black"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />

//                 <div className="flex gap-10">
//                   <div>
//                     <label htmlFor="stock">Count In Stock</label>
//                     <input
//                       type="text"
//                       className="p-4 mb-3 w-[30rem] border rounded-lg text-black"
//                       value={stock}
//                       onChange={(e) => setStock(e.target.value)}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="category">Category</label>
//                     <select
//                       className="p-4 mb-3 w-[30rem] border rounded-lg text-black mr-[5rem]"
//                       value={category}
//                       onChange={(e) => setCategory(e.target.value)}
//                     >
//                       <option value={productData?.category?.name}>
//                         {productData?.category?.name}
//                       </option>
//                       {categories.map((c: TCategory) => (
//                         <option key={c._id} value={c.name}>
//                           {c.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="flex gap-10">
//                   <div>
//                     <label htmlFor="discount">Discount</label>
//                     <input
//                       type="number"
//                       className="p-4 mb-3 w-[30rem] border rounded-lg text-black mr-[5rem]"
//                       value={discount}
//                       onChange={(e) => setDiscount(e.target.value)}
//                     />
//                   </div>
//                   <label htmlFor="flashSale">Flash Sale</label>
//                   <select
//                     className="border w-[10rem] h-[3rem] rounded-lg text-black"
//                     value={flashSale}
//                     onChange={(e) => setFlashSale(e.target.value)}
//                   >
//                     <option value="false">False</option>
//                     <option value="true">True</option>
//                   </select>
//                 </div>

//                 <div className="flex gap-10">
//                   <button
//                     type="submit"
//                     className="bg-black p-4 w-[20rem] text-white rounded-lg text-center mt-5"
//                   >
//                     UPDATE PRODUCT
//                   </button>
//                   <button
//                     type="button"
//                     className="bg-red-700 p-4 w-[20rem] text-white rounded-lg text-center mt-5"
//                     onClick={handleDelete}
//                   >
//                     DELETE PRODUCT
//                   </button>
//                 </div>
//               </div>
//             </form>
//           )}

//           <Link
//             to="/admin/allproductslist"
//             className="flex justify-end w-[80rem] p-2 text-lg"
//           >
//             Back to products
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductUpdate;





import { useNavigate, useParams } from "react-router";
import { useGetSingleProductQuery } from "../../redux/features/admin/products/getSingleProductApi";
import { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../redux/features/admin/category/getCategoriesApi";
import { useUploadProductImageMutation } from "../../redux/features/admin/products/uploadProductImageApi";
import { useUpdateProductMutation } from "../../redux/features/admin/products/updateProductApi";
import { useDeleteProductMutation } from "../../redux/features/admin/products/deleteProductApi";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

type TCategory = {
  _id: string;
  name: string;
  __v: number;
};

const ProductUpdate = () => {
  const params = useParams();
  const { data: productData, isSuccess: isProductSuccess } = useGetSingleProductQuery(params._id);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState(0);
  const [flashSale, setFlashSale] = useState("");
  const navigate = useNavigate();

  const { data: categories = [] } = useGetCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (isProductSuccess && productData) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
      setDiscount(productData.discount);
      setFlashSale(productData.flashSale);
    }
  }, [isProductSuccess, productData]);

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (!input.files) return;
    const formData = new FormData();
    formData.append("image", input.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);
      formData.append("discount", discount?.toString());
      formData.append("flashSale", flashSale);

      const { data } = await updateProduct({ productId: params._id, formData });

      if (data) {
        navigate(`/product/${data._id}`);
        toast.success("Product is updated");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`);
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] mb-5">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12 text-2xl font-bold">Update / Delete Product</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto w-[50%] h-[30%]"
              />
            </div>
          )}

          <div className="mb-3 mt-5">
            <label className="text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 border">
              Upload image
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="text-white"
              />
            </label>
          </div>

          {isProductSuccess && (
            <form onSubmit={handleSubmit}>
              <div className="p-3">
                {/* Form fields */}
                <div className="flex">
                  <div className="one">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="p-4 mb-3 w-[30rem] border rounded-lg text-black mr-[5rem]"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="two">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      className="p-4 mb-3 w-[30rem] border rounded-lg text-black"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex">
                  <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      className="p-4 mb-3 w-[30rem] border rounded-lg text-black mr-[5rem]"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="brand">Brand</label>
                    <input
                      type="text"
                      className="p-4 mb-3 w-[30rem] border rounded-lg text-black"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                </div>

                <label htmlFor="" className="my-5">
                  Description
                </label>
                <textarea
                  className="p-2 mb-3 border rounded-lg w-[95%] text-black"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <div className="flex gap-10">
                  <div>
                    <label htmlFor="stock">Count In Stock</label>
                    <input
                      type="text"
                      className="p-4 mb-3 w-[30rem] border rounded-lg text-black"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="">Category</label>
                    <select
                      className="p-4 mb-3 w-[30rem] border rounded-lg text-black mr-[5rem]"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value={productData?.category?.name}>
                        {productData?.category?.name}
                      </option>
                      {categories?.map((c: TCategory) => (
                        <option key={c._id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-10">
                  <div>
                    <label htmlFor="discount">Discount</label>
                    <input
                      type="number"
                      className="p-4 mb-3 w-[30rem] border rounded-lg text-black mr-[5rem]"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Flash Sale</label>
                    <select
                      className="border w-[10rem] h-[3rem] rounded-lg text-black"
                      value={flashSale}
                      onChange={(e) => setFlashSale(e.target.value)}
                    >
                      <option value={productData?.flashSale}>
                        {productData?.flashSale}
                      </option>
                      <option value={flashSale === 'true' ? 'false' : 'true'}>
                        {flashSale === 'true' ? 'false' : 'true'}
                      </option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="py-2 px-5 mt-5 rounded-lg text-lg font-bold text-white bg-green-700 hover:bg-green-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleDelete}
                    className="py-2 px-5 mt-5 rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-500 text-white"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/admin/product/update/add-comparison/${productData?._id}`}
                    className="py-2 px-5 mt-5 rounded-lg text-lg font-bold bg-slate-950 hover:bg-slate-800 text-white"
                  >
                    Add Comparison
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
