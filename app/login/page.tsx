"use client";

import { useState } from "react";
import { login } from "../utils/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const data = await login({
        email: form.email,
        password: form.password,
      });
      console.log("Login successful", data);
      // Save token
      if (form.remember) {
        // localStorage.setItem("token", data.access_token);
      } else {
        // localStorage.setItem("token", data.access_token);
        // sessionStorage.setItem("token", data.access_token);
      }

      // Redirect to movies
      router.push("/movieListWrapper");
    } catch (err: any) {
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setForm({ ...form, [field]: value });
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  return (
    <div className="relative h-min-screen flex items-center justify-center overflow-hidden">
      <div className="text-center ">
        <h1 className="text-5xl font-bold text-white mb-10">Sign in</h1>

        <div className="space-y-4 w-[350px] mx-auto">

          {/* Email */}
          <div className="text-left">
            <input
              type="email"
              placeholder="Email"
              className={`w-full px-4 py-3 rounded-md bg-[#123B4B] text-white placeholder-gray-300 outline-none ${
                errors.email ? "border border-red-500" : ""
              }`}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="text-left">
            <input
              type="password"
              placeholder="Password"
              className={`w-full px-4 py-3 rounded-md bg-[#123B4B] text-white placeholder-gray-300 outline-none ${
                errors.password ? "border border-red-500" : ""
              }`}
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2 text-gray-300 text-sm pl-1 justify-center">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => handleChange("remember", e.target.checked)}
                className="peer hidden"
              />

              <div className="w-4 h-4 rounded bg-[#123B4B] border border-gray-500 flex items-center justify-center">
                {form.remember && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              <span>Remember me</span>
            </label>
          </div>

          {/* Button */}
          <button
            className="w-full bg-[#1FD07A] text-white font-semibold py-3 rounded-md hover:opacity-90 transition"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <a
            href="/register"
            className="text-sm text-gray-300 hover:underline block mt-2"
          >
            Don’t have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
