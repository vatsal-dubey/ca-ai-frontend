export default function AdminDashboard() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold text-slate-900">
        Admin Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {[
          { title: 'Total Users', value: '124' },
          { title: 'Active Firms', value: '38' },
          { title: 'Monthly Revenue', value: '₹82,000' },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white border border-blue-100 rounded-xl p-5"
          >
            <p className="text-sm text-slate-500">
              {card.title}
            </p>
            <p className="text-2xl font-semibold text-blue-900 mt-1">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-blue-100 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          System Status
        </h2>
        <p className="text-sm text-slate-600">
          All services operational.
        </p>
      </div>

    </div>
  );
}
