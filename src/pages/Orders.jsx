import { PageHero } from "../components";
import { useSelector } from "react-redux";
import styled from "styled-components";

function Orders() {
  const { user } = useSelector((store) => store.user);
  const orders = user.orders;

  return (
    <main>
      <PageHero title="orders" />
      <Wrapper className="page">
        <div>
          <h5>Your orders:</h5>
          {orders.map((order) => {
            return <h5 key={order._id}>{order._id}</h5>;
          })}
        </div>
      </Wrapper>
    </main>
  );
}
const Wrapper = styled.div`
  display: flex;
  margin-top: 3rem;
  //   align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default Orders;
