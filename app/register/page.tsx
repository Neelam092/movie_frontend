"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    if (submitted) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }));
    }
  };

 const handleSubmit = async () => {
  setSubmitted(true);

  let tempErrors: any = {};

  if (!form.name.trim()) tempErrors.name = "Full name is required";

  if (!form.email.trim()) {
    tempErrors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      tempErrors.email = "Enter a valid email address";
    }
  }

  if (!form.password.trim()) tempErrors.password = "Password is required";
  if (!form.confirmPassword.trim())
    tempErrors.confirmPassword = "Confirm password is required";

  if (
    form.password &&
    form.confirmPassword &&
    form.password !== form.confirmPassword
  ) {
    tempErrors.confirmPassword = "Passwords do not match";
  }

  setErrors(tempErrors);

  if (Object.keys(tempErrors).length > 0) return;

  try {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors({ apiError: data.message || "Something went wrong" });
      return;
    }

 
    alert("Account created successfully!");
    window.location.href = "/login";

  } catch (error) {
    console.error(error);
    setErrors({ apiError: "Network error. Try again later." });
  }
};


  return (
    <div className="h-min-screen flex items-center justify-center px-4 py-5">
      <div className="w-full max-w-md text-center">
        <h1 className="text-5xl font-bold text-white mb-10">Sign Up</h1>

        <div className="space-y-4">
          
     
          <div>
            <input
              type="text"
              name="name"
              placeholder="* Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-[#123B4B] text-white placeholder-gray-300 outline-none"
            />
            {submitted && errors.name && (
              <p className="text-red-400 text-sm float-left">{errors.name}</p>
            )}
          </div>

     
          <div>
            <input
              type="email"
              name="email"
              placeholder="* Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-[#123B4B] text-white placeholder-gray-300 outline-none"
            />
            {submitted && errors.email && (
              <p className="text-red-400 text-sm float-left">{errors.email}</p>
            )}
          </div>

    
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="* Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-[#123B4B] text-white placeholder-gray-300 outline-none pr-10"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {submitted && errors.password && (
              <p className="text-red-400 text-sm float-left">{errors.password}</p>
            )}
          </div>

       
          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="* Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-[#123B4B] text-white placeholder-gray-300 outline-none pr-10"
              />

              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-300"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </span>
            </div>

            {submitted && errors.confirmPassword && (
              <p className="text-red-400 text-sm float-left">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#1FD07A] text-white font-semibold py-3 rounded-md hover:opacity-90 transition"
          >
            Create Account
          </button>

          <a
            href="/login"
            className="text-sm text-gray-300 hover:underline block mt-2"
          >
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
