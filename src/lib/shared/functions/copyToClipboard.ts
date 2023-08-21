export async function copyToClipboard(content: string) {
    try {
      await navigator.clipboard.writeText(content);
      console.log('Copied to clipboard:', content);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  }