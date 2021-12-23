const BREAKPOINT  = 991.98;
const btnToggle   = document.getElementById('btn_drawer_toggle');
const menu        = document.querySelector(btnToggle.getAttribute('data-toggle'));
const links       = document.getElementsByClassName('nav-link');

window.addEventListener('resize', () => {
    adaptToScreen();
});

function adaptToScreen() {
    let width = document.body.clientWidth;

    if (width >= BREAKPOINT) {
        closeDrawer(btnToggle);

        menu.classList.remove('responsive');
        menu.classList.remove('hidden');
    } else {
        if (!menu.classList.contains('responsive')) {
            menu.classList.add('responsive');
            menu.classList.add('hidden');
        }
    }
}

function openDrawer(toggle) {
    if (!toggle.classList.contains('open')) {
        let icon           = toggle.querySelector('i');
        let drawerSelector = toggle.getAttribute('data-toggle');
        let drawer         = document.querySelector(drawerSelector);

        toggle.classList.add('open');
        drawer.classList.remove('hidden');
        drawer.classList.add('slide-lt-rt');
        icon.classList.add('fa-times');
        icon.classList.remove('fa-bars');
    }

}

function closeDrawer(toggle) {
    if (toggle.classList.contains('open')) {
        let icon           = toggle.querySelector('i');
        let drawerSelector = toggle.getAttribute('data-toggle');
        let drawer         = document.querySelector(drawerSelector);

        toggle.classList.remove('open');
        drawer.classList.add('hidden');
        drawer.classList.remove('slide-lt-rt');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

function handleDrawerToggle(e) {
    let toggle = e.currentTarget;

    if (toggle.classList.contains('open')) {
        closeDrawer(toggle);
    } else {
        openDrawer(toggle);
    }
}

function handleLinkClick(e) {
    if (btnToggle.classList.contains('open')) {
        closeDrawer(btnToggle);
    }
}

adaptToScreen();

btnToggle.addEventListener('click', handleDrawerToggle);

for (let link of links) {
    link.addEventListener('click', handleLinkClick);
}