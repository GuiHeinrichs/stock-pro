import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      {session?.user.email}
    </div>
  );
}
