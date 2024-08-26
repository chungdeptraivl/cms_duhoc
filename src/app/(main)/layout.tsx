import Menu from "@/components/elements/Menu";
import Navbar from "@/components/elements/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] px-4 pb-6 overflow-y-scroll">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2 sticky top-0 py-3 bg-white"
        >
          <Image src="/as.png" alt="logo" width={36} height={36} />
          <span className="hidden lg:block font-bold">CMS Abroad</span>
        </Link>

        <Menu />
      </div>

      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
