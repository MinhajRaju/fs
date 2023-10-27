import { SELLER_RELETAD_PRODUCT,
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
    MOVE_TO_FOLDER



} from "../Constants/constants";


import axios from 'axios'
export const BrandTotalAction =  (id) => async(dispatch) =>{

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    console.log(id)

    const parameter = {
        id
    }

    const {data} = await axios.post('/api/po/spbrand/', parameter,config)

    dispatch({
        type:BRAND_SUCCESS,
        payload:data
    })


}

export const WarrantyAction =  () => async(dispatch) =>{

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }



   
    const {data} = await axios.get('/api/po/warranty/',config)

    dispatch({
        type:WARRANTY_SUCCESS,
        payload:data
    })


}


export const NestedCategoryAction = () => async (dispatch) => {

    try {
        dispatch({
            type: ALL_NESTED_CATEGORY_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }



        const { data } = await axios.get('/api/admin/category/', config)



        dispatch({
            type: ALL_NESTED_CATEGORY_SUCCESS,
            payload: data
        })
       

    }
    catch (error) {
        dispatch({
            type: ALL_NESTED_CATEGORY_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })

    }
}

export const SellerProductAction = () => async (dispatch , getState) => {


    
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

       


       const {data} =  await axios.get(`/api/seller/sellerproduct/`,config)

       dispatch({

        type:SELLER_RELETAD_PRODUCT,
        payload:data
       })


   


}


export const BulkAction = (idArray=[] , flag=null) => async (dispatch , getState) => {


    
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const parameter = {

        id:idArray,
        flag:flag
    }

   


   const {data} =  await axios.post(`/api/seller/bulkaction/`, parameter ,config)

   dispatch({

    type:SELLER_RELETAD_PRODUCT,
    payload:data
   })





}


export const MediaAction = () => async (dispatch , getState) => {


    
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

   


   const {data} =  await axios.get(`/api/seller/media/` ,config)

   dispatch({

    type:MEDIA_ACTION,
    payload:data
   })





}


export const MediaUploadAction = (files) => async (dispatch , getState) => {


    
    const config = {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    }   

    
  


   const {data} =  await axios.post(`/api/seller/mediaupload/`, files ,config)

   dispatch({

    type:MEDIA_ACTION,
    payload:data
   })





}


export const MediaBulkAction = (idArray) => async (dispatch , getState) => {


    
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }   


    const parameter = {
        idArray:idArray
    }

    
  


   const {data} =  await axios.post(`/api/seller/bulkmediaremove/`, parameter ,config)

   dispatch({

    type:MEDIA_ACTION,
    payload:data
   })





}





export const SellerOrderAction = () => async (dispatch , getState) => {


    
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }   


  
  


   const {data} =  await axios.get(`/api/seller/sellerorderid/` ,config)

   dispatch({

    type:SELLER_ORDER,
    payload:data
   })





}










export const SellerWiseOrderAction = (orderId , id , flag  , status) => async (dispatch , getState) => {


    
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }   

    const parameter = {
        orderId,
        id,
        flag,
        status
    }
    

  
  


   const {data} =  await axios.post(`/api/seller/sellerwiseorder/` ,parameter,config)

   dispatch({

    type:SELLER_WISE_ORDER,
    payload:data
   })





}






export const OrderInfoAction = (id) => async (dispatch , getState) => {


    
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }   


  
  


   const {data} =  await axios.get(`/api/seller/orderinfo/${id}` ,config)

   dispatch({

    type:ORDER_INFO,
    payload:data
   })





}







export const StatusFlagAction = (id , flag) => async (dispatch , getState) => {


    
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }   


  
  


   const {data} =  await axios.post(`/api/seller/orderstatus/${id}` , flag  ,config)

   dispatch({

    type:STATUS_FLAG,
    payload:data
   })





}

export const StatusLengthAction = () => async (dispatch , getState) => {


    
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }   


  
  


   const {data} =  await axios.get(`/api/seller/statuslength/`   ,config)

   dispatch({

    type:STATUS_LENGTH,
    payload:data
   })





}



export const FolderDetailsAction = () => async (dispatch , getState) => {


    
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }   


  
  


   const {data} =  await axios.get(`/api/seller/fetchfolderdetails/`   ,config)

   dispatch({

    type:FOLDER_DETAILS,
    payload:data
   })





}






export const FolderImageAction = (id) => async (dispatch , getState) => {


    
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }   

    const parameter ={
        id
    }
  
  


   const {data} =  await axios.post(`/api/seller/fetchimage/`  , parameter  ,config)

   dispatch({

    type: SELECT_FOLDER_IMG,
    payload:data
   })





}





export const MoveToFolderAction = (selectedFolder , moveFolder , dataId) => async (dispatch , getState) => {


    
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }   

    const parameter ={
        selectedFolder,
        moveFolder,
        dataId
    }
  
  


   const {data} =  await axios.post(`/api/seller/movetofolder/`  , parameter  ,config)

   dispatch({

    type: MOVE_TO_FOLDER,
    payload:data
   })





}
