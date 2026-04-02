export class SubjectCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const priorityClass = `priority-${data.priority}`;
        return `
            <div class="card ${priorityClass} m-3" style="width: 18rem;" id="card-${data.id}" data-id="${data.id}">
                <img src="${data.image}" class="card-img-top" alt="${data.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.modes.join(', ')}</p>
                    <div class="mode-tag">${data.priority === 1 ? 'КРИТИЧЕСКИЙ' : data.priority === 2 ? 'ВЫСОКИЙ' : 'СТАНДАРТ'}</div>
                    <button class="btn btn-primary mt-2 w-100" id="click-card-${data.id}" data-id="${data.id}">
                        Подробнее
                    </button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        document.getElementById(`click-card-${data.id}`).addEventListener('click', listener);
    }

    render(data, listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        this.addListeners(data, listener);
    }
}
