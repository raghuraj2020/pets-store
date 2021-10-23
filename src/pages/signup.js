import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import API from '../api/api'

function SubmitBtn(){
    return(
        <input type="submit" value="Sign up" className="btn btn-primary signInBtn" />
    )
}

function Loader(){
    return(
        <div className="text-center text-primary">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}


class Signup extends Component{

    constructor(){
        super()
        this.state={
            username:"",
            email:"",
            password:"",
            repassword:"",
            loading:false,
            errMsg:""
        }
    }

    typeUname = (e) => {
        this.setState({
            username:e.target.value
        })
    }

    typeEmail = (e) => {
        this.setState({
            email:e.target.value
        })
    }

    typePassword = (e) => {
        this.setState({
            password:e.target.value
        })
    }

    typeRepassword = (e) => {
        this.setState({
            repassword:e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        if(this.state.password !== this.state.repassword){
            this.setState({
                errMsg:"Please type same password"
            })
        }
        else{
            var sendDetails = {
                username:this.state.username, 
                email:this.state.email, 
                password:this.state.password
            }
            this.setState({
                loading:true
            })
            API.post('/account/signup', sendDetails).then(res => {
                if(res.data.success===true){
                    this.setState({
                        loading:false
                    })
                    alert('Sign up successful')
                    window.location.assign("/signin")
                }
                else{
                    this.setState({
                        loading:false,
                        errMsg:res.data.message
                    })
                }
            })
        }
    }

    render(){
        return(
            <div className="signInForm bg-light">
                <p className="text-center myStyleTitle h1">Sign up</p>
                <hr/>
                <form onSubmit={this.submitForm}>
                    <div className="row line">
                        <div className="col-sm-3 text-left myStyleTitle"><small>User name</small></div>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" placeholder="Enter your user name" required={true} onChange={this.typeUname}  value={this.state.username}/>
                        </div>
                    </div>
                    <div className="row line">
                        <div className="col-sm-3 text-left myStyleTitle"><small>Email</small></div>
                        <div className="col-sm-9">
                            <input type="email" className="form-control" placeholder="Enter your email address" value={this.state.email} onChange={this.typeEmail} required={true} />
                        </div>
                    </div>
                    <div className="row line">
                        <div className="col-sm-3 text-left myStyleTitle"><small>Password</small></div>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" placeholder="Enter your password" value={this.state.password} onChange={this.typePassword} required={true} />
                        </div>
                    </div>
                    <div className="row line">
                        <div className="col-sm-3 text-left myStyleTitle"><small>Re-password</small></div>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" placeholder="Re enter your password" value={this.state.repassword} onChange={this.typeRepassword} required={true} />
                        </div>
                    </div>
                    <p className="signInErrorMsg text-danger">{this.state.errMsg}</p>
                    {this.state.loading ? <Loader/> : <SubmitBtn/>}
                </form>
                <p className="noAccount text-muted">Already have an account?
                    <Link to="/signin"> Signin</Link>
                </p>
            </div>
        )
    }
}

export default Signup