import AppRouter from "./AppRouter"
import { AuthProvider } from "./context/authContext"
import './App.css'
import { GlobalStyles } from "./styledComponents"

function App() {

  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>

    </>
  )
}

export default App
