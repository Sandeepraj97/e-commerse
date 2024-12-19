import { Link,withRouter } from "react-router-dom"
import Cookies from "js-cookie"

import "./index.css"
import CartContext from "../../context/CartContext"
const Header = (props)=>{
    const{history} = props
    const onClickLogout = ()=>{
        Cookies.remove("jwt_token")
        history.replace("/login")
    }

    const renderCartItemCount = () =>(
        <CartContext.Consumer>
            {
                value=>{
                    const {cartList} = value
                    const cartListCount = cartList.length
                    return (
                        <>
                            { cartListCount >0 ?<span className="cart-count-span">{cartListCount}</span> : null}
                        </>
                    )
                }
            }
        </CartContext.Consumer>
    )

    return (
    <nav className="nav-header">
        <div>
            <img 
                src="https://i.postimg.cc/Dwt581N8/logo.jpg" 
                alt="logo"
                 className="logout-icon"
            />
            <ul className="nav-menu">
                <li>
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/products" className="nav-link">
                        Products
                    </Link>
                </li>
                <li>
                    <Link to="/cart" className="nav-link">
                        Cart {renderCartItemCount()}
                    </Link>
                    
                </li>
            </ul>
            <button 
                onClick={onClickLogout}
                className="logout-desktop-btn">Logout
            </button>
        </div>
    </nav>
)}

export default withRouter(Header)