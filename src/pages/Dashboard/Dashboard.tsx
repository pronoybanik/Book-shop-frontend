import { selectCurrentUser, TUser } from "../../redux/features/auth/authSlice";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { useSingleUserQuery } from "../../redux/features/auth/authApi";

const Dashboard = () => {
  const userData = useAppSelector<RootState, TUser | null>(selectCurrentUser);
  const id = userData?.userId;

  const { data, isLoading, isError } = useSingleUserQuery(id, {
    skip: !id, // avoid call if id is undefined
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-xl font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-red-600 text-lg font-medium">
          Failed to load user data.
        </p>
      </div>
    );
  }

  const { name, email, role, status, createdAt, passwordChangedAt } = data.data;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Dashboard</h1>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {role}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                status === "active"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {status}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500">Account Created</p>
            <p className="text-md font-medium text-gray-700 dark:text-gray-300">
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Password Last Changed</p>
            <p className="text-md font-medium text-gray-700 dark:text-gray-300">
              {new Date(passwordChangedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
