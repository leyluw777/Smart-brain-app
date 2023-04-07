import './App.css';
import { Component } from 'react';
import Clarifai from 'clarifai'
import Header from './components/Header/Header';
import Rank from './components/Rank/Rank';
import InputForm from './components/InputForm/InputForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg'


const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: '',
    entries: 0,
    joined: "",
  }
}


 

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  setupClarifai = (imageUrl) => {
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "z4tz6jcgng47",
        "app_id": "test"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": imageUrl
            }
          }
        }
      ]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + '4fa2513d38fe4e3eb3bbd574afc503e2'
      },
      body: raw
    };
    return requestOptions
  }


  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    })
  }

  calculateFace = (data) => {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const inputImg = document.getElementById("inputImg")
    const imgWidth = Number(inputImg.width);
    const imgHeight = Number(inputImg.height);

    return {
      topRow: faceData.top_row * imgHeight,
      bottomRow: imgHeight - (faceData.bottom_row * imgHeight),
      leftCol: faceData.left_col * imgWidth,
      rightCol: imgWidth - (faceData.right_col * imgWidth)
    }
  }

 


  setFaceData = (box) => {
    console.log(box)
    this.setState({ box: box })
  }

  onChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onSubmit = () => {
    console.log("Clicked");
    this.setState({ imageUrl: this.state.input });
    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, this.setupClarifai(this.state.input))
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count.entries }))
            })
            .catch(console.log)
        }
        this.setFaceData(this.calculateFace(response))  
      })
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }

    this.setState({ route: route })


  }
  render() {
    return (
      <div className="App text-white p-4 w-full">
        <ParticlesBg type="cobweb" bg={true} color="#363535" />
        <Header onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {this.state.route === 'home' ?
          <div className='main-section flex w-full justify-center items-center flex-col'>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <InputForm onInputChange={this.onChange} onBtnSubmit={this.onSubmit} />
            <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
          </div>
          : (
            this.state.route === "signin"
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }



      </div>
    );
  }

}

export default App;
