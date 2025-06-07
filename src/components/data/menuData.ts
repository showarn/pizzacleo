export interface MenuItem {
  name: string;
  ingredients: string;
  price: number;
  group: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

const menuItems: MenuItem[] = [
  // Meny 1 (90 kr)
  { name: "MARGHERITA", ingredients: "ost", price: 90, group: "Meny 1", calories: 820, protein: 32, carbs: 88, fat: 27 },
  { name: "VESUVIO", ingredients: "skinka, ost", price: 90, group: "Meny 1", calories: 870, protein: 36, carbs: 90, fat: 29 },
  { name: "ALFUNGHI", ingredients: "tonfisk, lök", price: 90, group: "Meny 1", calories: 780, protein: 38, carbs: 85, fat: 20 },
  { name: "BOLOGNESE", ingredients: "köttfärssås, lök", price: 90, group: "Meny 1", calories: 900, protein: 40, carbs: 87, fat: 32 },
  { name: "NAPOLI", ingredients: "champinjoner", price: 90, group: "Meny 1", calories: 780, protein: 30, carbs: 90, fat: 22 },

  // Meny 2 (95 kr)
  { name: "HAWAII", ingredients: "skinka, ananas", price: 95, group: "Meny 2", calories: 880, protein: 35, carbs: 93, fat: 28 },
  { name: "CACCIATORE", ingredients: "salami, lök", price: 95, group: "Meny 2", calories: 940, protein: 38, carbs: 90, fat: 35 },
  { name: "INGMAR", ingredients: "bacon, lök, svartpeppar", price: 95, group: "Meny 2", calories: 950, protein: 39, carbs: 87, fat: 36 },
  { name: "FEFERONI", ingredients: "skinka, feferoni", price: 95, group: "Meny 2", calories: 870, protein: 34, carbs: 92, fat: 29 },
  { name: "BUSSOLA", ingredients: "skinka, räkor", price: 95, group: "Meny 2", calories: 900, protein: 42, carbs: 90, fat: 28 },
  { name: "OPERA", ingredients: "skinka, tonfisk", price: 95, group: "Meny 2", calories: 890, protein: 41, carbs: 88, fat: 27 },
  { name: "LAGUNA", ingredients: "tonfisk, räkor", price: 95, group: "Meny 2", calories: 920, protein: 43, carbs: 85, fat: 26 },
  { name: "MARINARA", ingredients: "räkor, musslor", price: 95, group: "Meny 2", calories: 880, protein: 44, carbs: 84, fat: 25 },
  { name: "ROMANTICA", ingredients: "skinka, skivade tomater", price: 95, group: "Meny 2", calories: 870, protein: 33, carbs: 91, fat: 28 },
  { name: "CAPRICCIOSA", ingredients: "skinka, champ.", price: 95, group: "Meny 2", calories: 880, protein: 34, carbs: 90, fat: 29 },
  { name: "PEPPERONI", ingredients: "ost, lök, pepperoni", price: 95, group: "Meny 2", calories: 950, protein: 37, carbs: 87, fat: 35 },

  // Inbakade pizzor
  { name: "CALZONE", ingredients: "skinka", price: 95, group: "Inbakade pizzor", calories: 1050, protein: 38, carbs: 110, fat: 38 },
  { name: "CALZONE CAPRI", ingredients: "skinka, champ.", price: 100, group: "Inbakade pizzor", calories: 1070, protein: 39, carbs: 112, fat: 39 },
  { name: "CALZONE BOLOGNESE", ingredients: "skinka, köttfärs", price: 100, group: "Inbakade pizzor", calories: 1100, protein: 41, carbs: 110, fat: 40 },
  { name: "CALZONE COLESSO", ingredients: "köttfärs, champ.", price: 100, group: "Inbakade pizzor", calories: 1080, protein: 40, carbs: 111, fat: 39 },
  { name: "CALZONE SPEC.", ingredients: "skinka, champ., räkor", price: 110, group: "Inbakade pizzor", calories: 1120, protein: 42, carbs: 113, fat: 40 },

  // Meny 3 (100 kr)
  { name: "BELLA", ingredients: "skinka, räkor, champ.", price: 100, group: "Meny 3", calories: 920, protein: 42, carbs: 89, fat: 30 },
  { name: "VEGETARIAN", ingredients: "lök, paprika, tomater, peperoni, champ.", price: 100, group: "Meny 3", calories: 840, protein: 30, carbs: 95, fat: 25 },
  { name: "BANANA", ingredients: "skinka, banan, curry", price: 100, group: "Meny 3", calories: 900, protein: 33, carbs: 92, fat: 28 },
  { name: "CASA MIA", ingredients: "skinka, champ., lök, paprika", price: 100, group: "Meny 3", calories: 890, protein: 35, carbs: 90, fat: 29 },
  { name: "POMPEI", ingredients: "räkor, musslor, tonfisk", price: 100, group: "Meny 3", calories: 930, protein: 43, carbs: 88, fat: 27 },
  { name: "GONDOL", ingredients: "skinka, räkor, tonfisk", price: 100, group: "Meny 3", calories: 920, protein: 43, carbs: 89, fat: 28 },
  { name: "CASA BELLA", ingredients: "skinka, salami, lök", price: 100, group: "Meny 3", calories: 910, protein: 38, carbs: 88, fat: 30 },
  { name: "TORINO", ingredients: "salami, köttfärs, lök", price: 100, group: "Meny 3", calories: 940, protein: 40, carbs: 87, fat: 33 },

  // Meny 4 (110 kr)
  { name: "QUATTRO STAGIONI", ingredients: "skinka, räkor, musslor, champ.", price: 110, group: "Meny 4", calories: 1020, protein: 44, carbs: 90, fat: 32 },
  { name: "QUATTRO STAGIONI SPEC.", ingredients: "skinka, champ., räkor, musslor, kronärtskocka", price: 110, group: "Meny 4", calories: 1040, protein: 45, carbs: 91, fat: 33 },
  { name: "MAMMA MIA", ingredients: "skinka, räkor, champ., paprika", price: 110, group: "Meny 4", calories: 1010, protein: 43, carbs: 89, fat: 31 },
  { name: "TROPICAL", ingredients: "räkor, ananas, banan, curry", price: 110, group: "Meny 4", calories: 990, protein: 41, carbs: 94, fat: 30 },
  { name: "SEA", ingredients: "räkor, musslor, crabfish", price: 110, group: "Meny 4", calories: 1000, protein: 44, carbs: 88, fat: 30 },
  { name: "O SOLE MIO", ingredients: "skinka, räkor, crabfish", price: 110, group: "Meny 4", calories: 1020, protein: 43, carbs: 87, fat: 32 },
  { name: "VEGABONDO", ingredients: "skinka, räkor, lök, b.sås", price: 110, group: "Meny 4", calories: 980, protein: 41, carbs: 90, fat: 29 },
  { name: "SORRENTO", ingredients: "köttfärs, lök, jalapeño, champ.", price: 110, group: "Meny 4", calories: 1000, protein: 40, carbs: 88, fat: 31 },
  { name: "CLEOPATRA", ingredients: "köttfärs, bacon, champ., lök", price: 110, group: "Meny 4", calories: 1010, protein: 41, carbs: 87, fat: 32 },

  // Meny 5 (110 kr)
  { name: "MONTE CARLO", ingredients: "salami, bacon, köttfärssås, lök", price: 110, group: "Meny 5", calories: 1040, protein: 42, carbs: 88, fat: 34 },
  { name: "VIKING", ingredients: "salami, bacon, lök, vitlök, oliver", price: 110, group: "Meny 5", calories: 1050, protein: 43, carbs: 87, fat: 35 },
  { name: "CIAO CIAO", ingredients: "salami, bacon, lök, paprika, tabasco", price: 110, group: "Meny 5", calories: 1030, protein: 41, carbs: 86, fat: 33 },
  { name: "ROMA", ingredients: "bacon, köttfärssås, champ., lök, paprika, tabasco", price: 110, group: "Meny 5", calories: 1060, protein: 43, carbs: 89, fat: 35 },
  { name: "PALERMO", ingredients: "kyckling, banan, curry", price: 110, group: "Meny 5", calories: 950, protein: 40, carbs: 90, fat: 28 },
  { name: "KEBABPIZZA", ingredients: "kebabkött, lök, peperoni, tomater, vitlöksås", price: 110, group: "Meny 5", calories: 1020, protein: 42, carbs: 89, fat: 31 },
  { name: "KEBABPIZZA SPEC.", ingredients: "kebabkött, lök, peperoni, tomater, b.sås (halv inb)", price: 110, group: "Meny 5", calories: 1050, protein: 43, carbs: 91, fat: 32 },
  { name: "COLOMBO", ingredients: "kycklingbitar, champ., curry, svart peppar", price: 110, group: "Meny 5", calories: 980, protein: 41, carbs: 88, fat: 29 },
  { name: "BÅTPIZZA", ingredients: "kebabkött, lök, tomater, gurka, feferoni, isbergssallad, vitlöksås", price: 120, group: "Meny 5", calories: 1080, protein: 44, carbs: 90, fat: 33 },
  { name: "ENJOY SPEC.", ingredients: "skinka, champ., köttfärs, oliver, paprika, salladsost", price: 120, group: "Meny 5", calories: 1100, protein: 45, carbs: 92, fat: 35 },
  { name: "VEGETARIAN SPEC.", ingredients: "sparris, champ., majs, lök, ananas, banan, paprika, tomater, jalapeño, peperoni, kronärtskock", price: 120, group: "Meny 5", calories: 950, protein: 38, carbs: 95, fat: 29 },

  // Mexikanska pizzor (110 kr)
  { name: "MEXICANA", ingredients: "köttfärssås, lök, vitlök, jalapeño, tacokryddmix, vitlöksås, tacosås", price: 110, group: "Mexikanska pizzor", calories: 1020, protein: 42, carbs: 88, fat: 31 },
  { name: "AZTEKA", ingredients: "skinka, tacokryddmix, jalapeño, vitlöksås, tacosås", price: 110, group: "Mexikanska pizzor", calories: 980, protein: 40, carbs: 90, fat: 29 },
  { name: "ACAPULCO", ingredients: "oxfilé, lök, vitlök, tacokryddmix, jalapeño, champ., vitlöksås, tacosås", price: 120, group: "Mexikanska pizzor", calories: 1100, protein: 44, carbs: 89, fat: 33 },

  // Oxfilé pizzor (120 kr)
  { name: "BOSVEDJAN SPEC.", ingredients: "oxfilé, lök, champ., paprika, b.sås, ägg", price: 120, group: "Oxfilé pizzor", calories: 1150, protein: 50, carbs: 87, fat: 38 },
  { name: "SUNDSVALLS SPEC.", ingredients: "oxfilé, lök, paprika, tomater", price: 120, group: "Oxfilé pizzor", calories: 1130, protein: 48, carbs: 89, fat: 36 },
  { name: "CARMEN", ingredients: "skinka, oxfilé, tomater, b.sås, täckt med extra ost", price: 120, group: "Oxfilé pizzor", calories: 1180, protein: 52, carbs: 88, fat: 39 },
  { name: "NORRLAND SPEC.", ingredients: "oxfilé, tomater, gorgonzola", price: 120, group: "Oxfilé pizzor", calories: 1140, protein: 49, carbs: 87, fat: 37 },
  { name: "HUSET SPEC.", ingredients: "oxfilé, lök, champ., tomater, b.sås", price: 120, group: "Oxfilé pizzor", calories: 1160, protein: 50, carbs: 88, fat: 38 },
  { name: "LADY DIANA", ingredients: "skinka, oxfilé, lök, tomater, färsk vitlök, b.sås", price: 120, group: "Oxfilé pizzor", calories: 1150, protein: 51, carbs: 89, fat: 38 },
  { name: "SKÖNSBERGS SPEC.", ingredients: "oxfilé, champ., ägg, b.sås", price: 120, group: "Oxfilé pizzor", calories: 1160, protein: 50, carbs: 88, fat: 39 },
  { name: "PRIMAVERA", ingredients: "skinka, fläskfilé, lök, b.sås", price: 120, group: "Oxfilé pizzor", calories: 1120, protein: 48, carbs: 87, fat: 36 },
  { name: "JAMAICA", ingredients: "fläskfilé, tomater, jalapeño, vitlökssås", price: 120, group: "Oxfilé pizzor", calories: 1130, protein: 47, carbs: 88, fat: 35 },
  { name: "MATADOR", ingredients: "oxfilé, tomater, sparris, sås", price: 120, group: "Oxfilé pizzor", calories: 1110, protein: 46, carbs: 86, fat: 34 },
  { name: "GARDEN", ingredients: "fläskfilé, tomater, sparris, sås", price: 120, group: "Oxfilé pizzor", calories: 1100, protein: 45, carbs: 87, fat: 34 },

  // Kebab & Rullar (tidigare Kebab & Sallad)
  { name: "KEBAB MED BRÖD", ingredients: "isbergssallad, tomat, gurka, lök och dressing", price: 95, group: "Kebab & Rullar", calories: 750, protein: 30, carbs: 60, fat: 28 },
  { name: "KEBABRULLE", ingredients: "isbergssallad, tomat, gurka, lök och dressing", price: 100, group: "Kebab & Rullar", calories: 850, protein: 35, carbs: 70, fat: 30 },
  { name: "KYCKLINGRULLE", ingredients: "isbergssallad, tomat, gurka, lök och dressing", price: 100, group: "Kebab & Rullar", calories: 830, protein: 38, carbs: 65, fat: 28 },
  { name: "SKINKRULLE", ingredients: "isbergssallad, tomat, gurka, lök och dressing", price: 100, group: "Kebab & Rullar", calories: 820, protein: 36, carbs: 64, fat: 27 },
  { name: "TONFISKRULLE", ingredients: "isbergssallad, tomat, gurka, lök och dressing", price: 100, group: "Kebab & Rullar", calories: 800, protein: 38, carbs: 62, fat: 25 },
  { name: "KYCKLINGTALLRIK", ingredients: "isbergssallad, tomat, gurka, lök, och dressing", price: 110, group: "Kebab & Rullar", calories: 900, protein: 40, carbs: 75, fat: 30 },
  { name: "KEBABTALLRIK", ingredients: "isbergssallad, tomat,pommes , gurka, lök, fefferoni och dressing", price: 110, group: "Kebab & Rullar", calories: 1100, protein: 42, carbs: 95, fat: 40 },
  { name: "KEBAB SKROVMÅL", ingredients: "isbergssallad, tomat, gurka, lök, pommes", price: 120, group: "Kebab & Rullar", calories: 1200, protein: 45, carbs: 100, fat: 45 },
  { name: "KEBAB MED RIS", ingredients: "isbergssallad, tomat, gurka, lök och dressing", price: 110, group: "Kebab & Rullar", calories: 1050, protein: 42, carbs: 90, fat: 40 },
  { name: "KYCKLING MED RIS", ingredients: "isbergssallad, tomat, gurka, lök och dressing", price: 110, group: "Kebab & Rullar", calories: 1000, protein: 40, carbs: 88, fat: 38 },

  // Salladsmeny (100 kr)
  { name: "TONFISKSALLAD", ingredients: "gurka, isbergssallad, tomater, tonfisk, ost, dressing", price: 100, group: "Salladsmeny", calories: 350, protein: 28, carbs: 12, fat: 15 },
  { name: "SKINKSALLAD", ingredients: "skinka, oliver, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny", calories: 370, protein: 30, carbs: 10, fat: 16 },
  { name: "RÄKSALLAD", ingredients: "räkor, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny", calories: 360, protein: 32, carbs: 11, fat: 14 },
  { name: "CHEFSSALLAD", ingredients: "kyckling, oliver, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny", calories: 380, protein: 33, carbs: 12, fat: 17 },
  { name: "BLANDSALLAD", ingredients: "skinka, räkor, tonfisk, musslor, champinjoner, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny", calories: 400, protein: 35, carbs: 15, fat: 18 },
  { name: "GREKISK SALLAD", ingredients: "lök, fårost, oliver, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny", calories: 330, protein: 25, carbs: 14, fat: 16 },
  { name: "KEBABSALLAD", ingredients: "lök, kebab, feferoni, vitlökssås, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny", calories: 420, protein: 38, carbs: 13, fat: 19 },
  { name: "VEGETARIANS", ingredients: "oliver, ananas, paprika, champinjoner, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny", calories: 320, protein: 20, carbs: 15, fat: 15 },
  { name: "OCEAN", ingredients: "räkor, crabfish, tonfisk, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny", calories: 390, protein: 36, carbs: 12, fat: 16 },
  { name: "AMERIKANSK", ingredients: "skinka, majs, ananas, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny", calories: 350, protein: 28, carbs: 13, fat: 15 },
  { name: "AVOCADO SALLAD", ingredients: "skinka, räkor, avocado, citron, salladsost, gurka, isbergssallad, tomater, ost, dressing", price: 100, group: "Salladsmeny", calories: 420, protein: 30, carbs: 14, fat: 18 },

  // Grillmeny
  { name: "HAMBURGARE 90g", ingredients: "pommes, dricka", price: 100, group: "Grillmeny", calories: 900, protein: 30, carbs: 80, fat: 40 },
  { name: "HAMBURGARE 150g", ingredients: "pommes, dricka", price: 110, group: "Grillmeny", calories: 1100, protein: 40, carbs: 90, fat: 50 },
  { name: "LÖVSTEAK", ingredients: "pommes frites, dricka", price: 130, group: "Grillmeny", calories: 1150, protein: 45, carbs: 95, fat: 52 },
];

export default menuItems;
