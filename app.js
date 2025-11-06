
var cardBg;
const signUpForm = document.getElementById('signUpForm');
const signUpContainer = document.getElementById('signUpFormContainer');
const postAppContainer = document.getElementById('postApp');
const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('postsContainer');

let userName = '';
let editingPostDiv = null;

// === Handle Sign Up ===
signUpForm.onsubmit = function (e) {
  e.preventDefault();

  const firstName = document.getElementById('inputFirstName').value.trim();
  const lastName = document.getElementById('inputLastName').value.trim();

  userName = `${firstName} ${lastName}`;
  signUpContainer.classList.add('hidden');
  postAppContainer.classList.remove('hidden');
};




function signIn() {
 Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your account has been created!",
  showConfirmButton: false,
  timer: 1500,
  background: "#d47b9fff", 
  color: "#333"          
});

}
  function selectImg(src){
   cardBg = src;
   //console.log(cardBg);
   var bgImg = document.getElementsByClassName("bgImg");
   for(var i = 0; i<bgImg.length;i++){
    bgImg[i].className = "bgImg"
   }
   event.target.classList.add("selectedImg")
  }

function createPost(title, message) {
  const postDiv = document.createElement('div');
  postDiv.className = 'card mb-3 p-3 shadow-sm post-card';

  const currentTime = new Date().toLocaleTimeString();

  // postDiv.innerHTML = `
  //   <div class="d-flex align-items-center mb-2">
  //     <div>
  //       <strong>${userName}</strong><br>
  //       <small class="text-muted">${currentTime}</small>
  //     </div>
  //   </div>
  //   <h6>${title}</h6>
  //   <p>${message}</p>
  //   <div class="text-end">
  //     <button class="btn btn-sm btn-edit me-2">Edit</button>
  //     <button class="btn btn-sm btn-delete">Delete</button>
  //   </div>
  // `;

  postDiv.innerHTML = `
  <div class="card-body" style="background-image: url('${cardBg}'); background-size: cover; background-position: center;">
    <div class="d-flex align-items-center mb-2">
      <div>
        <strong>${userName}</strong><br>
        <small class="text-muted">${currentTime}</small>
      </div>
    </div>
    <h6>${title}</h6>
    <p>${message}</p>
    <div class="text-end">
      <button class="btn btn-sm btn-edit me-2">Edit</button>
      <button class="btn btn-sm btn-delete">Delete</button>
    </div>
  </div>
`;

  // Edit
  postDiv.querySelector('.btn-edit').onclick = function () {
    document.getElementById('postTitle').value = title;
    document.getElementById('postMessage').value = message;
    editingPostDiv = postDiv;
    postForm.querySelector('button').innerText = 'Update';
  };

  // Delete
  postDiv.querySelector('.btn-delete').onclick = function () {
    postsContainer.removeChild(postDiv);
  };

  postsContainer.insertBefore(postDiv, postsContainer.firstChild);
}

// === Handle Post Form ===
postForm.onsubmit = function (e) {
  e.preventDefault();

  const title = document.getElementById('postTitle').value.trim();
  const message = document.getElementById('postMessage').value.trim();

  if (!title || !message) {
  Swal.fire({
    title: "Enter fields",
    background: "#ff7cf8ff", 
    color: "#000",     
    confirmButtonText: "OK",
  customClass: {
    confirmButton: 'my-confirm-btn', 
  }});
  return;
}

  if (editingPostDiv) {
    editingPostDiv.querySelector('h6').innerText = title;
    editingPostDiv.querySelector('p').innerText = message;
    editingPostDiv = null;
    postForm.querySelector('button').innerText = 'Post';
  } else {
    createPost(title, message);
  }
  postForm.reset();
};