document.addEventListener("DOMContentLoaded", function () {
  const here = window.location;
  const links = document.querySelectorAll(
    // grab links in main content and typical about-card containers
    'main a, .about-links a, .quarto-about a, .about a'
  );

  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    const isMailto = href.startsWith('mailto:');
    const isHttp = href.startsWith('http://') || href.startsWith('https://');
    const isPDF = href.toLowerCase().endsWith('.pdf');

    // Treat as external if absolute URL with different origin
    let isExternal = false;
    try {
      if (isHttp) {
        const u = new URL(href, here.href);
        isExternal = (u.origin !== here.origin);
      }
    } catch (_) { /* ignore parse errors */ }

    // Open in new tab if external, mailto, or pdf (even same-origin PDFs)
    if (isExternal || isMailto || isPDF) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});