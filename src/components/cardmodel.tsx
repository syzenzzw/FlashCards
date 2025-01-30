import axios from "axios";
import { useEffect } from "react";

function CardModel(id: number) {

    async function responseGetById() {
        const response = await axios.get(`https://localhost:7091/api/v1/PegarPelaId${id}`)
        const data = await response.data;
        console.log(data);
    }
    
        responseGetById();

    return(
        <div className="card" key={id}>
            
        </div>
    )
}

export default CardModel;
