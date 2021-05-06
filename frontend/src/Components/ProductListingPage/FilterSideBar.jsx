import { useProduct } from "../../Context/ProductContext"
import { getBrands, sortByNames } from "../../utils/utils";
import "./FilterSideBar.css";
import { MobileSortAndFilter } from "./MobileSortAndFilter";

export const FilterSideBar = () => {
    const {state,dispatch} = useProduct()
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
                            <label className = "pointer">
                            <input 
                            name = "sort_by" 
                            type = "radio" 
                            className = "filter-margin"
                            checked = {state.sort[name.toLowerCase()]} 
                            onChange = {() => (dispatch({type:"SORT", payload:name}))}/>
                            {name}
                            </label>
                            </div>
                            })
            }
            </div>
            
            <div className = "filter-sidebar__heading">FILTERS</div>
                <div>
                    <label className = "pointer">
                    <input
                    type="checkbox"
                    name="in_stock_only"
                    className = "filter-margin"
                    checked = {state.otherFilter.in_stock}
                    onChange = {() => (dispatch({type : "OTHER_FILTER", payload:"in_stock"}))}
                    />
                    In Stock Only</label>
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
                        <label className = "pointer">
                        <input
                        type="checkbox"
                        name={item}
                        className = "filter-margin"
                        checked = {state.brandFilter[item]}
                        onChange = {() => (dispatch({type:"FILTER_BY_BRAND",payload:item}))}
                        />
                        {item}</label>
                    </div>
                    })
                }
               
                
                
            
        </div>
        <MobileSortAndFilter/>
        </>
    )
}