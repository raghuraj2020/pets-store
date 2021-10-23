import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Thankyou extends Component{
    render(){

        return(
            <div className="jumbotron text-center container">
                <h1 className="display-3" style={{color:"#13519b"}}>Thank You!</h1>
                <p className="lead">Successfully registered your request. Your request is processing... Then, We are calling to you</p>
                <hr/>
                <p>
                    Having trouble? <Link to="/message">Contact us</Link>
                </p>
                <p className="lead">
                    <Link className="btn btn-primary" to="/">Continue to Homepage</Link>
                </p>
            </div>
        )
    }
}

export default Thankyou
