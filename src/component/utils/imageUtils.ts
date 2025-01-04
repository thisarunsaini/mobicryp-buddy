export const urlPath = (path: string): string => {
  const basePath =
    document.location.hostname === "localhost" ? "mobicryp-buddy/" : ""; // Fallback to an empty string if hostname is not mapped
  return `${basePath}${path}`;
};
