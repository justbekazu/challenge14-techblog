async function editFormHandler(event) {
  event.preventDefault();

  const comments_text = document
    .querySelector('input[name="comment-content"]')
    .value.trim();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      comments_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/dashboard/user-comments/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-comment")
  .addEventListener("submit", editFormHandler);
