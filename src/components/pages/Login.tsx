import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { phoneSchema, type PhoneInput } from "../../models/schema";
import { useFetchData } from "../../hooks/apiCall";
import type { Country, FormattedCountry } from "../../models/typeDefinitions";
import CountrySelector from "../../shared/CountrySelector";
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
    setTimeout(() => alert("OTP sent! Use 1234"), 1000);
  };

  const handleOtpVerify = () => {
    if (otp === "1234") {
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {!otpSent ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CountrySelector countries={countries} />
          <input
            type="text"
            placeholder="Phone"
            {...register("phone")}
            className="border p-2 w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
          <button className="bg-blue-600 text-white px-4 py-2">Send OTP</button>
        </form>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 w-full"
          />
          <button
            onClick={handleOtpVerify}
            className="bg-green-600 text-white px-4 py-2"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
