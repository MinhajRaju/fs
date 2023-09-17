import React from "react";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';

export default class Slider extends React.Component {

    render() {
        const slideImages = [
            {
                url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
                caption: 'Slide 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
                caption: 'Slide 2'
            },
            {
                url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
                caption: 'Slide 3'
            },
        ];
        return (
            <>

                <section class="mt-8">
                    <div class="container">
                        <div class="hero-slider ">
                            <Slide easing="ease" pauseOnHover={true} arrows={false} indicators={true}>
                                {slideImages.map((slideImage, index) => (

                                    /*
                                    <div key={index}>
                                    <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                                        <span style={spanStyle}>{slideImage.caption}</span>
                                    </div>
                                    </div>
                                    */     <div key={index}

                                        style={{ background: "url(/assets/images/slider/hero-img-slider-1.jpg)no-repeat", backgroundSize: "cover", borderRadius: ".5rem", backgroundPosition: "center" }}>
                                        <div class="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-xs-center">
                                            <span class="badge text-bg-warning">Opening Sale Discount 50%</span>

                                            <h2 class="text-dark display-5 fw-bold mt-4">SuperMarket Daily <br /> Fresh Grocery </h2>
                                            <p class="lead">Introduced a new model for online grocery shopping
                                                and convenient home delivery.</p>
                                            <a href="#!" class="btn btn-dark mt-3">Shop Now <i class="feather-icon icon-arrow-right ms-1"></i></a>
                                        </div>
                                    </div>
                                ))}
                            </Slide>
                        </div>
                    </div>
                </section>

                <section class="mt-8">
                    <div class="container">

                        <div class="table-responsive-xl pb-6 pb-xl-0">
                            <div class="row flex-nowrap">
                                <div class="col-12 col-xl-4 col-lg-6">
                                    <div class="p-8 mb-3 rounded" style={{ background: "url(../assets/images/banner/ad-banner-1.jpg)no-repeat", backgroundSize: "cover" }}>
                                        <div>


                                            <h3 class="mb-0 fw-bold">10% cashback on <br />
                                                personal care </h3>
                                            <div class="mt-4 mb-5 fs-5">
                                                <p class="mb-0">Max cashback: $12</p>
                                                <span>Code: <span class="fw-bold text-dark">CARE12</span></span>
                                            </div>
                                            <a href="#" class="btn btn-dark">Shop Now</a>
                                        </div>

                                    </div>

                                </div>
                                <div class="col-12 col-xl-4 col-lg-6">
                                    <div class="p-8 mb-3 rounded" style={{ background: "url(../assets/images/banner/ad-banner-1.jpg)no-repeat", backgroundSize: "cover" }}>


                                        <div>
                                            <h3 class=" fw-bold mb-3">Say yes to <br />
                                                season’s fresh </h3>
                                            <div class="mt-4 mb-5 fs-5">
                                                <p class="fs-5 mb-0">Refresh your day <br />
                                                    the fruity way</p>
                                            </div>


                                            <a href="#" class="btn btn-dark">Shop Now</a>
                                        </div>

                                    </div>

                                </div>
                                <div class="col-12 col-xl-4 col-lg-6">
                                    <div class="p-8 mb-3 rounded" style={{ background: "url(../assets/images/banner/ad-banner-1.jpg)no-repeat", backgroundSize: "cover" }}>


                                        <div>

                                            <h3 class=" fw-bold mb-3">When in doubt,<br />
                                                eat ice cream </h3>
                                            <div class="mt-4 mb-5 fs-5">
                                                <p class="fs-5 mb-0">Enjoy a scoop of<br />
                                                    summer today</p>
                                            </div>


                                            <a href="#" class="btn btn-dark">Shop Now</a>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </>
        )

    }


}