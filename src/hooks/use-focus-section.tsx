export const useFocusSection = () => {
  const focusSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn(`Elemento com id "${sectionId}" não encontrado.`);
    }
  };

  return { focusSection };
};
