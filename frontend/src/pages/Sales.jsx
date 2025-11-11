import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import ModalForm from "../components/ModalForm";
import { fetchData, createItem, updateItem, deleteItem } from "../api/api";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

const Sales = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);

  const fields = [
    { name: "product_id", type: "number", placeholder: "Product ID" },
    { name: "quantity", type: "number", placeholder: "Quantity" },
    { name: "price", type: "number", placeholder: "Price" },
    { name: "reorder_level", type: "number", placeholder: "Reorder Level" },
    { name: "date", type: "date", placeholder: "Date" },
  ];

  const load = async () => {
    const res = await fetchData("sales");
    setData(res.Sales || []);
  };

  const handleSubmit = async () => {
    if (editMode) {
      await updateItem("sales", editId, formData);
    } else {
      await createItem("sales", { id: Date.now(), ...formData });
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
    if (confirm("Delete this sale?")) {
      await deleteItem("sales", id);
      load();
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen rounded-2xl"
    >
      {/* ===== Page Header ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Sales
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track and manage all your sales records efficiently.
          </p>
        </div>

        <button
          onClick={() => {
            setEditMode(false);
            setFormData({});
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-xl hover:bg-green-700 active:scale-[0.98] transition-all shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          Add Sale
        </button>
      </div>

      {/* ===== Table Section ===== */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-4 transition-all">
        <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {/* ===== Modal ===== */}
      {showModal && (
        <ModalForm
          title={editMode ? "Edit Sale" : "Add Sale"}
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

export default Sales;
