export function footer({ siteName, footer }) {
    const year = new Date().getFullYear();
     const footerText = footer ?? '';

    return `
        <footer class="footer">
            © ${year} ${siteName ?? 'Сайт'}. ${footerText}
        </footer>
    `;
}