"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/app/redux/hooks";
import { createTask } from "@/app/redux/thunks/createTask.thunk";
import { updateTask } from "@/app/redux/thunks/updateTask.thunk";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
   startTime: z
    .string()
    .min(1, "Start time is required")
    .refine(
      (val) => {
        const selected = new Date(val);
        const now = new Date();
        return selected >= now;
      },
      {
        message: "Start time cannot be in the past",
      }
    ),
  endTime: z.string().min(1, "End time is required"),
  })
  .refine(
    (data) => {
      const start = new Date(data.startTime);
      const end = new Date(data.endTime);
      return end >= start;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"], 
    }
  )



type TaskFormType = z.infer<typeof taskSchema>;

interface TaskData {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

interface CreateTaskDialogProps {
  open: boolean;
  onClose: () => void;
  initialData?: TaskData | null;
}

export default function CreateTaskDialog({
  open,
  onClose,
  initialData,
}: CreateTaskDialogProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskFormType>({
    resolver: zodResolver(taskSchema),
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        const formatDateTimeLocal = (isoString: string) => {
          if (!isoString) return "";
          const date = new Date(isoString);
          const timezoneOffset = date.getTimezoneOffset() * 60000;
          const localDate = new Date(date.getTime() - timezoneOffset);
          return localDate.toISOString().slice(0, 16);
        };

        reset({
          title: initialData.title,
          description: initialData.description,
          startTime: formatDateTimeLocal(initialData.startTime),
          endTime: formatDateTimeLocal(initialData.endTime),
        });
      } else {
        reset({ title: "", description: "", startTime: "", endTime: "" });
      }
    }
  }, [initialData, open, reset]);

  const handleCloseDialog = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: TaskFormType) => {
    try {
      if (isEditMode) {
        await dispatch(updateTask({ id: initialData.id, ...data })).unwrap();
        toast.success("Task updated successfully!");
        window.location.reload();


       
      } else {
        await dispatch(createTask(data)).unwrap();
        toast.success("Task created successfully!");
        window.location.reload();

      }
      handleCloseDialog();
      router.refresh();
    } catch (error) {
      const errorMessage = isEditMode
        ? "Failed to update task."
        : "Failed to create task.";
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
      <DialogTitle>{isEditMode ? "Edit Task" : "Create New Task"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2} pt={1}>
            <TextField
              label="Title"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />
            <TextField
              label="Description"
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
            />
            <TextField
              type="datetime-local"
              label="Start Time"
              {...register("startTime")}
              error={!!errors.startTime}
              helperText={errors.startTime?.message}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              type="datetime-local"
              label="End Time"
              {...register("endTime")}
              error={!!errors.endTime}
              helperText={errors.endTime?.message}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
              ? "Update Task"
              : "Create Task"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}