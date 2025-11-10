import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import ModalForm from "../components/ModalForm";
import { fetchData, createItem, updateItem, deleteItem } from "../api/api";

const Products = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);

  const fields = [
    { name: "name", type: "text", placeholder: "Product Name" },
    { name: "category", type: "text", placeholder: "Category" },
    { name: "price", type: "number", placeholder: "Price" },
    { name: "quantity", type: "number", placeholder: "Quantity" },
    { name: "stock", type: "number", placeholder: "Stock" },
  ];

  const load = async () => {
    const res = await fetchData("products");
    setData(res.products || []);
  };

  const handleSubmit = async () => {
    if (editMode) {
      await updateItem("products", editId, formData);
    } else {
      await createItem("add_products", {
        id: Date.now(),
        ...formData,
      });
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
    if (confirm("Delete this product?")) {
      await deleteItem("products", id);
      load();
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <button
          onClick={() => {
            setEditMode(false);
            setFormData({});
            setShowModal(true);
          }}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Add Product
        </button>
      </div>

      <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />

      {showModal && (
        <ModalForm
          title={editMode ? "Edit Product" : "Add Product"}
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

export default Products;
