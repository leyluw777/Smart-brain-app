import React, { Component } from 'react'

class Register extends Component  {
  constructor(props){
    super(props);
    this.state = {
      registerName: "",
      registerEmail: "",
      registerPassword: "",
      existedProfile: false,
      emptyInputs: false
    }
  }
  
    onNameChange = (e) => {
      this.setState({registerName: e.target.value})
    }

   
    onPasswordChange = (e) => {
      this.setState({registerPassword: e.target.value})
    }
    onEmailChange = (e) => {
      this.setState({registerEmail: e.target.value})
    }

    onSubmitRegister = () => {
      fetch("https://backend-sbb2.onrender.com/register", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: this.state.registerEmail,
          password: this.state.registerPassword,
          name: this.state.registerName
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data === "error"){
          this.setState({ existedProfile: true})
        }
        else if (data.id) {
          this.props.loadUser(data)
          this.props.onRouteChange('home');
        }
        else if (data === "Empty inputs"){
            this.setState({emptyInputs: true})
        }

      })
    }
  
  render(){
    const {onRouteChange} = this.props;
    return (
      <div>
     
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-4">
            <div>
            
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                Create an account
              </h2>
          
            </div>
          
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm">
                <div className='my-3'>
                  <label htmlFor="name" className="sr-only">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="outline-none p-3 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    placeholder="Name"
                    onChange={this.onNameChange}
                  />
                </div>
              
                <div className='my-3'>
                  <label htmlFor="email-address" className="sr-only">
                    Email address *
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
                    Password *
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
                { this.state.existedProfile == true ?
              <p className='my-2 text-center'> This account already exists. Please, use another mail address </p> 
              : <p> </p>
            }
            { this.state.emptyInputs == true ?
              <p className='my-2 text-center'> Please, fill in all fields </p> 
              : <p> </p>
            }
              </div>
  
            
              <div>
                <button
                  type="submit" onClick={this.onSubmitRegister}
                  className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
               
              </div>
          
          </div>
        </div>
        
      </div>
    )
  }
  
}


export default Register;