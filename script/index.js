const loadLessons =() =>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => displayLesson(json.data));
}
const loadLevelWord =(id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(json => displayLevelWord(json.data))

}
const displayLevelWord = (words)=>{
   
const wordContainer = document.getElementById('word-container')
wordContainer.innerHTML = '';
    words.forEach(word => {
        console.log(word)
        const cardDiv = document.createElement('div')

        cardDiv.innerHTML = `
        <div class="bg-white text-center rounded-xl p-10 shadow-sm">
            <h2 class="text-3xl font-bold">${word.word}</h2>
            <p class="font-medium text-xl py-6 ">Meaning /Pronounciation</p>
            <p class=" bangla-font text-3xl font-semibold text-[#18181B]">"${word.meaning} / ${word.pronunciation}"</p>
            <div class="flex justify-between items-center mt-10">
                <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
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
    <button onClick="loadLevelWord(${lesson.level_no})" class="btn btn-soft btn-primary gap-2"><img src="./assets/fa-book-open.png" alt="">Lesson-${lesson.level_no}</button>
    
    `

    levelContainer.appendChild(btnDiv)
});
}
loadLessons()