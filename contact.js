(() => {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const status = document.getElementById("contactStatus");
  const button = form.querySelector('button[type="submit"]');
  const key = String(window.CIVITECH_CONTACT?.accessKey || "").trim();
  form.elements.namedItem("access_key").value = key;
  if (!key) {
    button.disabled = true;
    status.textContent = "現在、お問い合わせの送信準備中です。";
  }
  const consent = form.elements.namedItem("consent");
  let sending = false;
  const updateButton = () => {
    button.disabled = !key || sending || !consent.checked;
  };
  consent.addEventListener("change", updateButton);
  updateButton();
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending || !consent.checked || !form.reportValidity()) return;
    if (!key) {
      status.textContent = "現在、お問い合わせの送信準備中です。時間をおいて再度お試しください。";
      return;
    }
    if (form.elements.namedItem("botcheck").checked) return;
    sending = true;
    button.disabled = true;
    form.setAttribute("aria-busy", "true");
    status.textContent = "送信中です…";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const payload = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
        signal: controller.signal
      });
      const responseText = await response.text();
      const contentType = response.headers.get("Content-Type") || "";
      let accepted = false;
      if (contentType.includes("application/json")) {
        accepted = JSON.parse(responseText).success === true;
      } else if (contentType.includes("text/html")) {
        // Standard form submissions can return Web3Forms' success page.
        // An arbitrary HTTP 200 or a challenge page must not count as success.
        const doc = new DOMParser().parseFromString(responseText, "text/html");
        accepted = doc.title.trim() === "Form Submitted Successfully" &&
          doc.querySelector("h1")?.textContent.trim() === "Form submitted successfully!";
      }
      if (!response.ok || !accepted) throw new Error("Submission failed");
      status.textContent = "お問い合わせを受け付けました。ありがとうございます。";
      form.reset();
    } catch {
      status.textContent = "送信を確認できませんでした。入力内容は保持しています。時間をおいて再度お試しください。";
    } finally {
      clearTimeout(timeout);
      sending = false;
      updateButton();
      form.removeAttribute("aria-busy");
    }
  });
})();
