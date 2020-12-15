console.log('JavaScript file loaded')


const form = document.querySelector('form')
const search = document.querySelector('input')
const error = document.querySelector('p#error')
const success = document.querySelector('p#info')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const url = "http://localhost:3000/weather?address=" + encodeURIComponent(location)

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){            
                error.textContent = data.error
                console.log(data.error)
            } else {
                success.textContent = JSON.stringify(data)
                console.log(data)
            }
        })
    })
})