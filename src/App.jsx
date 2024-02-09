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
import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from 'react-redux'
import store from '../redux/store.js'



function App() {
  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="review" element={<ReviewLayout />} >
                <Route index element={<Review />} />
                <Route path=":reviewId" element={<ReviewSubjectDetail />} />
              </Route>
              <Route path="studyPlan" element={<StudyPlan />} >
                <Route index element={<StudyPlanForm />} />
                <Route path="result" element={<StudyPlanTable />} />
              </Route>
            </Route>
            <Route path="howToRegister" element={<HowToRegister />} />
          </Routes>
        </Provider>
      </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App