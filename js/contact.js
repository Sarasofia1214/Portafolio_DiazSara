(function() {
  emailjs.init("ySGzjffssxaBLhDiP"); 
})();

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_tk38ipg", "template_kamxoay", this)
    .then(() => {
      this.reset();
    })
    .catch((error) => {
      alert(JSON.stringify(error));
    });
});
