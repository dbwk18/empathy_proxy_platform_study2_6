import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { LoginPage } from './Pages/LoginPage';
import { IntroPage } from './Pages/IntroPage';
import { PreSurveyPage } from './Pages/PreSurveyPage';
import { Task1Page } from './Pages/Task1Page';
import { Task2Page } from './Pages/Task2Page';
import { PostSurveyPage } from './Pages/PostSurveyPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Routes>
            <Route path='/' element={<LoginPage/>} />
            <Route path='/intro' element={<IntroPage/>} />
            <Route path='/pre' element={<PreSurveyPage/>}/>
            <Route path='/task1' element={<Task1Page/>}/>
            <Route path='/task2' element={<Task2Page/>}/>
            <Route path='/post' element={<PostSurveyPage/>}/>
          </Routes>        
        </div>
      </div>      
    </Router>
  );
}

export default App;
