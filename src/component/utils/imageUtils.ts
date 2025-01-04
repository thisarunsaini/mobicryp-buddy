export const urlPath = (path: string): string => {
  const basePath = document.location.hostname === "localhost" ? "" : ""; // Fallback to an empty string if hostname is not mapped
  return `${basePath}${path}`;
};
