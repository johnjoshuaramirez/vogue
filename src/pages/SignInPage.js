import { useState } from "react";
import { useSignin } from "../hooks/useSignin";
import { Link } from "react-router-dom";
import { HiStar } from "react-icons/hi2";
import { Toaster } from "react-hot-toast";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signin, isLoading } = useSignin();

  const handleSubmit = async e => {
    e.preventDefault();

    await signin(email, password);
  };

  return (
    <section className="text-gray-800 font-[sans-serif] min-h-screen bg-gray-200 grid py-16 place-items-center">
      <Toaster />
      <div className="w-[90%] mx-auto max-w-[400px]">
        <Link to="/">
          <HiStar className="w-14 h-14 mx-auto mb-3" />
        </Link>
        <h1 className="font-extrabold tracking-tight mb-8 text-2xl md:text-3xl text-center">
          Sign in to your account
        </h1>
        <form onSubmit={handleSubmit} className="bg-white rounded p-8">
          <div className="flex flex-col gap-1 mb-3">
            <label
              htmlFor="email"
              className="text-sm text-gray-600 font-medium"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-5 py-2 rounded outline-none ring-1 ring-gray-300 focus:ring-gray-400"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <label
              htmlFor="password"
              className="text-sm text-gray-600 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="px-5 py-2 rounded outline-none ring-1 ring-gray-300 focus:ring-gray-400"
            />
          </div>
          <p className="mb-6">
            Go to{" "}
            <Link to="/auth/signup" className="underline">
              sign up page{" "}
            </Link>
          </p>
          <button
            type="submit"
            disabled={isLoading}
            className="py-3 px-5 w-full rounded bg-black hover:bg-gray-950 text-white"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignInPage;
