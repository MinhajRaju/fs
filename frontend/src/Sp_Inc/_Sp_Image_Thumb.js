import React from "react";
import ReactImageMagnify from 'react-image-magnify';
import Carousel from 'react-grid-carousel'
import Rating from "../inc/_Rating";
import { AddToCart } from '../Actions/actions';
import { RecentViewAction } from "../Actions/actions";
import store from "../store";
import {  Form } from 'react-bootstrap'
import { connect } from "react-redux";
import $ from 'jquery'

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
            Sselected:null,
            comment:null,
            indexing:[],
            spinner:false,
            spec:null,
            recent:null
           
        }


    }
    componentDidMount() {
       
      
        setTimeout(this.thumbimage, 1000) 
     
        
        setTimeout(() => {
            this.cvProduct()
            this.svProduct()
           
            this.setState({comment:this.props.data.rc.slice(0,2)})
            
            
            this.setState({indexing:[2]})
            const val  =sessionStorage.getItem('RV')

            


            sessionStorage.setItem('RV' , [...[val] , this.props.data.id])


            
            sessionStorage.setItem('test' ,"TEstst" , 4000)

            console.log(localStorage.getItem('test'))

            this.setState({spec:JSON.parse(this.props.data.spec)})
            const final  =sessionStorage.getItem('RV')

            console.log(final , 'final')
            let split  = final.split(',').slice(1)
            console.log(split)
            let dup = Array.from(new Set(split))
            this.setState({recent:dup})

            localStorage.setItem('RVEXP' ,  new Date().getTime() +7.2e+6)
            
  
           
        }, 1000);

        setTimeout(() => {
                this.recentview()
        }, 2000);
        
       
         /*    
            setInterval(() => {
             
                if(localStorage.getItem('RV')){
        
                if(Number(localStorage.getItem('RVEXP')) < new Date().getTime()){
                    console.log("hit")
                    localStorage.removeItem('RV')
                }else{
                    console.log("not hit")
                }
            }
            }, 1000 );
       
       */
      

    }

    recentview  =  () =>{

        store.dispatch(RecentViewAction(this.state.recent))

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
      


        this.setState({ thumbnail: x })
    }

 

 

    test = (pid , id) =>{


    

 
        

        console.log(pid , id , this.state.thumbnail)
      
        let t = this.props.data.variation.filter((item)=> item.product == pid && item.color == id )


       

        let variationImage = t.filter((item)=>  item.variation_image.length !== 0 )

        console.log(variationImage)

        if(variationImage.length == 0){
            setTimeout(() => {
                this.thumbimage()
            }, 500);
        }else{
            
        let variationImg = []

        variationImage.map((data)=>{
            
            data.variation_image.map((img)=>{
                variationImg.push(img)
            })
        })

        this.setState({thumbnail:variationImg})

        }

   

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


    load = () =>{

        console.log("load" , this.props.data.rc , this.state.indexing)

        this.setState((prevState) => ({
            indexing:[[...prevState.indexing, 2].reduce((acc , item) =>  acc + item , 0)]
          }));

          this.setState({spinner:true})

          
        
          setTimeout(() => {
            
            const t = Number(this.state.indexing)
            console.log("T" ,t)
           
            this.setState({comment:this.props.data.rc.slice(0,t)})
           
            this.setState({spinner:false})

          
           
        }, 200);
       
    }
      
   



    render(){

       
        console.log(this.state.thumbnail)
      
        return(

            <> 
            
      
        
      
            <div class="col-md-5 sticky-xl-top " style={{height:"fit-content"}} >

            <table class="table table-bordered" style={{border:"1px solid rgb(240, 240, 240)" }}>
  <thead>
   <tr>
    <th scope="col" style={{width:"30%"}}>
      {this.state.thumbnail == null ? null : this.state.thumbnail.map((data) => {
    return (
    
            
            <img  onClick={this.productimage} style={{cursor:"pointer"}} width="8%" height="8%" src={`../../assets/static${data.photo}`} />
           
          
          
    )

})}
  </th>
  </tr>
  <tr>
      <th scope="col" > 
      <div class="text-center position-relative " style={{justifyContent:"center", display:"flex" , alignItems:"center"}}>
      <ReactImageMagnify {...{
                                            smallImage: {
                                                alt: 'Wristwatch by Ted Baker London',
                                                isFluidWidth: true,
                                                src: this.state.imagePath,
                                                imageClassName: 'test',
                                            
                                            
                                               
                                            },
                                            largeImage: {
                                                src: this.state.imagePath,
                                                width: 1500,
                                                className: 'test',
                                              
                                                height: 1500
                                            },
                                            enlargedImageContainerDimensions: {
                                                width: '130%',
                                                height: '130%',
                                            
                                               
                                            },
                                            enlargedImageContainerStyle:{
                                                marginLeft:"2pc",
                                                padding:"1pc",
                                                marginTop:"-0.9pc",
                                              
                                               
                                                border:"1px solid rgb(240, 240, 240)"
                                            },
                                          
                                     
                                            shouldUsePositiveSpaceLens: true
                                        }} />
                                            
                                            </div>
                                            </th>
    
    </tr>
    <tr>
        <th style={{border:"none" , display:"flex"}}> <button id="myButton" class="button-87" style={{width:"50%", backgroundColor:"#D1E7DD"}} role="button" onClick={()=>  this.cartAdd(this.props.data.slug , this.state.variationid , this.state.pqty)} ><i class="feather-icon icon-shopping-bag me-2"></i>Add to
                        cart</button>
                        <Form.Control
                                                                        as="select"
                                                                        style={{width:"15%" , margin:"auto"}}
                                                                        value={this.state.pqty == undefined ? 1 : this.state.pqty}
                                                                        onChange={(e) => this.setState({pqty:e.target.value}) }

                                                                    >
                                                                        {

                                                                            this.props.RelatedAttrData == undefined ? this.props.data == undefined ? null : [...Array(parseInt(this.props.data.totalqty)).keys()].map((x) => (
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

                                                                 
                                                                            <p style={{width:"25%" , margin:"auto"}}>{this.props.RelatedAttrData == undefined ?  null:this.props.RelatedAttrData[0].qty < 10 ?  (<>
                                                                            
                                                                            <div><span class="text-uppercase small text-danger">
           Only {this.props.RelatedAttrData[0].qty} Left </span>
        </div>
                                                                        </>) :( <>
                                                                            
                                                                                <div><span class="text-uppercase small text-primary">
               In Stock - </span>{this.props.RelatedAttrData[0].qty}
            </div>
                                                                            </>)}
                                                                            </p>                                                                 

        </th>
        </tr>
        
  </thead>

    </table>
              
                            
                            
                              
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

           
          
        
                   
       
      
            {this.state.test == undefined && this.state.test == null? null : this.state.test.map(( data)=>{

        
return (
    <>
      {data.color.length == 0 ? null : 'Color'} {this.state.Cselected == undefined ? null : (<>: {this.state.Cselected }</>) } 
    <ul class="list-group list-group-horizontal-xl">

   

      { data.color == undefined ||  data.color.length == 0 ? null : data.color.map((d)=>{
    return(

       <>
        <a href="#" class=" focus-ring-color"><li  style={{cursor:"pointer"  , borderRadius:"0px" ,borderColor: "rgb(240, 240, 240)" }} class="list-group-item "  onClick={() => this.test(this.props.data.id  , d.id)}>{d.color}</li></a>
      





       </>
                
    
          
    )
    
})}
   </ul> 
   





    
    </>


)

            }) }

 
            
            
  

     


<div>
    <br/>
</div>










        {this.state.size == undefined && this.state.size== null? null : this.state.size.map(( data)=>{

        
return (
    <>
    
   
{data.size.length == 0 ? null : 'Size'}  {this.state.Sselected == undefined ? null : (<>: {this.state.Sselected} </>) }
  <ul class="list-group list-group-horizontal-xl">

      { data.size == undefined ||  data.size.length == 0 ? null : data.size.map((d)=>{
    return(

       <>
        <a href="#" class=" focus-ring-size"><li  style={{cursor:"pointer"  , borderRadius:"0px" ,borderColor: "rgb(240, 240, 240)" }} class="list-group-item "  onClick={()=> this.fetch(this.props.data.id , this.state.cid , d.id)}  >{d.size}</li></a>






       </>
                
    
          
    )
})}
    
    </ul> 





    
    </>


)

            }) }



   <br/>

  

          
<div class="row"><br/></div>

 
     


   
<div class="container "style={{/* borderTop:"1px solid #f0f0f0",borderLeft:"1px solid #f0f0f0",borderRight:"1px solid #f0f0f0" */  padding:"10px"}}>
    

  <div class="row">

    {this.props.data.highlights == undefined ? null : this.props.data.highlights.length == 0 ? null : (
        <>
          <div class="col-2" style={{fontWeight:600 , color:"#878787" , fontSize:"13px"}}>
      Highlight
    </div>
       
    <div class="col-4">
    <ul>
    {this.props.data.highlights.map((data)=>{

        return (
            <>
             <li>{data}</li>
            
            </>
           
           
        )

    })}
    </ul>
    </div>  

        </>
    
    )

   
        
    }





{this.props.data.services == undefined ? null : this.props.data.services == null ? null : (
        <>
          <div class="col-1" style={{fontWeight:600 , color:"#878787" , fontSize:"13px"}}>
      Services
    </div>
       
    <div class="col-5">
    <ul>
    
            <>
            <p><i class="fa-regular fa-circle-check me-1" style={{color:"#388E3C"}}></i> {this.props.data.services.warrenty}</p>
            {this.props.data.highlights.map((data)=>{

return (
    <>
      <p><i class="fa fa-genderless me-1" style={{color:"#388E3C"}}></i>{data}</p>
    
    </>
   

)

})}
        
            
            
            </>
           
           
        

 
    </ul>
    </div>  

        </>
    
    )

   
        
    }


  </div>







 
  

  {this.props.data.seller == undefined  ? null : this.props.data.seller == null ? null :  (

<div class="row">


<div class="col-2" style={{fontWeight:600 , color:"#878787" , fontSize:"13px"}}>
Seller
</div>

<div class="col-10">





   <p style={{fontSize:"13px"}}> {this.props.data.seller.store_name} &nbsp; <Rating value={this.props.data.seller.srating}/></p>
    

   
   




</div>  
</div>


)



}






<div class="row"><br/></div>


 



















  {this.props.data.sdes == undefined  ? null : this.props.data.sdes == null ? null :  (

        <div class="row">

      
<div class="col-2" style={{fontWeight:600 , color:"#878787" , fontSize:"13px"}}>
      Description
    </div>
       
    <div class="col-10">

   

       
      
           <p style={{fontSize:"13px"}}> {this.props.data.sdes}</p>
            
        
           
           
    

   
   
    </div>  
    </div>
  
    
    )

   
        
    }




</div>

<div class="row"><br/></div>



  
    <div class="container "style={{borderTop:"1px solid #f0f0f0",borderLeft:"1px solid #f0f0f0",borderRight:"1px solid #f0f0f0"}}>
    
        <div class="row">
        <h1 style={{borderBottom:"1px solid #f0f0f0" , padding:"10px"}}>Product Description</h1>
        

        </div>
        
    
    <div class="row" style={{borderBottom:"1px solid #f0f0f0" , padding:"10px"}}>
      <div class="col-md-12"     >
  <p style={{width:"1pc"}} style={{textAlign:"center"}} dangerouslySetInnerHTML={{__html: this.props.data.ldes}}></p>
    </div>

    </div>

    
  




 </div>
    





<br/>
    
  















<div class="row"><br/></div>












{this.props.data.spec == null ? null : (  




<div class="container "style={{borderTop:"1px solid #f0f0f0",borderLeft:"1px solid #f0f0f0",borderRight:"1px solid #f0f0f0"}}>
    
        <div class="row">
        <h1 style={{borderBottom:"1px solid #f0f0f0" , padding:"10px"}}>Spec</h1>
        

        </div>
        {this.state.spec == undefined ? null: Object.keys(this.state.spec).map((key)=>{



        return (
                    

            <div class="row" style={{borderBottom:"1px solid #f0f0f0" , padding:"10px"}}>
            <div class="col-md-2">
           {key}
          </div>
      
          <div class="col-md-9">
            {this.state.spec[key]}
          </div >
          </div>
        
            
            )

        }) }

    
   




 </div>





)}













 <div class="row"><br/></div>





























 

<br/>
    
    {this.props.data.rc.length == 0 ? null : (


 
    <div class="container "style={{borderTop:"1px solid #f0f0f0",borderLeft:"1px solid #f0f0f0",borderRight:"1px solid #f0f0f0", borderBottom:"1px solid #f0f0f0"}}>
    
    <div class="row">
    <h1 style={{borderBottom:"1px solid #f0f0f0" , padding:"10px"}}>Rating & Reviews</h1>
    

    </div>
    

<div class="row" >
  <div class="col-md-12">


           <div class="row" style={{borderBottom:"1px solid #f0f0f0" , padding:"10px"}}>     
           <div class="col-2" style={{textAlign: "center" ,marginTop: "28px"}}>
           <h3>{this.props.data.rating}<i
                   class="bi bi-star-fill ms-1 small "></i></h3>
                <span style={{fontSize:"13px"}}>{this.props.data.rc.filter((item) => item.rating !== null).length} rating  & {this.props.data.rc.length}  review</span>
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

  

    {this.state.comment == undefined ? null : this.state.comment.map((data)=>{

return (
    <div class="row block loadMore"   style={{borderBottom:"1px solid #f0f0f0" , padding:"10px" }}>
<div >

<div class="ms-5">
   
    <div class=" mb-4">

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
     {this.state.spinner == true ? (<div class="spinner-border spinner-border-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div>): this.state.comment ==  null ? null :this.state.comment.length == this.props.data.rc.length ? (<div style={{ color:"green"}} ><b>No more comment</b></div>): (<><div style={{cursor:"pointer" , color:"green"}} onClick={()=> this.load()} id="load"> <b>More comment</b></div></>)} 


</div>  

</div>


</div>

     )}



        </div>
    </div>
)


}
            </>
        )
    }





})

