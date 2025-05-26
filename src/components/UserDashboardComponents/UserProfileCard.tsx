/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import UserUpdateModal from "./UserUpdateModel";
import { useUpdateUserMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  salary: number;
  status: "active" | "blocked";
  createdAt: Date;
  needsPasswordChange: boolean;
}

const UserProfileCard = ({ userData }: { userData: User }) => {
  const { email, name, createdAt, needsPasswordChange, status, role } =
    userData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleUpdate = async (updatedData: any) => {
    try {
      await updateUser({ id: userData._id, data: updatedData }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 rounded-2xl shadow-lg bg-white border border-gray-200 p-8">
      <div className="mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">👤 User Profile</h2>
        <p className="text-sm text-gray-500 mt-1">
          Basic user information and status overview
        </p>
      </div>

      <div className="space-y-5">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Name</span>
          <span className="text-gray-900 font-semibold">{name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Email</span>
          <span className="text-gray-900 font-medium">{email}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Role</span>
          <span className="capitalize text-indigo-600 font-semibold">{role}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Status</span>
          <span
            className={`font-semibold ${
              status === "active" ? "text-green-600" : "text-red-500"
            }`}
          >
            {status}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Password Change Needed</span>
          <span
            className={`font-semibold ${
              needsPasswordChange ? "text-red-600" : "text-green-600"
            }`}
          >
            {needsPasswordChange ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-400 border-t pt-3">
          <span>Created At</span>
          <span>{new Date(createdAt).toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg"
      >
        {isLoading ? "Updating..." : "Update Profile"}
      </button>

      <UserUpdateModal
        user={userData}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default UserProfileCard;
