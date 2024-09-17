"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Select, { MultiValue } from "react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";

import "react-quill/dist/quill.snow.css";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../../../../../store";
import { setBlogContent, updateCategories, updateContent, updateContinent, updateCountry, updateDescription, updateTitle } from "../../../../../../../store/slices/blogContentSlice";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface CategoryOption {
  value: string;
  label: string;
}

interface CountryOption {
  value: string;
  label: string;
}

interface ContinentOption {
  value: string;
  label: string;
}

const categories: CategoryOption[] = [
  { value: "tech", label: "Technology" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
];

const countries: Record<string, CountryOption[]> = {
  asia: [
    { value: "japan", label: "Japan" },
    { value: "china", label: "China" },
  ],
  europe: [
    { value: "france", label: "France" },
    { value: "germany", label: "Germany" },
  ],
};

const continents: ContinentOption[] = [
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "north-america", label: "North America" },
];

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    ["link", "image", "video"],
    ["blockquote", "code-block"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "background",
  "align",
  "code-block",
];

const BlogPostForm = () => {
  const dispatch = useAppDispatch();
  const blogContent = useAppSelector((state) => state.blogContent);

  const [selectedCategories, setSelectedCategories] = useState<
    MultiValue<CategoryOption>
  >([]);
  const [selectedContinent, setSelectedContinent] =
    useState<ContinentOption | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null
  );
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);

  useEffect(() => {
    if (selectedContinent) {
      setCountryOptions(countries[selectedContinent.value] || []);
      setSelectedCountry(null);
      dispatch(updateContinent(selectedContinent.value));
    }
  }, [selectedContinent, dispatch]);

  const handleSubmit = () => {
    const updatedBlog = {
      ...blogContent,
      categoryIds: selectedCategories.map((c) => c.value),
      countries: selectedCountry ? [selectedCountry.value] : [],
    };
    dispatch(setBlogContent(updatedBlog));
    console.log("Blog content submitted: ", updatedBlog);
  };

  return (
    <div className="container mx-auto px-4 pt-4 pb-[100px]">
      <h1 className="text-2xl font-bold mb-4">Post a New Blog</h1>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Title</label>
        <Input
          type="text"
          value={blogContent.title}
          onChange={(e) => dispatch(updateTitle(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded text-xl"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Description</label>
        <Textarea
          value={blogContent.description}
          onChange={(e) => dispatch(updateDescription(e.target.value))}
          className="w-full h-[300px] p-3 border border-gray-300 rounded text-xl"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Content</label>
        <ReactQuill
          value={blogContent.content}
          onChange={(value) => dispatch(updateContent(value))}
          modules={modules}
          formats={formats}
          className="rounded h-[500px]"
        />
      </div>

      <div className="mb-4 mt-14">
        <label className="block text-lg font-medium mb-2">Categories</label>
        <Select
          isMulti
          options={categories}
          value={selectedCategories}
          onChange={(newValue) => {
            setSelectedCategories(newValue);
            dispatch(updateCategories(newValue.map((option) => option.value)));
          }}
          className="basic-single"
          classNamePrefix="select"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Continent</label>
        <Select
          options={continents}
          value={selectedContinent}
          onChange={setSelectedContinent}
          className="basic-single"
          classNamePrefix="select"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Country</label>
        <Select
          options={countryOptions}
          value={selectedCountry}
          onChange={(value) => {
            setSelectedCountry(value);
            dispatch(updateCountry(value ? [value.value] : []));
          }}
          className="basic-single"
          classNamePrefix="select"
          isDisabled={!selectedContinent}
        />
      </div>

      <div className="w-full flex items-center justify-end gap-3 mt-10">
        <Link href={"/content/blogs/preview"}>
          <Button
            type="submit"
            className="bg-violet-400 hover:bg-violet-500 text-white py-2 px-4 rounded text-[18px] font-medium"
          >
            Preview
          </Button>
        </Link>

        <Button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded text-[18px] font-medium"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BlogPostForm;
