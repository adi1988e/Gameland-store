import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../features/productsSlice";
import { Loading, Error, AddToCart, Stars, PageHero } from "../components";

const SingleProductPage = () => {
  const { id } = useParams();
  const singleProductUrl =
    import.meta.env.VITE_SERVER_URL + `/products/products/${id}`;
  const dispatch = useDispatch();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
  } = useSelector((store) => store.products);

  useEffect(() => {
    dispatch(getSingleProduct(singleProductUrl));
    // eslint-disable-next-line
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const {
    product_name,
    product_price,
    product_description,
    stock,
    stars,
    reviews,
    _id: sku,
    company,
    product_image,
  } = product;

  return (
    <Wrapper>
      <PageHero title={product_name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <img className="img" src={product_image} alt="product-image" />
          <section className="content">
            <h2>{product_name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">${product_price}</h5>
            <p className="desc">{product_description}</p>
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? "In stock" : "out of stock"}
            </p>
            <p className="info">
              <span>SKU :</span>
              {sku}
            </p>
            <p className="info">
              <span>Brand :</span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .img {
    width: 500px;
  }
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
