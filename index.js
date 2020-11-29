const enviarBtn = document.getElementById('enviarBtn');
const preguntaActual = document.getElementById('preguntaActual');
const preguntaInput = document.getElementById('preguntaInput');
const preguntaPasada = document.getElementById('preguntaPasada');
const database = firebase.database();


enviarPregunta = () => {

    if (preguntaInput.value === '') {
        alert("no pusiste nada, muy chistosito?");
        return;
    }
    

    database.ref('preguntas').once('value', function (data) {
        data.forEach(
            nuevaPregunta => {
                database.ref('preguntas/' + nuevaPregunta.val().id).set(
                    {
                        id: nuevaPregunta.val().id,
                        preguntica: nuevaPregunta.val().preguntica,
                        promedio:nuevaPregunta.val().promedio,
                        estado: "historico",
                    }
                );

            }
        )
    });


    let referencia = database.ref('preguntas').push()
    let nuevaPregunta = {

        id: referencia.key,
        preguntica: preguntaInput.value,
        promedio:"0",
        estado: "actual",

    };
    referencia.set(nuevaPregunta);
    preguntaInput.value = '';


    


}

enviarBtn.addEventListener('click', enviarPregunta);


//Lectura
database.ref('preguntas').on('value', function (data) {

    preguntaActual.innerHTML = '';
    preguntaPasada.innerHTML = '';
    

    data.forEach(
        nuevaPregunta => {
            let valor = nuevaPregunta.val();
            let publicarPregunta = new Pregunta(valor);

            if (nuevaPregunta.val().estado === "actual") {
                preguntaActual.appendChild(publicarPregunta.render());
            }

            if (nuevaPregunta.val().estado === "historico") {
                preguntaPasada.appendChild(publicarPregunta.render());
            }            

        }
    )

});



