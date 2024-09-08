import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "layouts/authentication/instance/instance";
import { toast } from "react-toastify";
// import
function Overview() {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isVerifiedEmail: false,
    isVerifiedPhone: false,
    password: "",
    phoneNumber: "",
    linkedinUri: "",
    fiverrUri: "",
    upworkUri: "",
    instaUri: "",
    twitter: "",
    gender: "",
    dob: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    district: "",
    country: "",
    profilePictureUrl: "",
    userType: "user",
    bankDetails: {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      branchName: "",
      ifscCode: "",
      accountType: "Savings",
    },
  });

  const getProfileData = async () => {
    try {
      let data = await axiosInstance.get("/user/getUserData");
      data = data?.data?.data || {};
      console.log("Data is : ", data);
      setFormData({
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        email: data?.email || "",
        isVerifiedEmail: false,
        isVerifiedPhone: false,
        password: data?.password || "",
        phoneNumber: data?.phoneNumber || "",
        linkedinUri: data?.linkedinUri || "",
        fiverrUri: data?.fiverrUri || "",
        upworkUri: data?.upworkUri || "",
        instaUri: data?.instaUri || "",
        twitter: data?.twitter || "",
        gender: data?.gender || "",
        dob: data?.dob || "",
        address: data?.address || "",
        pincode: data?.pincode || "",
        city: data?.city || "",
        state: data?.state || "",
        district: data?.district || "",
        country: data?.country || "",
        profilePictureUrl: data?.profilePictureUrl || "",
        bankDetails: {
          accountHolderName: data?.bankDetails?.accountHolderName || "",
          accountNumber: data?.bankDetails?.accountNumber || "",
          bankName: data?.bankDetails?.bankName || "",
          branchName: data?.bankDetails?.branchName || "",
          ifscCode: data?.bankDetails?.ifscCode || "",
          accountType: data?.bankDetails?.accountType || "",
        },
      });
    } catch (err) {
      console.log("Error is : ", err);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("bankDetails")) {
      setFormData((prev) => ({
        ...prev,
        bankDetails: { ...prev.bankDetails, [name.split(".")[1]]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data Submitted:", formData);
      delete formData.isVerifiedEmail;
      delete formData.isVerifiedPhone;
      delete formData.password;
      const data = await axiosInstance.put("/user/updateRecord", formData);
      console.log("Data is : ", data);
      toast.success(data?.data?.msg);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log("Error is : ", err);
    }
  };

  return (
    <DashboardLayout>
      <Grid justifyContent="center">
        <Grid item xs={12} md={10} lg={8}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Profile Details
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Personal Details */}
              <Typography variant="h6" mb={2}>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date of Birth"
                    name="dob"
                    InputLabelProps={{ shrink: true }}
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth required sx={{ marginBottom: "16px" }}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      required
                      name="gender"
                      value={formData.gender || ""}
                      onChange={handleChange}
                      label="Gender"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Contact & Social Links */}
              <Typography variant="h6" mb={2} style={{ marginTop: "20px" }}>
                Contact & Social Links
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="LinkedIn URL"
                    name="linkedinUri"
                    value={formData.linkedinUri}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Fiverr URL"
                    name="fiverrUri"
                    value={formData.fiverrUri}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Upwork URL"
                    name="upworkUri"
                    value={formData.upworkUri}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Instagram URL"
                    name="instaUri"
                    value={formData.instaUri}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Twitter URL"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              {/* Address */}
              <Typography variant="h6" mb={2} style={{ marginTop: "20px" }}>
                Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="District"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              {/* Bank Details */}
              <Typography variant="h6" mb={2} style={{ marginTop: "20px" }}>
                Bank Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Account Holder Name"
                    name="bankDetails.accountHolderName"
                    value={formData.bankDetails.accountHolderName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Account Number"
                    name="bankDetails.accountNumber"
                    value={formData.bankDetails.accountNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Bank Name"
                    name="bankDetails.bankName"
                    value={formData.bankDetails.bankName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Branch Name"
                    name="bankDetails.branchName"
                    value={formData.bankDetails.branchName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="IFSC Code"
                    name="bankDetails.ifscCode"
                    value={formData.bankDetails.ifscCode}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Account Type</InputLabel>
                    <Select
                      name="bankDetails.accountType"
                      value={formData.bankDetails.accountType}
                      onChange={handleChange}
                    >
                      <MenuItem value="Savings">Savings</MenuItem>
                      <MenuItem value="Current">Current</MenuItem>
                      <MenuItem value="Salary">Salary</MenuItem>
                      <MenuItem value="Fixed Deposit">Fixed Deposit</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={12} style={{ marginTop: "20px", textAlign: "center" }}>
                <Button type="submit" variant="contained" color="primary">
                  Update Profile
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Overview;
