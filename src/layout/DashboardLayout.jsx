import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const role = localStorage.getItem("role");

  return (
    <div className="">
      <div className="flex justify-around lg:justify-center cursor-pointer py-6 bg-gray-800">
        {!open ? (
          <div className="block lg:hidden" onClick={() => setOpen(!open)}>
            <img
              src="/img/icons8-hamburger.svg"
              width="25"
              height="25"
              alt=""
            />
          </div>
        ) : (
          <div className="block lg:hidden" onClick={() => setOpen(!open)}>
            <img src="/img/icons8-close.svg" width="25" height="25" alt="" />
          </div>
        )}

        <Link to={`/`}>
          <h1 className="font-bold text-sm lg:text-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 inline-block text-transparent bg-clip-text">
            E-Learning
          </h1>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div
          className={`${
            open ? "block" : "hidden"
          } lg:block lg:col-span-2 bg-gray-800 max-h-fit lg:min-h-screen p-12 text-lg w-full`}
        >
          <ul>
            <li
              className={`${
                pathname === "/dashboard" ? "bg-white text-black" : "text-white"
              }  px-4 py-2 rounded text w-full`}
            >
              <Link to={""}>Dashboard</Link>
            </li>
            <li
              className={`${
                pathname === "/dashboard/courses"
                  ? "bg-white text-black"
                  : "text-white"
              }  px-4 py-2 rounded text w-full`}
            >
              <Link to={"courses"}>Courses</Link>
            </li>
            {role === "instractor" && (
              <li
                className={`${
                  pathname === "/dashboard/add-course"
                    ? "bg-white text-black"
                    : "text-white"
                }  px-4 py-2 rounded text w-full`}
              >
                <Link to={"add-course"}>Add new course</Link>
              </li>
            )}
            <li
              className={`${
                pathname === "/" ? "bg-white text-black" : "text-white"
              }  px-4 py-2 rounded text w-full`}
            >
              <Link to={"/"}>Home</Link>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-10 p-20 bg-slate-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
