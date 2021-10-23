import React, {Component} from 'react'
import API from '../api/api'

class VisibleChange extends Component{

    constructor(props){
        super(props)
        this.state={
            visible:this.props.visible
        }
    }

    changeVisibleSend = (e) => {
        // alert(this.props.path+ " "+ e.target.checked)
        const url = "/admin/ad/permision/"+this.props.path
        API.post(url, {visible:e.target.checked}).then(res => {
            if(res===true){
                this.setState({
                    visible:res.data.visible
                })
            }
            else{
                this.setState({
                    visible:res.data.visible
                })
            }
        })
    }

    render(){
        return(
            <input type="checkbox" onChange={this.changeVisibleSend} checked={this.state.visible}/>
        )
    }
}

class AdminAdControl extends Component{

    constructor(){
        super()
        this.state={
            data:[]
        }
    }

    componentDidMount() {
        API.get("/admin/ads").then(res=>{
            this.setState({
                data:res.data
            })
        })
    }

    render(){
        return(
            <div className="container">
                <h1 className="text-center"><code>Showing total ads</code></h1><hr/>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Image</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Visible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(e => 
                            <tr key={e._id}>
                                <td>{e.title}</td>
                                <td><a href={e.photo[0]} target="blank">Image</a></td>
                                <td>{e.contact}</td>
                                <td>{e.price}</td>
                                <td>{e.status}</td>
                                <td><VisibleChange path={e._id} visible={e.visible}/></td>
                            </tr>    
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AdminAdControl