import Navbar from './components/Navbar/Navbar'
import {Container} from './components/Container/Container'
import './App.css'
function App() {
  return (
    <>
      <div className="outer">
        <Navbar />
        <hr />
        <Container />
      </div>
    </>
  );
}

export default App;
