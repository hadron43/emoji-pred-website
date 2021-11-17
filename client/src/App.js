import './App.css';
import Particles from 'react-tsparticles';
import {} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const config = require('./particles-config.json');

function App() {
  return (
    <div className="App vh-100 bg-black" >
      <Particles
        params={config} />
    </div>
  );
}

export default App;
