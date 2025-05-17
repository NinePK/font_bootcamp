import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import { AuthProvider } from '@/context/AuthProvider'
import ProtectedRoute from '@/components/protected/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'
import MyActivities from './pages/student/MyActivities'
import Profile from './pages/student/Profile'
import StaffLayout from './layouts/StaffLayout'
import StaffDashboard from '@/pages/staff/Dashboard'
import StaffActivityList from './pages/staff/Activities/ActivityList'
import CreateActivity from '@/pages/staff/CreateActivity'
import EditActivity from './pages/staff/EditActivity'
import ActivityDetailPage from '@/pages/student/Activities/ActivityDetail'
import Applicants from './pages/staff/Applicants'

// ─── Lazy-loaded Pages ───────────────────────────────
const Login         = lazy(() => import('@/pages/auth/Login'))
const Register      = lazy(() => import('@/pages/auth/Register'))
const StudentDash   = lazy(() => import('@/pages/student/Dashboard'))
const StudentActs   = lazy(() => import('@/pages/student/Activities/ActivityList'))
const StudentDetail = lazy(() => import('@/pages/student/Activities/ActivityDetail'))
const StaffDash     = lazy(() => import('@/pages/staff/Dashboard'))
const CreateAct     = lazy(() => import('@/pages/staff/CreateActivity'))
const AdminDash     = lazy(() => import('@/pages/admin/Dashboard'))
const Unauthorized  = lazy(() => import('@/pages/misc/Unauthorized'))
const NotFound      = lazy(() => import('@/pages/misc/NotFound'))
const ErrorFallback = lazy(() => import('@/pages/misc/error'))


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    },
  },
})

// ─── Routes (Flat) ───────────────────────────────────
const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },

  // Public
  { path: '/login', element: <Login />, errorElement: <ErrorFallback /> },
  { path: '/register', element: <Register />, errorElement: <ErrorFallback /> },

  // Protected - Student
  {
  path: '/student',
  element: <ProtectedRoute allow={['STUDENT']}><DashboardLayout /></ProtectedRoute>,
  //element: <DashboardLayout />, 
  errorElement: <ErrorFallback />,
  children: [
    {
      index: true,
      element: <StudentDash />, // /student
    },
    {
      path: 'activities',
      element: <StudentActs />, // /student/activities
    },
    {
      path: 'activities/:id',
      element: <StudentDetail />, // /student/activities/:id
    },
    {
      path: 'my-activities',
      element: <MyActivities />, // /student/my-activities
    },
    {
      path: 'profile',
      element: <Profile />, // /student/profile
    },
  ],
},

  {
    path: '/student/activities',
    //element: <ProtectedRoute allow={['STUDENT']}><StudentActs /></ProtectedRoute>,
  },
  {
    path: '/student/activities/:id',
    element: <ProtectedRoute allow={['STUDENT']}><StudentDetail /></ProtectedRoute>,
  },

  // Protected - Staff
  {
    path: '/staff',
    // element: (
    //   <ProtectedRoute allow={['STAFF']}>
    //     <StaffLayout />
    //   </ProtectedRoute>
    // ),
    element: <StaffLayout />,
    children: [
      // --- Default หน้าแรกของ /staff ให้ไปที่ student view ---
      { index: true, element: <StudentDash /> },

      // --- Student Mode (reuse student pages) ---
      { path: 'student/activities', element: <StudentActs /> },
      { path: 'student/activities/:id', element: <StudentDetail /> },
      { path: 'student/my-activities', element: <MyActivities /> },
      { path: 'student/profile', element: <Profile /> },

      // --- Staff Mode pages ---
      { path: 'admin', element: <StaffDashboard /> },
      { path: 'activities', element: <StaffActivityList /> },
      { path: 'activities/create', element: <CreateActivity /> },
      { path: 'activities/:id/edit', element: <EditActivity /> },
      { path: 'activities/:id', element: <ActivityDetailPage /> },
      { path: 'activities/:id/applicants', element: <Applicants /> },
    ],
  },
  {
    path: '/staff/create',
   // element: <ProtectedRoute allow={['STAFF']}><CreateAct /></ProtectedRoute>,
  },

  // Protected - Admin
  {
    path: '/admin',
   // element: <ProtectedRoute allow={['ADMIN']}><AdminDash /></ProtectedRoute>,
  },

  // Misc
  { path: '/unauthorized', element: <Unauthorized /> },
  { path: '*', element: <NotFound /> },
])

// ─── Render App ──────────────────────────────────────
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      <AuthProvider>
        <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
