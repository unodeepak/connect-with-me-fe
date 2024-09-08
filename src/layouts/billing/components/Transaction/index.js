import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
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
} from "@mui/material";
import React, { useState } from "react";

function Transaction({ color, icon, name, description, value }) {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    transactionType: "all", // 'credited', 'debited', 'all'
    status: "all", // 'pending', 'failed', 'success', 'all'
  });
  const [transactions, setTransactions] = useState([
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    // Filter logic to be implemented (backend API call or local filtering)
    console.log("Applying Filters", filters);
  };

  return (
    <MDBox key={name} component="li" py={1} pr={2} mb={1}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox display="flex" alignItems="center">
          <MDBox mr={2}>
            <MDButton variant="outlined" color={color} iconOnly circular>
              <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
            </MDButton>
          </MDBox>
          <MDBox display="flex" flexDirection="column">
            <MDTypography variant="button" fontWeight="medium" gutterBottom>
              {name}
            </MDTypography>
            <MDTypography variant="caption" color="text" fontWeight="regular">
              {description}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDTypography variant="button" color={color} fontWeight="medium" textGradient>
          {value}
        </MDTypography>
      </MDBox>

      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12}>
          <Paper style={{ padding: "20px" }}>
            <Grid container spacing={2}>
              {/* Date Range Filters */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  name="startDate"
                  InputLabelProps={{ shrink: true }}
                  value={filters.startDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="date"
                  label="End Date"
                  name="endDate"
                  InputLabelProps={{ shrink: true }}
                  value={filters.endDate}
                  onChange={handleChange}
                />
              </Grid>

              {/* Transaction Type Filter */}
              <Grid item xs={12} md={4}>
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

              {/* Transaction Status Filter */}
              <Grid item xs={12} md={4}>
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

              {/* Apply Filters Button */}
              <Grid item xs={12} md={4}>
                <Button variant="contained" color="primary" fullWidth onClick={applyFilters}>
                  Apply Filters
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Transaction Table */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <img
                        src={transaction.imageLink}
                        alt="transaction"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </TableCell>
                    <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </MDBox>
  );
}

Transaction.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]).isRequired,
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Transaction;
