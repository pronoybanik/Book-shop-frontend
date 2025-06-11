/* eslint-disable @typescript-eslint/no-explicit-any */
import UserProfileCard from "../../components/UserDashboardComponents/UserProfileCard";
import { useSingleUserQuery } from "../../redux/features/auth/authApi";
import { selectCurrentUser, TUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const UserProfile = () => {
  const userData = useAppSelector<RootState, TUser | null>(selectCurrentUser);
  const id = userData?.userId;

  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = useSingleUserQuery(id);

  const data = profileData?.data;

  return (
    <div className=" bg-gray-50 py-8 px-4 flex items-center justify-center">
      {isLoading && (
        <p className="text-gray-600 text-lg font-medium">Loading profile...</p>
      )}

      {isError && (
        <p className="text-red-500 font-medium">
          Failed to load user profile. {(error as any)?.data?.message || ""}
        </p>
      )}

      {!isLoading && !isError && !data && (
        <p className="text-gray-500 text-lg">No profile data found.</p>
      )}

      {!isLoading && !isError && data && <UserProfileCard userData={data} />}
    </div>
  );
};

export default UserProfile;
