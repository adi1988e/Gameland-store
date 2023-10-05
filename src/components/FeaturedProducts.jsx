import styled from "styled-components";
import Product from "./Product";
import { useSelector } from "react-redux";
const FeaturedProducts = () => {
  const { products } = useSelector((store) => store.products);
  return (
    <Wrapper className="section">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>{" "}
      </div>
      <div className="section-center featured">
        {products
          .filter((product) => product.featured === true)
          .slice(0, 3)
          .map((product) => {
            return <Product key={product._id} {...product} />;
          })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
