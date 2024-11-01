export const sendSubmissionEmail = async (email: string, name: string) => {
  const response = await fetch("/api/v1/recruitment/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      applicantEmail: email,
      applicantName: name,
    }),
  });
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};