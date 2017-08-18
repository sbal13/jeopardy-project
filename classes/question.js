var Question = (function classCreator() {
	const all = []
	let count = 0
	return class Question {
		constructor(question, answer, incorrect, category)	{
			this.question = question
			this.answer = answer
			this.incorrect = incorrect
			this.category = category
			this.id = ++count
			all.push(this)
		}

		display() {
			var question = `
			<div>
				<form id="answer-question">
					<h4>${this.question}</h4>
					${this.displayAnswers()}
				</form>
			</div>
			`
			return question
		}

		displayAnswers() {
			var allAnswers = this.incorrect.slice()
			allAnswers.push(this.answer)
			var arrayButtons = [] 
			var i = 0
			while (allAnswers.length > 0) {
				var answer = allAnswers.splice(Math.floor(Math.random()*allAnswers.length), 1)[0];
				arrayButtons.push(`<button type="submit" id="answer-${++i}" data-answer="${answer}" data-question="${this.id}">${answer}</button>`)
			}
			return arrayButtons.join('');
		}

		static all() {
			return all.slice()
		}
	}

})()