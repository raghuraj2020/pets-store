import Navbar from './Navbar'
///////////////////
import React,{Component} from 'react'
import API from '../api/api'

class Test extends Component{
    constructor(){
        super()
        this.state = {
            name:"react",
            ads:[]
        }
    }

    render(){
        return (
            <div>
                <h1>{this.state.name}</h1>
                <p>
                    <button onClick={this.get}>Get</button>
                    <button onClick={this.post}>Post</button>
                    <button onClick={this.viewMessage}>View all ads</button>
                    <button onClick={this.save}>Save storage</button>
                    <button onClick={this.view}>View storage</button>
                    <button onClick={this.change}>Change storage</button>
                </p>
            </div>
        )
    }

    get = ()=> {
        API.get('/ads').then(resp => {
            console.log(resp.data);
        });
    }

    post = ()=>{
        API.post(`/message/common/send`, { temp_id:"78hgjj", message:"Hi am react part 2" }).then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    viewMessage = ()=>{
        API.get('/admin/ads').then(res=> {
            console.log(res.data)
        })
    }

    save=()=>{
        localStorage.setItem("name","Raghu")
    }

    view=()=>{
        alert(localStorage.getItem("name"))
    }

    change=()=>{
        localStorage.setItem("name","Ruban")
    }

}

export { Navbar, Test}

// import React, {Component} from "react"
// import axios from 'axios'

// class One extends Component{
//   constructor()
//   {
//     super()
//     this.state = {
//       data:[]
//     }
//   }

//   componentDidMount()
//   {
//     axios.get("http://localhost:8000/ads").then(e => {
//       this.setState({
//         data:e.data
//       })
//     })
//   }

//   render(){
//     return(
//       <div>
//         <ul>
//           {this.state.data.map(e => <li> {e.title}</li>)}
//         </ul>
//       </div>
//     )
//   }
// }

// export default One
