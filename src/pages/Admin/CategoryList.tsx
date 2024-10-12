import { useState } from "react";
import { useGetCategoriesQuery } from "../../redux/features/admin/category/getCategoriesApi"
import { useCreateCategoryMutation } from "../../redux/features/admin/category/createCategoryApi";
import { useUpdateCategoryMutation } from "../../redux/features/admin/category/updateCategoryApi";
import { useDeleteCategoryMutation } from "../../redux/features/admin/category/deleteCategoryApi";
import AdminMenu from "./AdminMenu";
import CategoryForm from "./CategoryForm";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";

type TCategory = {
  _id:string;
  name:string;
}

const CategoryList = () => {
    const {data:categories} = useGetCategoriesQuery();

    const [name,setName] = useState('')
    const [selectedCategory,setSelectedCategory] = useState<TCategory|null>(null)
    const [updatingName, setUpdatingName] = useState("");
    const [modalVisible,setModalVisible] = useState(false)

    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    const handleCreateCategory = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!name) {
          toast.error("Category name is required");
          return;
        }
    
        try {
          const result = await createCategory({ name }).unwrap();
          if (result.error) {
            toast.error(result.error);
          } else {
            setName("");
            toast.success(`${result.name} is created.`);
          }
        } catch (error) {
          console.error(error);
          toast.error("Creating category failed, try again.");
        }
      };
    
      const handleUpdateCategory = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!updatingName) {
          toast.error("Category name is required");
          return;
        }
    
        try {
          const updatingData= {
            categoryId : selectedCategory?._id,
            name : updatingName
          }
          
          const result = await updateCategory(updatingData)
    
          if (result.error) {
            toast.error(result.error);
          } else {
            toast.success(`${result.name} is updated`);
            setSelectedCategory(null);
            setUpdatingName("");
            setModalVisible(false);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleDeleteCategory = async () => {
        try {
          const result = await deleteCategory(selectedCategory?._id).unwrap();
    
          if (result.error) {
            toast.error(result.error);
          } else {
            toast.success(`${result.name} is deleted.`);
            setSelectedCategory(null);
            setModalVisible(false);
          }
        } catch (error) {
          console.error(error);
          toast.error("Category delection failed. Tray again.");
        }
      };
    


  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3 text-black">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category:TCategory) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  )
}

export default CategoryList