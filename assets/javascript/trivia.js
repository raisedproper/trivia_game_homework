
var trivTime = 0;
var rightCount = 0;
var wrongCount = 0;
var qACount = 1;
//======================
var timer = '';
var qA = {
			1:{
				question:'What NFL Team Won the SuperBowl in 2004 and 2005?',
				answers:['Eagles','Patriots','Raiders','Falcons'],
				correct:'Patriots',
				right: 'Correct!',
				wrong: 'Wrong! The correct answer is the New England Patriots',
				imageUrl:'http://image.nj.com/home/njo-media/width600/img/realtimesports_impact/photo/nfl-new-england-patriots-at-new-orleans-saints-28fc0ecaa5b78275.jpg'
			   },
			2:{
				question:'What Chicago Bears running back was known as "The Galloping Ghost?"',
				answers:['Harold Grange','Jim Brown','Walter Payton','Terrrel Owens'],
				correct:'Harold Grange',
				right: 'Correct! ',
				wrong: 'Wrong! The correct answer Hall of Famer Harold Grange, he was an All-American running back at the University of Illinois in the early 1920s, then for the Bears until 1935, was known as Red Grange or The Galloping Ghost. He was so dominating in a 1924 game against Michigan--gaining 262 yards and scoring 4 touchdowns in just 12 minutes--that he inspired Grantland Rice to write the following poem which spawned his famous nickname' ,
				imageUrl:'https://static01.nyt.com/packages/images/sports/year_in_sports/photos/10.18a.jpg'
			},
			3:{
				question:'What is the PGA record for highest score on a par-4?',
				answers:['7','10','13','16'],
				correct:'16',
				right: 'Correct!',
				wrong: 'Wrong! The correct answer is 16. On April 14, 2011, Kevin Na played the worst ever par-4 hole on the PGA Tour since the tour began recording hole-by-hole scores in 1983, making a 16 on the ninth hole at the Valero Texas Open.',
				imageUrl:'https://www.thoughtco.com/thmb/YGAMDtcihJ_VA6t-Q6UwWCGlu7c=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/furyk-58-record-score-57a77d443df78cf4591fb2c0.jpg'
            },
            
            /*4:{
				question:'What country won the first World Cup?',
				answers:['Switzerland','Argentina','Brazil','Uruguay'],
				correct:'Uraguay',
				right: 'Correct!',
				wrong: 'Wrong! The correct answer is Uruguay, in the first World Cup final, held on July 30, 1930, 93,000 spectators looked on as Uruguay defeated Argentina 4-2 in a rematch of the 1928 Olympic gold medal game.',
				imageUrl:'https://img.fifa.com/mm/photo/tournament/competition/02/75/74/47/2757447_full-lnd.jpg'
			   }*/

	};

