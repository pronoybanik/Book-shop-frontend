import React from "react";
import PHForm from "../../components/Forms/PHForm";
import PHInput from "../../components/Forms/PHInput";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  const handleLogin = (data: any) => {
    console.log("data", data);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "gray",
      }}
    >
      <div
        style={{
          backgroundColor: "white", // Form container with white background
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow for aesthetic
          width: "200%",
          maxWidth: "600px",
        }}
      >
        <PHForm onSubmit={handleLogin}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "16px",
              fontFamily: "inter",
            }}
          >
            Login
          </h2>

          <PHInput type="email" name="Email" label="Email" />
          <PHInput type="password" name="Password" label="Password" />
          <h6>
            You have no account : <Link to="/registration">signup</Link>
          </h6>
          <Button
            htmlType="submit"
            type="primary"
            block
            style={{ marginTop: "16px" }}
          >
            sign in
          </Button>
        </PHForm>
      </div>
    </div>
  );
};

export default Login;
