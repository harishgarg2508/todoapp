import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

interface TaskFilters {
  creatorId?: number;
  assigneeId?: number;
  startTime?: string; 
  endTime?: string;   
  search?: string;
  page?: number;
}

export const getTasks = createAsyncThunk(
  'getTasks',
  async (filters: TaskFilters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      if (filters.creatorId) params.append('creatorId', filters.creatorId.toString());
      if (filters.assigneeId) params.append('assigneeId', filters.assigneeId.toString());
      if (filters.startTime) params.append('startTime', filters.startTime);
      if (filters.endTime) params.append('endTime', filters.endTime);
      if (filters.search) params.append('search', filters.search);
      if (filters.page) params.append('page', filters.page.toString());

      const response = await axiosInstance.get(`/task?${params.toString()}`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch tasks');
    }
  }
);
