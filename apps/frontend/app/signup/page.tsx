import Link from "next/link";

export const metadata = { title: "Invitation only — Stillwater Partners" };

export default function SignupPage() {
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
            Invitation only
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-paper-soft">
            New accounts are created by your account manager. If you&apos;re a
            client, please use the personalized invite link sent to you. If you
            already have an account, sign in below.
          </p>
        </div>

        <Link
          href="/login"
          className="block w-full border border-brass/40 bg-brass py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.24em] text-ink transition-colors hover:bg-brass-bright"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
