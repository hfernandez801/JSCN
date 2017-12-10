function validateGame() {
    var forgeryId = $("#forgeryToken").val();
    $.ajax({
        type: "POST",
        url: route('InstructionsGame/ValidateGame'),
        data: null,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            'VerificationToken': forgeryId
        },
        success: function (response) {
			response.status = 1;
			
            if (response.status === 2) {
                //$("#mensaje-ap-modal--saturated").text(response.content);
                //$("#ap-modal--no-game").addClass("ap-modal--is-visible");
                //$('body').on('click touchstart', 'article.ap-modal--no-game', function () {
                //    $(this).removeClass("ap-modal--is-visible");
                //});
                //showMessage(response.content);
                $("#mensaje-ap-modal--nogame").text("Ya has recibido un beneficio hoy, participa otro día.");
                $("#ap-modal--no-game").addClass("ap-modal--is-visible ap-modal--benefit");
                //$('body').on('click touchstart', 'article.ap-modal--no-game', function () {
                //    $(this).removeClass("ap-modal--is-visible");
                    
                //});
            } else if (response.status === 3) {
                $("#ap-modal--no-game").addClass("ap-modal--is-visible");
                //$('body').on('click touchstart', 'article.ap-modal--no-game', function () {
                //    $(this).removeClass("ap-modal--is-visible");
                //});
                //location.href = response.url;
            } else if (response.status === 1) {
                dataLayer.push({ 'event': 'game', 'juego': 'juego del día' + response.url  });
                //showMessage("Redirect 1 o 4");
                location.href = route(response.url);
            } else if (response.status === 4) {
                $("#mensaje-ap-modal--nogame").text("Lo sentimos, se han agotado los beneficios.");
                $("#ap-modal--no-game").addClass("ap-modal--is-visible  ap-modal--benefit");
                //$('body').on('click touchstart', 'article.ap-modal--no-game', function () {
                //    $(this).removeClass("ap-modal--is-visible");
                    
                //});
                //showMessage(response.content);
            }
            
        },
        error: function (error) {
            alertify.alert("Por favor comprueba tu conexión a internet.");
            location.reload();
        }
    });
}

function validateGameWhitinData() {
    var forgeryId = $("#forgeryToken").val();
    $.ajax({
        type: "POST",
        url: route('InstructionsGame/ValidateGameWithinData'),
        data: null,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            'VerificationToken': forgeryId
        },
        success: function (response) {

            if (response.status === 2) {
                showMessage(response.content);
            } else if (response.status === 3) {
                //showMessage("Redirect 3");
                location.href = route(response.url);
            } else if (response.status === 1) {
                dataLayer.push({ 'event': 'game', 'juego': response.url });
                //showMessage("Redirect 1 o 4");
                location.href = route(response.url);
            } else if ( response.status === 4) {
                showMessage(response.content);
            }

        },
        error: function (error) {
            alertify.alert("Por favor comprueba tu conexión a internet.");
            location.reload();
        }
    });
}




