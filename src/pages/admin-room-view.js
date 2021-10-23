import React,{Component} from 'react'
import API from '../api/api'
import Chart from "react-google-charts";
import DatePicker from "react-horizontal-datepicker";

// import API from '../api/api'

// class AdminRoomOld extends Component{

//     constructor(){
//         super()
//         this.state={
//             data:[]
//         }
//     }

//     componentDidMount() {
//         API.get("/room/admin/booking/view").then(res=>{
//             this.setState({
//                 data:res.data
//             })
//         })
//     }

//     render(){
//         return(
//             <div className="container">
//                 <h1 className="text-center"><code>Showing pet room booking details</code></h1><hr/>
//                 <table className="table table-bordered">
//                     <thead>
//                         <tr>
//                             <th scope="col">First name</th>
//                             <th scope="col">Last name</th>
//                             <th scope="col">Email</th>
//                             <th scope="col">Gender</th>
//                             <th scope="col">Phone</th>
//                             <th scope="col">Start</th>
//                             <th scope="col">End</th>
//                             <th scope="col">Animal</th>
//                             <th scope="col">PIN</th>
//                             <th scope="col">NIC</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.state.data.map(e => 
//                             <tr key={e._id}>
//                                 <td>{e.firstname}</td>
//                                 <td>{e.lastname}</td>
//                                 <td>{e.email}</td>
//                                 <td>{e.gender}</td>
//                                 <td>{e.phone}</td>
//                                 <td>{e.startdate}</td>
//                                 <td>{e.enddate}</td>
//                                 <td>{e.animal}</td>
//                                 <td>{e.PIN}</td>
//                                 <td>{e.NIC}</td>
//                             </tr>    
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }

class AdminRoom extends Component{

    constructor(){
        super()
        this.state={
            data:[],
            data2:[],
            data3:[],
            chooseDate:"",
            availableRoomMessage:"",
            availableDogRoom:"",
            availableCatRoom:""
        }
    }
    
    componentDidMount() {
        API.get("/booking/info").then(res=>{
            if(res.data.success === false){
                alert(res.data.message)
            }
            else{
                this.setState({
                    data:res.data.message
                })
            }
        })

        API.get("/booking/newrequest").then(res=>{
            if(res.data.success === false){
                alert(res.data.message)
            }
            else{
                this.setState({
                    data2:res.data.message
                })
            }
        })

        API.get("/booking/oldrequest").then(res=>{
            if(res.data.success === false){
                alert(res.data.message)
            }
            else{
                this.setState({
                    data3:res.data.message
                })
            }
        })
    }

    chooseDate = (e) => {
        var date = new Date(e),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        date = [date.getFullYear(), mnth, day].join("-");
        API.get("/booking/check/?date="+date).then(res=>{
            if(res.data.success===true){
                this.setState({
                    chooseDate:date,
                    availableRoomMessage:res.data.cat+" cat rooms, and "+res.data.dog+" dog rooms"
                })
            }
        })
    }   

    typeDog = (e) => {
        this.setState({
            availableDogRoom:e.target.value
        })
    }

    typeCat = (e) => {
        this.setState({
            availableCatRoom:e.target.value
        })
    }

    updateForm = (e) => {
        e.preventDefault()
        const sendUpdate = {
            date:this.state.chooseDate,
            cat:this.state.availableCatRoom,
            dog:this.state.availableDogRoom
        }
        API.post("/booking/update", sendUpdate).then(res => {
            if(res.data.success===false){
                alert(res.data.message)
            }
            else{
                window.location.reload()
            }
        })
    }

    mergeBtn(e){
        API.put("/booking/changestatus", {id:e.target.id, status:"done"}).then(res => {
            if(res.data.success===false){
                alert(res.data.message)
            }
            else{
                window.location.reload()
            }
        })
    }

    render(){

        const data = [
            ["Date", "Dog Rooms(10)", "Cat Rooms(10)"]
        ];
        const array = this.state.data
        array.sort(function(a, b){ 
            return new Date(a.date) - new Date(b.date); 
        });
        array.map (e => 
            data.push([e.date, 10-e.dogRoom, 10-e.catRoom])
        )
        const options = {
            chart: {
              title: "Booking Information",
              subtitle: "Rooms & Booking users"
            }
        };

        return(
            <div className="container">
                <h1 className="text-center"><code>Booking information</code></h1><hr/>
                <Chart chartType="Line" width="100%" height="400px" data={data} options={options}/>
                <hr/>
                <DatePicker getSelectedDay={this.chooseDate} color="#13519b" endDate={90}/>
                <hr/>
                <p className="myStyleTitle text-success float-right"><small>{this.state.availableRoomMessage}</small></p>
                <p className="myStyleTitle">{this.state.chooseDate}</p>
                <form onSubmit={this.updateForm}>
                    <div className="row">
                        <div className="col-sm-5">
                            <input type="number" value={this.state.availableCatRoom} onChange={this.typeCat} className="form-control" placeholder="Available cat rooms" required={true}/>
                        </div>
                        <div className="col-sm-5">
                            <input type="number" value={this.state.availableDogRoom} onChange={this.typeDog} className="form-control" placeholder="Available dog rooms" required={true}/>
                        </div>
                        <div className="col-sm-2">
                            <input type="submit" className="btn" value="Update"/>
                        </div>
                    </div>
                </form>
                
                <hr/>
                <p className="myStyleTitle">New Requests</p>
                <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Start date</th>
                            <th scope="col">End date</th>
                            <th scope="col">Cat</th>
                            <th scope="col">Dog</th>
                            <th scope="col">NIC</th>
                            <th scope="col">Function</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data2.map (e => 
                            <tr key={e._id}>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.address}</td>
                                <td>{e.phone}</td>
                                <td>{e.startdate}</td>
                                <td>{e.enddate}</td>
                                <td>{e.catCount}</td>
                                <td>{e.dogCount}</td>
                                <td>{e.NIC}</td>
                                <th><button className="btn" onClick={this.mergeBtn} id={e._id}>Merge</button></th>
                            </tr>    
                        )}
                    </tbody>
                </table>
                </div>
                
                <hr/>
                <p className="myStyleTitle">Old Requests</p>                
                <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Start date</th>
                            <th scope="col">End date</th>
                            <th scope="col">Cat</th>
                            <th scope="col">Dog</th>
                            <th scope="col">NIC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data3.map (e => 
                            <tr key={e._id}>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.address}</td>
                                <td>{e.phone}</td>
                                <td>{e.startdate}</td>
                                <td>{e.enddate}</td>
                                <td>{e.catCount}</td>
                                <td>{e.dogCount}</td>
                                <td>{e.NIC}</td>
                            </tr>    
                        )}
                    </tbody>
                </table>
                </div>

            </div>
        )
    }
}

export default AdminRoom