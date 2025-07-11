import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PermissionsPanel from "./PermissionsPanel";
import { UserRole } from "@/types/UserRole";

export default async function PermissoesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== UserRole.ADMIN) {
    redirect("/403");
  }
  return (
    <main className="py-4 px-4 md:px-10 xl:px-20">
      <PermissionsPanel />
    </main>
  );
}
