"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

export function Login() {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailOrPhone: "",
    password: "",
  });

  const validateEmailOrPhone = (value: string) => {
    if (!value.trim()) return "Email or phone is required";

    const phonePattern = /^[\d\s\-$$$$+]+$/;
    if (phonePattern.test(value.replace(/\s/g, ""))) {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length < 10) return "Please enter a valid phone number";
      return "";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) return "Please enter a valid email address";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      emailOrPhone: validateEmailOrPhone(formData.emailOrPhone),
      password: formData.password.trim() ? "" : "Password is required",
    };

    setErrors(newErrors);

    if (!newErrors.emailOrPhone && !newErrors.password) {
      console.log("Login attempt:", formData);
      redirect("/dashboard");
      // Add your login logic here
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className="w-full max-w-sm border-0 shadow-lg mb-10">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-medium">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="emailOrPhone" className="text-sm font-medium">
              Email or Phone
            </Label>
            <Input
              id="emailOrPhone"
              type="text"
              placeholder="Enter your email or phone"
              value={formData.emailOrPhone}
              onChange={(e) =>
                handleInputChange("emailOrPhone", e.target.value)
              }
              className={`h-11 ${errors.emailOrPhone ? "border-red-500" : ""}`}
            />
            {errors.emailOrPhone && (
              <p className="text-sm text-red-500">{errors.emailOrPhone}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                onClick={() => console.log("Forgot password clicked")}
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`h-11 ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <Button type="submit" className="w-full h-11 font-medium">
            Sign in
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
