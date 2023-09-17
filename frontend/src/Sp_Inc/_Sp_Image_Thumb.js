import React from "react";
import ReactImageMagnify from 'react-image-magnify';
import Carousel from 'react-grid-carousel'
import Rating from "../inc/_Rating";
import { AddToCart } from '../Actions/actions';
import store from "../store";
import {  Form } from 'react-bootstrap'
import { connect } from "react-redux";


const mapStateToProps =  (state) =>{

    return {cart: state.CartReducer.cartItems}
}



export default connect(mapStateToProps)(class ImageWithThumb extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            imagePath: null,
            thumbnail: null,
            variationthumb:null,
            variationid: null,
            pqty:null
           
           
        }


    }
    componentDidMount() {
        setTimeout(this.thumbimage, 3000)   
      

    }

    productimage = (e) => {
        this.setState({ imagePath: e.target.getAttribute('src') })
    }


    


    thumbimage = () => {

        if (this.props.data) {
            this.setState({ imagePath: `../../assets/static${this.props.data.image[0].photo}` })

        }

        let x = []

        this.props.data.image.map((data) => {
            x.push(data)
        })
        this.props.data.variation.map((data) => {
            data.variation_image.map((data) => {
                x.push(data)
            })
        })


        this.setState({ thumbnail: x })
    }

    variationimage = (id) => {
        this.setState({variationid:id})
        const x = this.props.data.variation.filter(data => data.id == id)

        let y = []
        x.map((data) => {
            data.variation_image.map((data) => {
                y.push(data)
            })
        })

        this.setState({ variationthumb: y })

    }

    closethumb = () => {
        this.setState({ variationthumb: null })
    }



    render(){

        console.log("from ----------" ,this.props.cart)
        return(

            <>
            <div class="col-md-3">
                                <div class="slider slider-for" style={{ padding: "10px" }}>
                                    <div class="test">

                                        <ReactImageMagnify {...{
                                            smallImage: {
                                                alt: 'Wristwatch by Ted Baker London',
                                                isFluidWidth: true,
                                                src: this.state.imagePath,
                                                imageClassName: 'test'
                                            },
                                            largeImage: {
                                                src: this.state.imagePath,
                                                width: 1200,
                                                className: 'test',

                                                height: 1800
                                            },
                                            enlargedImageContainerDimensions: {
                                                width: '100%',
                                                height: '100%'
                                            },
                                            shouldUsePositiveSpaceLens: true
                                        }} />

                                    </div>



                                </div>
                                <br />
                                <div >

                                    <Carousel cols={6} rows={1} gap={10} hideArrow={this.state.thumbnail == null ? true : this.state.thumbnail.length < 6 ? true : false} loop>

                                        {this.state.thumbnail == null ? null : this.state.thumbnail.map((data) => {
                                            return (
                                                <Carousel.Item>
                                                    <img onMouseOver={this.productimage} width="100%" src={`../../assets/static${data.photo}`} />
                                                </Carousel.Item>
                                            )

                                        })}


                                    </Carousel>
                                </div>
                            </div>



                            {this.props.data == undefined ? null :

(
    <div class="col-md-5" style={{ padding: "10px" }}>
        <div class="ps-lg-10 mt-6 mt-md-0">


            <h1 class="mb-1">{this.props.data.title} </h1>
            <div class="mb-4">
                <Rating value={this.props.rating} />
                <a href="#" class="ms-2">({this.props.data.rc.length}  reviews)</a></div>
            <div class="fs-4">
                <span class="fw-bold text-dark">&#x09F3;{this.props.data.price}</span> <span
                    class="text-decoration-line-through text-muted">$35</span><span><small class="fs-6 ms-2 text-danger">26%
                        Off</small></span>
            </div>

            <hr class="my-6" style={{ border: "none" }} />
            <div class="mb-5">

                {this.props.data.variation.map((data) => {
                    return (
                        <>
                            <button onClick={() => this.variationimage(data.id)} type="button" class="btn btn-outline-secondary">{data.color}</button>&nbsp;
                        </>

                    )


                })}


                <hr class="my-6" style={{ border: "none" }} />

                <div >
                    {this.state.variationthumb === null ? null : this.state.variationthumb.map((data) => {
                        return (
                            <>

                                <img onClick={this.productimage} width="20%" height="30%" src={`../../assets/static${data.photo}`} />&nbsp;
                            </>
                        )
                    })}


                </div> 

                {this.state.variationthumb === null ? null : (<button onClick={this.closethumb} type="button" class="btn-close me-2 m-auto" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>)}

            </div>

            <div>



                <div class="input-group input-spinner  ">
                <Form.Control
                                                                        as="select"
                                                                        value={this.props.cart.length == 0 ? null : this.props.cart[0].pqty}
                                                                        onChange={(e) => this.setState({pqty:e.target.value}) }

                                                                    >
                                                                        {

                                                                            [...Array(parseInt(this.props.data.totalqty)).keys()].map((x) => (
                                                                                <option key={x + 1} value={x + 1}>
                                                                                    {x + 1}
                                                                                </option>
                                                                            ))
                                                                        }

                                                                    </Form.Control>
                </div>

            </div>
            <div class="mt-3 row justify-content-start g-2 align-items-center" >

                <div class="col-xxl-4  d-grid">

                    <button onClick={()=>  store.dispatch(AddToCart(this.props.data.slug , this.state.variationid , this.state.pqty))} type="button" class="btn btn-primary"><i class="feather-icon icon-shopping-bag me-2"></i>Add to
                        cart</button>
                </div>

            </div>

            <hr class="my-6" style={{ border: "none" }} />

        </div>
    </div>
)

}
            </>
        )
    }


})