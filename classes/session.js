var Session = function creatSession() {
	
	return class Session {
		constructor() {
			this.numPlayers = this.getNumPlayers()
			this.getUsers()
		}

		getUsers() {

		}

		promptPlayer() {
			var playerPrompt = `<h4>How many players are there?</h4>
			<input type="number" id="players">
			<input type='submit' onclick ="">`
			document.getElementById('game-screen').innerHTML = playerPrompt

		}

	}
}