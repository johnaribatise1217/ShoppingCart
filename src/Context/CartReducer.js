export const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD TO CART" : 
            return {...state, cart : [...state.cart, {...action.payload, qty : 1}]}
        case "REMOVE FROM CART" : 
            return {...state, cart : state.cart.filter(item => item.id !== action.payload.id )}
        case "CHANGE CART QUANTITY" :
            return {...state, cart : state.cart.filter(c => c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty)}
        default :
            return state
    }
}

export const filterReducer = (state, action) => {
    switch(action.type) {
        case "SORT BY PRICE" :
            return {...state, sort : action.payload}
        case "FILTER BY STOCK" :
            return {...state, byStock : !state.byStock}
        case "FILTER BY FASTDELIVERY" :
            return {...state, byFastDelivery : !state.byFastDelivery}
        case "FILTER BY RATING" :
            return {...state, byRating : action.payload}
        case "FILTER BY SEARCH" :
            return {...state, searchQuery : action.payload}
        case "CLEAR FILTERS" :
            return {
                byStock : false,
                byFastDelivery : false,
                byRating : 0,
                searchQuery : ""
            }
        default :
            return state
    }
}