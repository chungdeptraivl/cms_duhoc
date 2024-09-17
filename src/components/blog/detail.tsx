import { title } from "process";
import React from "react";

interface BlogDetailProps {
  dataBlog: BlogItem;
}

const BlogDetail = ({ dataBlog }: BlogDetailProps) => {
  return (
    <div className="container bg-white w-full rounded-lg">
      <div className="px-4 py-[26px] flex flex-col gap-y-4 w-full">
        <p className="text-[22px] text-[#1A497F] font-[600] leading-7">
          {(dataBlog.title)}
        </p>

        <p className="text-xl-bold leading-6 text-[text]">
          {dataBlog.description}
        </p>

        <div
          className="text-md text-[#102E50] leading-6"
          dangerouslySetInnerHTML={{ __html: dataBlog.content }}
        ></div>
      </div>
    </div>
  );
};

export default BlogDetail;
