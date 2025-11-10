import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import ModalForm from "../components/ModalForm";
import { fetchData, createItem, updateItem, deleteItem } from "../api/api";

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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <button
          onClick={() => {
            setEditMode(false);
            setFormData({});
            setShowModal(true);
          }}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Add Transaction
        </button>
      </div>

      <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />

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
    </div>
  );
};

export default Transactions;
