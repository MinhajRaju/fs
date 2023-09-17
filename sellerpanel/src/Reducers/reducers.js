import { 
    
    
    SELLER_RELETAD_PRODUCT,
   




} from "../Constants/constants";





export const SellerItemReducers = (state = {}, action) => {

    switch (action.type) {
       
        case SELLER_RELETAD_PRODUCT:
            return { loading: false, SellerItemData: action.payload }
       
        default:
            return state
    }


}

