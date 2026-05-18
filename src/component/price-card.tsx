import { useState } from "react";
import { useGetUserSub } from "@/hooks/subscription.hook";
import { Check, RefreshCwIcon } from "lucide-react";
import moment from "moment";

export interface PricingCardProps {
  name: string;
  features: string[];
  price: number;
  currency: string;
  description: string;
  interval: string;
  _id: string;
  onSubscribe?: (planId: string) => void;
  onCancel?: () => Promise<void> | void;
  isCancelling?: boolean;
  isLoading?: boolean;
}

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: Number.isInteger(price) ? 0 : 2,
  }).format(price);
}

export default function PricingCard({
  name,
  price,
  currency,
  description,
  features,
  interval,
  _id,
  onSubscribe,
  onCancel,
  isLoading = false,
  isCancelling,
}: PricingCardProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const formattedPrice = formatPrice(price, currency);
  const priceLabel = `/${interval}`;

  const { data: userActiveSub } = useGetUserSub();

  const activeSubscription = userActiveSub?.data;
  const isCurrentPlan = activeSubscription?.plan._id === _id;
  const canCancelCurrentPlan = activeSubscription?.cancelAtPeriodEnd;

  const handleConfirmCancel = async () => {
    await onCancel?.();
    setIsConfirmOpen(false);
  };

  return (
    <>
      <article className="flex flex-col rounded-3xl bg-white shadow-xl shadow-black/10 overflow-hidden">
        {/* Card Header */}
        <div className="rounded-2xl mx-3 mt-3 px-5 pt-5 pb-8 bg-[#efefef]">
          {/* Tier Badge */}
          <div className=" flex justify-between items-center">
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-800 shadow-sm">
              {name}
            </span>

            {isCurrentPlan && (
              <p className=" bg-green-100 text-green-700 px-2 py-[0.3rem] font-semibold text-xs rounded-full">
                Active Plan
              </p>
            )}
          </div>

          {/* Price */}
          <div className="mt-8 mb-1 flex justify-between">
            <p className="text-lg font-black tracking-tight text-gray-900">
              {formattedPrice}
              <span className="text-base font-medium text-gray-600 flex justify-between items-center">
                {priceLabel}
              </span>
            </p>

            {isCurrentPlan && (
              <div className=" flex gap-3 items-center">
                {canCancelCurrentPlan ?
                  <p className="font-semibold text-sm text-gray-800">Ends:</p>
                : <RefreshCwIcon color="#000" strokeWidth={2.7} size={15} />}

                <p className=" text-gray-600 font-semibold text-sm">
                  {moment(activeSubscription?.currentPeriodEnd).format(
                    "YYYY-MM-DD",
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1 px-6 pb-8 pt-5 gap-6">
          {/* Description */}
          <p className="text-gray-700 text-sm font-medium max-w-65">
            {description}
          </p>

          {/* CTA */}
          {!canCancelCurrentPlan && isCurrentPlan ?
            <button
              type="button"
              disabled={isCancelling}
              onClick={() => setIsConfirmOpen(true)}
              className="block w-full rounded-xl bg-red-700 py-2 text-center text-sm font-medium text-white
            transition-colors hover:bg-red-400 focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-gray-900 focus-visible:ring-offset-2 shadow-lg shadow-gray-900/30
            disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCancelling ? "Cancelling..." : "Cancel Subscription"}
            </button>
          : <button
              type="button"
              disabled={isLoading}
              onClick={() => onSubscribe?.(_id)}
              className="block w-full rounded-xl bg-gray-900 py-2 text-center text-sm font-medium text-white
            transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-gray-900 focus-visible:ring-offset-2 shadow-lg shadow-gray-900/30
            disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Redirecting..." : "Subscribe"}
            </button>
          }

          {/* Divider */}
          <hr className="border-gray-100" />

          {/* Features */}
          <ul
            className="flex flex-col gap-3"
            aria-label={`${name} plan features`}
          >
            {features.map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-gray-800 text-sm"
              >
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

      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
                Confirm Cancellation
              </p>
              <h3 className="text-2xl font-black tracking-tight text-gray-900">
                Cancel {name} plan?
              </h3>
              <p className="text-sm leading-6 text-gray-600">
                Your subscription will be cancelled for renewal. You will keep
                access until the end of the current billing period.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                disabled={isCancelling}
                onClick={() => setIsConfirmOpen(false)}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Keep Plan
              </button>
              <button
                type="button"
                disabled={isCancelling}
                onClick={handleConfirmCancel}
                className="flex-1 rounded-xl bg-red-700 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
