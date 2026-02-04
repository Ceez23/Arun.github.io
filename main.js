const nameElement = document.querySelector('.main');
const centerContent = document.querySelector('.center-content');

if (nameElement) {
    nameElement.addEventListener('mouseover', () => {
        
        nameElement.style.textShadow = "0 0 20px rgba(255, 255, 255, 0.8)";
        
       
        centerContent.classList.add('eye-open');
    });

    nameElement.addEventListener('mouseout', () => {
        
        nameElement.style.textShadow = "none";
        
        
        centerContent.classList.remove('eye-open');
    });
}