export function timestampNow() {
  return Math.floor(+new Date() / 1000);
}

export function isTokenExpired(expires: number): boolean {
  return expires ? expires - timestampNow() < 0 : true;
}
