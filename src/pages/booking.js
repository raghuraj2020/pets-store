import React, {Component} from 'react'
import DatePicker from 'react-horizontal-datepicker'
import API from '../api/api'
// import API from '../api/api'

// function Loader(){
//     return(
//         <div className="text-center text-primary display-1">
//             <div className="spinner-border" role="status">
//                 <span className="sr-only">Loading...</span>
//             </div>
//         </div>
//     )
// }


// class Booking extends Component {

//     constructor(){
//         super()
//         this.state={
//             loading:false
//         }
//     }

//     dogBtn = () =>{
//         this.setState({
//             loading:true
//         })
//         API.get('/room/check/dog').then(res => {
//             if(res.data.available===true && res.data.success){
//                 sessionStorage.setItem("animal", "dog")
//                 window.location.assign("/booking/submit")
//             }
//             else{
//                 alert('Room unavailable')
//             }
//             this.setState({
//                 loading:false
//             })
//         })
//     }

//     catBtn = () =>{
//         this.setState({
//             loading:true
//         })
//         API.get('/room/check/cat').then(res => {
//             if(res.data.available===true && res.data.success){
//                 sessionStorage.setItem("animal", "cat")
//                 window.location.assign("/booking/submit")
//             }
//             else{
//                 alert('Room unavailable')
//             }
//             this.setState({
//                 loading:false
//             })
//         })
//     }

//     render(){
//         return(
//             <div className="container text-center">
//                 <h1 className="text-center text-primary">Choose your Pet room</h1>
//                 <hr/>
//                 <button className="btn btn-primary m-5" onClick={this.dogBtn}>Dog Room</button>
//                 <button className="btn btn-primary m-5" onClick={this.catBtn}>Cat Room</button>
//                 {this.state.loading ? <Loader/> : <hr/>}
//             </div>
//         )
//     }
// }

class Booking extends Component{

    constructor(){
        super()
        this.state={
            startdate:"",
            message:"",
            dog:0,
            dogDisable:false,
            availableDog:"",
            cat:0,
            catDisable:false,
            availableCat:""
        }
    }

    chooseStartDate = (e) => {
        var date = new Date(e),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        date = [date.getFullYear(), mnth, day].join("-");
        this.setState({
            startdate:date
        })
        API.get("/booking/check/?date="+date).then(res=>{
            if(res.data.success===false){
                this.setState({
                    message:res.data.message
                })
            }
            else{
                var availableMessage = ""
                if(res.data.dog===0 && res.data.cat===0){
                    availableMessage = "No rooms are avilable. choose different date"
                    this.setState({
                        catDisable:true,
                        dogDisable:true
                    })
                }
                else if(res.data.dog===0 && res.data.cat>0){
                    availableMessage = "Only "+res.data.cat+" cat rooms are available"
                    this.setState({
                        catDisable:false,
                        dogDisable:true
                    })
                }
                else if(res.data.cat===0 && res.data.dog>0){
                    availableMessage = "Only "+res.data.dog+" dog rooms are available"
                    this.setState({
                        catDisable:true,
                        dogDisable:false
                    })
                }
                else{
                    availableMessage = res.data.cat+" cat rooms and "+res.data.dog+" dog rooms are available"
                    this.setState({
                        catDisable:false,
                        dogDisable:false
                    })
                }
                this.setState({
                    message: availableMessage,
                    availableDog:res.data.dog,
                    availableCat:res.data.cat
                })
            }
        })
    }

    typeCat = (e) => {
        this.setState({
            cat:e.target.value
        })
    }

    typeDog = (e) => {
        this.setState({
            dog:e.target.value
        })
    }

    checkForm = (e) => {
        e.preventDefault()
        if(this.state.dog>0 || this.state.cat>0){
            sessionStorage.setItem("startdate", this.state.startdate)
            sessionStorage.setItem("dog", this.state.dog)
            sessionStorage.setItem("cat", this.state.cat)
            window.location.assign("/booking/submit")
        }
        else{
            alert('Please choose any room')
        }
    }

    render(){
        return(
           <div className="container">
                <div className="bg-white rounded mt-3 p-3 pb-3">
                <br/>
                <p className="text-center myStyleTitle h1">Choose your booking date</p><hr/>
                <div className="picker-cont">
                <DatePicker color="#13519b" getSelectedDay={this.chooseStartDate} labelFormat={'MMMM'}/>
                </div>
                <hr/>
                <p className="myStyleTitle h2">{this.state.message}</p>
                <form onSubmit={this.checkForm}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><i className="fas fa-cat"></i></div>
                            </div>
                            <input type="number" disabled={this.state.catDisable} onChange={this.typeCat} min={0} max={this.state.availableCat} placeholder="Number of Cat rooms" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-lg-6 input-group">
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><i className="fas fa-dog"></i></div>
                            </div>
                            <input type="number" disabled={this.state.dogDisable} onChange={this.typeDog} min={0} max={this.state.availableDog} placeholder="Number of Dog rooms" className="form-control"/>
                        </div>
                    </div>
                    
                </div>
                <div className="">
                        <button className="btn btn-primary form-control mt-3 mb-3" type="submit">Book now</button>
                    </div>
                </form>
            </div>

        </div>
        )
    }
}

export default Booking