import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProducts } from "../features/filtersSlice";
import { filterProducts, sortProducts } from "../features/filtersSlice";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { products } = useSelector((store) => store.products);
  const { filtered_products, grid_view, sort, filters } = useSelector(
    (store) => store.filters
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProducts(products));
  }, [products, dispatch]);
  useEffect(() => {
    dispatch(filterProducts());
    dispatch(sortProducts());
  }, [sort, filters, dispatch]);

  if (filtered_products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search.
      </h5>
    );
  }
  if (grid_view === false) {
    return <ListView />;
  }
  return <GridView />;
};

export default ProductList;
