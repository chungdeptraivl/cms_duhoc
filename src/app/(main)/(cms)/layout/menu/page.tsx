"use client";

import MenuTableData from "@/components/MenuTableDate";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const MenuPage = () => {
  const router = useRouter();

  useEffect(() => {
    const adminData = sessionStorage.getItem("admin");

    if (adminData) {
      const parsedAdminData = JSON.parse(adminData);
      const accessToken = parsedAdminData.result?.accessToken;

      if (accessToken) {
        router.push("/layout/menu");
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
        <MenuTableData />
      </div>
    </section>
  );
};

export default MenuPage;
