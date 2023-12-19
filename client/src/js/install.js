const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  console.log('beforeinstallprompt fired');
  butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
  console.log('butInstall clicked');
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  promptEvent.prompt();
  const result = await promptEvent.userChoice;
  console.log(`User response to the install prompt: ${result.outcome}`);
  window.deferredPrompt = null;
  butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
  console.log('appinstalled fired', event);
  window.deferredPrompt = null;
});