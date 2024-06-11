document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('project-form');
    const projectList = document.getElementById('project-list');
    const contributionModal = document.getElementById('contribution-modal');
    const contributionForm = document.getElementById('contribution-form');
    const closeButton = document.querySelector('.close-button');
    let projects = [];
    let selectedProjectId = null;

    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const goal = document.getElementById('goal').value;

        const project = {
            id: projects.length + 1,
            title,
            description,
            goal,
            raised: 0,
        };

        projects.push(project);
        renderProjects();

        projectForm.reset();
    });

    function renderProjects() {
        projectList.innerHTML = '';
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project';
            projectElement.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p class="goal">Goal: $${project.goal}</p>
                <p class="raised">Raised: $${project.raised}</p>
                <div class="progress-bar">
                    <div class="progress-bar-inner" style="width: ${Math.min((project.raised / project.goal) * 100, 100)}%;"></div>
                </div>
                <button onclick="showContributionModal(${project.id})">Contribute</button>
                <button class="delete" onclick="deleteProject(${project.id})">Delete</button>
            `;
            projectList.appendChild(projectElement);
        });
    }

    window.showContributionModal = (projectId) => {
        selectedProjectId = projectId;
        contributionModal.style.display = 'block';
    };

    closeButton.addEventListener('click', () => {
        contributionModal.style.display = 'none';
    });

    window.onclick = (event) => {
        if (event.target == contributionModal) {
            contributionModal.style.display = 'none';
        }
    };

    contributionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseInt(document.getElementById('contribution-amount').value);
        if (isNaN(amount) || amount <= 0) {
            alert('Invalid amount');
            return;
        }

        const project = projects.find(p => p.id === selectedProjectId);
        project.raised += amount;
        renderProjects();
        contributionModal.style.display = 'none';
    });

    window.deleteProject = (projectId) => {
        projects = projects.filter(project => project.id !== projectId);
        renderProjects();
    };
});
