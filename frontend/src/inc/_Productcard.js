import React from "react";

import Rating from "./_Rating";
import { AddToCart } from "../Actions/actions";
import store from "../store";
import { Link } from "react-router-dom";

import {AES, enc}from 'crypto-js';

export default class ProductCard extends React.Component {



    addToCart = (slug) =>{
        const customerInfo = localStorage.getItem('CI')
        console.log(customerInfo)

        if(customerInfo){
            store.dispatch(AddToCart(slug))
        }
      

 

    }


    render() {
       
        

        return (
            <>

               

                {this.props.data == undefined ? null : this.props.data.map((data) => {

                    return (
                        <div  class={this.props.class}>

                            <div class="card card-product mb-lg-4"  style={{border:"none"}}>
                                <div  class="card-body">

                                    <div class="text-center position-relative " style={{height:"18pc" , justifyContent:"center", display:"flex" , alignItems:"center"}}>
                                        <div class=" position-absolute top-0 start-0">
                                            <span class="badge bg-danger">{this.props.tag}</span>
                                        </div>
                                    

                                        <Link to={`/product/${data.slug}`}> <img class="card-img-top" src={data.image.length == 0 ? 'noiamage' : data.image[0].thumbnail}
                                            alt="Grocery Ecommerce Template" class="mb-3 img-fluid" /></Link>
                                     
                               


                                    </div>

                                    
                                    <h2 style={{fontSize:"14px" , fontFamily:"Open Sans ,  sans-serif" , fontWeight:"500" ,}} ><Link to={`/product/${data.slug}`} class="text-inherit text-decoration-none">{data.title.trim().length <= 42 ? data.title.substring(0,42) : data.title.substring(0,42) + '....'}</Link>
                                    </h2>
                                    <div>

                                        <Rating value={data.rating}/><span
                                                class="text-muted small">&nbsp;{data.rating}</span>
                                    </div>

                                    <div class="d-flex justify-content-between align-items-center mt-3">
                                        <div><span class="text-dark">{data.price}</span> <span
                                            class="text-decoration-line-through text-muted"></span>
                                        </div>

                     
                                        
                                    
                                    </div>
                                </div>


                            </div>

                        </div>

                    )
                })}



            </>
        )

    }


}