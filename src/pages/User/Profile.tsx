import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useEditProfileMutation } from "../../redux/features/profile/editProfileApi";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useGetUserDetailsQuery } from "../../redux/features/admin/user/getUserDetailsApi";

type TUser = {
    _id: string;
    userName: string;
    email: string;
    password: string;
    isAdmin: boolean;
  };

const Profile = () => {
    const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const user = useAppSelector(selectCurrentUser) as TUser;
  const {data:userInfo} = useGetUserDetailsQuery(user._id)
  // const [editProfile, {isLoading:loadingEditProfile}] = useEditProfileMutation()
  const [editProfile, {isLoading:loadingEditProfile}] = useEditProfileMutation()

  useEffect(()=>{
    setUserName(userInfo?.userName)
    setEmail(userInfo?.email)
  },[userInfo?.userName, userInfo?.email])

  const submitHandler = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        await editProfile({
          _id: user._id,
          userName,
          email,
          password,
        }).unwrap();
        toast.success("Profile updated successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err:any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="container mx-auto p-4">
    <div className="flex justify-center items-center md:flex md:space-x-4 h-screen">
      <div className="md:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-black mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="form-input p-2 rounded-sm w-full text-black border"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-black mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-input p-2 rounded-sm w-full text-black border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-black mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-input p-2 rounded-sm w-full text-black border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="form-input p-2 rounded-sm w-full text-black border"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
            >
              Update
            </button>

            <Link
              to="/user-orders"
              className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
            >
              My Orders
            </Link>
          </div>
          {loadingEditProfile && <Loader />}
        </form>
      </div>
    </div>
  </div>
  )
}

export default Profile