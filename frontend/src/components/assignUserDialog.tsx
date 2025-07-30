import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, List, ListItem, ListItemText, Button, CircularProgress, Stack, } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { searchUsers } from '@/app/redux/thunks/getUsers.thunk';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { assignTask } from '@/app/redux/thunks/assignTask.thunk';
import { toast, Toaster } from 'sonner';

interface AssignUserDialogProps {
  open: boolean;
  onClose: () => void;
  taskId: number;
}

export default function AssignUserDialog({ open, onClose, taskId }: AssignUserDialogProps) {
  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector((state) => state.userSearch);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      dispatch(searchUsers(term));
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    if (open) {
      dispatch(searchUsers(''));
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [dispatch, open, debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleAssign = (userId: number) => {
    dispatch(assignTask({ taskId, userId }))
      .unwrap()
      .finally(() => {
          onClose();
        });
        toast.success('User assigned successfully')
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Assign User to Task</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          margin="dense"
        />
        {isLoading ? (
          <Stack alignItems="center" mt={2}>
            <CircularProgress />
          </Stack>
        ) : (
          <List>
            {users.map((user: any) => (
              <ListItem
                key={user.id}
                secondaryAction={
                  <Button variant="outlined" onClick={() => handleAssign(user.id)}>
                    Assign
                  </Button>
                }
              >
                <ListItemText primary={user.name} secondary={user.email} />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
      <Toaster position="top-right" richColors />
    </Dialog>
  );
}