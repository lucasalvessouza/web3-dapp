import './App.css'
import { Loader, Navbar, Footer, Welcome, Transactions, Services } from './components'

function App() {

  return (
    <>
      <div>
        <Navbar />
        <Welcome />
      </div>
      <Loader />
      <Services />
      <Transactions />
      <Footer />
    </>
  )
}

export default App
