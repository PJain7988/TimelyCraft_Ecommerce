/* ============================================
   TimelyCraft — Enhanced Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. HAMBURGER MENU TOGGLE
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navOverlay = document.querySelector('.nav-overlay');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
      if (navOverlay) navOverlay.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================
  // 2. SCROLL-TO-TOP BUTTON
  // ==========================================
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 3. STICKY HEADER SCROLL EFFECT
  // ==========================================
  const header = document.querySelector('.sticky-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ==========================================
  // 4. SCROLL REVEAL ANIMATION
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ==========================================
  // 5. ACTIVE NAVIGATION STATE
  // ==========================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu li a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ==========================================
  // 6. ANIMATED COUNTER (Stats Section)
  // ==========================================
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = target.getAttribute('data-count');
          const suffix = target.getAttribute('data-suffix') || '';
          const duration = 2000;
          const startTime = performance.now();
          const endValue = parseInt(finalValue);

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(eased * endValue);
            target.textContent = currentValue.toLocaleString() + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }

          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ==========================================
  // 7. PRODUCT TABS (Product Detail Page)
  // ==========================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabButtons.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');

        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const target = document.getElementById(tabId);
        if (target) target.classList.add('active');
      });
    });
  }

  // ==========================================
  // 8. PAYMENT METHODS (Footer)
  // ==========================================
  const paymentContainer = document.getElementById('paymentMethods');
  const paymentMethods = [
    { name: 'PayPal', image: 'https://img.freepik.com/premium-photo/3d-render-paypal-logo-extruded-frosted-blue-glass-rotating-slowly-neon-blue-outlines-highlighti_1020495-782220.jpg?ga=GA1.1.958911878.1730032087&semt=ais_hybrid&w=740' },
    { name: 'Visa', image: 'https://cdn.prod.website-files.com/63f6e52346a353ca1752970e/644fb7a623a02d3404b61398_20230501T1259-1c3fc3d6-e028-4828-b7e8-8cc193c573b4.jpeg' },
    { name: 'MasterCard', image: 'https://img.freepik.com/premium-vector/debit-card-cartoon-isolated-vector-illustration_77417-2548.jpg?ga=GA1.1.958911878.1730032087&semt=ais_hybrid&w=740' }
  ];

  if (paymentContainer) {
    paymentMethods.forEach(method => {
      const img = document.createElement('img');
      img.src = method.image;
      img.alt = `${method.name} logo`;
      img.classList.add('payment-icon');
      paymentContainer.appendChild(img);
    });
  }

  // ==========================================
  // 9. BEST SELLERS CAROUSEL
  // ==========================================
  const carousel = document.getElementById('bestSellersCarousel');

  const bestSellers = [
    {
      name: "Classic Men's Watch",
      image: [
        'https://img.freepik.com/premium-photo/gorgeous-luxury-wrist-watch-background_1262174-662.jpg?w=740',
        'https://img.freepik.com/free-photo/rehearsal-preparation-groom-s-watch-hand_8353-5810.jpg?t=st=1747035955~exp=1747039555~hmac=d1d627dbd1b3e8d6571b63e9d33cfa9afa0c0be93bb35dfc8b2e8f581ad8ffbd&w=996',
        'https://img.freepik.com/free-photo/watch-black-box-bow-tie-lie-white-windowsill_8353-687.jpg?ga=GA1.1.958911878.1730032087&semt=ais_hybrid&w=740'
      ],
      price: '$99.99'
    },
    {
      name: "Elegant Women's Watch",
      image: [
        'https://img.freepik.com/free-photo/close-up-seller-s-hand-gloves-shows-exclusive-men-s-watch-from-new-collection-luxury-jewelry-store_613910-20420.jpg?t=st=1747036544~exp=1747040144~hmac=4192e27126e458e34614ecaeef9abd381de1bb70798864138a5925ac2cf8cab6&w=996',
        'https://img.freepik.com/premium-photo/isolate-woman-wristwatch_63097-2001.jpg?ga=GA1.1.958911878.1730032087&semt=ais_hybrid&w=740',
        'https://img.freepik.com/premium-photo/girl-jacket-with-clock-wrist-watch-her-hand_722501-185.jpg?ga=GA1.1.958911878.1730032087&semt=ais_hybrid&w=740'
      ],
      price: '$199.99'
    },
    {
      name: 'SmartWatch Pro',
      image: [
        'https://img.freepik.com/free-vector/smart-watch-realistic-image-black_1284-11873.jpg?ga=GA1.1.958911878.1730032087&semt=ais_hybrid&w=740',
        'https://img.freepik.com/free-vector/realistic-fitness-trackers_23-2148530530.jpg?ga=GA1.1.958911878.1730032087&semt=ais_hybrid&w=740',
        'https://img.freepik.com/free-vector/realistic-fitness-tracker-bracelet-illustration-collection_23-2148555261.jpg?ga=GA1.1.958911878.1730032087&semt=ais_hybrid&w=740'
      ],
      price: '$299.99'
    },
    {
      name: 'Luxury Watch',
      image: [
        'https://img.freepik.com/free-photo/elegant-watch-with-silver-golden-chain-isolated_181624-27080.jpg?ga=GA1.1.958911878.1730032087&semt=ais_hybrid&w=740',
        'https://img.freepik.com/free-photo/close-up-seller-s-hands-gloves-shows-exclusive-men-s-watch-from-new-collection-luxury-jewelry-store_613910-20850.jpg?ga=GA1.1.958911878.1730032087&semt=ais_hybrid&w=740',
        'https://img.freepik.com/premium-photo/close-up-illuminated-clock_1048944-30735414.jpg?ga=GA1.1.958911878.1730032087&semt=ais_hybrid&w=740'
      ],
      price: '$499.99'
    },
    {
      name: 'Fashionable Watch',
      image: [
        'https://img.freepik.com/free-photo/close-up-woman-listening-music_23-2148574823.jpg?ga=GA1.1.958911878.1730032087&semt=ais_hybrid&w=740',
        'https://img.freepik.com/premium-photo/stylish-man-gray-jumper-elegant-business-man-s-hand-with-fas_723234-2578.jpg?ga=GA1.1.958911878.1730032087&semt=ais_hybrid&w=740',
        'https://img.freepik.com/free-vector/realistic-watches-set_1284-11684.jpg?ga=GA1.1.958911878.1730032087&semt=ais_hybrid&w=740'
      ],
      price: '$399.99'
    }
  ];

  if (carousel) {
    bestSellers.forEach((product) => {
      const item = document.createElement('div');
      item.classList.add('carousel-item', 'product-card'); // Use product-card styles

      const wrapper = document.createElement('div');
      wrapper.classList.add('product-img-wrapper');

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('carousel-images');

      const imgs = [];
      product.image.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${product.name} image ${i + 1}`;
        img.classList.add(i === 0 ? 'active' : 'hidden');
        imageContainer.appendChild(img);
        imgs.push(img);
      });

      const nav = document.createElement('div');
      nav.classList.add('carousel-nav');
      
      const prevBtn = document.createElement('button');
      prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
      prevBtn.setAttribute('aria-label', 'Previous image');
      const nextBtn = document.createElement('button');
      nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
      nextBtn.setAttribute('aria-label', 'Next image');
      nav.appendChild(prevBtn);
      nav.appendChild(nextBtn);

      let currentIndex = 0;
      const updateImage = (newIndex) => {
        imgs[currentIndex].classList.remove('active');
        imgs[currentIndex].classList.add('hidden');
        currentIndex = (newIndex + imgs.length) % imgs.length;
        imgs[currentIndex].classList.remove('hidden');
        imgs[currentIndex].classList.add('active');
      };

      prevBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); updateImage(currentIndex - 1); });
      nextBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); updateImage(currentIndex + 1); });

      let autoPlay = setInterval(() => updateImage(currentIndex + 1), 3000);
      item.addEventListener('mouseenter', () => clearInterval(autoPlay));
      item.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => updateImage(currentIndex + 1), 3000);
      });

      // Actions overlay
      const actions = document.createElement('div');
      actions.classList.add('product-actions');
      actions.innerHTML = `
        <button class="action-btn" aria-label="Add to Wishlist" onclick="alert('Added to Wishlist')"><i class="far fa-heart"></i></button>
        <a href="product.html" class="action-btn" aria-label="Quick View"><i class="far fa-eye"></i></a>
        <button class="action-btn" aria-label="Add to Cart" onclick="alert('Added to Cart')"><i class="fas fa-cart-plus"></i></button>
      `;

      wrapper.appendChild(imageContainer);
      wrapper.appendChild(nav);
      wrapper.appendChild(actions);

      // Product info
      const info = document.createElement('div');
      info.classList.add('product-info');
      
      const title = document.createElement('h3');
      title.textContent = product.name;
      
      const stars = document.createElement('div');
      stars.classList.add('star-rating');
      stars.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
      
      const price = document.createElement('p');
      price.classList.add('price');
      price.textContent = product.price;

      info.appendChild(title);
      info.appendChild(stars);
      info.appendChild(price);

      item.appendChild(wrapper);
      item.appendChild(info);

      carousel.appendChild(item);
    });
  }

});
