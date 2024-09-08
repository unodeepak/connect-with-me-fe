import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import { useState } from "react";
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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // Import DatePicker from MUI
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"; // For working with date values

function Billing() {
  const [data, setData] = useState({});
  const [filters, setFilters] = useState({
    startDate: null, // Use null to manage DatePicker values
    endDate: null,
    transactionType: "all",
    status: "all",
  });

  const [transactions, setTransactions] = useState([
    // Dummy data
    {
      id: "1",
      amount: 100,
      status: "success",
      type: "credited",
      imageLink: "https://via.placeholder.com/50",
      createdAt: "2024-09-07T10:00:00Z",
    },
    {
      id: "2",
      amount: 50,
      status: "pending",
      type: "debited",
      imageLink: "https://via.placeholder.com/50",
      createdAt: "2024-09-06T12:30:00Z",
    },
    {
      id: "3",
      amount: 75,
      status: "failed",
      type: "credited",
      imageLink: "https://via.placeholder.com/50",
      createdAt: "2024-09-05T09:45:00Z",
    },
  ]);

  // Handle filter changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    applyFilters({ ...filters, [name]: value });
  };

  // DatePicker change handler
  const handleDateChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    applyFilters({ ...filters, [name]: value });
  };

  // Filtering logic (filtering locally based on filters)
  const applyFilters = (newFilters) => {
    console.log("Filtering with", newFilters);
    // Here you would typically make an API request with the newFilters to fetch the filtered transactions
    // For now, we're just logging the applied filters
  };

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="weekend"
                  title="Total Earning"
                  count={data?.completeCount}
                  percentage={{
                    color: "success",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="warning"
                  icon="leaderboard"
                  title="Upcoming Amount"
                  count={data?.runningCount}
                  percentage={{
                    color: "success",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="store"
                  title="Cancelled Amount"
                  count={data?.pendingCount}
                  percentage={{
                    color: "success",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>

      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Transaction History
            </Typography>

            <Grid container spacing={3} alignItems="center">
              {/* Date Range Filters */}
              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={filters.startDate}
                    onChange={(newValue) => handleDateChange("startDate", newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date"
                    value={filters.endDate}
                    onChange={(newValue) => handleDateChange("endDate", newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>

              {/* Transaction Type Filter */}
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Transaction Type</InputLabel>
                  <Select
                    name="transactionType"
                    value={filters.transactionType}
                    onChange={handleChange}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="credited">Credited</MenuItem>
                    <MenuItem value="debited">Debited</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Status Filter */}
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select name="status" value={filters.status} onChange={handleChange}>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="failed">Failed</MenuItem>
                    <MenuItem value="success">Success</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} mt={-2}>
          <TableContainer component={Paper}>
            <Table>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
              <TableBody>
                {transactions
                  .filter((transaction) => {
                    // Filter by transaction type
                    if (
                      filters.transactionType !== "all" &&
                      transaction.type !== filters.transactionType
                    ) {
                      return false;
                    }
                    // Filter by status
                    if (filters.status !== "all" && transaction.status !== filters.status) {
                      return false;
                    }
                    // Filter by date range
                    const transactionDate = dayjs(transaction.createdAt);
                    if (filters.startDate && transactionDate.isBefore(filters.startDate)) {
                      return false;
                    }
                    if (filters.endDate && transactionDate.isAfter(filters.endDate)) {
                      return false;
                    }
                    return true;
                  })
                  .map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.status}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{dayjs(transaction.createdAt).format("DD/MM/YYYY")}</TableCell>
                      <TableCell>
                        <img
                          src={transaction.imageLink}
                          alt="transaction"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </TableCell>
                      <TableCell>
                        {dayjs(transaction.createdAt).format("DD/MM/YYYY HH:mm")}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Billing;
