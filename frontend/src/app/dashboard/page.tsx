"use client";
import Pagination from "@mui/material/Pagination";

import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Stack,
  Card,
  CardContent,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import debounce from "lodash/debounce";
import { getTasks } from "@/app/redux/thunks/getTasks.thunk";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setTaskCompleted } from "../redux/thunks/setTaskCompleted.thunk";
import { toast, Toaster } from "sonner";
import AssignUserDialog from "@/components/assignUserDialog";
import { deleteTask } from "../redux/thunks/deleteTask.thunk";
import CreateTaskDialog from "@/components/createTaskDialog";
import { logout } from "../redux/slices/user.slice";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const dispatch = useAppDispatch();
    const router = useRouter();
  const { tasks, isLoading } = useAppSelector((state) => state.task);
  const { userId } = useAppSelector((state) => state.user);
  const count = tasks.length;
  const totalPages = Math.ceil(count / 10);

  const defaultFilters = {
    search: "",
    startTime: "",
    endTime: "",
    page: 1,
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    dispatch(
      getTasks({
        ...defaultFilters,
        creatorId: taskType === "created" ? Number(userId) : undefined,
        assigneeId: taskType === "assigned" ? Number(userId) : undefined,
      })
    );
  };
  const handleDeleteTask = (taskId: number) => {
    dispatch(deleteTask(taskId))
      .unwrap()
      .then(() => toast.success("Task deleted successfully"))
      .catch(() => toast.error("Failed to delete task"));
  };

  const [taskType, setTaskType] = useState<"created" | "assigned">("created");
  const [filters, setFilters] = useState({
    search: "",
    startTime: "",
    endTime: "",
    page: 1,
  });


    const handleLogout = () => {
        dispatch(logout());
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/login");
        toast.success("Logged out successfully");
    };

  const debouncedDispatch = useCallback(
    debounce((queryFilters) => {
      const combinedFilters = {
        ...queryFilters,
        creatorId: taskType === "created" ? userId : undefined,
        assigneeId: taskType === "assigned" ? userId : undefined,
      };
      dispatch(getTasks(combinedFilters));
    }, 500),
    [dispatch, taskType, userId]
  );

  const handleMarkAsCompleted = (taskId: number) => {
    dispatch(setTaskCompleted(taskId));
    toast.success("Task marked as completed!");
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value, page: 1 };
    setFilters(newFilters);
    debouncedDispatch(newFilters);
  };

  const handlePageChange = (newPage: number) => {
    const updatedFilters = { ...filters, page: newPage };
    setFilters(updatedFilters);
    dispatch(
      getTasks({
        ...updatedFilters,
        creatorId:
          taskType === "created"
            ? userId
              ? Number(userId)
              : undefined
            : undefined,
        assigneeId:
          taskType === "assigned"
            ? userId
              ? Number(userId)
              : undefined
            : undefined,
      })
    );
  };

  const handleTaskTypeChange = (_: any, newType: "created" | "assigned") => {
    if (!newType) return;
    setTaskType(newType);
    const resetFilters = { ...filters, page: 1 };
    setFilters(resetFilters);
    dispatch(
      getTasks({
        ...resetFilters,
        creatorId:
          newType === "created"
            ? userId
              ? Number(userId)
              : undefined
            : undefined,
        assigneeId:
          newType === "assigned"
            ? userId
              ? Number(userId)
              : undefined
            : undefined,
      })
    );
  };

  useEffect(() => {
    if (userId) {
      dispatch(
        getTasks({
          ...filters,
          creatorId: taskType === "created" ? Number(userId) : undefined,
          assigneeId: taskType === "assigned" ? Number(userId) : undefined,
        })
      );
    }
  }, [dispatch, taskType, userId]);

  return (
    <Box p={{ xs: 2, sm: 3, md: 4 }}>
        <Stack direction="row" justifyContent={"space-between"} gap={8}>

      <Typography variant="h4" fontWeight="bold" mb={3}>
        Task Dashboard
        
      </Typography>
      <Stack direction="row" spacing={1}>


      <Button variant="contained" color="warning" onClick={()=>handleLogout()}>Logout</Button>
      <Button variant="contained" onClick={() => setTaskDialogOpen(true)}>
        Create Task
      </Button>
      </Stack>

      <CreateTaskDialog
        open={taskDialogOpen}
        onClose={() => setTaskDialogOpen(false)}
      />

        </Stack>
      {/* Task Type Toggle */}
      <ToggleButtonGroup
        value={taskType}
        exclusive
        onChange={handleTaskTypeChange}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="created">Created Tasks</ToggleButton>
        <ToggleButton value="assigned">Assigned Tasks</ToggleButton>
      </ToggleButtonGroup>

      

      <Card variant="outlined" sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Stack
            spacing={2}
            direction={{ xs: "column", md: "row" }}
            flexWrap="wrap"
          >
            <TextField
              name="search"
              label="Search by Title"
              variant="outlined"
              size="small"
              value={filters.search}
              onChange={handleFilterChange}
              sx={{ minWidth: "200px", flexGrow: 1 }}
            />
            <TextField
              name="startTime"
              label="Start Date"
              type="date"
              size="small"
              value={filters.startTime}
              onChange={handleFilterChange}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: "180px" }}
            />
            <TextField
              name="endTime"
              label="End Date"
              type="date"
              size="small"
              value={filters.endTime}
              onChange={handleFilterChange}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: "180px" }}
            />
          </Stack>
          <Box mt={2}>
            <Button
              onClick={handleClearFilters}
              variant="outlined"
              color="warning"
            >
              Clear Filters
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Task List */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Stack spacing={2}>
            {tasks.length > 0 ? (
              tasks.map((task: any) => (
                <Card key={task.id} variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, mb: 2 }}
                    >
                      {task.description}
                    </Typography>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <Typography>
                        <strong>Start:</strong>{" "}
                        {new Date(task.startTime).toLocaleString()}
                      </Typography>
                      <Typography>
                        <strong>End:</strong>{" "}
                        {new Date(task.endTime).toLocaleString()}
                      </Typography>
                    </Stack>
                    {taskType === "created" ? (
                      <Box mt={2}>
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ mr: 2 }}
                        >
                          Edit Task
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          sx={{ mr: 2 }}
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete Task
                        </Button>
                        <Button onClick={() => setAssignDialogOpen(true)}>
                          Assign Users
                        </Button>
                        <AssignUserDialog
                          open={assignDialogOpen}
                          onClose={() => setAssignDialogOpen(false)}
                          taskId={task.id}
                        />
                      </Box>
                    ) : (
                      <Box mt={2}>
                        <Button
                          variant="contained"
                          color={
                            task.status === "completed" ? "success" : "primary"
                          }
                          disabled={task.status === "completed"}
                          onClick={() => handleMarkAsCompleted(task.id)}
                        >
                          {task.status === "completed"
                            ? "Completed"
                            : "Mark as Completed"}
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography align="center" mt={5} color="text.secondary">
                No tasks found for selected filters.
              </Typography>
            )}
          </Stack>

          {tasks.length > 0 && totalPages > 1 && (
            <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
              <Pagination
                count={totalPages}
                page={filters.page}
                onChange={(_, value) => handlePageChange(value)}
                color="primary"
              />
            </Stack>
          )}
        </>
      )}
      <Toaster position="top-right" richColors />
    </Box>
  );
}
