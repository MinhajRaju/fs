import React from "react";

import Rating from "./_Rating";
import { AddToCart } from "../Actions/actions";
import store from "../store";

export default class ProductCard extends React.Component {

    render() {
       
        console.log(this.props.message)


        return (
            <>

                {this.props.message !== null ? this.props.message : null}

                {this.props.data == undefined ? null : this.props.data.map((data) => {

                    return (
                        <div class={this.props.class}>

                            <div class="card card-product mb-lg-4">
                                <div class="card-body">

                                    <div class="text-center position-relative ">
                                        <div class=" position-absolute top-0 start-0">
                                            <span class="badge bg-danger">{this.props.tag}</span>
                                        </div>

                                        <a href={`/product/${data.slug}`}> <img src="../assets/images/products/product-img-15.jpg"
                                            alt="Grocery Ecommerce Template" class="mb-3 img-fluid" /></a>


                                    </div>

                                    <div class="text-small mb-1">
                                        
                                        {data.category.map((data)=>{
                                            return(
                                                <>
                                                
                                                <a href={`/category/${data.name}`}
                                                class="text-decoration-none text-muted" style={{textTransform:"capitalize"}}><small>
                                                     {`${data.name}`}</small></a>

                                                    
                                                   
                                                </>
                                        

                                                

                                            )

                         
                                          

                                        })}
                                       
                                  

                                  



                                    </div>
                                    <h2 class="fs-6"><a href={`/product/${data.slug}`} class="text-inherit text-decoration-none">{data.title}</a>
                                    </h2>
                                    <div>

                                        <Rating value={data.rating}/><span
                                                class="text-muted small">&nbsp;{data.rating}</span>
                                    </div>

                                    <div class="d-flex justify-content-between align-items-center mt-3">
                                        <div><span class="text-dark">{data.price}</span> <span
                                            class="text-decoration-line-through text-muted"></span>
                                        </div>

                                        {data.variation.length == 0 ?(
    <div>
    <a href="#!" onClick={()=> store.dispatch(AddToCart(data.slug))} class="btn btn-primary btn-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-plus">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add
    </a>
</div>
                                        ) :  null}
                                        
                                    
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