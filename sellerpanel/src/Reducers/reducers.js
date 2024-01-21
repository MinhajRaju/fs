import { 
    
    
    SELLER_RELETAD_PRODUCT,
    MEDIA_ACTION,
    SELLER_ORDER,
    SELLER_WISE_ORDER,
    ORDER_INFO,
    STATUS_FLAG,
    STATUS_LENGTH,
    ALL_NESTED_CATEGORY_FAIL,
    ALL_NESTED_CATEGORY_REQUEST,
    ALL_NESTED_CATEGORY_SUCCESS,
   
    BRAND_SUCCESS,
    WARRANTY_SUCCESS,
    FOLDER_DETAILS,
    SELECT_FOLDER_IMG,
    MOVE_TO_FOLDER,
    TRACKING_CHECKLIST,




} from "../Constants/constants";


export const NestedcategoryReducer = (state = [], action) => {

    switch (action.type) {
        case ALL_NESTED_CATEGORY_REQUEST:
            return { loading: true }
        case ALL_NESTED_CATEGORY_SUCCESS:
            return { loading: false, NestedCategoryData: action.payload }
        case ALL_NESTED_CATEGORY_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const BrandTotalReducer = (state = {}, action) => {

    switch (action.type) {        
        case BRAND_SUCCESS:
            return {TotalBrand:action.payload}      
        default:
            return state
    }


}


export const WarrantyReducer = (state = {}, action) => {

    switch (action.type) {        
        case WARRANTY_SUCCESS:
            return {Warranty:action.payload}      
        default:
            return state
    }


}





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


export const FolderDetailReducers = (state={} , action) => {


    switch(action.type){

        case FOLDER_DETAILS:
            return {loading:false , FolderDetails:action.payload}

        default:
            return state
    }



}

export const FolderImageReducers = (state={} , action) => {


    switch(action.type){

        case SELECT_FOLDER_IMG:
            return {loading:false , FolderImageDetails:action.payload}

        default:
            return state
    }



}


export const MoveFolderReducers = (state={} , action) => {


    switch(action.type){

        case MOVE_TO_FOLDER:
            return {loading:false , MoveToFolderData:action.payload}

        default:
            return state
    }



}



export const TrackingCheckListReducers = (state={} , action) => {


    switch(action.type){

        case TRACKING_CHECKLIST:
            return {loading:false , CheckList:action.payload}

        default:
            return state
    }



}







