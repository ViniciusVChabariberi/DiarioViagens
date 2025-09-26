const form = document.getElementById("form-memoria");
const entradasSection = document.getElementById("entradas");
const btnLocalizacao = document.getElementById("btn-localizacao");

window.addEventListener("DOMContentLoaded", () => {
  if (entradasSection) exibirEntradas();
});

btnLocalizacao?.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      document.getElementById("latitude").value = pos.coords.latitude;
      document.getElementById("longitude").value = pos.coords.longitude;
      alert("📍 Localização adicionada com sucesso!");
    }, () => {
      alert("Não foi possível obter a localização.");
    });
  }
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const memoria = {
    titulo: document.getElementById("titulo").value,
    data: document.getElementById("data").value,
    foto: document.getElementById("foto").value,
    descricao: document.getElementById("descricao").value,
    avaliacao: document.getElementById("avaliacao").value,
    latitude: document.getElementById("latitude").value,
    longitude: document.getElementById("longitude").value
  };

  let memorias = JSON.parse(localStorage.getItem("memorias")) || [];
  memorias.push(memoria);
  localStorage.setItem("memorias", JSON.stringify(memorias));

  alert("✅ Memória salva com sucesso!");
  window.location.href = "memorias.html";
});

function exibirEntradas() {
  let memorias = JSON.parse(localStorage.getItem("memorias")) || [];
  entradasSection.innerHTML = "";

  if (memorias.length === 0) {
    entradasSection.innerHTML = "<p class='text-gray-500'>Nenhuma memória salva ainda.</p>";
    return;
  }

  memorias.forEach((m, index) => {
    const card = document.createElement("article");
    card.className = "bg-white rounded-2xl shadow-md overflow-hidden transform transition hover:scale-[1.02] hover:shadow-lg";

    card.innerHTML = `
      ${m.foto ? `<img src="${m.foto}" alt="Foto de ${m.titulo}" class="w-full h-48 object-cover">` : ""}
      <div class="p-4">
        <h3 class="text-xl font-bold text-blue-700">${m.titulo}</h3>
        <p class="text-gray-600 text-sm mb-2"><strong>Data:</strong> ${m.data}</p>
        <p class="mb-2">${m.descricao}</p>
        <p class="font-semibold text-yellow-600">⭐ Avaliação: ${m.avaliacao}/5</p>
        ${m.latitude && m.longitude ?
        `<p class="text-sm text-gray-500 mt-2">📍 Localização: ${m.latitude}, ${m.longitude}</p>` : ""}
        <button class="delete-btn mt-4 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition" data-index="${index}">
          Excluir
        </button>
      </div>
    `;
    entradasSection.appendChild(card);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      let i = e.target.dataset.index;
      let memorias = JSON.parse(localStorage.getItem("memorias")) || [];
      memorias.splice(i, 1);
      localStorage.setItem("memorias", JSON.stringify(memorias));
      exibirEntradas();
    });
  });
}

// async function carregarCitacao() {
//   const textoCitacao = document.getElementById("texto-citacao");
//   const autorCitacao = document.getElementById("autor-citacao");

//   if (!textoCitacao || !autorCitacao) return;

//   try {
//     const resposta = await fetch("https://api.quotable.io/random");
//     const data = await resposta.json();
//     textoCitacao.textContent = `"${data.content}"`;
//     autorCitacao.textContent = `— ${data.author}`;
//   } catch (error) {
//     textoCitacao.textContent = "⚠️ Não foi possível carregar a citação.";
//     autorCitacao.textContent = "";
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  const frase = document.getElementById("texto-citacao");
  const autor = document.getElementById("autor-citacao");
  const btn = document.getElementById("nova-citacao");

  async function puxarFrase() {
    try {
      const response = await fetch('https://moraislucas.github.io/MeMotive/phrases.json');
      const dados = await response.json();

      const aleatorio = dados[Math.floor(Math.random() * dados.length)];

      frase.textContent = aleatorio.quote;
      autor.textContent = aleatorio.author;

    } catch (erro) {
      frase.textContent = "Não foi possível carregar a citação.";
      autor.textContent = "";
      console.error(erro);
    }
  }

  btn.addEventListener("click", puxarFrase);

  puxarFrase();
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  if (!track) return;

  const slides = Array.from(track.children);
  const total = slides.length;
  let index = 0;
  const intervalMs = 3000;

  const updateCarousel = () => {
    const trackWidth = track.parentElement.offsetWidth;
    const centerOffset = (trackWidth - slides[index].offsetWidth) / 2;

    let translateX = -slides[index].offsetLeft + centerOffset;
    track.style.transform = `translateX(${translateX}px)`;

    slides.forEach((slide, i) => {
      slide.classList.remove("active");
    });
    slides[index].classList.add("active");
  };

  updateCarousel();

  setInterval(() => {
    index = (index + 1) % total;
    updateCarousel();
  }, intervalMs);

  window.addEventListener("resize", updateCarousel);
});

document.addEventListener("DOMContentLoaded", () => {
  const estrelas = document.querySelectorAll("#estrelas span");
  const inputAvaliacao = document.getElementById("avaliacao");

  const atualizarEstrelas = (valor) => {
    estrelas.forEach(star => {
      const starValue = parseInt(star.dataset.value);
      if (starValue <= valor) {
        star.classList.add("active");
        star.textContent = "★";
      } else {
        star.classList.remove("active");
        star.textContent = "☆";
      }
    });
  };

  atualizarEstrelas(parseInt(inputAvaliacao.value));

  inputAvaliacao.addEventListener("input", () => {
    atualizarEstrelas(parseInt(inputAvaliacao.value));
  });
});