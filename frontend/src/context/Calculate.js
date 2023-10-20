export default function calculate(userLat, userLng, earthquakeLat, earthquakeLng) {
  const earthRadiusKm = 6371; // Radius of the Earth in kilometers

  const dLat = ((earthquakeLat - userLat) * Math.PI) / 180;
  const dLng = ((earthquakeLng - userLng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((userLat * Math.PI) / 180) *
      Math.cos((earthquakeLat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}
