
var getRandom = (arr) => {
    let randomWord = arr[Math.floor(Math.random() * arr.length)];
    return randomWord
}

var removeElement = (word, arr) => {
    let index = arr.indexOf(word);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return
}

var shuffleArray = (arr) => {
    let array = arr.sort(function (a, b) {
        return 0.5 - Math.random();
    });
    return array
}

var loadJsonDataToArray = (jsonData, column) => {

    let array = [];

    if (column == 'answer') {
        for (let index = 0; index < jsonData.length; index++) {
            array.push(jsonData[index].answer);
        }
    }

    if (column == 'question') {
        for (let index = 0; index < jsonData.length; index++) {
            array.push(jsonData[index].question);
        }
    }

    if (column == 'clue'){
        for (let index = 0; index < jsonData.length; index++) {
            array.push(jsonData[index].clue);
        }
    }

    return array
}



module.exports = {
    getRandom,
    removeElement,
    shuffleArray,
    loadJsonDataToArray
}