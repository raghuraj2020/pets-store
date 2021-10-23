import React, {Component} from 'react'
import API from '../api/api'


class CommonProfile extends Component{

    constructor(){
        super()
        this.state={
            isData:false,
            data:[]
        }
    }

    componentDidMount() {
        const url = "/common/profile/"+this.props.match.params.id
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
                <img className="rounded-circle img-thumbnail mx-auto d-block mt-5 profileImg" alt={this.state.data.username+" 's photo"} src={this.state.data.photo}/>
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th>First name: </th>
                            <td>{this.state.data.firstname}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Last name: </th>
                            <td>{this.state.data.lastname}</td>
                        </tr>
                        <tr>
                            <th>User name: </th>
                            <td>{this.state.data.username}</td>
                        </tr>
                        <tr>
                            <th>Gender: </th>
                            <td>{this.state.data.gender}</td>
                        </tr>
                        <tr>
                            <th>Phone: </th>
                            <td>{this.state.data.phone}</td>
                        </tr>
                        <tr>
                            <th>Email: </th>
                            <td>{this.state.data.email}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CommonProfile