'use client'

import Link from 'next/link'
import {SignUpParams} from "@/api/auth-api";
import {useSignupUser} from "@/hooks/auth-hook";
import {useFormik} from "formik";

export default function SignUpPage() {

    const signupMutation = useSignupUser()

    const onnSubmit = async  (values: SignUpParams) =>{

        const payload ={
            name: values.fullName,
            email: values.email,
            password: values.password,
        }

        try {
            return await signupMutation.mutateAsync(payload);
        } catch (error) {
          console.error(error)
        }

    }

    const {values, errors, handleChange, handleSubmit, isSubmitting} = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
        },
        onSubmit: onnSubmit,
    })

    return (
        <main className="min-h-screen bg-[#f4f4f4] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-black/10 overflow-hidden">
                    {/* Card Header — lavender tint like Professional plan */}
                    <div className="bg-[#d6dcf0] rounded-2xl mx-3 mt-3 px-6 pt-8 pb-10">
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-800 shadow-sm mb-6">
              Get Started
            </span>
                        <h1 className="text-4xl font-black tracking-tight text-gray-900">Create Account</h1>
                        <p className="mt-2 text-gray-500 text-sm">Start hiring smarter today</p>
                    </div>

                    {/* Card Body */}
                    <div className="px-6 py-8">
                        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                            {/* Full Name */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                    Full name
                                </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={values.fullName}
                                    onChange={handleChange('fullName')}
                                    placeholder="Jane Smith"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900
                    placeholder:text-gray-400 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={values.email}
                                    onChange={handleChange('email')}
                                    placeholder="you@company.com"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900
                    placeholder:text-gray-400 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    minLength={8}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    placeholder="Min. 8 characters"
                                    aria-describedby="password-hint"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900
                    placeholder:text-gray-400 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                />
                                <p id="password-hint" className="text-xs text-gray-400">
                                    Must be at least 8 characters long.
                                </p>
                            </div>

                            {/* Terms */}
                            <p className="text-xs text-gray-400 leading-relaxed">
                                By creating an account you agree to our{' '}
                                <Link href="/terms" className="text-gray-700 font-medium hover:underline focus-visible:underline focus-visible:outline-none">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-gray-700 font-medium hover:underline focus-visible:underline focus-visible:outline-none">
                                    Privacy Policy
                                </Link>
                                .
                            </p>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-full bg-gray-900 py-4 text-sm font-medium text-white
                  shadow-lg shadow-gray-900/30 transition-colors hover:bg-gray-700
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2
                  disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Creating account…' : 'Create Account'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <hr className="border-gray-100" />
                            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-400">or</span>
              </span>
                        </div>

                        {/* Sign In Link */}
                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link
                                href="/sign-in"
                                className="font-semibold text-gray-900 hover:underline focus-visible:outline-none focus-visible:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to pricing */}
                <p className="text-center mt-6 text-xs text-gray-400">
                    <Link href="/" className="hover:text-gray-700 transition-colors focus-visible:underline">
                        ← Back to Pricing
                    </Link>
                </p>
            </div>
        </main>
    )
}