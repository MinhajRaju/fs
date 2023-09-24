import { SELLER_RELETAD_PRODUCT,
    MEDIA_ACTION,
    SELLER_ORDER,
    SELLER_WISE_ORDER,
    ORDER_INFO,
    STATUS_FLAG,
    STATUS_LENGTH



} from "../Constants/constants";


import axios from 'axios'

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
