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
  const menuItem = targetElement.closest(".menu__item");

  if (!menuItem) return;

  const menuLink = menuItem.querySelector(".menu__link");
  const subMenu = menuItem.querySelector(".submenu");

  const hasSub = subMenu && subMenu.classList.contains("submenu");

  if (hasSub && menuLink.contains(targetElement)) {
    if (window.innerWidth > 893) {
      e.preventDefault(); // Блокуємо тільки клік по заголовку меню
    }
    const wasOpen = menuItem.classList.contains("open-submenu");

    closeAllSubmenus();

    // add class to open submenu
    const nowOpen = !wasOpen;

    menuItem.classList.toggle("open-submenu", nowOpen);

    //aria-expended
    menuLink?.setAttribute("aria-expanded", nowOpen ? "true" : "false");

    return;
  }

  function closeAllSubmenus() {
    document
      .querySelectorAll(".menu__item.open-submenu")
      .forEach((openItem) => {
        openItem.classList.remove("open-submenu");
        const link = openItem.querySelector(".menu__link");
        link?.setAttribute("aria-expanded", "false");
      });
  }
}
