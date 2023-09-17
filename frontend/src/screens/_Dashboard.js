import React from "react";
import { connect } from "react-redux";

import store from "../store";
import { FlashSaleAction } from "../Actions/actions";
import { TopCategoryAction } from "../Actions/actions";
import { DashProductAction } from "../Actions/actions";


import Slider from "../inc/_Slider";
import Spinner from "../inc/_Spinner";
import ProductCard from "../inc/_Productcard";

const mapStateToProps = (state) => {

    console.log(state)

    return { FlashSaleData: state.FlashSaleReducer.FlashSaleData, FlashLoading: state.FlashSaleReducer.loading, TopCategoryData: state.TopCategoryReducer.TopCategoryData, DashLoading: state.DashProductReducer.loading, DashProductData: state.DashProductReducer.DashProductData }



}






export default connect(mapStateToProps)(class Dashboard extends React.Component {


    constructor(props) {
        super(props)
     



    }

    componentDidMount() {
        store.dispatch(FlashSaleAction())
        store.dispatch(TopCategoryAction(4))
        store.dispatch(DashProductAction())
     

    }





    

    render() {





        return (
            <>



                <Slider />
                <section class="my-lg-14 my-8">

                    <div class="container">

                        <div class="row">
                            <div class="col-12">
                                <div class="mb-8">

                                    <h3 class="mb-0">Top category</h3>
                                </div>
                            </div>

                        </div>

                        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-6 g-6" >


                            {this.props.TopCategoryData === undefined ? null : this.props.TopCategoryData.map((data) => {

                                if (data.parent == null) {

                                    return (
                                        <div class="col" style={{width:"fit-content"}} > <a href="shop-grid.html" class="text-decoration-none text-inherit">

                                            <div class="card card-product" style={{ width:"fit-content" }}>
                                                <div class="card-body text-center py-8"  >


                                                    <div class="text-truncate" style={{ textTransform: "capitalize", color: "black" }}>{data.name}</div>
                                                </div>
                                            </div>
                                        </a></div>

                                    )
                                }



                            })}


                        </div>


                    </div>
                </section>


                <section>

                    <div class="container ">
                        <div class="row">
                            <div class="col-12">


                                <div class="mb-4 bg-light d-lg-flex justify-content-between align-items-center rounded">
                                    <div class="  p-10">

                                        <h2 class="mb-1 fw-bold">One Stop Grocery Shop</h2>
                                        <p class="mb-0 lead">Shopping for your furry friend? Find food,<br />
                                            treats, and more in one easy spot.
                                        </p>
                                        <a href="#" class="btn btn-dark mt-5">Get Discount on Share</a>

                                    </div>
                                    <div class="p-6 d-lg-block d-none"><img src="https://freshcart.codescandy.com/assets/images/svg-graphics/store-graphics.svg" alt=""
                                        class="img-fluid" />
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                </section>




                <section class="my-lg-14 my-8">

                    <div class="container">

                        <div class="row ">


                            <div class="col-xl-12 col-lg-8 col-md-12 mb-6 mb-md-0">


                                <div class="row">
                                    <div class="col-12">
                                        <div class="row align-items-center mb-6">
                                            <div class="col-xl-10 col-lg-9 col-8">
                                                <div class="mb-4 mb-lg-0">
                                                    <h3 class="mb-1">Flash Sale</h3>

                                                </div>
                                            </div>
                                            <div class="col-xl-2 col-lg-3 col-4 text-end">
                                                <a href="#" class="btn btn-light">View All</a>
                                            </div>
                                        </div>
                                        <div class="row row-cols-xl-6 row-cols-lg-3 g-2">
                                            <ProductCard data={this.props.FlashSaleData} tag="Flash Sale" class="item" />
                                        </div>
                                        {this.props.FlashLoading === true ? (
                                            <Spinner />

                                        ) : null}


                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>


                </section>




                <section class="my-lg-14 my-8">
                    <div class="container">
                        <div class="row ">
                            <div class="col-xl-12 col-lg-8 col-md-12 mb-6 mb-md-0">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="row align-items-center mb-6">
                                            <div class="col-xl-10 col-lg-9 col-8">
                                                <div class="mb-4 mb-lg-0">
                                                    <h3 class="mb-1">Just For You </h3>

                                                </div>
                                            </div>
                                            <div class="col-xl-2 col-lg-3 col-4 text-end">
                                                <a href="#" class="btn btn-light">View All</a>
                                            </div>
                                        </div>
                                        <div class="row row-cols-xl-6 row-cols-lg-3 g-2">
                                            <ProductCard data={this.props.DashProductData}  class="item"/>
                                        </div>
                                        {this.props.DashLoading === true ? (
                                            <Spinner />
                                        ) : (<div class="row align-items-center mb-6">
                                            <div class="col-xl-12 col-lg-3 col-4 text-center">
                                                <button onClick={() => store.dispatch(DashProductAction())} class="btn bg-primary text-white" style={{ textTransform: "uppercase" }}>Load More</button>
                                            </div>
                                        </div>)}
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