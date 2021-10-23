import React,{Component} from 'react'
import API from '../api/api'

class RecieveMessage extends Component{
    render(){
        return(
            <div className="d-flex justify-content-start mb-4">
				<div className="img_cont_msg">
					<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" alt="profile"/>
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
                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" alt="profile"/>
				</div>
			</div>
        )
    }
}

class FilterMessage extends Component{
    render(){
        if(this.props.admin===true){
            return(
                <div>
                    <SendMessage message={this.props.message}/>
                </div>
            )
        }
        else{
            return(
                <div>
                    <RecieveMessage message={this.props.message}/>
                </div>
            )
        }
    }
}

class AdminMessageView extends Component{
    constructor(){
        super()
        this.state={
            data:[],
            user_id:"",
            temp_id:"",
            message:""
        }
    }

    componentDidMount() {
        const id= this.props.match.params.id
        API.get("/message/admin/view/"+id).then(res=>{
            if(res.data.success===false){
                alert("You must log in")
                window.location.assign("/admin/login")
            }
            this.setState({
                data:res.data.message,
                user_id:res.data.message[0]['user_id'],
                temp_id:res.data.message[0]['temp_id']
            })
        })
    }

    typeMessage = (e) => {
        this.setState({
            message:e.target.value
        })
    }

    sendMessage = (e) => {
        e.preventDefault()
        const sendDetails={
            message:this.state.message,
            temp_id:this.state.temp_id,
            user_id:this.state.user_id
        }
        API.post('/message/admin/send', sendDetails).then(res => {
            if(res.data.success===true){
                window.location.reload()
            }
            else{
                alert("Message not sent")
            }
        })
    }

    render(){
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
         <input type="text" value={this.state.message} onChange={this.typeMessage} className="form-control type_msg" placeholder="Type your message..."></input>
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
        )
    }
}

export default AdminMessageView