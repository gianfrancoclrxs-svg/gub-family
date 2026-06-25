// Date helpers
export function toDateKey(date) {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}

export function todayKey() {
  return toDateKey(new Date());
}

export function tomorrowKey() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toDateKey(d);
}

export function formatDateLong(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export function formatTime(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export function formatPeso(amount) {
  return `₱${parseFloat(amount || 0).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function currentMonthLabel() {
  return new Date().toLocaleDateString("en-PH", { month: "long", year: "numeric" });
}

// Compress image and return base64 string (for Firestore storage)
export async function imageToBase64(file, maxWidth = 1200, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        if (w > maxWidth) { h = Math.round(h * maxWidth / w); w = maxWidth; }
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Show toast notification
export function showToast(message, type = "success") {
  const existing = document.getElementById("gub-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "gub-toast";
  toast.className = `gub-toast gub-toast--${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("gub-toast--visible"), 10);
  setTimeout(() => {
    toast.classList.remove("gub-toast--visible");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Modal helpers
export function openModal(id) {
  document.getElementById(id)?.classList.add("active");
}

export function closeModal(id) {
  document.getElementById(id)?.classList.remove("active");
}