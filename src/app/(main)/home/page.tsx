"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const adminData = sessionStorage.getItem("admin");

    if (adminData) {
      const parsedAdminData = JSON.parse(adminData);
      const accessToken = parsedAdminData.result?.accessToken;

      if (accessToken) {
        router.push("/home");
      } else {
        router.push("/sign-in");
      }
    } else {
      router.push("/sign-in");
    }
  }, [router]);

  return <section>Home page</section>;
};

export default HomePage;
