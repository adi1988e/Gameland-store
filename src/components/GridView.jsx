import styled from "styled-components";
import Product from "./Product";
import { useSelector } from "react-redux";

const GridView = () => {
  const { filtered_products } = useSelector((store) => store.filters);
  return (
    <Wrapper>
      <div className="products-container">
        {filtered_products.map((product) => {
          return <Product key={product._id} {...product} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default GridView;
