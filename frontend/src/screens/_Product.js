import React from 'react'


import { connect } from "react-redux";
import store from '../store';
import { RelatedItemAction, SingleProductAction } from '../Actions/actions';
import { SellerProductShuffleAction } from '../Actions/actions';

import withRouter from './_Helper';

import ImageWithThumb from '../Sp_Inc/_Sp_Image_Thumb';
import ProductShuffle from '../Sp_Inc/_Sp_Shuffle';
import ProductCarousel from '../inc/_ProductCarousel';
import { CustomerInfoAction } from '../Actions/actions';
import Rating from '../inc/_Rating';
import Dashboard from './_Dashboard';
import {AES, enc}from 'crypto-js';



const mapStateToProps = (state) => {
  
    return { CustomerInfoData:state.CustomerInfoReducer.CustomerInfoData , SingleProductData: state.SingleProductReducer.SingleProductData , shuffleProductData:state.SellerProductShuffleReducer.SellerProductShuffleData ,RelatedItemData:state.RelatedItemReducer.RelatedItemData , RecentData:state.RecentViewReducers.RecentViewData }

}

export default withRouter(connect(mapStateToProps)(class Product extends React.Component {

     

    constructor(props) {
        super(props)
    
        store.dispatch(SingleProductAction(this.props.params.slug))
        store.dispatch(RelatedItemAction(this.props.params.slug))
        store.dispatch(CustomerInfoAction(1))

        this.state = {
            ratingvalue:null
        }

      
    }


    componentDidMount() {       
        setTimeout(() =>{
            store.dispatch(SellerProductShuffleAction(this.props.SingleProductData.seller.id))
        },3000)

        setTimeout(this.rating , 3000)

        
    

    }

    rating  = () =>{

        let x =[]
        let sum = 0
        if(this.props.SingleProductData){

            this.props.SingleProductData.rc.map((data)=>{

                x.push(parseInt(data.rating))
            

            })

        }
        x.map(x => sum += x )

        const res = sum/this.props.SingleProductData.rc.length

        console.log(res)
        this.setState({ratingvalue:res})


    }



    reviews = () =>{

        if(this.props.SingleProductData !== undefined && this.props.CustomerInfoData !== undefined ){
            console.log(this.props.SingleProductData.id , this.props.CustomerInfoData.product_id )
           const id =this.props.SingleProductData.id
           
           const product = this.props.CustomerInfoData.product_id
           const res = product.includes(id)
           console.log(res)

           if(res == true){
           
            return (
                <div>
    
                                                            <h3 class="mb-5">Create Review</h3>
    
    
    
                                                            <div class="border-bottom py-4 mb-4">
                                                                <h5>Add a headline</h5>
                                                                <input type="text" class="form-control" placeholder="What’s most important to know" />
                                                            </div>
                                                            <div class="border-bottom py-4 mb-4">
                                                                <h5>Add a photo or video</h5>
                                                                <p>Shoppers find images and videos more helpful than text alone.</p>
    
                                                                <form action="#" class=" dropzone profile-dropzone">
                                                                    <div class="fallback">
                                                                        <input name="file" type="file" multiple />
                                                                    </div>
                                                                </form>
    
                                                            </div>
                                                            <div class=" py-4 mb-4">
    
                                                                <h5>Add a written review</h5>
                                                                <textarea class="form-control" rows="3"
                                                                    placeholder="What did you like or dislike? What did you use this product for?"></textarea>
    
                                                            </div>
    
                                                            <div class="d-flex justify-content-end">
                                                                <a href="#" class="btn btn-primary">Submit Review</a>
                                                            </div>
                                                        </div>
            )

           }
           


        }

       

       

    }

 


    

    render() {    
        
        
        

        return (


            <>
                <div class="mt-4">
                 
                </div>
                <section class="mt-8" >
                    <div class="container">
                        <div class="row" >
                            <ImageWithThumb data={this.props.SingleProductData} rating={this.state.ratingvalue}/>

                            
                           


                        </div>
                    </div>
                </section >            
                <section class="mt-8" >

                <ProductCarousel data={this.props.shuffleProductData} section="Same Store"/>
                </section > 
                <section class="mt-8" >
                <ProductCarousel data={this.props.RelatedItemData} section="Similar Product"/>
                </section > 
                <section class="mt-8" >
                <ProductCarousel data={this.props.RecentData} section="Recently View"/>
                </section > 


            </>
        )
    }


}))
