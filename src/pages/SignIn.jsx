/* eslint-disable react/no-unescaped-entities */
import { Button, Icon, Input, Label, Spinner } from "keep-react";
import { Envelope, Lock } from "phosphor-react";
import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword, user, loading] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const data = {
        email: user.user.email,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(email, password);
  };

  return (
    <div className="">
      <h1 className="text-2xl lg:text-5xl text-center py-12">
        Sign In and Start Your Learning Journey.
      </h1>
      <div className="flex justify-center items-center w-full lg:py-16">
        <form
          className="mx-auto max-w-md space-y-2 rounded-lg border p-8 shadow-md w-10/12 lg:w-full"
          onSubmit={handleSubmit}
        >
          <fieldset className="space-y-1 py-3">
            <Label htmlFor="name" className="pb-2 text-md lg:text-lg">
              Email
            </Label>
            <div className="relative">
              <Input
                placeholder="Enter email"
                className="ps-11 text-md lg:text-lg"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Icon>
                <Lock size={19} color="#AFBACA" />
              </Icon>
            </div>
          </fieldset>
          <p className="py-3 lg:text-lg lg:font-semibold">
            Don't have an account?{" "}
            <Link to={`/sign-up`}>
              <span className="text-[#FF6969] underline cursor-pointer">
                Sign up
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
              Sign In
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
