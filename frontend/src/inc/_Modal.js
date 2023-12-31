import React from 'react'

import { connect } from 'react-redux';
import store from '../store';
import { RemoveFromCart } from '../Actions/actions';
import {  Form } from 'react-bootstrap'
import { AddToCart } from "../Actions/actions";
import { CustomerloginAction } from "../Actions/actions";
import { Link } from 'react-router-dom';
import {AES, enc}from 'crypto-js';

const mapStateToProps = (state) =>{

    return {cart: state.CartReducer.cartItems ,CustomerInfo:state.CustomerLoginReducers.CustomerInfo}

}

export default connect(mapStateToProps)(class Modal extends React.Component {


    
  constructor(props){
    super(props)

    this.state = {
      email:null,
    
      pass:null
    }

  }

  
  submit =  (e) =>{
    e.preventDefault()
    store.dispatch(CustomerloginAction(this.state.email,this.state.pass)).then(()=>{

    const  data = this.props.CustomerInfo

    if(data.customer.length == 0){
      console.log("this is not a customer acccoutn")
    }
    else{

     
      window.location.reload()
     
    }
    }).catch((err)=>{
        
      //console.log(err)

    })


  }
  



    render() {
      

      const cart = localStorage.getItem('CRT') ? JSON.parse(AES.decrypt(localStorage.getItem('CRT'), 'CARTITEMS').toString(enc.Utf8)) : [];

      const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.pqty, 0).toFixed(2)
      

        return (
            <>
               <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header border-bottom">
                        <div class="text-start">
                            <h5 id="offcanvasRightLabel" class="mb-0 fs-4">Check List</h5>
                       
                        </div>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">

                        <div class="">

                            <div class="alert alert-danger p-2" role="alert">
                                You’ve got FREE delivery. Start <a href="#!" class="alert-link">checkout now!</a>
                            </div>
                            <ul class="list-group list-group-flush">




                                 {this.props.cart == undefined ? "empty" : this.props.cart.map((data)=>{


                                    return (
<li class="list-group-item py-3 ps-0 border-bottom">

                                    <div class="row align-items-center">
                                        <div class="col-6 col-md-6 col-lg-7">
                                            <div class="d-flex">
                                                <img src="../assets/images/products/product-img-5.jpg" alt="Ecommerce"
                                                    class="icon-shape icon-xxl" />
                                                <div class="ms-3">

                                                    <a href="shop-single.html" class="text-inherit">
                                                        <h6 class="mb-0">{data.title}</h6>
                                                    </a>
                                        

                                                    <div class="mt-2 small lh-1"> <a href="#!" onClick={()=> store.dispatch(RemoveFromCart(data.product))} class="text-decoration-none text-inherit"> <span
                                                        class="me-1 align-text-bottom">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                            class="feather feather-trash-2 text-success">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                            </path>
                                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        </svg></span><span  class="text-muted">Remove</span></a></div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-4 col-md-3 col-lg-3">

                                        <div class="input-group input-spinner  ">
                  
                   
                  </div>

                                           
                                        </div>

                                        <div class="col-2 text-lg-end text-start text-md-end col-md-2">
                                            <span class="fw-bold">&#x09F3;{data.pqty * data.price}</span>
                                            <div class="text-decoration-line-through text-muted small">$25.00</div>
                                        </div>
                                    </div>

                                </li>
                                    )

                                 })}   

                                






                            </ul>

                            <div class="d-flex justify-content-between mt-4">
                            <a href="/checkout/" >Checkout</a>
                            <span class="fw-bold">Total :  &#x09F3; {itemsPrice}</span>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content p-4">
                            <div class="modal-header border-0">
                              

                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                   
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Email address</label>
                                        <input onChange={(e) => this.setState({email:e.target.value})} type="email" class="form-control" id="inputEmail4" placeholder="Email" required />
                                    </div>

                                    <div class="mb-5">
                                        <label for="password" class="form-label">Password</label>
                                        <input onChange={(e) => this.setState({pass:e.target.value})} type="password" id="fakePassword" placeholder="Enter Password" class="form-control" required />
                                        
                                    </div>

                                  <button type="submit" onClick={(e)=> this.submit(e)} class="btn btn-primary">Login</button>
                                </form>
                            </div>
                            <div class="modal-footer border-0 justify-content-center">

                               Create a account? <a href="/signup" target="_blank" >Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>




                <div class="modal fade" id="addAddressModal" tabindex="-1" aria-labelledby="addAddressModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-body p-6">
          <div class="d-flex justify-content-between mb-5">

            <div>
              <h5 class="h6 mb-1" id="addAddressModalLabel">New Shipping Address</h5>
              <p class="small mb-0">Add new shipping address for your order delivery.</p>
            </div>
            <div>
       
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          </div>

          <div class="row g-3">
           
            <div class="col-12">
              <input type="text" class="form-control" placeholder="Name" aria-label="First name" required="" />
            </div>
                          <div class="col-12">
                  
                  <input type="text" class="form-control" placeholder="Phone Number" />
                </div>
                        
                    
         
           
         
            <div class="col-12">
            
              <select class="form-select">
                <option selected=""> India</option>
                <option value="1">UK</option>
                <option value="2">USA</option>
                <option value="3">UAE</option>
              </select>
            </div>
            <div class="col-12">
             
              <select class="form-select">
                <option selected="">Gujarat</option>
                <option value="1">Northern Ireland</option>
                <option value="2"> Alaska</option>
                <option value="3">Abu Dhabi</option>
              </select>
            </div>
            <div class="col-12">
             
             <select class="form-select">
               <option selected="">x</option>
               <option value="1">r Ireland</option>
               <option value="2"> w</option>
               <option value="3">Abu z</option>
             </select>
           </div>
       
     
       
            <div class="col-12 text-end">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
              <button class="btn btn-primary" type="button">Save Address</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>  




            </>
        )
    }
})

