import axios from "axios"
import { useQuery } from 'react-query'
import '../styles/flashmenu.css'
import CardModel from "./cardmodel"

function FlashMenu(){ 
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



    return(
        <div className="divtaskbar">
        <div className="taskbar" >
            <h1 className="titleFlash">Flashs: </h1>
            {data.cards.map(card => (
                <div onClick={() => CardModel(card.id)} className="lateralmenu" key={card.id}>
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
        </div>
    );
}

export default FlashMenu;