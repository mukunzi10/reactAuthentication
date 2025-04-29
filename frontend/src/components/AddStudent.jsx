import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { TextField, Button, CircularProgress, Snackbar, Alert, Box, Grid, Container, Typography } from '@mui/material';

const AddStudent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/students', data);
      setSnackbarMessage('Student added successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Failed to add student. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className="p-6 bg-white shadow-lg rounded-lg">
        <Typography variant="h4" gutterBottom align="center" className="text-xl font-semibold mb-6">
          Add New Student
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
         <Grid xs={6}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                className="border-2 border-gray-300 p-2 rounded-lg"
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                className="border-2 border-gray-300 p-2 rounded-lg"
                {...register('email', { required: 'Email is required' })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid  xs={12}>
              <TextField
                label="Age"
                type="number"
                fullWidth
                margin="normal"
                className="border-2 border-gray-300 p-2 rounded-lg"
                {...register('age', { required: 'Age is required' })}
                error={!!errors.age}
                helperText={errors.age?.message}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Grade"
                fullWidth
                margin="normal"
                className="border-2 border-gray-300 p-2 rounded-lg"
                {...register('grade', { required: 'Grade is required' })}
                error={!!errors.grade}
                helperText={errors.grade?.message}
              />
            </Grid>
            <Grid  xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
              >
                {loading ? <CircularProgress size={24} /> : 'Add Student'}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default AddStudent;
