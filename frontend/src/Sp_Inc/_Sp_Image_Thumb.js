import React from "react";
import ReactImageMagnify from 'react-image-magnify';
import Carousel from 'react-grid-carousel'
import Rating from "../inc/_Rating";
import { AddToCart } from '../Actions/actions';
import store from "../store";
import {  Form } from 'react-bootstrap'
import { connect } from "react-redux";

import { RelatedAttrAction } from "../Actions/actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StickyContainer, Sticky } from 'react-sticky';
import StickyBox from "react-sticky-box";
const mapStateToProps =  (state) =>{

    return {cart: state.CartReducer.cartItems , RelatedAttrData:state.RelatedAttrReducers.RelatedAttrInfo}
}



export default connect(mapStateToProps)(class ImageWithThumb extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            imagePath: null,
            thumbnail: null,
            variationthumb:null,
            variationid: null,
            pqty:1,
            attr :null,
            test:null,
            size:null,
            cid:null,
            Cselected:null,
            Sselected:null
           
        }


    }
    componentDidMount() {
        setTimeout(this.thumbimage, 3000) 
        
        setTimeout(() => {
            this.cvProduct()
            this.svProduct()
           
               

          
           
        }, 2000);
      

    }


    cvProduct = () =>{

            console.log("this is form cv product" )
            let color = []
          
            this.props.data.variation.map(( data)=>{

                console.log(data)
                color.push(data.colors)
             

            })

           
            let c = []
            let t = color.map(JSON.stringify)
            let uniqueset = new Set(t)
            let uniqarray = Array.from(uniqueset).map(JSON.parse)
           

            if(uniqarray[0] == null ){
                this.setState({test:null})    

            }    else{
                let e = {
                    'color':uniqarray
                }
                c.push(e)
                this.setState({test:c})
    

            }
  
            
        
        
    }
    svProduct = () =>{

        console.log("this is form sv product" )
        let size = []
          
        this.props.data.variation.map(( data)=>{

            console.log(data)
            size.push(data.size)
         

        })

       
        let c = []
        let q = size.map(JSON.stringify)
        let uniqueset = new Set(q)
        let uniqarray = Array.from(uniqueset).map(JSON.parse)
    

        
      
        if(uniqarray[0] == null ){
            this.setState({size:uniqarray})    

        }    else{
            let e = {
                'size':uniqarray
            }
            c.push(e)
            this.setState({size:c})
    
    }
    
    

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


    test = (pid , id) =>{

       
        

        console.log(pid , id)
      
        let t = this.props.data.variation.filter((item)=> item.product == pid && item.color == id )

   

        this.setState({Cselected: t[0].colors['color']})

        let size = []
          
        t.map(( data)=>{

            console.log(data)
            size.push(data.size)
         

        })

        console.log("this i sieze arrary"  ,size)
       
        let c = []
        let q = size.map(JSON.stringify)
        let uniqueset = new Set(q)
        let uniqarray = Array.from(uniqueset).map(JSON.parse)
    

        let arr = uniqarray.filter((item)=> item.size != '')
      

    
        let e = {
            'size':arr
        }
        c.push(e)
        this.setState({size:c})

        this.setState({cid:id})




    


    }


    fetch = (pid , cid , id) =>{

        store.dispatch(RelatedAttrAction(pid , cid , id))


      
        

        setTimeout(() => {
            if(this.props.RelatedAttrData != undefined){

        
                this.setState({Sselected:this.props.RelatedAttrData[0].size.size})
    
    
            }
            this.setState({variationid:this.props.RelatedAttrData[0].id})

        }, 1000);
        
        
    }

    cartAdd = (slug , variationid , pqty) =>{

        store.dispatch(AddToCart(slug , variationid , pqty)).then(() =>{

            console.log("then  blog")

           
        })
       
    }



    render(){

        console.log(this.state.size , this.props.RelatedAttrData , this.state.pqty,  this.state.test)

        
      
        return(

            <> 
            <div class="col-md-1 "  >
    

 


        
{this.state.thumbnail == null ? null : this.state.thumbnail.map((data) => {
    return (
    
      
            <img  onMouseOver={this.productimage} width="70%" height="4%" style={{border:"1px solid #b5b0b0" ,margin:"1px"}} src={`../../assets/static${data.photo}`} />
           
 
          
    )

})}
       
        
  
       
            </div>
           
           
      
            <div class="col-md-4 " >
                                <div class="slider slider-for" >
                                    <div class="test" style={{border:"1px solid #999393" , boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>

                                        <ReactImageMagnify {...{
                                            smallImage: {
                                                alt: 'Wristwatch by Ted Baker London',
                                                isFluidWidth: true,
                                                src: this.state.imagePath,
                                                imageClassName: 'test',
                                              
                                               
                                            },
                                            largeImage: {
                                                src: this.state.imagePath,
                                                width: 2500,
                                                className: 'test',
                                             
                                                height: 4500
                                            },
                                            enlargedImageContainerDimensions: {
                                                width: '200%',
                                                height: '115%'
                                            },
                                            shouldUsePositiveSpaceLens: true
                                        }} />

                                    </div>



                                </div>
                                <br />
                                <div >

                                  
                                </div>
                            </div>



                         


                            {this.props.data == undefined ? null :

(
    <div class="col-md-7" style={{ padding: "10px" }}>
        <div class="ps-lg-10 mt-6 mt-md-0">


            <h1 class="mb-1">{this.props.data.title} </h1>
            <div class="mb-4">
                <Rating value={this.props.data.rating} />
                <a href="#" class="ms-2"> {this.props.data.rc.filter((item) => item.rating !== null).length} rating  &{this.props.data.rc.length}  reviews</a></div>
            <div class="fs-4">
                <span class="fw-bold text-dark">&#x09F3;{this.props.data.price}</span> <span
                    class="text-decoration-line-through text-muted">$35</span><span><small class="fs-6 ms-2 text-danger">26%
                        Off</small></span>
            </div>

         

        <br/>

           
          
              
                           
            <div class="row">           
       
      
            {this.state.test == undefined && this.state.test == null? null : this.state.test.map(( data)=>{

        
return (
    <>
        <div class="col-1 custom-border">   

    <p style={{fontSize:"14px",  fontWeight:"bold"}}>{data.color.length == 0 ? null : 'Color'}</p>   

</div>



{ data.color == undefined ||  data.color.length == 0 ? null : data.color.map((d)=>{
    return(

       <>
           <div class="col-1 custom-border">   

<button class="button-13" role="button" onClick={() => this.test(this.props.data.id  , d.id)} >{d.color}</button>

</div>
&nbsp;
       </>
                
    
          
    )
})}


    
    </>


)

            }) }

 
            
            
        </div>

        <div class="row">           
       
      
       {this.state.size == undefined ? null : this.state.size.map(( data)=>{

   
return (
<>
   <div class="col-1 custom-border">   

<p style={{fontSize:"14px",  fontWeight:"bold"}}>{data.size.length == 0 ? null : 'Size'}</p>   

</div>


{ data.size == undefined ||  data.size.length == 0 ? null : data.size.map((d)=>{
return(

  <>
   <div class="col-1 custom-border">   

<button class="button-13" role="button" onClick={()=> this.fetch(this.props.data.id , this.state.cid , d.id)}  >{d.size}</button>   

</div>
&nbsp;
  </>
           
  
     
)
})}



</>


)

       }) }


       
       
   </div>

   <br/>

   <table class="table table-bordered" style={{width:"50%"}}>
    
     <tbody>

     {this.state.Cselected == undefined && this.state.Sselected == undefined ? null :(

<tr>
<td scope="row" style={{width:"30%"}}>Selected</td>
<td>{this.state.Cselected == undefined ? null : this.state.Cselected } &nbsp; {this.state.Sselected == undefined ? null : this.state.Sselected }</td>
</tr>

     )}
   
      {this.props.RelatedAttrData == undefined ? null : (

      <tr>
        <td scope="row">QTY</td>
        <td>{this.props.RelatedAttrData == undefined ?  this.props.data.totalqty : this.props.RelatedAttrData[0].qty } </td>
      </tr>
    )}
       {this.props.RelatedAttrData == undefined ? null : (

                <tr>
                <td scope="row">SKU</td>
                <td>{this.props.RelatedAttrData  == undefined   ? null : this.props.RelatedAttrData[0].sku }</td>
                </tr>
    

    )}

        {this.props.RelatedAttrData == undefined ? null : (

        <tr>
        <td scope="row">Price</td>
        <td>{this.props.RelatedAttrData  == undefined   ? null : this.props.RelatedAttrData[0].sku }</td>
        </tr>
        )}


      </tbody>
          </table>

          
            <hr class="my-6" style={{ border: "none" }} />
            <div class="mb-5">

              
        

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


            <Form.Control
                                                                        as="select"
                                                                        style={{width:"15%"}}
                                                                        value={this.state.pqty == undefined ? 1 : this.state.pqty}
                                                                        onChange={(e) => this.setState({pqty:e.target.value}) }

                                                                    >
                                                                        {

                                                                            this.props.RelatedAttrData == undefined ? [...Array(parseInt(this.props.data.totalqty)).keys()].map((x) => (
                                                                                <option key={x + 1} value={x + 1}>
                                                                                    {x + 1}
                                                                                </option>
                                                                            )) :  [...Array(parseInt(this.props.RelatedAttrData[0].qty )).keys()].map((x) => (
                                                                                <option key={x + 1} value={x + 1}>
                                                                                    {x + 1}
                                                                                </option>
                                                                            ))

                                                                           
                                                                        }

                                                                    </Form.Control>
                   
                

            </div>
            <div class="mt-3 row justify-content-start g-2 align-items-center" >

                <div class="col-xxl-4  d-grid">

                    <button id="myButton" class="button-13" style={{width:"100%", backgroundColor:"#D1E7DD"}} role="button" onClick={()=>  this.cartAdd(this.props.data.slug , this.state.variationid , this.state.pqty)} ><i class="feather-icon icon-shopping-bag me-2"></i>Add to
                        cart</button>
                </div>

            </div>

            <hr class="my-6" style={{ border: "none" }} />

            <div class="container">
  <div class="row">
    <div class="col">
      Column
    </div>
    <div class="col">
      Column
    </div>
    <div class="col">
      Column
    </div>

    <div class="col">
      Column
    </div>
  </div>
</div>

<hr/>



  
    <div class="container "style={{borderTop:"1px solid #f0f0f0",borderLeft:"1px solid #f0f0f0",borderRight:"1px solid #f0f0f0"}}>
    
        <div class="row">
        <h1 style={{borderBottom:"1px solid #f0f0f0" , padding:"10px"}}>Product Description</h1>
        

        </div>
        
    
    <div class="row" style={{borderBottom:"1px solid #f0f0f0" , padding:"10px"}}>
      <div class="col-md-9">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </div>

    <div class="col-md-3">
     <img width="50%" src="https://picsum.photos/seed/picsum/200/300" />
    </div >
    </div>
  




 </div>
    





<br/>
    
  
 <div class="container "style={{borderTop:"1px solid #f0f0f0",borderLeft:"1px solid #f0f0f0",borderRight:"1px solid #f0f0f0"}}>
    
    <div class="row">
    <h1 style={{borderBottom:"1px solid #f0f0f0" , padding:"10px"}}>Specification</h1>
    

    </div>
    

<div class="row" style={{borderBottom:"1px solid #f0f0f0" , padding:"10px"}}>
  <div class="col-md-9">
  <table class="table " >
  <thead>
   
    <tr style={{borderBottom:"1px"}}>
     
      <th  style={{borderBottom:"none" ,width:"20%" }} scope="col">Compoent</th>
      <th scope="col" style={{borderBottom:"none"}}>kabjaha</th>
     
    </tr>
    

    
  </thead>

    </table>
</div>




</div>





</div>

<br/>

 
<div class="container "style={{borderTop:"1px solid #f0f0f0",borderLeft:"1px solid #f0f0f0",borderRight:"1px solid #f0f0f0"}}>
    
    <div class="row">
    <h1 style={{borderBottom:"1px solid #f0f0f0" , padding:"10px"}}>Rating & Reviews</h1>
    

    </div>
    

<div class="row" >
  <div class="col-md-12">


           <div class="row" style={{borderBottom:"1px solid #f0f0f0" , padding:"10px"}}>     
           <div class="col-2" style={{textAlign: "center" ,marginTop: "28px"}}>
           <h3>{this.props.data.rating}<i
                   class="bi bi-star-fill ms-1 small "></i></h3>
                <span style={{fontSize:"13px"}}>{this.props.data.rc.filter((item) => item.rating !== null).length.to} rating  & {this.props.data.rc.length}  review</span>
            </div>                                                          
          <div class="col-4">
             
             <div class="d-flex align-items-center mb-2">
                <div class="text-nowrap me-3 text-muted"><span
                   class="d-inline-block align-middle text-muted">5</span><i
                   class="bi bi-star-fill ms-1 small "></i></div>
                <div class="w-100">
                   <div class="progress" style={{height: "6px"}}>
                                                                        
                      
                      <div class= {(this.props.data.rc.filter((item) => item.rating == 5).length / this.props.data.rc.filter((item) => item.rating != null).length)*100 == 25 ? "progress-bar bg-warning" : "progress-bar bg-success"}  role="progressbar" style={{width: `${(this.props.data.rc.filter((item) => item.rating == 5).length / this.props.data.rc.filter((item) => item.rating != null).length)*100}%`}}
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                   </div>
                </div>
                <span class="text-muted ms-3">{this.props.data.rc.filter((item) => item.rating == 5).length}</span>
             </div>
             
             <div class="d-flex align-items-center mb-2">
                <div class="text-nowrap me-3 text-muted"><span
                   class="d-inline-block align-middle text-muted">4</span><i
                   class="bi bi-star-fill ms-1 small "></i></div>
                <div class="w-100">
                   <div class="progress" style={{height: "6px"}}>
                   <div class= {(this.props.data.rc.filter((item) => item.rating == 4).length / this.props.data.rc.filter((item) => item.rating != null).length)*100 == 25 ? "progress-bar bg-warning" : "progress-bar bg-success"}  role="progressbar" style={{width: `${(this.props.data.rc.filter((item) => item.rating == 4).length / this.props.data.rc.filter((item) => item.rating != null).length)*100}%`}}
                        aria-valuenow="50" aria-valuemin="0" aria-valuemax="50"></div>
                   </div>
                </div>
                <span class="text-muted ms-3">{this.props.data.rc.filter((item) => item.rating == 4).length}</span>
             </div>
            
             <div class="d-flex align-items-center mb-2">
                <div class="text-nowrap me-3 text-muted"><span
                   class="d-inline-block align-middle text-muted">3</span><i
                   class="bi bi-star-fill ms-1 small "></i></div>
                <div class="w-100">
                   <div class="progress" style={{height: "6px"}}>
                   <div class= {(this.props.data.rc.filter((item) => item.rating == 3).length / this.props.data.rc.filter((item) => item.rating != null).length)*100 == 25 ? "progress-bar bg-warning" : "progress-bar bg-success"}  role="progressbar" style={{width: `${(this.props.data.rc.filter((item) => item.rating == 3).length / this.props.data.rc.filter((item) => item.rating != null).length)*100}%`}}
                        aria-valuenow="35" aria-valuemin="0" aria-valuemax="35"></div>
                   </div>
                </div>
                <span class="text-muted ms-3">{this.props.data.rc.filter((item) => item.rating == 3).length}</span>
             </div>
            
             <div class="d-flex align-items-center mb-2">
                <div class="text-nowrap me-3 text-muted"><span
                   class="d-inline-block align-middle text-muted">2</span><i
                   class="bi bi-star-fill ms-1 small "></i></div>
                <div class="w-100">
                   <div class="progress" style={{height: "6px"}}>
                   <div class= {(this.props.data.rc.filter((item) => item.rating == 2).length / this.props.data.rc.filter((item) => item.rating != null).length)*100 <= 25 ? "progress-bar bg-success" : "progress-bar bg-danger"}  role="progressbar" style={{width: `${(this.props.data.rc.filter((item) => item.rating == 2).length / this.props.data.rc.filter((item) => item.rating != null).length)*100}%`}}
                     aria-valuenow="22" aria-valuemin="0" aria-valuemax="22"></div>
                   </div>
                </div>
                <span class="text-muted ms-3">{this.props.data.rc.filter((item) => item.rating == 2).length}</span>
             </div>
            
             <div class="d-flex align-items-center mb-2">
                <div class="text-nowrap me-3 text-muted"><span
                   class="d-inline-block align-middle text-muted">1</span><i
                   class="bi bi-star-fill ms-1 small  "></i></div>
                <div class="w-100">
                   <div class="progress" style={{height: "6px"}}>
                   <div class= {(this.props.data.rc.filter((item) => item.rating == 1).length / this.props.data.rc.filter((item) => item.rating != null).length)*100 <= 25 ? "progress-bar bg-success" : "progress-bar bg-danger"}  role="progressbar" style={{width: `${(this.props.data.rc.filter((item) => item.rating == 1).length / this.props.data.rc.filter((item) => item.rating != null).length)*100}%`}}
                    aria-valuenow="14" aria-valuemin="0" aria-valuemax="14"></div>
                   </div>
                </div>
                <span class="text-muted ms-3">{this.props.data.rc.filter((item) => item.rating == 1).length}</span>
             </div>
          </div>
</div>

   


    {this.props.data == undefined ? null : this.props.data.rc.map((data)=>{

return (
    <div class="row" style={{borderBottom:"1px solid #f0f0f0" , padding:"10px"}}>
<div >

<div class="ms-5">
   
    <div class=" mb-2">

        <Rating value={data.rating}/>


        <span class="ms-3 text-dark fw-bold">Title</span>
    </div>

    <p>{data.comment}</p>
    <div>
        <div class="border icon-shape icon-lg border-2 ">
            <img src="../assets/images/products/product-img-1.jpg" alt=""
                class="img-fluid " />
        </div>
      
    <div class="row">
        <br/>
    </div>

    <p class="small"> <span class="text-muted" style={{fontWeight:"800" , textTransform:"capitalize"}}> {data.customer.user.username} , 30 December 2022</span>
        <span class="text-primary ms-3 fw-bold">Verified Purchase</span></p>

    </div>

   
</div>
</div>

</div>
)

})}
    


</div>  

</div>


</div>




        </div>
    </div>
)

}
            </>
        )
    }


})