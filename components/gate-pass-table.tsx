"use client";

import React from "react";

// Helper function to render status badges
function getStatusBadge(status: string) {
  const statusClass =
    status === "approved"
      ? "bg-green-500 text-white"
      : status === "pending"
      ? "bg-yellow-500 text-black"
      : "bg-red-500 text-white";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClass}`}
    >
      {status}
    </span>
  );
}

export function GatePassTable({ passes }: { passes: any[] }) {
  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {passes.map((pass) => (
          <tr key={pass.id}>
            <td className="border border-gray-300 px-4 py-2">{pass.name}</td>
            <td className="border border-gray-300 px-4 py-2">{getStatusBadge(pass.status)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
