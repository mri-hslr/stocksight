import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import ModalForm from "../components/ModalForm";
import { fetchData, createItem, updateItem, deleteItem } from "../api/api";
import { motion } from "framer-motion";
import { Receipt } from "lucide-react";

const Transactions = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);

  const fields = [
    { name: "product_id", type: "number", placeholder: "Product ID" },
    { name: "sales_id", type: "number", placeholder: "Sales ID" },
    { name: "date", type: "date", placeholder: "Date" },
  ];

  const load = async () => {
    const res = await fetchData("transactions");
    setData(res.transactions || []);
  };

  const handleSubmit = async () => {
    if (editMode) {
      await updateItem("transactions", editId, formData);
    } else {
      await createItem("transactions", { id: Date.now(), ...formData });
    }
    setShowModal(false);
    setFormData({});
    load();
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditId(item.id);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this transaction?")) {
      await deleteItem("transactions", id);
      load();
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen rounded-2xl"
    >
      {/* ===== Page Header ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-xl">
            <Receipt className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Transactions
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              View and manage product transaction history.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditMode(false);
            setFormData({});
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2.5 rounded-xl hover:bg-amber-700 active:scale-[0.98] transition-all shadow-sm"
        >
          <Receipt className="w-4 h-4" />
          Add Transaction
        </button>
      </div>

      {/* ===== Table Section ===== */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-4 transition-all">
        <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {/* ===== Modal Section ===== */}
      {showModal && (
        <ModalForm
          title={editMode ? "Edit Transaction" : "Add Transaction"}
          fields={fields}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </motion.div>
  );
};

export default Transactions;
