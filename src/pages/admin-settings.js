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
        <input type="submit" value="Change password" className="btn btn-primary signInBtn" />
    )
}

class AdminSetting extends Component{

    constructor(){
        super()
        this.state={
            password:"",
            repassword:"",
            loading:false
        }
    }

    typePassword = (e) => {
        this.setState({
            password:e.target.value,
            errMsg:""
        })
    }

    typeRePassword = (e) => {
        this.setState({
            repassword:e.target.value,
            errMsg:""
        })
    }

    changePassword = (e) => {
        e.preventDefault()
        if(this.state.password !== this.state.repassword){
            this.setState({
                errMsg:"Please type same password"
            })
        }
        else{
            this.setState({
                loading:true,
            })
            const sendDetails={password:this.state.password}
            API.put('/admin/password', sendDetails).then(res => {
                if(res.data.success===true){
                    alert("Password changed successful")
                    this.setState({
                        errMsg:"",
                        loading:false
                    })
                }
                else{
                    this.setState({
                        errMsg:res.data.message,
                        loading:false
                    })
                }
            })
        }
    }

    logOut = () => {
        localStorage.clear()
        window.location.assign("/")
    }

    render(){
        return(
            <div className="container">
                <h1 className="text-center line"><code>Settings</code></h1>
                <button className="btn btn-primary float-right" onClick={this.logOut}>Log out</button><br/><br/>
                <hr/>
                <div className="signInForm">
                    <p className="myStyleTitle h1">Change password</p><hr/>
                    <form onSubmit={this.changePassword}>
                        <input type="password" placeholder="Password" className="form-control" value={this.state.password} onChange={this.typePassword} required={true} /><br/>
                        <input type="password" placeholder="Re password" className="form-control" value={this.state.repassword} onChange={this.typeRePassword} required={true} />
                        <p className="signInErrorMsg text-danger">{this.state.errMsg}</p>
                        {this.state.loading ? <Loader/> : <SubmitBtn/>}
                    </form>
                </div>
            </div>
        )
    }
}

export default AdminSetting