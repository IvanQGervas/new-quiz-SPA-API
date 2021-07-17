
let form = document.getElementById('form');

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(data=>data.json())
    .then(json=> {

        let results = json.results;
        let contQuest = 1;

        results.map( element => {
            // console.log(element);

            // Datos recogidos
            let question = element.question;
            let questionCorrect = element.correct_answer;
            let questionIncorrect1 = element.incorrect_answers[0];
            let questionIncorrect2 = element.incorrect_answers[1];
            let questionIncorrect3 = element.incorrect_answers[2];  

            // Generamos un array con todas las preguntas
            let questions = [questionCorrect, questionIncorrect1, questionIncorrect2, questionIncorrect3];

            // Randomizamos las posiciones de los valores del Array no tener siempre el mismo nombre en pantalla
            let questionsRandom = shuffle(questions);

            console.log(questionsRandom);
            console.log(questionCorrect);

            form.innerHTML += `
                <div class="block">
                    <div class="white-block">
                        <h2 class="tittle-question">${question}</h2>

                            <input class="input-radio" type="radio" name="quest${contQuest}" id="quest${contQuest}-resp1" value="${questionsRandom[0]}" />
                            <label class="label-one" for="quest1-resp1" >${questionsRandom[0]}</label>

                            <input class="input-radio" type="radio" name="quest${contQuest}" id="quest${contQuest}-resp2" value="${questionsRandom[1]}" />
                            <label class="label-two" for="quest1-resp2" >${questionsRandom[1]}</label>

                            <input class="input-radio" type="radio" name="quest${contQuest}" id="quest${contQuest}-resp3" value="${questionsRandom[2]}" />
                            <label class="label-three" for="quest1-resp3" >${questionsRandom[2]}</label>

                            <input class="input-radio" type="radio" name="quest${contQuest}" id="quest${contQuest}-resp4" value="${questionsRandom[3]}" />
                            <label class="label-four" for="quest1-resp4" >${questionsRandom[3]}</label>

                            <button class="button-next" type="button">Siguiente</button>
                        </div>
                </div>
            `;

            contQuest++;


            

        } )

    })