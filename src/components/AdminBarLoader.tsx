import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import AdminBar from "./AdminBar";

/**
 * Server component — reads session cookie during SSR.
 * Suspense-wrapped in the root layout so the auth check doesn't block page render.
 * If no session, returns null — zero overhead for non-admins.
 * If session exists, renders AdminBar as a fixed overlay — zero layout shift.
 */
export default async function AdminBarLoader() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {}
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  return <AdminBar />;
}
