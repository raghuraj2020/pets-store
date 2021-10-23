import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import API from '../api/api'

function Loader(){
    return(
        <div className="text-center text-primary">
            {/* <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div> */}
            <img src="https://cdn.dribbble.com/users/108607/screenshots/670667/dog_mc.gif" width="80px" alt="loader"/>
        </div>
    )
}

function SubmitBtn(){
    return(
        <input type="submit" value="Sign in" className="btn btn-primary signInBtn" />
    )
}

class Signin extends Component{

    constructor(){
        super()
        this.state={
            email:"",
            password:"",
            errMsg:"",
            loading:false
        }
    }

    typeEmail = (e) => {
        this.setState({
            email:e.target.value,
            errMsg:""
        })
    }

    typePassword = (e) => {
        this.setState({
            password:e.target.value,
            errMsg:""
        })
    }
    
    signInSubmit = (e) => {
        e.preventDefault()
        var sendDetails = {email:this.state.email, password:this.state.password}
        this.setState({
            loading:true
        })

        API.post('/account/signin', sendDetails).then(res => {
            if(res.data.success===true){
                localStorage.clear()
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("username", res.data.username)
                localStorage.setItem("role","user")
                localStorage.setItem("photo",res.data.photo)
                localStorage.setItem("firstname",res.data.firstname)
                localStorage.setItem("lastname",res.data.lastname)
                localStorage.setItem("email",res.data.email)
                localStorage.setItem("phone",res.data.phone)
                localStorage.setItem("dob",res.data.dob)

                window.location.assign("/")
                this.setState({
                    loading:false
                })
            }
            else{
                this.setState({
                    loading:false,
                    errMsg:res.data.message
                })
            }
        })
    }

    render(){
        return(
            <div className="signInForm bg-light">
                <h2 className="text-center myStyleTitle h1">Sign in</h2>
                <hr/>
                <form onSubmit={this.signInSubmit}>
                    <div className="row line">
                        <div className="col-sm-2 text-left myStyleTitle"><small>Email</small></div>
                        <div className="col-sm-10">
                            <input type="email" placeholder="Enter your email address" className="form-control" value={this.state.email} onChange={this.typeEmail} required={true}/>
                        </div>
                    </div>
                    <div className="row line">
                        <div className="col-sm-2 text-left myStyleTitle"><small>Password</small></div>
                        <div className="col-sm-10">
                            <input type="password" placeholder="Enter your password" className="form-control" value={this.state.password} onChange={this.typePassword} required={true} />
                        </div>
                    </div>
                    <p className="signInErrorMsg text-danger">{this.state.errMsg}</p>
                    {this.state.loading ? <Loader/> : <SubmitBtn/>}
                </form>
                <Link to="/forgot"><p className="mt-2">Forgotten password?</p></Link>
                <p className="noAccount text-muted">Don't have an account?
                    <Link to="/signup"> Signup</Link>
                </p>
            </div>
        )
    }
}

export default Signin