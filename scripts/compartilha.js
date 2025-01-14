var searchParams = new URLSearchParams(window.location.search);
descricao = searchParams.get("a");
dataFeed = searchParams.get("b");
imagem = searchParams.get("c");
console.log(descricao);
console.log(imagem);
atualizarMetaTagsOG(descricao,imagem);

function atualizarMetaTagsOG(description, imageUrl) {
  var ogDescriptionTag = document.querySelector('meta[property="og:description"]');
  var ogImageTag = document.querySelector('meta[property="og:image"]');

  if (ogDescriptionTag) {
      ogDescriptionTag.setAttribute('content', description);
  }
  //if (ogUrlTag) {
      //ogUrlTag.setAttribute('content', url);
  //}
  if (ogImageTag) {
      ogImageTag.setAttribute('content', imageUrl);
  }
}