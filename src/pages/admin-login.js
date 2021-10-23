import React,{Component} from 'react'
import API from '../api/api'

function Loader(){
    return(
        <div className="text-center text-primary">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

function SubmitBtn(){
    return(
        <input type="submit" value="Sign in" className="btn btn-primary signInBtn" />
    )
}

class AdminLogIn extends Component{

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

        API.post('/admin/login', sendDetails).then(res => {
            if(res.data.success===true){
                localStorage.clear()
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("role","admin")
                this.setState({
                    loading:false
                })
                window.location.assign("/admin/rooms")
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
            <div className="signInForm">
                <h2 className="text-center">Admin login</h2>
                <hr/>
                <form onSubmit={this.signInSubmit}>
                    <div className="row line">
                        <div className="col-sm-2 text-left">Email</div>
                        <div className="col-sm-10">
                            <input type="email" placeholder="Enter your email address" className="form-control" value={this.state.email} onChange={this.typeEmail} required={true}/>
                        </div>
                    </div>
                    <div className="row line">
                        <div className="col-sm-2 text-left">Password</div>
                        <div className="col-sm-10">
                            <input type="password" placeholder="Enter your password" className="form-control" value={this.state.password} onChange={this.typePassword} required={true} />
                        </div>
                    </div>
                    <p className="signInErrorMsg text-danger">{this.state.errMsg}</p>
                    {this.state.loading ? <Loader/> : <SubmitBtn/>}
                </form>
            </div>
        )
    }
}

export default AdminLogIn