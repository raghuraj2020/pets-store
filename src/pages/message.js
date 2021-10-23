import React, {Component} from 'react'
import API from '../api/api'

class RecieveMessage extends Component{
    render(){
        return(
            <div className="d-flex justify-content-start mb-4">
				<div className="img_cont_msg">
					<img src="logo.svg" className="rounded-circle user_img_msg" alt="profile"/>
				</div>
				<div className="msg_cotainer">
					{this.props.message}
				</div>
			</div>
        )
    }
}

class SendMessage  extends Component{
    render(){
        return(
            <div className="d-flex justify-content-end mb-4">
				<div className="msg_cotainer_send">
					{this.props.message}
				</div>
				<div className="img_cont_msg">
                    <img src={this.props.photo} className="rounded-circle user_img_msg" alt="profile"/>
				</div>
			</div>
        )
    }
}

class FilterMessage extends Component{
    render(){
        var photo;
        if(localStorage.getItem("photo") !== null){
            photo = localStorage.getItem("photo")
        }
        else{
            photo = "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
        }
        if(this.props.admin===true){
            return(
                <div>
                    <RecieveMessage message={this.props.message}/>
                </div>
            )
        }
        else{
            return(
                <div>
                    <SendMessage message={this.props.message} photo={photo}/>
                </div>
            )
        }
    }
}

class Message extends Component{
    constructor(){
        super()
        this.state={
            data:[],
            message:""
        }
    }

    componentDidMount() {
        if(localStorage.getItem("role")==="user"){
            API.get("/message/user/view").then(res=>{
                if(res.data.success===false){
                    alert("You must sign in again")
                }
                else{
                    this.setState({
                        data:res.data
                    })
                }
            })
        }
        else{
            var path = sessionStorage.getItem("tempID")
            API.get("/message/common/view/"+path).then(res=>{
                if(res.data.success===false){
                    alert("You must sign in again")
                }
                else{
                    this.setState({
                        data:res.data
                    })
                }
            })
        }
    }

    typeMessage = (e) => {
        this.setState({
            message:e.target.value
        })
    }

    sendMessage = (e) => {
        e.preventDefault()
        if(localStorage.getItem("role")!=="user" && !sessionStorage.getItem("tempID")){
            var OSName = "Unknown";
            if (navigator.userAgent.indexOf("Win") !== -1) OSName = "Windows";
            if (navigator.userAgent.indexOf("Mac") !== -1) OSName = "Macintosh";
            if (navigator.userAgent.indexOf("Linux") !== -1) OSName = "Linux";
            if (navigator.userAgent.indexOf("Android") !== -1) OSName = "Android";
            if (navigator.userAgent.indexOf("like Mac") !== -1) OSName = "iOS";
            var username=OSName+Math.floor(Math.random() * 100000000)+10000000
            sessionStorage.setItem("tempID",username)
        }
        if(localStorage.getItem("role")!=="user"){
            //guest send message
            var sendDetails = {
                temp_id:sessionStorage.getItem("tempID"),
                message:this.state.message
            }
            API.post('/message/common/send', sendDetails).then(res => {
                if(res.data.success===true){
                    window.location.reload()
                    this.setState({
                        message:""
                    })
                }
                else{
                    alert(res.data.message)
                }
            })
        }
        else{
            // user send message
            sendDetails = {message: this.state.message}
            API.post('/message/user/send', sendDetails).then(res => {
                if(res.data.success===true){
                    window.location.reload()
                    this.setState({
                        message:""
                    })
                }
                else{
                    alert(res.data.message)
                }
            })
        }
    }

    render() {
        return(
           <div className="container">
               <div className="row">
                <div className="col-lg-2">

                </div>

                <div className="col-lg-8">
                <div className="messageBody">
                <div className="card-body msg_card_body">
                    {this.state.data.map(e => 
                        <div key={e._id}>
                            <FilterMessage message={e.message} admin={e.admin}/>
                        </div>
                    )}
				</div>
				<div className="card-footer">
					<div className="input-group">
						<input value={this.state.message} type="text" onChange={this.typeMessage} className="form-control type_msg" placeholder="Send message to admin..."></input>
						<div className="input-group-append">
							<span onClick={this.sendMessage} className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
						</div>
					</div>
				</div>
            </div>
                </div>

                <div className="col-lg-2">

                </div>
               </div>

           </div>
            

            ///////////////////////////////////
        )
    }
}

export default Message