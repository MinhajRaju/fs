import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../inc/_Header";
import Footer from "../inc/_Footer";

export default class HCF extends React.Component {

    render() {


        return (
            <>
                <Header />


                <main>

                    <Outlet />

                </main>

                <Footer />

            </>
        )

    }


}