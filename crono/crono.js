import style from './style.js';

class Crono extends HTMLElement {

    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = `<style>${style}</style>`;

        let slot = document.createElement("slot");

        this.btnInicar = document.createElement("custom-boton");
        this.btnReinicar = document.createElement("custom-boton");

        let contenedorBtn = document.createElement("div");
        contenedorBtn.classList.add("content-botones");

        contenedorBtn.append(this.btnInicar);
        contenedorBtn.append(this.btnReinicar);
        shadowRoot.append(slot, contenedorBtn);

        this.contador = 0;

        this.iniciar = this.iniciar.bind(this);
        this.reiniciar = this.reiniciar.bind(this);

    }

    connectedCallback() {
        this.btnInicar.titulo = "Iniciar";
        this.btnReinicar.titulo = "Reinicar";

        this.btnInicar.addEventListener("miEventoClick", this.iniciar);
        this.btnReinicar.addEventListener("miEventoClick", this.reiniciar);

    }

    iniciar(event) {

        if (event.detail.titulo === "Iniciar") {
            this.btnInicar.titulo = "Pausar";

            this.intervalo = setInterval(() => {
                this.contador++;
                this.dispatchEvent(new CustomEvent("actualizarTiempo", {
                    detail: { contador: this.contador },
                    bubbles: true,
                }))

            }, 10);

        } else {
            this.btnInicar.titulo = "Iniciar";
            clearInterval(this.intervalo);
        }

        event.stopPropagation();

    }

    reiniciar(event) {

        this.contador = 0;
        this.dispatchEvent(new CustomEvent("actualizarTiempo", {
            detail: { contador: this.contador },
            bubbles: true
        }));

        event.stopPropagation();

    }

}

customElements.define("custom-crono", Crono);