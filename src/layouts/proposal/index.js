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
// Mock transaction data
const mockTransactions = [
  {
    id: 1,
    amount: 100,
    status: "Success",
    type: "Credited",
    date: "2023-09-01",
    createdAt: "2023-09-01",
  },
  {
    id: 2,
    amount: 200,
    status: "Pending",
    type: "Debited",
    date: "2023-09-02",
    createdAt: "2023-09-02",
  },
  {
    id: 3,
    amount: 150,
    status: "Failed",
    type: "Debited",
    date: "2023-09-03",
    createdAt: "2023-09-03",
  },
  // Add more mock records here...
];

function Proposal() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const [transactionType, setTransactionType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [topBarData, setTopBarData] = useState({});

  const getData = async () => {
    try {
      let data = await axiosInstance.get("/payment/getTopBarTransaction");
      let transactions = await axiosInstance.get("/payment/getTransactionHistory", {
        page,
        limit: 10,
      });

      setTopBarData(data?.data?.data || {});
      setTransactions(transactions?.data?.data || []);
    } catch (err) {
      toast.error(err?.response?.data?.msg);
      console.log("Error is : ", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Filter transactions whenever the filters change
  useEffect(() => {
    let filtered = transactions;

    // Date filter
    if (startDate && endDate) {
      filtered = filtered.filter(
        (transaction) =>
          dayjs(transaction.date).isAfter(dayjs(startDate).subtract(1, "day")) &&
          dayjs(transaction.date).isBefore(dayjs(endDate).add(1, "day"))
      );
    }

    // Type filter (Credited, Debited, All)
    if (typeFilter !== "All") {
      filtered = filtered.filter((transaction) => transaction.type === typeFilter);
    }

    // Status filter (Success, Pending, Failed, All)
    if (statusFilter !== "All") {
      filtered = filtered.filter((transaction) => transaction.status === statusFilter);
    }

    setFilteredTransactions(filtered);
  }, [startDate, endDate, statusFilter, typeFilter, transactions]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Pagination: Calculate the records to display on the current page
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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

  const handleAddProject = () => {
    console.log("Add Project button clicked!");
    // Add your logic here
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
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="weekend"
                  title="Total Projects"
                  count={data?.success || 0}
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
                  count={data?.pending || 0}
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
                  count={data?.failed || 0}
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
                  count={data?.failed || 0}
                  percentage={{
                    color: "success",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>

      <div style={{ padding: "20px" }}>
        <Paper style={{ padding: "20px", marginBottom: "10px" }}>
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            {/* Left side - Transaction Type */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="drop-down-select"
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Credited">Credited</MenuItem>
                  <MenuItem value="Debited">Debited</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Right side - Add Project button */}
            <Grid item xs={12} sm={6} md={3} style={{ textAlign: "right" }}>
              <Button variant="contained" color="primary" onClick={handleAddProject}>
                Add Project
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            {/* <TableHead> */}
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
            {/* </TableHead> */}
            <TableBody>
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.createdAt}</TableCell>
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
          count={Math.ceil(filteredTransactions.length / rowsPerPage)}
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
