"use client";

import { title } from "process";
import React from "react";
import { useAppSelector } from "../../../../../../../store";

const PreviewBlogPage = () => {
  const blogContent = useAppSelector((state) => state.blogContent);
  return (
    <div className="container py-8">
      <div className=" bg-white w-full rounded-lg ">
        <div className="px-4 py-[26px] flex flex-col gap-y-4 w-full">
          <p className="text-[22px] text-[#1A497F] font-[600] leading-7">
            {blogContent.title}
          </p>

          <p className="text-xl-bold leading-6 text-[text]">
            {blogContent.description}
          </p>

          <div
            className="text-md text-[#102E50] leading-6"
            dangerouslySetInnerHTML={{ __html: blogContent.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PreviewBlogPage;
