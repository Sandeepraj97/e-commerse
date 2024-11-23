
import { Component } from "react"
import "./index.css"


class LoginForm extends Component{
    state={
        username:"",
        password:""
    }

    //* form submit

    onSucess = ()=>{
        const  {history}  = this.props
        history.replace('/')
    }

    submitForm = async (e)=>{
        e.preventDefault()
        const {username,password} = this.state
        const userDetails = {username,password}
        const url= "https://apis.ccbp.in/login"
        const options ={
            method:"POST",
            body:JSON.stringify(userDetails)
        }
        const response = await fetch(url,options)
        console.log(response)
        const data = await response.json()
        console.log(data)
        if (response.ok===true){
            this.onSucess()
        }        
    }


    // * getting event user name
    onChangeUsername = (e) =>{
        this.setState({username:e.target.value})
        
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
            />
            </>
        )
    }
    render() {
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
            </form>
        </div>
    )
}
}
export default LoginForm