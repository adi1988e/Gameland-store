import styled from "styled-components";
import logo from "../assets/logo_200x200.png";

function Logo() {
  return (
    <StyledLogo>
      <Img src={logo} alt="Logo" />
    </StyledLogo>
  );
}

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 5.6rem;
  width: auto;
`;

export default Logo;
