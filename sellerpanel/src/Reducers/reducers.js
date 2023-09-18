import { 
    
    
    SELLER_RELETAD_PRODUCT,
    MEDIA_ACTION
   




} from "../Constants/constants";





export const SellerItemReducers = (state = {}, action) => {

    switch (action.type) {
       
        case SELLER_RELETAD_PRODUCT:
            return { loading: false, SellerItemData: action.payload }
       
        default:
            return state
    }


}


export const MediaItemReducers = (state = {}, action) => {

    switch (action.type) {
       
        case MEDIA_ACTION:
            return { loading: false, MediaData: action.payload }
       
        default:
            return state
    }


}



