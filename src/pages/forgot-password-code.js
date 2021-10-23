import React, {Component} from 'react'
import API from '../api/api'

class ForgotPasswordCode extends Component{

    constructor(){
        super()
        this.state={
            email:sessionStorage.getItem("resetemail"),
            code:"",
            errMsg:""
        }
    }

    typeCode = (e) => {
        this.setState({
            code:e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        API.post("/account/recovery", {email:this.state.email, code:this.state.code}).then(res => {
            if(res.data.success===true){
                sessionStorage.clear()
                window.location.assign("/account/chpassword/"+res.data.message)
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
                    <p className="myStyleTitle h1">Enter your reset code...</p>
                    <hr/>
                    <form onSubmit={this.submitForm}>
                        <input type="text" value={this.state.code} onChange={this.typeCode} placeholder="Enter the reset code..." className="form-control" required={true}/>
                        <p className="signInErrorMsg text-danger">{this.state.errMsg}</p>
                        <input type="submit" value="Submit" className="btn btn-primary"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default ForgotPasswordCode