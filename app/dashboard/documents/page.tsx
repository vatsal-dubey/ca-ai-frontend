'use client';

import { useEffect, useState } from 'react';
// import api from '@/lib/axios';

interface Document {
  id: number;
  file_name: string;
  vector_status: 'pending' | 'processed' | 'failed';
  created_at: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchDocuments = async () => {
    const res = await api.get('/documents');
    setDocuments(res.data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('document', file);

    try {
      setUploading(true);
      await api.post('/documents/upload', formData);
      setFile(null);
      fetchDocuments();
    } finally {
      setUploading(false);
    }
  };

  const stats = {
    total: documents.length,
    processed: documents.filter(d => d.vector_status === 'processed').length,
    pending: documents.filter(d => d.vector_status === 'pending').length,
    failed: documents.filter(d => d.vector_status === 'failed').length
  };

  return (
    <div className="p-6 space-y-6">

      {/* PAGE HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Knowledge Base Documents
          </h1>
          <p className="text-sm text-slate-500">
            Documents used by AI for answering your queries
          </p>
        </div>

        <label className="cursor-pointer">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            hidden
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <span className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
            + Upload Document
          </span>
        </label>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Documents" value={stats.total} />
        <StatCard label="Processed" value={stats.processed} />
        <StatCard label="Pending" value={stats.pending} />
        <StatCard label="Failed" value={stats.failed} />
      </div>

      {/* DOCUMENT TABLE */}
      <div className="bg-white rounded-lg shadow border">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-4 py-3">Document Name</th>
              <th>Status</th>
              <th>Uploaded On</th>
            </tr>
          </thead>
          <tbody>
            {documents.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-slate-500">
                  No documents uploaded yet
                </td>
              </tr>
            )}

            {documents.map(doc => (
              <tr key={doc.id} className="border-t">
                <td className="px-4 py-3">{doc.file_name}</td>
                <td>
                  <StatusBadge status={doc.vector_status} />
                </td>
                <td>
                  {new Date(doc.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* UPLOAD CONFIRM */}
      {file && (
        <div className="fixed bottom-6 right-6 bg-white border shadow-lg rounded-lg p-4 flex items-center gap-4">
          <span className="text-sm">{file.name}</span>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-3 py-1 rounded bg-emerald-600 text-white text-sm"
          >
            {uploading ? 'Uploading...' : 'Confirm Upload'}
          </button>
        </div>
      )}
    </div>
  );
}

/* --- Components --- */

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-white border rounded-lg p-4">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="text-2xl font-semibold text-slate-800">{value}</p>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const colors: any = {
    processed: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status.toUpperCase()}
    </span>
  );
};
