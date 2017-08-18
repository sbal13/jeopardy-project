var Session = (function creatSession() {
	
	return class Session {
		constructor() {
			this.promptPlayer()
		}

		getUsers() {
			

			var inputs = []
			for (let i=1; i <= this.numPlayers; i++){
				 inputs.push(`<label for="player-${i}">Player ${i}</label>
				 	<input id="player-${i}" type="text"><br>`)
			}

			var form = `
			<form id="get-user-names"> 
				${inputs.join('')}
				<input type = "submit" value="Start Game">
			</form>`

			$('#game-screen').html(form)
		}
		
		getNumPlayers(numPlayers){
			this.numPlayers = parseInt(numPlayers)
			this.getUsers()
		}

		promptPlayer() {
			var playerPrompt = `<h4>How many players are there?</h4>
			<form id="num-players-form">
				<input type="number" id="players">
				<input type='submit'>
			</form>`


			$('#game-screen').html(playerPrompt)

		}

	}
})()