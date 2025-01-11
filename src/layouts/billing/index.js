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
import moment from "moment";
// Mock transaction data

function Billing() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const [length, setLength] = useState(10);

  const [transactionType, setTransactionType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [topBarData, setTopBarData] = useState({});

  const getData = async () => {
    try {
      let transactions = await axiosInstance.get("/payment/getTransactionHistory", {
        params: { page, limit: 10, status: statusFilter?.toLowerCase() || "all" },
      });

      setTransactions(transactions?.data?.data || []);
      setLength(transactions?.data?.length > 0 ? transactions?.data?.length : 10);
    } catch (err) {
      toast.error(err?.response?.data?.msg);
      console.log("Error is : ", err);
    }
  };

  const getTopBarData = async () => {
    try {
      let transactions = await axiosInstance.get("/payment/getTransactionTopBarData", {});

      setTopBarData(transactions?.data?.data || {});
    } catch (err) {
      toast.error(err?.response?.data?.msg);
      console.log("Error is : ", err);
    }
  };

  useEffect(() => {
    getData();
  }, [statusFilter, page]);

  useEffect(() => {
    getTopBarData();
  }, []);

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
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon={<span>₹</span>}
                  title="Total Earning"
                  count={`₹${topBarData?.success || 0}`}
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
                  icon="trending_up"
                  title="Upcoming Amount"
                  count={`₹${topBarData?.pending || 0}`}
                  percentage={{
                    color: "success",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="remove_circle_outline"
                  title="Cancelled Amount"
                  count={`₹${topBarData?.failed || 0}`}
                  percentage={{
                    color: "success",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>

      <div style={{ padding: "0px" }}>
        <Paper
          style={{
            padding: "20px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid>
            <Typography variant="h5">Transaction Filters</Typography>
          </Grid>
          <Grid>
            <Grid container spacing={2} style={{ minWidth: "200px" }}>
              {/* <Grid item xs={12} sm={6} md={6}>
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
              </Grid> */}
              <Grid item xs={12} sm={12} md={12}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="drop-down-select"
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Success">Success</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Failed">Failed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            {/* <TableHead> */}
            <TableRow style={{ background: "black", color: "white" }}>
              <TableCell>ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
            {/* </TableHead> */}
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>{transaction._id.slice(-6)}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                    <TableCell>{transaction.transactionType?.toUpperCase()}</TableCell>
                    <TableCell>{moment(transaction.date).format("DD-MM-YY : HH:mm")}</TableCell>
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
          count={Math.ceil(length / 10)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
        />
      </div>
    </DashboardLayout>
  );
}

export default Billing;
