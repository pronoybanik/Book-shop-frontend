import React from "react";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";

const UserManagement = () => {
  const { data } = useGetAllUserQuery(undefined);
  const [updateUser] = useUpdateUserMutation();

  const handleStatusChange = async (event, userId) => {
    const status = event.target.value;

    await updateUser({
      id: userId,
      data: { status },
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="text-center text-lg  py-2">
        <p className="text-2xl uppercase mb-4 text-black inline-block border-b-2 border-[#e95b5b]">
          User Management
        </p>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Role
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Salary
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                User Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.data.map((item) => (
              <tr key={item._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {item?.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item?.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item?.role}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item?.salary}
                </td>
                <td
                  className={`whitespace-nowrap px-4 py-2 font-bold ${
                    item?.status === "active"
                      ? "text-green-600"
                      : item?.status === "blocked"
                      ? "text-red-600"
                      : "text-gray-700"
                  }`}
                >
                  {item?.status}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <select
                    onChange={(e) => handleStatusChange(e, item._id)}
                    className="p-2 border border-gray-300 rounded-lg"
                  >
                    <option className="bg-gray-300">Status</option>
                    <option className="" value="active">
                      Active
                    </option>
                    <option className="" value="blocked">
                      Blocked
                    </option>
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
