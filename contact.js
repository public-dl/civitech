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
  let sending = false;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
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
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const payload = Object.fromEntries(new FormData(form));
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error("Submission failed");
      status.textContent = "お問い合わせを受け付けました。ありがとうございます。";
      form.reset();
    } catch {
      status.textContent = "送信を確認できませんでした。入力内容は保持しています。時間をおいて再度お試しください。";
    } finally {
      clearTimeout(timeout);
      sending = false;
      button.disabled = false;
      form.removeAttribute("aria-busy");
    }
  });
})();
