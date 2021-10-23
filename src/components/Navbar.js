import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import '../style/style.css'
import API from '../api/api'

const signOutBtn = () => {
    API.get('/account/signout').then(res => {
        localStorage.clear()
        window.location.assign("/")
    })
}

const roleStorage = localStorage.getItem("role")

class NavbarUser extends Component{
    render(){
        const usernameStorage = localStorage.getItem("username")

        return(
            <div>
                <nav className="navbar my-navbar">
                        <p className="mr-auto">We care as you care</p>
                            <Link className="chat-nav" to="/message"><i className="fas fa-comments"></i> Contact Us</Link>
                    
                </nav>


          <div className="userNavbar my-contflu-bor">
                

          <nav className="navbar userNavbar navbar-expand-lg navbar-light main-nav container text-center">
  <Link className="navbar-brand" to="/"><img src="https://gist.githubusercontent.com/prashankhan/2da69d376f1cd65edd4f1720506801f9/raw/ada636d40234e3736c60485f082f9f40c954e83f/ragulogo.svg" width="160px" alt="Logo"/></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
      <form method="get" action="/search" style={{width:"100%"}}>
      <input type="text" placeholder="Search here..." className="form-control" name="search" style={{width:"100%"}}/>
      </form>

      <ul className="navbar-nav mr-auto">
      <li className="nav-item">
      <Link className="my-nav-link nav-link" to="/booking"><i className="far fa-calendar-alt "></i><br/>Booking</Link>
      </li>
      <li className="nav-item">
      {roleStorage==="user" ? <Link className="my-nav-link nav-link" to="/ad/create"><i className="fas fa-plus-circle"></i><br/>Post</Link> : ""}
      </li>
      <li className="nav-item dropdown">
        <Link className="my-nav-link nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-user-circle"></i><br/>
          Account
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        {/* <h6 className="dropdown-header">{props.username}</h6> */}
        {usernameStorage ? <div><Link to="/profile"><button className="dropdown-item" type="button">Edit Profile</button></Link>
        <Link to="/myads"><button className="dropdown-item" type="button">My ads</button></Link>
        <button className="dropdown-item" type="button" onClick={signOutBtn}>Sign out</button> </div> : <Link className="nav-link" to="/signin">Signin</Link>}
        </div>
      </li>
    </ul>
    
  </div>
</nav>

          </div>

            </div>
        )
    }
}

function NavbarAdminComp(){
    return(
        <div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link text-light" to="/admin/ads">Ads</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-light" to="/admin/rooms">Rooms</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-light" to="/admin/users">Users</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-light" to="/admin/messages">Messages</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-light" to="/admin/settings">Settings</Link>
                </li>
            </ul>
        </div>
    )
}

class NavbarAdmin extends Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <Link className="navbar-brand" to="/admin">MyPetInn</Link>
                    {roleStorage==="admin" ? <NavbarAdminComp/> : <br/>}
                </nav>
            </div>
        )
    }
}

class Navbar extends Component{
    render(){
        return(
            <div>
                {window.location.pathname==="/admin/login" || roleStorage==="admin" ? <NavbarAdmin/> : <NavbarUser/>}
            </div>
        )
    }
}
export default Navbar