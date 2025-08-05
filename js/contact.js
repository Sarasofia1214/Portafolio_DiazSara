document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector('input[placeholder="Full Name"]').value;
    const email = form.querySelector('input[placeholder="Email Address"]').value;
    const subject = form.querySelector('input[placeholder="Subject"]').value;
    const message = form.querySelector('textarea').value;

    const data = { name, email, subject, message };

    try {
      const response = await fetch("http://localhost:3000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.success) {
        alert("Mensaje enviado con éxito.");
        form.reset();
      } else {
        alert("Error al enviar el mensaje.");
      }
    } catch (err) {
      alert("Error al conectar con el servidor.");
      console.error(err);
    }
  });
});
