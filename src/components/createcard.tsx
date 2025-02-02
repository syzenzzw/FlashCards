import '../styles/createcard.css'
import { useState } from 'react';


function CreateCard(){
    const [cardUrgency, setCardUrgency] = useState('')
    const [cardMatter, setCardMatter] = useState('');
    const [cardContent, setCardContent] = useState('');
    const modal = document.getElementById('modal');

    async function CreateCardFunc() {
        console.log({cardContent, cardMatter, cardUrgency})

        try {
            const responsePost = await fetch(`https://localhost:7091/api/v1/CreateCard`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'content': cardContent,
                    'matter': cardMatter,
                    'urgency': cardUrgency
                })
            })

            if (responsePost.status == 201) {
                console.log('foi')
            }
        } catch (e) {
            console.log('erro: ', e);
        }
    }


    function openModal(){
        const modal1 = document.getElementById('modal');
        if (modal1) {
            modal1.style.display = 'block'
        }
    }

    function closeModal(){
        const modall = document.getElementById('modal');
        if(modall){
            modall.style.display = 'none';
        }
    }

         window.onclick = function(event){
        if (event.target == modal) {
            const modalll = document.getElementById('modal');
            
            if (modalll) {
                modalll.style.display = 'none';
            }  
        }   
    }
    return (
        <div>
            <button onClick={openModal} id='btnModal'>
                Abrir
            </button>
            <div id='modal' className="modal">
                <div className="contentModal">
                    <span onClick={closeModal} className="close">&times;</span>
                    <p>para teste</p>
                    <textarea onChange={(e) => setCardContent(e.target.value)} className='txtArea' id="txtArea" placeholder='...'>
                    </textarea> 

                    <br /><br />

                    <label htmlFor="inptMatter">matéria: </label>
                    <input type="text" 
                    className='inptMatter'
                    onChange={(e) => setCardMatter(e.target.value)}/>
                   
                    <label htmlFor="slc">Urgência: </label>

                    <select onChange={(e) => setCardUrgency(e.target.value)} id="slc">
                        <option value="Alta">Alta</option>
                        <option value="Média">Média</option>
                        <option value="Baixa">Baixa</option>
                    </select>
                    <button onClick={CreateCardFunc} type='button'>Criar Flash Card</button>
                </div>
            </div>
        </div>
    )
}

export default CreateCard;