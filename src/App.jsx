import { Outlet } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'

function App() {
  return (
    // 1. Cambiamos el fragment <> por un div con min-h-screen y flex-col
    <div className="flex flex-col min-h-screen">
      
      <Header />
      
      {/* 2. Añadimos flex-1 para que este elemento empuje el footer hacia abajo */}
      <main className='bg-green-900 flex-1 flex flex-col'>
        <Outlet />
      </main>
      
      <Footer />
      
    </div>
  )
}

export default App
