//import styles from '../styles.css';
import React from "react";

const style = {
    backgroundColor: "#C06C84",
    borderTop: "1px solid rgba(174, 174, 192, 0.4)",
    textAlign: "center",
    padding: "15px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
    color:'white'
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
                    <p className="small-text"> &copy; {new Date().getFullYear()} | Mihatron | dolgushin.mikhail131200@yandex.ru | <a target="_blank" href={"https://github.com/mihatronych"}>Git</a></p>

                </div>

            </div>

        </div>
    )
}

export default Footer;
