"use client";

import PagesTableData from "@/components/PagesTableData";
import SectionTableData from "@/components/SectionTableData";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PagesitesPage = () => {
  const router = useRouter();

  useEffect(() => {
    const adminData = sessionStorage.getItem("admin");

    if (adminData) {
      const parsedAdminData = JSON.parse(adminData);
      const accessToken = parsedAdminData.result?.accessToken;

      if (accessToken) {
        router.push("/layout/pagesites");
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
        <PagesTableData />
      </div>
    </section>
  );
};

export default PagesitesPage;
