"use client";

import dynamic from "next/dynamic";
import React from "react";

import Loading from "@/components/shared/loading";

const Login = dynamic(() => import("@/features/auth/login"), {
  ssr: false,
  loading: () => <Loading />,
});

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
