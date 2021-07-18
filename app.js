
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

// Marcador de aciertos
let success = 0;

form.addEventListener('submit', event => {
    event.preventDefault();
})


// Englobo toda la funcionalidad de la aplicación en una función para poder reinicarla con un boton de volver a jugar
let startAndReload = () => {

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
                <div class="white-block limit-width-white-block-star-end">
                    <h1>Bienvenido al Quiz!</h1>
                    <button id="startButton" class="button-standar" type="button">Empezar!</button>
                </div>
            </div>
        `

        // Función encargada de pintar el grafico en el Canvas
        // El if se encarga de que en caso de que sea la primera vez que se juegue, o no haya registro de anteriores partidas se mostrara la pantalla de inicio sin grafico
        if (localStorage.length != 0) {
            form.innerHTML = `
                <div class="block">
                    <div class="white-block limit-width-white-block-star-end">
                        <h1>Superate a ti mismo!</h1>
                        <button id="startButton" class="button-standar" type="button">Empezar!</button>
                    </div>
                    <div class="white-block limit-height-width-grapichs-block">
                        <canvas class="canvas-grapich" id="myChart"></canvas>
                    </div>
                </div>`;

            // Pintamos el grafico en el canvas
            drawGraphic();
        };

        // Selección boton pantalla de inicio
        let startButton = document.getElementById('startButton')

        // Función boton pantalla de inicio
        startButton.addEventListener('click', () => {
            siguiente(results[i]) // results[0] , pintamos la primera pergunta
        })


        // Función encargada de iterar, pintar y comprobar las preguntas
        let siguiente = (result) => {
            // console.log(result);

            // Recuperamos datos concretos
            let question = result.question;
            let questionAnswerCorrect = result.correct_answer;
            let questionsAnswerIncorrect = result.incorrect_answers;

            let answers = [questionAnswerCorrect, ...questionsAnswerIncorrect]; // Agrupamos todos los datos que queremos en un Array

            let questionsRandom = shuffle(answers); // Randomizamos el array anterior para que la posición de la respuesta correcta no se repita

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

};

// Iniciamos la funcion una vez escrito todo
startAndReload();

// Función pantalla final
let theEnd = () => {

    // Pinta pantalla final
    form.innerHTML = `
        <div class="block">
            <div class="white-block limit-width-white-block-star-end">
                <h2 class="title-end">Aquí van tus resultados!</h2>
                <span class="marker">${success} / ${numberOfQuestions}</span>
                <p class="message-end">¡Muchas gracias por jugar!</p>
                <button id="reloadButton" class="button-standar">Jugar otra vez</button>
            </div>
        </div>                        
    `;

    let reloadButton = document.getElementById('reloadButton');

    reloadButton.addEventListener('click', () => {
        startAndReload();
    })

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
    if (localStorage.length == 0) { localStorage.setItem('record', JSON.stringify([])) };

    // Pedimos la puntuación guardade en storage
    let newRecord = JSON.parse(localStorage.getItem('record'));
    // Le añadimos la nueva puntuación y fecha, que es un objeto
    newRecord.push(result);
    // Guardamos el record con la ultima puntuación y fecha
    localStorage.setItem('record', JSON.stringify(newRecord));

}



// Función encargada del grafico, utilizando la librearia Chart
let drawGraphic = () => {

    // Cogemos los datos del localStorage
    let oldScore = JSON.parse(localStorage.getItem('record'));
    // Seleccionamos el canvas y le damos propiedad 2D
    let ctx = document.getElementById('myChart').getContext('2d');

    // Creamos la estructura del objeto que requiere la libreria para poder añadir los datos antes de pintar nada
    let structureObject = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Aciertos',
                data: [],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    };

    // Añadimos los datos del grafico
    oldScore.map(element => {
        structureObject.data.labels.push(element.date);
        structureObject.data.datasets[0].data.push(element.score);
    })

    // Pintamos el grafico
    let myChart = new Chart(ctx, structureObject);
}