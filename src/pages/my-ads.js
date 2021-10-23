import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import API from "../api/api"

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy+"-"+mm+"-"+dd

class EditModal extends Component{
    constructor(props){
        super(props)
        this.state={
            image:props.image[0],
            id:props.id,
            title:props.title,
            description:props.description,
            price:props.price,
            contact:props.contact,
            quantity:props.contact,
            duration:props.duration
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

    typeContact = (e) => {
        this.setState({
            contact:e.target.value
        })
    }

    typePrice = (e) => {
        this.setState({
            price:e.target.value
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

    sendEdit = (e) => {
        e.preventDefault()
        const sendDetails = {
            title:this.state.title,
            price:this.state.price,
            description:this.state.description,
            contact:this.state.contact,
            duration:this.state.duration,
            quantity:this.state.quantity
        }
        API.put("/ad/edit/"+this.state.id, sendDetails).then(res => {
            if(res.data.success===true){
                window.location.reload()
            }
            else{
                alert("Update fail. Please try again later...")
            }
        })
    }

    render(){
        return(            
            <div className="d-inline">
                <div className="modal fade bd-example-modal-xl" id={"editmodal"+this.state.id} tabIndex={"-1"} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <form onSubmit={this.sendEdit}>
                                <div className="modal-header text-center">
                                    <h4 className="modal-title w-100 font-weight-bold">Edit your ad</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body mx-3">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <img src={this.state.image} alt="ad" className="img-fluid"/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" onChange={this.typeTitle} value={this.state.title} placeholder="Title for your ad" className="form-control"/><br/>
                                            <textarea placeholder="Description" onChange={this.typeDescription} value={this.state.description} className="form-control"></textarea><br/>
                                            <input type="text" placeholder="Contact" onChange={this.typeContact} value={this.state.contact} className="form-control"/><br/>
                                            <input type="text" placeholder="Price" value={this.state.price} onChange={this.typePrice} className="form-control"/><br/>
                                            <input type="number" placeholder="quantity" value={this.state.quantity} onChange={this.typeQuantity} className="form-control"/><br/>
                                            <input type="text" value={this.state.duration} onFocus={(e)=>{e.currentTarget.type="date"}} onChange={this.typeDuration} min={today} onBlur={(e)=>{e.currentTarget.type="text"}} placeholder="Duration for your ad..." className="form-control" required={true}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer d-flex justify-content-center">
                                    <button className="btn btn-default" type="submit">Edit as save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <button className="btn mb-4 ml-2" data-toggle="modal" data-target={"#editmodal"+this.state.id}><i className="fas fa-edit"></i></button>
            </div>
        )
    }
}

class DeleteModal extends Component{

    constructor(props){
        super(props)
        this.state={
            id:props.id
        }
    }

    deleteAd = (e) => {
        API.delete("/ad/delete/"+this.state.id).then(dat => {
            if(dat.data.success===true){
                window.location.reload()
            }
            else{
                alert("Something went wrong")
            }
        })
    }

    render(){
        return(
            <div className="d-inline">
                <button type="button" className="btn btn-primary ml-2 mb-4" data-toggle="modal" data-target={"#deleteModal"+this.state.id}><i className="fas fa-trash"></i></button>
                <div className="modal fade" id={"deleteModal"+this.state.id} tabIndex={"-1"} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-notify modal-info" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p className="heading lead">Action required?</p>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="white-text">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="text-center">
                                    <i className="fas fa-trash fa-4x mb-3 animated rotateIn"></i>
                                    <p>Do you want yo permently delete your advertisement?</p>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" onClick={this.deleteAd} id={this.state.id} className="btn btn-danger">Continue, delete <i className="fas fa-trash ml-1 text-white"></i></button>
                                <button type="button" className="btn btn-outline-primary waves-effect" data-dismiss="modal">No, thanks</button>
                            </div>
                        </div>     
                    </div>
                </div>
            </div>
        )
    }
}

class Myads extends Component{
    constructor(){
        super()
        this.state = {
            data:[]
        }
    }

    componentDidMount() {
        API.get('/ad/my').then(res=>{
            this.setState({
                data: res.data.message
            })
        })
    }

    render(){
        return(
            <div className="container">
                {this.state.data.map(e =>
                    <div className="row border p-4 mt-2" key={e._id}>
                        <div className="col-lg-3">
                            <img src={e.photo[0]} alt={e.title} className="img-fluid"/>
                        </div>
                        <div className="col-lg-9">
                            <h2>{e.title}</h2>
                            <p className="adDesc">{e.description}</p>
                            <div className="row">
                                <div className="col-lg-9">
                                    <p>Rs. {e.price}</p>
                                </div>
                                <div className="col-lg-3">
                                <Link to={"/ad/detail/"+e._id}><button className="btn mb-4"><i className="fas fa-info"></i></button></Link>
                                <EditModal image={e.photo} id={e._id} title={e.title} duration={e.duration} description={e.description} price={e.price} contact={e.contact} quantity={e.quantity}/>
                                <DeleteModal id={e._id}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        )
    }
}

export default Myads