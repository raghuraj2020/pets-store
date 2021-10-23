import React, {Component} from 'react'
import API from '../api/api'


class AdminUser extends Component{

    constructor(){
        super()
        this.state={
            data:[]
        }
    }

    componentDidMount() {
        API.get("/admin/users").then(res=>{
            this.setState({
                data:res.data
            })
        })
    }

    render(){
        return(
            <div className="container">
                <h1 className="text-center"><code>Users List</code></h1>
                <hr/>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">First name</th>
                            <th scope="col">Last name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">DOB</th>
                            <th scope="col">id</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(e => 
                            <tr key={e._id}>
                                <td>{e.firstname}</td>
                                <td>{e.lastname}</td>
                                <td>{e.phone}</td>
                                <td>{e.dob}</td>
                                <td>{e._id}</td>
                                <td>{e.username}</td>
                                <td>{e.email}</td>
                                <td>{e.gender}</td>
                                <td><img src={e.photo} className="img-fluid" alt="user"/></td>
                            </tr>    
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AdminUser