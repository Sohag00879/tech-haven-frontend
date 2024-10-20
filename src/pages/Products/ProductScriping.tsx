import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/features/admin/products/getProductDetailsApi";

const ProductScriping = () => {
  const { id } = useParams();
  const { data: product } = useGetProductDetailsQuery(id);

  type TCompareData = {
    compareSiteName: string;
    comparePrice: string;
    compareDescription: string;
    _id: string;
  };

  return (
    <div className="ml-[8rem]">
      <h1 className="text-center font-bold text-2xl">Our Products Features</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">{product?.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{product?.price}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {product?.description}
            </td>
          </tr>
        </tbody>
      </table>

      <h1 className="text-center font-bold text-2xl mt-5">
        Another Platform Products Features
      </h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {product?.compares?.map((item: TCompareData, i: number) => (
            <tr key={i} className="cursor-pointer">
              <Link to={`${item.compareSiteName}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.compareSiteName}
                </td>
              </Link>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.comparePrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.compareDescription}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductScriping;
