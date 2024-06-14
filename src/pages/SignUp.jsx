import { Button, Icon, Input, Label, Spinner } from "keep-react";
import { Envelope, Lock } from "phosphor-react";
import { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";

export default function SignUp() {
  const [userRole, setUserRole] = useState("learner");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading] =
    useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (user) {
      const data = {
        name,
        email: user.user.email,
        role: userRole,
      };
      fetch(`https://lms-server-sandy.vercel.app/create-user`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        // eslint-disable-next-line no-unused-vars
        .then((data) => {
          localStorage.setItem("token", data?.token);
          localStorage.setItem("role", data?.role);
          navigate("/dashboard");
        });
    }
  });

  return (
    <div className="">
      <h1 className="text-2xl lg:text-5xl text-center py-12">
        Start Your Path to Knowledge Here
      </h1>
      <div className="flex justify-center items-center w-full">
        <form
          className="mx-auto max-w-md space-y-2 rounded-lg border p-8 shadow-md w-10/12 lg:w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-center"></div>
          <fieldset className="space-y-1 py-3">
            <Label htmlFor="name" className="pb-2 text-md lg:text-lg">
              Name
            </Label>
            <div className="relative">
              <Input
                placeholder="Enter name"
                className="ps-11 text-md lg:text-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Icon>
                <Envelope size={19} color="#AFBACA" />
              </Icon>
            </div>
          </fieldset>
          <fieldset className="space-y-1 py-3">
            <Label htmlFor="name" className="pb-2 text-md lg:text-lg">
              Email
            </Label>
            <div className="relative">
              <Input
                placeholder="Enter email"
                className="ps-11 text-md lg:text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Icon>
                <Envelope size={19} color="#AFBACA" />
              </Icon>
            </div>
          </fieldset>
          <fieldset className="space-y-1 py-3">
            <Label htmlFor="password" className="text-md lg:text-lg pb-2">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="Enter password"
                type="password"
                className="ps-11 text-md lg:text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Icon>
                <Lock size={19} color="#AFBACA" />
              </Icon>
            </div>
          </fieldset>
          <div className="py-3">
            <fieldset className="space-y-1 py-3">
              <Label htmlFor="userRole" className="text-md lg:text-lg pb-2">
                Learner/Instractor
              </Label>
              <div className="relative">
                <select
                  name=""
                  id=""
                  className="w-full bg-slate-50 px-3 py-2 border border-gray-300 rounded-md focus:outline"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option defaultValue={"learner"} value="learner">
                    Learner
                  </option>
                  <option value="instractor">Instractor</option>
                </select>
              </div>
            </fieldset>
          </div>
          <p className="py-3 lg:text-lg lg:font-semibold">
            Already have an account?{" "}
            <Link to={`/sign-in`}>
              <span className="text-[#FF6969] underline cursor-pointer">
                Sign In
              </span>
            </Link>
          </p>
          {loading ? (
            <Button
              size="md"
              type="submit"
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-lg font-semibold rounded w-full"
            >
              <span className="pr-2">
                <Spinner color="info" size="md" />
              </span>
              Loading...
            </Button>
          ) : (
            <Button
              size="md"
              type="submit"
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-lg font-semibold rounded w-full"
            >
              Sign Up
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
