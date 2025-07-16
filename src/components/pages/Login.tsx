import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { phoneSchema, type PhoneInput } from "../../models/schema";
import { useFetchData } from "../../hooks/apiCall";
import type { Country, FormattedCountry } from "../../models/typeDefinitions";
import CountrySelector from "../../shared/CountrySelector";
import { toast } from "sonner";
// import CountrySelector from "../components/Auth/CountrySelector";

const Login = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [countries, setCountries] = useState<FormattedCountry[] | null>(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const { call: fetchAllCountries } = useFetchData<Country[]>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneInput>({
    resolver: zodResolver(phoneSchema),
  });

  useEffect(() => {
    getFetchAllCountries();
  }, []);

  const getFetchAllCountries = async () => {
    const res = await fetchAllCountries("all?fields=name,flags,idd");
    if (!res) return;

    const formatted = res.data
      .map((c) => {
        const dial = c.idd?.root + c.idd?.suffixes?.[0];
        if (!dial) return null;
        return {
          name: c.name.common,
          code: dial,
          flag: c.flags.svg,
        };
      })
      .filter((c): c is FormattedCountry => c !== null);

    setCountries(formatted);
  };

  const onSubmit = (data: PhoneInput) => {
    setOtpSent(true);
    console.log(data);
    toast.success(`OTP sent to ${data.phone}`);
    setTimeout(() => alert("OTP sent! Use 1234"), 1000);
  };

  const handleOtpVerify = () => {
    if (otp === "1234") {
      localStorage.setItem("loggedIn", "true");
      toast.success("Login Successful.");
      navigate("/dashboard");
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="w-full max-w-md bg-white/80 dark:bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-6">
          🔐 Login to Gemini
        </h1>

        {!otpSent ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* 🌍 Country Selector */}
            <CountrySelector countries={countries} />

            {/* 📞 Phone Input */}
            <div>
              <input
                type="text"
                placeholder="Enter phone number"
                {...register("phone")}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded hover:brightness-110 transition"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <div className="space-y-5">
            {/* 🔐 OTP Input */}
            <input
              type="text"
              placeholder="Enter OTP (hint: 1234)"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 transition"
            />

            <button
              onClick={handleOtpVerify}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded hover:brightness-110 transition"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
