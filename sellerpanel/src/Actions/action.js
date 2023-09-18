import { SELLER_RELETAD_PRODUCT,
    MEDIA_ACTION



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




