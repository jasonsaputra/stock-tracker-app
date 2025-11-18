"use client";

import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constant";
import { CountrySelectField } from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "ID",
      investmentGoals: "Growth",
      riskTolerance: "Medium",
      preferredIndustry: "Technology",
    },
    mode: "onBlur",
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const passwordRequirements = [
    {
      label: "At least 8 characters long",
      met: password?.length >= 8,
    },
    {
      label: "At least 1 uppercase letter (A-Z)",
      met: /[A-Z]/.test(password || ""),
    },
    {
      label: "At least 1 number (0-9)",
      met: /[0-9]/.test(password || ""),
    },
    {
      label: "At least 1 special character (e.g !@#$%&)",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password || ""),
    },
  ];

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1 className="form-title">Sign Up & Personalize</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="Your name"
          register={register}
          error={errors.fullName}
          validation={{ required: "Full name is required", minLength: 2 }}
        />
        <InputField
          name="email"
          label="Email"
          placeholder="contact@gmail.com"
          register={register}
          error={errors.email}
          validation={{
            required: "Email address is required",
            pattern: {
              value: /^\w+@\w+\.\w+$/,
              message: "Invalid email format. Fix it and try again.",
            },
          }}
        />
        <div>
          <InputField
            name="password"
            label="Password"
            placeholder="Enter a strong password"
            type="password"
            register={register}
            error={errors.password}
            validation={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Please meet all password requirements",
              },
              validate: {
                hasUpperCase: (value: string) => /[A-Z]/.test(value),
                hasNumber: (value: string) => /[0-9]/.test(value),
                hasSymbol: (value: string) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value),
              },
            }}
          />

          <div className="mt-2 space-y-1">
            {passwordRequirements.map((requirement, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span
                  className={`${
                    requirement.met ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  {requirement.met ? "✓" : "○"}
                </span>
                <span
                  className={`${
                    requirement.met ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  {requirement.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <CountrySelectField
          name="country"
          label="Country"
          control={control}
          error={errors.country}
          required
        />
        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />
        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />
        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Creating Account" : "Start Your Investing Journey"}
        </Button>

        <FooterLink
          text="Already have an account?"
          linkText="Sign in"
          href="/sign-in"
        />
      </form>
    </>
  );
};
export default SignUp;
