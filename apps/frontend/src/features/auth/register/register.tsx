"use client";

import {
  CalendarOutlined,
  IdcardOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import AntButton from "@/components/ui/button";
import AntDatePicker from "@/components/ui/datepicker";
import AntInput from "@/components/ui/input/input";
import AntPasswordInput from "@/components/ui/input/input-password";
import { useRegister } from "@/features/auth/register/hooks/use-register";

const registrationSchema = z
  .object({
    username: z.string().min(6, "Username is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dateOfBirth: z
      .union([z.string(), z.date()])
      .transform((val) => (typeof val === "string" ? new Date(val) : val))
      .refine((date) => !isNaN(date.getTime()), {
        message: "Invalid date format",
      })
      .refine(
        (date) => {
          const minDate = new Date();
          minDate.setFullYear(minDate.getFullYear() - 12);
          return date <= minDate;
        },
        {
          message: "You must be at least 12 years old",
        },
      ),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/^(?=.*[A-Z])(?=.*\d).+$/, {
        message:
          "Password must contain at least one uppercase letter and one number",
      }),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;

const Registration = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const { registerMutate, isRegisterPending, isRegisterSuccess } =
    useRegister();

  const onSubmit = (data: RegistrationFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...body } = data;
    registerMutate(body);
  };

  useEffect(() => {
    if (isRegisterSuccess) {
      router.push("/auth/login");
    }
  }, [isRegisterSuccess, router]);

  return (
    <div className="bg-white p-6 py-12 rounded-md w-[500px] text-black">
      <h1 className="text-center text-3xl font-bold">Registration</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-4"
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <AntInput
              placeholder="Username"
              size="large"
              prefix={<UserOutlined />}
              {...field}
            />
          )}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}

        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <AntInput
              placeholder="First Name"
              size="large"
              prefix={<IdcardOutlined />}
              {...field}
            />
          )}
        />
        {errors.firstName && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}

        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <AntInput
              placeholder="Last Name"
              size="large"
              prefix={<IdcardOutlined />}
              {...field}
            />
          )}
        />
        {errors.lastName && (
          <p className="text-red-500">{errors.lastName.message}</p>
        )}

        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <AntDatePicker
              placeholder="Date of Birth"
              size="large"
              prefix={<CalendarOutlined />}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.toDate() ?? null)}
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
            />
          )}
        />
        {errors.dateOfBirth && (
          <p className="text-red-500">{errors.dateOfBirth.message}</p>
        )}

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <AntPasswordInput
              placeholder="Password"
              size="large"
              prefix={<LockOutlined />}
              {...field}
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <AntPasswordInput
              placeholder="Confirm Password"
              size="large"
              prefix={<LockOutlined />}
              {...field}
            />
          )}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}

        <AntButton
          disabled={isRegisterPending}
          htmlType="submit"
          size="large"
          className="w-full bg-gradient-to-tr from-sky-500 to-purple-500 font-semibold text-white !duration-200 hover:!bg-gradient-to-tr hover:!from-sky-600 hover:!to-purple-600 hover:!text-white"
        >
          Sign Up
        </AntButton>
      </form>
      <hr className="my-6" />
      <Link href="/auth/login">
        <AntButton htmlType="button" size="large" className="w-full">
          Sign In
        </AntButton>
      </Link>
    </div>
  );
};

export default Registration;
