import { createHashRouter, RouterProvider } from 'react-router-dom';
import { TaskContextProvider } from './store/TaskContext';

import DashboardPage from './pages/DashboardPage'
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage'
import RootLayout from './pages/Root';
import TaskPage from './pages/TaskPage'
import './App.css'

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <LoginPage /> },
      { path: '/dashboard', element: <DashboardPage /> },
      // { path: '/task', element: <TaskPage /> },
      { path: '/dashboard/:task', element: <TaskPage /> },
    ]
  }
])

function App() {

  return (
    <TaskContextProvider>
      <RouterProvider router={router} />
    </TaskContextProvider>
  )
}

export default App
