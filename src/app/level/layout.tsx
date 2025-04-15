'use client'

import React, { useEffect, useState } from 'react';
import { Stack, AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ResourceInventory } from '@/interfaces/Nodes/nodes';

export default function LevelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [resources, setResources] = useState<ResourceInventory>({
    wood: 0,
    stone: 0,
    iron: 0,
    food: 0,
    gold: 0,
    power: 0,
    energy: 0,
    water: 0,
  });

  useEffect(() => {
    const fetchResources = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/');
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('id', session.user.id)
        .single();

      if (userError || !userData) {
        console.error('Error fetching user:', userError);
        return;
      }

      const { data: entityData, error: entityError } = await supabase
        .from('entities')
        .select('resource_inventory')
        .eq('userId', userData.id)
        .single();

      if (entityError || !entityData) {
        console.error('Error fetching entity:', entityError);
        return;
      }

      const { data: resourceData, error: resourceError } = await supabase
        .from('resource_inventory')
        .select('*')
        .eq('id', entityData.resource_inventory)
        .single();

      if (resourceError || !resourceData) {
        console.error('Error fetching resources:', resourceError);
        return;
      }

      setResources({
        wood: resourceData.wood,
        stone: resourceData.stone,
        iron: resourceData.iron,
        food: resourceData.food,
        gold: resourceData.gold,
        power: resourceData.power,
        energy: resourceData.energy,
        water: resourceData.water,
      });
    };

    fetchResources();
  }, [router]);

  return (
    <Stack sx={styles.container}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => router.push('/overworld')}
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Level Resources
          </Typography>
          <Box sx={styles.resourceContainer}>
            {Object.entries(resources).map(([resource, amount]) => (
              <Typography key={resource} variant="body2" sx={{ mx: 1 }}>
                {resource}: {amount}
              </Typography>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={styles.content}>
        {children}
      </Box>
    </Stack>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    p: 3,
  },
  resourceContainer: {
    display: 'flex',
    alignItems: 'center',
  },
};
