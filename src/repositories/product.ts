import { products } from "../utils/products";
import { Product } from "../utils/types";

export const getProductList = async () => {
  return new Promise<Product[]>((resolve, reject) => {
    setTimeout(() => {
      const productIds = new Set();

      const sanitized = products
        .filter(({ ProductID, Name, Category, Price, Stock, Rating }) => {
          if (productIds.has(ProductID)) {
            return false;
          }

          if (
            !(
              typeof Name === "string" &&
              typeof Category === "string" &&
              typeof Price === "number" &&
              typeof Stock === "number" &&
              typeof Rating === "number"
            )
          ) {
            return false;
          }

          productIds.add(ProductID);

          return true;
        })
        .map(
          ({ Stock, Rating, ...rest }) =>
            ({
              Stock: Math.max(0, Stock as number),
              Rating: Math.min(Math.max(0, Rating as number), 5),
              ...rest,
            } as Product)
        );

      console.log(sanitized);

      resolve(sanitized);
    }, 500 + Math.random() * 1000);
  });
};
