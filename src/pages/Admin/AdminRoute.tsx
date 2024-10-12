import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
type TUser = {
    _id: string;
    userName: string;
    email: string;
    password: string;
    isAdmin: boolean;
  };
const AdminRoute = () => {
  const user = useAppSelector(selectCurrentUser) as TUser;
  return user && user.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
export default AdminRoute;