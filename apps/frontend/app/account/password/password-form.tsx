"use client";

import { useFormState, useFormStatus } from "react-dom";
import { changePassword } from "./actions";

const initialState = { error: null as string | null };

export function PasswordForm() {
  const [state, formAction] = useFormState(changePassword, initialState);
  return (
    <form action={formAction} className="space-y-7">
      <Underlined label="New password">
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          required
          minLength={8}
          placeholder="••••••••"
          className="block w-full border-0 border-b border-hairline bg-transparent px-0 py-2 text-[15px] text-paper placeholder:text-paper-dim/70 transition-colors focus:border-brass focus:outline-none focus:ring-0"
        />
      </Underlined>
      <Underlined label="Confirm new password">
        <input
          type="password"
          name="confirm"
          autoComplete="new-password"
          required
          minLength={8}
          placeholder="••••••••"
          className="block w-full border-0 border-b border-hairline bg-transparent px-0 py-2 text-[15px] text-paper placeholder:text-paper-dim/70 transition-colors focus:border-brass focus:outline-none focus:ring-0"
        />
      </Underlined>

      {state?.error && (
        <div className="border-l-2 border-brass-bright bg-brass-bright/[0.05] px-3 py-2 text-[12px] leading-snug text-brass-bright">
          {state.error}
        </div>
      )}

      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="block w-full border border-brass/40 bg-brass py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-ink transition-colors hover:bg-brass-bright disabled:opacity-60"
    >
      {pending ? "Saving…" : "Set password"}
    </button>
  );
}

function Underlined({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
