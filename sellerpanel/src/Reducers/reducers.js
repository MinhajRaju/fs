import { 
    
    
    SELLER_RELETAD_PRODUCT,
    MEDIA_ACTION,
    SELLER_ORDER,
    SELLER_WISE_ORDER,
    ORDER_INFO,
    STATUS_FLAG,
    STATUS_LENGTH
   




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

export const SellerOrderReducers = (state={} , action) => {


    switch(action.type){

        case SELLER_ORDER:
       

            return {loading:false , SellerOrder:action.payload}

        default:
            return state
    }



}

export const SellerWiseOrderReducers = (state={} , action) => {


    switch(action.type){

        case SELLER_WISE_ORDER:
            return {loading:false , SellerWiseOrderData:action.payload}

        default:
            return state
    }



}

export const OrderInfoReducers = (state={} , action) => {


    switch(action.type){

        case ORDER_INFO:
            return {loading:false , OrderInfoData:action.payload}

        default:
            return state
    }



}




export const StatusFlagReducers = (state={} , action) => {


    switch(action.type){

        case STATUS_FLAG:
            return {loading:false , StatusInfoData:action.payload}

        default:
            return state
    }



}





export const StatusLengthReducers = (state={} , action) => {


    switch(action.type){

        case STATUS_LENGTH:
            return {loading:false , StatusLengthData:action.payload}

        default:
            return state
    }



}



