/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Card } from "keep-react";
import { Link } from "react-router-dom";

export default function CourseCard({ data, onDelete }) {
  const { image, title, description, instractor, _id, price } = data || {};
  const { name } = instractor || {};
  const role = localStorage.getItem("role");

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const confirmed = confirm("Are you sure to delete???");
    if (confirmed) {
      await fetch(`https://lms-server-sandy.vercel.app/course/${_id}`, {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          onDelete(_id);
        });
    }
  };

  return (
    <Card>
      <Card.Header>
        <img src={image} alt="image" width={600} height={400} />
      </Card.Header>
      <Card.Content className="space-y-3">
        <Card.Title className="text-3xl">{title}</Card.Title>
        <p className="text-lg font-semibold">{name}</p>
        <Card.Description className="text-lg">{description}</Card.Description>
        {role === "learner" ? (
          <Button
            size="md"
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-lg font-semibold rounded w-full"
          >
            Enroll Course
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              size="md"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-lg font-semibold rounded w-full"
            >
              <Link to={`edit-course/${_id}`}>Edit</Link>
            </Button>
            <Button
              size="md"
              className="bg-gradient-to-r from-[rgba(217,67,67,1)] to-[rgba(242,106,75,1)] text-lg font-semibold rounded w-full"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        )}
      </Card.Content>
    </Card>
  );
}
