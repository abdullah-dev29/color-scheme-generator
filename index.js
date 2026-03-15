document.getElementById("get-color-scheme-btn").addEventListener('click', renderColors)
function renderColors() {
  const data = {
    inputValue: document.getElementById("color-input").value.slice(1),
    selectedMode: document.getElementById("mode-select").value,
    count: 6
  }
  getColorScheme(data.inputValue, data.selectedMode, data.count)
  .then((colorsArray) => {
        document.getElementById('color-display-container').innerHTML = getFeedHtml(colorsArray)
        document.querySelectorAll(".hex-code").forEach(strongEl => { // selects all elements with the class hex-code & Loops through each element in that list.
            strongEl.addEventListener('click', () => { // For each one, we attach a click event.
                navigator.clipboard.writeText(strongEl.textContent) // Copies the text inside the element to the clipboard.
            })
        })
    })
}

function getColorScheme(value, mode, count) {
  return fetch(`https://www.thecolorapi.com/scheme?hex=${value}&mode=${mode}&count=${count}`)
    .then((res) => res.json())
    .then((data) => data.colors)
}

function getFeedHtml(arr) {
    let html = ``
    arr.forEach((item) => {
        html += `
        <div style="background-color:${item.hex.value}">
            <span>HEX: <strong class="hex-code">${item.hex.value}</strong></span>
        </div>
        `
    })
    return html
}
