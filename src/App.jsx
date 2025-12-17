import { Outlet } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'

function App() {
  return (
    // 1. Cambiamos el fragment <> por un div con min-h-screen y flex-col
    <div className="flex flex-col min-h-screen">

      <Header />

      {/* 2. Añadimos flex-1 para que este elemento empuje el footer hacia abajo */}


      <div className="min-h-screen w-full bg-[#0f0f0f] relative text-white">
        {/* Circuit Board - Dark Pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(34, 197, 94, 0.15) 19px, rgba(34, 197, 94, 0.15) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.15) 39px, rgba(34, 197, 94, 0.15) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(34, 197, 94, 0.15) 19px, rgba(34, 197, 94, 0.15) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.15) 39px, rgba(34, 197, 94, 0.15) 40px),
        radial-gradient(circle at 20px 20px, rgba(16, 185, 129, 0.18) 2px, transparent 2px),
        radial-gradient(circle at 40px 40px, rgba(16, 185, 129, 0.18) 2px, transparent 2px)
      `,
            backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px',
          }}
        />
        <main className="relative z-10 flex-1 flex flex-col pt-16">
  <Outlet />
</main>

      </div>


      <Footer />

    </div>
  )
}

export default App
