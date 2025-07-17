import React, { createContext, useState } from "react";
import { NavBar } from './components/nav-bar'
import { Outlet } from "react-router-dom";



export const CartContext = createContext({});

function App() {
  

  // cart: [{id: 1, count: 2}, ...] 구조
  const [cart, setCart] = useState([]);

  const cartCount = cart.reduce((sum, item) => sum + item.count, 0);
  
  return (
    <div>
      <CartContext.Provider value={{
        cart,
        setCart,
        cartCount
      }}>
        <NavBar />
        <Outlet />
      </CartContext.Provider>
    </div>
  );
}

export default App;
