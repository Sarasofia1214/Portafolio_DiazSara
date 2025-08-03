document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Previene envío real por ahora

    const name = form.querySelector('input[placeholder="Full Name"]').value.trim();
    const email = form.querySelector('input[placeholder="Email Address"]').value.trim();
    const subject = form.querySelector('input[placeholder="Subject"]').value.trim();
    const message = form.querySelector('textarea').value.trim();

    if (!name || !email || !subject || !message) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    

    // Puedes reemplazar esto por un fetch() si quieres conectarlo a un backend
    form.reset();
  });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
