"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function changePassword(
  _prev: { error: string | null } | null,
  formData: FormData,
): Promise<{ error: string | null }> {
  const next = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (next.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (next !== confirm) {
    return { error: "Passwords don't match." };
  }
  if (next === "stillwaterpartners#1") {
    return { error: "Pick a new password — the temporary one isn't allowed." };
  }

  const supabase = createClient();
  if (!supabase) {
    return { error: "Auth is not configured. Contact an admin." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You're not signed in." };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: next,
  });
  if (updateError) {
    return { error: updateError.message };
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ must_change_password: false })
    .eq("id", user.id);
  if (profileError) {
    return { error: profileError.message };
  }

  redirect("/");
}
