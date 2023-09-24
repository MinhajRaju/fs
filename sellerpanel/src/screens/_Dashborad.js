import React from "react";
import { connect } from "react-redux";

import store from "../store";









export default connect()(class Dashboard extends React.Component {


    constructor(props) {
        super(props)
     



    }




    

    render() {





        return (
            <>



<section class="container">
                   
                    <div class="row mb-8">
                        <div class="col-md-12">
                           
                        </div>
                    </div>
                   

                        <div class="row">
                            <div class="col-lg-4 col-12 mb-6">
                              
                                <div class="card h-100 card-lg">
                                  
                                    <div class="card-body p-6">
                                      
                                        <div class="d-flex justify-content-between align-items-center mb-6">
                                            <div>
                                                <h4 class="mb-0 fs-5">Earnings</h4>
                                            </div>
                                            <div
                                                class="icon-shape icon-md bg-light-danger text-dark-danger rounded-circle">
                                                <i class="bi bi-currency-dollar fs-5"></i>
                                            </div>
                                        </div>
                                       
                                        <div class="lh-1">
                                            <h1 class=" mb-2 fw-bold fs-2">$93,438.78</h1>
                                            <span>Monthly revenue</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-12 mb-6">
                              
                                <div class="card h-100 card-lg">
                               
                                    <div class="card-body p-6">
                                     
                                        <div class="d-flex justify-content-between align-items-center mb-6">
                                            <div>
                                                <h4 class="mb-0 fs-5">Orders</h4>
                                            </div>
                                            <div
                                                class="icon-shape icon-md bg-light-warning text-dark-warning rounded-circle">
                                                <i class="bi bi-cart fs-5"></i>
                                            </div>
                                        </div>
                                        
                                        <div class="lh-1">
                                            <h1 class=" mb-2 fw-bold fs-2">42,339</h1>
                                            <span><span class="text-dark me-1">35+</span>New Sales</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-12 mb-6">
                           
                                <div class="card h-100 card-lg">
                                   
                                    <div class="card-body p-6">
                                      
                                        <div class="d-flex justify-content-between align-items-center mb-6">
                                            <div>
                                                <h4 class="mb-0 fs-5">Customer</h4>
                                            </div>
                                            <div class="icon-shape icon-md bg-light-info text-dark-info rounded-circle">
                                                <i class="bi bi-people fs-5"></i>
                                            </div>
                                        </div>
                                        
                                        <div class="lh-1">
                                            <h1 class=" mb-2 fw-bold fs-2">39,354</h1>
                                            <span><span class="text-dark me-1">30+</span>new in 2 days</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                  
                    <div class="row ">
              
                        <div class="col-xl-4 col-lg-6 col-12 mb-6">
                          
                            <div class="card h-100 card-lg">
                              
                                <div class="card-body p-6">
                               
                                    <h3 class="mb-0 fs-5">Total Sales </h3>
                                    <div id="totalSale" class="mt-6 d-flex justify-content-center"></div>
                                    <div class="mt-4">
                                       
                                        <ul class="list-unstyled mb-0">
                                            <li class="mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="8"
                                                    height="8" fill="currentColor"
                                                    class="bi bi-circle-fill text-primary" viewBox="0 0 16 16">
                                                    <circle cx="8" cy="8" r="8" />
                                                </svg> <span class="ms-1"><span class="text-dark">Shippings
                                                        $32.98</span> (2%)</span></li>
                                            <li class="mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="8"
                                                    height="8" fill="currentColor"
                                                    class="bi bi-circle-fill text-warning" viewBox="0 0 16 16">
                                                    <circle cx="8" cy="8" r="8" />
                                                </svg> <span class="ms-1"><span class="text-dark">Refunds $11</span>
                                                    (11%)</span></li>
                                            <li class="mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="8"
                                                    height="8" fill="currentColor" class="bi bi-circle-fill text-danger"
                                                    viewBox="0 0 16 16">
                                                    <circle cx="8" cy="8" r="8" />
                                                </svg> <span class="ms-1"><span class="text-dark">Order $14.87</span>
                                                    (1%)</span></li>
                                            <li><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"
                                                    fill="currentColor" class="bi bi-circle-fill text-info"
                                                    viewBox="0 0 16 16">
                                                    <circle cx="8" cy="8" r="8" />
                                                </svg> <span class="ms-1"><span class="text-dark">Income 3,271</span>
                                                    (86%)</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                    
                
                    
                </section>
   
            </>


        )




    }
})