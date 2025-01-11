import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import { useEffect, useState } from "react";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import {
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // Import DatePicker from MUI
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"; // For working with date values
import "../../style/style.css";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { toast } from "react-toastify";
import axiosInstance from "layouts/authentication/instance/instance";
import capitalize from "helpers/capitalize";
import moment from "moment";

function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function Proposal() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [topBarData, setTopBarData] = useState({});
  const [formData, setFormData] = useState({
    client: {
      name: "",
      email: "",
      phone: "",
      gender: "",
    },
    projectName: "",
    estimateTimeInDays: 0,
  });
  const [description, setDescription] = useState("");
  const wordLimit = 1000;
  const [wordCount, setWordCount] = useState(0);
  const [status, setStatus] = useState("all");
  const [proposalData, setProposalData] = useState([]);
  const [length, setLength] = useState(10);
  const limit = 10;

  const [searchTerm, setSearchTerm] = useState("");

  // Function to simulate a search operation
  const performSearch = (query) => {
    console.log("Searching for:", query);
    // Simulate API call or search logic here
  };

  // Create a debounced version of the performSearch function
  const debouncedSearch = debounce(performSearch, 500);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Update the state
    debouncedSearch(value); // Call the debounced function
  };

  const getProjects = async () => {
    try {
      let data = await axiosInstance.get("/proposal/getProjectByUserId", {
        params: {
          page,
          status: status ? status?.toLowerCase() : "all",
          userId: JSON.parse(localStorage.getItem("userData"))["_id"],
          limit,
        },
      });
      setProposalData(data?.data?.data?.data || []);
      setLength(data?.data?.data?.length || 10);
    } catch (err) {
      toast.error(err?.response?.data?.msg);
      console.log("Error is : ", err);
    }
  };
  const getData = async () => {
    try {
      await getProjects();
      let data = await axiosInstance.get("/proposal/getProposalTopBarData");

      setTopBarData(data?.data?.data || {});
    } catch (err) {
      toast.error(err?.response?.data?.msg);
      console.log("Error is : ", err);
    }
  };

  useEffect(() => {
    getProjects();
  }, [page, status]);

  const resetData = () => {
    setFormData({
      client: {
        name: "",
        email: "",
        phone: "",
        gender: "",
      },
      projectName: "",
      estimateTimeInDays: 0,
    });
    setDescription("");
  };

  const createProposal = async () => {
    try {
      formData.description = description;
      await axiosInstance.post(`/proposal/createProject`, {
        ...formData,
      });

      setOpen(false);
      toast("Proposal Addes Successfully");
      resetData();
    } catch (err) {
      console.log("Error is : ", err);
      setOpen(false);
      toast(err?.message);
    }
  };

  const updateFormData = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");
    if (section && field) {
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addDescription = (e) => {
    setDescription(e.target.value);
    setWordCount(e?.target?.value?.length);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="weekend"
                  title="Total Projects"
                  count={topBarData?.total || 0}
                  percentage={{
                    color: "success",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="warning"
                  icon="leaderboard"
                  title="Running Projects"
                  count={topBarData?.running || 0}
                  percentage={{
                    color: "success",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="store"
                  title="Pending Projects"
                  count={topBarData?.pending || 0}
                  percentage={{
                    color: "success",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="store"
                  title="Cancelled Projects"
                  count={topBarData?.cancelled || 0}
                  percentage={{
                    color: "success",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>

      <Dialog open={open} fullWidth maxWidth="md">
        <DialogTitle>Project Details</DialogTitle>
        <DialogContent mt={2}>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Client Name"
                name="client.name"
                value={searchTerm}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Client Name"
                name="client.name"
                value={formData?.client?.name || ""}
                onChange={updateFormData}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Client Email"
                name="client.email"
                value={formData?.client?.email || ""}
                onChange={updateFormData}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="client.phone"
                value={formData?.client?.phone || ""}
                onChange={updateFormData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="client.gender"
                  value={formData?.client?.gender || ""}
                  onChange={updateFormData}
                  label="Gender"
                  className="custom-select"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Project Name"
                name="projectName"
                value={formData?.projectName || ""}
                onChange={updateFormData}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Estimate Time in Days"
                name="estimateTimeInDays"
                value={formData?.estimateTimeInDays || 0}
                onChange={updateFormData}
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                padding={1}
                label="Description"
                multiline
                rows={8} // Adjust height
                fullWidth
                value={description}
                onChange={addDescription}
                variant="outlined"
                helperText={`${wordCount}/${wordLimit} character's`}
                inputProps={{ maxLength: wordLimit * 10 }} // To handle very long words
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button color="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={createProposal} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ padding: "20px" }}>
        <Paper style={{ padding: "20px", marginBottom: "10px" }}>
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            {/* Left side - Transaction Type */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  name="transactionType"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Transaction Type"
                  className="custom-select"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="running">Running</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Right side - Add Project button */}
            <Grid item xs={12} sm={6} md={3} style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
                style={{ color: "white" }}
              >
                Add Project
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableRow style={{ background: "black", color: "white" }}>
              <TableCell>ID</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Estimat Time</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>

            <TableBody>
              {proposalData.length > 0 ? (
                proposalData.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item?._id?.slice(-6)}</TableCell>
                    <TableCell>{capitalize(item.projectName)}</TableCell>
                    <TableCell>
                      {capitalize(item.status)}
                      {/* <Button variant="contained">{capitalize(item.status)}</Button> */}
                    </TableCell>
                    <TableCell>{item.estimateTimeInDays} Days</TableCell>
                    <TableCell>{moment(item?.createdAt).format("DD-MM-YYYY : hh:mm")}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(length / limit)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
        />
      </div>
    </DashboardLayout>
  );
}

export default Proposal;
