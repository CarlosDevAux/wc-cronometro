import style from "./style.js";

class ContenedorDigito extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = `<style>${style}</style><slot></slot>`;
        this.contador = 0;
        this.actualizarTiempo = this.actualizarTiempo.bind(this);
    }

    connectedCallback() {
        document.body.addEventListener("actualizarTiempo", this.actualizarTiempo);
        /*
        setInterval(() => {
            this.contador++;
            this.actualizarTiempo();
        }, 10);
        */
    }

    actualizarTiempo(event) {

        let tiempo = this.formatearTiempo(event.detail.contador);

        this.querySelector("#decHora").numero = Math.floor(tiempo.horas / 10);
        this.querySelector("#hora").numero = Math.floor(tiempo.horas % 10);

        this.querySelector("#decMinutos").numero = Math.floor(tiempo.minutos / 10);
        this.querySelector("#minutos").numero = Math.floor(tiempo.minutos % 10);

        this.querySelector("#decSegundos").numero = Math.floor(tiempo.segundos / 10);
        this.querySelector("#segundos").numero = Math.floor(tiempo.segundos % 10);

        this.querySelector("#decCentesimas").numero = tiempo.decimas;
        this.querySelector("#centesimas").numero = tiempo.centesimas;

    }

    formatearTiempo(contador) {

        let horas, minutos, segundos, decimas, centesimas;
        centesimas = contador % 10;
        decimas = Math.floor((contador % 100) / 10);
        segundos = Math.floor((contador / 100) % 60);
        minutos = Math.floor(contador / 100 / 60);
        horas = Math.floor(contador / 100 / 3600);

        return { horas, minutos, segundos, decimas, centesimas };

    }

    disconnectedCallback() {
        document.body.removeEventListener(actualizarTiempo, this.actualizarTiempo);
    }

}

customElements.define("contenedor-digito", ContenedorDigito);