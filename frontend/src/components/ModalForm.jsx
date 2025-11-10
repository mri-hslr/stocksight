import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const ModalForm = ({ title, fields, formData, setFormData, onSubmit, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded-lg">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-3"
        >
          {fields.map(({ name, type, placeholder }) => (
            <input
              key={name}
              type={type}
              placeholder={placeholder}
              value={formData[name] || ""}
              onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-200"
            />
          ))}

          <button
            type="submit"
            className="w-full mt-2 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Save
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ModalForm;
