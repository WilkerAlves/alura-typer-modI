$(".botao-remover").click(removeLinha);
$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizarPlacar);

function inserePlacar(){
  var placar = $(".placar");
  var corpoTabela = placar.find("table");
  var usuario = $("#usuarios").val();
  var numPalavras = $("#contador-palavras").text();

  var linha = insereLinha(usuario,numPalavras);
  linha.find(".botao-remover").click(removeLinha);

  corpoTabela.prepend(linha);

  $(".placar").slideDown(500);
  scrollPlacar();

}

function scrollPlacar(){
  var posicaoDoPlacar = $(".placar").offset().top;

  $("body").animate(
  {
    scrollTop: posicaoDoPlacar+"px"

  }, 1000);
}


function insereLinha(usuario,palavras){
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(palavras);
  var colunaRemover = $("<td>");

  var link = $("<a>").attr("href","#").addClass("botao-remover");
  var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

  link.append(icone);

  colunaRemover.append(link);

  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}

function removeLinha(event) {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setInterval(function(){
      linha.remove();
    },1000);
}

function mostraPlacar(){
  $(".placar").stop().slideToggle(600);
}

function sincronizarPlacar(){
  var placar = [];
  var linhas = $("tbody>tr");
  linhas.each(function(){
    var usuario = $(this).find("td:nth-child(1)").text();
    var palavras = $(this).find("td:nth-child(2)").text();

    var score = {
      usuario: usuario,
      pontos: palavras
    };

    placar.push(score);
  });

  dados = {
    placar : placar
  }

  $.post("http://localhost:3000/placar", dados , function() {
    console.log("Placar sincronizado com sucesso");
    $(".tooltip").tooltipster("open");
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");
    }).always(function(){
        setTimeout(function() {
        $(".tooltip").tooltipster("close");
    }, 1200);
    });

}

function atualizaPlacar() {
  $.get("http://localhost:3000/placar",function(data){
    $(data).each(function(){
      var linha = insereLinha(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removeLinha);
      $("tbody").append(linha);
    });
  });
}
