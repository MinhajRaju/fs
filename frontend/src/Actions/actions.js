
import {
    ALL_NESTED_CATEGORY_FAIL,
    ALL_NESTED_CATEGORY_REQUEST,
    ALL_NESTED_CATEGORY_SUCCESS,

    FLASH_SALE_REQUEST,
    FLASH_SALE_SUCCESS,
    FLASH_SALE_FAIL,


    TOP_CATEGORY_REQUEST,
    TOP_CATEGORY_SUCCESS,
    TOP_CATEGORY_FAIL,


    DASH_PRODUCT_REQUEST,
    DASH_PRODUCT_SUCCESS,
    DASH_PRODUCT_FAIL,

    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCCESS,
    SINGLE_PRODUCT_FAIL,

    SELLER_PRO_SHUFFLE_REQUEST,
    SELLER_PRO_SHUFFLE_SUCCESS,
    SELLER_PRO_SHUFFLE_FAIL,

    RELATED_ITEM_REQUEST,
    RELATED_ITEM_SUCCESS,
    RELATED_ITEM_FAIL,

    CATEGORY_RELATED_ITEM_REQUEST,
    CATEGORY_RELATED_ITEM_SUCCESS,
    CATEGORY_RELATED_ITEM_FAIL,

    CUSTOMER_INFO_REQUEST,
    CUSTOMER_INFO_SUCCESS,
    CUSTOMER_INFO_FAIL,

    ADD_TO_CART,
    REMOVE_FROM_CART,

    SHIPPING_ADDRESS_REQUEST,
    SHIPPING_ADDRESS_SUCCESS,
    SHIPPING_ADDRESS_FAIL,

    ORDER_ITEM_SAVE,
    ORDER_ITEM_SAVE_FAIL,
    CATEGORY_TOTAL,

    BRAND_REQUEST,
    FILTER_DATA



} from "../Constants/constants"
import axios from 'axios'


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

export const FlashSaleAction = () => async (dispatch) => {

    try {
        dispatch({
            type: FLASH_SALE_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.get('/api/po/flashsale/', config)

        dispatch({
            type: FLASH_SALE_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        dispatch({
            type: FLASH_SALE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,

        })

    }


}


export const TopCategoryAction = (number_of_category) => async (dispatch) => {

    try {
        dispatch({
            type: TOP_CATEGORY_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.get(`/api/admin/topcategory/${number_of_category}`, config)

        dispatch({
            type: TOP_CATEGORY_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        dispatch({
            type: TOP_CATEGORY_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,

        })

    }


}




let visible = 0

export const DashProductAction = () => async (dispatch) => {

    try {
        dispatch({
            type: DASH_PRODUCT_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        visible += 2

        const { data } = await axios.get(`/api/po/dashproduct/${visible}`, config)

        dispatch({
            type: DASH_PRODUCT_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        dispatch({
            type: DASH_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,

        })

    }


}






export const SingleProductAction = (slug) => async (dispatch) => {

    try {
        dispatch({
            type: SINGLE_PRODUCT_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }


        const { data } = await axios.get(`/api/po/singleproduct/${slug}`, config)

        dispatch({
            type: SINGLE_PRODUCT_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        dispatch({
            type: SINGLE_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,

        })

    }


}



export const SellerProductShuffleAction = (id) => async (dispatch) => {

    try {
        dispatch({
            type: SELLER_PRO_SHUFFLE_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }


        const { data } = await axios.get(`/api/po/samestore/${id}`, config)

        dispatch({
            type: SELLER_PRO_SHUFFLE_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        dispatch({
            type: SELLER_PRO_SHUFFLE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,

        })

    }


}





export const RelatedItemAction = (id) => async (dispatch) => {

    try {
        dispatch({
            type: RELATED_ITEM_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }


        const { data } = await axios.get(`/api/po/relateditem/${id}`, config)

        dispatch({
            type: RELATED_ITEM_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        dispatch({
            type: RELATED_ITEM_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,

        })

    }


}


let catvisible = 10

export const CategoryRelatedItemAction = (category , fprice) => async (dispatch) => {

    try {
        dispatch({
            type: CATEGORY_RELATED_ITEM_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        catvisible += 10
        const { data } = await axios.get(`/api/po/cateogryrelateditem/${category}/${catvisible}/${fprice}`, config)
       

        dispatch({
            type: CATEGORY_RELATED_ITEM_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        dispatch({
            type: CATEGORY_RELATED_ITEM_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,

        })

    }


}
export const TotalCategory = (category) => async (dispatch) => {
    
       
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.get(`/api/po/categorytotal/${category}`, config)

        dispatch({
            type: CATEGORY_TOTAL,
            payload: data
        })
}



export const BrandTotalAction =  (category) => async(dispatch) =>{

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const {data} = await axios.get(`/api/po/brand/${category}`, config)

    dispatch({
        type:BRAND_REQUEST,
        payload:data
    })


}



export const FilterItemAction =  (idArray=[] ,catid , ratingArray=[] , min , max ) => async(dispatch) =>{

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

  


    const parameter = {

        BrandIdArray: idArray,
        CatId : catid,
        RatingArray:ratingArray,
        Min:parseInt(min),
        Max:parseInt(max),
      

    }

    const {data} = await axios.post(`/api/po/filter/`, parameter ,  config)




    dispatch({
        type:FILTER_DATA,
        payload:data
    })


}












export const CustomerInfoAction = (id) => async (dispatch) => {

    try {
        dispatch({
            type: CUSTOMER_INFO_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }


        const { data } = await axios.get(`/api/customer/read/${id}`, config)

        dispatch({
            type: CUSTOMER_INFO_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        dispatch({
            type: CUSTOMER_INFO_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,

        })

    }


}


export const AddToCart = (slug ,variation=null , qty=1) => async (dispatch ,getState) => {
    const { data } = await axios.get(`/api/po/singleproduct/${slug}`)

    dispatch({

        type:ADD_TO_CART,
        payload:{
            product:data.id,
            slug:data.slug,
            price:data.price,
            title:data.title,
            variationid:variation,
            qty: parseInt(data.totalqty),
            pqty: parseInt(qty),
            seller : data.seller.user.id
        }

    })


    localStorage.setItem('cartItems', JSON.stringify(getState().CartReducer.cartItems))




}

export const RemoveFromCart = (id) => (dispatch, getState) => {

    console.log(id  , "ASfasdfasdfadsfasdfsd")

    dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().CartReducer.cartItems))
}



export const ShippingAddress = (userid) => async (dispatch) => {

    try {
        dispatch({
            type: SHIPPING_ADDRESS_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }


        const { data } = await axios.get(`/api/po/shippingaddress/${userid}`, config)

        dispatch({
            type: SHIPPING_ADDRESS_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        dispatch({
            type: SHIPPING_ADDRESS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,

        })

    }






}



export const OrderItemSave = () => async (dispatch , getState) => {

    try {
        dispatch({
            type: ORDER_ITEM_SAVE
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {cartItems} = getState().CartReducer
        console.log("Cartitem" , cartItems)

        const parameter = {

            cartItems
           
    
    
    
        }


        await axios.post(`/api/po/orderitemsave/`, parameter,config)

        localStorage.removeItem('cartItems')
        window.location.replace('/')

    }
    catch (error) {

        dispatch({
            type: SHIPPING_ADDRESS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,

        })

    }


}



