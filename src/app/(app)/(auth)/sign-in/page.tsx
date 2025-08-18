import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { trpc } from "@/trpc/server";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await trpc.auth.session();

  if (session.user) {
    redirect("/");
  }

  return <SignInView />;
};

export default SignInPage;
