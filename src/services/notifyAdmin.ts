export async function notifyAdmin(payload: any) {
  // Add the siteKey here so every request includes it
  const authorizedPayload = {
    ...payload,
    siteKey: "gentlemans-frontend"
  };

  let result;
  try {
    // text/plain keeps this a "simple" request, so the browser skips the CORS
    // preflight that Apps Script can't answer, and can still read the reply
    const response = await fetch(import.meta.env.VITE_NOTIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(authorizedPayload)
    });
    result = await response.json();
  } catch (error) {
    console.error("Notification Service Error:", error);
    throw new Error("Notification failed");
  }

  // The script replies { status: "ok" } or { status: "error", message }
  if (result?.status !== "ok") {
    console.error("Notification rejected:", result);
    throw new Error(result?.message || "Notification failed");
  }

  return result;
}
