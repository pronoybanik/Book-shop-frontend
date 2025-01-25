import React from "react";
import PHForm from "../../components/Forms/PHForm";
import PHInput from "../../components/Forms/PHInput";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Registration = () => {
  const handleRegister = (data: any) => {
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
          maxWidth: "600px", // Responsive form width
        }}
      >
        <PHForm onSubmit={handleRegister}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "16px",
              fontFamily: "inter",
            }}
          >
            Register
          </h2>
          <PHInput type="text" name="Name" label="Full Name" />
          <PHInput type="email" name="Email" label="Email" />
          <PHInput type="password" name="Password" label="Password" />

          <h6>
            You have account : <Link to="/login">Login</Link>
          </h6>
          <Button
            htmlType="submit"
            type="primary"
            block
            style={{ marginTop: "16px" }}
          >
            Sign up
          </Button>
        </PHForm>
      </div>
    </div>
  );
};

export default Registration;
