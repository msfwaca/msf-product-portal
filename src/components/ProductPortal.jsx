import React, { useState } from "react";
import { 
  Container, Grid, Card, CardContent, Typography, Button, TextField, Box, 
  AppBar, Toolbar, IconButton, Link, Tabs, Tab, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper 
} from "@mui/material";
import { LightMode, DarkMode, Search } from "@mui/icons-material";

const instances = {
  production: [{ name: "DHIS2", url: "#", github: "#", description: "Live on his.msf-waca.org" }],

  testing: [
    { name: "Development Server", description: "This is for DHIS2 developers", username: "Admin", password: "Admin123", url: "#", github: "#" },
    { name: "Latest Pre-release Training instance", description: "An instance to facilitate Trainings on DHSI2", username: "Admin", password: "Admin123", url: "#", github: "#" },
    { name: "DHIS2-Test", description: "Use to test DHIS2 app", username: "Admin", password: "Admin123", url: "#", github: "#" },
  ],
};

const trainingMaterials = {
  tot: [{ product: "DHIS2 v2.41", description: "Introduction to DHIS2", jobAid: "Download", video: "Watch" }],
  endUser: [{ product: "Data Visualization", description: "Creating Reports in DHIS2", jobAid: "Download", video: "Watch" }],
};

export default function ProductPortal() {
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const filteredProduction = instances.production.filter(instance =>
    instance.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredTesting = instances.testing.filter(instance =>
    instance.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredTrainingMaterials = selectedTab === 0
    ? trainingMaterials.tot.filter(material => material.product.toLowerCase().includes(searchTerm.toLowerCase()) || material.description.toLowerCase().includes(searchTerm.toLowerCase()))
    : trainingMaterials.endUser.filter(material => material.product.toLowerCase().includes(searchTerm.toLowerCase()) || material.description.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box sx={{ backgroundColor: darkMode ? "#303030" : "#f5f5f5", minHeight: "100vh", padding: 4 }}>
      <AppBar position="static" sx={{ backgroundColor: darkMode ? "#424242" : "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>MSF WaCA Product Portal</Typography>
          <Link href="#production" color="inherit" underline="none" sx={{ mx: 2 }}>Production</Link>
          <Link href="#testing" color="inherit" underline="none" sx={{ mx: 2 }}>Testing</Link>
          <Link href="#training" color="inherit" underline="none" sx={{ mx: 2 }}>Training</Link>
          <TextField
            variant="outlined"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: 1, marginRight: 2 }}
            InputProps={{ endAdornment: <Search /> }}
          />
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Container>
      <Box textAlign="center" mt={4}>
          <Typography variant="h4" fontWeight="bold" color={darkMode ? "white" : "black"}>
            HIS live, Training & Testing Instances
          </Typography>
          <Typography variant="subtitle1" color={darkMode ? "gray" : "black"}>List of all servers</Typography>
          <Typography variant="body1" color={darkMode ? "gray" : "black"} mt={0}>
            These are the released versions of HIS products. Use of these testing instances should be primarily for demo and training.
          </Typography>
        </Box>

        <Typography variant="h5" color={darkMode ? "white" : "black"} mt={4} id="production">Production Instances</Typography>
        <Grid container spacing={3} mt={2}>
          {filteredProduction.map((instance, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ backgroundColor: darkMode ? "#424242" : "white", color: darkMode ? "white" : "black", boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6">{instance.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{instance.description}</Typography>
                  <Box mt={2}>
                    <Button variant="contained" color="primary" href={instance.url}>Visit</Button>
                    <Button variant="outlined" color="secondary" href={instance.github} sx={{ ml: 2 }}>GitHub</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" color={darkMode ? "white" : "black"} mt={4} id="testing">Testing Instances</Typography>
        <Grid container spacing={3} mt={2}>
          {filteredTesting.map((instance, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ backgroundColor: darkMode ? "#424242" : "white", color: darkMode ? "white" : "black", boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6">{instance.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{instance.description}</Typography>
                  <Typography variant="body2">Username: <strong>{instance.username}</strong></Typography>
                  <Typography variant="body2">Password: <strong>{instance.password}</strong></Typography>
                  <Box mt={2}>
                    <Button variant="contained" color="primary" href={instance.url}>Visit</Button>
                    <Button variant="outlined" color="secondary" href={instance.github} sx={{ ml: 2 }}>GitHub</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" color={darkMode ? "white" : "black"} mt={4} id="training">
          User Training Materials & Documentation
        </Typography>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="TOT Technical Content" />
          <Tab label="End User Content" />
        </Tabs>

        <TableContainer component={Paper} sx={{ mt: 2, backgroundColor: darkMode ? "#424242" : "white" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography fontWeight="bold">HIS PRODUCT & VERSION</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">JOB AID DESCRIPTION</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">JOB AID</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">VIDEO</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTrainingMaterials.map((material, index) => (
                <TableRow key={index}>
                  <TableCell>{material.product}</TableCell>
                  <TableCell>{material.description}</TableCell>
                  <TableCell><Button variant="outlined">{material.jobAid}</Button></TableCell>
                  <TableCell><Button variant="contained" color="primary">{material.video}</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
