import React from "react";



export default class Spinner extends React.Component {

    render() {


        return (
            <>

                <div class="d-flex justify-content-center">
                    <div class="spinner-border" style={{ width: "6rem", height: "6rem" }} role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

            </>
        )

    }


}