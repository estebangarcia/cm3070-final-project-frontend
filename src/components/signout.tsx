'use client';

import { Button } from "@/components/ui/button"

export default function SignOutButton() {
    return (
        <Button onClick={ () => {
            window.location.href = '/api/auth/signout'
        }}>
            Sign Out
        </Button>
    );
}
