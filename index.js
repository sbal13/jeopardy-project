document.addEventListener("DOMContentLoaded", function(event) { 
	const token = "2fc3cfd499ceeb5c96e35834071ef017d839bcf07bc93959424338710956a334"

	function loadGame() {
		fetch(`https://opentdb.com/api_category.php`).then(res => res.json()).then(res => getCategories(res))
	}

	function getCategories(res) {
		let categoriesHtml = res.trivia_categories.map( category => {
			return `
			<option value="${category.id}">${category.name}</option>
			`		
		}).join('')
		document.getElementById('categories-select').innerHTML = categoriesHtml
	}
		
	document.getElementById('choose-category').addEventListener('click', function(event) {
		event.preventDefault();
		var categoryId = document.getElementById('categories-select').value
		fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple&token=${token}`)
		.then(res => res.json())
		.then(res => populateQuestions(res))
	})

	function populateQuestions(res) {
		var questions = res.results.map(question => {
			var q = new Question(question.question, question.correct_answer, question.incorrect_answers, question.category)
			return q.display()
		}).join('')
		document.getElementById('questions-container').innerHTML = questions
	}


loadGame();  

});

function evaluateAnswer(el) {
	let answer = el.dataset.answer
	let questionId = el.dataset.question
	let question = Question.all().find( q => q.id == questionId )
	if (question.answer == answer) {
		alert("Correct!")
	}
	else {
		alert("Incorrect!")
	}
}








