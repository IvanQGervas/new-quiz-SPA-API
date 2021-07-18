
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
let numberOfQuestions = 2;

// Marcador de aciertos
let success = 0;

form.addEventListener('submit', event => {
    event.preventDefault();
})

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
                    <button id="startButton" class="button-standar" type="button">Empezar!</button>
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
                        <div id="answer-block" class="white-block">
                            <h2 class="tittle-question">${question}</h2>

                            <input class="input-radio" type="radio" name="quest${contQuest}" id="quest${contQuest}-resp1" value="${questionsRandom[0]}" />
                            <label class="label-one" for="quest${contQuest}-resp1" >${questionsRandom[0]}</label>

                            <input class="input-radio" type="radio" name="quest${contQuest}" id="quest${contQuest}-resp2" value="${questionsRandom[1]}" />
                            <label class="label-two" for="quest${contQuest}-resp2" >${questionsRandom[1]}</label>

                            <input class="input-radio" type="radio" name="quest${contQuest}" id="quest${contQuest}-resp3" value="${questionsRandom[2]}" />
                            <label class="label-three" for="quest${contQuest}-resp3" >${questionsRandom[2]}</label>

                            <input class="input-radio" type="radio" name="quest${contQuest}" id="quest${contQuest}-resp4" value="${questionsRandom[3]}" />
                            <label class="label-four" for="quest${contQuest}-resp4" >${questionsRandom[3]}</label>

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
                if (i == (numberOfQuestions)) {
                    // MOSTRAR FINAL
                    theEnd();
                } else {
                    // Recuepramos el valor seleccionado por el usuario
                    let answerBlock = document.querySelector(`input[name="quest${contQuest - 1}"]:checked`).value;
                    // Si el valor es la respuesta correcta aumenta el marcador de aciertos
                    if (answerBlock == questionAnswerCorrect) { success++ };
                    siguiente(results[i]);
                }

            })

        };



    })


let theEnd = () => {

    // Pinta pantalla final
    form.innerHTML = `
        <div class="block">
            <div class="white-block">
                <h2 class="title-end">Aquí van tus resultados!</h2>
                <span class="marker">${success} / ${numberOfQuestions}</span>
                <p class="message-end">¡Muchas gracias por jugar!</p>
                <button class="button-standar">Jugar otra vez</button>
            </div>
        </div>                        
    `;

    // Recoge la fecha y la formatea en una variable
    let day = new Date().getDate();
    let mounth = new Date().getMonth();
    let year = new Date().getFullYear();
    let date = `${day}/${mounth}/${year}`

    // Genera un objeto con la puntuación y fecha
    let result = {
        score: success,
        date: date
    };

    // En caso de ser la primera partida genera un record vacio en el Storage para evitar errores
    if(localStorage.length == 0){localStorage.setItem('record', JSON.stringify([]))};

    // Pedimos la puntuación guardade en storage
    let newRecord = JSON.parse(localStorage.getItem('record'));
    // Le añadimos la nueva puntuación y fecha, que es un objeto
    newRecord.push(result);
    // Guardamos el record con la ultima puntuación y fecha
    localStorage.setItem('record', JSON.stringify(newRecord));

}
