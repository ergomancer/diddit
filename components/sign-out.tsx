import { signOut } from "@/auth";
import { Button } from "@/ui/button";
import { auth } from "@/auth";

export default async function SignOut() {
  const session = await auth();
  return (session && <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/app" });
      }}
    >
      <Button>Log Out</Button>
    </form>
  );
}
