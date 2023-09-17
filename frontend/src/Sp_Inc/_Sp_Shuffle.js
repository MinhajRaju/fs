import React from "react";

export default class  ProductShuffle  extends React.Component{

  
    
    render(){
        
        return (
            <>
            <div class="col-md-3 col-12" style={{ background: "rgba(247, 247, 247, 0.48)", paddingTop: "23px" }}>

                                            
                    {this.props.data === undefined ? null : this.props.data.map((data)=>{

                        return (
                    <div class="card-body" style={{ padding: "50px" }}>
                        <div class="text-center position-relative ">

                            <a href="#!"> <img src="../../assets/images/products/product-img-1.jpg" alt="Grocery Ecommerce Template"
                                class="mb-3 img-fluid" /></a>

                        </div>
                        <div class="text-small mb-1"><a href="#!" class="text-decoration-none text-muted"><small>Snack &
                            Munchies</small></a></div>
                        <h2 class="fs-6"><a href="../../pages/shop-single.html" class="text-inherit text-decoration-none">{data.title}</a></h2>

                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <div><span class="text-dark">$18</span> <span
                                class="text-decoration-line-through text-muted">$24</span>
                            </div>
                            <div><a href="#!" class="btn btn-primary btn-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-plus">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg> Add</a></div>
                        </div>

                    </div>
                        )


                    })}  
            </div>
            </>
        )
    }


}