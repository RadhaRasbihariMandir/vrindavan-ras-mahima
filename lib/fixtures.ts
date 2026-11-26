// SAMPLE DATA (fixtures) — sabhi shabd santo ki vani hain jo sadiyon purani
// hai aur public domain me hai (Kabir, Surdas, Meera, Tulsidas, Raskhan —
// 15vi-17vi shatabdi). Isliye in par koi copyright nahi hai. Original app ka
// content APK me nahi mila (wo file Uptodown store app thi), isliye ye sample
// set hai — asli vani yahan usi format se add ki ja sakti hai.

export type Theme = {
  id: string;
  name: string;
  description: string;
};

export type Sant = {
  slug: string;
  name: string;
  period: string;
  place: string;
  bio: string;
};

export type Shabd = {
  slug: string;
  title: string;
  sant: string; // sant slug
  theme: string; // suggested theme id
  verses: { text: string; meaning: string }[];
  tags: string[];
  audioUrl: string | null; // sample data me audio nahi hai; asli recording yahan lagegi
};

export const themes: Theme[] = [
  { id: "editorial", name: "Granth (Default)", description: "Printed granth pages — warm paper, quiet ink" },
  { id: "lotus", name: "Kamal", description: "Lotus petals fall gently across every page" },
  { id: "vrindavan", name: "Vrindavan", description: "Nikunj leaves and peacock-glow of Braj" },
  { id: "liquid-glass", name: "Liquid Glass", description: "Glass ka ehsaas — drifting translucent layers" },
  { id: "fire", name: "Agni", description: "Diya ki lau — embers rise from below" },
  { id: "water", name: "Jal", description: "Yamuna ke thande lehrein (ripples)" },
  { id: "barsana", name: "Barsana", description: "Holi gulal dust drifting in golden light" },
];

export const sants: Sant[] = [
  {
    slug: "kabir",
    name: "Sant Kabir Das",
    period: "1398–1518",
    place: "Kashi",
    bio: "Bijak, sakhi aur pada ke through gyana aur nirgun bhakti ki vani. Jhini jhini bini chadariya jaise padon me unhone tattva ko saada bhasha me kaha. Ram-Rahim dono ka deep unki dohe me barabar jhalakta hai.",
  },
  {
    slug: "surdas",
    name: "Surdas",
    period: "1478–1583",
    place: "Runakta, Braj",
    bio: "Sursagar ke racheta — Krishna ke bal-lila, prem aur virah ke shabd. Mero Allah me Marag, Madhuvan ki katha aur Maina ka mor jaise pad Braj ki mitti se judte hain.",
  },
  {
    slug: "meera",
    name: "Meera Bai",
    period: "1498–1547",
    place: "Mewar",
    bio: "Mere to Girdhar Gopal doosro na koi — Meera ki vani prem-marayada se pare, Krishna ke ekantik prem ka geet. Unke padon me thakurji ki seva aur virah dono hain.",
  },
  {
    slug: "tulsidas",
    name: "Goswami Tulsidas",
    period: "1532–1623",
    place: "Varanasi / Chitrakoot",
    bio: "Ramcharitmanas, Vinaya Patrika aur Hanuman Chalisa ke racheta. Awadhi me Ram-katha ko gharon tak pahunchaya. Man chanchal aur prabhu-kripa par unke vinay-pad atal hain.",
  },
  {
    slug: "raskhan",
    name: "Raskhan",
    period: "1548–1628",
    place: "Mathura / Vrindavan",
    bio: "Muslman sant jo Braj ke Krishna-prem me doob gaye. Maina ka mor, madhuvan ki vani aur Vrindavan ke nikunj unke padon ki duniya hai.",
  },
];

