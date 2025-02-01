import '../styles/createcard.css'
import { useState } from 'react';
import axios from "axios"
import { useQuery } from 'react-query'

function CreateCard(){
    const [postProps, setPostProps] = useState('');
    const modal = document.getElementById('modal');

    //const {data, isLoading, error} = useQuery('getAllCards', () => {
       // return axios
       // .get('https://localhost:7091/api/v1/GetAllCards?pageIndex=1&pageSize=20')
       // .then((response) => response.data)
    //},{
    //})

    const {data, isLoading, error} = useQuery('getAllMatters', () => {
        return axios
        .get('https://localhost:7091/api/v1/GetAllMatters')
        .then((response) => response.data)
    },{

    });

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
            modalll.style.display = 'none';
            setPostProps('');
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
                    <textarea onChange={(e) => setPostProps(e.target.value)} className='txtArea' id="txtArea" placeholder='...'>
                        {postProps}
                    </textarea>

                    

                </div>
            </div>
        </div>
    )
}

export default CreateCard;