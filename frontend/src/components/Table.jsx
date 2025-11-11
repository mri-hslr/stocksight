import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const Table = ({ data, onEdit, onDelete }) => {
  if (!data?.length)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 text-gray-500 dark:text-gray-400"
      >
        No records found.
      </motion.div>
    );

  const headers = Object.keys(data[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 shadow-sm"
    >
      <table className="w-full border-collapse">
        {/* ===== Table Header ===== */}
        <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-700">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="px-5 py-3 text-left font-semibold first:rounded-tl-2xl last:rounded-tr-2xl"
              >
                {h.replace(/_/g, " ")}
              </th>
            ))}
            <th className="px-5 py-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>

        {/* ===== Table Body ===== */}
        <tbody>
          {data.map((row, rowIndex) => (
            <motion.tr
              key={row.id || rowIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: rowIndex * 0.05 }}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-all"
            >
              {headers.map((key) => (
                <td
                  key={key}
                  className="px-5 py-3 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap max-w-xs truncate"
                  title={String(row[key])}
                >
                  {String(row[key])}
                </td>
              ))}
              <td className="px-5 py-3 flex items-center gap-2">
                <button
                  onClick={() => onEdit(row)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </button>
                <button
                  onClick={() => onDelete(row.id)}
                  className="p-2 rounded-lg bg-red-100/60 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-800/60 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Table;