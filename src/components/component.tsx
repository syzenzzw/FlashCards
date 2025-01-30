import axios from "axios";
import { useQuery } from 'react-query'
import { useEffect, useState } from "react";

function ComponentTestReactQuery(){
    const {data, isLoading, error} = useQuery('getCards', () => {
        return axios
        .get("https://localhost:7091/api/v1/GetAllCards?pageIndex=1&pageSize=20")
        .then((response) => response.data);

    },{
        retry: 5,
        refetchOnWindowFocus: true,
    });

    if (isLoading) {    
        return <div className="carregando">
            Carregando...
        </div>
    } 

    if (error) {
        return <div className="loading">
            algo deu errado
        </div>
    }

    return(
        <div>
            <h1>Cards: </h1>
            {data.cards.map(card => (
                <div key={card.id} className="lis">   
                {card.content}
                </div>
            ))}
        </div>
    )
}

export default ComponentTestReactQuery;   