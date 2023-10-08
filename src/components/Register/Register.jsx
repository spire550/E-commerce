import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function Register() {
  const [errmsg, serErr] = useState(null);
  const [isLoading, setLoading] = useState(false);
 let navigate= useNavigate()

  const schemaValidation = Yup.object({
    name: Yup.string()
      .min(3, "min length is 3 char")
      .max(15, "max length is 15 char")
      .required("Name is Required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Enter Valid Email"),

    password: Yup.string()
      .required("Password is Required")
      .matches(/^[A-Z][a-z0-9]{6,}$/i, "Enter Valid password"),
    rePassword: Yup.string()
      .required("rePassword is Required")
      .oneOf([Yup.ref("password")], "Password not match"),
    phone: Yup.string()
      .required("Phone is Required")
      .matches(/^01[0125][0-9]{8}$/i, "Enter Valid phone"),
  });

  async function signUp(values) {
    setLoading(true);
    let response = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        serErr(err.response.data.message);
        setLoading(false);
      });
    console.log(response);
    if (response.data.message === "success") {
      setLoading(false);
      serErr(null);
      formik.resetForm();
      navigate('/login')
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: schemaValidation,
    onSubmit: signUp,
  });

  return (
    <div className="w-75 mx-auto my-5">
      <h2 className="text-main fw-bold mb-3">Register Form</h2>
      {errmsg !== null ? <p className=" alert alert-danger">{errmsg}</p> : ""}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Name</label>

          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="name"
            className="form-control"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}
        </div>
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
          <label htmlFor="phone">Phone</label>
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            id="phone"
            className="form-control"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
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
        <div className="mb-3">
          <label htmlFor="rePassword">rePassword</label>
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="rePassword"
            className="form-control"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : null}
        </div>
        {isLoading ? (
          <button className="btn bg-main text-light float-end">
            <i className=" fa-solid fa-spinner fa-spin  "></i>
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            className="btn bg-main text-light float-end"
            type="submit"
          >
            Register
          </button>
        )}
      </form>
    </div>
  );
}
