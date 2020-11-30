const database2 = firebase.database();
let total = 0;
let puntajeIn = 0;







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

    

        let promedio = document.createElement('p');
        promedio.className = "promedio";


        database2.ref("puntaje").orderByChild("idPregunta").equalTo(this.preguntaLista.id).on("value",function(data){
            total = data.numChildren();
            puntajeIn = 0;
            data.forEach(function(puntajedb){
                let value = puntajedb.val();
                puntajeIn = puntajeIn + value.puntaje
                let resultado = puntajeIn/total
                promedio.innerHTML = Math.round(resultado*100)/100;
               

            })
       
        })
        console.log(promedio);


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
        component.appendChild(promedio);
    

        return component;

        }


       
    }