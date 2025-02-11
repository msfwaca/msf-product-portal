import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { 
  Container, Grid, Card, CardContent, Typography, Button, TextField, Box, 
  AppBar, Toolbar, IconButton, Link, Tabs, Tab, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, MenuItem, Select 
} from "@mui/material";
import { LightMode, DarkMode, Search } from "@mui/icons-material";
import debounce from "lodash/debounce";

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
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSearchChange = debounce((event) => {
    setSearchTerm(event.target.value);
  }, 300);

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
          <Typography variant="h6" sx={{ flexGrow: 1 }}>{t('title')}</Typography>
          <Link href="#production" color="inherit" underline="none" sx={{ mx: 2 }}>{t('production')}</Link>
          <Link href="#testing" color="inherit" underline="none" sx={{ mx: 2 }}>{t('testing')}</Link>
          <Link href="#training" color="inherit" underline="none" sx={{ mx: 2 }}>{t('training')}</Link>
          <TextField
            variant="outlined"
            placeholder={t('searchPlaceholder')}
            onChange={handleSearchChange}
            sx={{ backgroundColor: "white", borderRadius: 1, marginRight: 2 }}
            InputProps={{ endAdornment: <Search /> }}
          />
          <Select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            sx={{ color: "white", marginRight: 2 }}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="fr">FR</MenuItem>
          </Select>
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

        <Typography variant="h5" color={darkMode ? "white" : "black"} mt={4} id="production" textAlign="center">{t('production')}</Typography>
        <Grid container spacing={3} mt={2}>
          {filteredProduction.map((instance, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ backgroundColor: darkMode ? "#424242" : "white", color: darkMode ? "white" : "black", boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6">{instance.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{instance.description}</Typography>
                  <Box mt={2}>
                    <Button variant="contained" color="primary" href={instance.url}>{t('visit')}</Button>
                    <Button variant="outlined" color="secondary" href={instance.github} sx={{ ml: 2 }}>{t('github')}</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" color={darkMode ? "white" : "black"} mt={4} id="testing" textAlign="center">{t('testing')}</Typography>
        <Grid container spacing={3} mt={2}>
          {filteredTesting.map((instance, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ backgroundColor: darkMode ? "#424242" : "white", color: darkMode ? "white" : "black", boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6">{instance.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{instance.description}</Typography>
                  <Typography variant="body2">{t('username')}: <strong>{instance.username}</strong></Typography>
                  <Typography variant="body2">{t('password')}: <strong>{instance.password}</strong></Typography>
                  <Box mt={2}>
                    <Button variant="contained" color="primary" href={instance.url}>{t('visit')}</Button>
                    <Button variant="outlined" color="secondary" href={instance.github} sx={{ ml: 2 }}>{t('github')}</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" color={darkMode ? "white" : "black"} mt={4} id="training" textAlign="center">
          {t('training')}
        </Typography>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label={t('totContent')} />
          <Tab label={t('endUserContent')} />
        </Tabs>

        <TableContainer component={Paper} sx={{ mt: 2, backgroundColor: darkMode ? "#424242" : "white" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography fontWeight="bold">{t('productVersion')}</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">{t('jobAidDescription')}</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">{t('jobAid')}</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">{t('video')}</Typography></TableCell>
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

      <Box sx={{ backgroundColor: darkMode ? "#424242" : "#1976d2", color: "white", padding: 2, textAlign: "center", marginTop: 4 }}>
        <Typography variant="body2">© 2025 MSF WaCA. All rights reserved.</Typography>
        <Link href="#" color="inherit" underline="none" sx={{ mx: 2 }}>Privacy Policy</Link>
        <Link href="#" color="inherit" underline="none" sx={{ mx: 2 }}>Terms of Service</Link>
        <Link href="#" color="inherit" underline="none" sx={{ mx: 2 }}>Contact Us</Link>
      </Box>
    </Box>
  );
}
