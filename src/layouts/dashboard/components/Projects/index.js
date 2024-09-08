import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Joblancer React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Joblancer React examples
import DataTable from "examples/Tables/DataTable";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Data
import data from "layouts/dashboard/components/Projects/data";

function Projects() {
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const users = [
    { name: "John Doe", earnings: "$12000", badge: "Gold", projects: 24 },
    { name: "Jane Smith", earnings: "$10500", badge: "Silver", projects: 18 },
    { name: "Michael Johnson", earnings: "$9800", badge: "Platinum", projects: 22 },
    { name: "Emily Davis", earnings: "$8500", badge: "Gold", projects: 20 },
    { name: "Robert Wilson", earnings: "$7900", badge: "Silver", projects: 16 },
    { name: "Sophia Brown", earnings: "$7300", badge: "Gold", projects: 14 },
    { name: "William Taylor", earnings: "$6900", badge: "Bronze", projects: 12 },
    { name: "Olivia Martinez", earnings: "$6700", badge: "Silver", projects: 15 },
    { name: "James Anderson", earnings: "$6100", badge: "Bronze", projects: 13 },
    { name: "Isabella Thompson", earnings: "$5800", badge: "Platinum", projects: 10 },
  ];

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            All Time Top Users
          </MDTypography>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Earnings</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Badge</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Total Projects</strong>
                  </TableCell>
                </TableRow>

                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index + Math.random()}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.earnings}</TableCell>
                      <TableCell>{user.badge}</TableCell>
                      <TableCell>{user.projects}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default Projects;
