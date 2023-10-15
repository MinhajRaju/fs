import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { SellerItemReducers } from './Reducers/reducers'
import { MediaItemReducers } from './Reducers/reducers'
import { SellerOrderReducers } from './Reducers/reducers'
import { SellerWiseOrderReducers } from './Reducers/reducers'
import { OrderInfoReducers } from './Reducers/reducers'
import { StatusFlagReducers } from './Reducers/reducers'
import { StatusLengthReducers } from './Reducers/reducers'
import { NestedcategoryReducer } from './Reducers/reducers'


const reducer = combineReducers({

    SellerItemReducers,
    MediaItemReducers,
    SellerOrderReducers,
    SellerWiseOrderReducers,
    OrderInfoReducers,
    StatusFlagReducers,
    StatusLengthReducers,
    NestedcategoryReducer
    
    
})





const middleware = [thunk]

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store