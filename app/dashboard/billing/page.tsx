'use client';

export default function BillingPage() {
  const plan = {
    name: 'Professional',
    price: '₹2,999 / month',
    validTill: '31 Mar 2026',
    status: 'Active',
    aiQueriesUsed: 120,
    aiQueryLimit: 500,
    documentsUsed: 18,
    documentLimit: 50
  };

  return (
    <div className="p-6 space-y-6">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Billing & Subscription</h1>
        <p className="text-sm text-slate-500">
          Manage your subscription, limits and invoices
        </p>
      </div>

      {/* CURRENT PLAN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* PLAN CARD */}
        <div className="bg-white border rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-800">
              Current Plan
            </h2>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
              {plan.status}
            </span>
          </div>

          <div>
            <p className="text-2xl font-bold text-indigo-600">{plan.name}</p>
            <p className="text-sm text-slate-500">{plan.price}</p>
          </div>

          <div className="text-sm text-slate-600">
            Valid till: <span className="font-medium">{plan.validTill}</span>
          </div>

          <button className="w-full mt-4 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
            Upgrade Plan
          </button>
        </div>

        {/* USAGE */}
        <div className="bg-white border rounded-lg p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-800">
            Usage Summary
          </h2>

          <UsageItem
            label="AI Queries"
            used={plan.aiQueriesUsed}
            limit={plan.aiQueryLimit}
          />

          <UsageItem
            label="Documents Uploaded"
            used={plan.documentsUsed}
            limit={plan.documentLimit}
          />
        </div>

        {/* VALIDITY */}
        <div className="bg-white border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Subscription Status
          </h2>

          <div className="text-sm text-slate-600">
            Your subscription is currently <strong>active</strong>.
          </div>

          <div className="text-sm text-slate-600">
            Renewal date: <strong>{plan.validTill}</strong>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-800">
            Please ensure timely renewal to avoid service interruption.
          </div>
        </div>
      </div>

      {/* INVOICES */}
      <div className="bg-white border rounded-lg">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-slate-800">
            Invoice History
          </h2>
        </div>

        <div className="p-6 text-sm text-slate-500">
          No invoices generated yet.
        </div>
      </div>
    </div>
  );
}

/* -------- Components -------- */

const UsageItem = ({
  label,
  used,
  limit
}: {
  label: string;
  used: number;
  limit: number;
}) => {
  const percent = Math.min((used / limit) * 100, 100);

  return (
    <div>
      <div className="flex justify-between text-sm text-slate-600 mb-1">
        <span>{label}</span>
        <span>{used} / {limit}</span>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
