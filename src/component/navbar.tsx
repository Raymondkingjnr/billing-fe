"use client";
import { useGetUser } from "@/hooks/auth-hook";
import Link from "next/link";

export const Navbar = () => {
  const { data } = useGetUser();

  return (
    <div className="flex justify-end bg-[#f4f4f4] px-5 py-6">
      {data?.data.user ?
        <p className=" text-gray-900 font-semibold text-xl">
          Welcome, {data?.data.user.fullName ?? "-- --"}
        </p>
      : <div className=" flex items-center gap-2">
          <Link
            href={"/sign-up"}
            className="block w-32 rounded-xl bg-gray-900 py-2 text-center text-sm font-medium text-white
            transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-gray-900 focus-visible:ring-offset-2 shadow-lg shadow-gray-900/30
            disabled:cursor-not-allowed disabled:opacity-60"
          >
            Sign Up
          </Link>

          <Link
            href={"/sign-in"}
            className="block w-32 rounded-xl bg-gray-300 py-2 text-center text-sm font-medium text-gray-900
            transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-gray-900 focus-visible:ring-offset-2 shadow-lg shadow-gray-900/30
            disabled:cursor-not-allowed disabled:opacity-60"
          >
            Sign In
          </Link>
        </div>
      }
    </div>
  );
};
