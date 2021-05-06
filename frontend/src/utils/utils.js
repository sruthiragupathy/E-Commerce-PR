export const getBrands = (products) => {
    const allBrandNamesWithDuplicates = products.map(product => product.brandName)
    return allBrandNamesWithDuplicates.filter((brandname,index) => (allBrandNamesWithDuplicates.indexOf(brandname) === index)).sort()
}

export const sortByNames = ["Latest","Discount","Price : High to Low","Price : Low to High"]