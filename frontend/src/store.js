import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { NestedcategoryReducer } from './Reducers/reducers'
import { FlashSaleReducer } from './Reducers/reducers'
import { TopCategoryReducer } from './Reducers/reducers'
import { DashProductReducer } from './Reducers/reducers'
import { SingleProductReducer } from './Reducers/reducers'
import { SellerProductShuffleReducer } from './Reducers/reducers'
import { RelatedItemReducer } from './Reducers/reducers'
import { CategoryRelatedItemReducer } from './Reducers/reducers'
import { CustomerInfoReducer } from './Reducers/reducers'
import { CartReducer } from './Reducers/reducers'
import { ShippingReducers } from './Reducers/reducers'
import { OrderItemReducers } from './Reducers/reducers'
import { CategoryTotalReducer } from './Reducers/reducers'
import { BrandTotalReducer } from './Reducers/reducers'
import { FilterItemReducers } from './Reducers/reducers'


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

export const initialstate = {

    cart: {
        cartItems: cartItemsFromStorage,

    }
}


const reducer = combineReducers({

    NestedcategoryReducer,
    FlashSaleReducer,
    TopCategoryReducer,
    DashProductReducer,
    SingleProductReducer,
    SellerProductShuffleReducer,
    RelatedItemReducer,
    CategoryRelatedItemReducer,
    CustomerInfoReducer,
    CartReducer,
    ShippingReducers,
    OrderItemReducers,
    CategoryTotalReducer,
    BrandTotalReducer,
    FilterItemReducers
    
})





const middleware = [thunk]

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store