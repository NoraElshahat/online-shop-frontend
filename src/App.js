import './App.css';
import Login from './components/Login';
import Header from './components/Header/Header';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Category from './components/Catgory/Category';
import addCategory from './components/Catgory/addCategory';
import updateCategory from './components/Catgory/updateCategory';
import AllProducts from './components/Product/all_product';
import addProduct from './components/Product/addProduct';
import updateProduct from './components/Product/updateProduct'
import ProductsOfCategory from './components/Product/ProductsOfCategory'
// import Footer from './components/Footer/Footer';
function App() {
  return (
      <div className="App">
        <Router>
          <Header />
          <Route path="/categories" component={Category}></Route>
          <Route path="/products_category/:id" component={ProductsOfCategory}></Route>
          <Route path="/products" component={AllProducts}></Route>
          <Route path="/product_form" component={addProduct}></Route>
          <Route path="/product_form_edit/:id" component={updateProduct}></Route>
          <Route path="/category_form" component={addCategory}></Route>
          <Route path="/category_form_edit/:id" component={updateCategory}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={SignUp}></Route>
          {/* <Footer /> */}
        </Router>
      </div>
  );
}

export default App;
