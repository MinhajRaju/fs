import React from "react";

import { connect } from "react-redux";
import store from '../store';
import { RemoveFromCart } from '../Actions/actions';
import { ShippingAddress } from "../Actions/actions";
import { OrderItemSave } from "../Actions/actions";
import {AES, enc}from 'crypto-js';

const mapStateToProps =  (state) =>{

        return {cart: state.CartReducer.cartItems , shippingInfo:state.ShippingReducers.ShippingAddressData}
}


export default connect(mapStateToProps)(class CheckOut extends React.Component{



    constructor(props){
      super(props)
      store.dispatch(ShippingAddress(1))
    
    }

    oderItemSave = () =>{

      store.dispatch(OrderItemSave())

     


    }

    render(){

      const cart = localStorage.getItem('CRT') ? JSON.parse(AES.decrypt(localStorage.getItem('CRT'), 'CARTITEMS').toString(enc.Utf8)) : []
      const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.pqty, 0).toFixed(2)
      const tship = Number(itemsPrice) + 100

        return (
            <>
              <main>
 
  <div class="mt-4">
   
  </div>
  
  <section class="mb-lg-14 mb-8 mt-8">
    <div class="container">

      <div class="row">
    
        <div class="col-12">
          <div>
            <div class="mb-8">
          
              <h1 class="fw-bold mb-0">Checkout</h1>
              <p class="mb-0">Already have an account? Click here to <a href="#!">Sign in</a>.</p>
            </div>
          </div>
        </div>
      </div>
      <div>

        <div class="row">
          <div class="col-lg-7 col-md-12">
        
            <div class="accordion accordion-flush" id="accordionFlushExample">
          
              <div class="accordion-item py-4">

                <div class="d-flex justify-content-between align-items-center">
                
                  <a href="#" class="fs-5 text-inherit collapsed h4"  data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne" aria-expanded="true" aria-controls="flush-collapseOne">
                    <i class="feather-icon icon-map-pin me-2 text-muted"></i>Add delivery address
                  </a>
              
                  <a href="#" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal"
                    data-bs-target="#addAddressModal">Add a new address </a>
                 
                </div>
                <div id="flush-collapseOne" class="accordion-collapse collapse show"
                  data-bs-parent="#accordionFlushExample">
                  <div class="mt-5">
                    <div class="row">

                      {this.props.shippingInfo == undefined ? null : this.props.shippingInfo.map((data)=>{
                        
                        return (

                    <div class="col-lg-6 col-12 mb-4">
                                        
                                        <div class="card card-body p-6 ">
                                          <div class="form-check mb-4">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="homeRadio" checked />
                                            <label class="form-check-label text-dark" for="homeRadio">
                                             
                                            </label>
                                          </div>
                                        
                                          <address> <strong>{data.name}</strong> <br />

                                            {data.region}, <br />

                                            {data.city}, {data.area}<br />

                                            <abbr title="Phone">Phone: {data.phone_number}</abbr></address>
                                         

                                        </div>
                            </div>

                        )

                      })}

                      




                      
                    </div>
                  </div>
                </div>

              </div>
             
              <div class="accordion-item py-4">

                <a href="#" class="text-inherit h5"  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  <i class="feather-icon icon-credit-card me-2 text-muted"></i>Payment Method
              </a>
                <div id="flush-collapseFour" class="accordion-collapse collapse "
                  data-bs-parent="#accordionFlushExample">

                  <div class="mt-5">
                    <div>

                      <div class="card card-bordered shadow-none mb-2">
                     
                        <div class="card-body p-6">
                          <div class="d-flex">
                            <div class="form-check">
                            
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="paypal" />
                              <label class="form-check-label ms-2" for="paypal">

                              </label>
                            </div>
                            <div>
                            
                              <h5 class="mb-1 h6"> Payment with Paypal</h5>
                              <p class="mb-0 small">You will be redirected to PayPal website to complete your purchase
                                securely.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    
                      <div class="card card-bordered shadow-none mb-2">
                       
                        <div class="card-body p-6">
                          <div class="d-flex mb-4">
                            <div class="form-check ">
                          
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="creditdebitcard" />
                              <label class="form-check-label ms-2" for="creditdebitcard">

                              </label>
                            </div>
                            <div>
                              <h5 class="mb-1 h6"> Credit / Debit Card</h5>
                              <p class="mb-0 small">Safe money transfer using your bank accou k account. We support
                                Mastercard tercard, Visa, Discover and Stripe.</p>
                            </div>
                          </div>
                          <div class="row g-2">
                            <div class="col-12">
                            
                              <div class="mb-3">
                                <label class="form-label">Card Number</label>
                                <input type="text" class="form-control" placeholder="1234 4567 6789 4321" />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                             
                              <div class="mb-3 mb-lg-0">
                                <label class="form-label">Name on card </label>
                                <input type="text" class="form-control" placeholder="Enter your first name" />
                              </div>
                            </div>
                            <div class="col-md-3 col-12">
                          
                              <div class="mb-3  mb-lg-0 position-relative">
                                <label class="form-label">Expiry date </label>
                                <input class="form-control flatpickr " type="text" placeholder="Select Date" />
                                <div class="position-absolute bottom-0 end-0 p-3 lh-1">
                                  <i class="bi bi-calendar text-muted"></i>
                                </div>

                              </div>
                            </div>
                            <div class="col-md-3 col-12">
                          
                              <div class="mb-3  mb-lg-0">
                                <label class="form-label">CVV code </label>
                                <input type="password" class="form-control" placeholder="***" />

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
         
                      <div class="card card-bordered shadow-none mb-2">
            
                        <div class="card-body p-6">
                  
                          <div class="d-flex">
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="payoneer" />
                              <label class="form-check-label ms-2" for="payoneer">

                              </label>
                            </div>
                            <div>
                          
                              <h5 class="mb-1 h6"> Pay with Payoneer</h5>
                              <p class="mb-0 small">You will be redirected to Payoneer website to complete your
                                purchase securely.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                      <div class="card card-bordered shadow-none">
                        <div class="card-body p-6">
               
                          <div class="d-flex">
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="cashonDelivery" />
                              <label class="form-check-label ms-2" for="cashonDelivery">

                              </label>
                            </div>
                            <div>
                      
                              <h5 class="mb-1 h6"> Cash on Delivery</h5>
                              <p class="mb-0 small">Pay with cash when your order is delivered.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                      <div class="mt-5 d-flex justify-content-end">
                        <a href="#" class="btn btn-outline-gray-400 text-muted"
                          data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false"
                          aria-controls="flush-collapseThree">Prev</a>
                        <a href="#" class="btn btn-primary ms-2" onClick={this.oderItemSave}>Place Order</a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>


            </div>

          </div>

          <div class="col-12 col-md-12 offset-lg-1 col-lg-4">
            <div class="mt-4 mt-lg-0">
              <div class="card shadow-sm">
                <h5 class="px-6 py-4 bg-transparent mb-0">Order Details</h5>
                <ul class="list-group list-group-flush">
          
                    {this.props.cart == undefined ? null : this.props.cart.map((data)=>{

                        return(

                            <li class="list-group-item px-4 py-3">
                    <div class="row align-items-center">
                      <div class="col-2 col-md-2">
                        <img src="../assets/images/products/product-img-1.jpg" alt="Ecommerce" class="img-fluid" /></div>
                      <div class="col-5 col-md-5">
                        <h6 class="mb-0">{data.title}</h6>
                        <span><small class="text-muted">.98 / lb</small></span>

                      </div>
                      <div class="col-2 col-md-2 text-center text-muted">
                        <span>{data.pqty}</span>

                      </div>
                      <div class="col-3 text-lg-end text-start text-md-end col-md-3">
                        <span class="fw-bold">{data.price *data.pqty}</span>

                      </div>
                    </div>

                  </li>


                        )


                    })}
                  
                  
    
                  
          
                  


                  <li class="list-group-item px-4 py-3">
                    <div class="d-flex align-items-center justify-content-between   mb-2">
                      <div>
                        Item Subtotal

                      </div>
                      <div class="fw-bold">
                        {itemsPrice}

                      </div>

                    </div>
                    <div class="d-flex align-items-center justify-content-between  ">
                      <div>
                        Shipping Fee<i class="feather-icon icon-info text-muted" data-bs-toggle="tooltip"
                          title="Default tooltip"></i>

                      </div>
                      <div class="fw-bold">
                        100

                      </div>

                    </div>

                  </li>
              
                  <li class="list-group-item px-4 py-3">
                    <div class="d-flex align-items-center justify-content-between fw-bold">
                      <div>
                        Subtotal
                      </div>
                      <div>
                        {tship}


                      </div>

                    </div>


                  </li>

                </ul>

              </div>


            </div>
          </div>


        </div>
      </div>


    </div>


  </section>
</main>
            
            </>
        )

    }


})