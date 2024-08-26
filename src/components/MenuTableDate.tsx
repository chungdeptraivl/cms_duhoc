"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TableData } from "./elements/TableData";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, useCallback } from "react";
import { cms } from "@/config/apiConfig";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import debounce from "lodash/debounce";
import { Input } from "@/components/ui/input";

export default function MenuTableData() {
  const [data, setData] = useState<any>();
  const [dataItems, setDataItems] = useState<any[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const itemsPerPage = 10;
  const router = useRouter();

  const fetchData = async (keyword: string, pageNumber: number) => {
    try {
      setLoading(true);
      const response = await cms.get(
        `/admin/menu?Keyword=${keyword}&PageSize=${itemsPerPage}&Page=${pageNumber}`
      );
      setData(response.data.result);
      setDataItems(response.data.result.items);

      const totalItems = response.data.result.pagingInfo.totalItems;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      setTotalPages(totalPages);
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

  const debouncedFetchData = useCallback(
    debounce((keyword: string, pageNumber: number) => {
      fetchData(keyword, pageNumber);
    }, 500),
    []
  );

  useEffect(() => {
    const adminData = sessionStorage.getItem("admin");
    if (adminData) {
      debouncedFetchData(keyword, pageNumber);
    } else {
      router.push("/sign-in");
    }
  }, [router, keyword, pageNumber, debouncedFetchData]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-start gap-4">
        <Skeleton className="max-w-sm h-10 bg-slate-200" />
        <Skeleton className="max-w-sm h-10 bg-slate-200" />
        {[...Array(10)].map((_, index) => (
          <Skeleton key={index} className="h-10 w-full mb-2 bg-slate-200" />
        ))}
      </div>
    );
  }

  if (error)
    return (
      <div className="flex items-center justify-center text-xl font-medium text-red-500">
        Error: {error.message}
      </div>
    );

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const id = row.index + 1 + (pageNumber - 1) * 10;
        return <div className="text-start px-4 font-medium">{id}</div>;
      },
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-start px-4">{row.getValue("code")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-start px-4">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "url",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Url <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-start px-4">
          {row.getValue("url") ? row.getValue("url") : "null"}
        </div>
      ),
    },
    {
      accessorKey: "menus",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Menu children <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const menusChildren = row.getValue("menus") as {
          status: string;
          name: string;
        }[];
        return (
          <div className="text-start px-4">
            {menusChildren.length > 0 ? (
              <ul className="flex flex-col gap-1">
                {menusChildren.map((menu, index) => (
                  <li
                    key={index}
                    className={`p-2 rounded-lg ${
                      menu.status === "Active" ? "bg-lamaSky" : "bg-red-200"
                    }`}
                  >
                    {menu.name}
                  </li>
                ))}
              </ul>
            ) : (
              <span>No menu childen</span>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = String(row.getValue("status"));
        const bgColor = status === "Active" ? "bg-green-200" : "bg-red-200";
        return (
          <div className="capitalize text-start px-4 py-1 rounded">
            <span className={`p-2 rounded-lg ${bgColor}`}>{status}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem className="hover:bg-lamaSkyLight cursor-pointer">
                View Information
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-lamaYellow cursor-pointer">
                Edit Data
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-red-200 cursor-pointer">
                Delete Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const startItem = (pageNumber - 1) * itemsPerPage + 1;
  const endItem = Math.min(
    pageNumber * itemsPerPage,
    data.pagingInfo.totalItems
  );

  return (
    <>
      <Input
        type="text"
        placeholder="Search all data..."
        value={keyword}
        onChange={handleSearch}
        className="p-2 border rounded max-w-sm"
      />
      <TableData columns={columns} data={dataItems} />
      <div className="flex justify-between mt-4">
        <div className="pl-4">
          {startItem} - {endItem} of {data.pagingInfo.totalItems}
        </div>
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={pageNumber >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
