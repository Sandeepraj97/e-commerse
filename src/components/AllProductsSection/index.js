import {Component} from 'react'

import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'
import './index.css'

import ProductsHeader  from '../ProductsHeader'

const sortByOption = [
  {
    optionId:"PRICE_HIGH",
    displayText:"Price (High - Low)"
  },
  {
    optionId:"PRICE_LOW",
    displayText:"Price(Low - High)"
  }
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortByOption[0].optionId
    }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const {activeOptionId} = this.state
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    }
  }

  updateActiveOptionId = activeOptionId =>{
    this.setState({activeOptionId},this.getProducts)
  }

  renderProductsList = () => {
    const {productsList,activeOptionId} = this.state
    return (
      <>
        <ProductsHeader
           sortByOption = {sortByOption}
            activeOptionId={activeOptionId}
            updateActiveOptionId = {this.updateActiveOptionId}
             />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product}
             key={product.id}
             
            />
          ))}
        </ul>
      </>
    )
  }



  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
