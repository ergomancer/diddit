import { signOut, auth } from "@/auth";
import { Button } from "@/ui/button";

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
        <Button>Log Out</Button>
      </form>
    )
  );
}
