import style from './style.js';
import html from './template.js';

const numeros = new Map([
    [1, ['dere-inferior', 'dere-superior']],
    [2, ['central-superior', 'dere-superior', 'central', 'izqui-inferior', 'central-inferior']],
    [3, ['central-superior', 'dere-superior', 'central', 'dere-inferior', 'central-inferior']],
    [4, ['izqui-superior', 'central', 'dere-superior', 'dere-inferior']],
    [5, ['central-superior', 'izqui-superior', 'central', 'dere-inferior', 'central-inferior']],
    [6, ['central-superior', 'izqui-superior', 'izqui-inferior', 'central', 'dere-inferior', 'central-inferior']],
    [7, ['central-superior', 'dere-superior', 'dere-inferior']],
    [8, ['central-superior', 'izqui-superior', 'dere-superior', 'central', 'izqui-inferior', 'dere-inferior', 'central-inferior']],
    [9, ['central-superior', 'izqui-superior', 'dere-superior', 'central', 'dere-inferior']],
    [0, ['central-superior', 'izqui-superior', 'dere-superior', 'izqui-inferior', 'dere-inferior', 'central-inferior']]
]);

class Digito extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = `<style>${style}</style>${html}`;
        this._digitos = this.shadowRoot.querySelector("#contenedor-digito");
    }

    connectedCallback() {
        this.numero = 0;
    }

    static get observedAttributes() {
        return ["numero"];
    }

    attributeChangedCallback(nombre, oldValue, newValue) {
        switch (nombre) {
            case "numero": {
                if (oldValue !== newValue) {
                    this.renderNumber();
                }
            }
        }
    }

    get numero() {
        return parseFloat(this.getAttribute("numero"));
    }

    set numero(numero) {
        this.setAttribute("numero", numero);
    }

    renderNumber() {

        Array.from(this._digitos.children).forEach((digito) => {
            digito.classList.add("white");
        });

        numeros.get(this.numero).forEach((identificador) => {
            this._digitos.querySelector("#" + identificador).classList.remove("white");
        });

    }

    avanzar(numero) {
        this.numero = numero === 9 ? 0 : numero + 1;
    }

}

customElements.define("custom-digito", Digito);