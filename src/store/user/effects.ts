// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { getUser } from './slice';

// export const AuthData = createAsyncThunk('user/Auth', async (payload, thunkApi) => {
//   const { data } = await axios.post('https://8a705e193c725f80.mokky.dev/auth', payload);
//   console.log(data);

//   return data;
// });

// // const navigate = useNavigate();
// //     const {
// //           token,
// //           data: role,
// //         } = data;

// //         if (token && role === 'client') navigate('/cabinet');
// //         if (token && role === 'admin') navigate('/admin');

// // AuthData.fulfilled  - success
// // AuthData.rejected - error
// // AuthData.pending  - asyncThunk выполняется
