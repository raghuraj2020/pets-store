import React, {Component} from 'react'
import API from '../api/api'

function ImageUploadBtn(){
    return(
        <input type="submit" className="btn btn-primary" value="Upload image"/>
    )
}

function Loader(){
    return(
        <div className="text-center text-primary">
            <img src="https://cdn.dribbble.com/users/108607/screenshots/670667/dog_mc.gif" width="120px" alt="loader"/>
        </div>
    )
}

class ImageComp extends Component{

    constructor(){
        super()
        this.state={
            image:null,
            imageloader:false
        }
    }

    selectImage = (e) => {
        this.setState({
            image: e.target.files
        })

    }

    uploadImage = (e) => {
        e.preventDefault()
        this.setState({
            imageloader: true
        })   

        const data = new FormData()
        for( var i = 0; i < this.state.image.length; i++ ){
            let file = this.state.image[i];
            data.append('file', file);
        }

        const adID = sessionStorage.getItem("adID")
        const url="/upload/ads/"+adID
        API.post(url, data, {
        })
        .then(res => {
            if(res.data['success']===false){
                alert(res.data['message'])
                this.setState({
                    imageloader:false
                })
            }
            else{
                alert("Upload successful")
                this.setState({
                    imageloader:false
                })
                sessionStorage.clear()
                window.location.assign("/")
            }
        })
    }

    render(){
        return(
            <div className="container signInForm">
                <h1 className="text-center myStyleTitle h1">Upload Image for your Advertisement</h1>
                <hr/>
                <form onSubmit={this.uploadImage}>
                    <input type="file" accept="image/x-png,image/jpeg" name="img" onChange={this.selectImage} max={4} multiple={true}/>
                    <div className="line">
                        {this.state.imageloader ? <Loader/> : <ImageUploadBtn/>}
                    </div>
                </form>
            </div>
        )
    }
}

class UploadAdImage extends Component{
    render(){
        const isAD = sessionStorage.getItem("isAD")

        return(
            <div>
                {isAD ? <ImageComp/> : window.location.assign("/")}
            </div>
        )
    }
}


export default UploadAdImage