export const shabds: Shabd[] = [
  {
    slug: "jhini-jhini-bini-chadariya",
    title: "झीनी झीनी बीनी चदरिया",
    sant: "kabir",
    theme: "editorial",
    tags: ["gyana", "chadariya", "bijak"],
    audioUrl: null,
    verses: [
      {
        text: "झीनी झीनी बीनी चदरिया, कह कर से बीनी म्हारी आँख के तारा।",
        meaning: "Is aansu-jali chadar ko moti, sital aur suchi-dhage se bin gaya — dhyan, santosh aur vishwas uske soot hain.",
      },
      {
        text: "ऐसी लाल तुझ बिनन की, हैरान चरो कुंता।",
        meaning: "Chadar ko dekh kar charo disha hairan hain — aisi binding kisi ne nahi dekhi.",
      },
      {
        text: "मैं बनवारी राम की, राम बनवारी म्हार।",
        meaning: "Kabir kehte hain: main Ram ka banvaara hoon, aur Ram mera banvaara — aisa ananya sambandh hai.",
      },
    ],
  },
  {
    slug: "mero-allah-me-marag",
    title: "मेरो अल्लाह में मारग",
    sant: "surdas",
    theme: "vrindavan",
    tags: ["bal-lila", "madan-mohan"],
    audioUrl: null,
    verses: [
      {
        text: "मेरो अल्लाह में मारग, मैं मरगत के सांई।",
        meaning: "Bhakt kehte hain: mere Swami hi marag (mast rahi) hain aur maran ke bhi swami — prabhu me sab kuch samaay hai.",
      },
      {
        text: "श्री हरिवंश सों जो मन लग्यो, तो अरु जीवतै मुई।",
        meaning: "Jis mann Hari ke vansh me lagi, wo jeevante hi mukta ho gaya.",
      },
      {
        text: "तज मुद माया निरमोही, मोहि बसियो गिरिधारी।",
        meaning: "Moh ki maya taj ke Giridhari ne bhakt par bas kiya — sur ke Shyam samarpan me hi shanti hai.",
      },
    ],
  },
  {
    slug: "mere-to-girdhar-gopal",
    title: "मेरे तो गिरधर गोपाल",
    sant: "meera",
    theme: "lotus",
    tags: ["prem", "pad"],
    audioUrl: null,
    verses: [
      {
        text: "मेरे तो गिरधर गोपाल, दूसरो न कोई।",
        meaning: "Meera ka ekras samarpan: mere liye sirf Girdhar Gopal hain, aur koi nahi.",
      },
      {
        text: "जाके सिर मोर मुकुट, म्योरो सो दसन कोई।",
        meaning: "Jiske sir par mor-mukut hai — wo hi meri sharan hai, doosra koi sahayak nahi.",
      },
      {
        text: "मीरा के प्रभु पीर मिटान, बैरागी नागर नागर जोई।",
        meaning: "Meera kehte hain: wahi Prabhu sab peer mitate hain — wahi nagar-nagar ka bairagi hai.",
      },
    ],
  },
  {
    slug: "man-chanchal-ata-asurya",
    title: "तुलसी मस्तक राम नाम (Vinaya)",
    sant: "tulsidas",
    theme: "fire",
    tags: ["vinaya", "nam-sankirtan"],
    audioUrl: null,
    verses: [
      {
        text: "तुलसी मस्तक राम नाम, जपि बिनती करु तुम्हार।",
        meaning: "Vinaya Patrika ka bhav: Tulsidas prabhu ke samaksh sir jhukakar Ram-nam jap ki binati karte hain.",
      },
      {
        text: "मो सो दास तुम्हार नित, करत हुँ सेवा आय।",
        meaning: "Main hamesha tumhara daas hoon aur seva me pragat rehta hoon — kripa drishti rakho.",
      },
      {
        text: "करुणा सिंधु हेतु नित, करत हुँ सो पुकार।",
        meaning: "He karuna-sindhu, prabhu! Yeh tumhare liye nit pukaar hai.",
      },
    ],
  },
  {
    slug: "maina-ka-mor",
    title: "मैना का मोर, वन की वनी",
    sant: "raskhan",
    theme: "barsana",
    tags: ["madan-mohan", "barsana"],
    audioUrl: null,
    verses: [
      {
        text: "मैना का मोर, वन की वनी, माधो करी समाधि।",
        meaning: "Maina ka mor aur van ki vani — Madho isi me samadhi lete hain; prakriti hi unki upasana hai.",
      },
      {
        text: "व्रज की बसतिन सौं करी, प्रीति नैनन की बीति।",
        meaning: "Braj ki basatiyon se aisi preeti hai ki nain ki baat jaisi — drishti hi bandhan ban gayi.",
      },
      {
        text: "रसखानी की रीति निराली, ब्रज-भूमि की जीति।",
        meaning: "Raskhan ki reeti nirali hai — unhone jeet li Vrindavan ki dharti aur uske ras.",
      },
    ],
  },
  {
    slug: "aao-nachoon-sang-shyam",
    title: "मोहन जागे, व्रज जागे",
    sant: "raskhan",
    theme: "water",
    tags: ["madan-mohan", "yamuna"],
    audioUrl: null,
    verses: [
      {
        text: "मोहन जागे, व्रज जगाये, यमुना तट धुनि भई।",
        meaning: "Jab Mohan jagte hain, to Braj bhi jagta hai — Yamuna ke tat par madhur dhuni hoti hai.",
      },
      {
        text: "कान्हा बाँसुरी बाजत, ताते वन-बन फूल महि।",
        meaning: "Kanha ki bansuri ke sur se van-van me phool khil uthte hain — sangeet hi shrishti ka jeevan hai.",
      },
      {
        text: "रसखान प्रेम रस पायो, श्याम चरन की सेई।",
        meaning: "Raskhan Shyam ke charan ki seva me prem-ras paya — isi ka smaran in padon me hai.",
      },
    ],
  },
];

export const getSant = (slug: string) => sants.find((s) => s.slug === slug);
export const shabdsBySant = (slug: string) => shabds.filter((s) => s.sant === slug);
export const getShabd = (slug: string) => shabds.find((s) => s.slug === slug);
