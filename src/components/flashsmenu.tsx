import axios from "axios"
import { useQuery } from 'react-query'
import '../styles/flashmenu.css'
import { useState } from "react";
import '../styles/card.css'
import polegar from './imgs/polegar.png'

function FlashMenu(){ 
    const [cards, setCards] = useState(null);

    const {data, isLoading, error} = useQuery('getAllCards', () => {
        return axios
        .get('https://localhost:7091/api/v1/GetAllCards?pageIndex=1&pageSize=20')
        .then((response) => response.data)
    },{
    })

    if(error){
        return <div className="erro">
            erro
        </div>
    }

    if(isLoading){
        return <div className="carregando">
            Carregando...
        </div>
    }

     async function responseGetById(id: number) {
        const response = await axios.get(`https://localhost:7091/api/v1/PegarPelaId${id}`)
        const dataResponse = await response.data;
        setCards(dataResponse);
        console.log(dataResponse);           
    }

    async function changeRevised(id: number) {
        const responseRevised = await fetch(`https://localhost:7091/api/v1/ChangeRevised${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "revised": true
            }),
        })

        if (responseRevised.status === 200) {
            console.log(responseRevised)
            responseGetById(id);
        }
    }

    

    return(
        <div className="divtaskbar">
        <div className="taskbar" >
            <h1 className="titleFlash">Flashs: </h1>
            {data.cards.map(card => (
                <div onClick={() => responseGetById(card.id)} className="lateralmenu" key={card.id}>
                    <h1 className="contenth1">{card.content.split(' ').shift()}</h1>
                    <small 
                    className="matter"
                    style={{
                        color: card.matter === 'Matemática' ? '#FFA20C' : 'inherit'
                    }}
                    >{card.matter}
                    </small>
                </div>
            ))}
        </div>
            {cards && (
                <div className="containerCard">
                       <div className="contentCard">
                            <label htmlFor="polegar">Revisado? </label>

                            <label
                            onClick={() => changeRevised(cards.id)} 
                            className="polegar" 
                            id="polegar"
                            >
                            <img width={20} src={polegar} />
                            </label>

                            <p className="content">{cards.content}</p>

                            <br /><br />

                            <small className="createdOnCard">Criado em: {cards.createdOn}</small>

                            <br /><br />
                            
                            <small className="urgency">Urgência: {cards.urgency}</small>
                            
                            <br /><br />

                            <small className="Isrevised" style={
                                {
                                    color: cards.revised === 'Sim' ? '#00FF00' : 'inherit',
                                }
                            }>Revisado: {cards.revised}</small>
                       </div>   
                </div>
            )}
        </div>
    );
}

export default FlashMenu;