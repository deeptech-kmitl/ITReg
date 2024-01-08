import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {
  Homepage,
  Dashboard,
  Review,
  StudyPlan,
  HowToRegister,
  SignIn,
  SignUp,
  Layout,
} from './pages/index'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route element={<Layout />}>
          <Route index path="dashboard" element={<Dashboard />} />
          <Route path="review" element={<Review />} />
          <Route path="studyPlan" element={<StudyPlan />} />
          <Route path="howToRegister" element={<HowToRegister />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
