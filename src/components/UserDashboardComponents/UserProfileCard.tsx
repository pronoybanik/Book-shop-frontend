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
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 mt-10 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        User Profile
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Name:</span>
          <span className="text-gray-900">{name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Email:</span>
          <span className="text-gray-900">{email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Role:</span>
          <span className="capitalize text-gray-900">{role}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Status:</span>
          <span
            className={`text-sm font-bold ${
              status === "active" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">
            Needs Password Change:
          </span>
          <span
            className={`font-semibold ${
              needsPasswordChange ? "text-red-500" : "text-green-500"
            }`}
          >
            {needsPasswordChange ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 pt-2">
          <span>Created:</span>
          <span>{new Date(createdAt).toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-semibold transition"
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
