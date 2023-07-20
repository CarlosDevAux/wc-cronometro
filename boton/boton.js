import style from "./style.js";

class Boton extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        this.btn = document.createElement("button");
        shadowRoot.innerHTML = `<style>${style}</style>`;
        shadowRoot.append(this.btn);
    }

    static get observedAttributes() {
        return ["titulo"];
    }

    attributeChangedCallback(nombre, oldValue, newValue) {
        switch (nombre) {
            case "titulo": {
                if (oldValue !== newValue) {
                    this.actualizarTitulo(newValue);
                }
                break;
            }
        }
    }

    connectedCallback() {
        this.addEventListener("click", (event) => {
            event.stopPropagation();
            event.preventDefault();
            this.dispatchEvent(new CustomEvent("miEventoClick", {
                detail: {
                    titulo: this.titulo
                },
                bubbles: true,
                composed: true
            }))
        });
    }

    get titulo() {
        return this.getAttribute("titulo");
    }

    set titulo(titulo) {
        this.setAttribute("titulo", titulo);
    }

    actualizarTitulo(newValue) {
        this.btn.innerText = newValue;
    }

}

customElements.define("custom-boton", Boton);