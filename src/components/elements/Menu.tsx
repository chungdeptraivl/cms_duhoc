"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { title } from "process";

const menuItems = [
  {
    title: "",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/home",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "LAYOUTS",
    items: [
      {
        icon: "/teacher.png",
        label: "Sections",
        href: "/layout/sections",
        visible: ["admin"],
      },
      {
        icon: "/student.png",
        label: "Pages",
        href: "/layout/pagesites",
        visible: ["admin"],
      },
      {
        icon: "/parent.png",
        label: "Menu",
        href: "/layout/menu",
        visible: ["admin"],
      },
      {
        icon: "/subject.png",
        label: "Footer",
        href: "/layout/footer",
        visible: ["admin"],
      },
    ],
  },
  {
    title: "CONTENTS",
    items: [
      {
        icon: "/class.png",
        label: "Blogs",
        href: "/content/blogs",
        visible: ["admin"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/admin",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  const pathname = usePathname();

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light mt-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            return (
              <Link
                href={item.href}
                key={item.label}
                className={`flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:font-[600] hover:bg-lamaSkyLight ${
                  pathname.includes(item.href)
                    ? "font-[600] bg-lamaSkyLight"
                    : ""
                }`}
              >
                <Image src={item.icon} alt="" width={20} height={20} />
                <span className="hidden lg:block">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
