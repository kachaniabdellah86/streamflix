document.addEventListener('DOMContentLoaded', function() {
   const filterButtons = document.querySelectorAll('.filter-btn');
        const movieCards = document.querySelectorAll('.movie-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 1. Enlever la classe 'active' de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // 2. Ajouter la classe 'active' au bouton cliqué
                button.classList.add('active');

                // 3. Récupérer la catégorie choisie
                const filterValue = button.getAttribute('data-filter');

                // 4. Parcourir les films et les afficher/cacher
                movieCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    });
  /* =========================================
     1. LOADER
     ========================================= */
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }, 2000);

  /* =========================================
     2. GESTION DE LA RECHERCHE & NOTIFICATIONS
     ========================================= */
  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.querySelector('.search-input');
  const searchWrapper = document.querySelector('.search-wrapper');
  const notificationsBtn = document.querySelector('.notifications-btn');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      // Afficher/Cacher la barre de recherche
      searchWrapper.classList.toggle('active');
      
      if (searchWrapper.classList.contains('active')) {
        searchInput.focus();
        
        // --- DEMANDE UTILISATEUR : SUPPRIMER LA NOTIFICATION ---
        if (notificationsBtn) {
           notificationsBtn.style.display = 'none'; 
           // ou utiliser notificationsBtn.remove(); pour la supprimer du DOM
        }
      }
    });

    // Fonctionnalité de filtre des films
    searchInput.addEventListener('keyup', (e) => {
      const value = e.target.value.toLowerCase();
      const movies = document.querySelectorAll('.movie-card');
      
      movies.forEach(movie => {
        const title = movie.querySelector('.movie-name').textContent.toLowerCase();
        if (title.includes(value)) {
          movie.style.display = "";
        } else {
          movie.style.display = "none";
        }
      });
    });
  }

  /* =========================================
     3. REDIRECTION DES CATÉGORIES
     ========================================= */
  // --- DEMANDE UTILISATEUR : CLIQUER SUR UNE CATÉGORIE ---
  const categoryCards = document.querySelectorAll('.category-card');

  categoryCards.forEach(card => {
    card.style.cursor = "pointer"; // Change le curseur pour montrer que c'est cliquable
    
    card.addEventListener('click', function() {
      // On récupère le titre de la catégorie
      const title = this.querySelector('.category-title').textContent.trim();

      // Logique de redirection selon le titre
      if (title.includes('Action')) {
        window.location.href = 'action.html';
      } else if (title.includes('Comédie')) {
        window.location.href = 'comedie.html';
      } else if (title.includes('Drame')) {
        window.location.href = 'drame.html';
      } else if (title.includes('Science-Fiction')) {
        window.location.href = 'scifi.html';
      } else {
        // Par défaut si le titre n'est pas reconnu
        alert('Page en construction pour : ' + title);
      }
    });
  });

  /* =========================================
     4. HEADER SCROLL & MOBILE MENU
     ========================================= */
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      if (menuToggle) menuToggle.classList.remove('active');
    });
  });

  /* =========================================
     5. SLIDER
     ========================================= */
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;
  
  if (slider && slides.length > 0) {
    function updateSlider() {
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
        });
    }

    // Auto slide
    let slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }, 5000);

    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }, 5000);
        });
    }
  }

  /* =========================================
     6. EFFETS SUR LES CARTES FILMS
     ========================================= */
  const movieCards = document.querySelectorAll('.movie-card');
  movieCards.forEach(card => {
    card.addEventListener('mouseenter', () => card.style.zIndex = '10');
    card.addEventListener('mouseleave', () => card.style.zIndex = '1');
    
    // Ajout d'une note aléatoire pour la démo
    const rating = card.querySelector('.movie-rating');
    if (rating && !rating.textContent.includes('.')) { 
      const randomRating = (Math.random() * 2 + 6).toFixed(1);
      rating.innerHTML = `<i class="fas fa-star"></i> ${randomRating}`;
    }
  });

  /* =========================================
     7. MENU PROFIL
     ========================================= */
  const profileBtn = document.getElementById('profileBtn');
  const profileMenu = document.getElementById('profileMenu');

  if (profileBtn && profileMenu) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!profileBtn.contains(e.target)) {
        profileMenu.classList.remove('show');
      }
    });
  }

  // Gestion des clics sur les boutons "Regarder", etc.
  function checkLogin(action) {
    if (confirm(`Pour ${action}, vous devez créer un compte ou vous connecter.\n\nSouhaitez-vous être redirigé vers la page d'inscription ?`)) {
      window.location.href = 'contact.html';
    }
    return false;
  }

  // Attacher checkLogin aux boutons pertinents
  const buttonsToProtect = [
      document.getElementById('watch-trailer'),
      document.querySelector('.watch-now-btn'),
      document.querySelector('.add-to-list-btn')
  ];

  buttonsToProtect.forEach(btn => {
      if(btn) {
          btn.addEventListener('click', function(e) {
              e.preventDefault();
              checkLogin('accéder à ce contenu');
          });
      }
  });

});