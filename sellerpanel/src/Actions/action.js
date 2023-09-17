import { SELLER_RELETAD_PRODUCT,



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




