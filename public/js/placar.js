function inserePlacar(){
  var placar = $(".placar");
  var corpoTabela = placar.find("table");
  var usuario = "wilker";
  var numPalavras = $("#contador-palavras").text();

  var linha = insereLinha(usuario,numPalavras);
  linha.find(".botao-remover").click(removeLinha);

  corpoTabela.prepend(linha);
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

function removeLinha() {
    event.preventDefault();
    $(this).parent().parent().remove();
}
