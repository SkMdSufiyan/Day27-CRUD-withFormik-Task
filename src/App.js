import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Products from "./Products.js";
import ActionProduct from "./ActionProduct.js";

// Main component which handles all the routings
function App() {
  return (
    <div className='App'>
      <h6>Day 27 task (product CRUD with formik) </h6>
  
  <p className="netlify-suggestion-p">Kindly <b>DO NOT REFRESH</b> this netlify site when you are in the page other than home (all-products-list) page. If you refresh on page other than home page, then it will give "page not found" (problem with netlify deployment). </p>
    
      <BrowserRouter>       
          <Routes>

            {/* Routing for all-products-list page */}
            <Route path="/" element={ <Products /> } />

            {/* Routing for add-product page */}
             <Route path="/add-product" element={ <ActionProduct /> } />

             {/* Routing for edit-product page */}
            <Route path="/edit-product/:id" element={ <ActionProduct /> } />

            {/* Routing for view-product page */}
            <Route path="/view-product/:id/:toView" element={ <ActionProduct /> } />
           </Routes>    

      </BrowserRouter> 

    </div>
    
  );
}

export default App;


