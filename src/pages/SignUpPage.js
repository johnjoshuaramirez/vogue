import { useState, useEffect } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import { HiStar } from "react-icons/hi2";
import toast, { Toaster } from "react-hot-toast";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async e => {
    e.preventDefault();

    await signup(email, firstName, lastName, password);
  };

  useEffect(() => {
    if (password !== rePassword) {
      toast.error("Passwords do not match!", {
        duration: 3000,
        position: "top-center"
      });
      return;
    }
  }, [error]);

  return (
    <section className="text-gray-800 font-[sans-serif] min-h-screen bg-gray-200 grid py-16 place-items-center">
      <Toaster />
      <div className="w-[90%] mx-auto max-w-[400px]">
        <Link to="/">
          <HiStar className="w-14 h-14 mx-auto mb-3" />
        </Link>
        <h1 className="font-extrabold tracking-tight mb-8 text-2xl md:text-3xl text-center">
          Register your account
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
              type="email"
              id="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-5 py-2 rounded outline-none ring-1 ring-gray-300 focus:ring-gray-400"
            />
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <label
              htmlFor="firstName"
              className="text-sm text-gray-600 font-medium"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="px-5 py-2 rounded outline-none ring-1 ring-gray-300 focus:ring-gray-400"
            />
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <label
              htmlFor="lastName"
              className="text-sm text-gray-600 font-medium"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="px-5 py-2 rounded outline-none ring-1 ring-gray-300 focus:ring-gray-400"
            />
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <label
              htmlFor="password"
              className="text-sm text-gray-600 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              title="At least 8 chars, 1 digit and 1 lowercase"
              required
              pattern="(?=.*\d)(?=.*[a-z]).{8,}"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="px-5 py-2 rounded outline-none ring-1 ring-gray-300 focus:ring-gray-400"
            />
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <label
              htmlFor="rePassword"
              className="text-sm text-gray-600 font-medium"
            >
              Re-enter password
            </label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              required
              value={rePassword}
              onChange={e => setRePassword(e.target.value)}
              className="px-5 py-2 rounded outline-none ring-1 ring-gray-300 focus:ring-gray-400"
            />
          </div>
          <p className="mb-6">
            Go to{" "}
            <Link to="/auth/signin" className="underline">
              sign in page
            </Link>
          </p>
          <button
            disabled={isLoading}
            type="submit"
            className="py-3 px-5 w-full rounded bg-black hover:bg-gray-950 text-white"
          >
            Sign up
          </button>
          {error && <div>{error}</div>}
        </form>
      </div>
    </section>
  );
};

export default SignUpPage;
