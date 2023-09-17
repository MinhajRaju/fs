import React from "react";
import { connect } from "react-redux";
import withRouter from "./_Helper";
import store from "../store";
import { CategoryRelatedItemAction } from "../Actions/actions";
import { TotalCategory } from "../Actions/actions";
import { BrandTotalAction } from "../Actions/actions";
import ProductCard from "../inc/_Productcard";
import { FilterItemAction } from "../Actions/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../inc/_Spinner";

const mapStateToProps = (state) => {
  console.log(state);
  return {
   
    CategoryRelatedData: state.CategoryRelatedItemReducer.CategoryRelatedItemData,
    TotalProduct: state.CategoryTotalReducer.TotalCategory,
    BrandData: state.BrandTotalReducer.TotalBrand,
    FilterData: state.FilterItemReducers.FilterItemData,
  };
};

export default withRouter(
  connect(mapStateToProps)(
    class CategoryProduct extends React.Component {
      constructor(props) {
        super(props);
        store.dispatch(CategoryRelatedItemAction(this.props.params.catname));
        store.dispatch(TotalCategory(this.props.params.catname));
        store.dispatch(BrandTotalAction(this.props.params.catname));
        this.state = {
          items: Array.from({ length: 20 }),
          hasMore: true,
          idArray: [],
          filterArray: [],
          ratingArray: [],
          min: null,
          max: null,
          fprice: null,
        };
      }

      fetchMoreData = () => {
        store.dispatch(CategoryRelatedItemAction(this.props.params.catname));

        if (this.state.items.length >= this.props.TotalProduct.totalproduct) {
          this.setState({ hasMore: false });
          return;
        }

        setTimeout(() => {
          this.setState({
            items: this.state.items.concat(Array.from({ length: 20 })),
          });
        }, 500);
      };

      filterByBrand = (e ,id) => {

        console.log('filter by band' , e)


        this.setState((prevState) => ({
          idArray: [...prevState.idArray, id],
        }));

        setTimeout(() => {
          this.exeFilterFunc(
            this.state.idArray,
            this.props.params.catname,
            this.state.ratingArray,
            this.state.min,
            this.state.max,
            this.state.fprice
          );
        }, 2000);
      };

      filterByRating = (rating) => {
        console.log(rating);
        this.setState((prevState) => ({
          ratingArray: [...prevState.ratingArray, rating],
        }));
        setTimeout(() => {
          this.exeFilterFunc(
            this.state.idArray,
            this.props.params.catname,
            this.state.ratingArray,
            this.state.min,
            this.state.max,
            this.state.fprice
          );
        }, 2000);
      };

      exeFilterFunc = (id, catid, rating, min, max, fprice) => {      

        store.dispatch(FilterItemAction(id, catid, rating, min, max, fprice));
      };

      removeid = (id) => {
        
        const res = this.state.idArray.filter((item) => item !== id);

        this.setState({ idArray: res });

        setTimeout(() => {
          this.exeFilterFunc(
            this.state.idArray,
            this.props.params.catname,
            this.state.ratingArray,
            this.state.min,
            this.state.max,
            this.state.fprice
          );
        }, 2000);
      };

      removeRating = (rating) => {
     
        const res = this.state.ratingArray.filter((item) => item !== rating);

        this.setState({ ratingArray: res });

        setTimeout(() => {
          this.exeFilterFunc(
            this.state.idArray,
            this.props.params.catname,
            this.state.ratingArray,
            this.state.min,
            this.state.max,
            this.state.fprice
          );
        }, 2000);
      };

      min = (value) => {
        this.setState({ min: value });
      };
      max = (value) => {
        this.setState({ max: value });
      };
      fprice = (fprice) => {
        store.dispatch(
          CategoryRelatedItemAction(this.props.params.catname, fprice)
        );
      };

      clearFilter = (
        

        id = [],
        catid = this.props.params.catname,
        rating = [],
        min,
        max,
        fprice
      ) => {
      
        store.dispatch(CategoryRelatedItemAction(this.props.params.catname));
        store.dispatch(FilterItemAction(id, catid, rating, min, max, fprice));

        
        this.setState({idArray:[]})
      };

      render() {

        console.log(this.state.idArray)

        return (
          <>
            <div class=" mt-8 mb-lg-14 mb-8">
              <div class="container">
                <div class="row gx-10">
                  <aside class="col-lg-3 col-md-4 mb-6 mb-md-0">
                    <div
                      class="offcanvas offcanvas-start offcanvas-collapse w-md-50 "
                      tabindex="-1"
                      id="offcanvasCategory"
                      aria-labelledby="offcanvasCategoryLabel"
                    >
                      <div class="offcanvas-body ps-lg-2 pt-lg-0">
                        <div class="mb-8">
                          <h5 class="mb-3">Brand</h5>

                          {this.props.BrandData == undefined
                            ? null
                            : this.props.BrandData.map((data) => {
                                return (
                                  <div class="form-check mb-2">
                                    <input
                                      onClick={(e) =>
                                        this.state.idArray == []
                                          ? null
                                          : this.state.idArray.includes(data.id)
                                          ? this.removeid(data.id)
                                          : this.filterByBrand(e, data.id)
                                      }
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id=""
                                      checked={this.state.idArray.length == 0 ? false :this.state.idArray.includes(data.id) ? true : false }
                                    />
                                    <label
                                      class="form-check-label"
                                      for="eGrocery"
                                    >
                                      {data.name}
                                    </label>
                                  </div>
                                );
                              })}
                        </div>
                        <div class="mb-8">
                          <h5 class="mb-3">Price</h5>

                          <div class="mb-2" style={{ display: "inline-block" }}>
                            <input
                              onChange={(e) => this.min(e.target.value)}
                              type="search"
                              class="form-control"
                              placeholder="Min"
                              style={{ width: "50%" }}
                            />
                          </div>
                          <div class="mb-2" style={{ display: "inline-block" }}>
                            <input
                              onChange={(e) => this.max(e.target.value)}
                              type="search"
                              class="form-control"
                              placeholder="Max"
                              style={{ width: "50%" }}
                            />
                          </div>

                          <i
                            onClick={() =>
                              this.exeFilterFunc(
                                this.state.idArray,
                                this.props.params.catname,
                                this.state.ratingArray,
                                this.state.min,
                                this.state.max
                              )
                            }
                            class="fa-solid fa-filter"
                            style={{ cursor: "pointer" }}
                          ></i>
                        </div>

                        <div class="mb-8">
                          <h5 class="mb-3">Rating</h5>
                          <div>
                            <div class="form-check mb-2">
                              <input
                                onClick={(e) =>
                                  this.state.ratingArray == []
                                    ? null
                                    : this.state.ratingArray.includes(
                                        e.target.value
                                      )
                                    ? this.removeRating(e.target.value)
                                    : this.filterByRating(e.target.value)
                                }
                                class="form-check-input"
                                type="checkbox"
                                value="5"
                                id="ratingFive"
                              />
                              <label class="form-check-label" for="ratingFive">
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning "></i>
                                <i class="bi bi-star-fill text-warning "></i>
                                <i class="bi bi-star-fill text-warning "></i>
                                <i class="bi bi-star-fill text-warning "></i>
                              </label>
                            </div>

                            <div class="form-check mb-2">
                              <input
                                onClick={(e) =>
                                  this.state.ratingArray == []
                                    ? null
                                    : this.state.ratingArray.includes(
                                        e.target.value
                                      )
                                    ? this.removeRating(e.target.value)
                                    : this.filterByRating(e.target.value)
                                }
                                class="form-check-input"
                                type="checkbox"
                                value="4"
                                id="ratingFour"
                              />
                              <label class="form-check-label" for="ratingFour">
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning "></i>
                                <i class="bi bi-star-fill text-warning "></i>
                                <i class="bi bi-star-fill text-warning "></i>
                                <i class="bi bi-star text-warning"></i>
                              </label>
                            </div>

                            <div class="form-check mb-2">
                              <input
                                onClick={(e) =>
                                  this.state.ratingArray == []
                                    ? null
                                    : this.state.ratingArray.includes(
                                        e.target.value
                                      )
                                    ? this.removeRating(e.target.value)
                                    : this.filterByRating(e.target.value)
                                }
                                class="form-check-input"
                                type="checkbox"
                                value="3"
                                id="ratingThree"
                              />
                              <label class="form-check-label" for="ratingThree">
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning "></i>
                                <i class="bi bi-star-fill text-warning "></i>
                                <i class="bi bi-star text-warning"></i>
                                <i class="bi bi-star text-warning"></i>
                              </label>
                            </div>

                            <div class="form-check mb-2">
                              <input
                                onClick={(e) =>
                                  this.state.ratingArray == []
                                    ? null
                                    : this.state.ratingArray.includes(
                                        e.target.value
                                      )
                                    ? this.removeRating(e.target.value)
                                    : this.filterByRating(e.target.value)
                                }
                                class="form-check-input"
                                type="checkbox"
                                value="2"
                                id="ratingTwo"
                              />
                              <label class="form-check-label" for="ratingTwo">
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star text-warning"></i>
                                <i class="bi bi-star text-warning"></i>
                                <i class="bi bi-star text-warning"></i>
                              </label>
                            </div>

                            <div class="form-check mb-2">
                              <input
                                onClick={(e) =>
                                  this.state.ratingArray == []
                                    ? null
                                    : this.state.ratingArray.includes(
                                        e.target.value
                                      )
                                    ? this.removeRating(e.target.value)
                                    : this.filterByRating(e.target.value)
                                }
                                class="form-check-input"
                                type="checkbox"
                                value="1"
                                id="ratingOne"
                              />
                              <label class="form-check-label" for="ratingOne">
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star text-warning"></i>
                                <i class="bi bi-star text-warning"></i>
                                <i class="bi bi-star text-warning"></i>
                                <i class="bi bi-star text-warning"></i>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div class="mb-8 position-relative">
                          <div class="position-absolute p-5 py-8">
                            <h3 class="mb-0">Fresh Fruits </h3>
                            <p>Get Upto 25% Off</p>
                            <a href="#" class="btn btn-dark">
                              Shop Now
                              <i class="feather-icon icon-arrow-right ms-1"></i>
                            </a>
                          </div>

                          <img
                            src="../assets/images/banner/assortment-citrus-fruits.png"
                            alt=""
                            class="img-fluid rounded "
                          />
                        </div>
                      </div>
                    </div>
                  </aside>

                  <section class="col-lg-9 col-md-12">
                    <div class="card mb-4 bg-light border-0">
                      <div class=" card-body p-9">
                        <h2 class="mb-0 fs-1">{this.props.params.catname}</h2>
                      </div>
                    </div>

                    <div class="d-lg-flex justify-content-between align-items-center">
                      <div class="mb-3 mb-lg-0">
                        <p class="mb-0">
                          {" "}
                          <span class="text-dark">
                            {this.props.FilterData !== undefined &&
                            this.props.FilterData.length > 0
                              ? this.props.FilterData.length
                              : this.props.CategoryRelatedData !== undefined
                              ? this.props.CategoryRelatedData.length
                              : "0"}{" "}
                          </span>{" "}
                          Products found &nbsp;{" "}
                          {this.props.FilterData !== undefined &&
                          this.props.FilterData.length > 0 ? (
                            <>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => this.clearFilter()}
                                class="badge bg-danger"
                              >
                                Clear Filter
                              </span>
                            </>
                          ) : (
                            ""
                          )}{" "}
                        </p>
                      </div>

                      <div class="d-md-flex justify-content-between align-items-center">
                        <div class="d-flex mt-2 mt-lg-0">
                          <div>
                            <select
                              onClick={(e) => this.fprice(e.target.value)}
                              class="form-select"
                            >
                              <option selected>Sort by: Featured</option>
                              <option value="L2H">Price: Low to High</option>
                              <option value="H2L"> Price: High to Low</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <InfiniteScroll
                      dataLength={this.state.items.length}
                      next={this.fetchMoreData}
                      hasMore={this.state.hasMore}
                      style={{ overflow: "none" }}
                      loader={<Spinner />}
                      endMessage={
                        <p style={{ textAlign: "center" }}>
                          <b></b>
                        </p>
                      }
                    >
                      <div class="row g-4 row-cols-xl-4 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-2">
                        <ProductCard
                          data={
                            this.props.FilterData == undefined ||
                            this.props.FilterData.length  == 0
                              ? this.props.CategoryRelatedData
                              : this.props.FilterData
                          }
                         
                        />
                      </div>
                    </InfiniteScroll>
                  </section>
                </div>
              </div>
            </div>
          </>
        );
      }
    }
  )
);
