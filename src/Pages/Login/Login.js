import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useToken from "../../hooks/useToken";

const Login = () => {
  const [loginErr, setLoginErr] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [token] = useToken(loginEmail);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, googleLogin } = useContext(AuthContext);

  const handleLogin = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        setLoginEmail(data.email);
      })
      .catch((err) => {
        console.log(err.message);
        setLoginErr(err.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const email = result.user.email;
        console.log(email);
        setLoginEmail(email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (token) {
    return navigate(from, { replace: true });
  }
  return (
    <div className="h-[500px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-4xl text-center">Login</h2>

        <form onSubmit={handleSubmit(handleLogin)}>
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
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "password must be 6 characters long",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/,
                  message: "password should be strong",
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
            value="Login"
            className="btn w-full btn-accent text-white"
          />
        </form>
        <div>{loginErr && <p className="text-red-600">{loginErr}</p>}</div>
        <p>
          New to Doctor Portal?
          <Link to="/signup" className="text-secondary">
            Create a new account
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

export default Login;
