var signUpForm = document.getElementById('signUpForm');
var signUpContainer = document.getElementById('signUpFormContainer');
var postAppContainer = document.getElementById('postAppContainer');

signUpForm.onsubmit = function(e) {
    e.preventDefault();
    signUpContainer.classList.add('hidden');
    postAppContainer.classList.remove('hidden');
};




var postForm = document.getElementById('postForm');
var postsContainer = document.getElementById('postsContainer');

var editingPostDiv = null;

function createPost(title, message) {
    var postDiv = document.createElement('div');
    postDiv.className = 'card p-3 mb-3 post-card';
    postDiv.innerHTML = `
        <h5>${title}</h5>
        <p>${message}</p>
        <div class="row mt-3">
            <div class="col-6">
                <button class="btn btn-warning w-100 edit-btn">Edit</button>
            </div>
            <div class="col-6">
                <button class="btn btn-danger w-100 delete-btn">Delete</button>
            </div>
        </div>
    `;
    postDiv.querySelector('.edit-btn').onclick = function() {
        document.getElementById('postTitle').value = postDiv.querySelector('h5').innerText;
        document.getElementById('postMessage').value = postDiv.querySelector('p').innerText;
        editingPostDiv = postDiv;
        postForm.querySelector('button[type="submit"]').innerText = 'Update Post';
    };
    postDiv.querySelector('.delete-btn').onclick = function() {
        if(editingPostDiv === postDiv) {
        
            editingPostDiv = null;
            postForm.reset();
            postForm.querySelector('button[type="submit"]').innerText = 'Add Post';
        }
        postsContainer.removeChild(postDiv);
    };

    postsContainer.insertBefore(postDiv, postsContainer.firstChild);
}

postForm.onsubmit = function(e) {
    e.preventDefault();
    var title = document.getElementById('postTitle').value.trim();
    var message = document.getElementById('postMessage').value.trim();

    if (!title || !message) {
        alert('Please fill both Title and Message');
        return;
    }

    if (editingPostDiv) {
        editingPostDiv.querySelector('h5').innerText = title;
        editingPostDiv.querySelector('p').innerText = message;

        editingPostDiv = null;
        postForm.querySelector('button[type="submit"]').innerText = 'Add Post';
    } else {
        createPost(title, message);
    }

    postForm.reset();
};
