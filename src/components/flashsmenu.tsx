import axios from "axios";
import { useQuery } from 'react-query'

function FlashMenu(){ 

    const {data, isLoading, error} = useQuery('getAllCards', () => {
        return axios
        .get('https://localhost:7091/api/v1/GetAllCards?pageIndex=1&pageSize=20')
        .then((response) => response.data)
    },{
        retry: 5
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
        <div>
            <h1>Flashs: </h1>
            {data.cards.map(card => (
                <div className="lateralmenu" key={card.id}>
                    {card.content.split(' ').shift()}
                    <small>{card.matter}</small>
                </div>
            ))}
        </div>
    )
}

export default FlashMenu;