import Link from 'next/link'
import { Check } from 'lucide-react'

export interface PricingCardProps {
    name: string
    features: string[]
    price: number
    currency: string
    description: string
    interval: string
    _id: string;
}

function formatPrice(price: number, currency: string) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: Number.isInteger(price) ? 0 : 2,
    }).format(price)
}

export default function PricingCard({name, price, currency, description, features, interval,}: PricingCardProps) {
    const formattedPrice = formatPrice(price, currency)
    const priceLabel = `/${interval}`

    return (
        <article
            className="flex flex-col rounded-3xl bg-white shadow-xl shadow-black/10 overflow-hidden"
        >
            {/* Card Header */}
            <div
                className="rounded-2xl mx-3 mt-3 px-5 pt-5 pb-8 bg-[#efefef]"
            >
                {/* Tier Badge */}
                <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-800 shadow-sm">
          {name}
        </span>

                {/* Price */}
                <div className="mt-8 mb-1">
                    <p className="text-3xl font-black tracking-tight text-gray-900">
                        {formattedPrice}
                        <span className="text-xl font-medium text-gray-600">{priceLabel}</span>
                    </p>
                </div>
            </div>

            {/* Card Body */}
            <div className="flex flex-col flex-1 px-6 pb-8 pt-5 gap-6">
                {/* Description */}
                <p className="text-gray-700 text-base">{description}</p>

                {/* CTA */}
                <Link
                    href="/"
                    className="block w-full rounded-xl bg-gray-900 py-2 text-center text-sm font-medium text-white
            transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-gray-900 focus-visible:ring-offset-2 shadow-lg shadow-gray-900/30"
                >
                    Subscribe
                </Link>

                {/* Divider */}
                <hr className="border-gray-100" />

                {/* Features */}
                <ul className="flex flex-col gap-3" aria-label={`${name} plan features`}>
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-800 text-sm">
                            <Check
                                size={15}
                                strokeWidth={2.5}
                                className="shrink-0 text-gray-400"
                                aria-hidden="true"
                            />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    )
}
