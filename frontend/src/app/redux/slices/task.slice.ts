import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTasks } from "../thunks/getTasks.thunk";
import { setTaskCompleted } from "../thunks/setTaskCompleted.thunk";

interface Task {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: "pending" | "completed"; 
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: "",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.error = "An unknown error occurred";
      state.isLoading = false;
    });

    builder.addCase(setTaskCompleted.fulfilled, (state, action) => {
      const taskId = action.payload.id;
      const task = state.tasks.find((t) => t.id === taskId);
      if (task) {
        task.status = "completed";
      }
    });
  },
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
