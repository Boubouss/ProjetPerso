
const form = document.querySelector('.select');
const locate = document.querySelector('.locate');
const btn = document.querySelector('.btn');
const screen = document.querySelector('.screen');


    

function getWeather(lat, lon) {
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=3b654112ffbe95656eb2859213523848`)
    .then(res => 
        res.json()
    )
    .then(res => {
        // console.log(res.current.weather[0].main)
        return res.daily
    })
    .then(res => {
        let arr = []
        res.forEach(elem => {
            arr.push(elem.weather[0].main)
        })
        return arr
    })
    .catch( err => console.log(err))
}


function removeImg() {
    while (!screen.hasChildNode()) {
        return screen.removeChild(newImg)
    }
}

function getLocalisation(town) {
    return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${town}&key=f053de5dfecb4da2a7d86a1421c5fb75`)
        .then(res => {
            return res.json()
        })
        .then(res => {
            return res.results[0].geometry
        })
        .catch(err => console.log(err))
}

function insertImg(img) {
    let newImg = document.createElement('img');
    newImg.setAttribute('src', img);
    newImg.classList.add('image');
    return screen.appendChild(newImg)
}

document.addEventListener('DOMContentLoaded', () => {
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let town = locate.value;
        getLocalisation(town).then(res => {
            let lat = res.lat
            let lng = res.lng
            getWeather(lat, lng).then(res => {
                let tab = []
                res.forEach(elem => {
                    if (elem === 'Clear') {
                        elem = './asset/sun.svg'
                        tab.push(elem)
                    } if (elem === 'Snow') {
                        elem = './asset/snow.svg'
                        tab.push(elem)
                    } if (elem === 'Clouds') {
                        elem = './asset/clouds.svg'
                        tab.push(elem)
                    } if (elem === 'Cloudy') {
                        elem = './asset/cloudy.svg'
                        tab.push(elem)
                    } if (elem === 'Rain' | elem === 'Thunderbolt' | elem === 'Mist' | elem === 'Fog') {
                        elem = './asset/rain.svg'
                        tab.push(elem)
                    }   
                }) 
                return tab
            })
            .then(tab => {
                tab.forEach(elem => {
                    insertImg(elem)
                })
            })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
        
    
})




