
const gallery = document.querySelector('.galler');
const photoContainer = document.querySelector('.photoContainer');

const nextButton = document.querySelector('.next-button')

const searchButton = document.querySelector('.searchButton');


const inputText = document.querySelector('#search');
const inputSize = document.querySelector('#size-options');
const inputSort = document.querySelector('#sort-options');
const inputNumber = document.querySelector('#number-options');


//let optionSizeValue ;
let optionSizeValue = '';
let sortValue = '';
let imgNumberValue
let textValue = '';
// ---------------------------------------

// fade out- window openes 3s later
// const animationinfo = {

//     targets = '.loader',

//  rotate: '360deg',
//  duration: 3000,
//  easing: fadeOut;
// loop: true
//     }

// const help = anime(helpAnimation);
// const loader = document.querySelector('.loader');
// window.addEventListener(change,function(){

// Animation
// })

inputSize.addEventListener('change', function (e) {
    console.log(e.target.value);
    optionSizeValue = e.target.value;
})

inputSort.addEventListener('change', function (e) {
    console.log(e.target.value);
    sortValue = e.target.value;
})

inputNumber.addEventListener('change', function (e) {
    console.log(e.target.value);
    imgNumberValue = e.target.value;
})

inputText.addEventListener('blur', (e) => {
    textValue = e.target.value;
    console.log(textValue)

})


function fetchGetData() { //4
    if (!textValue || !imgNumberValue || !optionSizeValue || !sortValue) return;
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=604a167b9ae642e16316ac7c47e6cec4&text=${textValue}&sort=${sortValue}&per_page=${imgNumberValue}&format=json&nojsoncallback=1`;

    fetch(url) // 5
        .then(response => {

            if (response.ok) {
                return response.json();
            }

            else { throw new Error('Network response was not ok'); }
        })

        .then((result) => {
            photoContainer.innerHTML = '';
            const photoarr = result.photos.photo;

            photoarr.forEach((result) => {
                console.log(result);
                const img = document.createElement('img');

                img.src = `https://live.staticflickr.com/${result.server}/${result.id}_${result.secret}_${optionSizeValue}.jpg`;

                photoContainer.appendChild(img);

            })
        })

        .catch((error) => {
            console.log(error.name);
            alert("please try it again!")
        })
}

// function clear() {

//     inputText.value = '';
//     inputSize.value = '';
//     inputSort.value ='';
//     inputNumber = '';
//     photoContainer.innerHTML = '';
// }

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    inputText.value = '';
    inputSize.value = '';
    inputSort.value = '';
    inputNumber.value = '';
    photoContainer.innerHTML = '';
    fetchGetData();
});

