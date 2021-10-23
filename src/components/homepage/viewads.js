import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import API from "../../api/api"

class ViewAds extends Component{
    _isMounted = false;
    constructor(){
        super()
        this.state = {
            data:[]
        }
    }

    componentDidMount() {
        this._isMounted = true;
        API.get('/ads').then(res=>{
            this.setState({
                data: res.data
            })
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render(){
        return(
            <div className="container">
                <div className="row bg-white mt-5 mb-5 listing-view-row">
                    <div className="col-lg-3 p-3">
                    <p className="myStyleTitle ">Recent Ads</p><hr/>
                        {this.state.data.map(e =>
                                <p className="recent-ads" key={e._id}><Link className="myStyleTitle h3" to={"/ad/detail/"+e._id}>{e.title.substring(0,20)}</Link></p>
                            )}
                    </div>
                    <div className="col-lg-9 p-3 ">
                        <p className="myStyleTitle ">Let's buy your favorite pets...</p>
                    {this.state.data.map(e =>
                    <Link to={"/ad/detail/"+e._id} key={e._id} className="add-link">
                    <div className="row my-ad-row pt-3 pb-3 mt-2 mr-3" key={e._id}>
                        <div className="col-lg-3">
                            <img src={e.photo[0]} alt={e.title} className="img-thumbanail view-ad-img"/>
                        </div>
                        <div className="col-lg-9">
                            <p className="myStyleTitle h3">{e.title}</p>
                            <p className="adDesc">{e.description.substring(0,110)}...</p>
                            <div className="row">
                                <div className="col-lg-6">
                                    <p className="myStyleTitle h3">Rs. {e.price}</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    </Link>
                )}

                    </div>

                </div>
            </div>
        )
    }
}

export default ViewAds