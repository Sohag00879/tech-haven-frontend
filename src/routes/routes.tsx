import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../pages/User/Profile";
import ProtectedRoute from "../pages/Auth/ProtectedRoute";
import AdminRoute from "../pages/Admin/AdminRoute";
import UserList from "../pages/Admin/UserList";
import CategoryList from "../pages/Admin/CategoryList";
import ProductList from "../pages/Admin/ProductList";
import ProductUpdate from "../pages/Admin/ProductUpdate";
import AllProducts from "../pages/Admin/AllProducts";
import Home from "../pages/Home/Home";
import Favourites from "../pages/Products/Favourites";
import ProductDetails from "../pages/Products/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Shop from "../pages/Shop/Shop";
import AllFlashSaleProducts from "../pages/Products/AllFlashSaleProducts";
import Offer from "../pages/Offer/Offer";
import AllOffersProducts from "../pages/Products/AllOffersProducts";
import AddComparison from "../pages/Admin/AddComparison";
import ProductScriping from "../pages/Products/ProductScriping";
import Shipping from "../pages/Orders/Shipping";
import PlaceOrder from "../pages/Orders/PlaceOrder";
import Order from "../pages/Orders/Order";
import UserOrder from "../pages/User/UserOrder";
import AllOrder from "../pages/Admin/AllOrder";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AllProductsByCategory from "../pages/Products/AllProductsByCategory";
import AllNewCollection from "../pages/Products/AllNewCollection";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                index:true,
                element:<Home/>

            },
            {
               path:'login',
               element:<Login/>
                
            },
            {
                path:'register',
                element:<Register/>
            },
            {
                path:'profile',
                element:<ProtectedRoute><Profile/></ProtectedRoute>
            },
            {
                path:'favorite',
                element:<Favourites/>
            },
            {
                path:'product/:id',
                element:<ProductDetails/>
            },
            {
                path:'product/scriping/:id',
                element:<ProductScriping/>
            },
            {
                path:'cart',
                element:<ProtectedRoute><Cart/></ProtectedRoute>
            },
            {
                path:'shop',
                element:<Shop/>
            },
            {
                path:'/product/flash-sale',
                element:<AllFlashSaleProducts/>
            },
            {
                path:'product/new',
                element:<AllNewCollection/>
            },
            {
                path:'/product/all-offers/',
                element:<AllOffersProducts/>
            },
            {
                path:'/shipping',
                element:<ProtectedRoute><Shipping/></ProtectedRoute>
            },
            {
                path:'placeorder',
                element:<ProtectedRoute><PlaceOrder/></ProtectedRoute>
            },
            {
                path:'order/:id',
                element:<ProtectedRoute><Order/></ProtectedRoute>
            },
            {
                path:'user-orders',
                element:<UserOrder/>
            },
            {
                path:'category-products/:category',
                element:<AllProductsByCategory/>
            }
        ]
    },
    {
        path:'/admin',
        element:<AdminRoute/>,
        children:[
            {
                path:'userlist',
                element:<UserList/>
            },
            {
                path:'categorylist',
                element:<CategoryList/>
            },
            {
                // path:'productlist/:pageNumber',
                path:'create-product',
                element:<ProductList/>
            },
            {
                path:'product/update/:_id',
                element:<ProductUpdate/>
            },
            {
                path:'allproductslist',
                element:<AllProducts/>
            },
            {
                path:'offer',
                element:<Offer/>
            },
            {
                path:'product/update/add-comparison/:id',
                element:<AddComparison/>
            },
            {
                path:'orderlist',
                element:<AllOrder/>
            },
            {
                path:'dashboard',
                element:<AdminDashboard/>
            }
        ]
    }
])

export default router;