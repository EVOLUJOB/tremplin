// Client API France Travail — Offres d'emploi v2
// Auth OAuth2 client_credentials + recherche d'offres.
// URLs/scope confirmés au 07/2026 ; à revérifier sur le tableau de bord
// de VOTRE application sur francetravail.io (le scope exact y est affiché).

const TOKEN_URL =
  "https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=/partenaire";
const SEARCH_URL =
  "https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search";

let cachedToken = null;
let tokenExpiresAt = 0;

async function getToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt - 30_000) return cachedToken;

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.FT_CLIENT_ID,
    client_secret: process.env.FT_CLIENT_SECRET,
    scope: process.env.FT_SCOPE || "api_offresdemploiv2 o2dsoffre",
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Auth France Travail échouée (${res.status}) : ${txt}`);
  }
  const json = await res.json();
  cachedToken = json.access_token;
  tokenExpiresAt = now + (json.expires_in || 1500) * 1000;
  return cachedToken;
}

// params attendus : { motsCles, commune, distance, codeROME, typeContrat, range }
async function searchOffres(params) {
  const token = await getToken();
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") qs.set(k, v);
  });

  const res = await fetch(`${SEARCH_URL}?${qs.toString()}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  // 204 = aucun résultat ; 206 = résultats partiels (pagination) ; 200 = OK
  if (res.status === 204) return [];
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Recherche offres échouée (${res.status}) : ${txt}`);
  }
  const json = await res.json();
  return json.resultats || [];
}

module.exports = { searchOffres };
