import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../../redux/features/auth/authSlice";

const ProtectedRoute = ({children}:{children:ReactNode}) => {

    const token = useAppSelector(useCurrentToken)

    if(!token){
        return <Navigate to='/login' replace={true}/>//shudu replace dileo true auto dhore ney
    }

  return children;
}

export default ProtectedRoute