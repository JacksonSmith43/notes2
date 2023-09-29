document.addEventListener("DOMContentLoaded", function () {

    const button = document.getElementById("add");
    button.addEventListener("click", handleClick);

    const input = document.getElementById("text");
    input.addEventListener("keydown", handleKeyDown);

    function handleClickLIItem(id) {
        return function () {
            const item = document.getElementById(id);
            const list = document.getElementById("list");
            list.removeChild(item);
            const pos = notes.findIndex((note) => note.id === id);
            notes.splice(pos, 1);
        };
    }

    function handleClick() {
        add();
    }


    function handleKeyDown(event) {
        if (event.key === "Enter") {
            add();
        }
    }


    function add() {
        const title = document.getElementById("title");
        const text = document.getElementById("text");

        if (title.value || text.value) {
            const list = document.getElementById("list");
            const note = createNote(title.value, text.value);
            const item = buildLIItem(note);
            list.appendChild(item);
            notes.push(note);

            title.value = "";
            text.focus(); // Goes back to the input field.
        }

    }

    const notes = [
        // { id: "676c9ba771", title: "Title 1", text: "ToDo 1" },
        // { id: "dc191538f", title: "Title 2", text: "ToDo 2" }
    ];

    function buildLIItem(note) {
        const item = document.createElement("li");
        item.id = note.id;

        const article = document.createElement("article");
        const title = document.createElement("header");
        title.textContent = note.title;
        const text = document.createElement("p");
        text.textContentcontent = note.text;

        const controls = document.createElement("div");
        const button = document.createElement("button");
        button.textContent = "Delete";
        button.addEventListener("click", handleClickDelete(note.id));

        controls.appendChild(button);
        article.appendChild(title);
        article.appendChild(text);
        article.appendChild(controls);
        item.appendChild(article);

        return item;
    }

    function createNote(title, text) {
        const id = generateID(title, text);
        return { id, title, text };
    }

    function generateID(title, text, length = 10) {
        return CryptoJS.SHA256(title + text + new Date()) // CryptoJS.SHA256 = Eine eindeutige und schwer rückgängig zu machende Zeichenfolge aus den Eingabedaten (Titel, Text und Datum) zu erstellen. Dieser kryptografische Hash-Wert wird dann zur Identifizierung der Notiz verwendet, da er bei jeder Änderung der Eingabedaten erheblich variieren würde.
            .toString()
            .substring(0, length);
    }

});