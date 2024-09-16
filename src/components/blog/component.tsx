import React from "react";

interface BlogComponentProps {
  dataBlog: BlogItem;
}

const BlogComponent = ({ dataBlog }: BlogComponentProps) => {
  return (
    <div className="container flex flex-col gap-8">
      <div className="flex flex-col gap-2 items-start">
        <label htmlFor="title" className="text-xl text-gray-600 font-medium">
          Title blog
        </label>
        <input
          type="text"
          name="title"
          readOnly
          disabled
          value={dataBlog.title}
          className="w-full p-4 border border-gray-300 rounded-lg text-xl font-medium text-gray-600 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label
          htmlFor="description"
          className="text-xl text-gray-600 font-medium"
        >
          Description blog
        </label>
        <textarea
          name="description"
          readOnly
          disabled
          value={dataBlog.description} 
          className="w-full h-[200px] resize-none p-4 border border-gray-300 rounded-lg text-xl font-medium text-gray-600 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label
          htmlFor="content"
          className="text-xl text-gray-600 font-medium"
        >
          Content blog
        </label>
        <textarea
          name="content"
          readOnly
          disabled
          value={dataBlog.content} 
          className="w-full h-[400px] resize-none p-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default BlogComponent;
