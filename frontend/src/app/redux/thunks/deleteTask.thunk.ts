// deleteTask.thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId: number, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/task/${taskId}`, { withCredentials: true });
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete task");
    }
  }
);
