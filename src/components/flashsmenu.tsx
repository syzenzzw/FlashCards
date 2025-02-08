import axios from "axios";
import { useQuery } from "react-query";
import "../styles/flashmenu.css";
import { useState } from "react";
import "../styles/card.css";

function FlashMenu() {
  interface Card {
    id: number;
    content: string;
    matter: string;
    createdOn: string;
    urgency: string;
    revised: string;
  }

  const [cards, setCards] = useState<Card | null>(null);
  const [contentUpdateCard, setContentUpdateCard] = useState("");
  const [updateReponse, setUpdateResponse] = useState('');

  const { data, isLoading, error, refetch } = useQuery(
    "getAllCards",
    () => {
      return axios
        .get(
          "https://localhost:7091/api/v1/GetAllCards?pageIndex=1&pageSize=20"
        )
        .then((response) => response.data);
    },
    {
    }
  );

  console.log(data);

  if (error) {
    return <div className="erro">erro</div>;
  }

  if (isLoading) {
    return <div className="carregando">Carregando...</div>;
  }

  async function responseGetById(id: number) {
    const response = await axios.get(
      `https://localhost:7091/api/v1/PegarPelaId${id}`
    );
    const dataResponse = await response.data;
    setCards(dataResponse);
    console.log(dataResponse);
  }

  function openModalDelete() {
    const modalDelete = document.getElementById("modalDelete");

    if (modalDelete) {
      modalDelete.style.display = "block";
    }
  }

  function closeModalDelete() {
    const modalDeleteClose = document.getElementById("modalDelete");

    if (modalDeleteClose) {
      modalDeleteClose.style.display = "none";
    }
  }

  async function changeRevised(id: number) {
    const responseRevised = await fetch(
      `https://localhost:7091/api/v1/ChangeRevised${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          revised: true,
        }),
      }
    );

    if (responseRevised.status === 200) {
      console.log(responseRevised);
      responseGetById(id);
    }
  }

  async function deleteCard(id: number) {
    const resposeDelete = await fetch(`https://localhost:7091/api/v1/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      console.log(data);
      if (data.status == 200) {
        alert("card deletado com sucesso! ");
        closeModalDelete();
      }
    });
    resposeDelete;
  }

  function updateFunction(id: number) {
    responseGetById(id);

    const contentUpdate = cards?.content.toString() ?? "";

    setContentUpdateCard(contentUpdate);

    const idContent =  document.getElementById('updateContent');
    const contentCardId = document.getElementById('contentCard');
    const btns = document.getElementById('buttons')

    if (idContent && contentCardId && btns) {
        idContent.style.display = 'block';
        contentCardId.style.display = 'none';
        btns.style.display = 'none'
    }

  }

  async function confirmUpdate(id: number) {
    try {
      const reponseUpdate = await fetch(`https://localhost:7091/api/v1/AtualizarConteudo${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: contentUpdateCard,
        }),
      }
    );

    refetch();
    responseGetById(id);

    const idContent =  document.getElementById('updateContent');
    const contentCardId = document.getElementById('contentCard');
    const btns = document.getElementById('buttons')

    if (idContent && contentCardId && btns) {
        idContent.style.display = 'none';
        contentCardId.style.display = 'block'
        btns.style.display = 'block'; 
    }

    const dataUpdate = await reponseUpdate.json();
    await setUpdateResponse(dataUpdate.response);
    await console.log(updateReponse)

    } catch (e) {
      console.log("erro: ", e);
    }      
  }

  return (
    <div className="divtaskbar">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>

      <div className="taskbar">
        <h1 className="titleFlash">My FlashCards: </h1>
        {data?.map((card: Card) => (
          <div
            onClick={() => responseGetById(card.id)}
            className="lateralmenu"
            key={card.id}
          >
            <h1 className="contenth1">{card.content.split(" ").shift()}</h1>
            <small
              className="matter"
              style={{
                color: card.matter === "Matemática" ? "#FFA20C" : "inherit",
              }}
            >
              {card.matter}
            </small>
          </div>
        ))}
      </div>
      {cards && (
        <div id="conteinerCard" className="containerCard">
          <button id="btnDelete" onClick={() => openModalDelete()} className="btnDelete">
            Delete
          </button>
          <div id="contentCard" className="contentCard">
            
            <p className="content">{cards.content}</p>

            <br />
            <br />
          <div className="cardInfo">

          
            <small className="createdOnCard">
              Created At: {cards.createdOn}
            </small>

           <br />

            <small className="urgency">Urgency: {cards.urgency}</small>

            <br />

            <small className="mattercard">Matter: {cards.matter}</small>

            <br />

            <small
              className="Isrevised"
              style={{
                color: cards.revised === "Yes" ? "#00FF00" : "inherit",
              }}
            >
              Revised: {cards.revised}
            </small>
            </div>
          </div>
            <div className="buttons" id="buttons">

            
          <button id="btnReview" onClick={() => changeRevised(cards.id)} className="btnReview">
            Review
          </button>

          <div id="modalDelete" className="modalDelete">
            <div className="contentDelete">
              <button onClick={() => deleteCard(cards.id)} className="yes">
                yes
              </button>
              <button onClick={() => closeModalDelete()} className="no">
                no
              </button>
            </div>
          </div>
          <button
            onClick={() => updateFunction(cards.id)}
            className="btnUpdate"
            id="btnUpdate"
          >
            Update
          </button>

          </div>

          <div id="updateContent" className="updateContent">
            <textarea
              onChange={(e) => setContentUpdateCard(e.target.value)}
              value={contentUpdateCard}
              className="txtUpdate"
              id="txtUpdate"
            ></textarea>

            <button
              onClick={() => confirmUpdate(cards.id)}
              className="confUpdate"
            >
              Confirm Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashMenu;
