import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserToken } from './../../context/userToken';

export default function Login() {
 let {setToken} =useContext(UserToken)
  const [errmsg, serErr] = useState(null);
  const [isLoading, setLoading] = useState(false);
  let navigate = useNavigate();

  const schemaValidation = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Enter Valid Email"),

    password: Yup.string()
      .required("Password is Required")
      .matches(/^[A-Z][a-z0-9]{6,}$/i, "Enter Valid password"),
  });

  async function signIn(values) {
    setLoading(true);
    let response = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        serErr(err.response.data.message);
        setLoading(false);
      });
    console.log(response);
    if (response.data.message === "success") {
      setLoading(false);
      serErr(null);
      formik.resetForm();
      navigate("/Home");
      localStorage.setItem("userToken", response.data.token);
      setToken(localStorage.getItem('userToken'))
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schemaValidation,
    onSubmit: signIn,
  });

  return (
    <div className="w-75 mx-auto my-5">
      <h2 className="text-main fw-bold mb-3">Login Form</h2>
      {errmsg !== null ? <p className=" alert alert-danger">{errmsg}</p> : ""}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            id="email"
            className="form-control"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="password"
            className="form-control"
          />
        </div>
        {formik.errors.password && formik.touched.password ? (
          <div className="alert alert-danger">{formik.errors.password}</div>
        ) : null}

        {isLoading ? (
          <button className="btn bg-main text-light float-end">
            <i className=" fa-solid fa-spinner fa-spin  "></i>
          </button>
        ) : (
          <>
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-light float-end"
              type="submit"
            >
              Login
            </button>
            <Link to={"/register"}>
              <span className="text-main">Go TO Register now....</span>
            </Link>
            <Link to={"/forgetPassword"}>
              <span className="text-main float-end">ForgetPassowrd?</span>
            </Link>
          </>
        )}
      </form>
    </div>
  );
}
