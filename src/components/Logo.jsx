import styled from "styled-components";
import logo3 from "../assets/logo3.png";

function Logo() {
  return (
    <StyledLogo>
      <Img src={logo3} alt="Logo" />
    </StyledLogo>
  );
}

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 5.4rem;
  width: auto;
`;

export default Logo;
