import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch(`https://lms-server-sandy.vercel.app/courses`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [token]);

  const handleDeleteTask = (id) => {
    setData(data.filter((d) => d._id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
      {data?.map((c) => (
        <CourseCard key={c._id} data={c} onDelete={handleDeleteTask} />
      ))}
    </div>
  );
}
