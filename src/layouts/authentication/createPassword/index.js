import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import axiosInstance from "../instance/instance";
import { toast } from "react-toastify";

// Function to validate password strength
const isStrongPassword = (password) => {
  // Minimum 6 characters, at least one uppercase, one lowercase, one number, and one special character
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return strongPasswordRegex.test(password);
};

function CreatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [stateData, setStateData] = useState({});

  useEffect(() => {
    setStateData(JSON.parse(sessionStorage.getItem("stateData")));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Both fields are required.");
      return;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    } else if (!isStrongPassword(password)) {
      toast.error(
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return {};
    }

    try {
      const body = { password };
      const data = await axiosInstance.post("/user/createPassword", body);
      toast.success(data?.data?.msg);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to create password. Please try again.");
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
            Create Your Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your new password below
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Confirm Password"
                variant="standard"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Create Password
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default CreatePassword;
