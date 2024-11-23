
import Header from "../Header"
import "./index.css"

const Home = () => (
        <>
        <Header />
        <div className="home-cointainer">
            <div className="home-content"> 
                <h1>Clothes That Get You Noticed</h1>
                <p> Fashion is part of the daily air and it does not quite help that it
                    changes all the time. Clothes have always been a marker of the era and
                    we are in a revolution. Your fashion makes you been seen and heard
                    that way you are. So, celebrate the seasons new and exciting fashion
                    in your own way.
                </p>
                <button className="shop-now-button">Shop Now</button>
            </div>
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                 alt="dresses to be noticed"
                 className="home-desktop-img"
            />
        </div>
        </>
    )


export default Home