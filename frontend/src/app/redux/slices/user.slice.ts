import { axiosInstance, LoginDataInterface, SignupDataInterface, UserState } from "@/app/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  'loginUser',
  async (data: LoginDataInterface, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', data, {
        withCredentials: true,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);


export const signUpUser = createAsyncThunk(
  'signUpUser',
  async (signupData: SignupDataInterface, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/signup', signupData);
      return response.data;
    } catch (error: any) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data || 'Sign up failed');
    }
  }
);





const initialState: UserState = {
  isLoggedIn: false,
  isLoading: false,
  token: '',
  userId: '',
  name: '',
  email: '',
  error: '',
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = '';
      state.userId = '';
      state.email = '';
      state.token = '';
      state.error = '';
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    
    builder.addCase(loginUser.fulfilled, (state, action) => {

      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = 'An unknown error occurred';
      state.isLoading = false;
    });
    builder.addCase(signUpUser.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.error = 'An unknown error occurred';
      state.isLoading = false;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
