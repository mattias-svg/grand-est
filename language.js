(() => {
  const translations = {
    "La regione":"La région","Patrimonio":"Patrimoine","Gastronomia":"Gastronomie",
    "FRANCIA · NORD-EST":"FRANCE · NORD-EST","Benvenuti":"Bienvenue","nel ":"dans le ",
    "Una regione ricca di carattere, tra paesaggi, storia e tradizioni. Scopri il territorio che unisce tre antiche regioni francesi.":"Une région pleine de caractère, entre paysages, histoire et traditions. Découvrez ce territoire qui réunit trois anciennes régions françaises.",
    "Scopri la regione ":"Découvrir la région ","10 dipartimenti · 1 regione · mille scoperte":"10 départements · 1 région · mille découvertes",
    "01 — ALLA SCOPERTA":"01 — À LA DÉCOUVERTE","Una regione":"Une région","dai ":"aux ","mille volti":"mille visages",
    "Il ":"Le "," si trova nel nord-est della Francia. È una regione ricca di paesaggi, culture e tradizioni, nata dall'unione di tre territori storici: ":" se situe dans le nord-est de la France. C'est une région riche en paysages, cultures et traditions, née de l'union de trois territoires historiques : ",
    "Alsazia":"Alsace","Champagne-Ardenne":"Champagne-Ardenne","Lorena":"Lorraine",
    "Il suo capoluogo è ":"Sa capitale régionale est ","città conosciuta per la sua cattedrale, il centro storico e le istituzioni europee.":"ville connue pour sa cathédrale, son centre historique et les institutions européennes.",
    "Capoluogo regionale":"Capitale régionale","Paese di appartenenza":"Pays","Un territorio, tante identità.":"Un territoire, tant d'identités.","Continua il viaggio alla scoperta del Grand Est.":"Poursuivez votre découverte du Grand Est.",
    "Scoprire · Conoscere · Assaporare":"Découvrir · Comprendre · Savourer",
    "02 — STORIA E PAESAGGI":"02 — HISTOIRE ET PAYSAGES","Un patrimonio":"Un patrimoine","da esplorare":"à explorer",
    "Dai borghi colorati dell'Alsazia alle montagne dei Vosgi: il Grand Est custodisce tesori naturali e culturali.":"Des villages colorés d'Alsace aux montagnes des Vosges : le Grand Est abrite des trésors naturels et culturels.",
    "Tradizioni · Architettura · Natura":"Traditions · Architecture · Nature","I LUOGHI DA SCOPRIRE":"LES LIEUX À DÉCOUVRIR",
    "Tra città":"Entre villes","e ":"et ","grandi spazi":"grands espaces",
    "Il Grand Est offre una grande varietà di luoghi da visitare. I ":"Le Grand Est offre une grande variété de lieux à visiter. Les ",
    "villaggi alsaziani":"villages alsaciens"," sono famosi per le case colorate a graticcio, le strade fiorite e le piazze caratteristiche.":" sont célèbres pour leurs maisons à colombages colorées, leurs rues fleuries et leurs places typiques.",
    "Le città storiche, come ":"Les villes historiques, comme ",", conservano edifici importanti e centri antichi ricchi di fascino.":", conservent des édifices remarquables et des centres anciens pleins de charme.",
    "I villaggi Alsaziani":"Les villages alsaciens","NATURA E CULTURA":"NATURE ET CULTURE","La natura dei Vosgi":"La nature des Vosges",
    "Castelli, foreste":"Châteaux, forêts","e tradizioni":"et traditions",
    "La regione è attraversata da ":"La région est parcourue de ","foreste":"forêts",", laghi e montagne. Il massiccio dei ":", de lacs et de montagnes. Le massif des ","Vosgi":"Vosges"," è ideale per passeggiate ed escursioni durante tutto l'anno.":" est idéal pour les promenades et les randonnées tout au long de l'année.",
    "Il patrimonio comprende anche ":"Le patrimoine comprend également des ","castelli":"châteaux",", cattedrali e monumenti storici. In inverno, i tradizionali ":" , des cathédrales et des monuments historiques. En hiver, les traditionnels ",
    "mercatini di Natale":"marchés de Noël"," animano molte città e attirano visitatori da tutta Europa.":" animent de nombreuses villes et attirent des visiteurs de toute l'Europe.",
    "La storia vive in ogni angolo.":"L'histoire est présente à chaque coin de rue.","Il Grand Est tra cultura, architettura e natura.":"Le Grand Est entre culture, architecture et nature.",
    "03 — SAPORI E TRADIZIONI":"03 — SAVEURS ET TRADITIONS","A tavola nel":"À table dans le",
    "Una cucina generosa e conviviale, dove le ricette tradizionali raccontano la storia e l'identità del territorio.":"Une cuisine généreuse et conviviale, où les recettes traditionnelles racontent l'histoire et l'identité du territoire.",
    "LE SPECIALITÀ REGIONALI":"LES SPÉCIALITÉS RÉGIONALES","Tre sapori":"Trois saveurs","da conoscere":"à découvrir",
    "La gastronomia del Grand Est unisce influenze francesi e tradizioni locali. Ecco tre specialità da scoprire, dall'antipasto al dolce.":"La gastronomie du Grand Est associe influences françaises et traditions locales. Voici trois spécialités à découvrir, de l'entrée au dessert.",
    "Il Grand Est: una regione da assaporare.":"Le Grand Est : une région à savourer.","Tradizione e gusto in ogni ricetta.":"Tradition et saveur dans chaque recette.",
    "Torna alla prima pagina":"Retour à la page d'accueil"
  };
  const reverse = Object.fromEntries(Object.entries(translations).map(([it, fr]) => [fr, it]));
  const apply = (lang) => {
    const dict = lang === "fr" ? translations : reverse;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const raw = node.nodeValue;
      const trimmed = raw.trim();
      if (dict[trimmed]) node.nodeValue = raw.replace(trimmed, dict[trimmed]);
    }
    document.documentElement.lang = lang;
    const button = document.querySelector(".language-switch");
    if (button) {
      button.querySelectorAll("button").forEach(b => {
        b.classList.toggle("selected", b.dataset.lang === lang);
        b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
      });
      button.setAttribute("aria-label", lang === "it" ? "Seleziona la lingua" : "Choisir la langue");
    }
    const titles = {it:["Grand Est — La regione","Grand Est — Patrimonio","Grand Est — Gastronomia"],fr:["Grand Est — La région","Grand Est — Patrimoine","Grand Est — Gastronomie"]};
    const file = location.pathname.split("/").pop();
    const idx = file === "patrimonio.html" ? 1 : file === "gastronomia.html" ? 2 : 0;
    document.title = titles[lang][idx];
    localStorage.setItem("grand-est-language", lang);
  };
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".language-switch button").forEach(b => b.addEventListener("click", () => apply(b.dataset.lang)));
    apply(localStorage.getItem("grand-est-language") || "it");
  });
})();