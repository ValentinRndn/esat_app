export default defineNuxtPlugin(() => {
  if (process.client) {
    // Intercepter et ignorer les erreurs React des scripts publicitaires
    window.addEventListener('error', (event) => {
      const errorMessage = event.message || '';
      const source = event.filename || '';
      
      // Ignorer les erreurs React des scripts publicitaires
      if (
        errorMessage.includes('Minified React error') ||
        source.includes('ads.') ||
        source.includes('gtag') ||
        source.includes('google') ||
        errorMessage.includes('React')
      ) {
        console.warn('Script publicitaire bloqué:', errorMessage);
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
      
      // Ignorer les erreurs SVG mineures
      if (errorMessage.includes('attribute d: Expected')) {
        console.warn('Erreur SVG ignorée:', errorMessage);
        event.preventDefault();
        return false;
      }
    });

    // Intercepter les erreurs non gérées dans les promesses
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason || '';
      
      if (
        String(reason).includes('React') ||
        String(reason).includes('ads.') ||
        String(reason).includes('gtag')
      ) {
        console.warn('Promesse rejetée par script publicitaire bloquée:', reason);
        event.preventDefault();
        return false;
      }
    });

    // Bloquer les scripts publicitaires courants
    const originalCreateElement = document.createElement;
    (document as any).createElement = function(tagName: string) {
      const element = originalCreateElement.call(document, tagName);
      
      if (tagName.toLowerCase() === 'script') {
        const originalSetAttribute = element.setAttribute;
        element.setAttribute = function(name: string, value: string) {
          if (name === 'src' && (
            value.includes('doubleclick') ||
            value.includes('googlesyndication') ||
            value.includes('googletagmanager') ||
            value.includes('facebook.net') ||
            value.includes('ads.')
          )) {
            console.warn('Script publicitaire bloqué:', value);
            return;
          }
          return originalSetAttribute.call(element, name, value);
        };
      }
      
      return element;
    };
  }
}); 