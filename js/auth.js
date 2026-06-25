export const PROFILES = {
  gian:   { name: "Gian",   color: "#F5C518", textColor: "#2d2d2d" },
  jacob:  { name: "Jacob",  color: "#FF6B35", textColor: "#ffffff" },
  eunice: { name: "Eunice", color: "#4A90D9", textColor: "#ffffff" },
  mama:   { name: "Mama",   color: "#4CAF7D", textColor: "#ffffff" },
};

export function setUser(key) {
  sessionStorage.setItem("gub_user", key);
}

export function getUser() {
  return sessionStorage.getItem("gub_user");
}

export function getUserProfile() {
  const key = getUser();
  if (!key) return null;
  return { key, ...PROFILES[key] };
}

export function requireAuth() {
  const user = getUser();
  if (!user) {
    window.location.href = "/index.html";
    return null;
  }
  return getUserProfile();
}
