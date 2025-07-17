import React, { useContext } from "react";
import { data } from "../data";
import { useParams, NavLink } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../App";

// 메인과 동일한 파스텔톤
const pastelLip = "#fff6f8ff";
const pastelPerfume = "#f3fcfdff";
const isLipProduct = (id) => [1, 2, 3].includes(id);

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: ${({ $isLip }) => ($isLip ? pastelLip : pastelPerfume)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DetailCard = styled.div`
  width: 370px;
  min-height: 560px;
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 6px 32px #0002;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 42px 32px 28px 32px;
  margin-top: 70px;
  margin-bottom: 60px;
`;

const StyledImage = styled.img`
  width: 210px;
  height: 210px;
  object-fit: contain;
  border-radius: 20px;
  box-shadow: 0 2px 12px #0001;
  background: #ffffffff;
  margin-bottom: 36px;
`;

const Title = styled.h1`
  font-size: 1.35rem;
  color: #524757;
  margin-bottom: 14px;
  text-align: center;
`;

const Price = styled.p`
  font-size: 1.13rem;
  color: #6a737d;
  margin-bottom: 24px;
`;

const AddButton = styled.button`
  background: #ebd6fec8;
  color: #474747;
  font-weight: 500;
  border: none;
  border-radius: 13px;
  padding: 13px 38px;
  font-size: 1.07rem;
  margin-top: 28px;
  box-shadow: 0 2px 10px #0001;
  transition: background .13s;
  cursor: pointer;
  &:hover {
    background: #e4c7ffff;
    color: #2d2d2d;
  }
`;

const BackLink = styled(NavLink)`
  margin-top: 32px;
  color: #7e75b2;
  font-size: 1.02rem;
  text-decoration: underline;
  &:hover {
    color: #4e4494;
  }
`;

export const ItemPage = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  const currentItem = data[id];
  const { cart, setCart } = useContext(CartContext);

  // 예외처리: 없는 id 입력시
  if (!currentItem) return <PageWrapper>존재하지 않는 상품입니다.</PageWrapper>;

  const isLip = isLipProduct(currentItem.id);

const handleAddToCart = (id) => {
  setCart(prev => {
    const idx = prev.findIndex(item => item.id === id);
    if (idx > -1) {
      // 이미 있는 상품: count만 1 증가
      return prev.map(item =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      );
    } else {
      // 새 상품: count 1로 추가
      return [...prev, { id, count: 1 }];
    }
  });
};

  return (
    <PageWrapper $isLip={isLip}>
      <DetailCard>
        <StyledImage src={currentItem.image} alt={currentItem.name} />
        <Title>{currentItem.name}</Title>
        <Price>W {currentItem.price.toLocaleString()}</Price>
        <AddButton
          onClick={() => {
            setCartCount(prev => prev + 1);
            handleAddToCart(id);
          }}
        >
          Add to Cart
        </AddButton>
        <BackLink to="/">← 목록으로 돌아가기</BackLink>
      </DetailCard>
    </PageWrapper>
  );
};