import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PasswordForm } from "./password-form";

export const metadata = { title: "Set password — Stillwater Partners" };
export const dynamic = "force-dynamic";

export default async function ChangePasswordPage({
  searchParams,
}: {
  searchParams?: { force?: string };
}) {
  const supabase = createClient();
  if (!supabase) redirect("/login");

  const {
    data: { user },
  } = await supabase!.auth.getUser();
  if (!user) redirect("/login");

  const forced = searchParams?.force === "1";

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <div className="mb-7 flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center border border-brass/50">
              <span className="text-[11px] font-medium tracking-[0.1em] text-brass">
                SP
              </span>
            </div>
            <div className="font-serif text-[18px] leading-none tracking-tight text-paper">
              Stillwater Partners
            </div>
          </div>
          <h1 className="font-serif text-[32px] font-medium leading-[1.1] tracking-tight text-paper">
            {forced ? "Set your password" : "Change password"}
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-paper-soft">
            {forced
              ? "You're signed in with a temporary password. Pick a new one before continuing."
              : "Choose a new password for your account."}
          </p>
        </div>

        <PasswordForm />

        <p className="mt-8 text-[13px] text-paper-soft">
          Signed in as{" "}
          <span className="text-paper">{user.email}</span>.
        </p>
      </div>
    </div>
  );
}
