import { BsFilterRight } from "react-icons/bs";
import "./index.css"

const ProductsHeader = (props) =>{
    const {sortByOption , activeOptionId,updateActiveOptionId} = props

    const onChangeSortBy = (e) =>{
        updateActiveOptionId(e.target.value)
    }

    return (
        <dv className="header-cointainer">
            <h1>All Products</h1>
            <div className="sort-by-cointainer">
                <BsFilterRight />
                <p className="sort-by-name">Sort By</p>
                <select
                    value={activeOptionId}
                    onChange={onChangeSortBy}
                >
                {sortByOption.map((eachItem)=>(
                        <option 
                            value={eachItem.optionId}
                            key={eachItem.optionId}>
                            {eachItem.displayText}
                        </option>
                    ))}
                    
                </select>
            </div>
        </dv>
    )
}

export default ProductsHeader