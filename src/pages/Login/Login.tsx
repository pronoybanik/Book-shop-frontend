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
      const user = verifyToken(res.data.accessToken) as TUser;

      // set data in local store..
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in success", { id: toastId, duration: 4000 });
      if (res?.success === true) {
        navigate(`/`);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 4000 });
      console.log(err);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">
            Sign in to your account
          </p>

          {/* Email Input */}
          <div>
            <label className="sr-only">Email</label>
            <div className="relative">
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:border-[#e95b5b] focus:ring-[#b84d69] focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Enter email"
              />
              {/* {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.email?.message}
                </p>
              )} */}
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
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
              </span>
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="sr-only">Password</label>
            <div className="relative">
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:border-[#e95b5b] focus:ring-[#b84d69] focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Enter password"
              />
              {/* {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )} */}
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center h-full">
            <PrimaryButton>
              {isLoading ? <p>Loading... </p> : "Login"}
            </PrimaryButton>
          </div>

          {/*  alert mess */}
          {error && "data" in error ? (
            <Error>
              {(error.data as { message?: string })?.message ||
                "An error occurred"}
            </Error>
          ) : null}

          <p className="text-center text-sm text-gray-500">
            No account?
            <Link to="/registration" className="underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
