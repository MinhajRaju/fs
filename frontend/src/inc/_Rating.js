import React from "react";



export default  class Rating extends React.Component{

    render(){
        return(

       

            <>
            <small class="text-warning"> 
                  {this.props.value== null ? "Rating not given " : ( <><p style={{color:"white" ,display:"inline"}}> <span  style={{background:"#388E3C" ,padding:"6px" , borderRadius:"7px"}}>{this.props.value} &nbsp;<i class="fa-solid fa-star"></i></span></p></>)} 
                  
            </small>
            </>
        )
    }


} 