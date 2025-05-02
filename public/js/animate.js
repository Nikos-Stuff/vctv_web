document.addEventListener('DOMContentLoaded', () => {
  function animate() {
    const animateElements = document.querySelectorAll('.animate');

    animateElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('show');
      }, index * 950); // 150
    });
  }

  animate();
});