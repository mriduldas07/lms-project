import { Navbar, Spinner } from "keep-react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../firebase.config";

export default function NavbarComponent() {
  const [user] = useAuthState(auth);
  const [signOut, loading] = useSignOut(auth);
  return (
    <Navbar fluid={true} className="mb-5">
      <Navbar.Container className="flex items-center justify-between">
        <Navbar.Container className="flex items-center">
          <Navbar.Brand className="flex items-center gap-1 cursor-pointer">
            <img
              src="/img/logo.webp"
              alt="keep"
              width="40"
              height="40"
              className="hidden lg:block"
            />
            <Link to={`/`}>
              <h1 className="font-bold text-sm lg:text-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 inline-block text-transparent bg-clip-text">
                E-Learning
              </h1>
            </Link>
          </Navbar.Brand>
          <Navbar.Divider></Navbar.Divider>

          <Navbar.Collapse collapseType="sidebar">
            <Navbar.Container tag="ul" className="flex flex-col gap-5">
              <Navbar.Link linkName="Sign up" />
              <Navbar.Link linkName="Sign In" />
            </Navbar.Container>
          </Navbar.Collapse>
        </Navbar.Container>

        <Navbar.Container className="flex gap-2">
          <Navbar.Container
            tag="ul"
            className="lg:flex hidden items-center justify-between gap-8"
          >
            {user && (
              <Link to={`/dashboard`}>
                <span className="text-xl font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 inline-block text-transparent bg-clip-text cursor-pointer">
                  Dashboard
                </span>
              </Link>
            )}
            {user ? (
              <span
                className="text-xl font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 inline-block text-transparent bg-clip-text cursor-pointer"
                onClick={async () => {
                  await signOut();
                  localStorage.removeItem("token");
                  localStorage.removeItem("role");
                }}
              >
                Sign Out{" "}
                {loading && (
                  <span className="pr-2">
                    <Spinner color="info" size="md" />
                  </span>
                )}
              </span>
            ) : (
              <>
                <Link to={`/sign-up`}>
                  <span className="text-xl font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 inline-block text-transparent bg-clip-text">
                    Sign Up
                  </span>
                </Link>
                <Link to={`/sign-in`}>
                  <span className="text-xl font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 inline-block text-transparent bg-clip-text">
                    Sign In
                  </span>
                </Link>
              </>
            )}
          </Navbar.Container>
          <Navbar.Toggle />
        </Navbar.Container>
      </Navbar.Container>
    </Navbar>
  );
}
