const createButton = document.getElementById("button-create");
const deleteButton = document.getElementById("button-delete");
const urlField = document.getElementById("input-url");
const list = document.getElementById("list-url");
const notificationArea = document.getElementById("notification");
let notification = document.getElementById('notification');
function addItem() {
    let url = urlField.value;
    if (!isUrlValid(url)) {
        notification.style.display = 'block';
        return;
    }
    notification.style.display = 'none';

    let listElement = document.createElement('li');
    let linkShort = document.createElement('a');
    let linkOriginal = document.createElement('a');
    let text = document.createTextNode(' - ');
    let shortUrl = generateShortUrl();


    linkOriginal.href = url;
    linkOriginal.textContent = url;
    linkOriginal.target = '_blank';
    linkOriginal.style.textDecoration = 'none';
    linkOriginal.style.fontSize = '1rem';

    linkShort.href = url;
    linkShort.textContent = shortUrl;
    linkShort.target = '_blank';
    linkShort.style.textDecoration = 'none';
    linkShort.style.fontSize = '1.5rem';

    let counter = document.createElement('span');
    let c = 0;
    counter.textContent = ` Clicks: ${c}`;
    linkShort.addEventListener('click', () => {
        counter.textContent = ` Clicks: ${++c}`;
    });

    listElement.appendChild(linkShort);
    listElement.appendChild(text);
    listElement.appendChild(linkOriginal);
    listElement.appendChild(counter);


    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = "editButton";
    let saveButton = document.createElement('button');
    saveButton.textContent = "Save";
    saveButton.className = "saveButton";

    let inputEditedUrl = document.createElement('input');
    inputEditedUrl.className = "inputEditedUrl";
    inputEditedUrl.size = 10;

    editButton.addEventListener('click', () => {
        inputEditedUrl.value = linkShort.textContent.slice(-5);
        linkShort.replaceWith(inputEditedUrl);
        editButton.replaceWith(saveButton);
    });

    saveButton.addEventListener('click', () => {
        linkShort.textContent = 'localhost/' + inputEditedUrl.value;
        saveButton.replaceWith(editButton);
        inputEditedUrl.replaceWith(linkShort);
    });


    listElement.appendChild(editButton);
    list.appendChild(listElement);
}

function generateShortUrl() {
    const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return 'localhost/' + Array.from({length: 5},
        () => charset[Math.floor(Math.random() * charset.length)])
        .join('');
}

function isUrlValid(url) {
    return /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\S*)?$/.test(url);
}

createButton.addEventListener('click', addItem);
urlField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addItem();
    }
});

deleteButton.addEventListener('click', () => {
    let url = urlField.value;
    let listElements = document.querySelectorAll("li");

    if (url === '') {
        list.innerHTML = "";
        return;
    }

    for (let i = 0; i < listElements.length; i++) {
        if (listElements[i].childNodes[2].textContent === url) {
            listElements[i].remove();
        }
    }
})