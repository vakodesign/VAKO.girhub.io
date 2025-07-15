const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxContent = document.getElementById('lightboxContent');
const images = document.querySelectorAll('.photo-card img');

let scale = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

function updateTransform() {
  lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

function resetTransform() {
  scale = 1;
  translateX = 0;
  translateY = 0;
  updateTransform();
}

images.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    resetTransform();
    lightbox.style.display = 'flex';
  });
});

lightbox.addEventListener('click', (e) => {
  if (!lightboxContent.contains(e.target)) {
    lightbox.style.display = 'none';
    resetTransform();
  }
});

// Zoom con scroll
lightboxContent.addEventListener('wheel', (e) => {
  e.preventDefault();
  const rect = lightboxImg.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;
  const oldScale = scale;
  scale += e.deltaY * -0.001;
  scale = Math.min(Math.max(1, scale), 4);
  translateX -= (offsetX / oldScale) * (scale - oldScale);
  translateY -= (offsetY / oldScale) * (scale - oldScale);
  updateTransform();
});

// Drag con mouse
lightboxContent.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX - translateX;
  startY = e.clientY - translateY;
  lightbox.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  translateX = e.clientX - startX;
  translateY = e.clientY - startY;
  updateTransform();
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  lightbox.style.cursor = 'grab';
});

// Touch en móvil
lightboxContent.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    isDragging = true;
    startX = e.touches[0].clientX - translateX;
    startY = e.touches[0].clientY - translateY;
  }
});

lightboxContent.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  translateX = e.touches[0].clientX - startX;
  translateY = e.touches[0].clientY - startY;
  updateTransform();
});

lightboxContent.addEventListener('touchend', () => {
  isDragging = false;
});
