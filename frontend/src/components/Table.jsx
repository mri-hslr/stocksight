import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const Table = ({ data, onEdit, onDelete }) => {
  if (!data?.length)
    return (
      <div className="text-center py-10 text-gray-500">No records found.</div>
    );

  const headers = Object.keys(data[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-auto border rounded-xl bg-white shadow-sm"
    >
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-4 py-2 text-sm font-semibold text-gray-600 uppercase"
              >
                {h}
              </th>
            ))}
            <th className="px-4 py-2 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              {headers.map((key) => (
                <td key={key} className="px-4 py-2 text-sm text-gray-800">
                  {String(row[key])}
                </td>
              ))}
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => onEdit(row)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  <Edit2 className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={() => onDelete(row.id)}
                  className="p-2 bg-red-100 hover:bg-red-200 rounded-lg"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Table;
