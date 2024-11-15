import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import app from "../firebase/config";

//Auth instance
const auth = getAuth(app);
//Google login
const provider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [error, setError] = useState(null);
  //navigate
  const navigate = useNavigate();

  //----------
  //Register
  //----------
  const signUp = async () => {
    setRegisterLoading(true);
    setError(null);
    try {
      //Make request to firebase
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signed Up successfully");
      navigate("/reports");
    } catch (error) {
      setError(error.message);
    }
  };
  //----------
  //Login
  //----------
  const logIn = async () => {
    setLoginLoading(true);
    setError(null);
    try {
      //Make request to firebase
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      alert("Logged in successfully");
      navigate("/reports");
    } catch (error) {
      setError(error.message);
    }
  };

  //----------
  //Google login
  //----------
  const googleSignIn = async () => {
    setLoginLoading(true);
    setError(null);
    try {
      //Make request to firebase
      const user = await signInWithPopup(auth, provider);
      console.log(user);
      alert("Logged in successfully");
      navigate("/reports");
    } catch (error) {
      setError(error.message);
    }
  };

  //Redirect if user is login
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/reports");
      }
    });
    //clean up
    return () => unSubscribe();
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-100 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                disabled={registerLoading}
                onClick={signUp}
                type="button"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {registerLoading ? "Loading please wait" : "Register"}
              </button>
              <button
                onClick={logIn}
                type="button"
                className="flex justify-center w-full px-4 py-2 mt-3 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loginLoading ? "Loading please wait" : "Login"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mt-6">
              <div>
                <button
                  onClick={googleSignIn}
                  disabled={loginLoading}
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  <FcGoogle className="w-auto h-5 text-center " />
                  Continue with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
