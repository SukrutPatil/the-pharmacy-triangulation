let dropArea = document.getElementById('drop-area');
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
  })


let dropAreaImg = document.getElementById('drop-area-img');
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropAreaImg.addEventListener(eventName, preventDefaults, false)
  })
 //********************************************************************************/ 
  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
  });
  ['dragenter', 'dragover'].forEach(eventName => {
    dropAreaImg.addEventListener(eventName, highlightImg, false)
  })
   //********************************************************************************/ 
  ;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
  })
  ;['dragleave', 'drop'].forEach(eventName => {
    dropAreaImg.addEventListener(eventName, unhighlightImg, false)
  })
 //********************************************************************************/ 
  function highlight(e) {
    dropArea.classList.add('highlight')
  }
  function highlightImg(e) {
    dropAreaImg.classList.add('highlight')
  }
   //********************************************************************************/ 
  function unhighlight(e) {
    dropArea.classList.remove('highlight')
  }
  function unhighlightImg(e) {
    dropAreaImg.classList.remove('highlight')
  }
 //********************************************************************************/ 
  dropArea.addEventListener('drop', handleDrop, false)
  dropAreaImg.addEventListener('drop', handleDropImg, false)

//********************************************************************************/ 
function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files
  handleFiles(files)
}
function handleDropImg(e) {
    let dt = e.dataTransfer
    let files = dt.files
    handleFilesImg(files)
  }
//********************************************************************************/ 
function handleFiles(files) {
    files = [...files]
    initializeProgress(files.length) // <- Add this line
    files.forEach(uploadFile)
    files.forEach(previewFile)
  }
  function handleFilesImg(files) {
    files = [...files]
    initializeProgressImg(files.length) // <- Add this line
    files.forEach(uploadFileImg)
    files.forEach(previewFileImg)
  }
//********************************************************************************/ 
  
  function uploadFile(file, i) { // <- Add `i` parameter
  var url = 'YOUR URL HERE'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)

  // Add following event listener
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
  })

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Done. Inform the user
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  })

  formData.append('file', file)
  xhr.send(formData);
}
//************ */

  function uploadFileImg(file, i) { // <- Add `i` parameter
  var url = 'YOUR URL HERE'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)

  // Add following event listener
  xhr.upload.addEventListener("progress", function(e) {
    updateProgressImg(i, (e.loaded * 100.0 / e.total) || 100)
  })

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Done. Inform the user
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  })

  formData.append('file', file)
  xhr.send(formData)
}

//******************************************************************************** */
  function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
      let img = document.createElement('img')
      img.src = reader.result
      document.getElementById('gallery').appendChild(img)
    }
  }
  function previewFileImg(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
      let img = document.createElement('img')
      img.src = reader.result
      document.getElementById('gallery-img').appendChild(img)
    }
  }
  //********************************************************************************** */
  let uploadProgress = []
  let uploadProgressImg = []
  let progressBar = document.getElementById('progress-bar')
  function initializeProgress(numFiles) {
    progressBar.value = 0
    uploadProgress = []
  
    for(let i = numFiles; i > 0; i--) {
      uploadProgress.push(0)
    }
  }
  let progressBarImg = document.getElementById('progress-bar-img')
  function initializeProgressImg(numFiles) {
    progressBar.value = 0
    uploadProgress = []
  
    for(let i = numFiles; i > 0; i--) {
      uploadProgress.push(0)
    }
  }
  //**************************************************************************************************** */
  function updateProgress(fileNumber, percent) {
    uploadProgress[fileNumber] = percent
    let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
    progressBar.value = total
  }
  function updateProgressImg(fileNumber, percent) {
    uploadProgressImg[fileNumber] = percent
    let total = uploadProgressImg.reduce((tot, curr) => tot + curr, 0) / uploadProgressImg.length
    progressBarImg.value = total
  }
  
 
