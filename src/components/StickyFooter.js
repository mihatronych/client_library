import React from "react";
import "../styles.css"

const style = {
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    padding: "15px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
    color:'#C36C84'
}

const phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
}

function Footer() {
    return (

        <div >
            <div style={phantom} />
            <div style={style} >
                <div className="d-flex justify-content-center container">
                    <p className="small-text"> &copy; {new Date().getFullYear()} | Mihatron | <a href={"mailto:dolgushin.mikhail131200@yandex.ru"}>dolgushin.mikhail131200@yandex.ru </a>| <a  target="_blank" rel="noreferrer" href={"https://github.com/mihatronych"}>Git</a> | <a href={"https://t.me/MihailmacBlack"} target="_blank" rel="noreferrer">Telegram</a> | <a href={"https://vk.com/mdliberateanimals"}  target="_blank" rel="noreferrer">Вк</a></p>

                </div>

            </div>

        </div>
    )
}

export default Footer;
