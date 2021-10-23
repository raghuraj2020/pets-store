import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import API from '../api/api'

function Loader(){
    return(
        <div className="text-center text-primary line">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

function SubmitBtn(){
    return(
        <input type="submit" value="Submit" className="btn btn-primary btn-block bk-btn"/>
    )
}

class RandomAd extends Component{

    constructor(){
        super()
        this.state={
            id:"",
            description:"",
            image:"",
            title:""
        }
    }

    componentDidMount() {
        API.get('/ad/search/a').then(res=>{
            this.setState({
                id: res.data.message[0]['_id'],
                title: res.data.message[0]['title'],
                description: res.data.message[0]['description'],
                image: res.data.message[0]['photo'],
            })
        })
    }

    render(){
        return(
            <div>
                <div className="card" style={{width: "18rem"}}>
                    <img className="card-img-top" src={this.state.image[0]} alt="ad"/>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.title}</h5>
                        <p className="card-text">{this.state.description}</p>
                        <Link to="/" className="btn btn-primary">View more</Link>
                    </div>
                </div>
            </div>
        )
    }
}

class BookingFinal extends Component{

    constructor(){
        super()
        this.state={
            name:"",
            email:"",
            phone:"",
            address:"",
            nic:"",
            startdate:sessionStorage.getItem("startdate"),
            catCount:sessionStorage.getItem("cat"),
            dogCount:sessionStorage.getItem("dog"),
            enddate:"",
            errMsg:"",
            loading:false
        }
    }

    typeName = (e) => {
        this.setState({
            name:e.target.value
        })
    }

    typeEmail = (e) => {
        this.setState({
            email:e.target.value
        })
    }

    typePhone = (e) => {
        this.setState({
            phone:e.target.value
        })
    }

    typeAddress = (e) => {
        this.setState({
            address:e.target.value
        })
    }

    typeNIC = (e) => {
        this.setState({
            nic:e.target.value
        })
    }

    typeEnddate = (e) => {
        this.setState({
            enddate:e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        const sendDetails = {
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            phone:this.state.phone,
            startdate:this.state.startdate,
            catCount:this.state.catCount,
            dogCount:this.state.dogCount,
            enddate:this.state.enddate,
            NIC:this.state.nic
        }
        this.setState({
            loading:true
        })
        API.post('/booking/register', sendDetails).then(res => {
            if(res.data["success"]===true){
                sessionStorage.setItem("thankyou",true)
                this.setState({
                    loading:false
                })
                window.location.assign("/thankyou")
            }
            else{
                alert(res.data['message'])
                this.setState({
                    loading:false
                })
            }
        })
    }

    render(){
        return(
            <div className="container line">
                <div className="row">
                    <div className="col-lg-8 lin bg-white pt-3 bk2-cont rounded pb-3">
                        <h2 className="text-center myStyleTitle">Register your information</h2>
                        <hr/>
                        <form onSubmit={this.submitForm}>
                            <input type="text" value={this.state.name} onChange={this.typeName} placeholder="Name" className="form-control line" required={true}/>
                            <input type="email" value={this.state.email} onChange={this.typeEmail} placeholder="Email address" className="form-control line" required={true}/>
                            <input type="number" value={this.state.phone} onChange={this.typePhone} placeholder="Phone Number" className="form-control line" required={true}/>
                            <input type="text" value={this.state.address} onChange={this.typeAddress} placeholder="Address" className="form-control line" required={true}/>
                            <input type="text" value={this.state.nic} onChange={this.typeNIC} placeholder="NIC Number" className="form-control line" required={true}/>
                            <input type="text" value={this.state.enddate} onChange={this.typeEnddate} onFocus={(e)=>{e.currentTarget.type="date"}} min={this.state.startdate} onBlur={(e)=>{e.currentTarget.type="text"}} placeholder="End date" className="form-control line" required={true}/>
                            <p className="signInErrorMsg text-danger line">{this.state.errMsg}</p>
                            {this.state.loading ? <Loader/> : <SubmitBtn/>}
                        </form>
                    </div>
                    <div className="col-lg-4">
                        <iframe title="Funny video" height="315" src="https://www.youtube.com/embed/B1CPE6WWsAQ?autoplay=1&mute=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <hr/>
                        <RandomAd/>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookingFinal