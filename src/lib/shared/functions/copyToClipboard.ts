export async function copyToClipboard(content: string) {
    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  }
