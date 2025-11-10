import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import ModalForm from "../components/ModalForm";
import { fetchData, createItem, updateItem, deleteItem } from "../api/api";

const Suppliers = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);

  const fields = [
    { name: "name", type: "text", placeholder: "Supplier Name" },
    { name: "contact", type: "number", placeholder: "Contact Number" },
    { name: "lead_time_days", type: "number", placeholder: "Lead Time (Days)" },
  ];

  const load = async () => {
    const res = await fetchData("suppliers");
    setData(res.suppliers || []);
  };

  const handleSubmit = async () => {
    if (editMode) {
      await updateItem("suppliers", editId, formData);
    } else {
      await createItem("suppliers", { id: Date.now(), ...formData });
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
    if (confirm("Delete this supplier?")) {
      await deleteItem("suppliers", id);
      load();
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Suppliers</h2>
        <button
          onClick={() => {
            setEditMode(false);
            setFormData({});
            setShowModal(true);
          }}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Add Supplier
        </button>
      </div>

      <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />

      {showModal && (
        <ModalForm
          title={editMode ? "Edit Supplier" : "Add Supplier"}
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

export default Suppliers;
