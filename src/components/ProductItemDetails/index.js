import { Component } from "react"
import Cookies from "js-cookie"
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'


import "./index.css"
import Header from "../Header"
import SimilarProducts from "../SimilarProducts"
import CartContext from "../../context/CartContext"

class ProductItemDetails extends Component{

  state = {
    productData :{},
    similarProducts : [],
    quantity: 1
  
  }

  componentDidMount(){
    this.getProductData()
  }



  getFormattedData = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  })

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      const updateSimilarProductDetails = fetchedData.similar_products.map(eachSmilierProduct=> this.getFormattedData(eachSmilierProduct))
      this.setState({
        productData: updatedData,
        similarProducts:updateSimilarProductDetails        
      })
    }
   
  }

  onDecrementQuantity = () =>{
    const { quantity } = this.state
    if(quantity >1){
      this.setState(prevState =>({quantity:prevState.quantity - 1}))
    }
  }

  onIncrementgQuantity = () =>{
    this.setState(prevState =>({quantity:prevState.quantity + 1}))
   }

  renderProductsListView = () =>(

  <CartContext.Consumer>
    {
      value =>{
        const {productData,quantity,similarProducts,} = this.state
        const {availability,
                brand,
                description,
                imageUrl,
                price,
                rating,
                title,
                totalReviews,} = productData
          const {addCartItem} = value

          const onClickAddToCart = () =>{
            addCartItem({...productData,quantity})
           
          }
          return (
            <div className="product-details-success-view">
              <div className="product-details-container">
                <img src={imageUrl}  alt="product"className="product-image"/>
                <div className="product">
                  <h1 className="product-name"> {title}</h1>
                  <p className="product-details">Rs {price} /--</p>
                  <div className="rating-and-review-content">
                    <div className="rating-cointainer">
                      <p className="rating">{rating}</p>
                      <img className="start" src="https://assets.ccbp.in/frontend/react-js/star-img.png" alt="star" />
                    </div>
                    <p className="review-count">{totalReviews} Reviews</p>
                  </div>
                  <p className="product-discription">{description}</p>
                  <div className="availability-cointainer" > 
                    <p className="availability">Availability :</p>
                    <p className="availability-details">{availability} </p>
                  </div>
                  <div className="brand-cointainer">
                    <p className="brand">Brand :</p>
                    <p className="brand-details">{brand}</p>
                  </div>
                  <hr/>
                  <div className="quantity-container">
                    <button type="button"
                     className="quantity-btn"
                     onClick={this.onDecrementQuantity}
                     >
                        <BsDashSquare className="quantity-controller-icon "/>
                     </button>
                    <p className="quantity">{quantity}</p>
                    <button type="button" 
                     className="quantity-btn"
                     onClick={this.onIncrementgQuantity}>
                        <BsPlusSquare className="quantity-controller-icon "/>
                    </button>
                  </div>
                  <button className="add-to-cart-btn"
                    onClick={onClickAddToCart}
                    type="button">Add to Cart</button>
                </div>
              </div>
              <h1 className="similar-products-heading">Similar Products</h1>
              <ul className="similar-products-list">
                {
                  similarProducts.map((eachProduct)=>(
                    <SimilarProducts productDetils = {eachProduct} key={eachProduct.id} />
                  ))
                }
              </ul>
            </div>
          )
      }
    }
  </CartContext.Consumer>
  )


  render() {
    
    return (
      <>  
      <Header />    
      <div className="product-item-details-container">
        {this.renderProductsListView()}
      </div>
      </>

    )
  }
}

export default ProductItemDetails