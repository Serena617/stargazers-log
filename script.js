const repositoryList = document.querySelector("#repository-list");
const status = document.querySelector("#status");

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  for (const repository of repositories) {
    const item = document.createElement("li");
    item.className = "repository";

    const link = document.createElement("a");
    link.href = repository.url;
    link.textContent = repository.name;
    link.target = "_blank";
    link.rel = "noreferrer";

    const description = document.createElement("p");
    description.textContent = repository.description;

    const details = document.createElement("small");
    details.textContent = `${repository.language} · Starred ${repository.starredAt}`;

    item.append(link, description, details);
    repositoryList.append(item);
  }

  status.textContent = `${repositories.length} starred repositories`;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    status.textContent = "Could not load starred repositories.";
    status.dataset.state = "error";
    console.error(error);
  }
}

loadRepositories();