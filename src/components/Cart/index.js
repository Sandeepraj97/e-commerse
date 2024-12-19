import CartContext from "../../context/CartContext"
import CartListView from "../CartListView"
import CartSummary from "../CartSummary"
import EmptyCartView from "../EmptyCartView"
import Header from "../Header"


import "./index.css"

const Cart = () =>(
    <CartContext.Consumer >
        {
            value =>{
                const {cartList,removeCartItem} = value
                const lengthOfCart = cartList.length
                return(
                   <>
                    <Header />
                    {lengthOfCart === 0 ? <EmptyCartView/> :( <div className="cart-coitainer">
                        <div className="cart-content-cointainer">
                            <div className="cart-header-cointainer">
                                <h1 className="cart-heading">My Cart</h1>
                                <button
                                    className="remove-all-btn"
                                    onClick={removeCartItem}
                                >
                                    Remove All
                                </button>
                            </div>
                            <CartListView />
                            <CartSummary />
                        </div>
                    </div> )}
                   </>
                )
            }
        }
    </CartContext.Consumer>
)

export default Cart