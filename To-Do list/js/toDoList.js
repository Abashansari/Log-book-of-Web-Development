document.getElementById('addButton').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = taskInput.value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            let newText = prompt("Update your task:", listItem.textContent);
            if (newText !== null && newText.trim() !== '') {
                listItem.textContent = newText;
                listItem.appendChild(deleteButton);
                listItem.appendChild(editButton);
              }
          });

        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
        taskList.appendChild(listItem);
        taskInput.value = '';
    }
});
