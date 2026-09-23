import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminPanel from "@/components/AdminPanel";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = "force-dynamic";

export const metadata = { title: "Content admin — Gallant Sports" };

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <section className="min-h-[100svh] bg-chalk px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl">Content admin</h1>
            <p className="mt-2 text-sm text-stone">
              Signed in as {session.name} ({session.email})
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-10">
          <AdminPanel user={session} />
        </div>
      </div>
    </section>
  );
}
