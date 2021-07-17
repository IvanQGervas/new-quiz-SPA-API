
let form = document.getElementById('form');

// Función randomizar arrays
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Numero de preguntas que tendra el Quiz
let numberOfQuestions = 10;


// Petición de datos a la API
fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&type=multiple`)
    .then(data => data.json())
    .then(json => {

        let results = json.results;
        let i = 0; // Iterador para la función siguiente
        let contQuest = 1; // Iterador name e id de los inputs

        // Pantalla de inicio
        form.innerHTML = `
            <div class="block">
                <div class="white-block">
                    <h1>Bienvenido</h1>
                    <button id="startButton" class="button-next" type="button">Empezar!</button>
                </div>
            </div>
        `
        // Selección boton pantalla de inicio
        let startButton = document.getElementById('startButton')

        // Función boton pantalla de inicio
        startButton.addEventListener('click', () => {
            siguiente(results[i]) // results[0] , pintamos la primera pergunta
        })



        let siguiente = (result) => {
            // console.log(result);
            
            // Recuperamos datos concretos
            let question = result.question;
            let questionAnswerCorrect = result.correct_answer;
            let questionsAnswerIncorrect = result.incorrect_answers;

            let answers = [questionAnswerCorrect, ...questionsAnswerIncorrect]; // Agrupamos todos los datos que queremos en un Array

            let questionsRandom = shuffle(answers); // Randomizamos el array anterior para que la posición de la respuesta correcta no se repita

            // console.log(questionsRandom);

            // Sobreescribimos la pantalla anterior y pintamos la pregunta correspondiente segun el valor de i
            form.innerHTML = `
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

                                <button id="nextButton" class="button-next" type="button">Siguiente</button>
                            </div>
                    </div>
            `;

            // Aumentamos el valor de los iteradores a cada vuelta
            contQuest++; 
            i++;

            // Cogemos el nuevo boton
            let nextButton = document.getElementById('nextButton');
            // Volvemos a llamar a la función dentro de si misma para pintar la nueva pregunta con el nuevo valor de i
            nextButton.addEventListener('click', () => {

                // Cuando i llegue al valor de preguntas totales se detendra el bucle y mostraremos la pantalla final
                if (i == (numberOfQuestions - 1)) {
                    // MOSTRAR FINAL
                    theEnd();
                } else {
                    siguiente(results[i])
                }

            })

        };


        let theEnd = () => {


            form.innerHTML = `
            <div class="block">
                <div class="white-block">
                    <h1>Terminaste!</h1>
                </div>
            </div>                        
            `;


        }

    })











// fetch('https://opentdb.com/api.php?amount=10&type=multiple')
//     .then(data => data.json())
//     .then(json => {

//         let results = json.results;
//         let contQuest = 1;

//         results.map(element => {
//             // console.log(element);

//             // Datos recogidos
//             let question = element.question;
//             let questionCorrect = element.correct_answer;
//             let questionIncorrect1 = element.incorrect_answers[0];
//             let questionIncorrect2 = element.incorrect_answers[1];
//             let questionIncorrect3 = element.incorrect_answers[2];

//             // Generamos un array con todas las preguntas
//             let questions = [questionCorrect, questionIncorrect1, questionIncorrect2, questionIncorrect3];

//             // Randomizamos las posiciones de los valores del Array no tener siempre el mismo nombre en pantalla
//             let questionsRandom = shuffle(questions);

//             console.log(questionsRandom);
//             console.log(questionCorrect);

//             form.innerHTML += `
//                 <div class="block">
//                     <div class="white-block">
//                         <h2 class="tittle-question">${question}</h2>

//                             <input class="input-radio" type="radio" name="quest${contQuest}" id="quest${contQuest}-resp1" value="${questionsRandom[0]}" />
//                             <label class="label-one" for="quest1-resp1" >${questionsRandom[0]}</label>

//                             <input class="input-radio" type="radio" name="quest${contQuest}" id="quest${contQuest}-resp2" value="${questionsRandom[1]}" />
//                             <label class="label-two" for="quest1-resp2" >${questionsRandom[1]}</label>

//                             <input class="input-radio" type="radio" name="quest${contQuest}" id="quest${contQuest}-resp3" value="${questionsRandom[2]}" />
//                             <label class="label-three" for="quest1-resp3" >${questionsRandom[2]}</label>

//                             <input class="input-radio" type="radio" name="quest${contQuest}" id="quest${contQuest}-resp4" value="${questionsRandom[3]}" />
//                             <label class="label-four" for="quest1-resp4" >${questionsRandom[3]}</label>

//                             <button class="button-next" type="button">Siguiente</button>
//                         </div>
//                 </div>
//             `;

//             contQuest++;




//         })

//     })