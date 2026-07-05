const hoverS = document.getElementById("hoverS");
const clickS = document.getElementById("clickS");

function play(sound) {
    if (!sound) return;

    sound.currentTime = 0;
    sound.play().catch(() => {});
}

async function loadNews() {

    const container = document.getElementById("newsContainer");

    try {

const response = await fetch("news/news.json");

const text = await response.text();
console.log(text);

// Solo para probar
const news = JSON.parse(text);

        container.innerHTML = "";

        news.forEach((item, index) => {

            const article = document.createElement("article");
            article.className = "news-card";

            article.style.animationDelay = `${index * 120}ms`;

            article.innerHTML = `
                <img
                    src="${item.image}"
                    alt="${item.title}"
                    loading="lazy"
                >

                <h2>${item.title}</h2>

                <span>${item.date}</span>
            `;

            article.addEventListener("mouseenter", () => {
                play(hoverS);
            });

            container.appendChild(article);

        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <p style="
                grid-column:1/-1;
                text-align:center;
                font-size:22px;
                font-weight:bold;
            ">
                Failed to load news.
            </p>
        `;

    }

}

loadNews();
