import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Container,
  Grid,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,InputAdornment,CssBaseline,Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 4,
  },
  submitButton: {
    marginTop: 2
  },
  tableContainer: {
    marginTop: 4,
  },
  iconButton: {
    marginRight: 1,
  },
  imageProfile:{
    width:100,
    height: 100,
    borderRadius:50
  }
}));

const RegisterForm = () => {
  const [formData, setFormData] = useState([
    {
      imageUrl: 'https://www.thestatesman.com/wp-content/uploads/2022/09/03_Merged.jpg',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '123Asdcsdc',
      termsAgreed: false,
      selectField: 'option1',
      radioGroup: 'male'
    },
    {
      imageUrl: 'https://www.hindustantimes.com/ht-img/img/2023/08/18/550x309/ANI-20230818188-0_1692387461623_1692387494432.jpg',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: '456Qwerty',
      termsAgreed: true,
      selectField: 'option2',
      radioGroup: 'female'
    },
    {
      imageUrl: 'https://static.javatpoint.com/top10-technologies/images/top-10-south-indian-actors1.png',
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael@example.com',
      password: '789Zxcvbn',
      termsAgreed: true,
      selectField: 'option3',
      radioGroup: 'male'
    },
    {
      imageUrl: 'https://www.rollingstone.com/wp-content/uploads/2023/07/GettyImages-1245258783.jpeg?w=1581&h=1054&crop=1',
      firstName: 'Emily',
      lastName: 'Brown',
      email: 'emily@example.com',
      password: '321Mnbvcx',
      termsAgreed: false,
      selectField: 'option1',
      radioGroup: 'female'
    },
    {
      imageUrl: 'https://media.timeout.com/images/102094217/image.jpg',
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david@example.com',
      password: '654Poiuyt',
      termsAgreed: true,
      selectField: 'option2',
      radioGroup: 'male'
    }
  ]
  );
  const [editIndex, setEditIndex] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');

  const classes = useStyles();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm();
  const onSubmit = (data) => {
    if (editIndex !== null) {
      const updatedData = [...formData];
      updatedData[editIndex] = data;
      setFormData(updatedData);
      setEditIndex(null);
      toast.success('Data updated successfully');
    } else {
      setFormData((prevData) => [...prevData, data]);
      toast.success('Data added successfully');
    }
    localStorage.setItem('formData', JSON.stringify([...formData, data]));
    reset();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    // Set form field values for editing
    const dataToEdit = formData[index];
    Object.keys(dataToEdit).forEach((fieldName) => {
      setValue(fieldName, dataToEdit[fieldName]);
    });
    toast.info('Editing data...');
  };
  const handleDelete = (index) => {
    setDeleteIndex(index);
    setIsDeleteDialogOpen(true);
  };
  const confirmDelete = () => {
    const updatedData = [...formData];
    updatedData.splice(deleteIndex, 1);
    setFormData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData));
    setIsDeleteDialogOpen(false);
    toast.error('Data deleted successfully');
  };
  const filteredData = formData.filter((data) =>
    data.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <Container maxWidth="" className={classes.container}>
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: 'First name is required' }}
              shouldUnregister
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: 'Last name is required' }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
          <Controller
                name="imageUrl"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Image URL is required',
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:jpg|jpeg|png|gif))$/i,
                    message: 'Invalid image URL format',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Image URL"
                    fullWidth
                    error={!!errors.imageUrl}
                    helperText={errors.imageUrl?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton type="submit">
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&#^()[\]{}<>-_+=/|:;,~]{8,}$/,
                  message:
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type={isPasswordVisible ? 'text' : 'password'}
                  label="Password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                          {isPasswordVisible ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="termsAgreed"
              control={control}
              defaultValue={false}
              rules={{
                required: 'You must agree to the terms and conditions',
              }}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} color="primary" 
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  />}
                  label="I agree to the terms and conditions"
                />
              )}
            />
            {errors.termsAgreed && (
              <p className="error-message">
                {errors.termsAgreed.message}
              </p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="selectField"
              control={control}
              defaultValue=""
              rules={{
                required: 'Please select an option',
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Select an option"
                  fullWidth
                  error={!!errors.selectField}
                >
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                  <MenuItem value="option3">Option 3</MenuItem>
                </Select>
              )}
            />
            {errors.selectField && (
              <p className="error-message">
                {errors.selectField.message}
              </p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="radioGroup"
              control={control}
              defaultValue=""
              rules={{
                required: 'Please select an option',
              }}
              render={({ field }) => (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    {...field}
                    aria-label="gender"
                    error={!!errors.radioGroup}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
            {errors.radioGroup && (
              <p className="error-message">
                {errors.radioGroup.message}
              </p>
            )}
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          // disabled={!isValid}
          className={classes.submitButton}
        >
          Register
        </Button>
      </form>
      <TextField
        label="Search by First Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div className={classes.tableContainer}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>Profile</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Passwod</TableCell>
                <TableCell>Option</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Term Conditions</TableCell>
                <TableCell></TableCell>
                {/* ... Other table headers ... */}
              </TableRow>
            </TableHead>
            <TableBody>
            {filteredData.length === 0 ? ( // Display a placeholder row when no data is available
                <TableRow>
                  <TableCell colSpan={/* Number of columns */}>
                    No data available
                  </TableCell>
                </TableRow>
              ) :(
              filteredData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>
                  <img
                      src={data.imageUrl}
                      alt={`Image of ${data.firstName}`}
                      className={classes.imageProfile}
                    />
                    </TableCell>
                  <TableCell>{data.firstName}</TableCell>
                  <TableCell>{data.lastName}</TableCell>{' '}
                  <TableCell>{data.email}</TableCell>{' '}
                  <TableCell>{data.password}</TableCell>{' '}
                  <TableCell>{data.selectField}</TableCell>
                  <TableCell>{data.radioGroup}</TableCell>
                  <TableCell>
                  {data.termsAgreed ? (
                    <Chip label="Active" color="primary" />
                  ) : (
                    <Chip label="Inactive" color="secondary" />
                  )}
                </TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.iconButton}
                      onClick={() => handleEdit(index)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  {/* ... Other table cells ... */}
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="secondary" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Container>
  );
};

export default RegisterForm;
