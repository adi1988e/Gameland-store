import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { items } = useSelector((store) => store.cart);
  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        {items.length === 0 ? (
          <div className="empty">
            <h2>Your cart is empty</h2>
            <Link to="/products" className="btn">
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
