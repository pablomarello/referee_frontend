import { Outlet } from "react-router-dom"
import Navbar from "../components/common/Navbar"
import Sidebar from "../components/common/Sidebar"


const DashboardLayout = () => {
  return (
    <div className="flex h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  )
}

export default DashboardLayout