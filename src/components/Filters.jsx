import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  updateFilters,
  filterProducts,
  clearFilters,
} from "../features/filtersSlice";

const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  return ["all", ...new Set(unique)];
};

const Filters = () => {
  const {
    filters: { text, category, company, min_price, price, max_price },
    all_products,
    categories,
  } = useSelector((store) => store.filters);
  const dispatch = useDispatch();
  const companies = getUniqueValues(all_products, "company");
  let categoriesNames = [];
  categories.forEach((category) => categoriesNames.push(category.name));

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(filterProducts());
  }, [category, company, text, price, dispatch]);

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              onChange={(e) => {
                dispatch(
                  updateFilters({ name: e.target.name, value: e.target.value })
                );
              }}
            />
          </div>
          {/* end of search input */}
          {/* category */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categoriesNames.map((c, index) => {
                return (
                  <button
                    key={index}
                    value={c}
                    onClick={(e) => {
                      dispatch(
                        updateFilters({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      );
                    }}
                    type="button"
                    name="category"
                    className={`${category === c ? "active" : null}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of category */}
          {/* company */}
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              value={company}
              onChange={(e) => {
                dispatch(
                  updateFilters({
                    name: e.target.name,
                    value: e.target.value,
                  })
                );
              }}
              className="company"
            >
              {companies.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of company */}
          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{price}</p>
            <input
              type="range"
              name="price"
              onChange={(e) => {
                dispatch(
                  updateFilters({
                    name: e.target.name,
                    value: e.target.value,
                  })
                );
              }}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          {/* end of price */}
        </form>
        <button
          type="button"
          className="clear-btn"
          onClick={() => {
            dispatch(clearFilters());
          }}
        >
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
