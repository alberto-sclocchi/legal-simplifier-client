import './App.css';
import RoutesIndex from './components/core/RoutesIndex';
import { Route, Routes } from 'react-router-dom';
import { SimplifierProvider } from './components/simplifier/context/SimplifierContext.context';

function App() {
  return (
    <SimplifierProvider>
      <Routes>
        <Route path="*" element={<RoutesIndex />} />
      </Routes>
    </SimplifierProvider>
  );
}

export default App;
