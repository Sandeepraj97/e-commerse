
import CartContext from "../../context/CartContext"
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import { MdCancel } from "react-icons/md";

import "./index.css"

const CartItem = (props) => (
  <CartContext.Consumer>
    {
      value=>{
        const{cartItemDetails} = props
        const{deleteCartItem,incrementCartQuantity,decrementCartQuantity} = value
        const {id, title, brand, quantity, price, imageUrl} = cartItemDetails

        const onDeleteCartItem = () =>{
          deleteCartItem(id)
        }

        const onIncrementcartQuantity = () =>{
          incrementCartQuantity(id)
        }

        const onDecrementCartQuantity = ()=>{
          decrementCartQuantity(id)
        }

        return (
          <li className="cart-item-cointainer">
              <img src={imageUrl} alt={title} className="cart-product-image" />
              <div className="cart-item-details-container">
                <div className="cart-product-title-brand-container">
                  <h1 className="cart-product-title">{title}</h1>
                  <p className="cart-product-brand">{brand}</p>
                </div>
                <div className="cart-quantity-container">
                  <button type="button" className="quantity-controller-button" onClick={onDecrementCartQuantity}>
                    <BsDashSquare  color="#52606D" size={12}/>
                  </button>
                  <p className="cart-quantity">{quantity}</p>
                  <button type="button" className="quantity-controller-button" onClick={onIncrementcartQuantity}>
                    <BsPlusSquare  color="#52606D" size={12}/>
                  </button>
                </div>
                <div className="total-price-delete-container">
                  <p className="cart-total-price">Rs {price * quantity} /--</p>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={onDeleteCartItem}
                  >
                      <MdCancel color="#616E7C" size={20} />
                  </button>
                </div>
              </div>
          </li>
        )
        
      }
    }
  </CartContext.Consumer>
)

export default CartItem