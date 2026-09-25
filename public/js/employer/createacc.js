document
  .getElementById("createacctform")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.getElementById("createaccmsg");
    const btn = e.target.querySelector('button[type="submit"]');

    const pw = document.getElementById("createpassword").value;
    const cpw = document.getElementById("createconfirmpassword").value;

    // reset state
    msg.classList.add("hidden");
    msg.classList.remove("text-red-400", "text-emerald-600");

    if (pw !== cpw) {
      msg.textContent = "Passwords do not match.";
      msg.classList.add("text-red-400");
      msg.classList.remove("hidden");
      return;
    }

    const payload = {
      company: document.getElementById("createcompany").value,
      email: document.getElementById("createemail").value,
      password: pw,
    };

    // disable button while submitting
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Creating account…";

    try {
      const res = await fetch("/api/employer/createacc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        msg.textContent = result.message || "Something went wrong.";
        msg.classList.add("text-red-400");
        msg.classList.remove("hidden");
        return;
      }

      // success
      msg.textContent = "Account created successfully! Redirecting to login…";
      msg.classList.add("text-emerald-600");
      msg.classList.remove("hidden");

      // clear password fields so nothing lingers
      document.getElementById("createpassword").value = "";
      document.getElementById("createconfirmpassword").value = "";

      setTimeout(() => {
        window.location.href = "/employer/login";
      }, 1500);
    } catch (err) {
      console.error(err);
      msg.textContent = "Network error. Please try again.";
      msg.classList.add("text-red-400");
      msg.classList.remove("hidden");
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
