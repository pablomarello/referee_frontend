import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import App from '../App'
import Login from '../pages/auth/Login'
import PrivateRoute from './PrivateRoute'
import PermissionRoute from './PermissionRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import UserList from '../pages/users/UserList'
import Unauthorized from '../pages/Unauthorized'
import MatchesList2 from '../pages/matches/MatchesList2'
import TorunamentsList from '../pages/tournaments/TorunamentsList'
import AssignmentsList from '../pages/assignments/AssignmentsList'
import MatchDetail from '../components/dashboard/matches/MatchDetail'
import MatchCreate from '../pages/matches/MatchCreate'
import MatchEdit from '../pages/matches/MatchEdit'
import UserCreate from '../pages/users/UserCreate'
import UserDetail from '../pages/users/UserDetail'
import UserEdit from '../pages/users/UserEdit'
import AsignmentDetail from '../pages/assignments/AsignmentDetail'
import AsignmentEdit from '../pages/assignments/AsignmentEdit'
import AssignmentCreate from '../pages/assignments/AssignmentCreate'
import TournamentDetail from '../pages/tournaments/TournamentDetail'
import TournamentCreate from '../pages/tournaments/TournamentCreate'
import TournamentEdit from '../pages/tournaments/TournamentEdit'
import Welcome from '../components/Welcome'
import AsignmentMy from '../pages/assignments/AsignmentMy'
import NotFound from '../pages/NotFound'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== RUTAS PÚBLICAS ===== */}
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/characters/create" element={<CharacterCreate />} />
          <Route path="/characters/:id/edit" element={<CharacterEdit />} />

          <Route path="*" element={<NotFound />} /> */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

        {/* ===== DASHBOARD (PRIVADO) ===== */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          {/* 👇 RUTA INDEX */}
          <Route index element={<Welcome />} />

          {/* USUARIOS */}
          <Route
            path="users"
            element={
              <PermissionRoute permission="read:usuarios">
                <UserList />
              </PermissionRoute>
            }
          />
          <Route
            path="users/create"
            element={
              <PermissionRoute permission="create:usuarios">
                <UserCreate />
              </PermissionRoute>
            }
          />
          <Route
            path="users/:id"
            element={
              <PermissionRoute permission="read:usuarios">
                <UserDetail />
              </PermissionRoute>
            }
          />
          <Route
            path="users/:id/edit"
            element={
              <PermissionRoute permission="update:usuarios">
                <UserEdit />
              </PermissionRoute>
            }
          />

          {/* PARTIDOS */}
          <Route
            path="matches"
            element={
              <PermissionRoute permission="read:partidos">
                <MatchesList2 />
              </PermissionRoute>
            }
          />
          <Route
            path="matches/:id"
            element={
              <PermissionRoute permission="read:partidos">
                <MatchDetail />
              </PermissionRoute>
            }
          />
          <Route
            path="matches/create"
            element={
              <PermissionRoute permission="create:partidos">
                <MatchCreate />
              </PermissionRoute>
            }
          />
          <Route
            path="matches/:id/edit"
            element={
              <PermissionRoute permission="update:partidos">
                <MatchEdit />
              </PermissionRoute>
            }
          />

          {/* TORNEOS */}
            <Route
            path="tournaments"
            element={
              <PermissionRoute permission="read:torneos">
                <TorunamentsList />
              </PermissionRoute>
            }
          />
          <Route
            path="tournaments/:id"
            element={
              <PermissionRoute permission="read:torneos">
                <TournamentDetail />
              </PermissionRoute>
            }
          />
          <Route
            path="tournaments/create"
            element={
              <PermissionRoute permission="create:torneos">
                <TournamentCreate />
              </PermissionRoute>
            }
          />
          <Route
            path="tournaments/:id/edit"
            element={
              <PermissionRoute permission="update:torneos">
                <TournamentEdit />
              </PermissionRoute>
            }
          />

          {/* DESIGNACIONES */}
            <Route
            path="assignments"
            element={
              <PermissionRoute permission="read:designaciones">
                <AssignmentsList />
              </PermissionRoute>
            }
          />
          <Route
            path="assignments/:id"
            element={
              <PermissionRoute permission="read:designaciones">
                <AsignmentDetail />
              </PermissionRoute>
            }
          />
          <Route
            path="assignments/create"
            element={
              <PermissionRoute permission="create:designaciones">
                <AssignmentCreate />
              </PermissionRoute>
            }
          />
          <Route
            path="assignments/:id/edit"
            element={
              <PermissionRoute permission="update:designaciones">
                <AsignmentEdit />
              </PermissionRoute>
            }
          />
          <Route
            path="myassignments"
            element={
              <PermissionRoute permission="read:designaciones">
                <AsignmentMy />
              </PermissionRoute>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter