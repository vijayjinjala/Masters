import React, { useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { Outlet, Link } from "react-router-dom";
import {  useNavigate, useLocation } from 'react-router-dom';

export default function Registration() {

  const [agree, setAgree] = useState(false);
  const checkboxHandler = () => {
    setAgree(!agree);
  }

  const Navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      name: "",
      email: "",
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().label().required("Please, enter your name!"),
      email: Yup.string().label().email().required("Please enter a valid Email adddress!"),
      username: Yup.string().label().required("Please choose a username!"),
      password: Yup.string().required("Please enter your password!"),
    }),
    onSubmit: function (values) {
      const options = {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "content-Type": "application/json" },
      };

      fetch("http://localhost:4040/post-data", options)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          alert(response.message)
          if(response.status==1){
            Navigate("/login")
          }
        })
        .catch((err) => console.error(err));
    },
  })
  return (
    <>
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
                          <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                          <p className="text-center small">Enter your personal details to create account</p>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="row g-3 needs-validation" noValidate>
                          <div className="col-12">
                            <label htmlFor="yourName" className="form-label">Your Name</label>
                            <input
                              className={`form-control  
                     ${formik.touched.name && formik.errors.name ? "red-border" : ""} `}
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              type="text" name="name" id="name" required />
                          </div>
                          <span className="text-red">{formik.errors.name}</span>
                          <div className="col-12">
                            <label htmlFor="yourEmail" className="form-label">Your Email</label>
                            <input
                              className={`form-control  
                     ${formik.touched.email && formik.errors.email ? "red-border" : ""} `}
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              type="email" name="email" id="email" required />
                          </div>
                          <span className="text-red">{formik.errors.email}</span>
                          <div className="col-12">
                            <label htmlFor="yourUsername" className="form-label">Username</label>
                            <input
                              className={`form-control  
                       ${formik.touched.username && formik.errors.username ? "red-border" : ""} `}
                              value={formik.values.username}
                              onChange={formik.handleChange}
                              type="text" name="username" id="username" required />
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
                          </div>
                          <span className="text-red">{formik.errors.password}</span>
                          <div className="col-12">
                            <div className="form-check">
                              <input className="form-check-input" name="terms" type='checkbox' onChange={checkboxHandler} defaultValue id="agree" required />
                              <label className="form-check-label" htmlFor="agree">I agree and accept the <a href="#">terms and conditions</a></label>
                              <div className="invalid-feedback">You must agree before submitting.</div>
                            </div>
                          </div>
                          <div className="col-12">
                            <button className="btn btn-primary w-100" disabled={!agree} type="submit">Create Account</button>
                          </div>
                          <div className="col-12">
                          <input className="form-control" type="checkbox" />
                            <p className="small mb-0">Already have an account?<Link to="/login"> <a className="nav-link collapsed">Log in</a></Link></p>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="credits">
                      Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

      </div>

    </>
  )
}
