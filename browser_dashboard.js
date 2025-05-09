// Display Browser Info
function displayBrowserInfo() {
  const info = `
    <p><strong>Browser Name & Version:</strong> ${navigator.userAgent}</p>
    <p><strong>Platform:</strong> ${navigator.platform}</p>
    <p><strong>Java Enabled:</strong> ${navigator.javaEnabled()}</p>
    <p><strong>Screen Resolution:</strong> ${screen.width} × ${screen.height}</p>
    <p><strong>Available Screen Size:</strong> ${screen.availWidth} × ${screen.availHeight}</p>
    <p><strong>Color Depth:</strong> ${screen.colorDepth} bits</p>
  `;
  document.getElementById('browserInfo').innerHTML = info;
}

// Display Page Info
function displayPageInfo() {
  const info = `
    <p><strong>Current URL:</strong> ${location.href}</p>
    <p><strong>Hostname:</strong> ${location.hostname}</p>
    <p><strong>Page Title:</strong> ${document.title}</p>
  `;
  document.getElementById('pageInfo').innerHTML = info;
}

// Dynamic Background
function updateBackground() {
  const width = window.innerWidth;
  if (width < 600) {
    document.body.style.backgroundColor = 'blue';
  } else if (width < 992) {
    document.body.style.backgroundColor = 'green';
  } else {
    document.body.style.backgroundColor = 'orange';
  }
}

// Add Event Listeners
window.addEventListener('load', () => {
  displayBrowserInfo();
  displayPageInfo();
  updateBackground();

// Change Title
document.getElementById('changeTitleBtn').addEventListener('click', () => {
  const newTitle = prompt("Enter a new page title:");
    if (newTitle) {
      document.title = newTitle;
      displayPageInfo();
    }
});

// Navigation Buttons
document.getElementById('reloadBtn').addEventListener('click', () => location.reload());
document.getElementById('redirectBtn').addEventListener('click', () => location.href = 'https://www.example.com');
document.getElementById('backBtn').addEventListener('click', () => history.back());
document.getElementById('forwardBtn').addEventListener('click', () => history.forward());
});

window.addEventListener('resize', updateBackground);