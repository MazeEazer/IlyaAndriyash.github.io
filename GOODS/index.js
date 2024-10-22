document.addEventListener("DOMContentLoaded", () => {
  const price = document.querySelector("#price-container")
  const input = document.querySelector("#input-box")
  const optionContainer = document.querySelector("#option-container")
  const propertyContainer = document.querySelector("#property-container")
  const radioButtons = document.querySelectorAll('input[name="service-type"]')
  const btn = document.querySelector(".button")
  let item

  const numberRegex = /^\d+$/	

  btn.addEventListener("click", () => {
    if (input.value.trim() === "") {
      showError("Ошибка: поле не должно быть пустым.")
      return
    }
    if (!numberRegex.test(input.value.trim())) {
      showError("Ошибка: введены неверные данные. Пожалуйста, введите число.")
      return
    }
    calculateCost() // Вызываем расчет стоимости при нажатии кнопки
  })

  // Обработчик изменения типа услуги
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      optionContainer.style.display = "none"
      propertyContainer.style.display = "none"

      if (radio.value === "VideoCard") {
        optionContainer.style.display = "block"
      } else if (radio.value === "Monitor") {
        propertyContainer.style.display = "block"
        // Автоматически выбираем базовую комплектацию
        document.querySelector("#base").checked = true
      }

      // Пересчитываем стоимость при смене типа услуги
      calculateCost()
    })
  })

  // Обработчик изменения значения инпута
  input.addEventListener("input", calculateCost)

  // Обработчик изменения опции видеокарты
  document.querySelector("#options").addEventListener("change", calculateCost)

  // Обработчик изменения чекбоксов для монитора
  document.querySelector("#base").addEventListener("change", (event) => {
    if (!event.target.checked) {
      event.target.checked = true // Запретить снятие выбора
    }
    calculateCost()
  })

  document.querySelector("#hz120").addEventListener("change", calculateCost)
  document.querySelector("#k4").addEventListener("change", calculateCost)
  document.querySelector("#ips").addEventListener("change", calculateCost)

  function calculateCost() {
    const inputValue = parseInt(input.value.trim(), 10)
    if (!numberRegex.test(input.value.trim())) {
      showError("Ошибка: введите количество товаров.")
      return
    }

    let cost = 0

    const selectedServiceType = document.querySelector(
      'input[name="service-type"]:checked'
    ).value

    if (selectedServiceType === "Mouse") {
      cost = 2500
    } else if (selectedServiceType === "VideoCard") {
      const selectedOption = document.querySelector("#options").value
      if (selectedOption === "gaming") {
        cost = 100000
      } else if (selectedOption === "video-editing") {
        cost = 70000
      } else if (selectedOption === "regular") {
        cost = 10000
      }
    } else if (selectedServiceType === "Monitor") {
      if (document.querySelector("#base").checked) {
        cost += 20000
      }
      if (document.querySelector("#hz120").checked) {
        cost += 20000
      }
      if (document.querySelector("#k4").checked) {
        cost += 30000
      }
      if (document.querySelector("#ips").checked) {
        cost += 5000
      }
    }

    const totalCost = inputValue * cost

    showResult(`Cтоимость: ${totalCost} рублей`)
  }

  function showError(message) {
    if (!item) {
      item = document.createElement("div")
      item.classList.add("price__item")
      price.appendChild(item)
    }
    item.textContent = message
  }

  function showResult(message) {
    if (!item) {
      item = document.createElement("div")
      item.classList.add("price__item")
      price.appendChild(item)
    }
    item.textContent = message
  }
})
