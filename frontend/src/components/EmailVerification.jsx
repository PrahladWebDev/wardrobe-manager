import React, { useEffect } from "react";
import axiosInstance from "../utils/axios";
import { useParams, useNavigate } from "react-router-dom";

const EmailVerification = ({ setToken }) => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axiosInstance.get(`/auth/verify/${token}`);
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        alert("Email verified! Logging you in...");
        navigate("/clothing");
      } catch (err) {
        alert("Verification failed: " + (err.response?.data?.message || "Invalid link"));
        navigate("/login");
      }
    };
    verify();
  }, [token, navigate, setToken]);

  return <div className="text-center">Verifying your email...</div>;
};

export default EmailVerification;
