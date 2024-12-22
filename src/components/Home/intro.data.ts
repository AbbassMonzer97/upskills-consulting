export const postEmail = async (email: string) => {
  try {
    const response = await fetch("http://localhost:1337/api/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email, // Send the email as part of the request body
      }),
    });

    if (!response.ok) {
      throw new Error(`Something Went Wrong: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
