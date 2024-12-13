import React, { useEffect, useState } from "react";
// import Papa from 'papaparse';
import { products } from "./utils/products";
import { useFetch } from "./hooks/useFetch";
import { getProductList } from "./repositories/product";
import { ProductList } from "./components/ProductList";

interface Product {
  ProductID: string;
  Name: string;
  Category: string;
  Price: string;
  Stock: string;
  Rating: string;
}

const App: React.FC = () => {
  const { data, error, isLoading } = useFetch(() => getProductList());

  if (isLoading) {
    console.log(data);
  }

  return (
    <div className="App">
      <h1>Product Dashboard</h1>

      {isLoading && <p>Loading data...</p>}
      {!isLoading && data && <ProductList products={data} />}
    </div>
  );
};

export default App;
