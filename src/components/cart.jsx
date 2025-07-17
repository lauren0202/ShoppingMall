import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../App";
import { data } from "../data";
import { NavLink } from "react-router-dom";

// 카드와 파스텔톤 일관성 유지
const pastelLip = "#fff6f8ff";
const pastelPerfume = "#f3fcfdff";
const isLipProduct = (id) => [1, 2, 3].includes(id);

const CartWrapper = styled.div`
  min-height: 90vh;
  width: 100%;
  background: #faf6ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0 64px 0;
`;

const CartList = styled.div`
  width: 95vw;
  max-width: 700px;
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 4px 24px #ddd5f1aa;
  padding: 38px 34px 34px 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyText = styled.div`
  font-size: 1.18rem;
  color: #b1a8ce;
  margin: 70px 0 60px 0;
`;

const CartItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: ${({ $isLip }) => ($isLip ? pastelLip : pastelPerfume)};
  border-radius: 18px;
  box-shadow: 0 1px 8px #eee6ffcc;
  margin-bottom: 26px;
  padding: 20px 22px;
  gap: 22px;
  transition: box-shadow .13s;
  &:hover {
    box-shadow: 0 4px 20px #e2e1ff88;
  }
`;

const ItemImg = styled.img`
  width: 75px;
  height: 75px;
  object-fit: contain;
  border-radius: 12px;
  background: #fff;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.p`
  font-size: 1.06rem;
  font-weight: bold;
  color: #5a5a7b;
  margin-bottom: 7px;
`;

const ItemPrice = styled.p`
  font-size: 0.98rem;
  color: #7c7990;
`;

const QtyBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 9px;
`;

const QtyButton = styled.button`
  background: #ece4fd;
  color: #775ae7;
  border: none;
  border-radius: 7px;
  font-size: 1.15rem;
  font-weight: bold;
  width: 28px;
  height: 28px;
  cursor: pointer;
  &:hover {
    background: #d8c7ff;
  }
`;

const RemoveButton = styled.button`
  background: #ffe4ec;
  color: #f14c8a;
  border: none;
  border-radius: 10px;
  font-size: 0.92rem;
  padding: 8px 12px;
  margin-left: 14px;
  cursor: pointer;
  &:hover {
    background: #ffbad4;
    color: #ae1853;
  }
`;

const TotalBox = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 20px;
  font-size: 1.16rem;
  font-weight: bold;
  color: #7b68d0;
`;

const BackLink = styled(NavLink)`
  display: inline-block;
  margin: 28px 0 0 0;
  color: #7e75b2;
  font-size: 1.01rem;
  text-decoration: underline;
  &:hover {
    color: #4e4494;
  }
`;

export const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);

  // cart: [{id, count}]
const handleQty = (id, delta) => {
  setCart(prev =>
    prev
      .map(item => item.id === id
        ? { ...item, count: Math.max(1, item.count + delta) }
        : item
      )
  );
};

const handleRemove = (id) => {
  setCart(prev => prev.filter(item => item.id !== id));
};

  const cartItems = cart
    .map(item => {
      const prod = data.find(d => d.id === item.id);
      return prod ? { ...prod, count: item.count } : null;
    })
    .filter(Boolean);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <CartWrapper>
      <CartList>
        {cartItems.length === 0 ? (
          <EmptyText>장바구니가 비었습니다 🛒</EmptyText>
        ) : (
          cartItems.map(item => (
            <CartItem key={item.id} $isLip={isLipProduct(item.id)}>
              <ItemImg src={item.image} alt={item.name} />
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>W {item.price.toLocaleString()}</ItemPrice>
                <QtyBox>
                  <QtyButton onClick={() => handleQty(item.id, -1)}>-</QtyButton>
                  <span>{item.count}</span>
                  <QtyButton onClick={() => handleQty(item.id, +1)}>+</QtyButton>
                  <RemoveButton onClick={() => handleRemove(item.id)}>
                    삭제
                  </RemoveButton>
                </QtyBox>
              </ItemInfo>
            </CartItem>
          ))
        )}
        {cartItems.length > 0 && (
          <TotalBox>
            총 합계: W {total.toLocaleString()}
          </TotalBox>
        )}
        <BackLink to="/">← 쇼핑 계속하기</BackLink>
      </CartList>
    </CartWrapper>
  );
};
