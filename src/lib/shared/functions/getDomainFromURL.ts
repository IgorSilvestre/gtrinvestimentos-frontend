export function getDomainFromURL(url: string) {
  try {
      const urlObj = new URL(url);
      let domain = urlObj.hostname;

      // Remove 'www.' if it exists
      if (domain.startsWith("www.")) {
          domain = domain.substring(4);
      }

      return domain;
  } catch (e) {
      console.error("Invalid URL:", e);
      return null;
  }
}