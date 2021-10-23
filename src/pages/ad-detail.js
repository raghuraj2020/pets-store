import React, {Component} from 'react'
import API from '../api/api'
import {Link} from 'react-router-dom'

class SmallImg extends Component{
    render(){
        var a = this.props.path
        return(
            <div className="">
                {a.map(e => <img src={e} className="smallImg mt-3 rounded" key={e} alt={e}/>)}
            </div>
        )
    }
}

class ImageViewer extends Component{
    render(){
        return(
            <div className="col-lg-6">
                <img src={this.props.images[0]} className="img-fluid rounded" alt={this.props.images[0]}/>
                    <SmallImg path={this.props.images}/>
            </div>
        )
    }
}

class AdDetail extends Component{
    constructor(){
        super()
        this.state={
            title:"",
            photo:[],
            description:"",
            price:"",
            contact:"",
            adID:"",
            duration:"",
            quantity:"",
            userID:""
        }
    }

    componentDidMount() {
        const url="/ad/"+this.props.match.params.id
        API.get(url).then(res=>{
            this.setState({
                adID:res.data._id,
                duration:res.data.duration,
                title: res.data.title,
                photo:res.data.photo,
                description:res.data.description,
                price:res.data.price,
                contact:res.data.contact,
                quantity:res.data.quantity,
                userID:res.data.user_id
            })
        })
    }

    render(){
        return(
            <div className="container bg-white rounded mt-5 pt-3 pb-5 mb-5">
                <div className="row line">
                    <ImageViewer images={this.state.photo}/>
                    <div className="col-sm-6">
                        <h3 className="myStyleTitle" >{this.state.title}</h3>
                        <hr/>
                        <p className="ad-de-des">{this.state.description}</p>
                        <p className="text-primary">{this.state.quantity} available</p>
                        <br/><br/>
                        <h4 className="myStyleTitle h3"><small>Rs. </small>{this.state.price}</h4><br/>
                        <p className="myStyleTitle h2">Contact info : {this.state.contact}</p><br/><br/>
                        <Link to={"/profile/"+this.state.userID } className="btn btn-primary btn-block">More info for this ad owner</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdDetail