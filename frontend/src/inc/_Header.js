import React from "react";
import { connect } from "react-redux";
import store from "../store";
import { FlashSaleAction } from "../Actions/actions";
import { initialstate } from "../store";


import Modal from "./_Modal";

const mapStateToProps = (state) => {

    console.log(state)

    return { FlashSaleData: state.FlashSaleReducer.FlashSaleData, CategoryData: state.NestedcategoryReducer.NestedCategoryData, loading: state.FlashSaleReducer.loading  ,cart: state.CartReducer.cartItems}


}


export default connect(mapStateToProps)(class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            cat1: [],
            cat2: []
        }



    }




    funccat1 = (id) => {
        console.log("TEst")

        const x = this.props.CategoryData.filter(data => data.level == 1 && data.parent == id)
        this.setState({ cat1: x })
    }
    funccat2 = (id) => {

        const x = this.props.CategoryData.filter(data => data.level == 2 && data.parent == id)
        this.setState({ cat2: x })
        console.log("fire")
    }




    render() {

        console.log(initialstate.cart.cartItems)

        return (
            <>
                <header style={{background:"#f3f2f7"}}>
                    <div class="container">
                       
                        <div class="row align-items-center pt-6 pb-4 mt-4 mt-lg-0">
                            <div class="col-xl-2 col-md-3 mb-4 mb-md-0 col-12 text-center text-md-start">
                                <a href="https://freshcart.codescandy.com/index.html"><img src="https://freshcart.codescandy.com/assets/images/logo/freshcart-logo.svg"
                                    alt="" /></a>

                            </div>

                            <div class="col-xxl-1 col-xl-1 col-lg-1 col-md-9">
                            <nav class="navbar navbar-expand-lg navbar-light navbar-default p-0 p-sm-0 navbar-offcanvas-color "
                    aria-label="Offcanvas navbar large">
                    <div class="container">


                        <div class="offcanvas offcanvas-start" tabindex="-1" id="navbar-default" aria-labelledby="navbar-defaultLabel">
                            <div class="offcanvas-header pb-1">
                                <a href="index.html"><img src="https://freshcart.codescandy.com/assets/images/logo/freshcart-logo.svg"
                                    alt="" /></a>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">


                                <div class="">
                                    <ul class="navbar-nav align-items-center ">
                                        <li class="dropdown me-6 d-none d-lg-block ">
                                            <a href="#" class="text-inherit" data-bs-toggle="dropdown" aria-expanded="false">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                    class="bi bi-text-left me-2" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd"
                                                        d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z">
                                                    </path>
                                                </svg>
                                                Categories
                                            </a>




                                            <ul class="dropdown-menu dropdown-menu-lg">
                                                {this.props.CategoryData == undefined ? null : this.props.CategoryData.map((level1) => {


                                                    if (level1.parent == null) {
                                                        return (
                                                            <li class="dropdown-menu-list">
                                                                <a href={`/category/${level1.name}`} onMouseOver={() => { this.funccat1(level1.id) }} class="dropdown-item d-flex justify-content-between mb-1 py-1 ">
                                                                    <div>
                                                                        <svg width="24" height="24" viewBox="0 0 56 56" fill="#3d4f58" xmlns="http://www.w3.org/2000/svg">
                                                                            <path
                                                                                d="M5.552 4.492c-.866.461-1.259.989-1.259 1.691 0 .528.117.739 1.345 2.441 1.38 1.914 2.031 2.908 2.619 4l.44.817-.441.443c-.57.571-1.258 1.618-1.562 2.377-.488 1.219-.553 1.833-.484 4.552.086 3.344.063 3.438-1.322 5.563-3.071 4.71-3.467 10.38-1.059 15.17 2.11 4.199 5.779 7.017 10.451 8.028 1.317.285 4.424.309 5.74.044 1.2-.242 2.463-.661 3.593-1.194l.98-.462.234.301c.71.915 3.156 2.749 4.598 3.449 1.351.656 2.078.68 5.062.167 1.944-.334 2.488-.327 4.337.057 2.919.605 3.775.501 5.844-.71 2.809-1.644 4.954-3.989 6.433-7.033 1.184-2.436 1.726-4.8 1.726-7.529 0-5.719-2.753-10.986-7.364-14.089-1.117-.752-2.25-1.345-2.748-1.438l-.344-.065.306-.339c1.465-1.622 2.695-4.262 3.013-6.47l.063-.437-.36-.03c-.345-.028-.361-.044-.389-.393l-.03-.364-.904.057a8.632 8.632 0 0 0-5.733 2.661c-.295.309-.537.534-.537.499-.001-.034-.064-.751-.141-1.592-.161-1.741-.302-2.174-.844-2.587-.311-.238-.446-.274-1.117-.303-.63-.026-.829.002-1.142.161-.777.396-.981.914-.864 2.186.044.472.103 1.142.13 1.487l.051.628-.683-.683c-1.416-1.416-3.251-2.255-5.362-2.451l-.666-.062-.738-1.41c-2.178-4.161-3.174-5.38-5.154-6.307-1.09-.51-1.935-.678-3.443-.686-1.828-.01-3.34.312-4.9 1.042a9.268 9.268 0 0 1-1.4.511c-.36.089-.962.307-1.34.485-.377.179-.723.302-.768.274-.045-.028-.469-.557-.943-1.174-.586-.767-.971-1.18-1.211-1.303-.481-.245-1.233-.236-1.713.02m2.094 2.643a50.969 50.969 0 0 1 1.627 2.227c.562.842 1.607 2.753 1.538 2.814-.085.076-.845.433-.865.407a49.22 49.22 0 0 1-.518-.916c-.589-1.054-1.261-2.071-2.63-3.975-.556-.774-1.011-1.457-1.011-1.518 0-.15.554-.477.708-.418.068.026.586.647 1.151 1.379m11.561-.924c.396.08 1.073.312 1.506.517.65.308.924.513 1.587 1.185.776.787 1.151 1.344 2.241 3.324l.303.551-.639-.065c-3.356-.339-6.537-1.796-8.756-4.013-.52-.519-.88-.946-.815-.968.16-.053 1.526.225 2.259.461 1.281.411 2.653 1.054 3.641 1.707.563.371 1.045.654 1.071.627.146-.145-.034-.347-.799-.894-.994-.711-2.754-1.615-4.006-2.058l-.887-.313.374-.062c.205-.034.436-.076.513-.092.407-.086 1.778-.033 2.407.093M13.66 7.966c1.401 1.737 3.681 3.322 6.046 4.201 1.675.623 3.918 1.084 5.287 1.088.803.002.954.064.954.391 0 .894.68 3.212 1.311 4.467.426.848 1.333 2.136 2.049 2.91.592.641.643.724.444.724-.498 0-1.203.309-2.085.915l-.928.638-.793-.551c-.435-.303-1.38-.848-2.098-1.212-1.102-.558-1.404-.76-1.925-1.286-.772-.781-1.097-1.434-1.528-3.067-.445-1.682-.816-2.371-1.818-3.374-1.393-1.395-2.794-1.961-4.97-2.012l-1.281-.03-.544-1.054c-.3-.58-.824-1.484-1.167-2.01l-.621-.957.207-.135c.386-.253 1.138-.552 1.793-.714l.654-.162.186.218c.103.119.475.575.827 1.012m1.273 5.433c1.492.35 2.805 1.337 3.47 2.608.188.359.452 1.087.586 1.616.437 1.726.743 2.384 1.555 3.351.598.712 1.395 1.288 2.556 1.848.565.272 1.356.71 1.758.973l.732.479-.638.674c-3.328 3.512-5.01 8.519-4.507 13.415.281 2.742 1.276 5.584 2.694 7.694l.479.713-.866.409c-1.863.881-3.618 1.215-5.994 1.14-2.274-.072-3.719-.439-5.695-1.447-3.677-1.875-6.298-5.395-7.104-9.539-.257-1.322-.234-3.725.049-5.034.428-1.982 1.088-3.53 2.284-5.359.82-1.254.906-1.417 1.185-2.253.211-.631.219-.763.225-3.734.005-2.719.025-3.14.175-3.593.432-1.304 1.033-2.154 2-2.833.859-.602 1.179-.773 1.976-1.051.745-.26 2.153-.295 3.08-.077m21.083.064c.081.219.109.498.336 3.311l.138 1.701-.268.679c-.146.374-.284.739-.306.812-.022.072-.149-.18-.283-.56-.222-.629-.249-.867-.302-2.606-.032-1.052-.094-2.249-.138-2.66-.044-.411-.061-.778-.038-.817.024-.038.209-.07.413-.07.298 0 .385.041.448.21m-7.036 1.346c.308.075.896.299 1.307.498 1.822.883 3.144 2.497 3.972 4.847.296.84.779 2.799.708 2.87-.01.01-.407-.166-.882-.392-2.548-1.21-4.469-3.093-5.616-5.505-.347-.728-.842-2.16-.842-2.433 0-.154.379-.122 1.353.115m15.111.008c-.127.551-.53 1.677-.836 2.339-1.045 2.262-3.088 4.279-5.504 5.432-1.073.512-1.086.509-.92-.211.414-1.805 1.18-3.749 1.84-4.671 1.147-1.604 2.636-2.606 4.459-3.002.937-.203 1.031-.192.961.113m-.7 8.239c.482.256 1.217.707 1.633 1.002 1.007.713 2.66 2.385 3.44 3.478 1.207 1.69 2.219 4.091 2.656 6.297.262 1.32.232 4.607-.052 5.927-.456 2.109-1.295 4.096-2.452 5.805-.801 1.182-2.749 3.126-3.894 3.886-.479.318-1.235.755-1.68.973-.765.373-.852.394-1.602.387-.519-.005-1.293-.115-2.24-.317-1.943-.415-3.19-.427-5.133-.046-.898.175-1.668.267-2.288.272-.927.007-.941.003-1.82-.425a14.925 14.925 0 0 1-1.726-1.026c-1.094-.776-2.73-2.419-3.521-3.536-4.301-6.077-3.704-14.517 1.4-19.8 1.469-1.52 2.983-2.612 3.789-2.733.629-.094 1.555.146 3.458.897 1.321.521 1.731.722 1.733.846.002.192.006.193.339.066.174-.066.395-.067.689-.004.913.195 2.076-.217 3.907-1.386 1.913-1.222 2.072-1.249 3.364-.563"
                                                                                fill-rule="evenodd"></path>
                                                                        </svg>

                                                                        <span class="ms-1">{level1.name}</span>
                                                                    </div>
                                                                    <div>
                                                                        <i class="feather-icon icon-chevron-right"></i>
                                                                    </div>

                                                                </a>
                                                                <div class="dropdown-menu-list-submenu">
                                                                    <div>

                                                                        <ul class="list-unstyled">
                                                                            {this.state.cat1.map((level2) => {

                                                                                return (

                                                                                    <li>
                                                                                        <a href={`/category/${level2.name}`} class="dropdown-item"><b style={{ textTransform: "uppercase" }}>{level2.name}</b></a>




                                                                                        {level2.children.map((level3) => {

                                                                                            if (level2.id == level3.parent) {
                                                                                                return (

                                                                                                    <li>
                                                                                                        <a href={`/category/${level3.name}`} class="dropdown-item">{level3.name}</a>
                                                                                                    </li>
                                                                                                )
                                                                                            }


                                                                                        })


                                                                                        }






                                                                                    </li>


                                                                                )
                                                                            })}

                                                                        </ul>
                                                                    </div>


                                                                </div>



                                                            </li>
                                                        )


                                                    }
                                                })}

                                            </ul>

                                        </li>



                                        <li class="nav-item dropdown dropdown-fullwidth" style={{display:"none"}}>
                                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                Mega menu
                                            </a>
                                            <div class=" dropdown-menu pb-0">
                                                <div class="row p-2 p-lg-4">
                                                    <div class="col-lg-3 col-12 mb-4 mb-lg-0">
                                                        <h6 class="text-primary ps-3">Dairy, Bread & Eggs</h6>
                                                        <a class="dropdown-item" href="shop-grid.html">Butter</a>

                                                    </div>
                                                    <div class="col-lg-3 col-12 mb-4 mb-lg-0">
                                                        <h6 class="text-primary ps-3">Breakfast & Instant Food</h6>
                                                        <a class="dropdown-item" href="shop-grid.html">Breakfast Cereal</a>

                                                    </div>
                                                    <div class="col-lg-3 col-12 mb-4 mb-lg-0">
                                                        <h6 class="text-primary ps-3">Cold Drinks & Juices</h6>
                                                        <a class="dropdown-item" href="shop-grid.html">Soft Drinks</a>

                                                    </div>

                                                </div>






                                            </div>
                                        </li>




                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div >
                </nav >




                            </div>

                            <div class="col-xxl-5 col-xl-5 col-lg-5 col-md-9">
                                <form action="#">
                                    <div class="input-group">
                                        <input class="form-control" type="search" placeholder="Search for products"
                                            aria-label="Recipient's username" aria-describedby="button-addon2" />
                                        <button class="btn btn-primary" type="button" id="button-addon2">Search</button>
                                    </div>
                                </form>



                            </div>
                            <div class="col-xxl-4 col-xl-2 col-lg-3 d-none d-lg-block">
                                <div class="d-flex align-items-right  ms-14">
                                    <div class="text-center">

                                        <div class="dropdown">

                                            <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" href="#offcanvasExample" role="button"
                                            aria-controls="offcanvasRight" class="text-reset">
                                                <div class="lh-1">
                                                    <div class="position-relative d-inline-block mb-2">
                                                    <i class="bi bi-cart2 fs-4"></i>
                                                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                            {this.props.cart.length}
                                                           
                                                        </span>
                                                    </div>
                                                    <p class="mb-0 d-none d-xl-block small">Notification</p>
                                                </div>
                                            </a>

                                            <div class="dropdown-menu dropdown-menu-lg p-0">
                                                <div>
                                                    <h6 class="px-4 border-bottom py-3 mb-0">Notification
                                                    </h6>
                                                    <p class="mb-0 px-4 py-3 "><a href="#">Sign in</a> or <a href="#">register</a> in or so you don t have
                                                        to
                                                        enter your details every time</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="ms-6 text-center">
                                        <a href="#" class="text-reset" data-bs-toggle="modal" data-bs-target="#userModal">
                                            <div class="lh-1">
                                                <div class="mb-2">
                                                    <i class="bi bi-person-circle fs-4"></i>

                                                </div>
                                                <p class="mb-0 d-none d-xl-block small">Sign up</p>
                                            </div>
                                        </a>
                                    </div>
                                   


                                </div>
                            </div>

                        </div>

                    </div>
                </header>


               



                <Modal />



                <div class="bg-white position-fixed bottom-0 w-100  z-1 shadow-lg d-block d-lg-none text-center">
                    <div class="d-flex align-items-center ">


                        <div class="w-25 icon-hover py-4">

                            <button class="navbar-toggler collapsed d-lg-none" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                    class="bi bi-text-indent-left text-primary" viewBox="0 0 16 16">
                                    <path
                                        d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </button>
                        </div>


                        <div class="dropdown  w-25 ms-2 py-4  icon-hover">

                            <a href="#" class="text-inherit" data-bs-toggle="dropdown" aria-expanded="false">
                                <div class="text-center">
                                    <div class="position-relative d-inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-bell"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                        </svg>
                                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            1
                                            <span class="visually-hidden">unread messages</span>
                                        </span>
                                    </div>

                                </div>
                            </a>

                            <div class="dropdown-menu dropdown-menu-lg p-0 ">
                                <div>
                                    <h6 class="px-4 border-bottom py-3 mb-0">Notification
                                    </h6>
                                    <p class="mb-0 px-4 py-3"><a href="signin.html">Sign in</a> or <a href="signup.html">Register</a> in or so you don t have to
                                        enter your details every time</p>
                                </div>

                            </div>
                        </div>

                        <div class="w-25 ms-2 py-4  icon-hover">
                            <a href="javascript:void(0)" class="text-inherit" data-bs-toggle="modal" data-bs-target="#userModal">
                                <div class="text-center">
                                    <div class="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>

                                    </div>

                                </div>
                            </a>
                        </div>
                        <div class="w-25 ms-2 py-4  icon-hover">
                            <a href="account-orders.html" class="text-inherit">
                                <div class="text-center">
                                    <div class="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-archive"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                        </svg>

                                    </div>

                                </div>
                            </a>
                        </div>
                        <div class="w-25 ms-2 py-4  icon-hover">
                            <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" href="#offcanvasExample" role="button"
                                aria-controls="offcanvasRight" class="text-inherit">
                                <div class="text-center">
                                    <div class="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cart2"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                        </svg>

                                    </div>

                                </div>
                            </a>
                        </div>



                    </div>
                </div>
                <Modal />
            </>


        )
    }



})