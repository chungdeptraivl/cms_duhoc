"use client";

import FooterTableData from "@/components/FooterTableData";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const FooterPage = () => {
  const router = useRouter();

  useEffect(() => {
    const adminData = sessionStorage.getItem("admin");

    if (adminData) {
      const parsedAdminData = JSON.parse(adminData);
      const accessToken = parsedAdminData.result?.accessToken;

      if (accessToken) {
        router.push("/layout/footer");
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
        <FooterTableData />
      </div>
    </section>
  );
};

export default FooterPage;
