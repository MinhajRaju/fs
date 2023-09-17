import React from "react";



export default  class Rating extends React.Component{

    render(){
        return(

       

            <>
            <small class="text-warning"> 
                    <i class={this.props.value >= 1 ?"fas fa-star" : this.props.value >= 0.5 ?"fas fa-star-half-alt" :'far fa-star' }></i>
                    <i class={this.props.value >= 2 ?"fas fa-star" : this.props.value >= 1.5 ?"fas fa-star-half-alt" :'far fa-star' }></i>                          
                    <i class={this.props.value >= 3 ?"fas fa-star" : this.props.value >= 2.5 ?"fas fa-star-half-alt" :'far fa-star' }></i>
                    <i class={this.props.value >= 4 ?"fas fa-star" : this.props.value >= 3.5 ?"fas fa-star-half-alt" :'far fa-star' }></i>
                    <i class={this.props.value >= 5 ?"fas fa-star" : this.props.value >= 4.5 ?"fas fa-star-half-alt" :'far fa-star' }></i>
            </small>
            </>
        )
    }


} 