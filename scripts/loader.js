(function ($) {
    $(document).ready(function () {
        // Adiciona o HTML do loader ao body quando o documento estiver pronto
        var loaderHTML = `
            <div id="loadingOverlay">
                <div class="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        $('body').append(loaderHTML);

        // Cache o elemento do loader
        var $loaderOverlay = $('#loadingOverlay');

        // Função para mostrar o loader
        function showLoader() {
            $loaderOverlay.addClass('show');
            $('body').css('overflow', 'hidden');
        }

        // Função para esconder o loader
        function hideLoader() {
            $loaderOverlay.removeClass('show');
            $('body').css('overflow', 'auto');
        }

        // Expor as funções do loader ao jQuery
        $.showLoader = showLoader;
        $.hideLoader = hideLoader;

        $(document).ajaxStart(function () {
            $.showLoader();
        });

        $(document).ajaxStop(function () {
            $.hideLoader();
        });
    });
})(jQuery);
