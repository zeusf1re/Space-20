export class SubjectDetailComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.mainImage}" class="img-fluid rounded-start" alt="${data.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h2 class="card-title">${data.title}</h2>
                            <p class="card-text">${data.fullDescription}</p>
                            <p><strong>Преподаватель:</strong> ${data.teacher}</p>
                            <p><strong>Часов в неделю:</strong> ${data.hoursPerWeek}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
