import React from "react";
import Button from "./SharedComponents/Button";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProductsList } from "../services/localStorage";

const ProductItem = ({ product, setProducts }) => {
  const { id, name, price, quantity, time, day } = product;
  const navigate = useNavigate();

  const removeProduct = () => {
    deleteProduct(id);
    setProducts(getProductsList()); 
  };

  return (
    <>
      <tr className=" w-full grid grid-cols-6 px-10">
        <td className="pl-2 py-2 my-2">{name}</td>
        <td className="pl-2 py-2 my-2">{price} <span className="font-semibold">$</span></td>
        <td className="pl-2 py-2 my-2">{quantity} - <span className="font-semibold">(Pieces)</span> </td>
        <td className="pl-2 py-2 my-2">{time}</td>
        <td className="pl-2 py-2 my-2">{day}</td>
        <td className="pl-2 py-2 ">
          <Button
            className="mx-2 "
            task="edit"
            onClick={() => navigate(`/home/${id}`)}
          >
            Edit
          </Button>
          <Button task="delete" onClick={() => removeProduct()}>
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};

export default ProductItem;
