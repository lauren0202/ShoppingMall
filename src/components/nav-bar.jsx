import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../App";
import { NavLink } from "react-router-dom";

// 상단 바 배경색(파스텔톤)
const NavBarWrapper = styled.div`
  width: 100%;
  height: 60px;
  background: #f5f2ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px #e0e0f8a8;
  padding: 0 44px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Brand = styled(NavLink)`
  font-family: 'Montserrat', 'Pretendard', sans-serif;
  font-size: 1.25rem;
  font-weight: 1000;
  color: #6f5cc3cf;
  letter-spacing: 0.5px;
  text-decoration: none;
  &:hover {
    color: #a192e8;
  }
`;

const CartBox = styled(NavLink)`
  font-size: 1.09rem;
  font-weight: 500;
  color: #44475b;
  background: #ece4fd;
  border-radius: 14px;
  padding: 7px 44px ;
  text-decoration: none;
  box-shadow: 0 1px 8px #ded8f88c;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background 0.18s;
  &:hover {
    background: #d8c7ff;
    color: #3d3565;
  }
`;

// 아이콘 없이 텍스트만 보여주지만, 필요하면 이모지나 SVG도 추가 가능
export const NavBar = () => {
  const { cartCount } = useContext(CartContext);

  return (
    <NavBarWrapper>
      <Brand to="/">MINIMUM Store</Brand>
      <CartBox to="/cart">
        Cart&nbsp;
        <span style={{
          display: "inline-block",
          minWidth: 4,
          textAlign: "center",
          fontWeight: 700,
          color: "#785ae7"
        }}>
          {cartCount}
        </span>
      </CartBox>
    </NavBarWrapper>
  );
};