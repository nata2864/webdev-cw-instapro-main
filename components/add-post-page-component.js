export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
      <h3 class="form-title">Добавить пост</h3>
      <div class="form-inputs">
      <div class="upload-image-conrainer">
      <div class="upload-image">
      <label class="file-upload-label secondary-button">
      <input type="file" class="file-upload-input" style="display:none">
      Выберите фото
      </label>
      </div>
      </div>
      <label>
      Опишите фотографию:
      <textarea class="input textarea" rows="4"></textarea>
      </label>
      </div>
      <button class="button" id="add-button">Добавить</button>
      </div> 
    </div>
  `;

    appEl.innerHTML = appHtml;

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",
      });
    });
  };

  render();


renderHeaderComponent({
  element: document.querySelector(".header-container"),
});

for (let userEl of document.querySelectorAll(".post-header")) {
  userEl.addEventListener("click", () => {
    goToPage(USER_POSTS_PAGE, {
      userId: userEl.dataset.userId,
    });
  });
}
}
