const database2 = firebase.database();







class Pregunta{
    constructor(preguntaLista){
        this.preguntaLista=preguntaLista;
    }

    render=()=>{
        let component = document.createElement('div');
        component.className="comp";


        let preguntaCont = document.createElement('div');
        preguntaCont.className="preguntaCont"
        preguntaCont.innerHTML = this.preguntaLista.preguntica;

        let idPregunta = document.createElement('div');
        idPregunta.className="idPregunta";
        idPregunta.innerHTML = this.preguntaLista.id;

        let promedio = document.createElement('div');
        promedio.className = "promedio";
        idPregunta.innerHTML = this.preguntaLista.promedio;

        let deleteBtn = document.createElement('button');
        deleteBtn.className = "deleteBtn";
        deleteBtn.innerHTML = "x";


        if(this.preguntaLista.estado==="historico"){
            deleteBtn.style.display="block";
        }else{
            deleteBtn.style.display="none";
        }
        deleteBtn.addEventListener('click', ()=>{
           
            database2.ref('preguntas/'+this.preguntaLista.id).set(null);
            
            
            });


        component.appendChild(deleteBtn);
        component.appendChild(preguntaCont);
        component.appendChild(idPregunta);

        return component;

        }


       
    }