import logo from './logo.svg';
import './App.css';
// import any components you want to use in this file:
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      {/* Here is how we use the component in our html */}
      <Navbar />
      <div className="App">
        here is the app
      </div>
    </div>
    
  );
}

export default App;
