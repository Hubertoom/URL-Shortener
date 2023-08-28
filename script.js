const createButton = document.getElementById("button-create");
const deleteButton = document.getElementById("button-delete");
const urlField = document.getElementById("input-url");
const list = document.getElementById("list-url");
const notificationArea = document.getElementById("notification");
let notification = document.createElement('p');
function addItem() {
    let url = urlField.value;
    if (!isUrlValid(url)) {
        notification.textContent = 'Please enter a valid url';
        notificationArea.appendChild(notification);
        return;
    }

    notificationArea.textContent = "";
    let listElement = document.createElement('li');
    let linkShort = document.createElement('a');
    let linkOriginal = document.createElement('a');
    let text = document.createTextNode(' - ');
    let shortUrl = generateShortUrl();


    linkOriginal.href = url;
    linkOriginal.textContent = url;
    linkOriginal.target = '_blank';

    linkShort.href = url;
    linkShort.textContent = shortUrl;
    linkShort.target = '_blank';

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