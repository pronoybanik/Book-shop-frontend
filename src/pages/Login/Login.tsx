import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../utils/PrimaryButton";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import verifyToken from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import Error from "../../utils/Error";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [login, { error, isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };

      const res = await login(loginData).unwrap();

      if (!res?.success) {
        toast.error("Login failed", { id: toastId, duration: 4000 });
        return;
      }
      const user = verifyToken(res.data.accessToken) as TUser;

      // set data in local store..
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      localStorage.setItem("accessToken", res.data.accessToken);
      if (res?.success) {
        toast.success("Logged in success", { id: toastId, duration: 4000 });
        navigate(`/`);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 4000 });
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#f96d6d] to-[#fc8686] px-8 py-6">
            <h2 className="text-center text-2xl font-bold text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-orange-100">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-8 py-6 space-y-6"
          >
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
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

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-orange-500 hover:text-orange-600"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && "data" in error ? (
              <Error>
                {(error.data as { message?: string })?.message ||
                  "An error occurred"}
              </Error>
            ) : null}

            {/* Submit Button */}
            <div>
              <PrimaryButton>
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </PrimaryButton>
            </div>

            {/* Registration Link */}
            <div className="flex items-center justify-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/registration"
                  className="font-medium text-orange-500 hover:text-orange-600 transition-colors"
                >
                  Create account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
