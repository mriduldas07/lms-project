import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import AddCourses from "../pages/AddCourses";
import Courses from "../pages/Courses";
import Dashboard from "../pages/Dashboard";
import EditCourse from "../pages/EditCourse";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";

const token = localStorage.getItem("token");
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    //   errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "courses",
        element: (
          <PrivateRoute>
            <Courses />
          </PrivateRoute>
        ),
      },
      {
        path: "courses/edit-course/:id",
        element: (
          <PrivateRoute>
            <EditCourse />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://lms-server-sandy.vercel.app/course/${params.id}`, {
            headers: {
              authorization: token,
            },
          }),
      },
      {
        path: "add-course",
        element: (
          <PrivateRoute>
            <AddCourses />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
