export function generateRandomIP() {
  if (Math.random() > 0.5) {
    // IPv4 style
    return `${rand255()}.${rand255()}.${rand255()}.${rand255()}:25565`;
  } else {
    // Example domain style
    const num = Math.floor(10000 + Math.random() * 90000);
    return `mc-${num}.example.net:25565`;
  }
}

function rand255() {
  return Math.floor(Math.random() * 255) + 1;
}
