import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate(); 

  const onSubmit = (data:any) => {
    console.log("data",data.name); 
    localStorage.setItem("Authintication",data.name)

        // Redirect to the dashboard after successful login
        navigate("/dashboard"); 
  };
  return (
    <>
    <h1>Login Form</h1>
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input
          type="text"
          {...register("name", { required: "name is required" })}
        />
        {errors.name &&(
          <span className="error-message">
            {typeof errors.name === "string"
              ? errors.name
              : "name is required"}
          </span>
        )}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="error-message">
            {typeof errors.email === "string"
              ? errors.email
              : "Email is required"}
          </span>
        )}
      </div>
      
      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <span className="error-message">
            {typeof errors.password === "string"
              ? errors.password
              : "Password is required"}
          </span>
        )}
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
    </>

  );
};

export default LoginForm;
