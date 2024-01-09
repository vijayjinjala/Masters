import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, Outlet } from "react-router-dom";
import Randertable  from './Ctable';
import Swal from 'sweetalert2';
import * as Yup from "yup";
import Dropdown from "../componanats/Dropdown";
import {useCookies} from "react-cookie";
import Header from "./Header";



export default function State() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success m-1',
        cancelButton: 'btn btn-danger m-1'
    },
    buttonsStyling: false
})


  const header = [
    "No", "State", "Country", "Action",
  ];

  const [states, setstate] = useState([]);
  const [cookies, setCookie, removeCkooki] = useCookies(['vijay.vijay-token']);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    const option = {
      method: "GET",
      headers: { "content-Type": "application/json",'vijay-token':cookies['vijay-token'] },
    };

    fetch("http://localhost:4040/get-states", option)
      .then((response) => response.json())
      .then((response) => {
        setstate(response.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(err);
      });
  };

  const [countryid, setcountryid] = useState([]);
  const [countries, setcountries] = useState([]);
  useEffect(() => {
    countrydata();
  }, []);

  const countrydata = () => {
    const option = {
      method: "GET",
      headers: { "content-Type": "application/json",'vijay-token':cookies['vijay-token'] },
    };

    fetch("http://localhost:4040/get-countries", option)
      .then((response) => response.json())
      .then((response) => {
        setcountries(response.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(err);
      });
  };

const statedelete = (id)=>{
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json','vijay-token':cookies['vijay-token'] },
};
fetch(`http://localhost:4040/put-states?id=${id}`, options)
    .then(response => response.json())
    .then((response) => {
        if (response.status === 1) {
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            getdata();
        } else {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                (response.message),
                'error'
            )
        }
    })
    .catch((err) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
        console.error(err)
    });
}
  
  const editcallback = (response) => {
    // console.log(response);
    // if(response.status==1){
    document.getElementById("btnm").click();
    // }
    setcountryid(response[0].countryid)
    formik.setFieldValue("id", response[0]._id);
    formik.setFieldValue("state_name", response[0].state_name);
  };
  const editstate = (id) =>{
    // console.log(JSON.stringify({id:id})); 
       const options = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json','vijay-token':cookies['vijay-token'] },
        //  body:JSON.stringify({values})
        };
        fetch(`http://localhost:4040/get-states?id=${id}`, options)
          .then(response => response.json())
          .then((response) => {
            editcallback(response.data);
          //  props.editcallback(response.data);
      })
      .catch((err) => {
        alert("Server Down")
        console.error(err)
    
      });
  }
 

      const formik = useFormik({
      // enableReinitialize:true,
      initialValues: {
        id: "",
        state_name: "",
        countryid: "",
      },
        validationSchema: Yup.object({
          state_name: Yup.string().label().required("Satatename required*"),
      }),
      onSubmit: function (values) {
        Object.assign(values,{countryid})
        const options = {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "content-Type": "application/json",'vijay-token':cookies['vijay-token']},
        };

        fetch("http://localhost:4040/post-states", options)
          .then((response) => response.json())
          .then((response) => {
            // console.log(response);
            // alert(response.message);
            Swal.fire({
              position: "center",
              icon: "success",
              title: response.message,
              showConfirmButton: true,
            });
            document.getElementById("closemodel").click();
            getdata();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            console.error(err);
          });
      },
    });

  // 

  return (
    <>
      <main id="main" className="main">
        <Header/>
        <div className="pagetitle">
          <h1>State</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/header"}>Home</Link>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}
        <section className="section dashboard">
          <div class="modal fade" id="verticalycentered" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
              <form onSubmit={formik.handleSubmit}>
              <div class="mb-3 m-4">
                <Dropdown
                db_field={'country_name'}
                value={countryid}
                fieldname={'select country'}
                data={countries}
                onChange={(e)=>setcountryid(e.target.value)}
                />
                </div>
                
                
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      ENTER STATE NAME:
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.state_name &&
                        formik.errors.state_name
                          ? "red-border"
                          : ""
                      } `}
                      id="state_name"
                      value={formik.values.state_name}
                      onChange={formik.handleChange}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <span className="text-red">
                      {formik.errors.state_name}
                    </span>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                      id="closemodel"
                    >
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary">
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <button
            type="button"
            id="btnm"
            onClick={(e) => formik.resetForm()}
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#verticalycentered"
          >
            NEW ADD
          </button>
         
          <Randertable
          header={header}
          tabledata={states}
          deletedatacallback={statedelete}
          editcallback={editstate}
          />
        </section>
      </main>
      {/* End #main */}
      <Outlet />
    </>

    
  );
}
