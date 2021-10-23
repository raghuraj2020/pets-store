import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import API from '../api/api'

class NameGenerator extends Component{

    constructor(props){
        super(props)
        this.state={
            username:""
        }
    }

    async componentDidMount() {     
        const { data } = await API.get('/common/profile/'+this.props.id)
        if(data.message.username===undefined){
            this.setState({username:this.props.id})
        }
        else{
            this.setState({username:data.message.username})
        }    
    }

    render(){
        return(
            <div>
                <li className="list-group-item">{this.state.username}</li>
            </div>
        )
    }
}

class AdminMessage extends Component{

    constructor(){
        super()
        this.state={
            data:[]
        }
    }

    componentDidMount() {
        API.get("/message/admin/viewchat").then(res=>{
            if(res.data.success===false){
                alert("You must log in")
                window.location.assign("/admin/login")
            }
            this.setState({
                data:res.data.message
            })
        })
    }

    render(){
        return(
            <div className="container">
                <p className="text-center myStyleTitle h1 line">Client messages</p><hr/><br/>
                <div>
                    <ul className="list-group">
                        {this.state.data.map (e => 
                            <Link to={"/admin/message/"+e} key={e}><NameGenerator id={e}/></Link>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default AdminMessage