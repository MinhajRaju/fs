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
  
    return { CustomerInfoData:state.CustomerInfoReducer.CustomerInfoData , SingleProductData: state.SingleProductReducer.SingleProductData , shuffleProductData:state.SellerProductShuffleReducer.SellerProductShuffleData ,RelatedItemData:state.RelatedItemReducer.RelatedItemData }

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

                <section class="mt-lg-14 mt-8 " >
                    <div class="container">
                        <div class="row">
                            <div class="col-md-9">
                                <ul class="nav nav-pills nav-lb-tab" id="myTab" role="tablist">

                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="product-tab" data-bs-toggle="tab"
                                            data-bs-target="#product-tab-pane" type="button" role="tab" aria-controls="product-tab-pane"
                                            aria-selected="true">Product Details</button>
                                    </li>

                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="reviews-tab" data-bs-toggle="tab"
                                            data-bs-target="#reviews-tab-pane" type="button" role="tab" aria-controls="reviews-tab-pane"
                                            aria-selected="false">Reviews</button>
                                    </li>

                                </ul>

                                <div class="tab-content" id="myTabContent">

                                    <div class="tab-pane fade show active" id="product-tab-pane" role="tabpanel" aria-labelledby="product-tab"
                                        tabindex="0">
                                        <div class="my-4">
                                            <div class="mb-5">

                                                <h4 class="mb-1">Nutrient Value & Benefits</h4>
                                                <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi, tellus iaculis urna
                                                    bibendum
                                                    in lacus, integer. Id imperdiet vitae varius sed magnis eu nisi nunc sit. Vel, varius
                                                    habitant ornare ac rhoncus. Consequat risus facilisis ante ipsum netus risus adipiscing
                                                    sagittis sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                            <div class="mb-5">
                                                <h5 class="mb-1">Storage Tips</h5>
                                                <p class="mb-0">Nisi, tellus iaculis urna bibendum in lacus, integer. Id imperdiet vitae varius sed
                                                    magnis eu
                                                    nisi nunc sit. Vel, varius habitant ornare ac rhoncus. Consequat risus facilisis ante ipsum
                                                    netus risus adipiscing sagittis sed.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                </p>
                                            </div>

                                            <div class="mb-5">
                                                <h5 class="mb-1">Unit</h5>
                                                <p class="mb-0">3 units</p>
                                            </div>
                                            <div class="mb-5">
                                                <h5 class="mb-1">Seller</h5>
                                                <p class="mb-0">DMart Pvt. LTD</p>
                                            </div>
                                            <div>
                                                <h5 class="mb-1">Disclaimer</h5>
                                                <p class="mb-0">Image shown is a representation and may slightly vary from the actual product. Every
                                                    effort
                                                    is made to maintain accuracy of all information displayed.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabindex="0">
                                        <div class="my-4">

                                            <div class="row">
                                                

                                                <div class="col-md-8">
                                                    <div class="mb-10">
                                                   
                                                        

                                                        
                                                        
                                                        
                                                        
                                                        







                                                        <div>
                                                            <a href="#" class="btn btn-outline-gray-400 text-muted">Read More Reviews</a>
                                                        </div>
                                                    </div>
                                                    
                                                    {this.reviews()}


                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    <div class="tab-pane fade" id="sellerInfo-tab-pane" role="tabpanel" aria-labelledby="sellerInfo-tab"
                                        tabindex="0">...</div>
                                </div>
                            </div>




                            <ProductShuffle data={this.props.shuffleProductData}/>




                            







                        </div>





                    </div>



                </section>

                <ProductCarousel data={this.props.RelatedItemData} section="Related Item"/>
                

            </>
        )
    }


}))
