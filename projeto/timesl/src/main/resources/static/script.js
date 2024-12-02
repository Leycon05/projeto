// Variável para armazenar o time sendo editado
let timeEditando = null;

// Função para alternar a visibilidade do menu de times
function toggleMenu() {
  const menu = document.getElementById('menu-times');
  menu.classList.toggle('aberto');
  menu.classList.toggle('fechado');
}

// Evento de clique no botão "Times" para abrir/fechar o menu
document.getElementById('botao-times').addEventListener('click', toggleMenu);

// Lida com a criação e edição de times
document.getElementById('form-time').addEventListener('submit', function (event) {
  event.preventDefault();

  // Captura os valores do formulário
  const nomeTime = document.getElementById('nome-time').value;
  const tecnico = document.getElementById('tecnico').value;
  const escudoUrl = document.getElementById('escudo').value;  // URL da imagem

  if (!nomeTime || !tecnico || !escudoUrl) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  
  const listaTimes = document.getElementById('lista-times');

  // Se estamos editando um time
  if (timeEditando) {
    // Atualiza o time editado
    const escudoImg = timeEditando.querySelector('img');
    const timeInfo = timeEditando.querySelector('span');

    // Atualiza o escudo e o nome do time
    escudoImg.src = escudoUrl;
    timeInfo.textContent = `${nomeTime} - Técnico: ${tecnico}`;

    const timeId = timeEditando.getAttribute('data-id'); // Pega o ID do time editado

    // Faz a requisição PUT para atualizar o time
    fetch(`https://timesfc.azurewebsites.net/api/${timeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nomeTime,
        tecnico: tecnico,
        logo: escudoUrl, // Alterei de 'escudo' para 'logo' para corresponder ao backend
      }),
    })
      .then(response => response.json())
      .then(updatedTime => {
        console.log('Time atualizado com sucesso:', updatedTime);
        alert('Time editado com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao atualizar o time:', error);
      });

    // Limpa a variável de edição
    timeEditando = null;

  } else {
    // Cria um novo item para a lista de times
    fetch('https://timesfc.azurewebsites.net/api/criar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nomeTime,
        tecnico: tecnico,
        logo: escudoUrl, // Alterei de 'escudo' para 'logo'
      }),
    })
      .then(response => response.json())
      .then(newTime => {
        console.log('Time criado com sucesso:', newTime);

        // Cria o novo item na lista de times
        const listItem = document.createElement('li');
        listItem.setAttribute('data-id', newTime.id); // Salva o ID do time para edição

        const escudoImg = document.createElement('img');
        escudoImg.src = escudoUrl;
        escudoImg.alt = `${nomeTime} Escudo`;

        const timeInfo = document.createElement('span');
        timeInfo.textContent = `${nomeTime} - Técnico: ${tecnico}`;

        // Criação do botão de editar
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', function () {
          // Preenche o formulário com as informações do time
          document.getElementById('nome-time').value = nomeTime;
          document.getElementById('tecnico').value = tecnico;
          document.getElementById('escudo').value = escudoUrl; // Exibe a URL do escudo

          // Marca o time como sendo editado
          timeEditando = listItem;
        });

        // Criação do botão de excluir
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', function () {
          // Exclui o time da lista
          fetch(`https://timesfc.azurewebsites.net/api/${newTime.id}`, {
            method: 'DELETE',
          })
            .then(() => {
              listItem.remove(); // Remove o item da lista
              alert('Time excluído com sucesso!');
            })
            .catch(err => console.error('Erro ao excluir o time', err));
        });

        // Adiciona os elementos ao item da lista
        listItem.appendChild(escudoImg);
        listItem.appendChild(timeInfo);
        listItem.appendChild(btnEditar);
        listItem.appendChild(btnExcluir);

        // Adiciona o item à lista
        listaTimes.appendChild(listItem);

        alert('Time salvo com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao criar o time:', error);
      });
  }

  // Limpa o formulário
  document.getElementById('form-time').reset();
  toggleMenu();
});

// CONECTANDO O FRONT COM O BACK
fetch('https://timesfc.azurewebsites.net/api/listar', {
  method: 'GET',
})
  .then(response => response.json())
  .then(times => {
    const listaTimes = document.getElementById('lista-times');
    listaTimes.innerHTML = ''; // Limpa a lista antes de renderizar os times

    times.forEach(time => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-id', time.id); // Salva o ID do time para edição

      const escudoImg = document.createElement('img');
      escudoImg.src = time.logo; // Alterei de 'escudo' para 'logo'
      escudoImg.alt = `${time.nome} Escudo`;

      const timeInfo = document.createElement('span');
      timeInfo.textContent = `${time.nome} - Técnico: ${time.tecnico}`;

      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.addEventListener('click', function () {
        // Preenche o formulário com as informações do time
        document.getElementById('nome-time').value = time.nome;
        document.getElementById('tecnico').value = time.tecnico;
        document.getElementById('escudo').value = time.logo; // Exibe a URL do escudo

        // Marca o time como sendo editado
        timeEditando = listItem;
      });

      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.addEventListener('click', function () {
        // Exclui o time da lista
        fetch(`https://timesfc.azurewebsites.net/api/${time.id}`, {
          method: 'DELETE',
        })
          .then(() => listItem.remove())
          .catch(err => console.error('Erro ao excluir o time', err));
      });

      // Adiciona os elementos ao item da lista
      listItem.appendChild(escudoImg);
      listItem.appendChild(timeInfo);
      listItem.appendChild(btnEditar);
      listItem.appendChild(btnExcluir);

      // Adiciona o item à lista
      listaTimes.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar os dados:', error);
  });
