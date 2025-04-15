import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

interface SupabaseError {
  message: string;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/overworld');
      }
      onClose();
    } catch (error) {
      setError((error as SupabaseError).message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isSignUp ? 'Sign Up' : 'Sign In'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Button>
          <Button type="submit" variant="contained">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
