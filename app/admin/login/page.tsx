import Link from "next/link";
import { redirect } from "next/navigation";
import { login } from "./actions";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!isSupabaseConfigured()) redirect("/admin");

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/admin");

  const { error } = await searchParams;

  return (
    <section className="admin-shell">
      <div className="container" style={{ maxWidth: 560 }}>
        <div className="admin-panel">
          <div className="eyebrow">EPYAL Content Manager</div>
          <h1 style={{ marginBottom: 8 }}>Admin Login</h1>
          <p style={{ color: "var(--muted)" }}>Authorized league editors can manage registration status and homepage messaging here.</p>
          {error ? <div className="info-banner">The email or password was not accepted.</div> : null}
          <form action={login} style={{ display: "grid", gap: 12, marginTop: 22 }}>
            <label>
              <span style={{ display: "block", fontSize: ".72rem", fontWeight: 800, marginBottom: 5 }}>Email</span>
              <input name="email" type="email" required autoComplete="email" style={{ width: "100%", height: 46, border: "1px solid var(--line)", borderRadius: 8, padding: "0 12px" }} />
            </label>
            <label>
              <span style={{ display: "block", fontSize: ".72rem", fontWeight: 800, marginBottom: 5 }}>Password</span>
              <input name="password" type="password" required autoComplete="current-password" style={{ width: "100%", height: 46, border: "1px solid var(--line)", borderRadius: 8, padding: "0 12px" }} />
            </label>
            <button className="button button-orange" type="submit">Sign In</button>
          </form>
          <div style={{ marginTop: 18 }}><Link className="text-link" href="/">← Return to website</Link></div>
        </div>
      </div>
    </section>
  );
}
