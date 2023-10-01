import React from "react";



export default  class Rating extends React.Component{

    render(){
        return(

       

            <>
            <small class="text-warning"> 
                  {this.props.value== null ? "Rating not given " : ( <> <span class="badge bg-light-success text-dark-success">{this.props.value} &nbsp;<i class="fa-solid fa-star"></i></span></>)} 
                  
            </small>
            </>
        )
    }


} 