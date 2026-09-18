"use client";

import { User, MapPin } from "lucide-react";

export interface ShippingData {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
}

interface ShippingFormProps {
  data: ShippingData;
  onChange: (field: keyof ShippingData, value: string) => void;
  errors: Partial<Record<keyof ShippingData, string>>;
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Chandigarh", "Puducherry"
];

export default function ShippingForm({ data, onChange, errors }: ShippingFormProps) {
  return (
    <div className="space-y-6">
      {/* 1. Contact Details */}
      <div className="bg-[#FAF7F0] p-6 sm:p-7 rounded-3xl border border-[#E8E1CE] shadow-xs space-y-4">
        <h2 className="text-lg font-serif font-bold text-[#174A3A] flex items-center gap-2">
          <User className="w-5 h-5 text-[#D6A83F]" />
          <span>Contact Information</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#252A26] mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Aarav Sharma"
                value={data.fullName}
                onChange={(e) => onChange("fullName", e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-[#252A26] focus:outline-none transition-all ${
                  errors.fullName ? "border-red-500 ring-1 ring-red-400" : "border-[#DCD5C3] focus:border-[#174A3A]"
                }`}
              />
            </div>
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-[#252A26] mb-1.5">
              Mobile Number (For Delivery SMS) <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-sm font-bold text-[#7D8A80] border-r border-[#DCD5C3] pr-2.5">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                value={data.phone}
                onChange={(e) => onChange("phone", e.target.value.replace(/[^0-9]/g, ""))}
                className={`w-full pl-16 pr-4 py-3 rounded-2xl bg-white border text-sm text-[#252A26] focus:outline-none transition-all ${
                  errors.phone ? "border-red-500 ring-1 ring-red-400" : "border-[#DCD5C3] focus:border-[#174A3A]"
                }`}
              />
            </div>
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[#252A26] mb-1.5">
              Email Address (For Order Invoice) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="aarav@gmail.com"
                value={data.email}
                onChange={(e) => onChange("email", e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-[#252A26] focus:outline-none transition-all ${
                  errors.email ? "border-red-500 ring-1 ring-red-400" : "border-[#DCD5C3] focus:border-[#174A3A]"
                }`}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
        </div>
      </div>

      {/* 2. Shipping Address */}
      <div className="bg-[#FAF7F0] p-6 sm:p-7 rounded-3xl border border-[#E8E1CE] shadow-xs space-y-4">
        <h2 className="text-lg font-serif font-bold text-[#174A3A] flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#D6A83F]" />
          <span>Delivery Address</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* House / Flat / Street */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#252A26] mb-1.5">
              Flat / House No. / Building / Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Flat 402, Lotus Residency, MG Road"
              value={data.addressLine}
              onChange={(e) => onChange("addressLine", e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-[#252A26] focus:outline-none transition-all ${
                errors.addressLine ? "border-red-500 ring-1 ring-red-400" : "border-[#DCD5C3] focus:border-[#174A3A]"
              }`}
            />
            {errors.addressLine && <p className="text-xs text-red-500 mt-1">{errors.addressLine}</p>}
          </div>

          {/* Landmark (Optional) */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#252A26] mb-1.5">
              Landmark (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Near Shiv Mandir / Behind City Mall"
              value={data.landmark}
              onChange={(e) => onChange("landmark", e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-[#DCD5C3] text-sm text-[#252A26] focus:outline-none focus:border-[#174A3A] transition-all"
            />
          </div>

          {/* PIN Code */}
          <div>
            <label className="block text-xs font-semibold text-[#252A26] mb-1.5">
              PIN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              maxLength={6}
              placeholder="e.g. 110001"
              value={data.pincode}
              onChange={(e) => onChange("pincode", e.target.value.replace(/[^0-9]/g, ""))}
              className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-[#252A26] focus:outline-none transition-all ${
                errors.pincode ? "border-red-500 ring-1 ring-red-400" : "border-[#DCD5C3] focus:border-[#174A3A]"
              }`}
            />
            {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-semibold text-[#252A26] mb-1.5">
              City / Town <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. New Delhi"
              value={data.city}
              onChange={(e) => onChange("city", e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-[#252A26] focus:outline-none transition-all ${
                errors.city ? "border-red-500 ring-1 ring-red-400" : "border-[#DCD5C3] focus:border-[#174A3A]"
              }`}
            />
            {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
          </div>

          {/* State Dropdown */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#252A26] mb-1.5">
              State <span className="text-red-500">*</span>
            </label>
            <select
              value={data.state}
              onChange={(e) => onChange("state", e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-[#252A26] focus:outline-none transition-all ${
                errors.state ? "border-red-500 ring-1 ring-red-400" : "border-[#DCD5C3] focus:border-[#174A3A]"
              }`}
            >
              <option value="">Select Delivery State</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
