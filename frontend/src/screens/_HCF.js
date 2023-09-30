import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../inc/_Header";
import Footer from "../inc/_Footer";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class HCF extends React.Component {

    render() {


        return (
            <>
                <Header />
                <ToastContainer />

                <main>

                    <Outlet />

                </main>

                <Footer />

            </>
        )

    }


}