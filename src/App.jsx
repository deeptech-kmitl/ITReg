import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Homepage,
  Dashboard,
  Review,
  StudyPlan,
  HowToRegister,
  SignIn,
  SignUp,
} from './pages/index'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Homepage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="review" element={<Review />} />
          <Route path="studyPlan" element={<StudyPlan />} />
          <Route path="howToRegister" element={<HowToRegister />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
