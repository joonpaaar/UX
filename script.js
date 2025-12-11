(function(){
  'use strict';
  function getParam(name){
    const params = new URLSearchParams(window.location.search);
    return params.get(name) || '';
  }
  function sanitize(text){
    return text.replace(/\s+/g,' ').trim().toLowerCase();
  }
  function highlight(text, q){
    const esc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(esc, 'ig'), function(m){ return '<mark>'+m+'</mark>'; });
  }
  // Índice completo (ES)
  const indexES = [
    { url:'index.html', titulo:'Inicio', contenido:'Presentación personal de Jon. Universidad de Oviedo. Máster en Ingeniería Web.' },
    { url:'SobreMi.html', titulo:'Sobre mí', contenido:'Fútbol, San Mamés, Athletic Club, baloncesto, aficiones. Formación: Grado en Ingeniería Informática, Máster en Ingeniería Web. Experiencia en desarrollo web frontend. Accesibilidad y estándares.' },
    { url:'MiCiudad.html', titulo:'Mi ciudad', contenido:'Bilbao, Guggenheim, Zubizuri, ría del Nervión. Erandio, municipio, fiestas de San Agustín, ambiente vasco. Actividades turísticas.' },
    { url:'Contacto.html', titulo:'Contacto', contenido:'Jon Pardo. Correo: jon.pardo@uniovi.es. Teléfono. LinkedIn GitHub. Referencias académicas y profesionales. Dr. Enrique García, Dra. María Fernández, Carlos Martínez.' },
    { url:'Ayuda.html', titulo:'Ayuda', contenido:'Preguntas frecuentes. Cómo cambiar idioma. Cómo buscar. Formulario de comentarios y feedback.' },
    { url:'MapaSitio.html', titulo:'Mapa del sitio', contenido:'Estructura de navegación. Enlaces a todas las páginas: Inicio, Sobre mí, Mi ciudad, Ayuda, Mapa, Contacto, Buscar.' }
  ];
  // Índice completo (EN)
  const indexEN = [
    { url:'index-en.html', titulo:'Home', contenido:'Personal presentation of Jon. University of Oviedo. Web Engineering Master.' },
    { url:'AboutMe.html', titulo:'About me', contenido:'Football, San Mamés, Athletic Club, basketball, hobbies. Education: BSc Computer Engineering, MSc Web Engineering. Experience in web development frontend. Accessibility and standards.' },
    { url:'MyCity.html', titulo:'My city', contenido:'Bilbao, Guggenheim, Zubizuri, Nervión river. Erandio, municipality, San Agustín festivities, Basque atmosphere. Tourist activities.' },
    { url:'Contact.html', titulo:'Contact', contenido:'Jon Pardo. Email: jon.pardo@uniovi.es. Phone. LinkedIn GitHub. Academic and professional references. Dr. Enrique García, Dr. María Fernández, Carlos Martínez.' },
    { url:'Help.html', titulo:'Help', contenido:'Frequently asked questions. How to change language. How to search. Feedback form.' },
    { url:'Sitemap.html', titulo:'Sitemap', contenido:'Site structure. Links to all pages: Home, About me, My city, Help, Sitemap, Contact, Search.' }
  ];

  function renderResults(list, q){
    var ul = document.getElementById('resultados');
    var info = document.getElementById('resultadoInfo');
    if(!ul || !info) return;
    ul.innerHTML='';
    if(!q){
      info.textContent = document.documentElement.lang === 'en' 
        ? 'Type your query in the top search box and press Search.'
        : 'Introduce tu consulta en el cuadro superior y presiona Buscar.';
      return;
    }
    var nq = sanitize(q);
    var results = list.filter(function(item){
      return sanitize(item.titulo+ ' ' + item.contenido).indexOf(nq) !== -1;
    });
    if(results.length===0){
      info.textContent = document.documentElement.lang === 'en'
        ? 'No results found for "' + q + '".'
        : 'No se encontraron resultados para "' + q + '".';
      return;
    }
    info.textContent = (document.documentElement.lang === 'en' ? results.length + ' result(s)' : results.length + ' resultado(s)') + ' para "' + q + '"';
    results.forEach(function(r){
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = r.url;
      a.innerHTML = highlight(r.titulo, q);
      var p = document.createElement('p');
      p.innerHTML = highlight(r.contenido, q);
      li.appendChild(a);
      li.appendChild(p);
      ul.appendChild(li);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    var q = getParam('q');
    var lang = document.documentElement.lang || 'es';
    if(lang === 'en'){
      renderResults(indexEN, q);
    } else {
      renderResults(indexES, q);
    }
    var input = document.getElementById('q');
    if(input && q){ input.value = q; }
  });
})();
