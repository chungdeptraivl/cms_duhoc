"use client";

import BlogTableData from "@/components/BlogTableData";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const BlogPage = () => {
  const router = useRouter();

  useEffect(() => {
    const adminData = sessionStorage.getItem("admin");

    if (adminData) {
      const parsedAdminData = JSON.parse(adminData);
      const accessToken = parsedAdminData.result?.accessToken;

      if (accessToken) {
        router.push("/content/blogs");
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
        <BlogTableData />
      </div>
    </section>
  );
};

export default BlogPage;
