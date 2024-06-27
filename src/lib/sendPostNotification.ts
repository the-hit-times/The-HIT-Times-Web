export const sendPostNotification = (
  title: string,
  body: string,
  imageUrl: string,
  postId: string | undefined = undefined
) => {
  fetch("/api/v1/sendnotification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body, imageURL: imageUrl, postId }),
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
    });
};
