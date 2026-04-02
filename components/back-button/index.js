export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <button class="btn btn-primary back-btn" type="button" id="back-button">
                ← Назад к телескопам
            </button>
        `;
    }

    addListeners(listener) {
        document.getElementById('back-button').addEventListener('click', listener);
    }

    render(listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.addListeners(listener);
    }
}
