import React from 'react'
import { Component } from 'react';

class SignIn extends Component {
constructor(props){
  super(props);
  this.state = {
    signInEmail: "",
    signInPassword: "",
    wrongData: false,
    emptyInputs: false
  }
}

  onEmailChange = (e) => {
    this.setState({signInEmail: e.target.value})
  }

  onPasswordChange = (e) => {
    this.setState({signInPassword: e.target.value})
  }

  onSubmitSignIn = () => {
    fetch("https://localhost:3000/signin", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id){ // does the user exist? Did we receive a user with a property of id?
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
      else if (user === "Empty inputs"){
        this.setState({emptyInputs: true})
    }
      else {
        this.setState({ wrongData: true })
      }
    })
  }



  render(){
    const {onRouteChange} = this.props;
    return (
    

      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-4">
          <div>
          
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white ">
              Sign in to your account
            </h2>
        
          </div>
          
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm">
              <div className='my-3'>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="outline-none p-3 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className=''>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="outline-none p-3 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  onChange={this.onPasswordChange}
                />
              </div>
              { this.state.wrongData == true ?
              <p className='my-2 text-center'> Please, check your username or password</p> 
              : <p> </p>
            }
            { this.state.emptyInputs == true ?
              <p className='my-2 text-center'> Please, fill in all fields </p> 
              : <p> </p>
            }
            </div>

          
            <div className=''>
              <button
                onClick={this.onSubmitSignIn}
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <p className='mt-3 text-center'> Or if you did not signing up yet, <button onClick={() => onRouteChange("register")} className='rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'> Create an account </button> </p>
            </div>
         
        </div>
      </div>
  
  );
  }
  
}


export default SignIn;