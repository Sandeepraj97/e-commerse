
import { Component } from "react"
import Cookies from "js-cookie"
import { Redirect } from "react-router-dom"
import "./index.css"


class LoginForm extends Component{
    state={
        username:"",
        password:"",
        showErrorMsg:false,
        errorMsg:""
    }

    //* form submit

    onSucess = (jwtToken)=>{
        Cookies.set("jwt_token",jwtToken,{expires:30})
        const  {history}  = this.props
        history.replace('/')
    }

    onFailure = (errorMsg) =>{
        console.log(errorMsg)
        this.setState({
            showErrorMsg:true,
            errorMsg
        })
    }

    submitForm = async (e)=>{
        e.preventDefault()
        const {username,password} = this.state
        const userDetails = {username,password}
        const url= "https://apis.ccbp.in/login"
        console.log(url)
        const options ={
            method:"POST",
            body:JSON.stringify(userDetails)
        }
        const response = await fetch(url,options)
        console.log(response)
        const data = await response.json()
        console.log(data)
        if (response.ok===true){
            this.onSucess(data.jwt_token)
        }else{
            this.onFailure(data.error_msg)
        }   
    }


    // * getting event user name
    onChangeUsername = (e) =>{
        const {username} = this.state
        this.setState({username:e.target.value})
        console.log(username)
        
    }
    // * getting event user name
    onChangePassword = (e) =>{
        this.setState({password:e.target.value})
    }

    // *  userInput Field *

    renderPassWordField =() =>{
        const {password} = this.state
        return (
            <>
            <label htmlFor="password">PASSWORD</label>
                <input type="password"
                id="password"
                value={password}
                onChange={this.onChangePassword}
                required
            />
            </>
        )
    }

    // * Password Field *
    renderUserNameField = () =>{
        const {username} = this.state
        return (
            <>
            <label id="username">USERNAME</label>
            <input 
                type="text"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
                required
            />
            </>
        )
    }
    render() {
        const jwtToken = Cookies.get("jwt_token")
        if(jwtToken !== undefined){
            return <Redirect to = "/" />
        }


        const {showErrorMsg,errorMsg} = this.state
    return (
        <div className="log-in-form-cointainer">
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
                 alt="website login" 
                 className="login-image"
            /> 
            <form className="form-cointainer" onSubmit={this.submitForm}>
                <img src="https://i.postimg.cc/Dwt581N8/logo.jpg" 
                className="login-website-logo"
                alt="website-logo" 
                />
                <div className="input-container" >{this.renderUserNameField()}</div>
                <div className="input-container">{this.renderPassWordField()}</div>
                <button className="login-btn" type="submit">Login</button>
                {showErrorMsg && <p>*{errorMsg}</p>}
            </form>
        </div>
    )
}
}
export default LoginForm