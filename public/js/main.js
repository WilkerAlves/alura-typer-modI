var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();
  atualizaPlacar();
  $("#botao-reiniciar").click(reinicializaJogo);
  $('#usuarios').selectize({
    create: true,
    sortField: 'text'
  });
  $(".tooltip").tooltipster({
    trigger: "custom"
});
});

function atualizaTamanhoFrase(){
  var frase = $(".frase").text();
  var numFrase = frase.split(" ").length;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numFrase);
}

function inicializaContadores(){
  campo.on("input", function() {
    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(qtdPalavras);

    var qtdCaractere = conteudo.length
    $("#contador-caracteres").text(qtdCaractere);
  });
}

function inicializaCronometro(){
  campo.one("focus",function(){
    var tempoRestante = $("#tempo-digitacao").text();
    $("#botao-reiniciar").attr("disabled",true);
    var cronometroId = setInterval(function(){
      tempoRestante--;
      $("#tempo-digitacao").text(tempoRestante);
      if(tempoRestante < 1){
        clearInterval(cronometroId);
        finalizaJogo();
      }
    },1000);
  });
}

function finalizaJogo(){
  campo.attr("disabled",true);
  $("#botao-reiniciar").attr("disabled",false);
  campo.toggleClass("campo-desativado");
  inserePlacar();
}

function reinicializaJogo(){
  campo.attr("disabled",false);
  campo.val("");
  campo.toggleClass("campo-desativado");
  campo.removeClass("borda-verde");
  campo.removeClass("borda-vermelha");
  $("#contador-caracteres").text("0");
  $("#contador-palavras").text("0");
  $("#tempo-digitacao").text(tempoInicial);
  inicializaCronometro();
}

function inicializaMarcadores(){
  campo.on("input",function(){
    var frase = $(".frase").text();
      var digitado = campo.val();
      var comparavel = frase.substr(0, digitado.length);

      if(digitado == comparavel){
        campo.addClass("borda-verde");
        campo.removeClass("borda-vermelha");
      }else {
        campo.addClass("borda-vermelha");
        campo.removeClass("borda-verde");
      }
  });
}
