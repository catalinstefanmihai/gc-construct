export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  if (b.website) return res.status(200).json({ ok: true });
  const clean = v => String(v || "").slice(0, 600).trim();
  const nume = clean(b.nume), telefon = clean(b.telefon);
  if (!nume || telefon.replace(/\D/g, "").length < 9) return res.status(400).json({ ok: false });

  const text =
    "Cerere ofertă — gc-construct.eu\n\n" +
    "Nume: " + nume + "\nTelefon: " + telefon +
    "\nContract: " + clean(b.contract) + "\nSuprafață: " + clean(b.suprafata) +
    "\nNiveluri: " + clean(b.niveluri) + "\nFinisaj: " + clean(b.finisaj) +
    "\nEstimare: " + clean(b.estimare) +
    (clean(b.mesaj) ? "\n\nMesaj: " + clean(b.mesaj) : "");

  const phone = process.env.WHATSAPP_PHONE || "40728241379";
  const key = process.env.CALLMEBOT_KEY;
  if (!key) return res.status(500).json({ ok: false, error: "missing key" });

  try {
    const url = "https://api.callmebot.com/whatsapp.php?phone=" + phone +
      "&apikey=" + encodeURIComponent(key) + "&text=" + encodeURIComponent(text);
    const r = await fetch(url);
    if (!r.ok) throw new Error("callmebot " + r.status);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ ok: false });
  }
}
