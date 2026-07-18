require("dotenv").config();
const express = require("express");
const path = require("path");
const { PROFILS } = require("./profils");
const { prepareOffre } = require("./candidature");
const { searchOffres } = require("./francetravail");
const { RAW } = require("./mock");

const app = express();
const PORT = process.env.PORT || 4059;

// MOCK_MODE=1 (ou absence de clé) → offres simulées, l'appli tourne sans compte FT.
const MOCK =
  process.env.MOCK_MODE === "1" || !process.env.FT_CLIENT_ID;

app.use(express.static(path.join(__dirname, "public")));

// Liste des profils (pour les onglets du front)
app.get("/api/profils", (_req, res) => {
  res.json(
    Object.entries(PROFILS).map(([id, p]) => ({ id, label: p.label }))
  );
});

// Offres préparées pour un profil : /api/offres?profil=direction&commune=69000&distance=20
app.get("/api/offres", async (req, res) => {
  const profil = PROFILS[req.query.profil];
  if (!profil) return res.status(400).json({ error: "Profil inconnu" });

  try {
    let raw;
    if (MOCK) {
      raw = RAW;
    } else {
      raw = await searchOffres({
        motsCles: profil.motsCles,
        codeROME: profil.codeROME || undefined,
        departement: req.query.departement || undefined, // ex : 26, 69, 75
        range: "0-49", // 50 premières offres
      });
    }

    const offres = raw
      .map((r) => prepareOffre(r, profil))
      .sort((a, b) => b.match - a.match);

    res.json({ mode: MOCK ? "demo" : "reel", count: offres.length, offres });
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(
    `Tremplin sur http://localhost:${PORT}  (mode ${MOCK ? "DÉMO simulé" : "RÉEL France Travail"})`
  );
});
