const inputUrl = document.getElementById("input-url");
const buttonCreate = document.getElementById("button-create");
const buttonDelete = document.getElementById("button-delete");
const listUrl = document.getElementById("list-url");
const invalidUrl = document.getElementById("invalid-url");

buttonCreate.addEventListener("click", () => {
    const url = inputUrl.value;
    if (isValidUrl(url)) {
        invalidUrl.style.display = "none";
        let shortUrl = generateShortUrl();
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.textContent = shortUrl;
        const clickCount = document.createElement("span");
        clickCount.textContent = "Clicks: 0";
        const buttonEdit = document.createElement("button");
        buttonEdit.id = "button-edit";
        buttonEdit.textContent = "Edit";
        const listItem = document.createElement("li");
        listItem.appendChild(link);
        listItem.appendChild(document.createTextNode(`   ${url} `));
        listItem.appendChild(clickCount);
        listItem.appendChild(buttonEdit);
        listUrl.appendChild(listItem);

        buttonEdit.addEventListener("click", () => {
            const randomString = shortUrl.slice(-5);
            const inputEdit = document.createElement("input");
            inputEdit.type = "text";
            inputEdit.value = randomString;
            listItem.replaceChild(inputEdit, link);
            buttonEdit.textContent = "Save";

            buttonEdit.addEventListener("click", () => {
                const newRandomString = inputEdit.value;
                shortUrl = shortUrl.replace(randomString, newRandomString);
                link.href = url;
                link.textContent = shortUrl;
                listItem.replaceChild(link, inputEdit);
                buttonEdit.textContent = "Edit";
            });
        });

        link.addEventListener("click", () => {
            let count = parseInt(clickCount.textContent.split(": ")[1]);
            count++;
            clickCount.textContent = `Clicks: ${count}`;
        });
    } else {
        invalidUrl.style.display = "block";
    }
});

buttonDelete.addEventListener("click", () => {
    const input = inputUrl.value.trim();
    if (input.length === 0) {
        listUrl.innerHTML = "";
    } else {
        const items = listUrl.getElementsByTagName("li");
        for (let i = items.length - 1; i >= 0; i--) {
            const link = items[i].getElementsByTagName("a")[0];
            if (link.href === input || link.textContent === input) {
                listUrl.removeChild(items[i]);
            }
        }
    }
});

function generateShortUrl() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let shortUrl = "localhost/";
    for (let i = 0; i < 5; i++) {
        shortUrl += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return shortUrl;
}

function isValidUrl(url) {
    return !!/^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%:#&=]*)?$/.test(url);
}