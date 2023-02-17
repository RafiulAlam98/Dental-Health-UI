import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
  };
  return (
    <div className="h-[500px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-4xl text-center">Login</h2>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">What is your name?</span>
            </label>
            <input
              {...register("name")}
              type="email"
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("name")}
              type="password"
              className="input input-bordered w-full "
            />
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
        <p>
          New to Doctor's Portal?{" "}
          <Link to="/signup" className="text-secondary">
            Create a new account
          </Link>
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">Continue With Google</button>
      </div>
    </div>
  );
};

export default Login;
