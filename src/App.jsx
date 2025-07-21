import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from './components/nav-bar'
import { MainComponent } from './components/main-contents.jsx'
import { ItemPage } from './components/item-page.jsx'
import { CartPage } from './components/cart.jsx'

export const CartContext = createContext({});

function App() {
  // 전역 상태
  const [cart, setCart] = useState([]);
  const cartCount = cart.reduce((sum, item) => sum + item.count, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, cartCount }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;