import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import API from '../api/api'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const search = urlParams.get('search')

class Search extends Component{
    constructor(){
        super()
        this.state={
            isData:false,
            data:[]
        }
    }

    componentDidMount() {
        const url = "/ad/search/"+search
        API.get(url).then(res=>{
            if(res.data.success===true){
                this.setState({
                    isData:true,
                    data:res.data.message
                })
            }
            else{
                this.setState({
                    isData:false
                })
            }
        })
    }

    render(){

        return(
            <div className="container">
                <br/>
                <p className="myStyleTitle h1">Search results for: <b>{search}</b></p>
                <p className="myStyleTitle">{this.state.data.length} results found</p><hr/><br/>
                {this.state.data.map(e =>
                    <div className="row border p-2 mt-2" key={e._id}>
                        <div className="col-lg-3">
                            <img src={e.photo[0]} alt={e.title} className="img-fluid"/>
                        </div>
                        <div className="col-lg-9">
                            <p className="myStyleTitle h1">{e.title}</p>
                            <p className="adDesc">{e.description}</p>
                            <div className="row">
                                <div className="col-lg-6">
                                    <p className="font-weight-bold">Rs. {e.price}</p>
                                </div>
                                <div className="col-lg-6">
                                <Link to={"/ad/detail/"+e._id}><button className="btn float-right">View more</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Search