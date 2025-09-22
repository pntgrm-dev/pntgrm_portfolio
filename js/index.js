document.addEventListener("DOMContentLoaded", () => {
    fetch('partials/header.html').then(response => response.text()).then(html => {
        document.getElementById('header').innerHTML = html;
    }).catch(err => console.error('ヘッダーの読み込みエラー:', err));

    fetch('partials/footer.html').then(response => response.text()).then(html => {
        document.getElementById('footer').innerHTML = html;
    }).catch(err => console.error('フッターの読み込みエラー:', err));

    fetch("json/main.json")
        .then(response => {
            if (!response.ok) throw new Error('ネットワークエラー');
            return response.json();
        })
        .then(data => {
            console.log("JSONデータ:", data);

            const mainContent = document.getElementById("main_content"); // ★正しいIDを使用

            if (Array.isArray(data)) {
                data.forEach(work => {
                    const workElement = document.createElement('div');
                    workElement.className = 'work-item';
                    workElement.innerHTML = `
                        <img src="${work.image}" alt="${work.title}" class="content_box">
                        <div class="title">
                            <h2 class="content_title">${work.title}</h2>
                            <p class="content_year">制作年: ${work.year}</p>
                            <p class="content_category">カテゴリ: ${work.category}</p>
                            <p class="content_description">${work.description}</p>
                        </div>
                    `;
                    mainContent.appendChild(workElement);
                });
            } else {
                console.error("JSONデータが配列ではありません。");
            }
        })
        .catch(error => {
            console.error("JSON読み込みエラー:", error);
            document.getElementById("main_content").innerHTML = "<p>作品情報を読み込めませんでした。</p>";
        });
});

fetch('json/main.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });