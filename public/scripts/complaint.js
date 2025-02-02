// JavaScript to handle the evidence type selection and file input behavior
document.getElementById('evidenceType').addEventListener('change', function () {
    const fileInput = document.getElementById('evidenceUpload');
    const uploadevidence = document.getElementById('evidenceuploadlabel');
    const selectedType = this.value;

    if (selectedType) {
      // Show the file input
      fileInput.style.display = 'block';

      // Set the accept attribute based on the selected evidence type
      switch (selectedType) {
        case 'image':
          fileInput.setAttribute('accept', '.jpg,.jpeg,.png');
          break;
        case 'audio':
          fileInput.setAttribute('accept', '.mp3');
          break;
        case 'document':
          fileInput.setAttribute('accept', '.pdf');
          break;
        case 'video':
          fileInput.setAttribute('accept', '.mp4');
          break;
        default:
          fileInput.removeAttribute('accept');
          break;
      }
    } else {
      // Hide the file input if no type is selected
        uploadevidence.style.display = 'none';
      fileInput.style.display = 'none';
    }
  });