import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useToken from "../../hooks/useToken";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [createdEmail, setCreatedEmail] = useState("");
  const [token] = useToken(createdEmail);

  const { createUser, updateUser, googleLogin } = useContext(AuthContext);

  if (token) {
    return navigate("/");
  }

  const handleLogin = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCreatedEmail(email);
      });
  };

  return (
    <div className="h-[500px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-4xl text-center">Sign Up</h2>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">What is your name?</span>
            </label>
            <input
              {...register("name", { required: "name is required" })}
              type="text"
              className="input input-bordered w-full "
            />
            {errors.name && (
              <p role="alert" className="text-red-600">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">What is your email?</span>
            </label>
            <input
              {...register("email", { required: "Email Address is required" })}
              type="email"
              className="input input-bordered w-full "
            />
            {errors.email && (
              <p role="alert" className="text-red-600">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("speciality", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "password must be 6 characters long",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/,
                  message:
                    "password must have uppercase, lowercase, number and special character",
                },
              })}
              type="password"
              className="input input-bordered w-full "
            />
            {errors.password && (
              <p role="alert" className="text-red-600">
                {errors.password?.message}
              </p>
            )}
            <label className="label">
              <span className="label-text">Forget Password</span>
            </label>
          </div>

          <input
            type="submit"
            value="Sign Up"
            className="btn w-full btn-accent text-white"
          />
        </form>
        <p>
          Already have an account?
          <Link to="/login" className="text-secondary">
            Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full" onClick={handleGoogleLogin}>
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
