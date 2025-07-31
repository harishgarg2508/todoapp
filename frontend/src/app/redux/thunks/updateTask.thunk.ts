import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

interface TaskUpdateInput {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

export const updateTask = createAsyncThunk(
  "task/update",
  async (task: TaskUpdateInput, { rejectWithValue }) => {
    try {
      const { id, ...data } = task;
      const response = await axiosInstance.put(`/task/${id}`, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error updating task");
    }
  }
);