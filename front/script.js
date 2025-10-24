
const START_TEXT =
  "Нажми на кнопку что бы начать необратимый процесс...";


const INTRO_TEXT =
  "Если бы мне дали возможность говорить о твоей красоте, это был бы очень долгий монолог. Ты прекрасна, сильна и умна. Я счастлив что именно ты со мной. Я буду стараться хранить твое сердце, оберегать тебя, помогать и радовать. И к большому счастью, я понимаю что ты готова делать то же. Спасибо тебе! Мы с тобой большие молодцы!"

const QUIZ_INTRO_TEXT =
  "А ведь мы с тобой знакомы уже как год, а вместе уже как пол года. Вот так да... Пол года вместе, мы уже прошли многое! Были и плохие и хорошие моменты. Были и слезы  и радость , но ведь на это мы и люди. Мы учимся, растем, мы не стоим на месте. Мы шагаем в будущее, мы не знаем что там, но ведь прекрасно то что мы шагаем поддерживая друг друга! Лина, я действительно тебе неймоверно благодарен за то, что ты есть, за твою поддержку, ты настоящий мой лучик солнца, нет, ты и есть мое солнце.";

const FASTAPI_URL = "https://formylove-omso.onrender.com";
let ballsPopped = { 1: false, 2: false, 3: false };

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


async function typeText(elementId, fullText, buttonId, delay = 50) { 
  const element = document.getElementById(elementId);
  if (!element) return;

  const targetBtn = document.getElementById(buttonId); 
  
  if (targetBtn) {
      targetBtn.disabled = true; 
      targetBtn.classList.add("opacity-50", "cursor-not-allowed");
      targetBtn.classList.remove("hover:bg-pink-700", "hover:bg-red-700");
  }
  
  element.textContent = ''; 

  for (let i = 0; i < fullText.length; i++) {
    element.textContent += fullText[i];
    await sleep(delay);
  }

  if (targetBtn) {
      targetBtn.disabled = false;
      targetBtn.classList.remove("opacity-50", "cursor-not-allowed");

      targetBtn.classList.add(targetBtn.id === 'quiz-btn' ? "hover:bg-red-700" : "hover:bg-pink-700"); 
  }
}


function showStage(stageId) {

    document.querySelectorAll("#content > div").forEach((div) => {
        div.classList.add("hidden");
    });
    

    document.getElementById(stageId).classList.remove("hidden");


    if (stageId === 'stage-intro') {

        typeText("typing-area", INTRO_TEXT, "intro-btn", 40); 
    } else if (stageId === 'stage-quiz') {

        typeText("quiz-intro-area", QUIZ_INTRO_TEXT, "quiz-btn", 30); 
    }
}


function startQuestAndMusic() {
    const music = document.getElementById('background-music');
    

    if (music && music.muted) {
        music.muted = false;
        music.play().catch(e => console.warn("Музыка не запустилась.", e));
    }


    document.getElementById('start-music').classList.add('hidden');
    showStage('stage-intro'); 
}

function checkQuiz() {

    
    showStage("stage-balls"); 
}

function popBall(id) {
    if (ballsPopped[id]) return;

    const ball = document.getElementById(`ball-${id}`);
    const ballText = document.getElementById("ball-text");
    const nextBtn = document.getElementById("balls-next-btn");

    ball.classList.remove("bg-red-600");
    ball.classList.add("bg-pink-700", "opacity-50");
    ballsPopped[id] = true;

    const messages = {
        1: "Ты даришь мне радость каждый день.",
        2: "Я ценю каждую секунду, проведенную вместе.",
        3: "Будущее с тобой - моя самая большая мечта.",
    };

    ballText.innerText = messages[id];

    if (Object.values(ballsPopped).every((isPopped) => isPopped)) {
        nextBtn.disabled = false;
        nextBtn.classList.remove(
            "bg-gray-500",
            "opacity-50",
            "cursor-not-allowed"
        );
        nextBtn.classList.add("bg-red-600", "hover:bg-red-700");
    }
}

async function sendInvitation() {
  const emailInput = document.getElementById("email-input");
  const sendBtn = document.getElementById("send-btn");
  const messageBox = document.getElementById("message-box");
  const email = emailInput.value.trim();

  messageBox.classList.add("hidden");
  messageBox.classList.remove("bg-green-800", "bg-red-800");

  if (!email) {
    messageBox.innerText = "Пожалуйста, введи email!";
    messageBox.classList.add("bg-red-800", "text-white");
    messageBox.classList.remove("hidden");
    return;
  }

  sendBtn.disabled = true;
  sendBtn.innerText = "Отправка... 💌";

  try {

    const payload = { email: email };


    const response = await fetch(`${FASTAPI_URL}/send-invitation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      messageBox.innerText =
        'Успех! Письмо с официальным приглашением отправлено на твою почту! Проверь папку "Спам" на всякий случай.';
      messageBox.classList.add("bg-green-800", "text-white");
      emailInput.disabled = true;
    } else {

      const errorDetail = result.detail || "Произошла ошибка на сервере.";
      messageBox.innerText = `Ошибка при отправке: ${errorDetail}`;
      messageBox.classList.add("bg-red-800", "text-white");
      sendBtn.disabled = false;
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    messageBox.innerText =
      "Не удалось связаться с сервером. Убедись, что бэкенд запущен (uvicorn).";
    messageBox.classList.add("bg-red-800", "text-white");
    sendBtn.disabled = false;
  } finally {
    messageBox.classList.remove("hidden");
    if (sendBtn.disabled === false) {
      sendBtn.innerText = "💌 Отправить Приглашение!";
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
    showStage("start-music");
    

    typeText("start-text-area", START_TEXT, "start-btn", 40); 
});

const HEART_TYPES = [
  { symbol: "💖", color: "text-pink-500" },
  { symbol: "❤️", color: "text-red-600" },
  { symbol: "🤍", color: "text-gray-300" },
  { symbol: "💕", color: "text-pink-400" },
  { symbol: "💋", color: "text-red-600" },
  { symbol: "💌", color: "text-red-500" },
  { symbol: "❤️‍🔥", color: "text-red-400" },
  { symbol: "💙", color: "text-blue-400" },
  { symbol: "💚", color: "text-green-400" },
  { symbol: "💜", color: "text-purple-400" },
  { symbol: "✨", color: "text-yellow-300" },
  { symbol: "🩶", color: "text-gray-500" },
  { symbol: "❲❤❳", color: "text-red-300" },
  { symbol: "💛", color: "text-yellow-300" },
];

function createHeart() {
  const randomIndex = Math.floor(Math.random() * HEART_TYPES.length);
  const selectedHeart = HEART_TYPES[randomIndex];

  const heart = document.createElement("div");
  heart.classList.add("heart", "absolute");

  heart.classList.add(selectedHeart.color);

  heart.innerHTML = selectedHeart.symbol;

  const size = Math.random() * 20 + 10;
  const duration = Math.random() * 10 + 5;
  const left = Math.random() * 100;

  heart.style.fontSize = `${size}px`;
  heart.style.left = `${left}vw`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.animationDelay = `-${Math.random() * 5}s`;

  document.getElementById("heart-container").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

setInterval(createHeart, 1300);