const backend = 'http://localhost:4000/api/v1/tasks';

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const tasksList = document.getElementById('tasksList');

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('[type="submit"]')
    .addEventListener('click', (event) => {
      event.preventDefault();
      fetch(backend, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: document.getElementById('title').value,
          description: document.getElementById('content').value,
          status: document.getElementById('status').value,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    });

  document.querySelector('#getAllPosts').addEventListener('click', (event) => {
    event.preventDefault();
    fetch(backend)
      .then((res) => res.json())
      .then((data) => {
        let tasks = data.data;
        console.log(tasks);
        return tasks.map((task) => {
          let li = createNode('li');
          let ul = createNode('ul');
          li.innerHTML = `<div data-id="${task._id}"><h4>${task.title}</h4> ${task.description} 
          <a href="# id="delete-task">X</a></div>`;
          tasksList.appendChild(ul);
          append(ul, li);
        });
      })
      .catch((err) => console.log(err));
  });

  tasksList.addEventListener('click', (e) => {
    e.preventDefault();
    let delClicked = (e.target.id = 'delete-task');
    console.log(e.target.id);

    let id = e.target.parentElement.dataset.id;

    if (delClicked) {
      console.log('dlt clicked');
      fetch(`${backend}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: null,
      })
        .then((response) => response.json())
        .then(() => location.reload());
    }
  });
});
