document.addEventListener("DOMContentLoaded", () => {
    const price = document.querySelector("#price-container");
    const input = document.querySelector("#input-box");
    const good = document.querySelector("#good");
    let item;

    const numberRegex = /^\d+$/; 

    document.querySelector(".button").addEventListener("click", () => {
        const inputValue = input.value.trim(); 

        if (inputValue === "") {
            if (!item) {
                item = document.createElement("div");
                item.classList.add("price__item");
                price.appendChild(item);
            }
            item.textContent = "Ошибка: поле ввода не должно быть пустым.";
        } else if (numberRegex.test(inputValue)) { 
            const cost = +inputValue * +good.value;

            if (!item) {
                item = document.createElement("div");
                item.classList.add("price__item");
                price.appendChild(item);
            }
            item.textContent = `Cтоимость: ${cost} рублей`;
        } else {
            if (!item) {
                item = document.createElement("div");
                item.classList.add("price__item");
                price.appendChild(item);
            }
            item.textContent = "Ошибка: введены неверные данные. Пожалуйста, введите число.";
        }

    });
});
