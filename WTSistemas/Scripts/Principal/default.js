
var dados;

$(function () {
    
    //$('#xpgscript').remove();
    //$('#barra-xpg').remove();
    //$('.barrauol-bg').remove();
    //$($('body div')[0]).remove();
    //$('#google_flash_inline_div').remove();

    if (navigator.appName == "Microsoft Internet Explorer" && parseFloat($.browser.version) < 9) {
        $('#myModal').modal({
            show: true
        });
    }
});

function loadOptions(link, menu, idancora) {
    ///	<summary>
    ///	    Metodo para trocar as PartialView via AJAX.
    ///	</summary>
    ///	<param name="link" type="String">Caminho do método.</param>
    ///	<param name="menu" type="String">Identifica qual menu receberá o foco ao clicar.</param>
    ///	<param name="idancora" type="String">Rola a pagina até o idancora.</param>

    $.ajax({
        url: link,
        cache: false,
        statusCode: {
            404: function () {
                alert("Página não encontrada.");
            },
            500: function () {
                alert("Página não encontrada.");
            }
        }
    }).done(function (data) {

        ///Chama o metodo para aplicar o foco do menu
        loadMenu(menu);

        ///Prepara os dados transformando em uma partial view para ser colado na div $('.body-content')
        //prepararDados(data);

        if (navigator.appName == "Microsoft Internet Explorer" && parseFloat($.browser.version) < 9) {
            $('.body-content').html(data);

        }
        else {
            $('.body-content').fadeOut(200, 'linear', function () {
                $(this).html(data).fadeIn(200, 'linear', function () {
                    
                    if (idancora == null || idancora == undefined) idancora = "corpo";

                    $('html,body').animate({ scrollTop: $('#' + idancora).offset().top - 50 }, 1000);
                });
            });
        }
    });
}

function loadMenu(menu) {
    ///	<summary>
    ///	    Metodo para aplicar o foco no menu selecionado.
    ///	</summary>
    ///	<param name="menu" type="String">Nome do menu que receberá o foco ao clicar.</param>

    switch (menu) {
        case "home":
            $("#menu_link li").removeAttr("class");
            $("#menu_link li")[0].setAttribute("class", "active");
            //$("#menuRodape li")[0].setAttribute("class", "active");
            break;

        case "empresa":
            $("#menu_link li").removeAttr("class");
            $("#menu_link li")[1].setAttribute("class", "active");
            break;

        case "servicos":
            $("#menu_link li").removeAttr("class");
            $("#menu_link li")[2].setAttribute("class", "active");
            break;

        case "cotacao":
            $("#menu_link li").removeAttr("class");
            $("#menu_link li")[3].setAttribute("class", "active");
            break;

        case "contatos":
            $("#menu_link li").removeAttr("class");
            $("#menu_link li")[4].setAttribute("class", "active");
            break;

        default:
            $("#menu_link li").removeAttr("class");
            break;
    }
}

function prepararDados(data) {
    ///	<summary>
    ///	    Metodo para limpar e criar um  conteudo Partial view HTML1.
    ///	</summary>
    ///	<param name="data" type="String">Massa de dados que será limpa.</param>

    dados = "";

    if (data != undefined && data != "") {
        
        dados = data.replace("<!doctype html>", "");
        dados = dados.replace("<html>", "");
        dados = dados.replace("</html>", "");
        dados = dados.replace("<head>", "");
        dados = dados.replace("</head>", "");
        dados = dados.replace("<body>", "");
        dados = dados.replace("</body>", "");
        //dados = dados.substr(dados.indexOf("</div>") + 6);
        dados = dados.substr(dados.indexOf("corpo") - 9)

    }
}

function sendEmail() {

    var messageBody = "Texto do email";
    var msgTo = "thiago710@yahoo.com.br";
    var msgFrom = "thiago710@yahoo.com.br";
    var msgSubject = "Assunto do email";

    $.ajax({
        type: "POST",
        url: "/services/Mail.asmx/SendMail",
        cache: false,
        contentType: "application/json; charset=utf-8",
        data: "{ 'body':'" + messageBody + "'," +
                  "'to': '" + msgTo + "'," +
                  "'from': '" + msgFrom + "'," +
                  "'subject': " + msgSubject + "'" +
              "}",
        dataType: "json",
        complete: function (transport) {
            alert("Processado");

            alert(transport.status);

            if (transport.status == 200) $("#formcontainer").html("Success");
            else alert("Please try again later");
        }
    });
}

function analiseCampos(type) {
    ///	<summary>
    ///	    Metodo para apresentar um modal com todas as observações apontadas.
    ///	</summary>
    ///	<param name="type" type="String">variavel para o if case.</param>

    var texto = "";

    if (type == 'contatos') {

        if ($("#nome").val() == "" || $("#assunto").val() == "" || $("#email_cliente").val() == "") {
            
            if ($("#nome").val() == "") texto = "<br />É necessario informar um Nome.";
            if ($("#assunto").val() == "") texto += "<br />É necessario informar um Assunto.";
            if ($("#email_cliente").val() == "") texto += "<br />É necessario informar um Email.";

            $('.modal-body').html(texto);
            
            $('#myModal').modal({
                show: true
            });
        }
    }
    else {
        if ($("#nome").val() == "" || $("#observacoes").val() == "" || $("#email_cliente").val() == "") {

            if ($("#nome").val() == "") texto = "<br />É necessario informar um Nome.";            
            if ($("#email_cliente").val() == "") texto += "<br />É necessario informar um Email.";
            if ($("#observacoes").val() == "") texto += "<br />É necessario informar as Observações.";

            $('.modal-body').html(texto);

            $('#myModal').modal({
                show: true
            });
        }
    }

}