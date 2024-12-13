import React, { useMemo, useState } from "react";
import { Product } from "../utils/types";

interface ProductListProps {
  products: Product[];
}

enum SorterState {
  OFF,
  ASC,
  DESC,
}

interface SorterProps {
  initialState?: SorterState;
  onChange: (state: SorterState) => void;
}

const Sorter: React.FC<SorterProps> = ({
  initialState = SorterState.OFF,
  onChange,
}) => {
  const [state, setState] = useState(initialState);

  const symbolMap = {
    [SorterState.OFF]: "x",
    [SorterState.ASC]: "↑",
    [SorterState.DESC]: "↓",
  };

  const nextStateMap = {
    [SorterState.OFF]: SorterState.ASC,
    [SorterState.ASC]: SorterState.DESC,
    [SorterState.DESC]: SorterState.OFF,
  };

  return (
    <span
      onClick={() => {
        setState(nextStateMap[state]);
        onChange(nextStateMap[state]);
      }}
    >
      {symbolMap[state]}
    </span>
  );
};

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [sorters, setSorters] = useState<Record<string, SorterState>>({
    price: SorterState.OFF,
    stock: SorterState.ASC,
    rating: SorterState.DESC,
  });

  const handleSorterChange = (key: string, state: SorterState) => {
    setSorters((previous) => ({
      ...previous,
      [key]: state,
    }));
  };

  const sorted = useMemo(() => {
    const sortProducts = [...products];

    const sortFieldMap = {
      price: (a: Product, b: Product) => a.Price - b.Price,
      stock: (a: Product, b: Product) => a.Stock - b.Stock,
      rating: (a: Product, b: Product) => a.Rating - b.Rating,
    };

    Object.entries(sorters).forEach(([key, state]) => {
      if (state === SorterState.OFF) return;

      const sortFunction = sortFieldMap[key as keyof typeof sortFieldMap];
      if (state === SorterState.ASC) {
        sortProducts.sort(sortFunction);
      } else if (state === SorterState.DESC) {
        sortProducts.sort((a, b) => -1 * sortFunction(a, b));
      }
    });

    return sortProducts;
  }, [sorters, products]);

  return (
    <table>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>
            <span>Price</span>
            <Sorter
              initialState={sorters["price"]}
              onChange={(state) => {
                handleSorterChange("price", state);
              }}
            />
          </th>
          <th>
            <span>Stock</span>
            <Sorter
              initialState={sorters["stock"]}
              onChange={(state) => {
                handleSorterChange("stock", state);
              }}
            />
          </th>
          <th>
            <span>Rating</span>
            <Sorter
              initialState={sorters["rating"]}
              onChange={(state) => {
                handleSorterChange("rating", state);
              }}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {sorted.map(({ ProductID, Name, Category, Price, Stock, Rating }) => (
          <tr key={ProductID}>
            <td>{ProductID}</td>
            <td>{Name}</td>
            <td>{Category}</td>
            <td>{Price}</td>
            <td>{Stock}</td>
            <td>{Rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
