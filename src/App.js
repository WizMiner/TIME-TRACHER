import { BrowserRouter, Routes, Route } from"react-dom";
const HomePage = () =>{
  return <h1> Home Page</h1>
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path= "/" element={< HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}