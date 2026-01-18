export default function UserDashboard() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold text-slate-900">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {[
          { title: 'AI Queries', value: '1,248' },
          { title: 'Documents', value: '42' },
          { title: 'Staff', value: '6' },
          { title: 'Plan', value: 'Pro' },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white border border-slate-200 rounded-lg p-5"
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

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          AI Assistant
        </h2>
        <p className="text-sm text-slate-600">
          Ask questions from Income Tax, GST, Company Law & your uploaded documents.
        </p>
      </div>

    </div>
  );
}
