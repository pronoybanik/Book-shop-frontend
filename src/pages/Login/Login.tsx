import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PrimaryButton from "../../utils/PrimaryButton";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import verifyToken from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import Error from "../../utils/Error";
import { Check, Shield, User } from "lucide-react";

const DEMO_CREDENTIALS = {
  user: { email: "pronoybanik82@gmail.com", password: "112233" },
  admin: { email: "admin@gmail.com", password: "112233" },
};

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [login, { error, isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [selectedDemo, setSelectedDemo] = useState<"user" | "admin" | null>(null);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const res = await login(data).unwrap();
      if (!res?.success) return toast.error("Login failed", { id: toastId });

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success("Logged in successfully", { id: toastId });
      navigate(`/`);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
      console.error(err);
    }
  };

  const handleDemoLogin = async (role: "user" | "admin") => {
    setSelectedDemo(role);
    const credentials = DEMO_CREDENTIALS[role];
    const toastId = toast.loading(`Logging in as ${role}`);

    try {
      const res = await login(credentials).unwrap();
      if (!res?.success) return toast.error("Demo login failed", { id: toastId });

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success(`Logged in as ${role}`, { id: toastId });
      navigate("/");
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
      console.error(err);
    }
  };

  return (
    <div className="lg:min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row items-center gap-10 w-full max-w-6xl">
        {/* 🟠 Demo login options */}
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">Quick Demo Access</h3>
          <div className="grid grid-cols-2 gap-3">
            {["user", "admin"].map((role) => {
              const isActive = selectedDemo === role;
              const isUser = role === "user";
              const bg = isUser ? "blue" : "purple";

              return (
                <button
                  key={role}
                  onClick={() => handleDemoLogin(role as "user" | "admin")}
                  className={`group relative flex flex-col items-center gap-2 p-4 border-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? `border-${bg}-500 bg-gradient-to-br from-${bg}-50 to-${bg}-100 shadow-lg`
                      : `border-gray-200 hover:border-${bg}-300 hover:bg-${bg}-50`
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r from-${bg}-500 to-${bg}-600 text-white shadow-lg`
                        : `bg-${bg}-100 text-${bg}-600 group-hover:bg-${bg}-200`
                    }`}
                  >
                    {isUser ? <User className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900 text-sm">
                      {isUser ? "User Login" : "Admin Login"}
                    </p>
                    <p className="text-xs text-gray-500">{isUser ? "Standard Access" : "Full Access"}</p>
                  </div>
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 🟠 Regular login form */}
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#f96d6d] to-[#fc8686] px-8 py-6">
              <h2 className="text-center text-2xl font-bold text-white">Welcome Back</h2>
              <p className="mt-2 text-center text-sm text-orange-100">
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-xs text-orange-500 hover:text-orange-600">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && "data" in error ? (
                <Error>
                  {(error.data as { message?: string })?.message || "An error occurred"}
                </Error>
              ) : null}

              <PrimaryButton>
                <div className="flex items-center justify-center w-full">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </div>
              </PrimaryButton>

              <p className="text-sm text-center text-gray-600">
                Don't have an account?{" "}
                <Link to="/registration" className="font-medium text-orange-500 hover:text-orange-600">
                  Create account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
