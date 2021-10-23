import React,{Component} from 'react'
import {Link} from 'react-router-dom'

class BookingComp extends Component{
    render(){
        return(
            <div>
                <div className="col-lg-1"></div>
                <div className="col-lg-11 container-fluid">
                    <div className="row  my-hero-bg">
                        <div className="col-lg-8 my-hero-col-8">
                        </div>
                        <div className="col-lg-4">
                            <h3 className="home-hero-head mt-5">Searching for Safest Pet Care Center?</h3>
                            <p>We are the leading pet care center in Jaffna we provide attractive services for affordable price. We have limited rooms only So, don't wait to book room.</p>
                            <Link to="/booking" className="btn hero-book-btn btn-block">Book Immediately</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookingComp