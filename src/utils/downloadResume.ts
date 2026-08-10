export const downloadResumeDirectly = () => {
  const link = document.createElement('a');
  link.href = '/Vedant_Sharma_Resume.pdf';
  link.download = 'Vedant_Sharma_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

