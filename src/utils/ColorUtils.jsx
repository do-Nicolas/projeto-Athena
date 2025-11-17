

export function darkenColor(hex, amount = 30) {
  let col = hex.replace("#", "");

  // Corrige cores no formato "#abc"
  if (col.length === 3) {
    col = col.split("").map(c => c + c).join("");
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) - amount;
  let g = ((num >> 8) & 0x00FF) - amount;
  let b = (num & 0x0000FF) - amount;

  r = Math.max(r, 0);
  g = Math.max(g, 0);
  b = Math.max(b, 0);

  return `rgb(${r}, ${g}, ${b})`;
}
