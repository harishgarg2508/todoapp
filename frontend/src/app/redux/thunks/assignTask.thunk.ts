
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

interface CreateAssignedTaskDto {
  taskId: number;
  userId: number;
}

export const assignTask = createAsyncThunk(
  "task/assignTask",
  async (payload: CreateAssignedTaskDto, { rejectWithValue }) => {
    try {
        console.log(payload)
      const response = await axiosInstance.post("/assign", payload, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to assign task");
    }
  }
);
