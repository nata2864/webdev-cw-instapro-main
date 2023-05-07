const personalKey = "bashirova_natalia";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;


export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации")
      }
      return response.json()
    })
    .then((data) => {
      return data.posts
    })
}

export function getUserPosts({ token, id }) {
  return fetch(postsHost + '/user-posts/' + id, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
  .then((response) => {
    if (response.status === 401) {
      throw new Error("Нет авторизации")
    }

    return response.json()
  })
  .then((data) => {
    return data.posts
  })
}

export function onAddPostClick({ description, imageUrl, token }) {
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      "description": description,
      "imageUrl": imageUrl,
    }),
  })
  .then((response) => {
    if (response.status === 401) {
      throw new Error("Нет авторизации")
    }

    return response.json()
  })
  .then((data) => {
    return data.posts
  })
}

export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует")
    }
    return response.json()
  })
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль")
    }
    return response.json()
  })
}

export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json()
  })
}

export function getLikeUser({ token, postId, isLiked }) {
  {
    return fetch(postsHost + `/${postId}${isLiked ? '/dislike' : '/like'}`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {    
      return response.json()
    })
  }
}

