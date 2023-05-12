import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { BookDetailPage, Dashboard } from './pages'
import { Login } from './pages'
import { Register } from './pages'
import { Profile } from './pages'
import { Home } from './pages'
import { Error404 } from './pages'
import { UserNotLogin } from './pages'
import { useAuth } from './context/authContext'
import { ForgotPassword } from './pages/ForgotPassword'

function AppRouter() {
  const { user } = useAuth()

  return (
    <Router>

      <Routes>
        <Route path='/tu-diario' element={<Home />} />
        <Route path='/login' element={user ? <Navigate to={`/dashboard/${user.uid}`} replace /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to={`/dashboard/${user.uid}`} replace /> : <Register />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/dashboard/:uid' element={user !== null ? <Dashboard /> : <Navigate to='/login' />} />
        <Route path='/dashboard/:uid/profile' element={user ? <Profile /> : <Navigate to='/login' />} />
        <Route path='/dashboard/:uid/books/:bookId' element={user ? <BookDetailPage /> : <Navigate to='/login' />} />


        <Route path='/notlogin' replace element={<UserNotLogin />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
