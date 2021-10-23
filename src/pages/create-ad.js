import React,{Component} from 'react'
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
        <input type="submit" value="Next" className="btn btn-primary signInBtn"/>
    )
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy+"-"+mm+"-"+dd

class CreateAd extends Component{

    constructor(){
        super()
        this.state={
            title:"",
            description:"",
            price:"",
            contact:"",
            category:"",
            quantity:"",
            duration:"",
            loading:false,
            errMsg:""
        }
    }

    typeTitle = (e) => {
        this.setState({
            title:e.target.value
        })
    }

    typeDescription = (e) => {
        this.setState({
            description:e.target.value
        })
    }

    typePrice = (e) => {
        this.setState({
            price:e.target.value
        })
    }

    typeContact = (e) => {
        this.setState({
            contact:e.target.value
        })
    }

    typeCategory = (e) => {
        this.setState({
            category:e.target.value
        })
    }

    typeQuantity = (e) => {
        this.setState({
            quantity:e.target.value
        })
    }

    typeDuration = (e) => {
        this.setState({
            duration:e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        const sendDetails = {
            title:this.state.title,
            price:this.state.price,
            description:this.state.description,
            category:this.state.category,
            contact:this.state.contact,
            duration:this.state.duration,
            quantity:this.state.quantity
        }
        this.setState({
            loading:true
        })

        API.post("/ad", sendDetails).then(res => {
            if(res.data['success']){                
                this.setState({
                    loading:false
                })
                sessionStorage.setItem("isAD", true)
                sessionStorage.setItem("adID", res.data["adID"])
                window.location.assign("/ad/upload")
            }
            else{
                this.setState({
                    loading:false
                })
                alert(res.data['message'])
            }
        })
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">

                    </div>

                    <div className="col-lg-8 bg-white mt-5 rounded">
                    <div className="pt-3 pb-5">
                <h2 className="text-center myStyleTitle ">Create your own ad</h2>
                <hr/>
                <form onSubmit={this.submitForm}>
                    <input type="text" onChange={this.typeTitle} value={this.state.title} required={true} placeholder="Enter a title for your advertisement" className="form-control"/>
                    <br/>
                    <textarea required={true} onChange={this.typeDescription} value={this.state.description} className="form-control" placeholder="Description for your advertisement"></textarea>
                    <div className="row line">
                        <div className="col-sm-6">
                            <input type="number" onChange={this.typePrice} value={this.state.price} placeholder="Price" className="form-control"/>
                        </div>
                        <div className="col-sm-6">
                            <input required={true} onChange={this.typeContact} value={this.state.contact} type="text" placeholder="Contact... Ex: Phone number or Email" className="form-control"/>
                        </div>
                    </div>
                    <div className="row line">
                        <div className="col-sm-4">
                            <select name="category" onChange={this.typeCategory} value={this.state.category} className="form-control" placeholder="Choose category">
                                <option value="">Choose category</option>
                                <option value="animal">Animal</option>
                                <option value="bird">Bird</option>
                                <option value="food">Pet Food</option>
                                <option value="service">Pet medical service</option>
                            </select>
                        </div>
                        <div className="col-sm-4">
                            <input type="number" onChange={this.typeQuantity} value={this.state.quantity} placeholder="Quantity" className="form-control"/>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" onChange={this.typeDuration} value={this.state.duration} onFocus={(e)=>{e.currentTarget.type="date"}} min={today} onBlur={(e)=>{e.currentTarget.type="text"}} placeholder="Duration for your ad..." className="form-control" required={true}/>
                        </div>
                    </div>
                    <div className="row line">
                        <div className="col-sm-8">
                            <input type="checkbox" required={true}/>  I accepted the <span data-toggle="modal" data-target="#exampleModalLong"><b><u>mypetinn</u></b> </span>rules
                        </div>
                        <div className="col-sm-4">
                            {this.state.loading ? <Loader/> : <SubmitBtn/>}        
                        </div>
                    </div>

                    <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">My petinn Ad rules</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <ul>
                                        <li>Only accepted pet or animal related ads.</li>
                                        <li>Your contact details is should be correct</li>
                                        <li>Mypetinn can block your advertisement</li>
                                        <li>Don't use copyright pictures...</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
                    </div>

                    <div className="col-lg-2">

                    </div>

                </div>

            </div>
        )
    }
}


export default CreateAd