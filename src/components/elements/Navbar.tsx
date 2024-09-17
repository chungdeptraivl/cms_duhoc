"use client";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../../store";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const dataAdmin = useAppSelector((state) => state.admin.result);

  const router = useRouter();
  const param = usePathname();
  console.log("kkk", param);

  const [isShowProfileCard, setIsShowProfileCard] = useState<boolean>(false);

  const profileCardRef = useRef<HTMLDivElement>(null);
  const buttonCardRef = useRef<HTMLDivElement>(null);

  const handleClickShowProfileCard = () => {
    setIsShowProfileCard(!isShowProfileCard);
  };

  // Đóng ProfileCard khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileCardRef.current &&
        !profileCardRef.current.contains(event.target as Node)
      ) {
        setIsShowProfileCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileCardRef]);

  const logout = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  const handleBackPage = () => {
    window.history.back();
  };

  return (
    <div className="sticky top-0 z-[9] flex justify-between items-center bg-lamaSkyLight">
      {param.includes("detail") ||
      param.includes("edit") ||
      param.includes("post") ||
      param.includes("preview") ? (
        <button
          onClick={() => handleBackPage()}
          className="px-3 ml-6 py-2 text-blue-600 hover:bg-blue-500 hover:text-white rounded-lg border border-blue-400 font-medium"
        >
          Come back
        </button>
      ) : (
        <div />
      )}
      <div className="flex items-center justify-end gap-10 p-2 relative">
        <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
          <Image src="/search.png" alt="" width={14} height={14} />
          <input
            type="text"
            placeholder="Search..."
            className="w-[200px] p-2 bg-transparent outline-none"
          />
        </div>
        <div
          ref={buttonCardRef}
          onClick={handleClickShowProfileCard}
          className={`flex items-center gap-4 justify-end cursor-pointer hover:bg-slate-300 py-2 px-4 rounded-xl ${
            isShowProfileCard ? "bg-slate-300" : "bg-transparent"
          }`}
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs leading-3 font-medium">
              {dataAdmin.fullName}
            </span>
            <span className="text-[10px] text-gray-500 text-right">
              {dataAdmin.roles[0]}
            </span>
          </div>
          <img
            src="/avatar.png"
            alt=""
            width={36}
            height={36}
            className="rounded-full w-9 h-9 aspect-square object-cover object-center"
          />
        </div>

        <div
          ref={profileCardRef}
          className="w-[300px] overflow-hidden rounded-2xl bg-gray-200 absolute top-[100%] right-4 z-10"
          style={{
            height: isShowProfileCard ? "250px" : "0",
            paddingTop: isShowProfileCard ? "16px" : "0",
            opacity: isShowProfileCard ? "1" : "0",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <div className="flex items-center gap-4 pb-2 border-b border-slate-200 px-4">
            <img
              src="/avatar.png"
              alt=""
              className="w-12 h-12 object-cover object-center aspect-square rounded-full border border-slate-600"
            />
            <div className="flex flex-col gap-1 items-start">
              <p className="text-xl text-black font-[600] capitalize">
                {dataAdmin.fullName}
              </p>
              <p className="text-[16px] text-slate-500 font-[500]">
                Role: {dataAdmin.roles[0]}
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-1 px-2">
            <Link
              href="/admin"
              className="py-2 px-4 text-[18px] font-[500] hover:bg-slate-300 rounded-lg"
            >
              Profile
            </Link>
            <Link
              href={"/clause"}
              className="py-2 px-4 text-[18px] font-[500] hover:bg-slate-300 rounded-lg"
            >
              Clause
            </Link>
          </div>
          <button
            onClick={logout}
            className="mt-4 p-3 w-full bg-slate-400 text-white font-[600] text-xl hover:bg-slate-500"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
