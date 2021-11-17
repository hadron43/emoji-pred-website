import React, {useState} from 'react';
import './App.css';
import Particles from 'react-tsparticles';
import {} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/Navigation';

const config = require('./particles-config.json');

function App() {
  const [animation, setAnimation] = useState(false);

  return (
    <>
      <div className='particles-background bg-blue-dark' >
        <Particles className={`${animation ? 'visible' : 'invisible'}`}
          params={config} />
      </div>
      <div className="container py-2 text-light min-vh-100 bg-white bg-opacity-10">
        <Navigation animation={animation} setAnimation={setAnimation} />
      </div>
    </>
  );
}

export default App;
