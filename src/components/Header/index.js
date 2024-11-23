import { Link } from "react-router-dom"

import "./index.css"
const Header = ()=>(
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
                        Cart
                    </Link>
                </li>
            </ul>
            <button className="logout-desktop-btn">Logout</button>
        </div>
    </nav>
)

export default Header