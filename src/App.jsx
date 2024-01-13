import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Homepage,
  Dashboard,
  Review,
  StudyPlan,
  HowToRegister,
  SignIn,
  SignUp,
  Layout,
  ReviewSubjectDetail,
  ReviewLayout,
} from './pages/index';
import {
  StudyPlanForm,
  StudyPlanTable,
} from './components/index'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route element={<Layout />}>
          <Route index path="dashboard" element={<Dashboard />} />
          <Route path="review" element={<ReviewLayout />} >
            <Route index element={<Review />} />
            <Route path=":reviewId" element={<ReviewSubjectDetail />} />
          </Route>
          <Route path="studyPlan" element={<StudyPlan />} >
            <Route index element={<StudyPlanForm />} />
            <Route path="result" element={<StudyPlanTable />} />
          </Route>
          <Route path="howToRegister" element={<HowToRegister />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
