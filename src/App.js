import {BrowserRouter, Route, Switch,Redirect} from 'react-router-dom'
import CartContext from './context/CartContext'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'


import './App.css'
import ProductedRoute from './components/ProtectedRoute'
import ProductItemDetails from './components/ProductItemDetails'
import { Component } from 'react'



 class App extends Component {
  state = {
    cartList :[]
  }

removeCartItem = ()=>{
  this.setState({cartList:[]})
}


deleteCartItem =(id) =>{
  const {cartList} = this.state
  const updateCartList = cartList.filter(
    eachCart=> eachCart.id !==id
  )
  this.setState({cartList:updateCartList})
}

incrementCartQuantity =(id) =>{
  this.setState(prevState =>({
    cartList:prevState.cartList.map(eachCart=>{
      if(eachCart.id === id){
        const updatedCartItemQuantiy = eachCart.quantity + 1
        return {...eachCart,quantity:updatedCartItemQuantiy}
      }
      return eachCart
    })
  }))
}

decrementCartQuantity = (id) =>{
  const{cartList} = this.state
  const productObject = cartList.find(eachCartItem =>eachCartItem.id===id)
  if(productObject.quantity>1){
    this.setState(prevState =>({
      cartList:prevState.cartList.map(eachCart =>{
        if(eachCart.id ===id){
          const updatedCartItemQuantiy = eachCart.quantity - 1
          return {...eachCart,quantity:updatedCartItemQuantiy}
        }
        return eachCart
      })
    }))
  }
  
}

addCartItem =(product) =>{
  const {cartList} = this.state
  const productObject = cartList.find(eachCart=> eachCart.id===product.id)
  
  if(productObject){
    this.setState(prevState =>({
      cartList:prevState.cartList.map(eachItem=>{
        if(product.id===eachItem.id){
          const updateCartQty = eachItem.quantity + product.quantity
          return {...eachItem,quantity:updateCartQty}
        }
        return eachItem
      })
    }))
  }
  else{
    const updateCartList = [...cartList,product]
    this.setState({cartList:updateCartList})
  }
}


render (){
  const {cartList} = this.state
  return (
  <BrowserRouter>
  <CartContext.Provider
    value={{
      cartList,
      addCartItem: this.addCartItem,
      deleteCartItem : this.deleteCartItem,
      incrementCartQuantity : this.incrementCartQuantity,
      decrementCartQuantity: this.decrementCartQuantity,
      removeCartItem:this.removeCartItem    
    }}
  >
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProductedRoute exact path="/" component={Home} />
      <ProductedRoute exact path="/products" component={Products} />
      <ProductedRoute exact path="/products/:id" component={ProductItemDetails} />
      <ProductedRoute exact path="/cart" component={Cart} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect  to="not-found" />
   
    </Switch>
    </CartContext.Provider>
  </BrowserRouter>
)
}}
export default App