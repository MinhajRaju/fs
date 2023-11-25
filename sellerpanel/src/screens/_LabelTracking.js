import React from 'react'
import withRouter from './_Helper'


export default withRouter(class LabelTracking extends React.Component{


    constructor(props){
        super(props)

       

    }



    componentDidMount(){

        console.log(this.props)
        window.print() 

    }


    render(){


        const data = [[{'Product': {'id': 54}, 'qty': 15}, {'Product': {'id': 11}, 'qty': 2},{'Product': {'id': 11}, 'qty': 2},{'Product': {'id': 11}, 'qty': 2}] ,[{'Product': {'id': 70}, 'qty': 200}]]

        return(

            <>
            <div class="container">

                
            </div>
            <div class="row" style={{display:"none" }}>

                <div class="col-lg-12">
                    <div class="col-xs-6">  <h4>Print All Docuemnt For Selected Items</h4>
</div>                    <div class="col-xs-6">  <h4>Print All Docuemnt For Selected Items</h4>
</div>
                  

                </div>
               


            </div>
                {this.props.params.value == "checklist" ? data.map((d)=>{


                   return( 
<div class="container" style={{height:"820px" , marginTop:"6pc" , padding:"20px" , border:"1px solid #ccc" , boxSizing:"content-box" , width:"800px"}}>
<div style={{height:"1000px"}}>
<table class="table table-bordered">
<thead>
{d.map((t)=>{
   return (
   <tr>
      <th scope="col">Image</th>
      <th scope="col">{t.Product.id}</th>
      <th scope="col">Qty</th>
      
    
    </tr>
   )
})}
  </thead>



    


    
</table>      </div>
</div>
     )


    


                }) :  "nulll"}
            
       
            
            </>




        )

    }


})