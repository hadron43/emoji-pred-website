import React, {useState, useEffect} from 'react';
import './App.css';
import Particles from 'react-tsparticles';
import {} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/Navigation';
import Description from './components/Description';
import Test from './components/Test';
import Footer from './components/Footer';

const config = require('./particles-config.json');

function App() {
  const [animation, setAnimation] = useState(false)
  const [automatic, setAutomatic] = useState(false)

  useEffect(() => {
    setAnimation(localStorage.getItem('animation') !== 'false')
    setAutomatic(localStorage.getItem('automatic') === 'true')
  }, []);
  const setAnim = (value) => {
    setAnimation(value)
    localStorage.setItem('animation', value)
  }
  const setAuto = (value) => {
    setAutomatic(value)
    localStorage.setItem('automatic', value)
  }

  return (
    <>
      <div className='particles-background bg-blue-dark' >
        <Particles className={`${animation ? 'visible' : 'invisible'}`}
          params={config} />
      </div>
      <div className="container pt-2 pb-5 text-light min-vh-100 bg-white bg-opacity-10 position-relative">
        <Navigation animation={animation} setAnimation={setAnim}
          automatic={automatic} setAutomatic={setAuto}/>
        <Description />
        <Test automatic={automatic} />
        <div className="mb-5"></div>
        <Footer />
      </div>
    </>
  );
}

export default App;
