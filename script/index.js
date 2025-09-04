const createElement = (arr) =>{
    

    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`)
    return(htmlElements.join(' '))
}

const loadLessons =() =>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => displayLesson(json.data));
}
const removeActive = ()=>{
    const lessonButton = document.querySelectorAll('.lesson-btn')
    lessonButton.forEach(button => button.classList.remove('active'))
}
const loadLevelWord =(id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(json => {
        removeActive()
        
        const clickButton = document.getElementById(`lesson-btn-${id}`)
        clickButton.classList.add('active')
        
        displayLevelWord(json.data)

    })

}

const loadWordDetail = (id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    fetch (url)
    .then(res => res.json())
    .then(details => displayWordDetails(details.data))
}

// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5

const displayWordDetails = (word) =>{
    const detailsBox = document.getElementById('details-container')
    detailsBox.innerHTML = `
    <div>
      <h2 class="text-2xl font-bold">${word.word} (  <i class="fa-solid fa-microphone-lines"></i>   :${word.pronunciation}) </h2>
    </div>
    <div>
      <h2 class="text-xl font-bold font-bangla">Meaning</h2>
      <p>${word.meaning}</p>
    </div>
    <div>
      <h2 class="text-xl font-bold font-bangla">Example</h2>
      <p>${word.sentence}</p>
    </div>
    <div>
      <h2 class="text-xl font-bold font-bangla">সমার্থক শব্দ গুলো</h2>
      <div>${createElement(word.synonyms)}</div>
    </div>
    <button class="btn bg-[#422AD5] text-white">Complete Learning</button>
     <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn bg-[#422AD5] text-white">Close</button>
      </form>
    </div>
  </div>
    `;
    document.getElementById('my_modal_5').showModal();
}

const displayLevelWord = (words)=>{
   
const wordContainer = document.getElementById('word-container')
wordContainer.innerHTML = '';
    if(words.length == 0){
       wordContainer.innerHTML = `
       <div class="font-bangla col-span-full text-center bg-sky-100 py-8 rounded-2xl ">
      <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-[13px] text-[#79716B] my-5">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-[#292524] text-3xl font-medium">নেক্সট Lesson এ যান</h2>
      </div>
       ` 
    }

    words.forEach(word => {
        
        const cardDiv = document.createElement('div')

        cardDiv.innerHTML = `
        <div class="bg-white text-center rounded-xl p-10 shadow-sm">
            <h2 class="text-3xl font-bold">${word.word ? word.word : 'dont found the word'}</h2>
            <p class="font-medium text-xl py-6 ">Meaning /Pronounciation</p>
            <p class=" bangla-font text-3xl font-semibold text-[#18181B]">"${word.meaning ? word.meaning : 'dont found the meaning'} / ${word.pronunciation ? word.pronunciation : 'dont found the pronunciation'}"</p>
            <div class="flex justify-between items-center mt-10">
                <button  onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1a91ff1a]  hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>

            </div>
        </div>
        `
        wordContainer.appendChild(cardDiv)
    });
}

const displayLesson = (lessons) =>{
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = '';

lessons.forEach(lesson => {
    // 
    
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="btn btn-soft btn-primary gap-2 lesson-btn"><img src="./assets/fa-book-open.png" alt="">Lesson-${lesson.level_no}</button>
    
    `

    levelContainer.appendChild(btnDiv)
});
}
loadLessons()