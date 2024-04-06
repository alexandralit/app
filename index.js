// const images = ['1', '2', '3', '4'];
// const imgElem = document.querySelector('img');

// function randomValueFromArray(array) {
//   const randomNo = Math.floor(Math.random() * array.length);
//   return array[randomNo];
// }

// setInterval(() => {
//   const randomChoice = randomValueFromArray(images);
//   imgElem.src = `images/${randomChoice}.jpg`;
// }, 2000);

const json = [
  {"case_id":"1111","case_status":"Кнопка 1","case_notes":"Текст 1 Текст 1"},
  {"case_id":"2222","case_status":"Кнопка 2","case_notes":"Текст 2 Текст 2"},
  {"case_id":"666","case_status":"Кнопка 666","case_notes":"Текст 333333333333333333333333333333333333333"}
];

const container = document.querySelector('[data-container]');
  
json.forEach((item) => {
  const button = document.createElement('div');
  button.classList.add('button');

  button.setAttribute('data-case', item.case_id);
  button.innerHTML = item.case_status;

  container.appendChild(button);
});

document.addEventListener('click', (event) => {
  if (event.target.closest('[data-case]')) {
    const id = event.target.closest('[data-case]').dataset.case;
    const content = json.filter((item) => item.case_id == id);

    if (content.length) {
      const text = document.createElement('div');
      text.innerHTML = content[0].case_notes;
      document.body.appendChild(text);
    }

  }
});

if ("launchQueue" in window && "targetURL" in window.LaunchParams.prototype) {
  window.launchQueue.setConsumer(launchParams => {
    if (launchParams.targetURL) {
      const url = new URL(launchParams.targetURL);
      console.log(url);
    }
  });
} else {
  // document.querySelector(".not-supported").hidden = false;
}

// Register service worker to control making site work offline

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => { console.log('Service Worker Registered'); });
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted prompt');
      } else {
        console.log('User dismissed prompt');
      }
      deferredPrompt = null;
    });
  });
});
