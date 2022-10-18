import React, { Suspense } from 'react';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import './App.css';
import Layout from './layout/Layout';

const About = React.lazy(() => import('./screens/About'));
const Product = React.lazy(() => import('./screens/Product'));
const Home = React.lazy(() => import('./screens/Home'));
const Login = React.lazy(() => import('./screens/Login'));

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default App;
