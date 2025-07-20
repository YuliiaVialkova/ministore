window.addEventListener("load", windowLoad);

function windowLoad() {
  document.addEventListener("click", documentActions);
}

function documentActions(e) {
  const targetElement = e.target;

  //open/close burger menu
  if (targetElement.closest(".burger-menu")) {
    const isMobileMenuOpen =
      document.documentElement.classList.toggle("open-menu");

    document
      .querySelectorAll('.header__menu .menu__link[aria-haspopup="true"]')
      .forEach((link) => {
        link.setAttribute("aria-expanded", isMobileMenuOpen ? "true" : "false");
      });
    return;
  }

  //if mobile menu open ignore submenu
  if (document.documentElement.classList.contains("open-menu")) {
    return;
  }
  //click on menu link
  const link = targetElement.closest(".menu__link");
  if (!link) return;

  const subMenu = link.nextElementSibling;
  const hasSub = subMenu && subMenu.classList.contains("submenu");

  if (hasSub) {
    //do not click on the link, just open
    e.preventDefault();
    const wasOpen = link.classList.contains("open-submenu");
    closeAllSubmenus();

    // add class to open submenu
    const nowOpen = !wasOpen;
    link.classList.toggle("open-submenu", nowOpen);

    //aria-expended
    link.setAttribute("aria-expanded", nowOpen ? "true" : "false");
  } else {
    closeAllSubmenus();
  }
}
function closeAllSubmenus() {
  document.querySelectorAll(".menu__link.open-submenu").forEach((openLink) => {
    openLink.classList.remove("open-submenu");
    openLink.setAttribute("aria-expanded", "false");
  });
}
