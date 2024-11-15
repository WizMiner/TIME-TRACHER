import React, { useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../firebase/config";

//Instance of firestore
const db = getFirestore(app);
//instance of auth
const auth = getAuth(app);

function CreateTaskPage() {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setsuccess] = useState(false);
//  const navigate = useNavigate();

  //Create task handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      setsuccess(false);
      //save task into DB
      addDoc(collection(db, "tasks"), {
        task: task.trim(),
        status: "unstarted",
        startTime: null,
        endTime: null,
        userId: auth.currentUser.uid,
      });
      setsuccess(true);
      setTask("");
      // navigate("/reports");
    } catch (error) {
      setError("Error adding task:" + error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg bg-opacity-10 backdrop-filter backdrop-blur-lg">
        <h1 className="flex items-center mb-4 space-x-2 text-4xl font-bold text-white text-shadow">
          <AiOutlineFieldTime />
          <span>Create a new task</span>
        </h1>
        <p className="mb-8 text-white text-opacity-80">
          Turn your plans into achievable tasks. Start by naming your task
          below.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label htmlFor="task" className="block mb-2 font-bold text-white">
              Task description
            </label>
            <input
              type="text"
              id="task"
              required
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full px-4 py-2 text-white placeholder-white bg-transparent bg-opacity-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="e.g. Complete React Project"
              style={{
                color: "white",
                textShadow: "0 0 10px rgba(0,0,0,0.25)",
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              disabled={loading}
              type="submit"
              className="w-full px-6 py-3 text-white bg-opacity-50 rounded bg-gradient-to-r from-pink-500 to-purple-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {loading ? "Loading please wait" : "Create Task"}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          {success && (
            <p className="mt-2 text-sm text-green-500">
              Task created successfully
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateTaskPage;
