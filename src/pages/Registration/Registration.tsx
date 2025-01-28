import { useForm, SubmitHandler } from "react-hook-form";
import PrimaryButton from "../../utils/PrimaryButton";
import { Link } from "react-router-dom";
import siteLogo from "../../images/logo_125x.png";
import fromLogo from "../../images/old-books-436498_1280 (1).jpg";
import { useRegistrationMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { FormData } from "../../types/Register.type";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [registration, { error, isLoading }] = useRegistrationMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form Data:", data);
    const toastId = toast.loading("Register in");

    const registerData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await registration(registerData).unwrap();
      console.log(res);
      toast.success("Registration successful!", {
        id: toastId,
        duration: 2000,
      });
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="max-w-screen-2xl mt-8 mx-auto">
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          {/* Left Section */}
          <section className="relative flex h-32 rounded-full py-10 items-end bg-gray-900 lg:col-span-5 lg:h-4/5 xl:col-span-6">
            <img
              alt="Night"
              src={fromLogo}
              className="absolute inset-0 h-full w-full object-contain opacity-80"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="hidden lg:relative lg:block lg:p-12">
              <img src={siteLogo} alt="" className="w-32 mr-10" />
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to Boake
              </h2>
              <p className="mt-4 leading-relaxed text-white/90">
                Patient registration page! Please fill out the following
                information to help us provide the best care.
              </p>
            </div>
          </section>

          {/* Right Section */}
          <main
            aria-label="Main"
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
          >
            <div>
              <div className="max-w-xl lg:max-w-3xl">
                <div>
                  <p className="text-2xl font-sans uppercase ">
                    Please Sign Up:
                  </p>
                  {/* Form */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-6 lg:mb-36 grid grid-cols-6 gap-6"
                  >
                    {/* First Name */}
                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:border-[#e95b5b] focus:ring-[#b84d69] focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    {/* Email */}
                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:border-[#e95b5b] focus:ring-[#b84d69] focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    {/* Password */}
                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:border-[#e95b5b] focus:ring-[#b84d69] focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    {/* Checkbox */}
                    <div className="col-span-6">
                      <label className="flex gap-4">
                        <input
                          type="checkbox"
                          {...register("marketingAccept", {
                            required: "You must accept the terms",
                          })}
                          className="h-5 w-5 bg-white border rounded-lg shadow-sm focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        <span className="text-sm text-gray-700">
                          I want to receive emails about events, product
                          updates, and company announcements.
                        </span>
                      </label>
                      {errors.marketingAccept && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.marketingAccept.message}
                        </p>
                      )}
                    </div>
                    {/* Error Message */}
                    {error && (
                      <div
                        role="alert"
                        className="rounded border-s-4 border-red-500 bg-red-50 p-4"
                      >
                        <strong className="block font-medium text-red-800">
                          {(error as { data?: { message?: string } }).data
                            ?.message || "An error occurred"}
                        </strong>
                      </div>
                    )}
                    {/* Submit Button */}
                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <PrimaryButton>
                        {isLoading ? <p>Loading...</p> : <p>Create Account</p>}
                      </PrimaryButton>
                      <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                        Already have an account?
                        <Link
                          to="/logIn"
                          className="text-gray-700 ml-2 underline"
                        >
                          Log in
                        </Link>
                        .
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Registration;
