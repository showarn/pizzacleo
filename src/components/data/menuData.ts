export interface MenuItem {
  name: string;
  ingredients: string;
  price: number;
  group: string;
}

const menuItems: MenuItem[] = [
  // Meny 1 (90 kr)
  { name: "MARGHERITA", ingredients: "ost", price: 90, group: "Meny 1" },
  { name: "VESUVIO", ingredients: "skinka, ost", price: 90, group: "Meny 1" },
  { name: "ALFUNGHI", ingredients: "tonfisk, lök", price: 90, group: "Meny 1" },
  { name: "BOLOGNESE", ingredients: "köttfärssås, lök", price: 90, group: "Meny 1" },
  { name: "NAPOLI", ingredients: "champinjoner", price: 90, group: "Meny 1" },

  // Meny 2 (95 kr)
  { name: "HAWAII", ingredients: "skinka, ananas", price: 95, group: "Meny 2" },
  { name: "CACCIATORE", ingredients: "salami, lök", price: 95, group: "Meny 2" },
  { name: "INGMAR", ingredients: "bacon, lök, svartpeppar", price: 95, group: "Meny 2" },
  { name: "FEFERONI", ingredients: "skinka, peperoni", price: 95, group: "Meny 2" },
  { name: "BUSSOLA", ingredients: "skinka, räkor", price: 95, group: "Meny 2" },
  { name: "OPERA", ingredients: "skinka, tonfisk", price: 95, group: "Meny 2" },
  { name: "LAGUNA", ingredients: "tonfisk, räkor", price: 95, group: "Meny 2" },
  { name: "MARINARA", ingredients: "räkor, musslor", price: 95, group: "Meny 2" },
  { name: "ROMANTICA", ingredients: "skinka, skivade tomater", price: 95, group: "Meny 2" },
  { name: "CAPRICCIOSA", ingredients: "skinka, champ.", price: 95, group: "Meny 2" },
  { name: "PEPPERONI", ingredients: "ost, lök, pepperoni", price: 95, group: "Meny 2" },

  // Inbakade pizzor
  { name: "CALZONE", ingredients: "skinka", price: 95, group: "Inbakade pizzor" },
  { name: "CALZONE CAPRI", ingredients: "skinka, champ.", price: 100, group: "Inbakade pizzor" },
  { name: "CALZONE BOLOGNESE", ingredients: "skinka, köttfärs", price: 100, group: "Inbakade pizzor" },
  { name: "CALZONE COLESSO", ingredients: "köttfärs, champ.", price: 100, group: "Inbakade pizzor" },
  { name: "CALZONE SPEC.", ingredients: "skinka, champ., räkor", price: 110, group: "Inbakade pizzor" },

  // Meny 3 (100 kr)
  { name: "BELLA", ingredients: "skinka, räkor, champ.", price: 100, group: "Meny 3" },
  { name: "VEGETARIAN", ingredients: "lök, paprika, tomater, peperoni, champ.", price: 100, group: "Meny 3" },
  { name: "BANANA", ingredients: "skinka, banan, curry", price: 100, group: "Meny 3" },
  { name: "CASA MIA", ingredients: "skinka, champ., lök, paprika", price: 100, group: "Meny 3" },
  { name: "POMPEI", ingredients: "räkor, musslor, tonfisk", price: 100, group: "Meny 3" },
  { name: "GONDOL", ingredients: "skinka, räkor, tonfisk", price: 100, group: "Meny 3" },
  { name: "CASA BELLA", ingredients: "skinka, salami, lök", price: 100, group: "Meny 3" },
  { name: "TORINO", ingredients: "salami, köttfärs, lök", price: 100, group: "Meny 3" },

  // Meny 4 (110 kr)
  { name: "QUATTRO STAGIONI", ingredients: "skinka, räkor, musslor, champ.", price: 110, group: "Meny 4" },
  { name: "QUATTRO STAGIONI SPEC.", ingredients: "skinka, champ., räkor, musslor, kronärtskocka", price: 110, group: "Meny 4" },
  { name: "MAMMA MIA", ingredients: "skinka, räkor, champ., paprika", price: 110, group: "Meny 4" },
  { name: "TROPICAL", ingredients: "räkor, ananas, banan, curry", price: 110, group: "Meny 4" },
  { name: "SEA", ingredients: "räkor, musslor, crabfish", price: 110, group: "Meny 4" },
  { name: "O SOLE MIO", ingredients: "skinka, räkor, crabfish", price: 110, group: "Meny 4" },
  { name: "VEGABONDO", ingredients: "skinka, räkor, lök, b.sås", price: 110, group: "Meny 4" },
  { name: "SORRENTO", ingredients: "köttfärs, lök, jalapeño, champ.", price: 110, group: "Meny 4" },
  { name: "CLEOPATRA", ingredients: "köttfärs, bacon, champ., lök", price: 110, group: "Meny 4" },

  // Meny 5 (110 kr)
  { name: "MONTE CARLO", ingredients: "salami, bacon, köttfärssås, lök", price: 110, group: "Meny 5" },
  { name: "VIKING", ingredients: "salami, bacon, lök, vitlök, oliver", price: 110, group: "Meny 5" },
  { name: "CIAO CIAO", ingredients: "salami, bacon, lök, paprika, tabasco", price: 110, group: "Meny 5" },
  { name: "ROMA", ingredients: "bacon, köttfärssås, champ., lök, paprika, tabasco", price: 110, group: "Meny 5" },
  { name: "PALERMO", ingredients: "kyckling, banan, curry", price: 110, group: "Meny 5" },
  { name: "KEBABPIZZA", ingredients: "kebabkött, lök, peperoni, tomater, vitlöksås", price: 110, group: "Meny 5" },
  { name: "KEBABPIZZA SPEC.", ingredients: "kebabkött, lök, peperoni, tomater, b.sås (halv inb)", price: 110, group: "Meny 5" },
  { name: "COLOMBO", ingredients: "kycklingbitar, champ., curry, svart peppar", price: 110, group: "Meny 5" },
  { name: "BÅTPIZZA", ingredients: "kebabkött, lök, tomater, gurka, feferoni, isbergssallad, vitlöksås", price: 120, group: "Meny 5" },
  { name: "ENJOY SPEC.", ingredients: "skinka, champ., köttfärs, oliver, paprika, salladsost", price: 120, group: "Meny 5" },
  { name: "VEGETARIAN SPEC.", ingredients: "sparris, champ., majs, lök, ananas, banan, paprika, tomater, jalapeño, peperoni, kronärtskock", price: 120, group: "Meny 5" },

  // Mexikanska pizzor (110 kr)
  { name: "MEXICANA", ingredients: "köttfärssås, lök, vitlök, jalapeño, tacokryddmix, vitlöksås, tacosås", price: 110, group: "Mexikanska pizzor" },
  { name: "AZTEKA", ingredients: "skinka, tacokryddmix, jalapeño, vitlöksås, tacosås", price: 110, group: "Mexikanska pizzor" },
  { name: "ACAPULCO", ingredients: "oxfilé, lök, vitlök, tacokryddmix, jalapeño, champ., vitlöksås, tacosås", price: 120, group: "Mexikanska pizzor" },

  // Oxfilé pizzor (120 kr)
  { name: "BOSVEDJAN SPEC.", ingredients: "oxfilé, lök, champ., paprika, b.sås, ägg", price: 120, group: "Oxfilé pizzor" },
  { name: "SUNDSVALLS SPEC.", ingredients: "oxfilé, lök, paprika, tomater", price: 120, group: "Oxfilé pizzor" },
  { name: "CARMEN", ingredients: "skinka, oxfilé, tomater, b.sås, täckt med extra ost", price: 120, group: "Oxfilé pizzor" },
  { name: "NORRLAND SPEC.", ingredients: "oxfilé, tomater, gorgonzola", price: 120, group: "Oxfilé pizzor" },
  { name: "HUSET SPEC.", ingredients: "oxfilé, lök, champ., tomater, b.sås", price: 120, group: "Oxfilé pizzor" },
  { name: "LADY DIANA", ingredients: "skinka, oxfilé, lök, tomater, färsk vitlök, b.sås", price: 120, group: "Oxfilé pizzor" },
  { name: "SKÖNSBERGS SPEC.", ingredients: "oxfilé, champ., ägg, b.sås", price: 120, group: "Oxfilé pizzor" },
  { name: "PRIMAVERA", ingredients: "skinka, fläskfilé, lök, b.sås", price: 120, group: "Oxfilé pizzor" },
  { name: "JAMAICA", ingredients: "fläskfilé, tomater, jalapeño, vitlökssås", price: 120, group: "Oxfilé pizzor" },
  { name: "MATADOR", ingredients: "oxfilé, tomater, sparris, sås", price: 120, group: "Oxfilé pizzor" },
  { name: "GARDEN", ingredients: "fläskfilé, tomater, sparris, sås", price: 120, group: "Oxfilé pizzor" },

  // Kebab & Rullar (tidigare Kebab & Sallad)
  { name: "KEBAB MED BRÖD", ingredients: "isbergssallad, tomat, gurka, lök och dressing", price: 95, group: "Kebab & Rullar" },
  { name: "KEBABRULLE", ingredients: "isbergssallad, tomat, gurka, lök och dressing", price: 100, group: "Kebab & Rullar" },
  { name: "KYCKLINGRULLE", ingredients: "isbergssallad, tomat, gurka, lök och dressing", price: 100, group: "Kebab & Rullar" },
  { name: "SKINKRULLE", ingredients: "isbergssallad, tomat, gurka, lök och dressing", price: 100, group: "Kebab & Rullar" },
  { name: "TONFISKRULLE", ingredients: "isbergssallad, tomat, gurka, lök och dressing", price: 100, group: "Kebab & Rullar" },
  { name: "KYCKLINGTALLRIK", ingredients: "isbergssallad, tomat, gurka, lök, och dressing", price: 110, group: "Kebab & Rullar" },
  { name: "KEBABTALLRIK", ingredients: "isbergssallad, tomat,pommes , gurka, lök, fefferoni och dressing", price: 110, group: "Kebab & Rullar" },
  { name: "KEBAB SKROVMÅL", ingredients: "isbergssallad, tomat, gurka, lök, pommes", price: 120, group: "Kebab & Rullar" },
  { name: "KEBAB MED RIS", ingredients: "isbergssallad, tomat, gurka, lök och dressing", price: 110, group: "Kebab & Rullar" },
  { name: "KYCKLING MED RIS", ingredients: "isbergssallad, tomat, gurka, lök och dressing", price: 110, group: "Kebab & Rullar" },

  // Salladsmeny (100 kr)
  { name: "TONFISKSALLAD", ingredients: "gurka, isbergssallad, tomater, tonfisk, ost, dressing", price: 100, group: "Salladsmeny" },
  { name: "SKINKSALLAD", ingredients: "skinka, oliver, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny" },
  { name: "RÄKSALLAD", ingredients: "räkor, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny" },
  { name: "CHEFSSALLAD", ingredients: "kyckling, oliver, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny" },
  { name: "BLANDSALLAD", ingredients: "skinka, räkor, tonfisk, musslor, champinjoner, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny" },
  { name: "GREKISK SALLAD", ingredients: "lök, fårost, oliver, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny" },
  { name: "KEBABSALLAD", ingredients: "lök, kebab, feferoni, vitlökssås, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny" },
  { name: "VEGETARIANS", ingredients: "oliver, ananas, paprika, champinjoner, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny" },
  { name: "OCEAN", ingredients: "räkor, crabfish, tonfisk, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny" },
  { name: "AMERIKANSK", ingredients: "skinka, majs, ananas, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny" },
  { name: "AVOCADO SALLAD", ingredients: "skinka, räkor, avocado, citron, salladsost, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny" },

  // Grillmeny
  { name: "HAMBURGARE 90g", ingredients: "pommes, dricka", price: 100, group: "Grillmeny" },
  { name: "HAMBURGARE 150g", ingredients: "pommes, dricka", price: 110, group: "Grillmeny" },
  { name: "LÖVSTEAK", ingredients: "pommes frites, dricka", price: 130, group: "Grillmeny" },
];

export default menuItems;