var start = function(){
	//When buttons is clicked clear trivSection
	$('.startBtn').on('click',function(){
		//Emptys trivia section
		$('.trivSection').empty();
		createQuestions();
	});
}
var createQuestions = function(){
	timerStart();
	//Get question
	var question = qA[qACount]['question'];
	//assign div element to newDiv
	var newDiv = $('<div>');
	//Add a class to newDIv
	newDiv.addClass('question');
	//Add text to question
	newDiv.text(question);
	//Add question to DOM
	$('.trivSection').append(newDiv);
	createAnswers();
}
var createAnswers = function(){
	var answerLength = qA[qACount]['answers'].length;
	for(var i = 0; i < answerLength;i++){
		//get answers
		var answers = qA[qACount]['answers'][i];
		//Create new div to hold answers
		var newBtn = $('<button>');
		//Add class to new Div
		newBtn.addClass('answers redBtn');
		//Give buttons attribute
		newBtn.attr('data-type',answers);
		//add text to new Div
		newBtn.text(answers);
		//Add answers to DOM
		$('.trivSection').append(newBtn);
	}
	
	$(document).off('click','.answers',checkAnswer);
	$(document).on('click','.answers',checkAnswer);
}
var checkAnswer = function(){
	 //Get users answer choice
	var userAnswer = $(this).data('type');
	var correctAnswer = qA[qACount]['correct'];
	var correctImg = qA[qACount]['imageUrl'];

	var right = qA[qACount]['right'];
	var wrong = qA[qACount]['wrong'];
	console.log(qACount);
	if(userAnswer === correctAnswer){
		//Update rightCount
		rightCount++;
		//Clears out triv Section
		$('.trivSection').empty();
		var newImg = $('<img>');
		newImg.attr('src',correctImg);
		$('.trivSection').append(newImg);
		//Create Div
		var newDiv = $('<div>');
		//Give div class
		newDiv.addClass('rightAnswer');
		//adds CORRECT! text to div
		newDiv.text(right);
		//Add answer to DOM
		$('.trivSection').append(newDiv);
		//Stops Time
		clearInterval(timer)
		//Add 1 to question count to move to the next question
		qACount++;
		if(qACount <= 3){
			//removes CORRECT! text and continues to create next question after 3 seconds
			setTimeout(
				function(){
					$('.trivSection').empty();
					createQuestions();
					},3500);
		}
		else{
			$('.trivSection').empty();
			var newImg = $('<img>');
			newImg.attr('src',correctImg);
			$('.trivSection').append(newImg);
			//Create Div
			var newDiv = $('<div>');
			//Give div class
			newDiv.addClass('rightAnswer');
			//adds CORRECT! text to div
			newDiv.text(right);
			//Add answer to DOM
			$('.trivSection').append(newDiv);
			//Stops Time
			clearInterval(timer)
			//Reset
			setTimeout(gameOver, 3500);
		}
	}
	else{
		wrongCount++;
		//Clears out triv Section
		$('.trivSection').empty();
		var newImg = $('<img>');
		newImg.attr('src',correctImg);
		$('.trivSection').append(newImg);
		var newDiv = $('<div>');
		//Give div class
		newDiv.addClass('wrongAnswer');
		//adds Wrong! text to div
		newDiv.text(wrong);
		//Add answer to DOM
		$('.trivSection').append(newDiv);
		//Stops Time
		clearInterval(timer)
		//Add 1 to question count to move to the next question
		qACount++;
		
		if(qACount <= 3){
			setTimeout(function(){
			$('.trivSection').empty();
			createQuestions();
			},3500);
		}
		else{
			//Clears out triv Section
			$('.trivSection').empty();
			var newImg = $('<img>');
		newImg.attr('src',correctImg);
		$('.trivSection').append(newImg);
			var newDiv = $('<div>');
			//Give div class
			newDiv.addClass('wrongAnswer');
			//adds Wrong! text to div
			newDiv.text(wrong);
			//Add answer to DOM
			$('.trivSection').append(newDiv);
			//Stops Time
			clearInterval(timer);
			//Reset
			setTimeout(gameOver, 3500);
		}
	}
}
//Timer
//==========================================
var timerStart = function(){ 
	$('.timerSection').empty();
	//Sets time to 10
	trivTime = 100;
	//Progress Bar
	var timeTag = $('<div>');
	timeTag.addClass('time');
	timeTag.addClass('progress');
	var progressBar = $('<div>');
	progressBar.addClass('progress-bar');
	progressBar.width(trivTime + '%');

	$('.timerSection').append(timeTag);
	$('.time').append(progressBar);	
	//Decrements Time
	timer = setInterval(timeDecrement,100);
}
var timeDecrement = function(){ 
	//Progress bar decrement
	$('.progress-bar').width(trivTime + '%');
	trivTime--;
	//if time gets to 0
	if(trivTime === -10){
		userAnswer = false;
		//Clears Time
		clearInterval(timer);
		checkAnswer();
	}
	
}
var gameOver = function(){
	//Remove everything in trivia section
	$('.trivSection').empty();
	//Remove everthing in timer section
	$('.timerSection').empty();
	var scoreDiv = $('<div>');
	scoreDiv.addClass('score');
	scoreDiv.html('Correct: ' + rightCount + '<br>' + 'Wrong: ' + wrongCount);
	$('.trivSection').append(scoreDiv);
	//Assign new div element to new Div
	var newDiv = $('<div>');
	//add class to new Div
	newDiv.addClass('gameOver');
	//add game over text
	newDiv.text('Game Over! Play Again ?');
	//Append game over text to DOM
	$('.trivSection').append(newDiv);
	//Create ResetButton
	var newBtn = $('<button>');
	//Give btn Class
	newBtn.addClass('redBtn resetBtn');
	//Give btn reset Text
	newBtn.text('Reset');
	//Append
	$('.trivSection').append(newBtn);
	//Reset all value
	trivTime = 100;
	qACount = 1;
	rightCount = 0;
	wrongCount = 0;
	//When reset button is clicked.......
	$('.resetBtn').on('click',function(){
		$('.trivSection').empty()
		//Starts game over
		createQuestions();
	});
}

start();