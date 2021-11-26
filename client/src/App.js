import './App.css';
import {Routes, Route} from 'react-router-dom';

import Landing from './components/Landing';
import Home from './components/Home';
import RecipeId from './components/RecipeId';
import AddRecipe from './components/AddRecipe';
import NotFound from './components/NotFound';

//TODO: CREAR COMPONENTE PARA LAS ETAPAS DE CARGADO, en RECIPEID un componente que diga cargando con sus estilos propios, también en HOME y RECIPEID

function App() {
  return (
    <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route path='/recipes' element={<Home/>} />
    <Route path='/recipes/:recipe' element={<RecipeId/>}/>
    <Route path='/form' element={<AddRecipe/>}/>
    <Route path="*" element={<NotFound/>} />
  </Routes>
  );
}

export default App;
