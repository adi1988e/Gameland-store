import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import closeSideBar from "../features/productsSlice";
import { logoutUser } from "../features/userSlice";
import { useCookies } from "react-cookie";

const CartButtons = () => {
  const [cookies] = useCookies(["token"]);
  const { isAuthenticated } = useSelector((store) => store.user);
  const { totalQuantity } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  return (
    <Wrapper className="cart-btn-wrapper">
      <Button type="button" className="cart-btn">
        <Link to="/cart" onClick={closeSideBar}>
          Cart <FaShoppingCart />
        </Link>
        <span className="cart-container">
          <span className="cart-value">{totalQuantity}</span>
        </span>
      </Button>

      {isAuthenticated ? (
        <button
          type="button"
          className="auth-btn"
          onClick={() => {
            dispatch(logoutUser(cookies.token));
          }}
        >
          Logout <FaUserMinus />
        </button>
      ) : (
        <button type="button" className="auth-btn">
          <Link to="/login" className="cart-btn" onClick={closeSideBar}>
            Login <FaUserPlus />
          </Link>
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -25px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;

const Button = styled.button`
  display: flex;
  margin-right: 15px;
  font-size: 1.5rem;
  color: var(--clr-grey-1);

  border: none;
  background: transparent;
`;
export default CartButtons;
