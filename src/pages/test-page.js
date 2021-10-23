import React, {Component} from 'react'
// import { List } from 'react-content-loader'
import DatePicker from "react-multi-date-picker"
import DatePickerHorizontal from "react-horizontal-datepicker";

const today = new Date()
const tomorrow = new Date();

tomorrow.setDate(tomorrow.getDate() + 1);
class Test extends Component{

    render(){
        return(
            <div>
                <h1>Hello</h1>
                {/* <DatePicker range={true}/> */}
                <DatePicker value={[today,tomorrow]}range/>
                <DatePickerHorizontal color={"#374e8c"}/>
            </div>
        )
    }
}

export default Test