import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Button from "./SharedComponents/Button";
import { useForm } from "../hooks/useForm";
import {
  addProduct,
  getProductById,
  editProduct,
  getProductsList,
} from "../services/localStorage";
import { context } from "../Context/Store";
import { useNavigate } from "react-router-dom";
import { MdOutlineFileDownloadDone } from "react-icons/md";

const ProductsForm = () => {
  let { setProducts } = useContext(context);

  const navigate = useNavigate();

  const { id } = useParams();
  const [showAlert, setshowAlert] = useState(false);
  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    name: "",
    price: "",
    quantity: "",
    time: "",
    day: "",
  });

  useEffect(() => {
    if (id) {
      const product = getProductById(id);
      setForm(product);
    }
  }, [id]);

  const handleClick = (e) => {
    e.preventDefault();

    inputValues.day = new Date().toLocaleDateString();
    inputValues.time = new Date().toLocaleTimeString();

    id
      ? editProduct(id, inputValues)
      : addProduct({ id: uuidv4(), ...inputValues });
    resetForm();
    setProducts(getProductsList());
    setshowAlert(true);
    setTimeout(() => {
      setshowAlert(false);
    }, 2000);

    navigate("/home");
  };

  return (
    <>
      <form
        className="container mx-auto inputs lg:grid grid-cols-4 mt-36 place-items-end gap-4 pb-6"
        onSubmit={handleClick}
      >
        <div className="w-full">
          <label
            className="block text-md font-bold text-gray-700 mb-1"
            htmlFor="name"
          >
            Name <span className="text-[#ed4141]">*</span>
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none border-[#98A2B3] focus:border-[#26b7cd]"
            type="text"
            id="name"
            name="name"
            required={true}
            placeholder="Enter product name"
            onChange={handleInputChange}
            value={inputValues.name}
          />
        </div>

        <div className="w-full">
          <label
            className="block text-md font-bold text-gray-700 mb-1"
            htmlFor="price"
          >
            Price <span className="text-[#ed4141]">*</span>
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none border-[#98A2B3] focus:border-[#26B7CD]"
            type="number"
            id="price"
            name="price"
            required={true}
            placeholder="Enter price"
            onChange={handleInputChange}
            value={inputValues.price}
          />
        </div>

        <div className="w-full">
          <label
            className="block text-md font-bold text-gray-700 mb-1"
            htmlFor="quantity"
          >
            Quantity <span className="text-[#ed4141]">*</span>
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none border-[#98A2B3] focus:border-[#26B7CD]"
            type="number"
            id="quantity"
            name="quantity"
            required={true}
            placeholder="Enter quantity"
            onChange={handleInputChange}
            value={inputValues.quantity}
          />
        </div>

        <Button
          type="submit"
          className="place-self-start w-8/12 h-11 mt-8"
          task="add"
        >
          Add
        </Button>
      </form>
      {showAlert && (
        <div className="alert w-7/12 text-center border rounded-xl p-4 bg-green-500 bg-opacity-70 ">
          <p className="flex justify-between items-center gap-4 text-white text-xl font-semibold tracking-wide">
            Product added successfully. . .{" "}
            <MdOutlineFileDownloadDone className="text-3xl font-bold" />
          </p>
        </div>
      )}
    </>
  );
};

export default ProductsForm;
