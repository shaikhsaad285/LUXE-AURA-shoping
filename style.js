document.addEventListener("DOMContentLoaded", () => {
    
    // --- DOM ELEMENTS ELEMENTS ---
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const closeMenuBtn = document.getElementById("close-menu-btn");
    const sideNavbar = document.getElementById("side-navbar");
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const sideLinks = document.querySelectorAll(".side-link");

    const cartBtn = document.getElementById("cart-btn");
    const wishlistBtn = document.getElementById("wishlist-btn");
    const searchBtn = document.getElementById("search-btn");
    
    const cartCountBadge = document.getElementById("cart-count");
    const wishlistCountBadge = document.getElementById("wishlist-count");
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    const wishlistHeartButtons = document.querySelectorAll(".wishlist-toggle-btn");

    // --- STATE VARIABLES ---
    let cartCount = 0;
    let wishlistCount = 0;

    // ==========================================
    // 1. LEFT SIDE SLIDING NAVBAR LOGIC
    // ==========================================
    const openMobileMenu = () => {
        sideNavbar.classList.add("active");
        sidebarOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // background scroll lock
    };

    const closeMobileMenu = () => {
        sideNavbar.classList.remove("active");
        sidebarOverlay.classList.remove("active");
        document.body.style.overflow = "auto"; // restore scroll
    };

    // Event Listeners for side drawer
    mobileMenuBtn.addEventListener("click", openMobileMenu);
    closeMenuBtn.addEventListener("click", closeMobileMenu);
    sidebarOverlay.addEventListener("click", closeMobileMenu);

    // Close sidebar menu smoothly when clicking any section link inside it
    sideLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMobileMenu();
        });
    });

    // ==========================================
    // 2. ICON INTERACTIONS & INTERACTIVE ALERTS
    // ==========================================
    searchBtn.addEventListener("click", () => {
        const query = prompt("What product are you looking for today?");
        if (query) {
            alert(`Searching catalog for: "${query}"`);
        }
    });

    cartBtn.addEventListener("click", () => {
        alert(`Your shopping bag contains ${cartCount} premium items.`);
    });

    wishlistBtn.addEventListener("click", () => {
        alert(`Your curated wishlist has ${wishlistCount} items.`);
    });

    // ==========================================
    // 3. ADD TO CART & WISHLIST COUNTER LOGIC
    // ==========================================
    
    // Function to handle continuous adding tracking animations
    const triggerBadgeBump = (badgeElement) => {
        badgeElement.classList.add("bump");
        setTimeout(() => {
            badgeElement.classList.remove("bump");
        }, 300);
    };

    // Add to cart click event
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            cartCount++;
            cartCountBadge.textContent = cartCount;
            triggerBadgeBump(cartCountBadge);
            
            // Temporary button state change feedback
            const originalText = button.innerHTML;
            button.innerHTML = `<i class="fa-solid fa-check"></i> Added!`;
            button.style.borderColor = "#d4af37";
            button.style.backgroundColor = "#d4af37";
            button.style.color = "white";

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.borderColor = "";
                button.style.backgroundColor = "";
                button.style.color = "";
            }, 1000);
        });
    });

    // Product Card heart wishlist toggle click event
    wishlistHeartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const icon = button.querySelector("i");
            
            if (icon.classList.contains("fa-regular")) {
                // Add to wishlist
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");
                wishlistCount++;
            } else {
                // Remove from wishlist
                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");
                wishlistCount--;
            }
            
            wishlistCountBadge.textContent = wishlistCount;
            triggerBadgeBump(wishlistCountBadge);
        });
    });
});