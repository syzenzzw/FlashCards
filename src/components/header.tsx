import '../styles/header.css'
import LogoFlashCard from './imgs/LogoFlashCard.png'

function HeaderPage(){
    return(
        <div className="header">
            <head>
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet" />
            </head>
            <img className='logoFM' src={LogoFlashCard}/>
            <h1 className='FlashMasterAprensetation'>
                FlashMaster, your favorite flash card editor
            </h1>
            <div className='links'>
                <a href="#">About</a>
                <a href="#">Project</a>
                <a href="#">API</a>
            </div>
        </div>
    )
}

export default HeaderPage;