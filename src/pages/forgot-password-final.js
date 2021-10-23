import React, {Component} from 'react'
import API from '../api/api'

class ForgotPasswordFinal extends Component{

    constructor(){
        super()
        this.state={
            password:"",
            repassword:"",
            errMsg:''
        }
    }

    typePassword = (e) => {
        this.setState({
            password:e.target.value
        })
    }

    typeRePassword = (e) => {
        this.setState({
            repassword:e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        if(this.state.password !== this.state.repassword){
            this.setState({
                errMsg:"Type the same passwords"
            })
        }
        else{
            API.post("/account/recovery/chpassword/"+this.props.match.params.id, {password:this.state.password}).then(res => {
                if(res.data.success===false){
                    alert(res.data.message)
                }
                else{
                    alert(res.data.message)
                    window.location.assign("/signin")
                }
            })
        }
    }

    render(){
        return(
            <div className="container">
                <div className="signInForm">
                    <p className="myStyleTitle h1">Change your password</p>
                    <form onSubmit={this.submitForm}>
                        <input type="password" onChange={this.typePassword} placeholder="Enter your new password" value={this.state.password} className="form-control" required={true}/><br/>
                        <input type="password" onChange={this.typeRePassword} placeholder="Re-enter your password" value={this.state.repassword} className="form-control" required={true}/><br/>
                        <p className="signInErrorMsg text-danger">{this.state.errMsg}</p>
                        <input type="submit" value="Change password" className="btn btn-primary"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default ForgotPasswordFinal