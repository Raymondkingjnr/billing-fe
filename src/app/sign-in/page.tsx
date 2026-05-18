"use client";
import Link from "next/link";
import { useLoginUser } from "@/hooks/auth-hook";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const loginMutation = useLoginUser();
  const router = useRouter();

  const onSubmit = async (values: { email: string; password: string }) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      const result = await loginMutation.mutateAsync(payload);
      router.push("/");
    } catch (error) {
      // @ts-ignore
      toast.error(error.message);
    }
  };

  const { handleSubmit, handleChange, isSubmitting, errors, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: onSubmit,
    });

  return (
    <main className="min-h-screen bg-[#f4f4f4] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-black/10 overflow-hidden">
          {/* Card Header */}
          <div className="bg-[#efefef] rounded-2xl mx-3 mt-3 px-6 pt-8 pb-10">
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-800 shadow-sm mb-6">
              Welcome Back
            </span>
            <h1 className="text-4xl font-black tracking-tight text-gray-900">
              Sign In
            </h1>
            <p className="mt-2 text-gray-500 text-sm">
              Access your plans dashboard
            </p>
          </div>

          {/* Card Body */}
          <div className="px-6 py-8">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={handleChange("email")}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900
                    placeholder:text-gray-400 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-gray-500 hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={values.password}
                  onChange={handleChange("password")}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900
                    placeholder:text-gray-400 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-full bg-gray-900 py-4 text-sm font-medium text-white
                  shadow-lg shadow-gray-900/30 transition-colors hover:bg-gray-700
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2
                  disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing in…" : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <hr className="border-gray-100" />
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-400">or</span>
              </span>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-gray-900 hover:underline focus-visible:outline-none focus-visible:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to pricing */}
        <p className="text-center mt-6 text-xs text-gray-400">
          <Link
            href="/"
            className="hover:text-gray-700 transition-colors focus-visible:underline"
          >
            ← Back to Pricing
          </Link>
        </p>
      </div>
    </main>
  );
}
