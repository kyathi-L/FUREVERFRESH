import React, { useState } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid
} from '@mui/material';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      });

      alert(response.data.message || 'Registered successfully');

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("❌ Registration Error:", error);
      const errMsg = error?.response?.data?.message || "Something went wrong!";
      alert(errMsg);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="md" sx={{ py: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            {/* Left side with image - Only show on medium screens and up */}
            <Box
              sx={{
                flex: '0 0 40%',
                background: 'linear-gradient(135deg, #81c784 0%, #388e3c 100%)',
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                color: 'white',
              }}
            >
              <Box textAlign="center">
                <PetsIcon sx={{ fontSize: 80, mb: 2 }} />
                <Typography variant="h4" fontWeight="bold" mb={2}>
                  Paw Care
                </Typography>
                <Typography variant="body1">
                  Join our community of pet lovers and access premium pet care services.
                </Typography>
              </Box>
            </Box>

            {/* Right side with form */}
            <Box
              sx={{
                flex: '1 1 60%',
                p: { xs: 3, sm: 4 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Show logo only on small screens */}
              <Box sx={{ 
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'center',
                mb: 2
              }}>
                <PetsIcon sx={{ fontSize: 40, color: '#388e3c' }} />
              </Box>

              <Typography
                variant="h5"
                align="center"
                gutterBottom
                fontWeight="medium"
                sx={{ 
                  color: '#333',
                  mb: 1
                }}
              >
                Create Your Account
              </Typography>

              <Typography
                variant="body2"
                align="center"
                sx={{ 
                  color: '#666',
                  mb: 3
                }}
              >
                Join the Paw Care community today
              </Typography>

              <Grid container spacing={2} component="form" onSubmit={handleSubmit} noValidate>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 1,
                      py: 1,
                      backgroundColor: '#388e3c',
                      '&:hover': {
                        backgroundColor: '#2e7d32',
                      }
                    }}
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item xs={12} textAlign="center">
                  <Button
                    variant="text"
                    onClick={() => window.location.href = '/'}
                    sx={{
                      textTransform: 'none',
                      color: '#555',
                      '&:hover': { color: '#000' }
                    }}
                  >
                    ← Back to Home
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Register;