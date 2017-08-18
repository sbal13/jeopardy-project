var Game = (function createGame(){

	return class Game{
		constructor(players){
			this.players = players
			this.questions = []
			this.currentTurn = 0
		}

		addQuestion(question){
			this.questions.push(question)
		}

		getQuestion(){
			return this.questions.splice(Math.floor(Math.random()*this.questions.length), 1)[0]
		}

		evaluateAnswer(button){
			let answer = button.dataset.answer
			let questionId = button.dataset.question
			let question = Question.all().find( q => q.id == questionId )
			if (question.answer == answer) {
				alert("Correct!")
				this.currentPlayer().score ++
			}
			else {
				alert("Incorrect!")
			}

			this.incrementTurn()
		}

		currentPlayer(){
			return this.players[this.currentTurn]
		}

		incrementTurn(){
			this.currentTurn++
			if (this.currentTurn > this.players.length-1) {
				this.currentTurn = 0
			}
		}

		checkOver(){

			return (this.questions.length === 0)

		}

		evaluateWinner(){
			var sortedPlayers = this.players.sort((player1,player2)=>{
				return player1.score - player2.score
			})

			sortedPlayers[0].wins++

			var playerRankingLIs = sortedPlayers.map(player => `<li>${player.name} Score: ${player.score}</li>`).join("")
			
			var header = `
				<h1>Game Over</h1>
				<h3>Winner: ${sortedPlayers[0].name}</h3>
			`
			var rankings = `<h1> Rankings </h1><ol>${playerRankingLIs}</ol>`


			var sortedWinners = this.players.sort((player1,player2)=>{
				return player1.wins - player2.wins
			})

			var leaderboard = "<h1> Wins </h1>" + sortedWinners.map(player => `<li>${player.name} Wins: ${player.wins}</li>`).join("")


			var continueButtons = `
				<form id="continue-game">
					<button id="continue">Continue</button> 
					<button id="quit">Quit</button> 
				</form>
			`

			var final = header + rankings + leaderboard + continueButtons

			return final
		}


	}
})()