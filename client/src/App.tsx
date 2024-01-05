import { Navbar, Footer, Welcome, Transactions, Services, Products, PageLoading } from './components'

function App() {

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Products />
      <Transactions />
      <Footer />
      <PageLoading />
    </div>
  )
}

export default App
