// components/ChangePasswordForm.tsx
import { useState } from "react";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import PrimaryButton from "../../utils/PrimaryButton";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePassword, { isLoading, isSuccess, isError }] =
    useChangePasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { oldPassword, newPassword };
    const res = await changePassword(data);
    if (res.data.success) {
      alert("password change");
      setOldPassword("");
      setNewPassword("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Change Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Old Password
          </label>
          <input
            type="test"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            New Password
          </label>
          <input
            type="text"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <PrimaryButton>
          {isLoading ? "Changing..." : "Change Password"}
        </PrimaryButton>

        {isSuccess && (
          <p className="text-green-600 text-sm">
            Password changed successfully!
          </p>
        )}
        {isError && (
          <p className="text-red-600 text-sm">
            Something went wrong. Try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default ChangePasswordForm;
