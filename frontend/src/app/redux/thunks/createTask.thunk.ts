import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

interface TaskInput {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

export const createTask = createAsyncThunk(
  "task/create",
  async (task: TaskInput, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/task", task); 
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error creating task");
    }
  }
);
