import React, { useEffect, useContext, useRef } from "react";
import ProductItem from "./ProductItem";
import { getProductsList } from "../services/localStorage";
import { context } from "../Context/Store";
import { useReactToPrint } from "react-to-print";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FaRegFilePdf } from "react-icons/fa6";
import { RiFileExcel2Line } from "react-icons/ri";
import Button from "./SharedComponents/Button";

const ProductsList = () => {
  let { products, setProducts } = useContext(context);
  const fileExport = useRef();

  const generatePDF = useReactToPrint({
    content: () => fileExport.current,
    documentTitle: "Products Data",
  });

  useEffect(() => {
    setProducts(getProductsList());
  }, []);

  return (
    <>
      {products.length > 0 ? (
        <div className="mt-32">
          <div className="max-w-full mx-auto gap-3 flex justify-center items-center py-8 ">
            <div className=" max-w-2/12">
              <Button
                task="export"
                className=" gap-3 flex justify-center items-center"
                onClick={generatePDF}
              >
                Export as PDF <FaRegFilePdf />
              </Button>
            </div>
            <div className="max-w-2/12">
              <DownloadTableExcel
                filename="Products Data"
                sheet="Products"
                currentTableRef={fileExport.current}
              >
                <Button
                  task="export"
                  className=" gap-3 flex justify-center items-center"
                >
                  Export to Excel <RiFileExcel2Line />
                </Button>
              </DownloadTableExcel>
            </div>
          </div>
          <table
            ref={fileExport}
            className="bg-[#26B7CD] bg-opacity-10 w-10/12 mx-auto mt-4 mb-8 rounded-3xl shadow-md"
          >
            <thead>
              <tr className="w-full bg-[#26B7CD] bg-opacity-5 grid grid-cols-6 rounded-t-3xl px-10">
                <td className=" pl-2 py-2 font-semibold text-lg">Name</td>
                <td className=" pl-2 py-2 font-semibold text-lg">Price</td>
                <td className=" pl-2 py-2 font-semibold text-lg">Quantity</td>
                <td className=" pl-2 py-2 font-semibold text-lg">
                  Last Update Time
                </td>
                <td className=" pl-2 py-2 font-semibold text-lg">
                  Last Update Day
                </td>
                <td className=" pl-2 py-2 font-semibold text-lg">Actions</td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  setProducts={setProducts}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="w-10/12 mx-auto text-center font-semibold text-6xl mt-24">
          No Products
        </h1>
      )}
    </>
  );
};

export default ProductsList;
