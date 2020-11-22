$("#about-card-btn").click(function() {
  if ($(this).text() == "+") {
  	$("#about-container").css("height", "auto");
  	$("#about-container").css("visibility", "visible");
  } else {
  	$("#about-container").css("height", "1px");
  	$("#about-container").css("visibility", "hidden");
  }
  if ($(this).text() == "+") {
  	$(this).text("-");
  } else {
  	$(this).text("+");
  }
});

$("#faq-card-btn").click(function() {
  if ($(this).text() == "+") {
  	$("#faq-container").css("height", "auto");
  	$("#faq-container").css("visibility", "visible");
  } else {
  	$("#faq-container").css("height", "1px");
  	$("#faq-container").css("visibility", "hidden");
  }
  if ($(this).text() == "+") {
  	$(this).text("-");
  } else {
  	$(this).text("+");
  }
});

$("#about-card-btn").click();