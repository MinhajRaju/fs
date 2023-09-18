import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { SellerItemReducers } from './Reducers/reducers'
import { MediaItemReducers } from './Reducers/reducers'


const reducer = combineReducers({

    SellerItemReducers,
    MediaItemReducers
  
    
    
})





const middleware = [thunk]

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store