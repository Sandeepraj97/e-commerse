import Cookies from "js-cookie"
import { Component } from "react"
import "./index.css"
import ProductCard from "../ProductCard"


const apiStatusConstants ={
    initial : "INITIAL",
    success :"SUCCESS",
    failure :"FAILURE",
    inProgress:"INPROGRESS"
}

class PrimeDealSection extends Component{

    state = {
        primeDeals :[],
        apiStatus : apiStatusConstants.initial
    }

    componentDidMount(){
        this.getPrimeDeals()
    }

    getPrimeDeals = async () =>{
        this.setState({apiStatus:apiStatusConstants.inProgress})

        const JwtToken = Cookies.get("jwt_token")
        const apiUrl = "https://apis.ccbp.in/prime-deals"

        const options = {
            headers : {
                Authorization: `Bearer ${JwtToken}`
            },
            method :"GET",
        }

        const response = await fetch(apiUrl, options)
        console.log(response)
        const fetchedData = await response.json()
        
            if (response.ok===true){
                const updatedData = fetchedData.prime_deals.map((product) =>({
                    id:product.id,
                    brand:product.brand,
                    imageUrl:product.image_url,
                    price:product.price,
                    title:product.title,
                    rating:product.rating
            }))
            this.setState({primeDeals:updatedData,
                apiStatus:apiStatusConstants.success
            })
        }
        if(response.status===401){
            this.setState({apiStatus:apiStatusConstants.failure})
        }

    }

    renderPrimeDeals = () =>{
        const {primeDeals} = this.state
        return (<>
            <h1 className="products-heading">Exclusive Prime Deals</h1>
            <ul className="products-list">
                {
                primeDeals.map((product) =>(
                    <ProductCard productData={product} key={product.id} />
                ))
                }
            </ul>
            </>
        )
    }



    renderPrimeDealsFailureView = () =>(
         <img
          src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
          alt="Register Prime"
          className="register-prime-image"
        /> 
      )

      renderLodingView = () =>(
        <h1>Loading...</h1>
      )
     
    
    render(){
        const {apiStatus} = this.state
        switch (apiStatus){
            case apiStatusConstants.success:
                return this.renderPrimeDeals()
            case apiStatusConstants.failure:
                return this.renderPrimeDealsFailureView()
            case apiStatusConstants.inProgress:
                return this.renderLodingView()
            default:
                return null
        }
    }
}


export default PrimeDealSection