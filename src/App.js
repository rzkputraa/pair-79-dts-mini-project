import ProtectedRoute from './components/ProtectedRoute';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Profil from './screens/Profil';
import Movie from './screens/Movie';
import NotFound from './screens/NotFound';
import Search from './screens/Search';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route index path='/' element={<Home />} />

      <Route path='/login' element={
        <ProtectedRoute isLogin={false}>
          <Login />
        </ProtectedRoute>
      } />

      <Route path='/register' element={
        <ProtectedRoute isLogin={false}>
          <Register />
        </ProtectedRoute>
      } />

      <Route path='/profil' element={
        <ProtectedRoute isLogin={true}>
          <Profil />
        </ProtectedRoute>
      } />

      <Route path='/search/:title' element={<Search />} />

      <Route path='/movie/:id' element={
        <ProtectedRoute isLogin={true}>
          <Movie />
        </ProtectedRoute>
      } />

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
