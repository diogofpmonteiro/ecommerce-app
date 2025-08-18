import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { trpc } from "@/trpc/server";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const session = await trpc.auth.session();

  if (session.user) {
    redirect("/");
  }

  return <SignUpView />;
};

export default SignUpPage;
