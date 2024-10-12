import { useState } from "react";
import { useNavigate } from "react-router";
import { useUploadProductImageMutation } from "../../redux/features/admin/products/uploadProductImageApi";
import { useCreateProductMutation } from "../../redux/features/admin/products/createProductApi";
import { useGetCategoriesQuery } from "../../redux/features/admin/category/getCategoriesApi";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";

type TCategory = {
  _id:string;
  name:string;
  __v:number
}

const ProductList = () => {
  const { data: categories } = useGetCategoriesQuery()
 let firstCategory;
  if(categories && categories.length>0){
    firstCategory = categories[0].name
  }
   
  // }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [image, setImage] = useState<any>("");
    // const [image, setImage] = useState<null | File>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(firstCategory || "");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState('0');
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);
    

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

//   const uploadFileHandler = async (e: React.FormEvent<HTMLInputEvent>) => {
//   const formData = new FormData();
//     formData.append("image",e.target.files[0]); 

//     try {
//       const res = await uploadProductImage(formData).unwrap();
//       toast.success(res.message);
//       setImage(res.image);
//       setImageUrl(res.image);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error:any) {
//       toast.error(error?.data?.message || error.error);
//     }
//   };
  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (!input.files) return;
  const formData = new FormData();
    formData.append("image",input.files[0]); 

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
    <div className="flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12 text-2xl font-bold">Create Product</div>

        {imageUrl && (
          <div className="text-center">
            <img
              src={imageUrl}
              alt="product"
              className="block mx-auto max-h-[200px]"
            />
          </div>
        )}

        <div className="mb-3 mt-5">
          <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
            {image ? image.name : "Upload Image"}

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className={!image ? "hidden" : "text-white"}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="p-3">
          <div className="flex">
            <div className="one">
              <label htmlFor="name">Name</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-[30rem] border rounded-lg text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="two ml-10 ">
              <label htmlFor="name block">Price</label> <br />
              <input
                type="number"
                className="p-4 mb-3 w-[30rem] border rounded-lg text-black"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex">
            <div className="one">
              <label htmlFor="name block">Quantity</label> <br />
              <input
                type="number"
                className="p-4 mb-3 w-[30rem] border rounded-lg text-black"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="two ml-10 ">
              <label htmlFor="name block">Brand</label> <br />
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
            // type="text"
            className="p-2 mb-3 border rounded-lg w-[95%] text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="flex gap-x-5">
            <div>
              <label htmlFor="name block">Count In Stock</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-[30rem] border rounded-lg text-black"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="">Category</label> <br />
              <select
                className="p-4 mb-3 w-[30rem] border rounded-lg text-black"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((c:TCategory) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

        <div className="flex justify-center">
        <button
           type="submit"
            className="py-2 px-5 mt-5 rounded-lg text-lg font-bold bg-pink-600 text-white"
          >
            Submit
          </button>
        </div>
        </div>
        </form>
      </div>
    </div>
  </div>
  )
}
export default ProductList;
