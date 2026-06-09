import { AppShell } from "@/components/layout/app-shell";
import { LogoutClient } from "@/components/auth/auth-forms";

export default function LogoutPage() {
  return (
    <AppShell>
      <LogoutClient />
    </AppShell>
  );
}
