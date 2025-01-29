import React from "react";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  salary: number;
  status: "active" | "blocked";
}

const UserManagement = () => {
  const { data } = useGetAllUserQuery(undefined);
  const [updateUser] = useUpdateUserMutation();

  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    userId: string
  ) => {
    const status = event.target.value;

    await updateUser({
      id: userId,
      data: { status },
    });
  };

  return (
    <div className="overflow-x-auto px-4 py-6">
      <div className="text-center text-lg py-4">
        <p className="text-2xl uppercase mb-6 font-bold inline text-black border-b-1 border-[#e95b5b]">
          User Management
        </p>
      </div>

      <div className="overflow-hidden rounded-lg shadow-lg bg-white">
        <table className="min-w-full table-auto divide-y divide-gray-200 text-sm">
          <thead className="bg-[#f5f5f5]">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Role
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.data.map((item: User) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-900 font-medium">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-gray-700">{item.email}</td>
                <td className="px-6 py-4 text-gray-700">{item.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full font-medium text-sm ${
                      item.status === "active"
                        ? "bg-green-100 text-green-600"
                        : item.status === "blocked"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    onChange={(e) => handleStatusChange(e, item._id)}
                    className="p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#e95b5b] focus:border-[#e95b5b]"
                  >
                    <option className="bg-gray-200">Status</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
