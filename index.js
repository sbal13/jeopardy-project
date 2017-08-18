
document.addEventListener("DOMContentLoaded", function(event) { 
	const token = "483226b79ae45332984206fa772f1801590a92637d850c502f867865dc4ce4f9"
	let players = []
	var currentSession = new Session()
	function loadGame() {
		fetch(`https://opentdb.com/api_category.php`).then(res => res.json()).then(res => getCategories(res))
	}

	function getCategories(res) {
		let categoriesHtml = res.trivia_categories.map( category => {
			return `
			<option value="${category.id}">${category.name}</option>
			`	
		}).join('')

		let categoryForm = 
		`
		<form id="category-form">
			<select id="categories-select">
				${categoriesHtml}
			</select>
			<input type="submit" value="Select category">
		</form
		`
		
		$('#game-screen').html(categoryForm)
	}
		

	function populateQuestions(res) {
		var currentGame = new Game (players)
		res.results.forEach(question => {
			currentGame.addQuestion(new Question(question.question, question.correct_answer, question.incorrect_answers, question.category))
		})

		play(currentGame)
	}

	function play(currentGame){

		var currentPlayerDisplay = `<h3>${currentGame.currentPlayer().name}</h3>`
		$('#game-screen').html(currentPlayerDisplay + currentGame.getQuestion().display())


		$('#answer-question').on("click", "button", function(event){
			event.preventDefault()
			currentGame.evaluateAnswer(this)

			if (currentGame.checkOver()){
				$('#game-screen').html(currentGame.evaluateWinner())
				$('#continue-game').on("click", "button", function(event){

					if (this.id === "continue"){
						loadGame()
					}
					else {
						players = []
						currentSession = new Session()
					}
				})
			} else {
				play(currentGame)
			}
		})


	}




	

	$('#game-screen').on("submit", "form", function(event){
		event.preventDefault()

		switch (this.id){
			case "num-players-form": 
				var numPlayers = $('#players').val();

				currentSession.getNumPlayers(numPlayers);
				break;
			case "get-user-names":

				for (let i = 1; i<=currentSession.numPlayers; i++){
					players.push(new Player ($(`#player-${i}`).val(), i))
				}
				loadGame()
				break;
			case 'category-form':
				var categoryId = $('#categories-select').val()
				fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple&token=${token}`)
				.then(res => res.json())
				.then(res => populateQuestions(res))
				break;


		}

	})




 

});






