import { signOut, auth } from "@/auth";
import { Button } from "@/ui/button";
import { LogOutIcon } from "lucide-react";

export default async function SignOut() {
  const session = await auth();
  return (
    session && (
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/app" });
        }}
      >
        <Button variant="ghost" size="icon" className="p-3">
          <LogOutIcon className="stroke-4 size-4 lg:size-6 2xl:size-8 stroke-muted-foreground" />
        </Button>
      </form>
    )
  );
}
