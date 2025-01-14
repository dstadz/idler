import React from 'react'
import { Stack } from "@mui/material";
import SignOutButton from "./SignOutbutton";

const Header = ({ money, user }: { money: number; user: any}) => (
  <Stack flexDirection="row" sx={{ border: '3px solid blue' }}>
    {user && <h1>{user.name}s Dashboard</h1>}
    ${money}
    <SignOutButton />
  </Stack>
)

export default Header
