const petalsCount = 50;

for (let i = 0; i < petalsCount; i++) {
  const petal = document.createElement('div');
  petal.classList.add('petal');
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.animationDuration = Math.random() * 2 + 3 + 's';
  petal.style.animationDelay = Math.random() * 5 + 's';
  document.body.appendChild(petal);
}

const style = document.createElement('style');
style.textContent = `
  .petal {
    position: absolute;
    top: -10px;
    width: 20px;
    height: 20px;
    background-color: pink;
    border-radius: 50%;
    opacity: 0.8;
    animation: fall linear infinite;
  }
  
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
    }
  }
`;
document.head.appendChild(style);