!function () {

	function keyboard() {

		var keys = {

		}
	}


	function FingerFury() {

		var isRunning = false,
			startTime,
			typingString = 'On Thursday IBM will announce that Watson, the computing system that beat all the humans on "Jeopardy!" two years ago, will be available in a form more than twice as powerful via the Internet.\nCompanies, academics and individual software developers will be able to use it at a small fraction of the previous cost, drawing on IBM’s specialists in fields like computational linguistics to build machines that can interpret complex data and better interact with humans.\n			IBM’s move to make its marquee technology more widely available is the latest effort among big technology companies to make the world’s most powerful computers as accessible as the Angry Birds video game.\n\n			It is also an indication of how quickly the technology industry is changing, from complex systems that cost millions to install to pay-as-you-go deals that provide small companies and even individuals access to technology that just a few years ago only the largest companies could afford.\n\n"The next generation will look back and see 2013 as a year of monumental change," said Stephen Gold, vice president of the Watson project at IBM.\n\n"This is the start of a shift in the way people interact with computers."\n\n		IBM is wielding Watson in a fight to control the world of cloud computing — huge collections of computer servers connected over the Internet — with other big technology companies like Amazon.com, Google and Microsoft. It is no coincidence that IBM discussed its Watson news the same week Amazon was hosting clients at a conference here to pitch its own computing cloud, called Amazon Web Services or A.W.S.\n\n			The competition is still young, but its impact will be significant.\n\n"Companies, governments and people will struggle to figure out what to do with all this," said Jamie Popkin, an analyst with the research company Gartner. "It means there is going to be a new pace and velocity, making people rethink when humans make decisions, while machines make other decisions."\n\nWatson, a project on which IBM spent 14 years, is an artificial learning system that digests large volumes of information to find hidden meanings. Initial uses — besides  besting humans on game shows — include  examining medical patients and records to find an unexpected diagnosis, a bit like the genius portrayed in the television show "House." Other uses include an online personal shopper and a virtual health aide that tailors exercises by asking questions.\nIBM is opening Watson to more people in part to see what additional businesses might be created.\nWatson is prominent, but similar projects are being run by other companies. On Tuesday, a company appearing at the Amazon conference said it had run in 18 hours a project on Amazon’s cloud of computer servers that would have taken 264 years on a single server.\n			The project, related to finding better materials for solar panels, cost $33,000, compared with an estimated $68 million to build and run a similar computer just a few years ago. Akin more to conventional supercomputing than Watson’s question-and-answer cognitive computing, the project was the first of several announced at the Amazon conference.\n"It’s now $90 an hour to rent 10,000 computers," the equivalent of a giant machine that would cost $4.4 million, said Jason Stowe, the chief executive of Cycle Computing, the company that did the Amazon supercomputing exercise, and whose clients include The Hartford, Novartis, and Johnson & Johnson. "Soon smart people will be renting a conference room to do some supercomputing."\nWhile revenues of Amazon’s cloud business are still small enough that the company does not have to disclose them, Amazon officials say Jeff Bezos, the company’s chief executive, believes A.W.S. could eventually dwarf Amazon’s businesses in books and merchandise, enterprises with $51 billion in revenue. This year, Gartner calculated that A.W.S. had five times the computing power of 14 other cloud computing companies, including IBM, combined.\n			Since then, IBM has spent an estimated $2 billion to acquire a cloud company called SoftLayer and has reconfigured Watson as a cloud product. It also hired buses that drove around the A.W.S. conference in Las Vegas, sporting ads that said they showed its superiority in cloud computing.\n			Besides gaining bragging rights and a much bigger customer base, IBM may be accelerating the growth of Watson’s power by putting it in the cloud. Mr. Gold said that Watson would retain learning from each customer interaction, gaining the ability to do things like interacting in different languages or identifying human preferences. IBM has taken steps to keep these improvements for its own benefit, by retaining rights in user agreements that customers are required to sign.\n			What is not yet clear is IBM’s plan to make money from taking Watson to the computing cloud. The company is experimenting with charging for data storage, or selling computing on a metered basis, like water or electricity. "There is no question the model will change," Mr. Gold said. "You have to have flexibility to handle the breadth of cases we expect to see."\nIt is likely that the competition among advanced computing systems will increase, lowering prices and delivering more capabilities to whatever use companies make of them.\n			This year, Google and a corporation associated with NASA acquired for study an experimental computer that appears to make use of quantum properties to deliver results sometimes 3,600 times faster than traditional supercomputers. The maker of the quantum computer, D-Wave Systems of Burnaby, British Columbia, counts Mr. Bezos as an investor.',
			typedString = "",
			gameLoop,
			gameCounter = 0,
			score = 0,
			minOffset = 40,
			msPerLetter = 250

		function string() {

			var length = 80

			return typingString.substr(gameCounter, length)
		}

		function render() {

			document
				.getElementById('typingArea')
				.innerHTML = string()
		}

		function gameOver(){

			document
				.getElementById('typingArea')
				.innerHTML = "Game Over"
		}

		function checkStatus() {

			var shouldTyped = typingString.substring(minOffset, gameCounter),
				// Removes enter character at beginning
				typed = typedString.substring(1, gameCounter - minOffset + 1)

			if (typed != shouldTyped) {
				stop()
				gameOver()
			}
		}

		function reset() {

			isRunning = false
			gameCounter = 0
			startTime = 0
			typedString = ''

			document
				.getElementById('typingArea')
				.innerHTML = ""

			document
				.getElementById('test')
				.innerHTML = ""
		}

		function enterChar(event) {

			typedString += String.fromCharCode(event.which)

			document
				.getElementById('test')
				.innerHTML = typedString
		}


		function removeChar() {
			typedString = typedString.slice(0, -1)

			document
				.getElementById('test')
				.innerHTML = typedString
		}


		function displayScore() {

			document
				.getElementById('score')
				.innerHTML = String((gameCounter - minOffset > 0) ? gameCounter - minOffset : 0)
		}

		function start(event) {

			event.stopPropagation()

			if (!isRunning) {

				isRunning = true
				startTime = new Date()

				Mousetrap.unbind('enter')

				Mousetrap.bind('backspace', function (e) {
					e.preventDefault()
					removeChar()
				})

				document.addEventListener('keypress', enterChar)


				function loop() {

					if ((new Date() - startTime) / msPerLetter >= gameCounter) {

						render()

						if (gameCounter > minOffset)
							checkStatus()

						displayScore()

						gameCounter++
					}

					if (isRunning)
						gameLoop = window.setTimeout(loop, 30)
				}

				loop()
			}
		}

		function stop() {

			if (isRunning) {

				window.clearTimeout(gameLoop)

				document.removeEventListener('keypress', enterChar)

				Mousetrap.bind('enter', fingerFury.start)

				reset()
			}
		}


		this.init = function () {
		}

		this.start = start

		this.stop = stop

		this.toggle = function () {
			if (isRunning)
				stop()
			else
				start()
		}

		for (var i = 0; i < minOffset; i++) {
			typingString = " " + typingString
		}

		return this
	}


	var fingerFury = FingerFury()

	Mousetrap.bind('enter', fingerFury.start)
	Mousetrap.bind('esc', fingerFury.stop)

}()
