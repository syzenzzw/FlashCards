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

        <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet" />
        </head>

            <button className='btnModal' onClick={openModal} id='btnModal'>
                Create a Flash-Card
            </button>
            <div id='modal' className="modal">
                <div className="contentModal">
                    <span onClick={closeModal} className="close">&times;</span>
                    <p className='titleModal'>Create FlashCard</p>
                    <textarea onChange={(e) => setCardContent(e.target.value)} className='txtArea' id="txtArea" placeholder='...'>
                    </textarea> 

                    <br /><br />

                    <label  className='lblMatter' htmlFor="inptMatter">Matter: </label>
                    <input type="text" 
                    className='inptMatter'
                    onChange={(e) => setCardMatter(e.target.value)}/>
                   
                    <label className='lblUrgency' htmlFor="slc">Urgency: </label>

                    <select onChange={(e) => setCardUrgency(e.target.value)} className='slc' id="slc">
                        <option value="Selecione">Select a urgency</option>
                        <option value="Alta">High</option>
                        <option value="Média">Mid</option>
                        <option value="Baixa">Low</option>
                    </select>
                    <button className='btnCreate' onClick={CreateCardFunc} type='button'>Create</button>
                </div>
            </div>
        </div>
    )
}

export default CreateCard;