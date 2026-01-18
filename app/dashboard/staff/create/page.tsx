'use client';

export default function CreateStaffPage() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-6">
        Create Staff
      </h2>

      <div className="bg-white border rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Full Name"
          className="input"
        />
        <input
          placeholder="Email"
          type="email"
          className="input"
        />
        <input
          placeholder="Mobile"
          className="input"
        />

        <select className="input">
          <option>Staff</option>
        </select>

        <button className="md:col-span-2 bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Create Staff
        </button>
      </div>
    </div>
  );
}
