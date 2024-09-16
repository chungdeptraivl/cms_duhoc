"use client";

import BlogComponent from "@/components/blog/component";
import BlogDetail from "@/components/blog/detail";
import { cms } from "@/config/apiConfig";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [dataBlog, setDataBlog] = useState<BlogItem | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"component" | "detail">(
    "component"
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const indicatorStyle = {
    left: activeTab === "component" ? "42px" : "152px",
  };

  const fetchData = async (id: string) => {
    try {
      setLoading(true);
      const response = await cms.get(`admin/blog/${id}`);
      setDataBlog(response.data.result);
    } catch (e: any) {
      setError(e);
      if (e.response && e.response.status === 401) {
        sessionStorage.removeItem("admin");
        router.push("/sign-in");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    alert(`handleDelete: ${id}`);
  };

  useEffect(() => {
    const adminData = sessionStorage.getItem("admin");
    if (adminData) {
      fetchData(params.id);
    } else {
      router.push("/sign-in");
    }
  }, [params.id, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error)
    return (
      <div className="flex items-center justify-center text-xl font-medium text-red-500">
        Error: {error.message}
      </div>
    );

  if (!dataBlog) {
    return <div>No blog data found.</div>;
  }

  return (
    <div className="h-full">
      <div className="p-4 bg-[#F7F8FA] flex items-center justify-between sticky top-[64px] left-0 z-10">
        <div className="flex items-center">
          <button
            className={`px-3 py-2 cursor-pointer ${
              activeTab === "component"
                ? "text-blue-500 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("component")}
          >
            Component
          </button>
          <button
            className={`px-3 py-2 cursor-pointer ${
              activeTab === "detail"
                ? "text-blue-500  font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("detail")}
          >
            Detail blog
          </button>
        </div>

        <div className="flex items-center gap-4 pr-14">
          <button className="px-3 py-2 text-gray-700 font-medium text-[16px] rounded-lg hover:bg-yellow-500  hover:text-white transition-all duration-300">
            <Link href={`/content/blogs/edit/${params.id}`}>Edit Blog</Link>
          </button>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-3 py-2 text-gray-700 font-medium text-[16px] rounded-lg bg-red-300 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            Delete blog
          </button>
        </div>
        <div
          className="w-[60px] h-1 absolute bottom-[15px] rounded-full transition-all duration-300 bg-blue-400"
          style={indicatorStyle}
        />
      </div>

      <div
        className={`py-8 flex ${
          activeTab === "component" ? "max-h-full overflow-hidden" : ""
        }`}
      >
        <div
          className={`transition-all duration-500 ${
            activeTab === "component" ? "opacity-100 w-full" : "opacity-0 w-0"
          }`}
        >
          <BlogComponent dataBlog={dataBlog} />
        </div>

        <div
          className={`transition-all duration-500 ${
            activeTab === "detail" ? "opacity-100 w-full" : "opacity-0 w-0"
          }`}
        >
          <BlogDetail dataBlog={dataBlog} />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">
              Are you sure you want to delete the blog titled{" "}
              <strong>{dataBlog.title}</strong>? This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                handleDelete(params.id);
                setIsDialogOpen(false);
              }}
              className="bg-red-600 text-white"
            >
              Delete
            </Button>
            <Button onClick={() => setIsDialogOpen(false)} className="ml-2">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
