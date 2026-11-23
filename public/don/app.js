/* =========================================================
   Orphelinat Espoir du Demain (OED) — Campagne de Don
   Motion Premium (GSAP + ScrollTrigger) & Interactive UX
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------------------------------
     1. Navbar Scroll State & Mobile Menu
  ------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const scrollProgressBar = document.getElementById("scrollProgressBar");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const updateScrollUI = () => {
    const scrollY = window.scrollY;
    if (navbar) {
      navbar.classList.toggle("is-scrolled", scrollY > 24);
    }
    if (scrollProgressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, (scrollY / docHeight) * 100) : 0;
      scrollProgressBar.style.width = `${progress}%`;
    }
  };

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
      });
    });
  }

  /* -------------------------------------------------------
     2. Toast Helper & One-Click Copy
  ------------------------------------------------------- */
  const toastEl = document.getElementById("toast");
  let toastTimer = null;

  const showToast = (message) => {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("is-visible");
    }, 2800);
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy") || "";
      const label = btn.getAttribute("data-label") || "Texte";
      try {
        await copyText(value);
        showToast(`${label} copié : ${value}`);

        if (btn.classList.contains("copy-btn")) {
          const span = btn.querySelector("span");
          const original = span ? span.textContent : "Copier";
          btn.classList.add("is-copied");
          if (span) span.textContent = "Copié ✓";
          setTimeout(() => {
            btn.classList.remove("is-copied");
            if (span) span.textContent = original;
          }, 2000);
        }
      } catch {
        showToast("Impossible de copier automatiquement. Sélectionnez le numéro manuellement.");
      }
    });
  });

  /* -------------------------------------------------------
     3. Interactive Donation Calculator (USD / CDF)
  ------------------------------------------------------- */
  const CDF_RATE = 2850;
  let currentCurrency = "USD";
  let currentUsdAmount = 25;

  const currencyBtns = document.querySelectorAll(".currency-switch__btn");
  const amountBtns = document.querySelectorAll(".amount-btn");
  const customInput = document.getElementById("customAmountInput");
  const currencyPrefix = document.getElementById("currencyPrefix");
  const impactText = document.getElementById("impactText");

  const formatMoney = (amount, currency) => {
    if (currency === "CDF") {
      return `${Math.round(amount).toLocaleString("fr-FR")} FC`;
    }
    return `${Number(amount).toLocaleString("fr-FR")} $`;
  };

  const getImpactDescription = (usdEquivalent, displayStr) => {
    if (usdEquivalent <= 0 || Number.isNaN(usdEquivalent)) {
      return `Saisissez un montant pour voir comment votre geste aide l'Orphelinat Espoir du Demain.`;
    }
    if (usdEquivalent < 15) {
      return `Avec <strong>${displayStr}</strong>, vous posez une première pierre solidaire pour l'achat de la parcelle de l'OED. Chaque geste compte !`;
    }
    if (usdEquivalent < 50) {
      return `Avec <strong>${displayStr}</strong>, vous contribuez directement aux frais d'acquisition de la parcelle et rapprochez les enfants de leur foyer définitif.`;
    }
    if (usdEquivalent < 150) {
      return `Avec <strong>${displayStr}</strong>, vous apportez un soutien majeur pour sécuriser un toit durable afin que ces enfants puissent bien dormir loin de la rue.`;
    }
    return `Avec <strong>${displayStr}</strong>, vous êtes un pilier décisif de la campagne : votre générosité accélère concrètement l'achat officiel de la parcelle de l'OED !`;
  };

  const renderCalculator = (syncInput = true) => {
    const isCDF = currentCurrency === "CDF";
    if (currencyPrefix) {
      currencyPrefix.textContent = isCDF ? "FC" : "$";
    }

    amountBtns.forEach((btn) => {
      const usdVal = Number(btn.getAttribute("data-usd"));
      const displayVal = isCDF ? usdVal * CDF_RATE : usdVal;
      btn.textContent = formatMoney(displayVal, currentCurrency);
      btn.classList.toggle("is-selected", Math.abs(usdVal - currentUsdAmount) < 0.01);
    });

    const displayedAmount = isCDF ? Math.round(currentUsdAmount * CDF_RATE) : currentUsdAmount;
    if (syncInput && customInput) {
      customInput.value = displayedAmount > 0 ? String(displayedAmount) : "";
    }

    if (impactText) {
      impactText.innerHTML = getImpactDescription(
        currentUsdAmount,
        formatMoney(displayedAmount, currentCurrency)
      );
    }
  };

  currencyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentCurrency = btn.getAttribute("data-currency") || "USD";
      currencyBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
      renderCalculator(true);
    });
  });

  amountBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentUsdAmount = Number(btn.getAttribute("data-usd")) || 25;
      renderCalculator(true);
    });
  });

  if (customInput) {
    customInput.addEventListener("input", () => {
      const raw = Number(customInput.value);
      currentUsdAmount = currentCurrency === "CDF" ? raw / CDF_RATE : raw;
      renderCalculator(false);
    });
  }

  renderCalculator(true);

  /* -------------------------------------------------------
     4. FAQ Accordion
  ------------------------------------------------------- */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-item__trigger");
    const content = item.querySelector(".faq-item__content");
    if (!trigger || !content) return;

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Close others for a clean accordion feel
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          const otherTrigger = other.querySelector(".faq-item__trigger");
          const otherContent = other.querySelector(".faq-item__content");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      item.classList.toggle("is-open", !isOpen);
      trigger.setAttribute("aria-expanded", String(!isOpen));
      content.style.maxHeight = !isOpen ? `${content.scrollHeight}px` : null;
    });
  });

  /* -------------------------------------------------------
     5. Thank-You Modal & Campaign Share
  ------------------------------------------------------- */
  const thankYouModal = document.getElementById("thankYouModal");
  const openThankYouBtn = document.getElementById("openThankYouBtn");

  const openModal = () => {
    if (!thankYouModal) return;
    thankYouModal.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!thankYouModal) return;
    thankYouModal.hidden = true;
    document.body.style.overflow = "";
  };

  if (openThankYouBtn) {
    openThankYouBtn.addEventListener("click", openModal);
  }

  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && thankYouModal && !thankYouModal.hidden) {
      closeModal();
    }
  });

  const shareCampaign = async () => {
    const shareText =
      "Campagne de Don — Achat de la parcelle de l'Orphelinat Espoir du Demain (OED) à Kimbanseke. " +
      "Orange Money: +243 895 888 202 | M-PESA: +243 815 079 946. Un geste qui change mon avenir ❤️";

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Campagne de Don — Orphelinat Espoir du Demain (OED)",
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled or fallback below
      }
    }

    try {
      await copyText(shareText);
      showToast("Message de partage copié ! Vous pouvez le coller sur WhatsApp ou Facebook.");
    } catch {
      showToast("Partagez les numéros OED avec vos proches ❤️");
    }
  };

  ["shareCampaignBtn", "shareBannerBtn", "modalShareBtn"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", shareCampaign);
  });

  /* -------------------------------------------------------
     6. Motion Premium: GSAP + ScrollTrigger
  ------------------------------------------------------- */
  const initAnimations = () => {
    if (prefersReducedMotion || typeof window.gsap === "undefined") {
      // Ensure counters display final values immediately when reduced motion is active
      document.querySelectorAll(".counter").forEach((el) => {
        el.textContent = el.getAttribute("data-target") || "0";
      });
      return;
    }

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero entrance stagger
    gsap.from(".hero-anim", {
      y: 28,
      opacity: 0,
      duration: 0.85,
      stagger: 0.1,
      ease: "power3.out",
      clearProps: "transform",
    });

    // Immersive full-bleed Hero portrait subtle Ken Burns & ScrollTrigger parallax
    const heroBgImg = document.getElementById("heroBgImg");
    if (heroBgImg) {
      gsap.fromTo(
        heroBgImg,
        { scale: 1.14 },
        { scale: 1.06, duration: 1.6, ease: "power2.out" }
      );

      if (ScrollTrigger) {
        gsap.to(heroBgImg, {
          yPercent: 14,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }

    // Parallax elements
    if (ScrollTrigger) {
      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const speed = Number(el.getAttribute("data-parallax")) || 0.1;
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Reveal section headers & generic blocks
      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });

      // Staggered card reveals grouped by parent container
      const cardGroups = new Map();
      document.querySelectorAll(".reveal-card").forEach((card) => {
        const parent = card.parentElement;
        if (!cardGroups.has(parent)) cardGroups.set(parent, []);
        cardGroups.get(parent).push(card);
      });

      cardGroups.forEach((cards, parent) => {
        gsap.from(cards, {
          y: 30,
          opacity: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: parent,
            start: "top 86%",
            once: true,
          },
        });
      });

      // Animated counters
      document.querySelectorAll(".counter").forEach((counterEl) => {
        const target = Number(counterEl.getAttribute("data-target")) || 0;
        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: counterEl,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => {
                counterEl.textContent = String(Math.round(obj.val));
              },
            });
          },
        });
      });
    }
  };

  initAnimations();
});
