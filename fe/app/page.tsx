"use client";
import { useState } from "react";

export default function Signup() {
  const [role, setRole] = useState("");
  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 py-12">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        {/* Title */}
        <h1 className="text-3xl font-bold text-sky-600 mb-6">Sign up</h1>

        {/* Role Select */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-sky-400 focus:ring-sky-400"
          >
            <option value="">-- Select Role --</option>
            <option value="doctor">Doctor</option>
            <option value="chemist">Chemist</option>
          </select>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          <LabelledInput label="Name" placeholder="Enter your name" />
          <LabelledInput label="Email" placeholder="xyz@gmail.com" />
          <LabelledInput
            label="Password"
            type="password"
            placeholder="••••••••"
          />
          <LabelledInput label="Government ID" placeholder="Enter your ID" />
        </div>

        {/* Button */}
        <button
          type="button"
          className="mt-6 w-full rounded-lg bg-sky-500 px-5 py-2.5 text-2sm font-medium text-white hover:bg-sky-600 focus:ring-2 focus:ring-sky-300"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
}

function LabelledInput({ label, placeholder, type }: LabelledInputType) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type={type || "text"}
        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-sky-400 focus:ring-sky-400"
        placeholder={placeholder}
        required
      />
    </div>
  );
}