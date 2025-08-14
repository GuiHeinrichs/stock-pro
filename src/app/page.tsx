import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "@/app/api/auth/authOptions";
import Dashboard from "./dashboard/page";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  redirect("/dashboard");
  return <Dashboard />;
}
