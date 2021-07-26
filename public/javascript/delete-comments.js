async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.replace("/dashboard/user-comments/");
  } else {
    alert(response.statusText);
  }
}
document
  .querySelector("#delete-comments-btn")
  .addEventListener("click", deleteFormHandler);
