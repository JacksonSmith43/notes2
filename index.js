document.addEventListener("DOMContentLoaded", function () {

    const button = document.getElementById("add");
    button.addEventListener("click", handleClick);

    const input = document.getElementById("text");
    input.addEventListener("keydown", handleKeyDown);

    function handleClickLIItem(event) {
        const list = document.getElementById("list");
        list.removeChild(event.target);
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
        const input = document.getElementById("text");
        const note = input.value;

        if (note) {
            const list = document.getElementById("list");
            const item = buildLIItem(note);
            list.appendChild(item);
            notes.push(note);

            input.value = "";
            input.focus(); // Goes back to the input field.
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
        text.content = note.text;

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

});