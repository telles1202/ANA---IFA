const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationItems = document.querySelectorAll(".nav-links a");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.querySelector("span").textContent = "☰";
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.querySelector("span").textContent = isOpen ? "×" : "☰";
});

navigationItems.forEach(link => {
  link.addEventListener("click", closeMenu);
});

const accordionButtons = document.querySelectorAll(".accordion-question");

accordionButtons.forEach(button => {
  button.addEventListener("click", () => {
    const item = button.closest(".accordion-item");
    const answer = document.getElementById(button.getAttribute("aria-controls"));
    const isOpen = button.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".accordion-item").forEach(otherItem => {
      const otherButton = otherItem.querySelector(".accordion-question");
      const otherAnswer = document.getElementById(otherButton.getAttribute("aria-controls"));

      otherItem.classList.remove("active");
      otherButton.setAttribute("aria-expanded", "false");
      otherAnswer.hidden = true;
    });

    if (!isOpen) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
      answer.hidden = false;
    }
  });
});

const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    navigationItems.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${entry.target.id}`
      );
    });
  });
}, {
  rootMargin: "-35% 0px -55% 0px",
  threshold: 0
});

sections.forEach(section => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 950) closeMenu();
});

const chatPanel = document.querySelector("#chat-panel");
const chatLauncher = document.querySelector(".chat-launcher");
const chatClose = document.querySelector(".chat-close");
const chatForm = document.querySelector(".chat-form");
const chatInput = document.querySelector("#chat-input");
const chatMessages = document.querySelector("#chat-messages");

function setChatOpen(isOpen) {
  chatPanel.hidden = !isOpen;
  chatLauncher.setAttribute("aria-expanded", String(isOpen));
  chatLauncher.setAttribute("aria-label", isOpen ? "Fechar assistente do projeto" : "Abrir assistente do projeto");
  if (isOpen) chatInput.focus();
}

chatLauncher.addEventListener("click", () => setChatOpen(chatPanel.hidden));
chatClose.addEventListener("click", () => setChatOpen(false));

const siteKnowledge = [
  {
    terms: ["quem", "grupo", "estudantes", "alunas", "responsaveis", "desenvolveu", "autoras"],
    answer: "O projeto foi desenvolvido por estudantes do período noturno do Colégio Estadual do Paraná. Na página, são apresentadas Ana Julia, Valentina e Vitória."
  },
  {
    terms: ["objetivo", "projeto", "sobre", "proposta", "aquecimento"],
    answer: "O projeto estuda possibilidades e conceitos físicos envolvidos na criação de um sistema capaz de aquecer a piscina do CEP, considerando fenômenos físicos, modelos matemáticos, simulações e fatores de eficiência e viabilidade."
  },
  {
    terms: ["escala", "maquete", "proporcionalidade", "centimetro", "modelo reduzido"],
    answer: "A página usa como exemplo a escala 1:100: cada centímetro da maquete corresponde a 100 centímetros na realidade. Assim, a piscina de 50 m × 25 m e profundidade máxima de 5,30 m é representada por 50 cm × 25 cm e profundidade máxima de 5,30 cm."
  },
  {
    terms: ["dimensoes", "comprimento", "largura", "profundidade", "area superficial", "olimpica"],
    answer: "Segundo a página, a piscina tem 50 m de comprimento, 25 m de largura e profundidade máxima de 5,30 m. Sua área superficial é 1.250 m² (50 × 25)."
  },
  {
    terms: ["volume", "litros", "agua da piscina", "massa da agua"],
    answer: "A página informa um volume de água de 4.282.800 litros. Para a conversão usada no cálculo, considera-se que 1 litro de água é aproximadamente 1 kg."
  },
  {
    terms: ["energia", "calor", "temperatura", "formula", "delta t", "aquecer"],
    answer: "A página apresenta Q = m · c · ΔT, em que m é a massa da água, c é o calor específico da água (4.186 J/(kg·°C)) e ΔT é a temperatura desejada menos a inicial. Para converter joules em kWh, divide-se Q por 3.600.000."
  },
  {
    terms: ["potencia", "tempo", "intervalo", "btu", "24 h", "48 h", "72 h"],
    answer: "Para estimar a potência, a página orienta dividir a energia necessária pelo tempo: P = Q ÷ t. Em kW, divide-se a energia em kWh pelo tempo em horas; para converter kW em BTU/h, multiplica-se por 3.412. Menor tempo exige maior potência."
  },
  {
    terms: ["eficiencia", "cop", "resistencia", "trocador", "consumo eletrico", "eletrica"],
    answer: "A página diferencia energia térmica (calor absorvido pela água) de energia elétrica consumida pelo equipamento. O consumo depende da eficiência ou do COP: cita resistência elétrica com cerca de 98% de eficiência e trocador de calor com COP 5,0."
  },
  {
    terms: ["investimento", "custo", "escola publica", "viabilidade", "infraestrutura", "capa", "perdas", "solar"],
    answer: "A pesquisa sugere considerar equipamentos eficientes, como trocadores de calor ou aquecimento solar, planejar o aquecimento gradual, reduzir perdas com capas térmicas e avaliar tanto o custo de instalação quanto o custo contínuo de operação."
  },
  {
    terms: ["modelagem", "simulacao", "modelos", "hipotese", "fenomenos", "etapas"],
    answer: "A modelagem e a simulação representam fenômenos reais de forma simplificada, ajudam a testar hipóteses e permitem analisar cenários antes da aplicação prática. O processo apresentado é observar o problema, criar e testar modelos e avaliar os resultados."
  },
  {
    terms: ["video", "apresentacao"],
    answer: "A seção de vídeo está reservada para apresentar o desenvolvimento do projeto, as pesquisas, os conceitos estudados e a proposta."
  },
  {
    terms: ["conclusao", "fisica"],
    answer: "A conclusão destaca que a modelagem física ajuda a compreender e prever o comportamento de sistemas reais antes da implementação e permite aplicar princípios matemáticos e de balanço de energia ao estudo de sistemas de aquecimento."
  }
];

function normalizeText(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function answerFromSite(question) {
  const normalizedQuestion = normalizeText(question);
  let bestMatch = null;
  let bestScore = 0;

  siteKnowledge.forEach(entry => {
    const score = entry.terms.reduce((total, term) => {
      return total + (normalizedQuestion.includes(normalizeText(term)) ? 1 : 0);
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  });

  return bestMatch
    ? bestMatch.answer
    : "Desculpe, não encontrei essa informação no conteúdo do site. Posso ajudar com perguntas sobre o projeto, a piscina, a maquete, os cálculos de aquecimento ou a modelagem e simulação.";
}

function addChatMessage(text, className) {
  const message = document.createElement("div");
  message.className = `chat-message ${className}`;
  message.textContent = text;
  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function submitChatQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;
  addChatMessage(cleanQuestion, "user-message");
  addChatMessage(answerFromSite(cleanQuestion), "assistant-message");
}

chatForm.addEventListener("submit", event => {
  event.preventDefault();
  submitChatQuestion(chatInput.value);
  chatInput.value = "";
  chatInput.focus();
});

document.querySelectorAll(".chat-suggestions button").forEach(button => {
  button.addEventListener("click", () => submitChatQuestion(button.textContent));
});