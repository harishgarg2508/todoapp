import { createSlice } from "@reduxjs/toolkit";
import { searchUsers } from "../thunks/getUsers.thunk";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserSearchState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserSearchState = {
  users: [],
  isLoading: false,
  error: null,
};

const userSearchSlice = createSlice({
  name: "userSearch",
  initialState,
  reducers: {
    clearUsers(state) {
      state.users = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUsers } = userSearchSlice.actions;
export default userSearchSlice.reducer;
