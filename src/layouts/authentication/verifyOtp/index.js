import { Link, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useEffect, useState } from "react";
import axiosInstance from "../instance/instance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const [stateData, setStateData] = useState({});

  useEffect(() => {
    setStateData(JSON.parse(sessionStorage.getItem("stateData")));
  }, []);

  const submitOtp = async (e) => {
    e.preventDefault();

    try {
      const body = { otp };
      console.log({ body }, stateData);
      if (!stateData?.email) {
        toast.error("Email not found");
        return;
      }
      body.email = stateData.email;
      const data = await axiosInstance.post("/user/auth/verifyOtp", body);
      console.log("Response:", data);
      toast.success(data?.data?.msg);
      localStorage.setItem("accessToken", data?.data?.data?.token?.accessToken);
      localStorage.setItem("refreshToken", data?.data?.data?.token?.refreshToken);
      navigate("/authentication/create-password");
    } catch (err) {
      console.log("Error:", err);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const resendOtp = async () => {
    try {
      console.log({ stateData, state: location.state?.data });
      if (stateData?.email) {
        const data = await axiosInstance.post("/user/auth/signup", stateData);
        console.log("Data is : ", data);
        toast.success(data?.data?.msg);
      } else {
        toast.error("Unable to resend otp");
      }
    } catch (err) {
      toast.error("Failed to send otp");
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Verify Your OTP
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Please enter the OTP sent to your email
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={submitOtp}>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="OTP"
                variant="standard"
                fullWidth
                required
                onChange={(e) => setOtp(e.target.value)}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Verify OTP
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Did{"'"}nt receive an OTP?{" "}
                <MDTypography
                  component={Link}
                  // to="/resend-otp"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                  onClick={resendOtp}
                >
                  Resend OTP
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default VerifyOTP;
