import React, {Component} from 'react'
import API from '../api/api'

function SubmitBtn(){
    return(
        <input type="submit" value="Update profile" className="btn btn-primary signInBtn" />
    )
}

function ImageUploadBtn(){
    return(
        <input type="submit" className="btn btn-primary" value="Change image"/>
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

class Profile extends Component{

    constructor(){
        super()
        this.state={
            uname:localStorage.getItem("username"),
            photo:localStorage.getItem("photo"),
            fname:localStorage.getItem("firstname"),
            lname:localStorage.getItem("lastname"),
            email:localStorage.getItem("email"),
            phone:localStorage.getItem("phone"),
            password:"",
            repassword:"",
            dob:localStorage.getItem("dob"),
            gender:"male",
            haveanimal:"",
            loading:false,
            errMsg:"",
            image:null,
            imageloader:false
        }
    }

    typeFname = (e) => {
        this.setState({
            fname:e.target.value
        })
    }

    typeLname = (e) => {
        this.setState({
            lname:e.target.value
        })
    }

    typeUname = (e) => {
        this.setState({
            uname:e.target.value
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

    typePhone = (e) => {
        this.setState({
            phone:e.target.value
        })
    }

    typeDob = (e) => {
        this.setState({
            dob:e.target.value
        })
    }

    typeAnimal = () => {
        if(this.state.haveanimal){
            this.setState({
                haveanimal:false
            })
        }
        else{
            this.setState({
                haveanimal:true
            })
        }
    }

    changeGender = (e) =>{
        this.setState({
            gender:e.target.value
        })
    }

    submitForm = (e) =>{
        e.preventDefault()
        if(this.state.password !== this.state.repassword){
            this.setState({
                errMsg:"Please type same password"
            })
        }
        else{
            this.setState({
                loading:true
            })
            var sendDetails = {
                username:this.state.uname, 
                firstname:this.state.fname, 
                lastname:this.state.lname,
                email:this.state.email, 
                password:this.state.password, 
                gender:this.state.gender, 
                phone:this.state.phone, 
                dob:this.state.dob, 
                haveanimal:this.state.haveanimal
            }
            API.put("/account/edit", sendDetails).then(res => {
                if(res.data.success===true){
                    alert('Update successful')
                    this.setState({
                        loading:false
                    })
                    localStorage.setItem("firstname",this.state.fname)
                    localStorage.setItem("lastname",this.state.lname)
                    localStorage.setItem("username",this.state.uname)
                    localStorage.setItem("email",this.state.email)
                    localStorage.setItem("phone",this.state.phone)
                    localStorage.setItem("dob",this.state.dob)
                    window.location.assign("/")
                }
                else{
                    alert("Please try again")
                    this.setState({
                        loading:false
                    })
                }
            })
        }
    }

    // upload image
    selectImage = (e) => {
        this.setState({
            image: e.target.files[0]
        })

    }

    uploadImage = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('file', this.state.image)
        this.setState({
            imageloader: true
        })
        API.post("/upload/profile", data, {
        })
        .then(res => {
            if(res.data['success']===false){
                alert(res.data['message'])
                this.setState({
                    imageloader:false
                })
            }
            else{
                this.setState({
                    imageloader:false
                })
                localStorage.setItem("photo", res.data["image"])
                window.location.assign("/profile")
            }
        })
    }

    render(){
        return (
            <div className="container signInForm">
                <p className="myStyleTitle h1 text-center mt-3">Update your profile</p>
                <hr/>
                <div className="row">
                    <div className="col-sm-5">
                        <img src={this.state.photo} className="img-fluid" alt={this.state.username}/>
                        <form onSubmit={this.uploadImage}>
                            <input type="file" accept="image/x-png,image/jpeg" name="img" onChange={this.selectImage}/>
                            <div className="line">
                                {this.state.imageloader ? <Loader/> : <ImageUploadBtn/>}
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-7">
                        <form onSubmit={this.submitForm}>
                            
                            <div className="row line">
                                <div className="col-sm-3 text-left">First name</div>
                                <div className="col-sm-9">
                                <input type="text" placeholder="First name" className="form-control" value={this.state.fname} onChange={this.typeFname}/>
                                </div>
                            </div>

                            <div className="row line">
                                <div className="col-sm-3 text-left">Last name</div>
                                <div className="col-sm-9">
                                <input type="text" placeholder="Last name" className="form-control" value={this.state.lname} onChange={this.typeLname}/>
                                </div>
                            </div>

                            <div className="row line">
                                <div className="col-sm-3 text-left">User name</div>
                                <div className="col-sm-9">
                                <input type="text" placeholder="User name" className="form-control" value={this.state.uname} onChange={this.typeUname}/>
                                </div>
                            </div>

                            <div className="row line">
                                <div className="col-sm-3 text-left">Email</div>
                                <div className="col-sm-9">
                                    <input type="email" placeholder="Email address" className="form-control"  value={this.state.email} onChange={this.typeEmail}/>
                                </div>
                            </div>

                            <div className="row line">
                                <div className="col-sm-3 text-left">Phone number</div>
                                <div className="col-sm-9">
                                <input type="number" placeholder="Phone number" className="form-control" value={this.state.phone} onChange={this.typePhone}/>
                                </div>
                            </div>

                            <div className="row line">
                                <div className="col-sm-3 text-left">Password</div>
                                <div className="col-sm-9">
                                <input type="password" placeholder="Change password" className="form-control" value={this.state.password} onChange={this.typePassword} required={true}/>
                                </div>
                            </div>

                            <div className="row line">
                                <div className="col-sm-3 text-left">Re-enter Password</div>
                                <div className="col-sm-9">
                                <input type="password" placeholder="Re-enter password" className="form-control" value={this.state.repassword} onChange={this.typeRepassword} required={true}/>
                                </div>
                            </div>

                            <div className="row line">
                                <div className="col-sm-3 text-left">DOB</div>
                                <div className="col-sm-9">
                                    <input type="date" placeholder="Date pf Birth" className="form-control"  value={this.state.dob} onChange={this.typeDob}/><br/>
                                </div>
                            </div>
                            <div className="row" onChange={this.changeGender}>
                                <div className="col-sm-3 text-left">Gender</div>
                                <div className="col-sm-3">
                                    <input type="radio" name="gender" value="male" defaultChecked={true}/><span className="p-3">Male</span>
                                </div>
                                <div className="col-sm-3">
                                    <input type="radio" name="gender" value="female"/><span className="p-3">Female</span>
                                </div>
                                <div className="col-sm-3">
                                    <input type="radio" name="gender" value="other"/><span className="p-3">Other</span>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-1"><input type="checkbox" value="true" checked={this.state.haveanimal} onChange={this.typeAnimal}/></div>
                                <div className="col-sm-11 text-left"> I have animal </div>
                            </div>
                            <p className="signInErrorMsg text-danger">{this.state.errMsg}</p>
                            {this.state.loading ? <Loader/> : <SubmitBtn/>}
                            <br/><br/><br/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile