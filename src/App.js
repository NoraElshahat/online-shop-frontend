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
import profile from './components/userProfile/profile';
import tags from './components/Tag/tags';
import AddTag from './components/Tag/AddTag'
import UpdateTag from './components/Tag/UpdateTag'
import users from './components/users/users'
import UpdateUser from './components/users/UpdateUser'
// import Footer from './components/Footer/Footer';
function App() {
  return (
      <div className="App">
        <Router>
          <Route path="/" component={Header}></Route>
          <Route path='/me/:id' component={profile}></Route>
          <Route path="/categories" component={Category}></Route>
          <Route path="/products_category/:id" component={ProductsOfCategory}></Route>
          <Route path="/products" component={AllProducts}></Route>
          <Route path="/product_form" component={addProduct}></Route>
          <Route path="/product_form_edit/:id" component={updateProduct}></Route>
          <Route path="/category_form" component={addCategory}></Route>
          <Route path="/category_form_edit/:id" component={updateCategory}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/tags" component={tags}></Route>
          <Route path='/add_tag' component={AddTag}></Route>
          <Route path='/edit_tag/:id' component={UpdateTag}></Route>
          <Route path="/users" component={users}></Route>
          <Route path='/edit_user/:id' component={UpdateUser}></Route>
          {/* <Footer /> */}
        </Router>
      </div>
  );
}

export default App;
