
import { BrowserRouter,Route, Routes } from "react-router-dom"
import "./App.css"
import LoginForm from "./components/LoginForm"
import Home from "./components/Home"
import Cart from "./components/Cart"
import Product from "./components/Product"

const App = () => (
    <BrowserRouter>
      <switch>
        <Routes>
          <Route exact path="/login" Component={LoginForm} />  
          <Route exact path="/" Component={Home} />
          <Route exact path="/products" Component={Product} />
          <Route exact path="/cart" Component={Cart} />
        </Routes>
      </switch>
     
    </BrowserRouter>
    
  )


export default App