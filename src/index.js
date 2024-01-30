fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(pups => {
    const dogBar = document.getElementById('dog-bar');
    pups.forEach(pup => {
      const span = document.createElement('span');
      span.textContent = pup.name;
      dogBar.appendChild(span);
    });
  });
  span.addEventListener('click', () => {
    const dogInfo = document.getElementById('dog-info');
    dogInfo.innerHTML = `
      <img src="${pup.image}" />
      <h2>${pup.name}</h2>
      <button>${pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
    `;
  });
  const button = dogInfo.querySelector('button');
button.addEventListener('click', () => {
  const isGoodDog = button.textContent.includes('Good');
  fetch(`http://localhost:3000/pups/${pup.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isGoodDog: !isGoodDog }),
  })
  .then(response => response.json())
  .then(updatedPup => {
    button.textContent = updatedPup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
  });
});
const filterButton = document.getElementById('filter-good-dogs');
filterButton.addEventListener('click', () => {
  const isFilterOn = filterButton.textContent.includes('ON');
  filterButton.textContent = `Filter good dogs: ${isFilterOn ? 'OFF' : 'ON'}`;
  const dogBar = document.getElementById('dog-bar');
  dogBar.innerHTML = ''; // Clear the dog bar
  fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(pups => {
      pups.forEach(pup => {
        if (!isFilterOn || pup.isGoodDog) {
          const span = document.createElement('span');
          span.textContent = pup.name;
          dogBar.appendChild(span);
        }
      });
    });
});