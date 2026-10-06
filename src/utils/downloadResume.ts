export const downloadResumeDirectly = async () => {
  const fileName = 'Vedant_Sharma_Resume.pdf';
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const fileUrl = `${baseUrl}/${fileName}`;

  try {
    // Fetch the PDF binary data directly
    const response = await fetch(fileUrl, {
      cache: 'no-cache',
      headers: {
        'Accept': 'application/pdf'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch resume: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Clean up
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      window.URL.revokeObjectURL(blobUrl);
    }, 1000);
  } catch (error) {
    console.error('Blob download failed, trying direct link fallback:', error);
    const fallbackLink = document.createElement('a');
    fallbackLink.href = fileUrl;
    fallbackLink.download = fileName;
    fallbackLink.target = '_blank';
    fallbackLink.rel = 'noopener noreferrer';
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    setTimeout(() => {
      if (document.body.contains(fallbackLink)) {
        document.body.removeChild(fallbackLink);
      }
    }, 1000);
  }
};


