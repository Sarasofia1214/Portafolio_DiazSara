// Cargar librería de EmailJS
(function() {
  emailjs.init("ySGzjffssxaBLhDiP"); // 🔹 Reemplaza con tu Public Key
})();

// Escuchar el envío del formulario
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_tk38ipg", "template_kamxoay", this)
    .then(() => {
      alert("✅ Mensaje enviado con éxito");
      this.reset();
    })
    .catch((error) => {
      alert("❌ Error al enviar: " + JSON.stringify(error));
    });
});
