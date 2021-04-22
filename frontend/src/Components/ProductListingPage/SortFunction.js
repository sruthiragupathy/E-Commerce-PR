
const sortByDiscount = (products) => {
    const sortedProducts = products.sort((a,b) => {
        return b.discountByPercentage - a.discountByPercentage;
    })
    return sortedProducts;
}

const sortByLatest = (products) => {
    return products.sort((a,b) => b.isnew === true ? 1 : -1)
}

const lowToHighSort = (products) => {
    return products.sort((a, b) => a.price - b.price);
  };

const highToLowSort = (products) => {
    return products.sort((a, b) => b.price - a.price);
  };

export const sortFunction = (arrayToBeSorted,sortByType) => {
    switch(sortByType){
        case "discount":
            return sortByDiscount(arrayToBeSorted);
        case "latest":
            return sortByLatest(arrayToBeSorted);
        case "price : high to low":
            return highToLowSort(arrayToBeSorted);
        case "price : low to high":
            return lowToHighSort(arrayToBeSorted);
        default:
            return arrayToBeSorted;
    }
}