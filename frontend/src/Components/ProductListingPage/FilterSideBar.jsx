import { useProduct } from "../../Context/ProductContext"
import "./FilterSideBar.css";
import { MobileSortAndFilter } from "./MobileSortAndFilter";
const sortByNames = ["Latest","Discount","Price : High to Low","Price : Low to High"]

export const FilterSideBar = () => {
    const {state,dispatch} = useProduct()
    const getBrands = (products) => {
        const allBrandNamesWithDuplicates = products.map(product => product.brandName)
        return allBrandNamesWithDuplicates.filter((brandname,index) => (allBrandNamesWithDuplicates.indexOf(brandname) === index)).sort()
    }
    return (
        <>
        <div className = "sidebar-wrapper">
            <div className = "flex">
                <div className = "filter-sidebar__heading">SORT BY</div>
                <button 
                className="clear-all"
                onClick = {() => (dispatch({type:"CLEAR_ALL_FILTERS"}))}>CLEAR ALL</button>
            </div>
            <div className = "filter-border-bottom">
            {
                sortByNames.map((name,index) => {
                    return <div key = {index} className = "individual-filter-desktop">
                            <input 
                            name = "sort_by" 
                            type = "radio" 
                            className = "filter-margin"
                            checked = {state.sort[name.toLowerCase()]} 
                            onChange = {() => (dispatch({type:"SORT", payload:name}))}/>
                            <label htmlFor = {name}>{name}</label>
                            </div>
                            })
            }
            </div>
            
            <div className = "filter-sidebar__heading">FILTERS</div>
                <div>
                    <input
                    type="checkbox"
                    name="in_stock_only"
                    className = "filter-margin"
                    checked = {state.otherFilter.in_stock}
                    onChange = {() => (dispatch({type : "OTHER_FILTER", payload:"in_stock"}))}
                    />
                    <label htmlFor="in_stock_only">In Stock Only</label>
                </div>
                <div className = "filter-border-bottom">
                <label htmlFor="price">Price Range : 0 to {state.otherFilter.ranger_value}</label>
                <br/>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    step="100"
                    value = {state.otherFilter.ranger_value}
                    className = "margin-top"
                    onChange = {(e) => (dispatch({type:"OTHER_FILTER",payload:"ranger_value",value:e.target.value}))}
                />
                </div>
                
                <div className = "filter-sidebar__heading">FILTER BY BRANDS</div>
                {
                    getBrands(state.products).map((item,index) => {
                        return <div key ={index}>
                        <input
                        type="checkbox"
                        name={item}
                        className = "filter-margin"
                        checked = {state.brandFilter[item]}
                        onChange = {() => (dispatch({type:"FILTER_BY_BRAND",payload:item}))}
                        />
                        <label htmlFor={item}>{item}</label>
                    </div>
                    })
                }
               
                
                
            
        </div>
        <MobileSortAndFilter/>
        </>
    )
}