import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartTotals = () => {
  const { totalAmount } = useSelector((store) => store.cart);
  const { isAuthenticated } = useSelector((store) => store.user);

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal :
            <span>{(totalAmount - totalAmount * 0.15).toFixed(2)}</span>
          </h5>
          <p>
            vat :<span>{(totalAmount * 0.15).toFixed(2)}</span>
          </p>
          <hr />
          <h4>
            order total :<span>${totalAmount}</span>
          </h4>
        </article>
        {isAuthenticated ? (
          <Link to="/checkout" className="btn">
            proceed to checkout
          </Link>
        ) : (
          <button className="btn">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
