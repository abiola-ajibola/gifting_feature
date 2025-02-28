"use client";
import Link from "next/link";
import { /* useRouter, */ usePathname } from "next/navigation";
// import { useEffect } from "react";

export function LoginNavItem() {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (localStorage.getItem("token")) {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (typeof document !== "undefined") {
        document.cookie = "token=; max-age=0";
      }
      window.location.href = "/";
    }
  };

  return (
    <li className="ml-auto">
      <Link
        href={
          typeof localStorage !== "undefined" && localStorage.getItem("token")
            ? window.location.protocol + "//" + window.location.host + pathname
            : "/login"
        }
        onClick={typeof document === "undefined" ? undefined : handleClick}
        className="text-white hover:text-gray-400"
      >
        {typeof localStorage !== "undefined" && localStorage.getItem("token")
          ? "Logout"
          : "Login"}
      </Link>
    </li>
  );
}
