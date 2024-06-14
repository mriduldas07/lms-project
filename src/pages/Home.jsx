import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-[url('/img/bg-2.webp')] w-fit lg:w-full lg:h-screen bg-no-repeat text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full py-72 px-28">
          <h1 className="text-2xl lg:text-6xl lg:font-bold text-center">
            Empowering Minds, One Course at a Time.Transforming Education for a
            Brighter Tomorrow
          </h1>
          <div className="text-center py-12">
            <Link to={`/sign-up`}>
              <span className="py-2 px-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-lg font-semibold rounded cursor-pointer">
                Ready to join
              </span>
            </Link>
          </div>
        </div>
        <div className="w-full">
          <img src="/img/hero.webp" alt="" />
        </div>
      </div>
    </div>
  );
}
