import { useContext } from "react";
import { data } from "../data";
import { CartContext } from "../App";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

// 립, 향수용 파스텔 컬러
const pastelLip = "#fff6f8ff";      // 립 제품: 핑크 파스텔
const pastelPerfume = "#f3fcfdff"; // 향수: 하늘 파스텔

// id가 1, 2, 3이면 립, 아니면 향수
const isLipProduct = (id) => [1, 2, 3].includes(id);

const MainGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 40px 44px;
  background: #faf6ff;
  min-height: 100vh;
  gap: 36px;
`;

const StyledCard = styled.div`
  width: 270px;
  min-height: 410px;
  box-shadow: 0 2px 16px #0001;
  border-radius: 22px;
  padding: 24px 20px 20px 20px;
  background: ${({ $isLip }) => ($isLip ? pastelLip : pastelPerfume)};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform .15s;
  &:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 8px 28px #0002;
  }
`;

const StyledImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: contain;
  border-radius: 18px;
  margin-bottom: 24px;
  background: #fff;
  box-shadow: 0 2px 12px #0001;
`;

const Title = styled.p`
  font-size: 1.12rem;
  font-weight: bold;
  color: #655d5d;
  text-align: center;
  margin-bottom: 8px;
  min-height: 2.2em;
`;

const Price = styled.p`
  font-size: 1.04rem;
  color: #6a737d;
  margin-bottom: 18px;
`;

const AddButton = styled.button`
  background: #ebd6fec8;
  color: #474747;
  font-weight: 500;
  border: none;
  border-radius: 13px;
  padding: 10px 26px;
  font-size: 1rem;
  margin-top: auto;
  box-shadow: 0 2px 10px #0001;
  transition: background .13s;
  cursor: pointer;
  &:hover {
    background: #e4c7ffff;
    color: #2d2d2d;
  }
`;

export const MainComponent = () => {
  return (
    <MainGrid>
      {data.map((cosmetic, id) => (
        <NavLink to={`/item/${id}`} key={id} style={{ textDecoration: "none" }}>
          <ItemCard
            id={cosmetic.id}
            image={cosmetic.image}
            title={cosmetic.name}
            price={cosmetic.price}
          />
        </NavLink>
      ))}
    </MainGrid>
  );
};

const ItemCard = ({ id, image, title, price }) => {
  const { setCart } = useContext(CartContext);
  const isLip = isLipProduct(id);

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
    <StyledCard $isLip={isLip} onClick={e => e.stopPropagation()}>
      <StyledImage src={image} alt={title} />
      <Title>{title}</Title>
      <Price>W {price.toLocaleString()}</Price>
      <AddButton
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          handleAddToCart(id);
        }}
      >
        Add to Cart
      </AddButton>
    </StyledCard>
  );
};