const openFolderButton = document.getElementById('open-folder');
const fileList = document.getElementById('file-list');

// Function to browse and display files
async function browseFiles() {
  try {
    // Request access to the directory
    const directoryHandle = await window.showDirectoryPicker();

    // Clear the current file list
    fileList.innerHTML = '';

    // Loop through files in the directory
    for await (const entry of directoryHandle.values()) {
      const listItem = document.createElement('li');
      if (entry.kind === 'file') {
        listItem.textContent = `📄 ${entry.name}`;
      } else if (entry.kind === 'directory') {
        listItem.textContent = `📁 ${entry.name}`;
      }
      fileList.appendChild(listItem);
    }
  } catch (error) {
    console.error('Error accessing files:', error);
  }
}

// Attach event listener to the button
openFolderButton.addEventListener('click', browseFiles);
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker registered'))
    .catch((error) => console.error('Service Worker registration failed:', error));
}
