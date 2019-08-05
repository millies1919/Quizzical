const ul = document.getElementById('questions')
const url = 'https://opentdb.com/api.php?amount=10'

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}


fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        let questions = data.results
        console.log(questions);
})
    .catch(function(error){
        alert("Could not get any questions!")
})
