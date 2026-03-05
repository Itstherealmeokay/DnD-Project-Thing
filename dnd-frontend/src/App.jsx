import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateCharacter from './pages/CreateCharacter';
import CharacterList from './pages/CharacterList';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCharacter />} />
          <Route path="/characters" element={<CharacterList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;