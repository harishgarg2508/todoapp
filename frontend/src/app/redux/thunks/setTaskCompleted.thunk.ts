import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

export const setTaskCompleted = createAsyncThunk(
  "task/setTaskCompleted",
  async (taskId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`assign/tasks/${taskId}/complete`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

