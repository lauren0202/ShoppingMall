import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ItemPage } from './components/item-page.jsx'
import { MainComponent } from './components/main-contents.jsx'
import { CartPage } from './components/cart.jsx'
import React from "react";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainComponent />} />
        <Route path="/item/:id" element={<ItemPage />}/>
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
    </BrowserRouter>
    
  </StrictMode>
)
