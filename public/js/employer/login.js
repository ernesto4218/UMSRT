document.addEventListener("DOMContentLoaded", () => {
  // --- flash message (from ?created=1 after signup) ---
  const flash = document.getElementById("loginflash");
  const params = new URLSearchParams(window.location.search);
  if (flash && params.get("created") === "1") {
    flash.textContent = "Account created successfully. You can now log in.";
    flash.classList.add(
      "border-emerald-300",
      "bg-emerald-50",
      "text-emerald-700",
    );
    flash.classList.remove("hidden");

    // clean the URL so a refresh doesn't re-show it
    params.delete("created");
    const qs = params.toString();
    window.history.replaceState(
      {},
      "",
      window.location.pathname + (qs ? "?" + qs : ""),
    );
  }

  // --- login submit ---
  const form = document.getElementById("loginform");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const msg = document.getElementById("loginmsg");
    const btn = form.querySelector('button[type="submit"]');

    msg.classList.add("hidden");
    msg.textContent = "";

    const payload = {
      email: document.getElementById("loginemail").value.trim(),
      password: document.getElementById("loginpassword").value,
    };

    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Logging in…";

    try {
      const res = await fetch("/api/employer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        msg.textContent = result.message || "Invalid credentials.";
        msg.classList.remove("hidden");
        return;
      }

      // cookie is set by the server, just navigate
      window.location.href = "/employer/dashboard";
    } catch (err) {
      console.error(err);
      msg.textContent = "Network error. Please try again.";
      msg.classList.remove("hidden");
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
});
