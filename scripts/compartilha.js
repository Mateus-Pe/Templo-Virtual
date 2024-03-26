var searchParams = new URLSearchParams(window.location.search);
descricao = searchParams.get("a");
url = searchParams.get("b");
imagem = searchParams.get("c");
console.log(descricao);
console.log(url);
console.log(imagem);
atualizarMetaTagsOG(descricao,url,imagem);

function atualizarMetaTagsOG(description, url, imageUrl) {
  var ogDescriptionTag = document.querySelector('meta[property="og:description"]');
  var ogUrlTag = document.querySelector('meta[property="og:url"]');
  var ogImageTag = document.querySelector('meta[property="og:image"]');

  if (ogDescriptionTag) {
      ogDescriptionTag.setAttribute('content', description);
  }
  if (ogUrlTag) {
      ogUrlTag.setAttribute('content', url);
  }
  if (ogImageTag) {
      ogImageTag.setAttribute('content', imageUrl);
  }
}



