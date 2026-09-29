document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       ELEMENTS
    ========================================================== */

    const header = document.getElementById("header");
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const currentYear = document.getElementById("currentYear");

    const revealElements = document.querySelectorAll(".reveal");
    const mobileLinks = mobileMenu
        ? mobileMenu.querySelectorAll("a")
        : [];


    /* =========================================================
       CURRENT YEAR
    ========================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =========================================================
       HEADER SCROLL
    ========================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* =========================================================
       MOBILE MENU
    ========================================================== */

    function openMenu() {

        if (!menuButton || !mobileMenu) {
            return;
        }

        menuButton.classList.add("active");
        mobileMenu.classList.add("active");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("menu-open");

    }


    function closeMenu() {

        if (!menuButton || !mobileMenu) {
            return;
        }

        menuButton.classList.remove("active");
        mobileMenu.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("menu-open");

    }


    function toggleMenu() {

        if (!mobileMenu) {
            return;
        }

        const isOpen =
            mobileMenu.classList.contains("active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            toggleMenu
        );

    }


    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 1050) {
            closeMenu();
        }

    });


    /* =========================================================
       REVEAL ON SCROLL
    ========================================================== */

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =========================================================
       SMOOTH INTERNAL LINKS
    ========================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href =
                link.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target =
                document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top
                + window.scrollY
                - headerHeight
                + 1;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

});