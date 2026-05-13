"use client";
import PricingCard from '@/component/price-card'
import {usePlans} from "@/hooks/plans-hook";


export default function PricingPage() {
  const {data, error, isFetching} = usePlans()

  return (
      <main className="min-h-screen bg-[#f4f4f4] flex flex-col items-center justify-center px-4 py-24">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-5xl font-black tracking-tight text-gray-900 mb-3">
            Pricing plans
          </h1>
          <p className="text-sm md:text-base text-gray-500">Choose the right plan for your needs.</p>
          {isFetching && <p className="mt-2 text-sm text-gray-400">Loading plans...</p>}
          {error && <p className="mt-2 text-sm text-red-500">Unable to load plans right now.</p>}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 w-full max-w-6xl">
          {data?.data && data?.data?.plans?.map((item) => (
              <PricingCard key={item.name} {...item} />
          ))}

        </div>
      </main>
  )
}
