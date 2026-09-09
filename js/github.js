// dormhi.com - GitHub API Integration

(function() {

    var GITHUB_USER = 'dormhi';
    var API_URL = 'https://api.github.com/users/' + GITHUB_USER + '/repos?sort=updated&per_page=30';

    // Language color mapping
    var langColors = {
        'JavaScript': '#f1e05a',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C++': '#f34b7d',
        'C#': '#178600',
        'TypeScript': '#3178c6',
        'Shell': '#89e051',
        'Kotlin': '#A97BFF'
    };

    // Repos to exclude (config repos, forks, etc.)
    var excludeRepos = [GITHUB_USER];

    function createRepoCard(repo) {
        var card = document.createElement('a');
        card.href = repo.html_url;
        card.target = '_blank';
        card.className = 'portfolio-card';

        var langDot = '';
        if (repo.language) {
            var color = langColors[repo.language] || '#8892b0';
            langDot = '<span class="repo-lang"><span class="lang-dot" style="background:' + color + '"></span>' + repo.language + '</span>';
        }

        var description = repo.description || 'No description';
        if (description.length > 100) {
            description = description.substring(0, 97) + '...';
        }

        card.innerHTML =
            '<div class="repo-header">' +
                '<i class="fa-solid fa-folder-open"></i>' +
                '<i class="fa-brands fa-github repo-github-icon"></i>' +
            '</div>' +
            '<h3 class="repo-name">' + repo.name + '</h3>' +
            '<p class="repo-desc">' + description + '</p>' +
            '<div class="repo-footer">' +
                langDot +
                (repo.stargazers_count > 0 ? '<span class="repo-stars"><i class="fa-solid fa-star"></i> ' + repo.stargazers_count + '</span>' : '') +
            '</div>';

        return card;
    }

    function renderRepos(repos) {
        var grid = document.getElementById('portfolio-grid');
        var loading = document.getElementById('portfolio-loading');
        if (!grid) return;

        // Filter out excluded repos and forks
        var filtered = repos.filter(function(repo) {
            return !repo.fork && excludeRepos.indexOf(repo.name) === -1;
        });

        if (loading) loading.remove();

        if (filtered.length === 0) {
            grid.innerHTML = '<p class="portfolio-empty">No projects found.</p>';
            return;
        }

        filtered.forEach(function(repo) {
            grid.appendChild(createRepoCard(repo));
        });
    }

    function renderFallback() {
        var grid = document.getElementById('portfolio-grid');
        var loading = document.getElementById('portfolio-loading');
        if (!grid) return;
        if (loading) loading.remove();

        var fallbackRepos = [
            { name: 'CargallerySAD', description: 'SAD project and first big website', language: 'JavaScript', html_url: 'https://github.com/dormhi/CargallerySAD', stargazers_count: 0 },
            { name: 'dormhiQuizzer', description: 'Simple Java quiz management system for OOP course', language: 'Java', html_url: 'https://github.com/dormhi/dormhiQuizzer', stargazers_count: 0 },
            { name: 'syncbreaker', description: 'A syncbreaker application', language: 'JavaScript', html_url: 'https://github.com/dormhi/syncbreaker', stargazers_count: 0 },
            { name: 'gradecalculator', description: 'Java based simple UI project', language: 'Java', html_url: 'https://github.com/dormhi/gradecalculator', stargazers_count: 0 },
            { name: 'dormhi.com', description: 'Personal portfolio website', language: 'HTML', html_url: 'https://github.com/dormhi/dormhi.com', stargazers_count: 0 }
        ];

        fallbackRepos.forEach(function(repo) {
            grid.appendChild(createRepoCard(repo));
        });
    }

    function loadRepos() {
        fetch(API_URL)
            .then(function(res) {
                if (!res.ok) throw new Error('API error');
                return res.json();
            })
            .then(renderRepos)
            .catch(renderFallback);
    }

    // Load when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadRepos);
    } else {
        loadRepos();
    }

})();
