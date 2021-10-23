import React,{ Component } from 'react'
import BookingComp from '../components/homepage/booking'
import ViewAds from '../components/homepage/viewads'

class Home extends Component{
    render(){
        return(
            <div>
                <BookingComp/>
                <ViewAds/>
            </div>
        )
    }
}

export default Home