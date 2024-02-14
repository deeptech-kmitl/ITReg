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
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import ProtectAuthenRoute from "./context/ProtectAuthenRoute.jsx";



function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/signin'
              element={
                <ProtectAuthenRoute>
                  <SignIn />
                </ProtectAuthenRoute>
              } />
            <Route path="/signup" element={
                <ProtectAuthenRoute>
                  <SignUp />
                </ProtectAuthenRoute>
              } />
            <Route element={<Layout />}>
              <Route path="/dashboard"
                element={
                  <ProtectedRoute redirectPath="/signin">
                    <Dashboard />
                  </ProtectedRoute>}>
              </Route>
              <Route path="review"
                element={
                  <ProtectedRoute redirectPath="/signin">
                    <ReviewLayout />
                  </ProtectedRoute>
                } >
                <Route index element={<Review />} />
                <Route path=":reviewId" element={<ReviewSubjectDetail />} />
              </Route>
              <Route path="studyPlan"
                element={
                  <ProtectedRoute redirectPath="/signin">
                    <StudyPlan />
                  </ProtectedRoute>
                } >
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