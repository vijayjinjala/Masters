import React, { useEffect } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import {  useNavigate, useLocation } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import {useCookies} from "react-cookie";
import Header from './Header';


export default function Login() {
   
    const [cookies, setCookie, removeCkooki] = useCookies(['vijay-token']);

    const Navigate = useNavigate();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          id: "",
          username: "",
          password: ""
        },
        validationSchema: Yup.object({
          username: Yup.string().label().required("Please Enter a Username!"),
          password: Yup.string().required("Please Enter your password!"),
      
        }),
        onSubmit: function (values) {
            const options = {
              method: "POST",
              body: JSON.stringify(values),
              headers: { "content-Type": "application/json" },
            };
      
            fetch("http://localhost:4040/loginuser", options)
              .then((response) => response.json())
              .then((response) => {
                //console.log(response)
                alert(response.message)
                if(response.status==1){
                    setCookie('vijay-token',response.token)
                  Navigate("/header")
                }
              })
              .catch((err) => console.error(err));
          },
    })
    
    return (
        <div>
           <main>
  <div className="container">
    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex justify-content-center py-4">
              <a href="index.html" className="logo d-flex align-items-center w-auto">
                <img src="assets/img/logo.png" alt />
                <span className="d-none d-lg-block">NiceAdmin</span>
              </a>
            </div>{/* End Logo */}
            <div className="card mb-3">
              <div className="card-body">
                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                  <p className="text-center small">Enter your username &amp; password to login</p>
                </div>
                <form onSubmit={formik.handleSubmit} className="row g-3 needs-validation" noValidate>
                  <div className="col-12">
                    <label htmlFor="yourUsername" className="form-label">Username</label>
                    <div className="input-group has-validation">
                      <input
                       className={`form-control  
                       ${formik.touched.username && formik.errors.username ? "red-border" : ""} `}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                      type="text" name="username" id="username" required />
                      <div className="invalid-feedback">Please enter your username.</div>
                    </div>
                  </div>
                  <span className="text-red">{formik.errors.username}</span>
                  <div className="col-12">
                    <label htmlFor="yourPassword" className="form-label">Password</label>
                    <input 
                     className={`form-control  
                     ${formik.touched.password && formik.errors.password ? "red-border" : ""} `}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    type="password" name="password" id="password" required />
                    <div className="invalid-feedback">Please enter your password!</div>
                  </div>
              <span className="text-red">{formik.errors.password}</span>
                  <div className="col-12">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="remember" defaultValue="true" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100" type="submit">Login</button>
                  </div>
                  <div className="col-12">
                    <p className="small mb-0">Don't have account? <Link to="/registration"> <a className="nav-link collapsed">Create an account</a></Link></p>
                  </div>
                </form>
              </div>
            </div>
            <div className="credits">
              {/* All the links in the footer should remain intact. */}
              {/* You can delete the links only if you purchased the pro version. */}
              {/* Licensing information: https://bootstrapmade.com/license/ */}
              {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ */}
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>
</div>
    )
}
