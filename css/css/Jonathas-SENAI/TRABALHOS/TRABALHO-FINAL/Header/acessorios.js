const botao = document.getElementById('btnExplorar');

botao.addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollBy({
        top: 1200,          // ← aumente esse número para descer mais
        behavior: 'smooth'
    });
});

const btnTopo = document.getElementById('btn-topo');

if (btnTopo) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btnTopo.classList.add('visivel');
        } else {
            btnTopo.classList.remove('visivel');
        }
    });

    btnTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}