/* ==========================================================================
   E-LIFE Landing Page — Interactive JavaScript
   Brand: Kem đánh răng thuần chay E-LIFE
   Features: Mobile Drawer, Smooth Scroll, Accordion FAQ, Modals, Quick View,
             Form Validation, Toast & Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. MOBILE MENU TOGGLE
     ------------------------------------------------------------------------ */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-nav');

  if (navToggle && mobileMenu) {
    const toggleMenu = () => {
      const isOpen = navToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. NAVBAR SCROLL EFFECT & BACK TO TOP BUTTON
     ------------------------------------------------------------------------ */
  const navbar = document.querySelector('.navbar');
  const btnScrollTop = document.getElementById('btn-scroll-top');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 40);
    }

    if (btnScrollTop) {
      btnScrollTop.classList.toggle('visible', scrollY > 400);
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (btnScrollTop) {
    btnScrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
     3. SMOOTH SCROLLING FOR ANCHOR LINKS
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ------------------------------------------------------------------------
     4. INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
     ------------------------------------------------------------------------ */
  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
  } else {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  }

  /* ------------------------------------------------------------------------
     5. COLLAPSIBLE TOGGLE: Ý NGHĨA LOGO VÀ MÀU SẮC THƯƠNG HIỆU
     ------------------------------------------------------------------------ */
  const btnToggleLogo = document.getElementById('btn-toggle-logo');
  const collapseLogo = document.getElementById('collapse-logo-meaning');

  if (btnToggleLogo && collapseLogo) {
    btnToggleLogo.addEventListener('click', () => {
      const isExpanded = btnToggleLogo.getAttribute('aria-expanded') === 'true';
      const toggleText = btnToggleLogo.querySelector('.toggle-text');
      const toggleArrow = btnToggleLogo.querySelector('.toggle-arrow');

      if (isExpanded) {
        collapseLogo.classList.remove('open');
        btnToggleLogo.setAttribute('aria-expanded', 'false');
        if (toggleText) toggleText.textContent = 'Tìm hiểu thêm';
        if (toggleArrow) toggleArrow.textContent = '▼';
      } else {
        collapseLogo.classList.add('open');
        btnToggleLogo.setAttribute('aria-expanded', 'true');
        if (toggleText) toggleText.textContent = 'Thu gọn';
        if (toggleArrow) toggleArrow.textContent = '▲';
      }
    });
  }

  /* ------------------------------------------------------------------------
     6. FLAVOR PILLS CLICK HANDLER
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.flavor-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const targetId = pill.getAttribute('data-target');
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          // Highlight flash animation
          el.style.outline = '3px solid var(--green)';
          el.style.transition = 'outline 0.3s ease';
          setTimeout(() => {
            el.style.outline = 'none';
          }, 1500);
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     7. FAQ ACCORDION
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAns = otherItem.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isExpanded) {
        item.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ------------------------------------------------------------------------
     8. PRODUCT QUICK VIEW MODAL
     ------------------------------------------------------------------------ */
  const productData = {
    matcha: {
      name: 'E-LIFE Matcha (100g)',
      weight: '100g',
      price: '59.000 đ',
      tag: '100% Thuần chay (Vegan) · Tuýp 100g',
      img: 'assets/matcha.jpg',
      desc: 'Hương matcha trà xanh tinh tế, mang lại cảm giác sạch sâu êm dịu, hỗ trợ thanh lọc khoang miệng tự nhiên và tạo phút giây thư giãn dễ chịu mỗi khi bắt đầu ngày mới.',
      ingredients: 'Hydrated Silica, Xylitol, Glycerin nguồn gốc thực vật, Hương Matcha'
    },
    watermelon: {
      name: 'E-LIFE Dưa Hấu Bạc Hà (100g)',
      weight: '100g',
      price: '49.000 đ',
      tag: '100% Thuần chay (Vegan) · Tuýp 100g',
      img: 'assets/watermelon.jpg',
      desc: 'Sự hòa quyện độc đáo giữa vị dưa hấu ngọt thanh mọng nước và cảm giác the mát tự nhiên của bạc hà. Giúp hơi thở thơm mát dài lâu và thổi bùng năng lượng tỉnh táo.',
      ingredients: 'Hydrated Silica, Xylitol, Glycerin nguồn gốc thực vật, Hương dưa hấu và bạc hà'
    },
    mango: {
      name: 'E-LIFE Xoài Cam (45g)',
      weight: '45g',
      price: '35.000 đ',
      tag: '100% Thuần chay (Vegan) · Tuýp 45g tiện lợi',
      img: 'assets/mango.jpg',
      desc: 'Hương thơm ngọt ngào của xoài chín kết hợp cùng sự tươi mới của cam nhiệt đới. Đem đến trải nghiệm đánh răng vui vẻ, kích thích cảm hứng bắt đầu ngày mới tràn đầy sức sống.',
      ingredients: 'Hydrated Silica, Xylitol, Glycerin nguồn gốc thực vật, Hương xoài và cam'
    }
  };

  const modalProduct = document.getElementById('modal-product');
  const modalPClose = document.getElementById('modal-product-close');
  const modalPBtnClose = document.getElementById('modal-p-btn-close');
  const modalPBtnOrder = document.getElementById('modal-p-btn-order');

  let currentSelectedFlavor = 'E-LIFE Matcha';

  document.querySelectorAll('.open-product-detail').forEach(btn => {
    btn.addEventListener('click', () => {
      const flavorKey = btn.getAttribute('data-flavor');
      const data = productData[flavorKey] || productData.matcha;

      currentSelectedFlavor = data.name;

      document.getElementById('modal-p-name').textContent = data.name;
      document.getElementById('modal-p-flavor').textContent = 'Hương vị: ' + data.name;
      document.getElementById('modal-p-tag').textContent = data.tag;
      document.getElementById('modal-p-img').src = data.img;
      document.getElementById('modal-p-img').alt = data.name;
      document.getElementById('modal-p-desc').textContent = data.desc;

      const priceEl = document.getElementById('modal-p-price');
      if (priceEl) priceEl.textContent = 'Giá niêm yết: ' + data.price;

      const weightEl = document.getElementById('modal-p-weight');
      if (weightEl) weightEl.innerHTML = '• <strong>Quy cách:</strong> ' + data.weight;

      const ingredientsEl = document.getElementById('modal-p-ingredients');
      if (ingredientsEl) ingredientsEl.innerHTML = '• <strong>Thành phần:</strong> ' + data.ingredients;

      modalProduct.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeProductModal = () => {
    if (modalProduct) {
      modalProduct.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalPClose) modalPClose.addEventListener('click', closeProductModal);
  if (modalPBtnClose) modalPBtnClose.addEventListener('click', closeProductModal);

  if (modalProduct) {
    modalProduct.addEventListener('click', (e) => {
      if (e.target === modalProduct) closeProductModal();
    });
  }

  // From product quick view -> order modal
  if (modalPBtnOrder) {
    modalPBtnOrder.addEventListener('click', () => {
      closeProductModal();
      openOrderModal(currentSelectedFlavor);
    });
  }

  /* ------------------------------------------------------------------------
     9. ORDER / PRE-ORDER MODAL
     ------------------------------------------------------------------------ */
  const modalOrder = document.getElementById('modal-order');
  const modalOrderClose = document.getElementById('modal-order-close');
  const orderProductSelect = document.getElementById('order-product');
  const orderFormContainer = document.getElementById('order-form-container');
  const orderSuccessContainer = document.getElementById('order-success-container');
  const btnOrderDone = document.getElementById('btn-order-done');
  const btnNavOrder = document.getElementById('btn-nav-order');

  const openOrderModal = (productName = '') => {
    if (!modalOrder) return;

    if (orderFormContainer) orderFormContainer.style.display = 'block';
    if (orderSuccessContainer) orderSuccessContainer.style.display = 'none';

    if (orderProductSelect && productName) {
      // Find matching option
      for (let i = 0; i < orderProductSelect.options.length; i++) {
        if (orderProductSelect.options[i].value === productName || orderProductSelect.options[i].text.includes(productName)) {
          orderProductSelect.selectedIndex = i;
          break;
        }
      }
    }

    modalOrder.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeOrderModal = () => {
    if (modalOrder) {
      modalOrder.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('.open-order-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.getAttribute('data-product') || '';
      openOrderModal(product);
    });
  });

  if (btnNavOrder) {
    btnNavOrder.addEventListener('click', (e) => {
      e.preventDefault();
      openOrderModal('Bộ 3 E-LIFE');
    });
  }

  if (modalOrderClose) modalOrderClose.addEventListener('click', closeOrderModal);

  if (modalOrder) {
    modalOrder.addEventListener('click', (e) => {
      if (e.target === modalOrder) closeOrderModal();
    });
  }

  if (btnOrderDone) {
    btnOrderDone.addEventListener('click', closeOrderModal);
  }

  // Keyboard ESC to close any modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeOrderModal();
    }
  });

});

/* ------------------------------------------------------------------------
   10. FORM SUBMISSION HANDLERS
   ------------------------------------------------------------------------ */
function handleOrderSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('order-name').value.trim();
  const phone = document.getElementById('order-phone').value.trim();
  const product = document.getElementById('order-product').value;

  if (!name || !phone) {
    alert('Vui lòng nhập họ tên và số điện thoại liên hệ!');
    return;
  }

  // Transition to success state
  const formContainer = document.getElementById('order-form-container');
  const successContainer = document.getElementById('order-success-container');

  if (formContainer && successContainer) {
    formContainer.style.display = 'none';
    successContainer.style.display = 'block';
  }
}

function handleTesterSubmit(event) {
  event.preventDefault();
  const emailInput = document.getElementById('tester-email');
  const successNotice = document.getElementById('tester-success');

  if (emailInput && emailInput.value) {
    emailInput.disabled = true;
    if (successNotice) {
      successNotice.style.display = 'block';
    }
  }
}
