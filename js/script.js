// Inicialização do Swiper
const swiper = new Swiper('#banner', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


// Fetch API para a seção "Testemunhos"
fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(data => {
        const testemunhosContainer = document.querySelector('#testemunhos .row');
        testemunhosContainer.innerHTML = ''; 
        const dataLimitada = data.slice(0, 6);

        dataLimitada.forEach(testemunho => {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');
            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <img src="https://via.placeholder.com/150" class="card-img-top" alt="Foto de ${testemunho.name}">
                        <h5 class="card-title">${testemunho.name}</h5>
                        <p class="card-text">${testemunho.body}</p>
                    </div>
                </div>
            `;
            testemunhosContainer.appendChild(card);
        });

        AOS.init();
    })
    .catch(error => {
        console.error('Erro ao carregar os testemunhos:', error);
        const testemunhosContainer = document.querySelector('#testemunhos .row');
        testemunhosContainer.innerHTML = '<p class="text-danger">Erro ao carregar testemunhos. Tente novamente mais tarde.</p>';
    });


// Validação do formulário de contato
const formContato = document.getElementById('formContato');

formContato.addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;

    // Validação com feedback visual
    const campos = ['nome', 'email', 'assunto', 'mensagem'];
    campos.forEach(campoId => {
        const campo = document.getElementById(campoId);
        if (campo.value.trim() === '') {
            campo.classList.add('is-invalid');
            isValid = false;
        } else {
            campo.classList.remove('is-invalid');
        }
    });



    // Validação do email
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('email').classList.remove('is-invalid');
    }


    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios corretamente.');

        return;
    }

    alert('Mensagem enviada com sucesso!');
    formContato.reset();
});