

import { renderHeaderComponent } from "./header-component.js";
import { onAddPostClick } from "../api.js";
import { goToPage } from "../index.js";
import { POSTS_PAGE } from "../routes.js";
import { renderUploadImageComponent } from "./upload-image-component.js";


// Cтраницa добавления поста
export function renderAddPostPageComponent({ appEl, token }) {

// Обьявляtn переменную в которой будет загружаться ссылка на фото пользователя
let postImageUrl = '';

const render = () => {
// HTML разметка формы добавления поста 
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="form-inputs">       
          <div class="upload-image-container">
          </div>
          <label> Опишите фотографию:
            <textarea class="input textarea" rows="4"></textarea>
          </label>
          <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
    </div>
    `;

// Перерисовывает данные формы
appEl.innerHTML = appHtml;

// Рендерит кнопку Выберите фото
    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange: (newImageUrl) => postImageUrl = newImageUrl
    });

    document.getElementById("add-button").addEventListener("click", () => {
      const descriptionInput = document.querySelector('.input.textarea');
// Здесь проверяет что imageUrl не пустой       
     if (!postImageUrl) {
      alert('Добавьте изображение');
      return;
     }

      onAddPostClick({
        description: descriptionInput.value,
        imageUrl: postImageUrl,
        token: token,
      })
        .then(() => goToPage(POSTS_PAGE))
        .catch((error) => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });
    });

  };
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
   });

  render();
}
