import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Navbar } from '../components'
import Home from '../pages/home'
import Signin from '../pages/signin'
import Signup from '../pages/signup'
import ForgotPassword from '../pages/forgot-password'
import ForgotPasswordCode from '../pages/forgot-password-code'
import ForgotPasswordFinal from '../pages/forgot-password-final'
import Profile from '../pages/profile'
import Booking from '../pages/booking'
import BookingFinal from '../pages/booking-final'
import CreateAd from '../pages/create-ad'
import UploadAdImage from '../pages/upload-image-ad'
import AdDetail from '../pages/ad-detail'
import Myads from '../pages/my-ads'
import Message from '../pages/message'
import Search from '../pages/search'
import CommonProfile from '../pages/common-profile'
import Thankyou from '../pages/thankyou'
import Test from '../pages/test-page'

import AdminLogIn from '../pages/admin-login'
import AdminAdControl from '../pages/admin-ad-control'
import AdminRoom from '../pages/admin-room-view'
import AdminUser from '../pages/admin-users'
import AdminSetting from '../pages/admin-settings'
import AdminMessage from '../pages/admin-messages'
import AdminMessageView from '../components/admin-message-view'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/test" exact component={Test} />
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/forgot" exact component={ForgotPassword} />
        <Route path="/account/recovery" exact component={ForgotPasswordCode} />
        <Route path="/account/chpassword/:id" exact component={ForgotPasswordFinal} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile/:id" exact component={CommonProfile} />
        <Route path="/booking" exact component={Booking} />
        <Route path="/booking/submit" exact component={BookingFinal} />
        <Route path="/ad/create" exact component={CreateAd} />
        <Route path="/ad/upload" exact component={UploadAdImage} />
        <Route path="/ad/detail/:id" exact component={AdDetail} />
        <Route path="/myads" exact component={Myads} />
        <Route path="/message" exact component={Message} />
        <Route path="/search" exact component={Search} />
        <Route path="/thankyou" exact component={Thankyou} />

        <Route path="/admin/login" exact component={AdminLogIn} />
        <Route path="/admin/ads" exact component={AdminAdControl} />
        <Route path="/admin/rooms" exact component={AdminRoom} />
        <Route path="/admin/users" exact component={AdminUser} />
        <Route path="/admin/settings" exact component={AdminSetting} />
        <Route path="/admin/messages" exact component={AdminMessage} />
        <Route path="/admin/message/:id" exact component={AdminMessageView} />
      </Switch>
    </Router>
  )
}

export default App