import React, { useContext, useEffect } from "react";
import ProductsForm from "./ProductsForm";
import ProductsList from "./ProductsList";
import Navbar from "./Navbar";
// import { context } from "../Context/Store";
// import { cleanup } from "@testing-library/react";

const Home = () => {


  return (
    <div >
      <Navbar />
      <ProductsForm />
      <ProductsList />
    </div>
  );
};

export default Home;
