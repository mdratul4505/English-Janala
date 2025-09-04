const synonyms = [ 'hello ', 'hi', 'khala hoba']
const createElement = (arr) =>{
    console.log(arr);

    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`)
    console.log(htmlElements.join(' '))
}

createElement(synonyms)