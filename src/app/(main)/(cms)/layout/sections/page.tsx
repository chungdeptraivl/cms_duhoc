"use client";

import SectionTableData from "@/components/SectionTableData";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const SectionPage = () => {
  const router = useRouter();

  useEffect(() => {
    const adminData = sessionStorage.getItem("admin");

    if (adminData) {
      const parsedAdminData = JSON.parse(adminData);
      const accessToken = parsedAdminData.result?.accessToken;

      if (accessToken) {
        router.push("/layout/sections");
      } else {
        router.push("/sign-in");
      }
    } else {
      router.push("/sign-in");
    }
  }, [router]);
  return (
    <section>
      <div className="p-4">
        <SectionTableData />
      </div>
    </section>
  );
};

export default SectionPage;
