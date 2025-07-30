import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

export const searchUsers = createAsyncThunk(
  "user/searchUsers",
  async (search: string = "", { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user", {
        params: { search },
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to search users");
    }
  }
);
