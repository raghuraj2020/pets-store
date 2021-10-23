import React, {Component} from 'react'
import API from '../api/api'

class ForgotPassword extends Component{

    constructor(){
        super()
        this.state={
            email:"",
            errMsg:""
        }
    }

    typeEmail = (e) => {
        this.setState({
            email:e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        API.post("/account/forgot", {email:this.state.email}).then(res => {
            if(res.data.success===true){
                sessionStorage.setItem("isreset", true)
                sessionStorage.setItem("resetemail",this.state.email)
                window.location.assign("/account/recovery")
            }
            else{
                this.setState({
                    errMsg:res.data.message
                })
            }
        })
    }

    render(){
        return(
            <div className="container">
                <div className="signInForm">
                    <br/>
                    <p className="myStyleTitle h1">Forgotton Password?</p>
                    <hr/>
                    <form onSubmit={this.submitForm}>
                        <input type="email" value={this.state.email} onChange={this.typeEmail} placeholder="Enter your correct email address" className="form-control" required={true}/>
                        <p className="signInErrorMsg text-danger">{this.state.errMsg}</p>
                        <input type="submit" value="Send code" className="btn btn-primary"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default ForgotPassword