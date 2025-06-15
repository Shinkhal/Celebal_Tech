import React from "react";
import { Check, Clock, XCircle } from "lucide-react";

function StatusBadge({ status }) {
  const statusMap = {
    Active: {
      icon: <Check className="w-4 h-4 text-green-700" />,
      className: "bg-green-200 text-green-800",
    },
    Pending: {
      icon: <Clock className="w-4 h-4 text-yellow-700" />,
      className: "bg-yellow-200 text-yellow-800",
    },
    Inactive: {
      icon: <XCircle className="w-4 h-4 text-red-700" />,
      className: "bg-red-200 text-red-800",
    },
  };

  const { icon, className } = statusMap[status] || {
    icon: null,
    className: "bg-gray-200 text-gray-800",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
      {icon}
      {status}
    </span>
  );
}

export default StatusBadge;
