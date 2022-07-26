// Giphy API

//search endpoint
const url = "https://api.giphy.com/v1/gifs/search?api_key=goUgQEQqeYYGEBmKW7QbDqW0PhVQopno&limit=10&q="

document.addEventListener("DOMContentLoaded", getGif)
document.addEventListener("DOMContentLoaded", pasteGif)

function getGif () {
    document.getElementById("btnSearch").addEventListener("click", e => {
        e.preventDefault()
        let searchedGif = document.getElementById("search").value
        let newUrl = `${url}${searchedGif}`
        console.log(newUrl)
        fetch(newUrl)
        .then(response => response.json())
        .then(content => {

            // let elements = document.querySelectorAll("gif-divs")
            // elements.forEach(element => {
            //     element.style.display = "block"
            // })

            for (let i = 0; i < content.data.length; i++) {
                let img = document.getElementById(`gif${i}`)
                img.src = content.data[i].images.downsized.url
                img.alt = content.data[i].title
            }



            // let img = document.querySelector(".gif0")
            // img.src = content.data[0].images.downsized.url
            // img.alt = content.data[0].title

            // let img1 = document.querySelector(".gif1")
            // img1.src = content.data[1].images.downsized.url
            // img1.alt = content.data[1].title

            // let img2 = document.querySelector(".gif2")
            // img2.src = content.data[2].images.downsized.url
            // img2.alt = content.data[2].title

            // let img3 = document.querySelector(".gif3")
            // img3.src = content.data[3].images.downsized.url
            // img3.alt = content.data[3].title

            // let img4 = document.querySelector(".gif4")
            // img4.src = content.data[4].images.downsized.url
            // img4.alt = content.data[4].title

            // let img5 = document.querySelector(".gif5")
            // img5.src = content.data[5].images.downsized.url
            // img5.alt = content.data[5].title

            // let img6 = document.querySelector(".gif6")
            // img6.src = content.data[6].images.downsized.url
            // img6.alt = content.data[6].title

            // let img7 = document.querySelector(".gif7")
            // img7.src = content.data[7].images.downsized.url
            // img7.alt = content.data[7].title

            // let img8 = document.querySelector(".gif8")
            // img8.src = content.data[8].images.downsized.url
            // img8.alt = content.data[8].title

            // let img9 = document.querySelector(".gif9")
            // img9.src = content.data[9].images.downsized.url
            // img9.alt = content.data[9].title

        })
        .catch(err => {
            console.error(err)
        })
    })
}

function pasteGif () {
    let elements = document.querySelectorAll(".gif-size")

    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", e => {
            e.preventDefault()
            let gifImg = document.getElementById("gifAttachment")
            gifImg.src = elements[i].src
            gifImg.alt = elements[i].alt
        })
    }
        
}



