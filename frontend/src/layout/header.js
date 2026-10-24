export function header({ siteName, menu = [] }) {
    const menuHtml = menu
        .map(item => `<a class="header__link" href="${item.link}">${item.label}</a>`)
        .join('');

    return `
        <header class="header">
            <a class="header__logo" href="/">${siteName ?? 'Сайт'}</a>
            <nav class="header__nav">
                ${menuHtml}
            </nav>
        </header>
    `;
}