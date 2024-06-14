/* eslint-disable no-unused-vars */
import { Button, Card, Input } from "keep-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCourses() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    fetch(`https://lms-server-sandy.vercel.app/create-course`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((d) => {
        navigate("/dashboard/courses");
        e.target.reset();
      });
  };
  return (
    <Card
      title="Add Course"
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "20px",
        fontSize: "20px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="title"
            style={{ display: "block", marginBottom: "8px" }}
          >
            Course Title
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter course title"
            required
            className="text-black text-xl"
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="description"
            style={{ display: "block", marginBottom: "8px" }}
          >
            Description
          </label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter course description"
            required
            className="text-black text-xl"
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="price"
            style={{ display: "block", marginBottom: "8px" }}
          >
            Price
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter course price"
            required
            className="text-black text-xl"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="image"
            style={{ display: "block", marginBottom: "8px" }}
          >
            Image
          </label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Enter course image"
            required
            className="text-black text-xl"
          />
        </div>
        <div>
          <Button
            size="md"
            type="submit"
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-lg font-semibold rounded w-full"
          >
            Add Course
          </Button>
        </div>
      </form>
    </Card>
  );
}
