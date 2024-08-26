"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../store";
import { useRouter } from "next/navigation";

export default function AdminProfile() {
  const router = useRouter();
  const dataAdmin = useAppSelector((state) => state.admin.result);

  const [adminInfo, setAdminInfo] = useState({
    fullname: "",
    role: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const adminData = sessionStorage.getItem("admin");

    if (adminData) {
      const parsedAdminData = JSON.parse(adminData);
      const accessToken = parsedAdminData.result?.accessToken;

      if (accessToken) {
        router.push("/admin");
      } else {
        router.push("/sign-in");
      }
    } else {
      router.push("/sign-in");
    }
  }, [router]);

  useEffect(() => {
    if (dataAdmin) {
      setAdminInfo({
        fullname: dataAdmin.fullName,
        role: dataAdmin.roles[0],
        email: "study@gmail.com",
        phone: "0387133658",
        address: "Khu 2, Hoàng Cương, Kênh Ba, Phú Thọ",
      });
    }
  }, [dataAdmin]);

  const handleEdit = () => {
    // Logic chỉnh sửa thông tin admin
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-100 p-4">
      <div className="w-full h-full bg-white rounded-lg shadow-lg p-6">
        {/* Phần trên */}
        <div className="flex flex-col md:flex-row items-center md:items-start pb-4 border-b">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200">
            <Image
              src="/avatar.png"
              alt="Admin Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="md:ml-6 mt-6 md:mt-0 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">
              {adminInfo.fullname}
            </h1>
            <p className="text-lg text-gray-500">{adminInfo.role}</p>
            <p className="text-sm text-gray-600">{adminInfo.email}</p>
            <p className="text-sm text-gray-600">{adminInfo.phone}</p>
            <p className="text-sm text-gray-600">{adminInfo.address}</p>
          </div>
        </div>

        {/* Phần dưới */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700">
            Điều khoản cho admin
          </h2>
          <ul className="mt-4 text-gray-600 list-disc pl-5 space-y-2">
            <li>Quản lý và bảo mật hệ thống.</li>
            <li>Đảm bảo an toàn dữ liệu người dùng.</li>
            <li>Thực hiện các nhiệm vụ được phân công.</li>
            <li>Liên hệ với quản lý nếu có bất kỳ sự cố nào xảy ra.</li>
            <li>Tuân thủ các quy định nội bộ của công ty.</li>
          </ul>
        </div>

        {/* Các nút hành động */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleEdit}
            className="px-6 py-2 text-white bg-yellow-400 rounded-md hover:bg-yellow-700 transition"
          >
            Sửa thông tin
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 text-white bg-red-400 rounded-md hover:bg-red-700 transition"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
