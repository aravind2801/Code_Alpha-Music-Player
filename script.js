/* Mr. Music Player • 1138 Songs (Tamil 839, Telugu 100, English 100, Malayalam 99) — Local HTML5 Audio
   LOCAL AUDIO ARCHITECTURE — UI PRESERVED, ONLY SOURCE REPLACED:
   - Every song has id, title, artist, language, duration, audio, artwork (optional)
   - audio = public/music/<lang>/<id>.mp3, never youtubeId/youtubeUrl/search URL
   - audio is local static file, validated via manifest
   - If audio file missing -> UI shows "Audio unavailable" + manifest validation reports
   - Never use YouTube iframe/API, never youtubeId, never Spotify, never ringtone/sample
   - Use single HTML5 Audio() inside LEFT Now Playing panel
   - Do not scrape/download, respect Pixabay Content License, only local files
   - Keep layout, spacing, sizing, colors, typography, responsive behavior unchanged
*/

// Local audio helpers — no YouTube, no fake MP3
function isValidSong(song){
  return !!(song && song.title && song.artist && song.language && song.audio);
}
function isValidAudioPath(path){
  return typeof path === 'string' && /\.(mp3|wav|ogg|m4a|aac)$/i.test(path);
}
function getCover(song){
  // Artwork optional — fallback to gradient initials if missing
  return song.cover || '';
}

// Cloudflare R2 audio CDN — single configurable base URL (production source of truth).
// Local public/music files are kept untouched as backup.
const MUSIC_BASE_URL =
  "https://pub-3921bb23382d4adc8993aecda48f8030.r2.dev/music";
// Catalog stores portable relative paths ("tamil/ta-001.mp3").
// Resolve any entry to its playable per-song R2 object URL.
function audioUrl(song){
  const rel = String((song && song.audio) || "").split("public/music/").join("").split("music/").join("").replace(/^\//, "");
  return MUSIC_BASE_URL + "/" + rel;
}

const songs = [
  { id: "ta-001", title: "Anbe Anbe", artist: "Various Artists", album: "Anbe Anbe (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-001.mp3", favorite: false },
  { id: "ta-002", title: "High on Love", artist: "Various Artists", album: "High on Love (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-002.mp3", favorite: false },
  { id: "ta-003", title: "En Kannu Kulla", artist: "Various Artists", album: "Appuchi Graamam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-003.mp3", favorite: false },
  { id: "ta-004", title: "Nallaru Po", artist: "Various Artists", album: "Dude (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-004.mp3", favorite: false },
  { id: "ta-005", title: "Naan Aval Illai", artist: "Various Artists", album: "Naan Aval Illai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-005.mp3", favorite: false },
  { id: "ta-006", title: "Sevatha Pulla", artist: "Various Artists", album: "Sevatha Pulla (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-006.mp3", favorite: false },
  { id: "ta-008", title: "Pirai Thedum", artist: "Various Artists", album: "Pirai Thedum (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-008.mp3", favorite: false },
  { id: "ta-009", title: "Para Para", artist: "Various Artists", album: "Neerparavai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-009.mp3", favorite: false },
  { id: "ta-010", title: "Jal Jal Jal Oosai", artist: "Various Artists", album: "Manam Kothi Paravai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-010.mp3", favorite: false },
  { id: "ta-011", title: "Yendi Vittu Pona", artist: "Various Artists", album: "Dragon (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-011.mp3", favorite: false },
  { id: "ta-012", title: "Velicha Poove", artist: "Various Artists", album: "Velicha Poove (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-012.mp3", favorite: false },
  { id: "ta-013", title: "Sidu Sidu", artist: "Various Artists", album: "Sidu Sidu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-013.mp3", favorite: false },
  { id: "ta-014", title: "Yaaradiyo", artist: "Various Artists", album: "Gorilla (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-014.mp3", favorite: false },
  { id: "ta-015", title: "Thuli Thuli", artist: "Various Artists", album: "Thuli Thuli (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-015.mp3", favorite: false },
  { id: "ta-016", title: "Thodu Vaanam", artist: "Various Artists", album: "Thodu Vaanam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-016.mp3", favorite: false },
  { id: "ta-017", title: "Vachindamma", artist: "Various Artists", album: "Vachindamma (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-017.mp3", favorite: false },
  { id: "ta-018", title: "Otha Sollaala", artist: "Various Artists", album: "Otha Sollaala (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-018.mp3", favorite: false },
  { id: "ta-019", title: "Kangal Kalangida", artist: "Various Artists", album: "Oru Kalluriyin Kadhai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-019.mp3", favorite: false },
  { id: "ta-020", title: "Thoovaanam", artist: "Various Artists", album: "Thoovaanam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-020.mp3", favorite: false },
  { id: "ta-021", title: "Unna Nenachu", artist: "Various Artists", album: "Psycho (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-021.mp3", favorite: false },
  { id: "ta-022", title: "Yaaro En Nenjai", artist: "Various Artists", album: "Yaaro En Nenjai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-022.mp3", favorite: false },
  { id: "ta-023", title: "Yaeley Yaeley Maruthu", artist: "Various Artists", album: "Yaeley Yaeley Maruthu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-023.mp3", favorite: false },
  { id: "ta-024", title: "Neethanae", artist: "Various Artists", album: "Mersal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-024.mp3", favorite: false },
  { id: "ta-025", title: "Venmathiye", artist: "Various Artists", album: "Venmathiye (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-025.mp3", favorite: false },
  { id: "ta-026", title: "Angel Of Raghuvaran - Iraivanai Thandha Iraiviye", artist: "Various Artists", album: "Velai Illa Pattadhaari 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-026.mp3", favorite: false },
  { id: "ta-027", title: "Ennai Kollathey", artist: "Various Artists", album: "Ennai Kollathey (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-027.mp3", favorite: false },
  { id: "ta-028", title: "Kannala Kannala (The Melting Point of Love)", artist: "Various Artists", album: "Kannala Kannala (The Melting Point of Love) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-028.mp3", favorite: false },
  { id: "ta-029", title: "Po Indru Neeyaga", artist: "Various Artists", album: "Velai Illa Pattadhaari (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-029.mp3", favorite: false },
  { id: "ta-030", title: "Sirukki Vaasam", artist: "Various Artists", album: "Sirukki Vaasam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-030.mp3", favorite: false },
  { id: "ta-031", title: "Vaaya moodi summa iru da", artist: "Various Artists", album: "Vaaya moodi summa iru da (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-031.mp3", favorite: false },
  { id: "ta-032", title: "Ival Dhaana", artist: "Various Artists", album: "Ival Dhaana (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-032.mp3", favorite: false },
  { id: "ta-033", title: "Arabu Naadu", artist: "Various Artists", album: "Arabu Naadu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-033.mp3", favorite: false },
  { id: "ta-034", title: "En Jeevan", artist: "Various Artists", album: "En Jeevan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-034.mp3", favorite: false },
  { id: "ta-035", title: "Yennachu Yedhachu", artist: "Various Artists", album: "Yennachu Yedhachu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-035.mp3", favorite: false },
  { id: "ta-036", title: "Yaar Indha Saalai Oram", artist: "Various Artists", album: "Yaar Indha Saalai Oram (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-036.mp3", favorite: false },
  { id: "ta-037", title: "Aval", artist: "Various Artists", album: "Aval (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-037.mp3", favorite: false },
  { id: "ta-038", title: "Vennilave - Thuppakki", artist: "Various Artists", album: "Thuppakki (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-038.mp3", favorite: false },
  { id: "ta-039", title: "Mustafaa Mustafaa", artist: "Various Artists", album: "Mustafaa Mustafaa (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-039.mp3", favorite: false },
  { id: "ta-040", title: "Kadhal Sadugudu", artist: "Various Artists", album: "Kadhal Sadugudu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-040.mp3", favorite: false },
  { id: "ta-041", title: "The Youth Of Power Paandi - Paarthen", artist: "Various Artists", album: "The Youth Of Power Paandi - Paarthen (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-041.mp3", favorite: false },
  { id: "ta-042", title: "Unn Thalai Mudi", artist: "Various Artists", album: "Unn Thalai Mudi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-042.mp3", favorite: false },
  { id: "ta-043", title: "Neeyum Naanum Anbe", artist: "Various Artists", album: "Neeyum Naanum Anbe (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-043.mp3", favorite: false },
  { id: "ta-044", title: "Nenjoramaa (feat. Jothi Kanna)", artist: "Various Artists", album: "Nenjoramaa (feat. Jothi Kanna) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-044.mp3", favorite: false },
  { id: "ta-045", title: "Kannae Kanmaniye", artist: "Various Artists", album: "Kannae Kanmaniye (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-045.mp3", favorite: false },
  { id: "ta-046", title: "Unakkena Uruginen", artist: "Various Artists", album: "Unakkena Uruginen (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-046.mp3", favorite: false },
  { id: "ta-047", title: "Kadhal Kan Kattudhe", artist: "Various Artists", album: "Kaaki Sattai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-047.mp3", favorite: false },
  { id: "ta-048", title: "Kaadhal Rojave", artist: "Various Artists", album: "Kaadhal Rojave (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-048.mp3", favorite: false },
  { id: "ta-050", title: "Imaye Imaye", artist: "Various Artists", album: "Imaye Imaye (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-050.mp3", favorite: false },
  { id: "ta-051", title: "Oxygen", artist: "Various Artists", album: "Oxygen (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-051.mp3", favorite: false },
  { id: "ta-052", title: "Feel My Love", artist: "Various Artists", album: "Feel My Love (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-052.mp3", favorite: false },
  { id: "ta-053", title: "Aathi", artist: "Various Artists", album: "Aathi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-053.mp3", favorite: false },
  { id: "ta-054", title: "Iravingu Theevai", artist: "Various Artists", album: "Iravingu Theevai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-054.mp3", favorite: false },
  { id: "ta-055", title: "Vazhithunaiye", artist: "Various Artists", album: "Dragon (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-055.mp3", favorite: false },
  { id: "ta-056", title: "Vaa Senthaazhini", artist: "Various Artists", album: "Adiyae (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-056.mp3", favorite: false },
  { id: "ta-057", title: "Mirutha Mirutha", artist: "Various Artists", album: "Mirutha Mirutha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-057.mp3", favorite: false },
  { id: "ta-058", title: "Pogiren", artist: "Various Artists", album: "Pogiren (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-058.mp3", favorite: false },
  { id: "ta-059", title: "En Kadhal Solla", artist: "Various Artists", album: "En Kadhal Solla (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-059.mp3", favorite: false },
  { id: "ta-060", title: "Piriyadha Enna", artist: "Various Artists", album: "Piriyadha Enna (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-060.mp3", favorite: false },
  { id: "ta-061", title: "Unakkenna Venum Sollu", artist: "Various Artists", album: "Unakkenna Venum Sollu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-061.mp3", favorite: false },
  { id: "ta-062", title: "Kadhaippoma", artist: "Various Artists", album: "Kadhaippoma (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-062.mp3", favorite: false },
  { id: "ta-063", title: "Yaar Intha", artist: "Various Artists", album: "Boss Engira Baskaran (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-063.mp3", favorite: false },
  { id: "ta-064", title: "Oh Penne", artist: "Various Artists", album: "Oh Penne (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-064.mp3", favorite: false },
  { id: "ta-065", title: "Yennai Maatrum Kadhale", artist: "Various Artists", album: "Naanum Rowdy Dhaan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-065.mp3", favorite: false },
  { id: "ta-066", title: "Inayae", artist: "Various Artists", album: "Inayae (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-066.mp3", favorite: false },
  { id: "ta-067", title: "Pogadhe", artist: "Various Artists", album: "Pogadhe (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-067.mp3", favorite: false },
  { id: "ta-068", title: "Oru Kal - Yuvan Shankar Raja", artist: "Various Artists", album: "Siva Manasula Sakthi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-068.mp3", favorite: false },
  { id: "ta-069", title: "Pottu Vaitha Oru Vatta Nila KJ", artist: "Various Artists", album: "Pottu Vaitha Oru Vatta Nila KJ (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-069.mp3", favorite: false },
  { id: "ta-070", title: "Thangapoovey", artist: "Various Artists", album: "Thangapoovey (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-070.mp3", favorite: false },
  { id: "ta-071", title: "Top5 Songs of Stephen Zechariah", artist: "Various Artists", album: "Top5 Songs of Stephen Zechariah (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-071.mp3", favorite: false },
  { id: "ta-072", title: "Aasa Kooda", artist: "Various Artists", album: "Aasa Kooda (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-072.mp3", favorite: false },
  { id: "ta-073", title: "Asku Laska", artist: "Various Artists", album: "Nanban (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-073.mp3", favorite: false },
  { id: "ta-074", title: "Aathi", artist: "Various Artists", album: "Kaththi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-074.mp3", favorite: false },
  { id: "ta-075", title: "Ore Oru Oorilae", artist: "Various Artists", album: "Abhiyum Naanum (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-075.mp3", favorite: false },
  { id: "ta-076", title: "Adi Alaye", artist: "Various Artists", album: "Parasakthi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-076.mp3", favorite: false },
  { id: "ta-077", title: "Amaran", artist: "Various Artists", album: "Amaran (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-077.mp3", favorite: false },
  { id: "ta-078", title: "Aathadi Aathadi", artist: "Various Artists", album: "Anegan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-078.mp3", favorite: false },
  { id: "ta-079", title: "AR Rahman Super Hit Love Song", artist: "Various Artists", album: "AR Rahman Super Hit Love Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-079.mp3", favorite: false },
  { id: "ta-080", title: "Athinthom", artist: "Various Artists", album: "Chandramukhi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-080.mp3", favorite: false },
  { id: "ta-081", title: "Aura 10 10", artist: "Various Artists", album: "Meesaya Murukku 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-081.mp3", favorite: false },
  { id: "ta-082", title: "Avalin Nizhal", artist: "Various Artists", album: "Avalin Nizhal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-082.mp3", favorite: false },
  { id: "ta-083", title: "Best of GV Prakash", artist: "Various Artists", album: "Best of GV Prakash (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-083.mp3", favorite: false },
  { id: "ta-084", title: "Kannalanae", artist: "Various Artists", album: "Bombay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-084.mp3", favorite: false, singer: "K. S. Chithra, A. R. Rahman", year: 1995 },
  { id: "ta-085", title: "Chikitu", artist: "Various Artists", album: "COOLIE (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-085.mp3", favorite: false },
  { id: "ta-086", title: "Title Track", artist: "Darbuka Siva, Sid Sriram", album: "Title Track (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-086.mp3", favorite: false },
  { id: "ta-087", title: "Adangaatha Asuran Performance", artist: "Various Artists", album: "Raayan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-087.mp3", favorite: false },
  { id: "ta-088", title: "Vaa Vaathi (Performance)", artist: "Various Artists", album: "Vaathi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-088.mp3", favorite: false },
  { id: "ta-089", title: "Aandipatti", artist: "Various Artists", album: "Dharmadurai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-089.mp3", favorite: false },
  { id: "ta-090", title: "Kallaimattum Kandal", artist: "Various Artists", album: "Dhasaavathaaram Tamil (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-090.mp3", favorite: false },
  { id: "ta-091", title: "Per Vachaalum Vaikkaama", artist: "Various Artists", album: "Dikkiloona (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-091.mp3", favorite: false },
  { id: "ta-092", title: "So Baby", artist: "Various Artists", album: "Doctor (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-092.mp3", favorite: false },
  { id: "ta-093", title: "Enna Nenatche", artist: "Various Artists", album: "Chokkathangam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-093.mp3", favorite: false },
  { id: "ta-094", title: "Enna Solla Pogirai", artist: "Various Artists", album: "Kandukondain Kandukondain (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-094.mp3", favorite: false },
  { id: "ta-095", title: "Ethana Saami", artist: "Various Artists", album: "Idli Kadai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-095.mp3", favorite: false },
  { id: "ta-096", title: "Golden Hits Of All Time", artist: "Various Artists", album: "Golden Hits Of All Time (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-096.mp3", favorite: false },
  { id: "ta-097", title: "Golden Sparrow", artist: "Various Artists", album: "Nilavuku En Mel Ennadi Kobam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-097.mp3", favorite: false },
  { id: "ta-098", title: "Rakita Rakita Rakita", artist: "Various Artists", album: "Jagame Thandhiram (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-098.mp3", favorite: false },
  { id: "ta-099", title: "Thala Kodhum", artist: "Various Artists", album: "Jai Bhim (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-099.mp3", favorite: false },
  { id: "ta-100", title: "Thalapathy Kacheri", artist: "Various Artists", album: "Jana Nayagan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-100.mp3", favorite: false },
  { id: "ta-101", title: "Jinguchaa", artist: "Various Artists", album: "Thug Life (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-101.mp3", favorite: false },
  { id: "ta-102", title: "Kaatrodu Pattam Pola", artist: "Various Artists", album: "Ayothi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-102.mp3", favorite: false },
  { id: "ta-103", title: "Vaayadi Petha Pulla", artist: "Various Artists", album: "Kanaa (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-103.mp3", favorite: false },
  { id: "ta-104", title: "Kanmani Anbodu", artist: "Various Artists", album: "Guna (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-104.mp3", favorite: false, singer: "Kamal Haasan, S. Janaki", year: 1991 },
  { id: "ta-105", title: "Kannadi Poove", artist: "Various Artists", album: "RETRO (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-105.mp3", favorite: false },
  { id: "ta-106", title: "Kannathil Muthamittal", artist: "Various Artists", album: "Kannathil Muthamittal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-106.mp3", favorite: false },
  { id: "ta-107", title: "Karuppu Perazhaga", artist: "Various Artists", album: "Kanchana Tamil (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-107.mp3", favorite: false },
  { id: "ta-108", title: "Thirudi", artist: "Various Artists", album: "Kiss (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-108.mp3", favorite: false },
  { id: "ta-109", title: "Konja Naal Poru Thalaivaa", artist: "Various Artists", album: "Aasai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-109.mp3", favorite: false },
  { id: "ta-110", title: "Loosu Pennae", artist: "Various Artists", album: "Loosu Pennae (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-110.mp3", favorite: false },
  { id: "ta-111", title: "Nenjame Nenjame", artist: "Various Artists", album: "Maamannan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-111.mp3", favorite: false },
  { id: "ta-112", title: "Pookkal Pookkum", artist: "Various Artists", album: "Madharasapattinam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-112.mp3", favorite: false },
  { id: "ta-113", title: "Vaathi Coming", artist: "Various Artists", album: "Master (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-113.mp3", favorite: false, singer: "Anirudh Ravichander, Gana Balachandar", year: 2020 },
  { id: "ta-114", title: "Meenamma", artist: "Various Artists", album: "Aasai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-114.mp3", favorite: false },
  { id: "ta-115", title: "Megham Karukatha", artist: "Various Artists", album: "Thiruchitrambalam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-115.mp3", favorite: false },
  { id: "ta-116", title: "Aalaporan Thamizhan", artist: "Various Artists", album: "Mersal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-116.mp3", favorite: false },
  { id: "ta-117", title: "Mesmerising Melodies by Shreya (Compilation)", artist: "Various Artists", album: "Mesmerising Melodies by Shreya (Compilation) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-117.mp3", favorite: false },
  { id: "ta-118", title: "Mona Gasolina", artist: "Various Artists", album: "Lingaa (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-118.mp3", favorite: false },
  { id: "ta-119", title: "Monica", artist: "Various Artists", album: "COOLIE (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-119.mp3", favorite: false },
  { id: "ta-120", title: "Muththa Mazhai", artist: "Various Artists", album: "Thug Life (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-120.mp3", favorite: false },
  { id: "ta-121", title: "Muthumani Maala", artist: "Various Artists", album: "Muthumani Maala (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-121.mp3", favorite: false },
  { id: "ta-123", title: "Nenjin Ezhuth", artist: "Various Artists", album: "Nenjin Ezhuth (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-123.mp3", favorite: false },
  { id: "ta-124", title: "Oorum Blood", artist: "Various Artists", album: "Dude (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-124.mp3", favorite: false },
  { id: "ta-125", title: "Oru Paatale Solli", artist: "Various Artists", album: "Deiva Vaakku (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-125.mp3", favorite: false },
  { id: "ta-126", title: "Oru Paathi Kadhavu", artist: "Various Artists", album: "Thaandavam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-126.mp3", favorite: false },
  { id: "ta-127", title: "Thuli Thuli", artist: "Various Artists", album: "Paiya (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-127.mp3", favorite: false },
  { id: "ta-128", title: "Nee Singam Dhan", artist: "Various Artists", album: "Pathu Thala (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-128.mp3", favorite: false },
  { id: "ta-129", title: "Ponni Nadhi", artist: "Various Artists", album: "Ponniyin Selvan 1 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-129.mp3", favorite: false, singer: "A. R. Rahman, A. R. Raihanah, Bamba Bakya", year: 2022 },
  { id: "ta-130", title: "Pottala Muttaye", artist: "Various Artists", album: "Thalaivan Thalaivii (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-130.mp3", favorite: false },
  { id: "ta-131", title: "Usure Pogudhey", artist: "Various Artists", album: "Raavanan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-131.mp3", favorite: false },
  { id: "ta-132", title: "Kannamma", artist: "Various Artists", album: "Rekka (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-132.mp3", favorite: false },
  { id: "ta-133", title: "Rekka Rekka", artist: "Various Artists", album: "Bison Kaalamaadan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-133.mp3", favorite: false },
  { id: "ta-134", title: "Koodamela Koodavechi", artist: "Various Artists", album: "Rummy (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-134.mp3", favorite: false },
  { id: "ta-135", title: "S Janaki Amma Tamil Hits", artist: "Various Artists", album: "S Janaki Amma Tamil Hits (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-135.mp3", favorite: false },
  { id: "ta-136", title: "Selfie Pulla", artist: "Various Artists", album: "Kaththi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-136.mp3", favorite: false },
  { id: "ta-137", title: "Sidu Sidu", artist: "Various Artists", album: "Romeo (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-137.mp3", favorite: false },
  { id: "ta-138", title: "Neelothi", artist: "Various Artists", album: "Sirai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-138.mp3", favorite: false },
  { id: "ta-139", title: "Soniya Soniya", artist: "Various Artists", album: "Ratchagan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-139.mp3", favorite: false },
  { id: "ta-140", title: "Suthi Suthi Vandheega", artist: "Various Artists", album: "Padayappa (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-140.mp3", favorite: false },
  { id: "ta-141", title: "THE ONE", artist: "Various Artists", album: "RETRO (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-141.mp3", favorite: false },
  { id: "ta-142", title: "Theekkoluthi", artist: "Various Artists", album: "Bison Kaalamaadan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-142.mp3", favorite: false },
  { id: "ta-143", title: "Thendral Vandhu", artist: "Various Artists", album: "Avatharam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-143.mp3", favorite: false },
  { id: "ta-144", title: "Thillana Thillana", artist: "Various Artists", album: "Muthu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-144.mp3", favorite: false, singer: "Mano, Sujatha Mohan", year: 1995 },
  { id: "ta-145", title: "Urugi Urugi", artist: "Various Artists", album: "Joe (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-145.mp3", favorite: false },
  { id: "ta-146", title: "Vaa Kannamma", artist: "Various Artists", album: "Once More (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-146.mp3", favorite: false },
  { id: "ta-147", title: "Ennadi Maayavi Nee", artist: "Various Artists", album: "VADACHENNAI (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-147.mp3", favorite: false },
  { id: "ta-148", title: "Veera Raja Veera", artist: "Various Artists", album: "PS2 Tamil (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-148.mp3", favorite: false },
  { id: "ta-149", title: "Venmegam", artist: "Various Artists", album: "Venmegam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-149.mp3", favorite: false },
  { id: "ta-150", title: "Venmegam", artist: "Various Artists", album: "Yaaradi Nee Mohini (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-150.mp3", favorite: false },
  { id: "ta-151", title: "Vennilave Vennilave", artist: "Various Artists", album: "Minsara Kanavu Tamil (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-151.mp3", favorite: false },
  { id: "ta-152", title: "Vennilavu Saaral", artist: "Various Artists", album: "Amaran (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-152.mp3", favorite: false },
  { id: "ta-153", title: "Vetti Veru Vasam", artist: "Various Artists", album: "Muthal Mariyathai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-153.mp3", favorite: false },
  { id: "ta-154", title: "Kaattumalli", artist: "Various Artists", album: "Viduthalai Part 1 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-154.mp3", favorite: false },
  { id: "ta-155", title: "Unnai Kaanadhu Naan", artist: "Various Artists", album: "Vishwaroopam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-155.mp3", favorite: false },
  { id: "ta-156", title: "Vizhi Moodi", artist: "Various Artists", album: "Ayan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-156.mp3", favorite: false },
  { id: "ta-157", title: "Whistlu Whistlu Whistluma", artist: "Various Artists", album: "Whistlu Whistlu Whistluma (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-157.mp3", favorite: false },
  { id: "ta-158", title: "Yen Paattan Saami Varum", artist: "Various Artists", album: "Idli Kadai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-158.mp3", favorite: false },
  { id: "ta-159", title: "Yuvan Mixtape", artist: "Various Artists", album: "Yuvan Mixtape (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-159.mp3", favorite: false },
  { id: "ta-160", title: "பூங்காற்று திரும்புமா", artist: "Various Artists", album: "Muthal Mariyathai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-160.mp3", favorite: false },
  { id: "ta-161", title: "ராசாத்தி உன்ன காணாத", artist: "Various Artists", album: "Vaidehi Kathirunthal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-161.mp3", favorite: false },
  { id: "ml-001", title: "Amsham ft. M.H.R, Bhumi, Circle Tone", artist: "Aksomaniac", album: "Amsham ft. M.H.R, Bhumi, Circle Tone (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-001.mp3", favorite: false },
  { id: "ml-002", title: "KALYANI", artist: "ARJN x KDS x FIFTY4 x RONN", album: "KALYANI (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-002.mp3", favorite: false },
  { id: "ml-003", title: "Aalunnu Neeye", artist: "Various Artists", album: "Rifle Club (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-003.mp3", favorite: false },
  { id: "ml-005", title: "Ada Bommale", artist: "Various Artists", album: "Vaazha 2 (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-005.mp3", favorite: false },
  { id: "ml-008", title: "Angu Vaana Konilu", artist: "Various Artists", album: "ARM (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-008.mp3", favorite: false },
  { id: "ml-010", title: "Asalayavale", artist: "Various Artists", album: "Khalifa (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-010.mp3", favorite: false },
  { id: "ml-011", title: "Baby Baby", artist: "Various Artists", album: "Painkili (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-011.mp3", favorite: false },
  { id: "ml-016", title: "Chiri Thottu", artist: "Various Artists", album: "Sarvam Maya (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-016.mp3", favorite: false },
  { id: "ml-023", title: "Everyday", artist: "Various Artists", album: "Alappuzha Gymkhana (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-023.mp3", favorite: false },
  { id: "ml-024", title: "Gandharva Ganam", artist: "Various Artists", album: "Rifle Club (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-024.mp3", favorite: false },
  { id: "ml-025", title: "GLORIA", artist: "Various Artists", album: "GLORIA (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-025.mp3", favorite: false },
  { id: "ml-028", title: "Hridayavaathil", artist: "Various Artists", album: "Hridayapoorvam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-028.mp3", favorite: false },
  { id: "ml-035", title: "Jaalakaari", artist: "Various Artists", album: "Balti (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-035.mp3", favorite: false },
  { id: "ml-036", title: "Kaadhal Nadhiye", artist: "Various Artists", album: "Pennu Case (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-036.mp3", favorite: false },
  { id: "ml-038", title: "Kaattu Raasa", artist: "Various Artists", album: "Vilaayath Budha (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-038.mp3", favorite: false },
  { id: "ml-039", title: "Kand Kand", artist: "Various Artists", album: "Thalavara (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-039.mp3", favorite: false },
  { id: "ml-040", title: "Kanmani Poove", artist: "Various Artists", album: "Kanmani Poove (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-040.mp3", favorite: false },
  { id: "ml-041", title: "Kanmanipoove", artist: "Various Artists", album: "Thudarum (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-041.mp3", favorite: false },
  { id: "ml-044", title: "Kiliye", artist: "Various Artists", album: "ARM (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-044.mp3", favorite: false },
  { id: "ml-046", title: "Kochu Keralam", artist: "Various Artists", album: "Vaazha 2 (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-046.mp3", favorite: false },
  { id: "ml-047", title: "Kodava Wedding Song", artist: "Various Artists", album: "Bromance (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-047.mp3", favorite: false },
  { id: "ml-048", title: "Kondattam", artist: "Various Artists", album: "Thudarum (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-048.mp3", favorite: false },
  { id: "ml-050", title: "Kunjikkavil Meghame", artist: "Various Artists", album: "Aashaan (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-050.mp3", favorite: false },
  { id: "ml-051", title: "Kutti Kutti Poove", artist: "Various Artists", album: "AOT (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-051.mp3", favorite: false },
  { id: "ml-053", title: "Loser Song", artist: "Various Artists", album: "I'm Game (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-053.mp3", favorite: false },
  { id: "ml-055", title: "Makane", artist: "Various Artists", album: "Vaazha (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-055.mp3", favorite: false },
  { id: "ml-056", title: "First Blood", artist: "Various Artists", album: "Marco (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-056.mp3", favorite: false },
  { id: "ml-057", title: "Mathara", artist: "Various Artists", album: "Khalifa (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-057.mp3", favorite: false },
  { id: "ml-058", title: "Mazhavillaye", artist: "Various Artists", album: "I'm Game (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-058.mp3", favorite: false },
  { id: "ml-061", title: "Minnalvala", artist: "Various Artists", album: "Narivetta (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-061.mp3", favorite: false },
  { id: "ml-062", title: "Nebulakal", artist: "Various Artists", album: "Manjummel Boys (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-062.mp3", favorite: false },
  { id: "ml-068", title: "Ninnodu Parayuvaan", artist: "Various Artists", album: "Sumathi Valavu (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-068.mp3", favorite: false },
  { id: "ml-069", title: "Nyabagam", artist: "Various Artists", album: "Varshangalkku Shesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-069.mp3", favorite: false },
  { id: "ml-070", title: "Omane", artist: "Various Artists", album: "Aadujeevitham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-070.mp3", favorite: false },
  { id: "ml-071", title: "Onam Mood", artist: "Various Artists", album: "Sahasam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-071.mp3", favorite: false },
  { id: "ml-075", title: "Panjara Punch", artist: "Various Artists", album: "Alappuzha Gymkhana (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-075.mp3", favorite: false },
  { id: "ml-077", title: "Periyone", artist: "Various Artists", album: "Aadujeevitham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-077.mp3", favorite: false },
  { id: "ml-079", title: "Pottu Pottu", artist: "Various Artists", album: "Alappuzha Gymkhana (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-079.mp3", favorite: false },
  { id: "ml-085", title: "Santhatha Sakhiye", artist: "Various Artists", album: "Sahasam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-085.mp3", favorite: false },
  { id: "ml-086", title: "Shoka Mookam", artist: "Various Artists", album: "Lokah (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-086.mp3", favorite: false },
  { id: "ml-087", title: "Shokam Venda", artist: "Various Artists", album: "Sumathi Valavu (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-087.mp3", favorite: false },
  { id: "ml-094", title: "Tuk Tuk Tuk Tu", artist: "Various Artists", album: "Hridayapoorvam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-094.mp3", favorite: false },
  { id: "ml-095", title: "Vanilla Chediye", artist: "Various Artists", album: "Vaazha 2 (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-095.mp3", favorite: false },
  { id: "ml-097", title: "Vellarathaaram", artist: "Various Artists", album: "Sarvam Maya (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-097.mp3", favorite: false },
  { id: "ml-098", title: "Venmathi", artist: "Various Artists", album: "Hridayapoorvam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-098.mp3", favorite: false },
  { id: "ml-102", title: "പുതുമഴ", artist: "Various Artists", album: "Sarvam Maya (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-102.mp3", favorite: false },
  { id: "ta-162", title: "Srivalli", artist: "Allu Arjun, Rashmika", album: "Pushpa - The Rise (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-162.mp3", favorite: false },
  { id: "ta-163", title: "10 Endrathukulla - Vroom Vroom", artist: "D. Imman", album: "Vikram, Samantha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-163.mp3", favorite: false },
  { id: "ta-164", title: "2.0 Jukebox", artist: "Shankar, A.R. Rahman", album: "Rajinikanth, Akshay Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-164.mp3", favorite: false },
  { id: "ta-165", title: "Orasaadha", artist: "Various Artists", album: "Vivek - Mervin (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-165.mp3", favorite: false },
  { id: "ta-166", title: "Raati", artist: "Various Artists", album: "Santhosh Dhayanidhi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-166.mp3", favorite: false },
  { id: "ta-167", title: "96 Songs", artist: "Vijay Sethupathi, Trisha", album: "Kaathalae Kaathalae Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-167.mp3", favorite: false },
  { id: "ta-168", title: "Alaakaa Loovaa (Unplugged)", artist: "Dhanush, Rajkumar", album: "OM (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-168.mp3", favorite: false },
  { id: "ta-169", title: "Aasa Kooda ( )", artist: "Preity Mukhundhan, Sai Smriti", album: "Thejo Bharathwaj (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-169.mp3", favorite: false },
  { id: "ta-170", title: "Pavazha Malli ( )", artist: "Shruti Haasan, Vivek", album: "Kayadu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-170.mp3", favorite: false },
  { id: "ta-171", title: "Radhimaa ( )", artist: "Vivek, Thejo Bharathwaj", album: "Bhagyashri Borse (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-171.mp3", favorite: false },
  { id: "ta-172", title: "Sithira Puthiri ( )", artist: "Akshay Sundher", album: "Meenakshi Chaudhary (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-172.mp3", favorite: false },
  { id: "ta-173", title: "Aadaludan Paadalai", artist: "Motta Shiva Ketta Shiva, Raghava Lawrence", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-173.mp3", favorite: false },
  { id: "ta-174", title: "Aadiney Irupen", artist: "GV Prakash, Sri Gouri Priya", album: "Happy Raj (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-174.mp3", favorite: false },
  { id: "ta-175", title: "Aasa Pulla", artist: "Ken Karunaas, Youth", album: "GV Prakash Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-175.mp3", favorite: false },
  { id: "ta-176", title: "Aathi", artist: "Vijay, Samantha Ruth Prabhu", album: "Kaththi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-176.mp3", favorite: false },
  { id: "ta-177", title: "Achacho", artist: "Sundar.C, Tamannaah", album: "Aranmanai 4 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-177.mp3", favorite: false },
  { id: "ta-178", title: "Adangaatha Asuran", artist: "Dhanush, A.R. Rahman", album: "RAAYAN (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-178.mp3", favorite: false },
  { id: "ta-179", title: "Adchithooku", artist: "Ajith Kumar, Nayanthara", album: "Viswasam Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-179.mp3", favorite: false },
  { id: "ta-180", title: "Adhagappattathu Magajanangalay - Yaenadi", artist: "Yuabharathi, Umapathi", album: "D. Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-180.mp3", favorite: false },
  { id: "ta-181", title: "Adi Alaye", artist: "Sivakarthikeyan, Sreeleela", album: "Parasakthi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-181.mp3", favorite: false },
  { id: "ta-182", title: "Adiye Unna Paathida", artist: "M.Sasikumar, Mia George", album: "Vetrivel (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-182.mp3", favorite: false },
  { id: "ta-183", title: "Aiyo Kadhaley", artist: "Abishan Jeevinth, Anaswara Rajan", album: "With Love (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-183.mp3", favorite: false },
  { id: "ta-184", title: "Alaakaa Loova (Tamil)", artist: "Dhanush, Mammootty", album: "OM (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-184.mp3", favorite: false },
  { id: "ta-185", title: "Anegan - Danga Maari Oodhari", artist: "Harris, Super Hit Dance Song", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-185.mp3", favorite: false },
  { id: "ta-186", title: "Annaatthe Annaatthe", artist: "Rajinikanth, S.P.B", album: "Annaatthe (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-186.mp3", favorite: false },
  { id: "ta-187", title: "Arabic Kuthu", artist: "Thalapathy Vijay, Pooja Hegde", album: "Beast (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-187.mp3", favorite: false, singer: "Anirudh Ravichander, Jonita Gandhi", year: 2022 },
  { id: "ta-188", title: "Arumbey", artist: "Vijay Antony, Kiruthiga Udhayanidhi", album: "Kaali (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-188.mp3", favorite: false },
  { id: "ta-189", title: "Asal Kolaar - Karuppu Car ft.Bank Rolls Young", artist: "(Music Video)", album: "RXZOR (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-189.mp3", favorite: false },
  { id: "ta-190", title: "Asuran - Kathari Poovazhagi", artist: "Vetri Maaran, G V Prakash", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-190.mp3", favorite: false },
  { id: "ta-192", title: "Asuran - Polladha Boomi", artist: "Vetri Maaran, G V Prakash", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-192.mp3", favorite: false },
  { id: "ta-193", title: "Aura 10⧸10", artist: "Hiphop Tamizha, Ketika Sharma", album: "Meesaya Murukku 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-193.mp3", favorite: false },
  { id: "ta-194", title: "Azhagae Nee Asainthal", artist: "Vishal, Catherine Tresa", album: "Kathakali (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-194.mp3", favorite: false },
  { id: "ta-195", title: "Babyma", artist: "Ashok Selvan, Chandini", album: "Saba Nayagan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-195.mp3", favorite: false },
  { id: "ta-196", title: "Bairavaa Songs", artist: "Vijay, Keerthy Suresh", album: "Varlaam Varlaam Vaa Lyrical Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-196.mp3", favorite: false },
  { id: "ta-197", title: "Bairavaa Songs", artist: "Vijay, Keerthy Suresh", album: "Azhagiya Soodana Poovey Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-197.mp3", favorite: false },
  { id: "ta-198", title: "Bairavaa Songs", artist: "Vijay, Keerthy Suresh", album: "Nillayo Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-198.mp3", favorite: false },
  { id: "ta-199", title: "Bairavaa Songs", artist: "Vijay, Keerthy Suresh", album: "PaPa PaPa Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-199.mp3", favorite: false },
  { id: "ta-200", title: "Bigil - Singappenney", artist: "@A. R. Rahman", album: "Thalapathy Vijay, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-200.mp3", favorite: false },
  { id: "ta-201", title: "Bigil - Unakaga Official", artist: "@ARRahman, Atlee", album: "Thalapathy Vijay, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-201.mp3", favorite: false },
  { id: "ta-202", title: "Bigil - Unakaga", artist: "@A. R. Rahman", album: "Thalapathy Vijay, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-202.mp3", favorite: false },
  { id: "ta-203", title: "Bigil - Verithanam (Tamil)", artist: "A.R Rahman, Atlee", album: "Thalapathy Vijay, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-203.mp3", favorite: false },
  { id: "ta-204", title: "Bigil - Verithanam", artist: "@A. R. Rahman, Atlee", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-204.mp3", favorite: false },
  { id: "ta-205", title: "Bodhai Kodhai", artist: "Karthik, Karky", album: "Gautham Vasudev Menon (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-205.mp3", favorite: false },
  { id: "ta-206", title: "Bogan - Damaalu Dumeelu Tamil", artist: "D. Imman", album: "Jayam Ravi, Hansikha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-206.mp3", favorite: false },
  { id: "ta-207", title: "Bogan - Senthoora", artist: "Imman, Latest Tamil Hit 2017", album: "Jayam Ravi, Hansika (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-207.mp3", favorite: false },
  { id: "ta-208", title: "Boombastic", artist: "Hiphop Tamizha, Chinna Ponnu", album: "Kadaisi Ulaga Por (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-208.mp3", favorite: false },
  { id: "ta-209", title: "Brodha V x Jordindian - Vainko [ ]", artist: "Various Artists", album: "Brodha V x Jordindian - Vainko [ ] (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-209.mp3", favorite: false },
  { id: "ta-210", title: "Bullet (Tamil)", artist: "Simbu, Lingusamy", album: "Ram Pothineni, Krithi Shetty (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-210.mp3", favorite: false },
  { id: "ta-211", title: "CITY OF GOLD (Glimpse)", artist: "Vikram Prabhu, Yuvan Shankar Raja", album: "Romeo Pictures (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-211.mp3", favorite: false },
  { id: "ta-212", title: "Chalmaar - Devi", artist: "Prabhudeva, Tamannaah", album: "Official  Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-212.mp3", favorite: false },
  { id: "ta-213", title: "Chandi Veeran", artist: "Alunguraen Kulunguraen, Video Song", album: "Tamil Movie (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-213.mp3", favorite: false },
  { id: "ta-214", title: "Chekka Chivantha Vaanam - Bhoomi Bhoomi (Tamil)", artist: "Mani Ratnam, Vairamuthu", album: "@ARRahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-214.mp3", favorite: false },
  { id: "ta-215", title: "Chennai 2 Singapore Songs", artist: "Ghibran, Abbas Akbar", album: "Vaadi Vaadi Song (Music Video) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-215.mp3", favorite: false },
  { id: "ta-216", title: "Chikitu Official", artist: "Superstar Rajinikanth, Lokesh", album: "COOLIE (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-216.mp3", favorite: false },
  { id: "ta-217", title: "Chikku Bukku - Madha Gaja Raja (Tamil)", artist: "Sundar C, Gemini Audio", album: "Vishal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-217.mp3", favorite: false },
  { id: "ta-218", title: "Chilla Chilla", artist: "Ajith Kumar, H Vinoth", album: "Thunivu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-218.mp3", favorite: false },
  { id: "ta-219", title: "Chilla Chilla - Thunivu (Tamil)", artist: "H Vinoth, Anirudh", album: "Ajith Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-219.mp3", favorite: false },
  { id: "ta-220", title: "Chinna Machan", artist: "Charlie Chaplin2, Prabhu Deva", album: "Lyrical (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-220.mp3", favorite: false },
  { id: "ta-221", title: "Cobra - Thumbi Thullal", artist: "AR Rahman, Ajay Gnanamuthu", album: "Chiyaan Vikram (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-221.mp3", favorite: false },
  { id: "ta-222", title: "Coke Studio Tamil", artist: "Arivu x Khatija Rahman", album: "Sagavaasi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-222.mp3", favorite: false },
  { id: "ta-223", title: "Coke Studio Tamil", artist: "Arivu & Ambassa Band", album: "Thamizh Vaazhthu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-223.mp3", favorite: false },
  { id: "ta-224", title: "Comali - Hi Sonna Podhum", artist: "Hiphop Tamizha", album: "Jayam Ravi, Samyuktha Hegde (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-224.mp3", favorite: false },
  { id: "ta-225", title: "Comali - Paisa Note", artist: "Hiphop Tamizha", album: "Jayam Ravi, Kajal Aggarwal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-225.mp3", favorite: false },
  { id: "ta-226", title: "DARBAR (Tamil) - Chumma Kizhi ( )", artist: "AR Murugadoss, Anirudh", album: "Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-226.mp3", favorite: false },
  { id: "ta-228", title: "DARBAR (Tamil) - Dumm Dumm ( )", artist: "AR Murugadoss, Anirudh", album: "Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-228.mp3", favorite: false },
  { id: "ta-230", title: "DARBAR (Tamil) - Tharam Maara Single ( )", artist: "AR Murugadoss, Anirudh", album: "Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-230.mp3", favorite: false },
  { id: "ta-231", title: "Dai Dakka", artist: "Rishikanth, Anishma Anilk", album: "Modha Rathri (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-231.mp3", favorite: false },
  { id: "ta-232", title: "Dev - Anange (Tamil)", artist: "Harris Jayaraj, Rajath Ravishankar", album: "Karthi, Rakul Preet Singh (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-232.mp3", favorite: false },
  { id: "ta-233", title: "Devarattam", artist: "Gautham Karthik, Muthaiya", album: "Madura Palapalakkuthu Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-233.mp3", favorite: false },
  { id: "ta-234", title: "Devi 2", artist: "Prabhu Deva, Tamannaah", album: "Ready Ready Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-234.mp3", favorite: false },
  { id: "ta-235", title: "Dharala Prabhu - Title Track", artist: "Anirudh Ravichander, Tanya Hope", album: "Harish Kalyan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-235.mp3", favorite: false },
  { id: "ta-236", title: "Dharmadurai - Aandipatti", artist: "Yuvan Shankar Raja", album: "Vijay Sethupathi, Aishwarya Rajesh (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-236.mp3", favorite: false },
  { id: "ta-237", title: "Dharmadurai - Makka Kalanguthappa", artist: "Yuvan Shankar Raja", album: "Vijay Sethupathi, Tamannaah (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-237.mp3", favorite: false },
  { id: "ta-238", title: "Dhee - Vari Vari (Unna Kaadhaliche) (Prod. Santhosh Narayanan)", artist: "Various Artists", album: "Dhee - Vari Vari (Unna Kaadhaliche) (Prod. Santhosh Narayanan) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-238.mp3", favorite: false },
  { id: "ta-239", title: "Dhee ft. Arivu - Enjoy Enjaami (Prod. Santhosh Narayanan)", artist: "Various Artists", album: "Dhee ft. Arivu - Enjoy Enjaami (Prod. Santhosh Narayanan) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-239.mp3", favorite: false },
  { id: "ta-240", title: "Dhop (Tamil)", artist: "Ram Charan, Kiara Advani", album: "Game Changer (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-240.mp3", favorite: false },
  { id: "ta-241", title: "Dikkiloona - Per Vachaalum Vaikkaama", artist: "Yuvan Shankar Raja, Karthik Yogi", album: "Santhanam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-241.mp3", favorite: false },
  { id: "ta-242", title: "Doctor - Chellamma", artist: "Anirudh Ravichander, Nelson Dilipkumar", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-242.mp3", favorite: false },
  { id: "ta-244", title: "Doctor - So Baby", artist: "Anirudh Ravichander, Nelson Dilipkumar", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-244.mp3", favorite: false },
  { id: "ta-245", title: "Don - Bae", artist: "Anirudh Ravichander, Cibi Chakaravarthi", album: "Sivakarthikeyan, Priyanka Mohan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-245.mp3", favorite: false },
  { id: "ta-246", title: "Don - Jalabulajangu", artist: "Anirudh Ravichander", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-246.mp3", favorite: false },
  { id: "ta-247", title: "Don - Private Party", artist: "Anirudh, Jonita Gandhi", album: "Sivakarthikeyan, Priyanka Mohan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-247.mp3", favorite: false },
  { id: "ta-248", title: "Don - Private Party", artist: "Anirudh", album: "Sivakarthikeyan, Priyanka Mohan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-248.mp3", favorite: false },
  { id: "ta-249", title: "Eeswaran", artist: "Silambarasan TR, Nidhhi Agerwal", album: "Mangalyam Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-249.mp3", favorite: false },
  { id: "ta-250", title: "Ekavali", artist: "Sid Sriram, Johnny", album: "Renigunta 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-250.mp3", favorite: false },
  { id: "ta-251", title: "Enakena", artist: "Pradeep Ranganathan, Anirudh", album: "Love Insurance Kompany (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-251.mp3", favorite: false },
  { id: "ta-252", title: "Enjaami Thandhaane", artist: "Dhanush, Nithya Menen", album: "Idli Kadai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-252.mp3", favorite: false },
  { id: "ta-253", title: "Enna Sugam", artist: "Dhanush, Nithya Menen", album: "Idli Kadai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-253.mp3", favorite: false },
  { id: "ta-254", title: "Ennai Kollathey", artist: "Geethaiyin Raadhai, Ztish", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-254.mp3", favorite: false },
  { id: "ta-255", title: "Esa Kaaththa", artist: "Sasikumar, Chaithra J Achar", album: "My Lord (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-255.mp3", favorite: false },
  { id: "ta-256", title: "Ey Sandakaara", artist: "R. Madhavan, Ritika Singh", album: "＂Irudhi Suttru＂ (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-256.mp3", favorite: false },
  { id: "ta-257", title: "Chikiri Chikiri", artist: "Ram Charan, Janhvi", album: "Peddi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-257.mp3", favorite: false },
  { id: "ta-258", title: "Chinna Chinna Kangal", artist: "Thalapathy Vijay, Venkat P", album: "The Greatest Of All Time (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-258.mp3", favorite: false },
  { id: "ta-259", title: "Jimikki Ponnu (Tamil) Varisu", artist: "Thaman S, Vamshi Paidipally", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-259.mp3", favorite: false },
  { id: "ta-260", title: "KANIMAA - RETRO", artist: "Karthik Subbaraj, Pooja Hegde", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-260.mp3", favorite: false },
  { id: "ta-261", title: "KISSIK (Tamil)", artist: "Allu Arjun, Sukumar", album: "Pushpa 2 The Rule (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-261.mp3", favorite: false },
  { id: "ta-262", title: "Kannumuzhi", artist: "Vetri Maaran, GV Prakash Kumar", album: "Mask (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-262.mp3", favorite: false },
  { id: "ta-263", title: "MATTA", artist: "Thalapathy Vijay, Venkat Prabhu", album: "The Greatest Of All Time (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-263.mp3", favorite: false },
  { id: "ta-264", title: "Ranjithame - Varisu", artist: "Rashmika, Vamshi Paidipally", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-264.mp3", favorite: false },
  { id: "ta-265", title: "GaandaKannazhagi", artist: "Sivakarthikeyan, SunPictures", album: "Namma Veettu Pillai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-265.mp3", favorite: false },
  { id: "ta-266", title: "Gaandu Kannamma", artist: "Ku Karthik", album: "Vivek - Mervin (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-266.mp3", favorite: false },
  { id: "ta-267", title: "Gangstaa", artist: "Ajith Kumar, H Vinoth", album: "Thunivu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-267.mp3", favorite: false },
  { id: "ta-268", title: "Gatta Kusthi 2 - Magaraasi", artist: "Zara Zyanna, Chella Ayyavu", album: "Vishnu Vishal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-268.mp3", favorite: false },
  { id: "ta-269", title: "Gemini Ganeshanum Suruli Raajanum - Vennila Thangachi", artist: "Atharvaa", album: "D. Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-269.mp3", favorite: false },
  { id: "ta-270", title: "Genie - ABDI ABDI", artist: "Ravi Mohan, Arjunan Jr.", album: "AR Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-270.mp3", favorite: false },
  { id: "ta-271", title: "God Mode", artist: "RJ Balaji, @SaiAbhyankkar", album: "Suriya's Karuppu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-271.mp3", favorite: false },
  { id: "ta-272", title: "God Mode", artist: "Suriya, RJB", album: "Karuppu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-272.mp3", favorite: false },
  { id: "ta-273", title: "Goindhamma", artist: "Hiphop Tamizha, Ramya Ranganathan", album: "Meesaya Murukku 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-273.mp3", favorite: false },
  { id: "ta-274", title: "Golden Sparrow", artist: "Priyanka Mohan, Pavish", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-274.mp3", favorite: false },
  { id: "ta-276", title: "Good Bad Ugly： Ak The Tiger", artist: "Darkkey, GV Prakash", album: "Ajith (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-276.mp3", favorite: false },
  { id: "ta-277", title: "Gulaebaghavali", artist: "4K, Kalyaan", album: "Guleba Full Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-277.mp3", favorite: false },
  { id: "ta-278", title: "Gulaebaghavali", artist: "4K, Kalyaan", album: "Guleba Video Song Promo (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-278.mp3", favorite: false },
  { id: "ta-279", title: "Gulaebaghavali", artist: "4K, Kalyaan", album: "Heartukulla Video Song Promo (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-279.mp3", favorite: false },
  { id: "ta-280", title: "Gulaebaghavali", artist: "4K, Kalyaan", album: "Seramal Ponal Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-280.mp3", favorite: false },
  { id: "ta-281", title: "Hangova", artist: "Lokesh Kanagaraj, Anirudh", album: "DC (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-281.mp3", favorite: false },
  { id: "ta-282", title: "Happy New Year (Single) - Kavan", artist: "K V Anand, HipHop Tamizha", album: "Vijay Sethupathi, T Rajhendherr (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-282.mp3", favorite: false },
  { id: "ta-283", title: "Hey Minnale", artist: "Sivakarthikeyan, Sai Pallavi", album: "Amaran (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-283.mp3", favorite: false },
  { id: "ta-284", title: "High On Love", artist: "Yuvan Shankar Raja, Sid Sriram", album: "Pyaar Prema Kaadhal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-284.mp3", favorite: false },
  { id: "ta-285", title: "High On Love", artist: "Yuvan Shankar Raja, Harish Kalyan", album: "Pyaar Prema Kaadhal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-285.mp3", favorite: false },
  { id: "ta-286", title: "Hon’ble CM Vijay - Thalapathy Kacheri ： Jana Nayagan", artist: "Anirudh", album: "H Vinoth (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-286.mp3", favorite: false },
  { id: "ta-287", title: "I - Mersalaayitten", artist: "Vikram, Amy Jackson", album: "A.R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-287.mp3", favorite: false },
  { id: "ta-288", title: "I - Pookkalae Sattru Oyivedungal", artist: "Vikram, Amy Jackson", album: "A. R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-288.mp3", favorite: false },
  { id: "ta-289", title: "Idhayam", artist: "Arjun Das, Aditi Shankar", album: "Once More (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-289.mp3", favorite: false },
  { id: "ta-290", title: "Imaikkaa Nodigal", artist: "Hiphop Tamizha, Atharvaa", album: "Kadhalikathey Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-290.mp3", favorite: false },
  { id: "ta-291", title: "Imaikkaa Nodigal", artist: "Hiphop Tamizha, Atharvaa", album: "Vilambara Idaiveli Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-291.mp3", favorite: false },
  { id: "ta-292", title: "Inayae", artist: "Thadam, Arun Vijay", album: "Full Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-292.mp3", favorite: false },
  { id: "ta-293", title: "Indian 2 - Calendar", artist: "Shankar, Anirudh", album: "Kamal Haasan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-293.mp3", favorite: false },
  { id: "ta-294", title: "Inna Mylu", artist: "Sivakarthikeyan, Kavin", album: "LIFT (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-294.mp3", favorite: false },
  { id: "ta-295", title: "Iru Mugan - Halena", artist: "Harris Jayaraj, Super Hit Song", album: "Vikram, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-295.mp3", favorite: false },
  { id: "ta-296", title: "Iru Mugan - Oh Maya Tamil", artist: "Harris Jayaraj", album: "Vikram, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-296.mp3", favorite: false },
  { id: "ta-297", title: "Irumbuthirai", artist: "Vishal, Arjun", album: "Angry Bird Video Promo (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-297.mp3", favorite: false },
  { id: "ta-298", title: "Irumbuthirai", artist: "4K, Vishal", album: "Azhagae Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-298.mp3", favorite: false },
  { id: "ta-299", title: "Ispade Rajavum Idhaya Raniyum", artist: "Harish Kalyan, Sam C.S", album: "Kannamma Song Lyrical Video Ft. Anirudh (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-299.mp3", favorite: false },
  { id: "ta-300", title: "Ispade Rajavum Idhaya Raniyum", artist: "Harish Kalyan, Shilpa Manjunath", album: "Kannamma Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-300.mp3", favorite: false },
  { id: "ta-301", title: "Ispade Rajavum Idhaya Raniyum", artist: "Harish Kalyan, Sam C.S", album: "Sandaali Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-301.mp3", favorite: false },
  { id: "ta-302", title: "JAILER - Hukum", artist: "Anirudh, Nelson", album: "Superstar Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-302.mp3", favorite: false },
  { id: "ta-303", title: "JAILER - Kaavaalaa", artist: "Anirudh, Nelson", album: "Superstar Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-303.mp3", favorite: false },
  { id: "ta-304", title: "Jagame Thandhiram - Bujji", artist: "Santhosh Narayanan, Karthik Subbaraj", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-304.mp3", favorite: false },
  { id: "ta-305", title: "Jagame Thandhiram - Rakita Rakita Rakita", artist: "Santhosh Narayanan, Karthik Subbaraj", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-305.mp3", favorite: false },
  { id: "ta-306", title: "Jai Sulthan (Tamil) - Sulthan", artist: "Vivek-Mervin, Anirudh", album: "Karthi, Rashmika (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-306.mp3", favorite: false },
  { id: "ta-307", title: "Jail - Kaathodu Kaathanen", artist: "Vasanthabalan", album: "G.V. Prakash Kumar, Dhanush, Aditi Rao Hydari (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-307.mp3", favorite: false },
  { id: "ta-308", title: "Jana Nayagan - Raavana Mavandaa", artist: "Pooja Hegde, H Vinoth", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-308.mp3", favorite: false },
  { id: "ta-309", title: "Jana Nayagan – Chella Magale", artist: "Pooja Hegde, H Vinoth", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-309.mp3", favorite: false },
  { id: "ta-310", title: "Jana Nayagan – Thalapathy Kacheri", artist: "H Vinoth, Anirudh", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-310.mp3", favorite: false },
  { id: "ta-311", title: "Jaragandi", artist: "Ram Charan, Kiara Advani", album: "Game Changer (Tamil) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-311.mp3", favorite: false },
  { id: "ta-312", title: "Jawan： Hayyoda (Tamil)", artist: "Atlee, Anirudh", album: "Shahrukh Khan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-312.mp3", favorite: false },
  { id: "ta-313", title: "Jawan： Not Ramaiya Vastavaiya Extended Version (Tamil)： Shah Rukh Khan", artist: "Anirudh, Nayanthara", album: "Atlee (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-313.mp3", favorite: false },
  { id: "ta-314", title: "Jigidi Killaadi", artist: "Dhanush, Anirudh", album: "Pattas (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-314.mp3", favorite: false },
  { id: "ta-315", title: "Jigiri Dosthu", artist: "Sivakarthikeyan, D.Imman IPandiraj", album: "Namma Veettu Pillai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-315.mp3", favorite: false },
  { id: "ta-316", title: "Jillelama", artist: "Kavin, Preethi Asrani", album: "Kiss (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-316.mp3", favorite: false },
  { id: "ta-317", title: "JollyO Gymkhana", artist: "Thalapathy Vijay, Pooja Hegde", album: "Beast (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-317.mp3", favorite: false },
  { id: "ta-318", title: "Junga", artist: "Vijay Sethupathi, Sayyeshaa", album: "Koottippo Koodave Song with Lyrics (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-318.mp3", favorite: false },
  { id: "ta-319", title: "Junga", artist: "Vijay Sethupathi, Sayyeshaa", album: "Koottippo Koodave Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-319.mp3", favorite: false },
  { id: "ta-320", title: "KANAGA OFFICIAL", artist: "Various Artists", album: "KANAGA OFFICIAL (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-320.mp3", favorite: false },
  { id: "ta-321", title: "Kaalamaadan Gaanam", artist: "Dhruv, Mari Selvaraj", album: "Bison Kaalamaadan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-321.mp3", favorite: false },
  { id: "ta-323", title: "Kaalathukkum Nee Venum", artist: "HDR, Silambarasan TR", album: "VTK (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-323.mp3", favorite: false },
  { id: "ta-324", title: "Kaappaan - Hey Amigo", artist: "Harris Jayaraj, K.V. Anand", album: "Suriya, Sayyeshaa (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-324.mp3", favorite: false },
  { id: "ta-325", title: "Kaappaan - Siriki (Tamil)", artist: "Harris Jayaraj, K.V. Anand", album: "Suriya, Sayyeshaa (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-325.mp3", favorite: false },
  { id: "ta-326", title: "Kaappaan - Siriki", artist: "Harris Jayaraj, K V Anand", album: "Suriya, Sayyeshaa (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-326.mp3", favorite: false },
  { id: "ta-327", title: "Kaathuvaakula Rendu Kaadhal - Naan Pizhai", artist: "VijaySethupathi,  Nayanthara", album: "VijaySethupathi, Nayanthara, Anirudh, VigneshShivan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-327.mp3", favorite: false },
  { id: "ta-328", title: "Kaathuvaakula Rendu Kaadhal - Rendu Kaadhal", artist: "Anirudh, Vignesh Shivan", album: "Vijay Sethupathi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-328.mp3", favorite: false },
  { id: "ta-329", title: "Kaathuvaakula Rendu Kaadhal - Two Two Two", artist: "Anirudh, Vignesh Shivan", album: "Vijay Sethupathi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-329.mp3", favorite: false },
  { id: "ta-330", title: "Kaatru Veliyidai - Azhagiye", artist: "Karthi, New Hit Song 2017", album: "A. R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-330.mp3", favorite: false },
  { id: "ta-331", title: "Kaatru Veliyidai - Saarattu Vandiyila", artist: "AR Rahman,  Mani Ratnam", album: "AR Rahman, Mani Ratnam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-331.mp3", favorite: false },
  { id: "ta-332", title: "Kabali Songs", artist: "Rajinikanth, Pa Ranjith", album: "Neruppu Da Song with Lyrics (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-332.mp3", favorite: false },
  { id: "ta-333", title: "Kabali Songs", artist: "Rajinikanth, Pa Ranjith", album: "Neruppu Da Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-333.mp3", favorite: false },
  { id: "ta-334", title: "Kadaikutty Singam - Adivellakkaara Velaayi", artist: "Karthi, Sayyeshaa", album: "Tamil Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-334.mp3", favorite: false },
  { id: "ta-335", title: "Kadaram Kondan", artist: "Abi Hassan, Akshara Haasan", album: "Thaarame Thaarame Lyrical Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-335.mp3", favorite: false },
  { id: "ta-336", title: "Kadhal Kan Kattudhe - Kaaki Sattai", artist: "Siva Karthikeyan, Sri Divya", album: "Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-336.mp3", favorite: false },
  { id: "ta-337", title: "Kadhal Oru Vizhiyil", artist: "Kanchana 3, Raghava Lawrence", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-337.mp3", favorite: false },
  { id: "ta-338", title: "Kadhalikka Neramillai - Yennai Izhukkuthadi", artist: "Ravi Mohan, Nithya Menen", album: "Feat. AR Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-338.mp3", favorite: false },
  { id: "ta-339", title: "Kalaivaniye", artist: "Hiphop Tamizha, Ramya Ranganathan", album: "Meesaya Murukku 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-339.mp3", favorite: false },
  { id: "ta-340", title: "Kalakalappu 2", artist: "Hiphop Tamizha, Jiiva", album: "Oru Kuchi Oru Kulfi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-340.mp3", favorite: false },
  { id: "ta-341", title: "Kalakalappu 2", artist: "Sundar C", album: "Pudichiruka illa Pudikalaya Video Song Feat. Hiphop Tamizha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-341.mp3", favorite: false },
  { id: "ta-342", title: "Kalakalappu 2", artist: "Jiiva, Jai", album: "Pudichiruka illa Pudikalaya Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-342.mp3", favorite: false },
  { id: "ta-343", title: "Kalloorum", artist: "Chiyaan Vikram, S.U.Arun Kumar", album: "Veera Dheera Sooran (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-343.mp3", favorite: false },
  { id: "ta-344", title: "Kalyana Virundhu", artist: "Maestro Ilaiyaraaja, Karthik Subbaraj", album: "DOROTHY (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-344.mp3", favorite: false },
  { id: "ta-345", title: "Kanaa - Othaiyadi Pathayila", artist: "Dhibu Ninan Thomas", album: "Arunraja Kamaraj (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-345.mp3", favorite: false },
  { id: "ta-346", title: "Kanaa - Vaayadi Petha Pulla", artist: "Dhibu Ninan Thomas", album: "Arunraja Kamaraj (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-346.mp3", favorite: false },
  { id: "ta-347", title: "Kanaga", artist: "Metro Shirish, Shriya Saran", album: "Non-Violence (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-347.mp3", favorite: false },
  { id: "ta-348", title: "Kannaana Kanney", artist: "Ajith Kumar, Nayanthara", album: "Viswasam Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-348.mp3", favorite: false },
  { id: "ta-349", title: "Kannaana Kanney with Lyrics", artist: "Ajith Kumar, Nayanthara", album: "Viswasam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-349.mp3", favorite: false },
  { id: "ta-350", title: "Kannae Kanmaniye 8K", artist: "Dhanush, Kriti", album: "Tere Ishk Mein (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-350.mp3", favorite: false },
  { id: "ta-351", title: "Kannamma ( )", artist: "Arun Vijay, Siddhi", album: "Retta Thala (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-351.mp3", favorite: false },
  { id: "ta-352", title: "Kannamma", artist: "Rajinikanth, Pa Ranjith", album: "Kaala (Tamil) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-352.mp3", favorite: false },
  { id: "ta-353", title: "Kanne Kanave", artist: "Atharvaa, Nimisha Sajayan", album: "DNA (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-353.mp3", favorite: false },
  { id: "ta-354", title: "Kanne Kanne", artist: "Anirudh Ravichander, Vishal", album: "Ayogya (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-354.mp3", favorite: false },
  { id: "ta-355", title: "Kannukulla", artist: "Pradeep R, Mamitha Baiju", album: "Dude (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-355.mp3", favorite: false },
  { id: "ta-356", title: "Karuppa Kooda Va", artist: "Suriya, RJ Balaji", album: "Karuppu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-356.mp3", favorite: false },
  { id: "ta-357", title: "Karuppa Kooda Va", artist: "RJ Balaji, @SaiAbhyankkar", album: "Suriya's Karuppu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-357.mp3", favorite: false },
  { id: "ta-358", title: "Karuppu Nerathazhagi - Komban", artist: "Karthi, Lakshmi Menon", album: "Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-358.mp3", favorite: false },
  { id: "ta-359", title: "Kasethan Kadavulada", artist: "Ajith Kumar, H Vinoth", album: "Thunivu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-359.mp3", favorite: false },
  { id: "ta-361", title: "Kaththi Sandai - Naan Konjam Karuppu Thaan Tamil", artist: "Hiphop Tamizha", album: "Vishal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-361.mp3", favorite: false },
  { id: "ta-362", title: "Kattikida - Kaaki Sattai", artist: "Siva Karthikeyan, Sri Divya", album: "Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-362.mp3", favorite: false },
  { id: "ta-363", title: "Kodi - Ei Suzhali Tamil", artist: "Santhosh Narayanan", album: "Dhanush, Trisha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-363.mp3", favorite: false },
  { id: "ta-364", title: "Kodi - Sirukki Vaasam Tamil", artist: "Santhosh Narayanan", album: "Dhanush, Trisha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-364.mp3", favorite: false },
  { id: "ta-365", title: "Koditta Idangalai Nirappuga", artist: "Shanthanu, R.Parthiban", album: "En Oruthiye Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-365.mp3", favorite: false },
  { id: "ta-366", title: "Kokka Makka Kokka - Devi", artist: "Prabhudeva, Tamannaah", album: "Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-366.mp3", favorite: false },
  { id: "ta-367", title: "Kolaigaran - Idhamaai ( )", artist: "Andrew Louis, Simon K.King", album: "Arjun, Vijay Antony, Ashima (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-367.mp3", favorite: false },
  { id: "ta-368", title: "Konji Pesida Venaam", artist: "Vijay Sethupathi, Remya Nambeesan", album: "Sethupathi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-368.mp3", favorite: false },
  { id: "ta-369", title: "Kovai Gethu Anthem", artist: "Hiphop Tamizha", album: "The Times Of India (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-369.mp3", favorite: false },
  { id: "ta-370", title: "Kuchi Mittai Official", artist: "Siddharth, Trisha", album: "Aranmanai 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-370.mp3", favorite: false },
  { id: "ta-371", title: "Kumki - Sollitaley Ava Kaadhala", artist: "D. Imman", album: "Vikram Prabhu, Lakshmi Menon (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-371.mp3", favorite: false },
  { id: "ta-372", title: "Kurumugil - Sita Ramam (Tamil)", artist: "Mrunal, Vishal", album: "Dulquer (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-372.mp3", favorite: false },
  { id: "ta-373", title: "Kutty Pattas", artist: "Reba John, Venki", album: "Ashwin (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-373.mp3", favorite: false },
  { id: "ta-374", title: "LEO - Naa Ready", artist: "Lokesh Kanagaraj, Anirudh Ravichander", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-374.mp3", favorite: false },
  { id: "ta-375", title: "Laali Laali", artist: "Karthi, Rakul Preet", album: "Theeran Adhigaaram Ondru Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-375.mp3", favorite: false },
  { id: "ta-376", title: "Love Insurance Kompany - Dheema", artist: "Anirudh Ravichander, Vignesh Shivan", album: "Pradeep Ranganathan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-376.mp3", favorite: false },
  { id: "ta-377", title: "Mamakutty", artist: "Yuvan Shankar Raja", album: "Pradeep Ranganathan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-377.mp3", favorite: false },
  { id: "ta-378", title: "Pacha Elai", artist: "Yuvan Shankar Raja", album: "Pradeep Ranganathan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-378.mp3", favorite: false },
  { id: "ta-379", title: "Loveah Sollitalea Official", artist: "GV Prakash, Youth", album: "Ken Karunaas (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-379.mp3", favorite: false },
  { id: "ta-380", title: "Lubber Pandhu - Chillanjirukkiye", artist: "Sean Roldan", album: "Harish Kalyan, Attakathi Dinesh (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-380.mp3", favorite: false },
  { id: "ta-381", title: "MANNARU - Mannar Muthu", artist: "RAKITAA ENTERTAINMENT", album: "Santhosh Narayanan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-381.mp3", favorite: false },
  { id: "ta-382", title: "Maamadura", artist: "Raghava Lawrence, SJ Suryah", album: "Jigarthanda DoubleX (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-382.mp3", favorite: false },
  { id: "ta-383", title: "Maan Karate - Un Vizhigalil", artist: "Sivakarthikeyan", album: "Anirudh (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-383.mp3", favorite: false },
  { id: "ta-384", title: "Maari - Don’u Don’u Don’u", artist: "Anirudh", album: "Dhanush, Kajal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-384.mp3", favorite: false },
  { id: "ta-385", title: "Maari - Don’u Don’u Don’u", artist: "Anirudh, Super Hit Song", album: "Dhanush, Kajal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-385.mp3", favorite: false },
  { id: "ta-386", title: "Maari - Maari Thara Local", artist: "Anirudh Ravichander", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-386.mp3", favorite: false },
  { id: "ta-387", title: "Maari 2 - Maari Gethu ( )", artist: "Yuvan Shankar Raja, Balaji Mohan", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-387.mp3", favorite: false },
  { id: "ta-388", title: "Maari 2 - Maari's Aanandhi ( )", artist: "Yuvan Shankar Raja, Balaji Mohan", album: "Dhanush, Sai Pallavi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-388.mp3", favorite: false },
  { id: "ta-389", title: "Maari 2 - Rowdy Baby ( )", artist: "Yuvan Shankar Raja, Balaji Mohan", album: "Dhanush, Sai Pallavi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-389.mp3", favorite: false },
  { id: "ta-390", title: "Macarena", artist: "A R Rahman, Moonwalk 2026", album: "Prabhudeva (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-390.mp3", favorite: false },
  { id: "ta-391", title: "Madras To Madurai", artist: "Vishal, Sundar C", album: "Aambala (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-391.mp3", favorite: false },
  { id: "ta-392", title: "Mahaan - Evanda Enakku Custody", artist: "KarthikSubbaraj, Santhosh Narayanan", album: "Chiyaan Vikram (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-392.mp3", favorite: false },
  { id: "ta-393", title: "Mahaan - Evanda Enakku Custody", artist: "Santhosh Narayanan", album: "Chiyaan Vikram (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-393.mp3", favorite: false },
  { id: "ta-394", title: "Mailaanji", artist: "Sivakarthikeyan, Pandiraj", album: "Namma Veettu Pillai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-394.mp3", favorite: false },
  { id: "ta-395", title: "Makkamishi", artist: "Jayam Ravi, Priyanka Mohan", album: "Brother (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-395.mp3", favorite: false },
  { id: "ta-396", title: "Makkaru - Official - T Suriavelan", artist: "Karnan Gcrak", album: "Stephen Zechariah (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-396.mp3", favorite: false },
  { id: "ta-397", title: "Mallipoo", artist: "HDR, Silambarasan TR", album: "VTK (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-397.mp3", favorite: false },
  { id: "ta-398", title: "Manasilaayo", artist: "Rajinikanth, Anirudh Ravichander", album: "Vettaiyan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-398.mp3", favorite: false },
  { id: "ta-399", title: "Mandaadi Mandaadi", artist: "Suhas, GV Prakash Kumar", album: "Soori (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-399.mp3", favorite: false },
  { id: "ta-400", title: "Manogari - 4k [Tamil]", artist: "Prabhas, Rana", album: "Baahubali - The Beginning (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-400.mp3", favorite: false },
  { id: "ta-401", title: "Marakkavillayae", artist: "Nani, Shraddha Srinath", album: "JERSEY (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-401.mp3", favorite: false },
  { id: "ta-402", title: "Maruthu - Akka Petha Jakkavandi", artist: "D. Imman", album: "Vishal, Sri Divya (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-402.mp3", favorite: false },
  { id: "ta-403", title: "Maruthu - Karuvakaatu Karuvaaya", artist: "D. Imman", album: "Vishal, Sri Divya (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-403.mp3", favorite: false },
  { id: "ta-404", title: "Maruvaarthai", artist: "Dhanush, Darbuka Siva", album: "Enai Noki Paayum Thota (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-404.mp3", favorite: false },
  { id: "ta-406", title: "Master - Kutti Story", artist: "Anirudh Ravichander, Lokesh Kanagaraj", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-406.mp3", favorite: false },
  { id: "ta-407", title: "Master - Vaathi Coming", artist: "Anirudh Ravichander, Lokesh Kanagaraj", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-407.mp3", favorite: false },
  { id: "ta-408", title: "Master - Vaathi Raid", artist: "Anirudh Ravichander, Lokesh Kanagaraj", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-408.mp3", favorite: false },
  { id: "ta-409", title: "Mayakirriye", artist: "Aathmika, Anirudh Ravichander", album: "Mugen Rao (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-409.mp3", favorite: false },
  { id: "ta-410", title: "Mayile Audio", artist: "AR Rahman, Prabhudeva", album: "Moonwalk (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-410.mp3", favorite: false },
  { id: "ta-411", title: "Mazhaikkulle", artist: "Vijay Sethupathi, Ranjit Jeyakodi", album: "Puriyaatha Puthir (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-411.mp3", favorite: false },
  { id: "ta-412", title: "Meesaya Murukku Songs", artist: "Hiphop Tamizha, Aathmika", album: "Sakkarakatti Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-412.mp3", favorite: false },
  { id: "ta-413", title: "Megham Karukatha", artist: "Dhanush, Anirudh", album: "Thiruchitrambalam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-413.mp3", favorite: false },
  { id: "ta-414", title: "Meherezylaa", artist: "Silambarasan TR, Yuvan Shankar Raja", album: "Maanaadu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-414.mp3", favorite: false },
  { id: "ta-415", title: "Mersal - Aalaporan Thamizhan Tamil", artist: "A.R. Rahman", album: "Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-415.mp3", favorite: false },
  { id: "ta-416", title: "Mersal - Maacho Tamil", artist: "A.R. Rahman", album: "Vijay, Kajal Aggarwal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-416.mp3", favorite: false },
  { id: "ta-417", title: "Mersal - Mersal Arasan Tamil", artist: "A.R. Rahman", album: "Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-417.mp3", favorite: false },
  { id: "ta-418", title: "Meyaadha Maan", artist: "Vaibhav, Priya", album: "Address Song - Adiye S.Madhu Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-418.mp3", favorite: false },
  { id: "ta-419", title: "Meyaadha Maan", artist: "Vaibhav, Santhosh Narayanan", album: "Area Gaana - Enga Veetu Kuthuvilakkey Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-419.mp3", favorite: false },
  { id: "ta-420", title: "Meyaadha Maan", artist: "Vaibhav, Priya", album: "Nee Mattum Podhum Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-420.mp3", favorite: false },
  { id: "ta-421", title: "Meyaadha Maan", artist: "Vaibhav, Priya", album: "Thangachi Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-421.mp3", favorite: false },
  { id: "ta-422", title: "Minikki Minikki - (Tamil)", artist: "Chiyaan Vikram, Pa Ranjith", album: "Thangalaan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-422.mp3", favorite: false },
  { id: "ta-423", title: "Monica", artist: "Superstar Rajinikanth, Lokesh", album: "COOLIE (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-423.mp3", favorite: false },
  { id: "ta-425", title: "Moonwalk - Yethu", artist: "Prabhudeva, Manoj NS", album: "AR Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-425.mp3", favorite: false },
  { id: "ta-426", title: "Mounam Sollum Varthaigal", artist: "Rahul Riji Nair, Sidhartha Pradeep", album: "Tamil Music Video ft Vinitha Koshy (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-426.mp3", favorite: false },
  { id: "ta-427", title: "Mr.Local", artist: "Sivakarthikeyan, Nayanthara", album: "Takkunu Takkunu Lyric Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-427.mp3", favorite: false },
  { id: "ta-428", title: "Mr.Local", artist: "Sivakarthikeyan, Nayanthara", album: "Takkunu Takkunu Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-428.mp3", favorite: false },
  { id: "ta-429", title: "Muthumani - DOROTHY", artist: "Karthik Subbaraj", album: "Maestro Ilaiyaraaja (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-429.mp3", favorite: false },
  { id: "ta-430", title: "Mutta Kalakki", artist: "Ken Karunaas, Suraj Venjaramoodu", album: "Youth (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-430.mp3", favorite: false },
  { id: "ta-431", title: "NGK - Anbae Peranbae", artist: "Yuvan Shankar Raja, Selvaraghavan", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-431.mp3", favorite: false },
  { id: "ta-432", title: "Naam - Adi Penne (Duet) [4K] - T Suriavelan", artist: "Stephen Zechariah ft Srinisha", album: "Rupiny (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-432.mp3", favorite: false },
  { id: "ta-433", title: "Naan Aval Illai", artist: "Suriya, Nayanthara", album: "Masss (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-433.mp3", favorite: false },
  { id: "ta-434", title: "Naan Kudikka Poren - Ratty Adhiththan feat.@SahiSiva", artist: "TamilRap", album: "Official Music Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-434.mp3", favorite: false },
  { id: "ta-435", title: "Naan Mahaan Alle- Iragai Pole HD [1080]", artist: "Various Artists", album: "Naan Mahaan Alle- Iragai Pole HD [1080] (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-435.mp3", favorite: false },
  { id: "ta-436", title: "Naan Pizhaippeno", artist: "Darbuka Siva, Thamarai", album: "Enai Noki Paayum Thota (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-436.mp3", favorite: false },
  { id: "ta-437", title: "Naan Sirithal", artist: "Iswarya Menon, Sundar C", album: "Breakup Song Video Feat. Hiphop Tamizha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-437.mp3", favorite: false },
  { id: "ta-438", title: "Naan Sirithal", artist: "Hiphop Tamizha, Iswarya Menon", album: "Dhom Dhom Song Lyric Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-438.mp3", favorite: false },
  { id: "ta-439", title: "Naan Un - Audio", artist: "Suriya, Samantha", album: "24 Movie (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-439.mp3", favorite: false },
  { id: "ta-440", title: "Naanga Naalu Peru", artist: "RJ Balaji, @SaiAbhyankkar", album: "Suriya's Karuppu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-440.mp3", favorite: false },
  { id: "ta-441", title: "Naanum Rowdy Dhaan - Thangamey", artist: "Anirudh, Vijay Sethupathi", album: "Official Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-441.mp3", favorite: false },
  { id: "ta-442", title: "Naanum Rowdy Dhaan - Yennai Maatrum Kadhale", artist: "Sid Sriram, Anirudh", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-442.mp3", favorite: false },
  { id: "ta-443", title: "Nallaru Po", artist: "Pradeep Ranganathan, @SaiAbhyankkar", album: "Dude (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-443.mp3", favorite: false },
  { id: "ta-444", title: "Nanbanukku Koila Kattu", artist: "Kanchana 3, Raghava Lawrence", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-444.mp3", favorite: false },
  { id: "ta-445", title: "Natpe Thunai", artist: "Hiphop Tamizha Ft. Crazy Fans, Sundar C", album: "Kerala Song Lyrical Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-445.mp3", favorite: false },
  { id: "ta-446", title: "Natpe Thunai", artist: "Hiphop Tamizha, Sundar C", album: "Pallikoodam - The Farewell Song Lyric Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-446.mp3", favorite: false },
  { id: "ta-447", title: "Natpe Thunai", artist: "Hiphop Tamizha, Sundar C", album: "Single Pasanga Lyrical Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-447.mp3", favorite: false },
  { id: "ta-448", title: "Natpe Thunai", artist: "Hiphop Tamizha, Anagha", album: "Vengamavan Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-448.mp3", favorite: false },
  { id: "ta-449", title: "Neeyum Naanum Anbe", artist: "Vijay Sethupathi, Nayanthara", album: "Imaikkaa Nodigal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-449.mp3", favorite: false },
  { id: "ta-450", title: "Nenjorathil - Pichaikkaran", artist: "Supriya Joshi, Vijay Antony", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-450.mp3", favorite: false },
  { id: "ta-451", title: "Nimir - Nenjil Maamazhai", artist: "Udhayanidhi Stalin,  Namitha Pramod", album: "Udhayanidhi Stalin, Namitha Pramod (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-451.mp3", favorite: false },
  { id: "ta-452", title: "Ninaithale Inikkum - Azhagaai Pookkuthey", artist: "Various Artists", album: "Vijay Antony (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-452.mp3", favorite: false },
  { id: "ta-453", title: "Endi Ippadi", artist: "Siddharth, Deepa Sannidhi", album: "Enakkul Oruvan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-453.mp3", favorite: false },
  { id: "ta-454", title: "Oh My Kadavule - Kadhaippoma", artist: "Leon James", album: "Ashok Selvan, Ritika Singh (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-454.mp3", favorite: false },
  { id: "ta-455", title: "Om Shiva Hom Full", artist: "Various Artists", album: "Naan Kadavul Movie  Original Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-455.mp3", favorite: false },
  { id: "ta-456", title: "Onnappola Oruthana", artist: "M.Sasikumar, Nikhila Vimal", album: "Vetrivel (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-456.mp3", favorite: false },
  { id: "ta-457", title: "Oo Solriya (Tamil)", artist: "Allu Arjun, Rashmika", album: "Pushpa (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-457.mp3", favorite: false },
  { id: "ta-458", title: "Oorum Blood", artist: "Pradeep Ranganathan, Mamitha", album: "Dude (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-458.mp3", favorite: false },
  { id: "ta-459", title: "Oru Naal Koothu Songs", artist: "Dinesh, Nivetha Pethuraj", album: "Adiyae Azhagae Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-459.mp3", favorite: false },
  { id: "ta-460", title: "Oru Sattai Oru Balpam", artist: "Kanchana 3, Raghava Lawrence", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-460.mp3", favorite: false },
  { id: "ta-461", title: "Oxygen", artist: "Hiphop Tamizha, K V Anand", album: "Kavan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-461.mp3", favorite: false },
  { id: "ta-462", title: "PEELINGS Tamil", artist: "Allu Arjun, Rashmika", album: "Pushpa 2 The Rule (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-462.mp3", favorite: false },
  { id: "ta-463", title: "Paal Dabba x ofRo - Kaathu Mela ( )", artist: "Various Artists", album: "Think Indie (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-463.mp3", favorite: false },
  { id: "ta-464", title: "Paambhu Sattai", artist: "Bobby Simha, Keerthy Suresh", album: "Nee Uravaaga Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-464.mp3", favorite: false },
  { id: "ta-465", title: "Paayum Puli - Marudhakaari", artist: "Vishal, Kajal Aggarwal", album: "D Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-465.mp3", favorite: false },
  { id: "ta-466", title: "Paayum Puli - Naan Soodana - Official", artist: "Vishal, Suseenthiran", album: "D Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-466.mp3", favorite: false },
  { id: "ta-467", title: "Paayum Puli - Silukku Marame - Official", artist: "Vishal, Suseenthiran", album: "D Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-467.mp3", favorite: false },
  { id: "ta-468", title: "Paayum Puli - Yaar Indha Muyalkutti - Official", artist: "Vishal, Suseenthiran", album: "D Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-468.mp3", favorite: false },
  { id: "ta-469", title: "Pathala Pathala", artist: "Kamal Haasan, Anirudh Ravichander", album: "VIKRAM (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-469.mp3", favorite: false },
  { id: "ta-470", title: "Pathu Thala - Namma Satham", artist: "Silambarasan TR, Gautham Karthik", album: "A. R Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-470.mp3", favorite: false },
  { id: "ta-471", title: "Pattampoochi", artist: "Suriya, Mamitha Baiju", album: "Vishwanath and Sons (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-471.mp3", favorite: false },
  { id: "ta-473", title: "Pazhagikalam - Aambala", artist: "Vishal, Hansika", album: "Full Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-473.mp3", favorite: false },
  { id: "ta-474", title: "Petta - Marana Mass (Tamil)", artist: "Anirudh Ravichander", album: "Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-474.mp3", favorite: false },
  { id: "ta-475", title: "Pokkiri Raja - Bubbly Bubbly", artist: "D. Imman", album: "Jiiva, Hansika Motwani (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-475.mp3", favorite: false },
  { id: "ta-476", title: "Police Kaarana Kattikitta - 4K", artist: "Prabhu Deva, Madonna", album: "JollyO Gymkhana (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-476.mp3", favorite: false },
  { id: "ta-477", title: "Polladha Ulagam - [4K]", artist: "Dhanush, Karthick Naren", album: "Maaran (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-477.mp3", favorite: false },
  { id: "ta-478", title: "Ponni Nadhi", artist: "Tamil, AR Rahman", album: "Ponniyin Selvan 1 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-478.mp3", favorite: false },
  { id: "ta-479", title: "Pottala Muttaye", artist: "Vijay Sethupathi, Nithya Menen", album: "Thalaivan Thalaivii (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-479.mp3", favorite: false },
  { id: "ta-481", title: "Powerhouse", artist: "Superstar Rajinikanth, Lokesh", album: "Coolie (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-481.mp3", favorite: false },
  { id: "ta-482", title: "Poyivaa Nanba (Tamil)", artist: "Dhanush, Nagarjuna", album: "Kuberaa (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-482.mp3", favorite: false },
  { id: "ta-483", title: "Poyivaa Nanba", artist: "Dhanush, Nagarjuna", album: "Kuberaa (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-483.mp3", favorite: false },
  { id: "ta-484", title: "Psycho - Unna Nenachu", artist: "Ilayaraja, Mysskin", album: "Udhayanidhi Stalin (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-484.mp3", favorite: false },
  { id: "ta-485", title: "Psycho - Unna Nenachu", artist: "Ilayaraja", album: "Udhayanidhi Stalin, Aditi Rao Hydari (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-485.mp3", favorite: false },
  { id: "ta-486", title: "Puli - Yaendi Yaendi", artist: "DSP", album: "Vijay, Shruti Haasan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-486.mp3", favorite: false },
  { id: "ta-487", title: "Puli Manga Pulip", artist: "Santhanam, Santhosh Narayanan", album: "Parris Jeyaraj (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-487.mp3", favorite: false },
  { id: "ta-488", title: "Raathu Raasan", artist: "RJ Balaji, @SaiAbhyankkar", album: "Suriya's Karuppu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-488.mp3", favorite: false },
  { id: "ta-489", title: "Raga of Revenge (From ＂DC＂)", artist: "Various Artists", album: "Raga of Revenge (From ＂DC＂) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-489.mp3", favorite: false },
  { id: "ta-490", title: "Rajinimurugan - Jigiru Jigiru", artist: "D. Imman", album: "Sivakarthikeyan ,Keerthi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-490.mp3", favorite: false },
  { id: "ta-491", title: "Rajinimurugan - Un Mele Oru Kannu", artist: "Imman", album: "Sivakarthikeyan, Keethi Suresh (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-491.mp3", favorite: false },
  { id: "ta-492", title: "Rajinimurugan - Yennamma Ippadi Panreengalaema", artist: "D. Imman", album: "Sivakarthikeyan ,Keerthi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-492.mp3", favorite: false },
  { id: "ta-493", title: "Rangu Rakkara", artist: "Raghava Lawrencce & Ritika Singh, Tamil Song", album: "Sivalinga (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-493.mp3", favorite: false },
  { id: "ta-494", title: "Ranjithame - Varisu (Tamil)", artist: "Rashmika, Vamshi Paidipally", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-494.mp3", favorite: false },
  { id: "ta-495", title: "Rasaali - Promo", artist: "A R Rahman, STR", album: "Achcham Yenbadhu Madamaiyada (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-495.mp3", favorite: false },
  { id: "ta-496", title: "Rasagulla", artist: "Nayanthara, Kavin", album: "Hi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-496.mp3", favorite: false },
  { id: "ta-497", title: "Rasathi ( )", artist: "@mmoriginalstamil ​", album: "Shankar Mahadevan • Anthony Daasan • KJ Iyenar (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-497.mp3", favorite: false },
  { id: "ta-498", title: "Rekka - Kanna Kaattu Podhum Tamil", artist: "D. Imman", album: "Vijay Sethupathi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-498.mp3", favorite: false },
  { id: "ta-499", title: "Rekka Rekka", artist: "Dhruv Vikram, Mari Selvaraj", album: "Bison Kaalamaadan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-499.mp3", favorite: false },
  { id: "ta-500", title: "Remo - Senjitaley", artist: "Anirudh, Latest Hit Song", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-500.mp3", favorite: false },
  { id: "ta-501", title: "Remo - Sirikkadhey", artist: "Anirudh Ravichander, Keerthi Suresh", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-501.mp3", favorite: false },
  { id: "ta-502", title: "Remo - Tamilselvi", artist: "Anirudh, Keerthi Suresh", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-502.mp3", favorite: false },
  { id: "ta-503", title: "Romeo Juliet - Dandanakka", artist: "Imman", album: "Jayam Ravi, Hansika (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-503.mp3", favorite: false },
  { id: "ta-504", title: "Rudhran – Jorthaale", artist: "Sarath Kumar, ofRo", album: "Raghava Lawrence (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-504.mp3", favorite: false },
  { id: "ta-506", title: "Rummy Rummy", artist: "Vijay Sethupathi, Arvind Swamy", album: "Gandhi Talks (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-506.mp3", favorite: false },
  { id: "ta-507", title: "Saami Saami (Tamil)", artist: "Allu Arjun, Rashmika", album: "Pushpa (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-507.mp3", favorite: false },
  { id: "ta-508", title: "Saami Saami (Tamil)", artist: "Allu Arjun, Rashmika", album: "Pushpa - The Rise (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-508.mp3", favorite: false },
  { id: "ta-509", title: "Saamy² - Pudhu Metro Rail", artist: "DSP", album: "Chiyaan Vikram, Keerthy Suresh (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-509.mp3", favorite: false },
  { id: "ta-510", title: "Saamy² - Pudhu Metro Rail", artist: "Devi Sri Prasad, Hari", album: "Chiyaan Vikram, Keerthy Suresh (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-510.mp3", favorite: false },
  { id: "ta-511", title: "Saara Kaatrae", artist: "Rajinikanth, D.Imman", album: "Annaatthe (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-511.mp3", favorite: false },
  { id: "ta-512", title: "Sagaa Songs", artist: "Saran, Ayra", album: "Yaayum Video Song (யாயும்) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-512.mp3", favorite: false },
  { id: "ta-513", title: "Salambala", artist: "Rukmini, A.R.Murugadoss", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-513.mp3", favorite: false },
  { id: "ta-514", title: "Sambavakaari", artist: "Vishnu Vishal, Aishwarya Lekshmi", album: "Gatta Kusthi 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-514.mp3", favorite: false },
  { id: "ta-515", title: "Sandakozhi 2 - Kambathu Ponnu Tamil", artist: "Yuvanshankar Raja", album: "Vishal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-515.mp3", favorite: false },
  { id: "ta-516", title: "Sandakozhi 2 - Sengarattan Paaraiyula Tamil", artist: "Yuvanshankar Raja", album: "Vishal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-516.mp3", favorite: false },
  { id: "ta-517", title: "Sangathamizhan - Kamala", artist: "Vivek-Mervin", album: "Vijay Sethupathi, Raashi Khanna (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-517.mp3", favorite: false },
  { id: "ta-518", title: "Saravanan Irukka Bayamaen - Yembuttu Irukkuthu Aasai", artist: "Latest Hit", album: "Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-518.mp3", favorite: false },
  { id: "ta-519", title: "Sardar - Mere Jaan", artist: "GV Prakash Kumar", album: "Karthi, RaashiiKhanna (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-519.mp3", favorite: false },
  { id: "ta-520", title: "Sarkar - OMG Ponnu (Tamil)", artist: "@ARRahman", album: "Thalapathy Vijay, Keerthy Suresh (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-520.mp3", favorite: false },
  { id: "ta-521", title: "Sarkar - Simtaangaran", artist: "A .R. Rahman, A.R Murugadoss", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-521.mp3", favorite: false },
  { id: "ta-522", title: "Sarvam Thaala Mayam - Full (Tamil )", artist: "GV Prakash, JioStudios", album: "A R Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-522.mp3", favorite: false },
  { id: "ta-523", title: "Sathya Songs", artist: "Sibi Sathyaraj, Remya Nambeesan", album: "Yavvana Song with Lyrics (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-523.mp3", favorite: false },
  { id: "ta-524", title: "Sathya Songs", artist: "Sibi Sathyaraj, Remya Nambeesan", album: "Yavvana Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-524.mp3", favorite: false },
  { id: "ta-525", title: "Sawadeeka", artist: "Ajith Kumar, Trisha", album: "Vidaamuyarchi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-525.mp3", favorite: false },
  { id: "ta-526", title: "Seemaraja - Vaaren Vaaren Seemaraja", artist: "Ponram, D. Imman", album: "Sivakarthikeyan, Samantha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-526.mp3", favorite: false },
  { id: "ta-527", title: "Seemaraja", artist: "Sivakarthikeyan, Samantha", album: "Onnavitta Yaarum Yenakilla Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-527.mp3", favorite: false },
  { id: "ta-528", title: "Selfie Pulla", artist: "Vijay, Samantha", album: "Kaththi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-528.mp3", favorite: false },
  { id: "ta-529", title: "Sema Songs", artist: "G.V. Prakash Kumar, Arthana Binu", album: "Sandalee Song with Lyrics (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-529.mp3", favorite: false },
  { id: "ta-530", title: "Sema Songs", artist: "G.V. Prakash Kumar, Arthana Binu", album: "Sandalee Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-530.mp3", favorite: false },
  { id: "ta-531", title: "Sevatha Pulla", artist: "Karthi, Rakul Preet", album: "Theeran Adhigaaram Ondru Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-531.mp3", favorite: false },
  { id: "ta-532", title: "Shake Yo Body", artist: "Kanchana 3, Raghava Lawrence", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-532.mp3", favorite: false },
  { id: "ta-533", title: "Shoot The Kuruvi", artist: "Siddharth, Vishal Chandrashekhar", album: "Jil Jung Juk (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-533.mp3", favorite: false },
  { id: "ta-534", title: "Siddhu Kumar - Adipoli", artist: "Kushee, Sivaangi", album: "Ashwin Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-534.mp3", favorite: false },
  { id: "ta-535", title: "Sidu Sidu", artist: "Vijay Antony, Mirnalini", album: "Romeo (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-535.mp3", favorite: false },
  { id: "ta-536", title: "Simtaangaran", artist: "Sarkar, Thalapathy Vijay", album: "Lyric Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-536.mp3", favorite: false },
  { id: "ta-537", title: "Sindhubaadh", artist: "Vijay Sethupathi, Anjali", album: "Nenja Unakaga Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-537.mp3", favorite: false },
  { id: "ta-538", title: "Singari", artist: "Pradeep Ranganathan, Mamitha Baiju", album: "Dude (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-538.mp3", favorite: false },
  { id: "ta-539", title: "Sirai - Neelothi", artist: "L K Akshay Kumar, Justin Prabhakaran", album: "Vikram Prabhu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-539.mp3", favorite: false },
  { id: "ta-540", title: "Sivakumar Pondati Official", artist: "Hiphop Tamizha", album: "Sivakumarin Sabadham (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-540.mp3", favorite: false },
  { id: "ta-541", title: "Soorarai Pottru - Kaattu Payale", artist: "G.V. Prakash Kumar, Sudha Kongara", album: "Suriya, Aparna (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-541.mp3", favorite: false },
  { id: "ta-542", title: "Soorarai Pottru - Veyyon Silli", artist: "G.V. Prakash Kumar, Sudha Kongara", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-542.mp3", favorite: false },
  { id: "ta-543", title: "Suttum Vizhi - Ghajini", artist: "Asin, Nayanthara", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-543.mp3", favorite: false },
  { id: "ta-544", title: "Thaai Kelavi", artist: "Dhanush, Anirudh", album: "Thiruchitrambalam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-544.mp3", favorite: false },
  { id: "ta-545", title: "Thaai Kizhavi Vaaraa", artist: "Radikaa, Sivakarthikeyan", album: "Thaai Kizhavi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-545.mp3", favorite: false },
  { id: "ta-546", title: "Thaanaa Serndha Koottam - Naana Thaana", artist: "Anirudh l Vignesh ShivN", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-546.mp3", favorite: false },
  { id: "ta-547", title: "Thaanaa Serndha Koottam - Naana Thaana Tamil", artist: "Anirudh l Keerthi Suresh", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-547.mp3", favorite: false },
  { id: "ta-548", title: "Thaanaa Serndha Koottam - Peela Peela Teaser", artist: "Anirudh l VigneshShivN, Keerthi Suresh", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-548.mp3", favorite: false },
  { id: "ta-549", title: "Thaanaa Serndha Koottam - Peela Peela", artist: "Anirudh l Keerthi Suresh", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-549.mp3", favorite: false },
  { id: "ta-550", title: "Thaanaa Serndha Koottam - Sodakku Tamil", artist: "Anirudh l Keerthi Suresh", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-550.mp3", favorite: false },
  { id: "ta-551", title: "Thaarame Thaarame", artist: "Abi Hassan, Akshara Haasan", album: "Kadaram Kondan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-551.mp3", favorite: false },
  { id: "ta-552", title: "Thalli Pogathey", artist: "A R Rahman, Lyric Video", album: "Achcham Yenbadhu Madamaiyada (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-552.mp3", favorite: false },
  { id: "ta-553", title: "Thalli Pogathey", artist: "A R Rahman, STR", album: "Achcham Yenbadhu Madamaiyada (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-553.mp3", favorite: false },
  { id: "ta-554", title: "Thangamagan - Enna Solla", artist: "Dhanush", album: "Anirudh Ravichander (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-554.mp3", favorite: false },
  { id: "ta-555", title: "Thangame Thangame", artist: "Atharvaa, Preity Mukhundhan", album: "Idhayam Murali (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-555.mp3", favorite: false },
  { id: "ta-556", title: "Thangapoovey", artist: "Sivakarthikeyan, Rukmini", album: "Madharaasi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-556.mp3", favorite: false },
  { id: "ta-557", title: "Thani Oruvan - Kannala Kannala", artist: "Hip Hop Tamizha", album: "Jayam Ravi, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-557.mp3", favorite: false },
  { id: "ta-558", title: "Thappu Pannitten", artist: "Kalidas, Megha Akash", album: "Silambarasan TR (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-558.mp3", favorite: false },
  { id: "ta-559", title: "The Wedding (Tamil)", artist: "Suriya, Mamitha Baiju", album: "Vishwanath and Sons (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-559.mp3", favorite: false },
  { id: "ta-560", title: "The Wedding (Tamil)", artist: "Suriya, MamithaBaiju", album: "Vishwanath and Sons (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-560.mp3", favorite: false },
  { id: "ta-561", title: "Thee Thalapathy", artist: "Varisu, STR", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-561.mp3", favorite: false },
  { id: "ta-562", title: "Theekkoluthi", artist: "Dhruv, Anupama", album: "Bison Kaalamaadan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-562.mp3", favorite: false },
  { id: "ta-563", title: "Theekkoluthi", artist: "Dhruv Vikram, Anupama Parameswaran", album: "Bison Kaalamaadan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-563.mp3", favorite: false },
  { id: "ta-564", title: "Theerathae", artist: "Pancharaaksharam Movie Songs, Sundaramurthy KS", album: "Sid Sriram (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-564.mp3", favorite: false },
  { id: "ta-565", title: "Theeyaga Thondri", artist: "Hariharan, Shankar Mahadevan", album: "Aranmanai 3 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-565.mp3", favorite: false },
  { id: "ta-566", title: "Thenmozhi", artist: "Dhanush, Anirudh", album: "Thiruchitrambalam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-566.mp3", favorite: false },
  { id: "ta-567", title: "Theri Songs", artist: "Vijay, Nainika", album: "Eena Meena Teeka Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-567.mp3", favorite: false },
  { id: "ta-568", title: "Theri Songs", artist: "Vijay, Samantha", album: "En Jeevan Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-568.mp3", favorite: false },
  { id: "ta-569", title: "Theri Songs", artist: "Vijay, Samantha", album: "Jithu Jilladi Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-569.mp3", favorite: false },
  { id: "ta-570", title: "Theri Songs", artist: "Vijay, Samantha", album: "Raangu Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-570.mp3", favorite: false },
  { id: "ta-571", title: "Theruvorom - Avathaaram [4K] - T Suriavelan", artist: "MC SAI", album: "Stephen Zechariah (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-571.mp3", favorite: false },
  { id: "ta-572", title: "Thirudi", artist: "Kavin, Sathish", album: "Kiss (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-572.mp3", favorite: false },
  { id: "ta-573", title: "Thiruttuppayale 2", artist: "Susi Ganeshan, Vidyasagar", album: "Nee Paarkum Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-573.mp3", favorite: false },
  { id: "ta-574", title: "Thiruttuppayale 2", artist: "Susi Ganeshan, Vidyasagar", album: "Neenda Naal Song Lyrical (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-574.mp3", favorite: false },
  { id: "ta-575", title: "Thodakkam Mangalyam", artist: "Arya, Bobby Simha", album: "Bangalore Naatkal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-575.mp3", favorite: false },
  { id: "ta-576", title: "Thodari Songs", artist: "Dhanush, Keerthy Suresh", album: "Adadaa Ithuyenna Full Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-576.mp3", favorite: false },
  { id: "ta-577", title: "Tik Tik Tik - Kurumba", artist: "D.Imman, Sid Sriram", album: "Jayam Ravi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-577.mp3", favorite: false },
  { id: "ta-579", title: "Tik Tik Tik - Title Track", artist: "D.Imman", album: "Jayam Ravi, Nivetha Pethuraj (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-579.mp3", favorite: false },
  { id: "ta-580", title: "Tinga - Moonwalk", artist: "Prabhudeva, Manoj N S", album: "A R Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-580.mp3", favorite: false },
  { id: "ta-581", title: "U Turn - The Karma Theme (Tamil) - Samantha", artist: "Pawan Kumar", album: "Anirudh Ravichander (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-581.mp3", favorite: false },
  { id: "ta-582", title: "UNNA ENNI", artist: "ISAIGNANI ILAIYARAAJA, KAYAL VINCENT", album: "ANTHONY TAMIL (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-582.mp3", favorite: false },
  { id: "ta-583", title: "Ullaallaa (Tamil)", artist: "Rajinikanth, Anirudh Ravichander", album: "Petta Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-583.mp3", favorite: false },
  { id: "ta-584", title: "Urugudhu Urugudhu", artist: "Vijay Sethupathi, Rukmini", album: "Ace (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-584.mp3", favorite: false },
  { id: "ta-585", title: "Ussumu Laresey Official", artist: "Dhanush, Genelia", album: "Uthama Puthiran (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-585.mp3", favorite: false },
  { id: "ta-586", title: "Usuraiya Tholaichaen - Stephen Zechariah", artist: "T Suriavelan, Rupini Anbalagan", album: "Pragathi Guruprasad (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-586.mp3", favorite: false },
  { id: "ta-587", title: "VADACHENNAI - Ennadi Maayavi Nee ( )", artist: "Vetri Maaran, Santhosh Narayanan", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-587.mp3", favorite: false },
  { id: "ta-588", title: "VADACHENNAI - Ennadi Maayavi Nee (Redux)", artist: "Vetri Maaran, Santhosh Narayanan", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-588.mp3", favorite: false },
  { id: "ta-589", title: "Vaa Kannamma", artist: "Arjun Das, Aditi Shankar", album: "Once More (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-589.mp3", favorite: false },
  { id: "ta-590", title: "Vaa Vaathi", artist: "Dhanush, Samyuktha", album: "Vaathi Movie (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-590.mp3", favorite: false },
  { id: "ta-591", title: "Vaada Raasa", artist: "Grace Karunaas, Preethi Sharma", album: "Ken (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-591.mp3", favorite: false },
  { id: "ta-592", title: "Vaadi Pulla Vaadi", artist: "Hiphop Tamizha, Vivek", album: "Meesaya Murukku (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-592.mp3", favorite: false },
  { id: "ta-593", title: "Vaalu Songs", artist: "STR, Hansika Motwani", album: "Thaarru Maarru Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-593.mp3", favorite: false },
  { id: "ta-594", title: "Vaama Vaama", artist: "Dhanush, Atharvaa", album: "Idhayam Murali (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-594.mp3", favorite: false },
  { id: "ta-595", title: "Vaaney Vaaney", artist: "Ajith Kumar, Nayanthara", album: "Viswasam Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-595.mp3", favorite: false },
  { id: "ta-596", title: "Vaaranam Aayiram - Nenjukkul Peidhidum", artist: "Suriya, Sameera Reddy", album: "Harris Jayaraj (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-596.mp3", favorite: false },
  { id: "ta-597", title: "Valimai - Naanga Vera Maari", artist: "Yuvan Shankar Raja", album: "Ajith Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-597.mp3", favorite: false },
  { id: "ta-598", title: "Vanamagan - Damn Damn", artist: "Harris Jayaraj", album: "Jayam Ravi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-598.mp3", favorite: false },
  { id: "ta-599", title: "Vanamagan - Yemma Yea Alagamma", artist: "Harris Jayaraj", album: "Jayam Ravi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-599.mp3", favorite: false },
  { id: "ta-600", title: "Varun Doctor - So Baby", artist: "Anirudh Ravichander, Nelson", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-600.mp3", favorite: false },
  { id: "ta-601", title: "Vasuvum Saravananum Onna Padichavanga - Naa Romba Busy", artist: "D. Imman", album: "Arya, Santhanam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-601.mp3", favorite: false },
  { id: "ta-602", title: "Vazhithunaiye", artist: "Pradeep Ranganathan, Kayadu", album: "Dragon (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-602.mp3", favorite: false },
  { id: "ta-603", title: "Vedalam - Aaluma Doluma", artist: "Anirudh Ravichander", album: "Ajith (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-603.mp3", favorite: false },
  { id: "ta-604", title: "Veera Sivaji - Soppanasundari", artist: "Vikram Prabhu, Vaikom Vijayalakshmi", album: "D. Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-604.mp3", favorite: false },
  { id: "ta-605", title: "Velaikkaran - Iraiva l Sivakarthikeyan, Nayanthara l Anirudh", artist: "Various Artists", album: "Velaikkaran - Iraiva l Sivakarthikeyan, Nayanthara l Anirudh (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-605.mp3", favorite: false },
  { id: "ta-606", title: "Velaikkaran - Karuthavanlaam Galeejaam", artist: "Anirudh", album: "Sivakarthikeyan, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-606.mp3", favorite: false },
  { id: "ta-607", title: "Vettaikaaran - Chinna Thamarai", artist: "Vijay Antony", album: "Vijay, Anushka (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-607.mp3", favorite: false },
  { id: "ta-608", title: "Vidhi Madhi Ultaa - Un Nerukkam", artist: "Kabilan, Ashwin", album: "Sid Sriram, Chinmayi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-608.mp3", favorite: false },
  { id: "ta-609", title: "Viduthalai Part 1 - Kaattumalli", artist: "Ilaiyaraaja, Soori", album: "Vetri Maaran (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-609.mp3", favorite: false },
  { id: "ta-610", title: "Vikram - Title Track", artist: "Anirudh Anirudh Ravichander", album: "Kamal Haasan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-610.mp3", favorite: false },
  { id: "ta-611", title: "Vikram Vedha Songs", artist: "R. Madhavan, Vijay Sethupathi", album: "Yaanji Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-611.mp3", favorite: false },
  { id: "ta-612", title: "Vinnaithaandi Varuvaayaa - Hosanna", artist: "STR, Trisha", album: "Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-612.mp3", favorite: false },
  { id: "ta-613", title: "Viruman - Kanja Poovu Kannala", artist: "Yuvan Shankar Raja, Muthaiya", album: "Karthi, Aditi Shankar (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-613.mp3", favorite: false },
  { id: "ta-614", title: "Visiri", artist: "Dhanush, Darbuka Siva", album: "Enai Noki Paayum Thota (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-614.mp3", favorite: false },
  { id: "ta-615", title: "Vivegam - Kadhalaada Official", artist: "Anirudh", album: "Ajith Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-615.mp3", favorite: false },
  { id: "ta-616", title: "Vivegam - Surviva Official", artist: "Anirudh, Siva", album: "Ajith Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-616.mp3", favorite: false },
  { id: "ta-617", title: "Vivegam - Surviva Tamil - Anirudh Feat Yogi B, Mali Manoj", artist: "Siva", album: "Ajith Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-617.mp3", favorite: false },
  { id: "ta-618", title: "Water Packet", artist: "Dhanush, A.R. Rahman", album: "RAAYAN (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-618.mp3", favorite: false },
  { id: "ta-619", title: "Wi Wi Wi WiFi", artist: "Singam 3 l Suriya l Shruthi Hassan l Harris Jayaraj l Hari", album: "Full Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-619.mp3", favorite: false },
  { id: "ta-620", title: "Windy - AYYO SAAMI (ஐயோ சாமி)", artist: "Various Artists", album: "Windy - AYYO SAAMI (ஐயோ சாமி) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-620.mp3", favorite: false },
  { id: "ta-621", title: "Yaathi Yaathi", artist: "Abhishek CS, Goutham George", album: "Ashwin Kumar, Harshadaa Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-621.mp3", favorite: false },
  { id: "ta-622", title: "Yaayum Making Feat. Naresh Iyer & Rita Thyagarajan", artist: "Murugesh", album: "Shabir Sulthan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-622.mp3", favorite: false },
  { id: "ta-623", title: "Yaen Ennai Pirindhaai", artist: "Dhruv Vikram, Banita Sandhu", album: "Adithya Varma (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-623.mp3", favorite: false },
  { id: "ta-624", title: "Yamma Ghajini", artist: "Harris Jayaraj × Asal Kolaar, Director Vijay", album: "KRR (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-624.mp3", favorite: false },
  { id: "ta-625", title: "Yappa Chappa", artist: "Atharvaa, Catherine Tresa", album: "Kanithan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-625.mp3", favorite: false },
  { id: "ta-626", title: "Yedhayya Saami Special Surprise -Ranabaali", artist: "Rahul Sankrityan, Ajay-Atul", album: "Vijay Deverakonda,Rashmika (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-626.mp3", favorite: false },
  { id: "ta-627", title: "Yedi", artist: "Pavish, Anikha", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-627.mp3", favorite: false },
  { id: "ta-628", title: "Yendi Vittu Pona", artist: "STR, Pradeep", album: "Dragon (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-628.mp3", favorite: false },
  { id: "ta-629", title: "Yennai Arindhaal - Adhaaru Adhaaru", artist: "Harris Jayaraj, Gautham Menon", album: "Ajith (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-629.mp3", favorite: false },
  { id: "ta-630", title: "Yennai Arindhaal - Mazhai Vara Pogudhae", artist: "Harris Jayaraj", album: "Ajith (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-630.mp3", favorite: false },
  { id: "ta-631", title: "Yennai Arindhaal - Unakkenna Venum Sollu", artist: "Harris Jayaraj", album: "Ajith (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-631.mp3", favorite: false },
  { id: "ta-632", title: "Yolo", artist: "Suriya, Disha Patani", album: "Kanguva (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-632.mp3", favorite: false },
  { id: "ta-633", title: "Yuvan Shankar Raja's New 'Konji Konji' from 'Raja's Playlist'", artist: "Various Artists", album: "@U1Records (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-633.mp3", favorite: false },
  { id: "ta-634", title: "கட்டா குஸ்தி 2 - சம்பவக்காரி தமிழ் பாடல்வரிகள்", artist: "Various Artists", album: "ஷான் ரோல்டன் (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-634.mp3", favorite: false },
  { id: "ta-635", title: "​@SaiAbhyankkar - Vizhi Veekura ( )", artist: "Sai Smriti, Adesh", album: "Saanve Megghana (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-635.mp3", favorite: false },
  { id: "te-007", title: "Aaya Sher", artist: "Nani, Anirudh Ravichander", album: "The Paradise (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-007.mp3", favorite: false },
  { id: "te-016", title: "Andamaina Premarani", artist: "Prabhu Deva, Nagma", album: "Premikudu Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-016.mp3", favorite: false },
  { id: "te-017", title: "Anekudu", artist: "Dhanush, Amyra Dastur", album: "Ee Sinnee Sinnaari (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-017.mp3", favorite: false },
  { id: "te-019", title: "Apudo Ipudo", artist: "Siddharth, Genelia", album: "Bommarillu (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-019.mp3", favorite: false },
  { id: "te-020", title: "Attarintiki Daredi Songs", artist: "Bapu Gari Bommo - Pawan Kalyan,  Pranitha", album: "Bapu Gari Bommo - Pawan Kalyan, Pranitha (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-020.mp3", favorite: false },
  { id: "te-021", title: "Aapadbandhavudu Songs", artist: "Chiranjeevi, Meenakshi Sheshadri", album: "Aura Ammaka Chella Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-021.mp3", favorite: false },
  { id: "te-022", title: "Bangala Kathamulo", artist: "Pawan Kalyan Amisha Patel", album: "Badri (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-022.mp3", favorite: false },
  { id: "te-023", title: "Vevela Mainala", artist: "Pawan Kalyan Amisha Patel", album: "Badri (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-023.mp3", favorite: false },
  { id: "te-024", title: "Yeh Chikitha", artist: "Pawan Kalyan Amisha Patel", album: "Badri (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-024.mp3", favorite: false },
  { id: "te-027", title: "Bhaje Bhaaje", artist: "Venkatesh Daggubati, Pawan Kalyan", album: "Gopala Gopala (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-027.mp3", favorite: false },
  { id: "te-030", title: "Bujji Thalli", artist: "Naga Chaitanya, Sai Pallavi", album: "Thandel (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-030.mp3", favorite: false },
  { id: "te-031", title: "Chakori Song With Lyrics", artist: "Naga Chaitanya, Gautham Menon", album: "Saahasam Swaasaga Saagipo (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-031.mp3", favorite: false },
  { id: "te-032", title: "Chali Gaali Chuudduu Song With Lyrics", artist: "Nani, Surabhi", album: "Gentleman (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-032.mp3", favorite: false },
  { id: "te-034", title: "Chikiri Chikiri", artist: "Ram Charan, Janhvi", album: "Peddi (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-034.mp3", favorite: false },
  { id: "te-037", title: "Chinni Chinni Aasalu Full Song", artist: "Akkineni Nageswara Rao, Nagarjuna", album: "Manam Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-037.mp3", favorite: false },
  { id: "te-038", title: "Chinni Chinni Aasalu", artist: "Nagarjuna, Shreya", album: "Manam (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-038.mp3", favorite: false },
  { id: "te-039", title: "Chinni Chinni", artist: "Aniesh - Anaswara, Thaman S", album: "Itllu Arjuna (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-039.mp3", favorite: false },
  { id: "te-042", title: "Choolenge Aasma", artist: "Jr.Ntr, Kajal Agarwal", album: "Temper (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-042.mp3", favorite: false },
  { id: "te-043", title: "Choopu Chalu", artist: "Trisha, Nagarjuna", album: "King (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-043.mp3", favorite: false },
  { id: "te-044", title: "Choosa Choosa Full Song With Telugu Lyrics", artist: "Ram Charan, Rakul Preet", album: "Dhruva (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-044.mp3", favorite: false },
  { id: "te-045", title: "Chuttamalle", artist: "NTR, Janhvi Kapoor", album: "Devara Second Single (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-045.mp3", favorite: false },
  { id: "te-047", title: "Crazy Feeling", artist: "Ram Pothineni, Keerthy Suresh", album: "Nenu Sailaja Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-047.mp3", favorite: false },
  { id: "te-049", title: "Devudu Chesina Manushulu - Nuvvele Nuvvele", artist: "Ravi,  Ileana", album: "Ravi, Ileana (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-049.mp3", favorite: false },
  { id: "te-050", title: "Dheera Dheera", artist: "Ram Charan, Kajal Agarwal", album: "Magadheera Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-050.mp3", favorite: false },
  { id: "te-051", title: "Dhivara [8K]", artist: "Prabhas, Tamannaah", album: "Baahubali (Telugu) (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-051.mp3", favorite: false },
  { id: "te-053", title: "Edo Priyaragam", artist: "Allu Arjun, Anuradha Mehta", album: "Aarya (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-053.mp3", favorite: false },
  { id: "te-055", title: "Endharo Cheppinna", artist: "Dhanush, Nithya Menen", album: "Idli Kottu (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-055.mp3", favorite: false },
  { id: "te-057", title: "Evare Full Song With Lyrics", artist: "Naga Chaitanya, Sruthi Hassan", album: "Premam Full (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-057.mp3", favorite: false },
  { id: "te-059", title: "Feel My Love", artist: "Allu Arjun, Anuradha Mehta", album: "Aarya (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-059.mp3", favorite: false },
  { id: "te-060", title: "Ayudha Pooja", artist: "NTR, Saif Ali Khan", album: "Devara (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-060.mp3", favorite: false },
  { id: "te-061", title: "Blockbuster Pongal", artist: "Venkatesh, Anil R", album: "Sankranthiki Vasthunam (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-061.mp3", favorite: false },
  { id: "te-065", title: "KISSIK Song", artist: "Allu Arjun, Sukumar", album: "Pushpa 2 The Rule (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-065.mp3", favorite: false },
  { id: "te-066", title: "Massa Massa", artist: "Ram Charan, Buchi Babu", album: "Peddi (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-066.mp3", favorite: false },
  { id: "te-067", title: "Meenu", artist: "Venkatesh, Meenakshi", album: "Sankranthiki Vasthunam (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-067.mp3", favorite: false },
  { id: "te-070", title: "Sasirekha", artist: "Chiranjeevi, Nayanthara", album: "Mana ShankaraVaraPrasad Garu (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-070.mp3", favorite: false },
  { id: "te-076", title: "Godari Gattu - Sankranthiki Vasthunam", artist: "Anil Ravipudi, Bheems C", album: "Venkatesh,Aishwarya (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-076.mp3", favorite: false },
  { id: "te-079", title: "Gusa Gusa Lade", artist: "Nani, Surabhi", album: "Gentleman (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-079.mp3", favorite: false },
  { id: "te-080", title: "Hellallallo", artist: "Ram Charan, Buchi Babu", album: "Peddi (TELUGU) (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-080.mp3", favorite: false },
  { id: "te-081", title: "Hilesso Hilessa", artist: "Naga Chaitanya, Sai Pallavi", album: "Thandel (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-081.mp3", favorite: false },
  { id: "te-082", title: "IRUMUDI KATTU (Song)： Ravi Teja", artist: "Ananthu, Shiva Nirvana", album: "GV Prakash (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-082.mp3", favorite: false },
  { id: "te-085", title: "Jaamu Rathiri Song", artist: "Venkatesh, Sridevi", album: "Kshana Kshanam (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-085.mp3", favorite: false },
  { id: "te-087", title: "Janatha Garage Songs", artist: "Jr NTR, Samantha", album: "Pranaamam Lyrical Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-087.mp3", favorite: false },
  { id: "te-088", title: "Jatha Kalise", artist: "Srimanthudu Movie, Mahesh Babu", album: "Jatha Kalise (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-088.mp3", favorite: false },
  { id: "te-089", title: "Jeans Movie Songs", artist: "Prashanth, Aishwarya Rai", album: "Poovullo Daagunna Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-089.mp3", favorite: false },
  { id: "te-090", title: "Jeans Movie", artist: "Prashanth, Aishwarya Rai", album: "Priya Priya Champodde Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-090.mp3", favorite: false },
  { id: "te-096", title: "Kanche Songs", artist: "Varun Tej, Pragya Jaiswal", album: "Itu Itu Ani Chitikelu Evvarivo Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-096.mp3", favorite: false },
  { id: "te-097", title: "Kani Penchina Ma Ammake", artist: "Nagarjuna, Naga Chaitanya", album: "Manam Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-097.mp3", favorite: false },
  { id: "te-098", title: "Kannanule HD", artist: "Arvind Swamy, Manisha Koirala", album: "Bombai Telugu (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-098.mp3", favorite: false },
  { id: "te-099", title: "Inthalo Ennenni Vinthalo", artist: "Nikhil Siddharth, Swati Reddy", album: "Karthikeya (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-099.mp3", favorite: false },
  { id: "te-102", title: "Kotha Bangaru Lokam Movie Songs", artist: "Varun Sandesh, Shweta Prasad", album: "Nenani Neevani Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-102.mp3", favorite: false },
  { id: "te-106", title: "Kshana Kshanam Movie Songs", artist: "Venkatesh, Sridevi", album: "Ammayi Muddu Ivvande Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-106.mp3", favorite: false },
  { id: "te-107", title: "Kurchi Madathapetti", artist: "Mahesh Babu, Sreeleela", album: "Guntur Kaaram (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-107.mp3", favorite: false },
  { id: "te-108", title: "Kushi Movie", artist: "Pawan Kalyan, Bhoomika", album: "Ammaye Sannaga Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-108.mp3", favorite: false },
  { id: "te-109", title: "Kushi Movie", artist: "Pawan Kalyan, Bhoomika", album: "Cheliya Cheliya Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-109.mp3", favorite: false },
  { id: "te-110", title: "Kushi Movie", artist: "Pawan Kalyan, Bhoomika", album: "Premante Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-110.mp3", favorite: false },
  { id: "te-116", title: "Shock Songs", artist: "Ravi Teja, Jyothika", album: "Madhuram Madhuram Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-116.mp3", favorite: false },
  { id: "te-117", title: "Mallela Vaanala Full Song", artist: "Venkatesh, Nayanthara", album: "Babu Bangaram Full (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-117.mp3", favorite: false },
  { id: "te-120", title: "Cheppave Prema Song", artist: "Uday Kiran, Reema Sen", album: "Manasantha Nuvve (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-120.mp3", favorite: false },
  { id: "te-121", title: "Manasuke", artist: "Suriya, Samantha", album: "24 Telugu Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-121.mp3", favorite: false },
  { id: "te-126", title: "Meesaala Pilla Full", artist: "Chiranjeevi, Nayanthara", album: "Mana ShankaraVaraPrasad Garu (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-126.mp3", favorite: false },
  { id: "te-127", title: "Meghaalu Lekunna Full Song", artist: "Raj Tarun, Hebah Patel", album: "Kumari 21 F (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-127.mp3", favorite: false },
  { id: "te-130", title: "Mirchi Songs", artist: "Latest Telugu Songs, Prabhas", album: "Idedo Bagundi Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-130.mp3", favorite: false },
  { id: "te-132", title: "Mr Perfect Songs", artist: "Prabhas, Kajal Aggarwal", album: "Chali Chali Ga Allindi Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-132.mp3", favorite: false },
  { id: "te-136", title: "Naalo Unna Prema", artist: "Venkatesh, Preity Zinta", album: "Premante Idera (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-136.mp3", favorite: false },
  { id: "te-137", title: "Naatu Naatu [8K]", artist: "NTR, Ram Charan", album: "RRR (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-137.mp3", favorite: false },
  { id: "te-138", title: "Nannaku Prematho", artist: "Rakul Preeet Singh, DSP", album: "Jr.NTR (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-138.mp3", favorite: false },
  { id: "te-140", title: "Nee Chepakallu - Telugu Audio Song", artist: "Sardaar Gabbar Singh", album: "Devi Sri Prasad (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-140.mp3", favorite: false },
  { id: "te-141", title: "Nee Jathaga Full HD Song From Yevadu", artist: "Ram Charan,  Allu Arjun", album: "Ram Charan, Allu Arjun, Shruti Haasan, Kajal Aggarwal (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-141.mp3", favorite: false },
  { id: "te-142", title: "Nee Navve Full Song With Telugu Lyrics II ＂మా పాట మీ నోట＂ II Soggade Chinni Naya", artist: "Various Artists", album: "Nagarjuna (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-142.mp3", favorite: false },
  { id: "te-145", title: "Nelluri Nerajana Song", artist: "TeluguOne", album: "Oke Okkadu (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-145.mp3", favorite: false },
  { id: "te-146", title: "Ramayya Vasthavayya Songs", artist: "Jr.Ntr, Shruthi Hasan", album: "Neneppudaina Anukunnana Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-146.mp3", favorite: false },
  { id: "te-150", title: "Nuvvante Na Navvu Full Song (Audio)", artist: "Nani, Mehr Pirzada", album: "Krishnagadi Veera Prema Gaadha (KVPG) (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-150.mp3", favorite: false },
  { id: "te-151", title: "Ekkada Vunna", artist: "Tarun, Richa", album: "Nuvve Kavali (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-151.mp3", favorite: false },
  { id: "te-154", title: "Nuvvu Nenu Prema Songs", artist: "Suriya, Bhoomika", album: "Preminche Premava Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-154.mp3", favorite: false },
  { id: "te-156", title: "O Manasa", artist: "Shreya Ghoshal", album: "Oka Manasu Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-156.mp3", favorite: false },
  { id: "te-159", title: "Oh Priya Priya", artist: "Nitin, Nithya Menon", album: "Ishq Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-159.mp3", favorite: false },
  { id: "te-163", title: "PEELINGS (Telugu )", artist: "Allu Arjun, Rashmika Mandanna", album: "Pushpa 2 The Rule (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-163.mp3", favorite: false },
  { id: "te-164", title: "Panchadara Bomma", artist: "Ram Charan, Kajal Agarwal", album: "Magadheera Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-164.mp3", favorite: false },
  { id: "te-167", title: "Nee Navve Chalu", artist: "Jagapathi Babu, Sukanya", album: "Peddarikam (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-167.mp3", favorite: false },
  { id: "te-169", title: "Pelli Choopulu Telugu Movie Songs l Chinuku Taake Full Song With Lyrics", artist: "Ritu Varma", album: "Nandu (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-169.mp3", favorite: false },
  { id: "te-172", title: "Prema Swaramulalo", artist: "24 Telugu Movie, Suriya", album: "Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-172.mp3", favorite: false },
  { id: "te-177", title: "Preminchaane (new telugu melody song)⧸Karthik Kodakandla⧸Harinath Devara", artist: "Various Artists", album: "Preminchaane (new telugu melody song)⧸Karthik Kodakandla⧸Harinath Devara (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-177.mp3", favorite: false },
  { id: "te-182", title: "Ra Rakumara", artist: "Ram Charan, Kajal", album: "Govindudu Andarivadele (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-182.mp3", favorite: false },
  { id: "te-183", title: "Raghavan Movie Songs", artist: "Kamal Haasan, Kamalinee Mukherjee", album: "Maaya Modalaye Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-183.mp3", favorite: false },
  { id: "te-184", title: "Rai Rai Raa Raa Song", artist: "Ram Charan, Janhvi", album: "Peddi (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-184.mp3", favorite: false },
  { id: "te-189", title: "Rasaagummadi ( )： Varun Tej", artist: "Merlapaka Gandhi, Thaman S", album: "Daksha (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-189.mp3", favorite: false },
  { id: "te-190", title: "Roja Telugu Movie Songs", artist: "Madhu Bala, Aravind Swamy", album: "Paruvam Vanaga Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-190.mp3", favorite: false },
  { id: "te-191", title: "Roja Telugu Movie Songs", artist: "AR Rahman, Arvind Swamy", album: "Naa Cheli Roja Ve Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-191.mp3", favorite: false },
  { id: "te-196", title: "Sarkaru Raa", artist: "Nandamuri Balakrishna, Bobby Kolli", album: "Daaku Maharaaj (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-196.mp3", favorite: false },
  { id: "te-199", title: "Seethakaalam Full VideoSong", artist: "Allu Arjun, DSP", album: "S⧸o Satyamurthy (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-199.mp3", favorite: false },
  { id: "te-203", title: "Surya Son of Krishnan Movie", artist: "Surya, Sameera Reddy", album: "Nalone Pongenu Narmada Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-203.mp3", favorite: false },
  { id: "te-205", title: "Swathilo Muthyamantha 4K", artist: "Balakrishna, Raveena Tandon", album: "Bangaru Bullodu (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-205.mp3", favorite: false },
  { id: "te-206", title: "Taara Taara", artist: "PSPK, Nidhhi", album: "HariHaraVeeraMallu (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-206.mp3", favorite: false },
  { id: "te-208", title: "Edola Undi Song", artist: "Pawan Kalyan, Preeti Jhangiani", album: "Thammudu Movieᴴᴰ (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-208.mp3", favorite: false },
  { id: "te-212", title: "Koyilamma", artist: "Mahesh Babu, Krishna", album: "Vamsi (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-212.mp3", favorite: false },
  { id: "te-214", title: "Prema Desam", artist: "A.R Rahman_mpeg4", album: "Vennela Vennela [with lyrics] (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-214.mp3", favorite: false },
  { id: "te-215", title: "All Time Superhit Song", artist: "Merupu Kalalu Telugu Movie", album: "Vennelave Vennelave (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-215.mp3", favorite: false },
  { id: "te-218", title: "YAALALO YAALALO", artist: "Ravi Teja, GV Prakash", album: "Irumudi (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-218.mp3", favorite: false },
  { id: "te-222", title: "Yeto Vellipoyindhi Manasu - Laayi Laayi", artist: "Nani,  Samantha", album: "Nani, Samantha (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-222.mp3", favorite: false },
  { id: "te-223", title: "Yeto Vellipoyindhi Manasu - Yedhi Yedhi", artist: "Nani,  Samantha", album: "Nani, Samantha (Telugu)", language: "Telugu", duration: "3:30", audio: "telugu/te-223.mp3", favorite: false },
  { id: "en-005", title: "APT.", artist: "Various Artists", album: "APT. (English)", language: "English", duration: "3:30", audio: "english/en-005.mp3", favorite: false },
  { id: "en-007", title: "About Damn Time", artist: "Various Artists", album: "About Damn Time (English)", language: "English", duration: "3:30", audio: "english/en-007.mp3", favorite: false },
  { id: "en-009", title: "Here", artist: "Alessia Cara", album: "Here (English)", language: "English", duration: "3:30", audio: "english/en-009.mp3", favorite: false },
  { id: "en-015", title: "Anti-Hero", artist: "Various Artists", album: "Anti-Hero (English)", language: "English", duration: "3:30", audio: "english/en-015.mp3", favorite: false },
  { id: "en-020", title: "Break Free", artist: "Ariana Grande", album: "Break Free (English)", language: "English", duration: "3:30", audio: "english/en-020.mp3", favorite: false },
  { id: "en-021", title: "Dangerous Woman", artist: "Ariana Grande", album: "Dangerous Woman (English)", language: "English", duration: "3:30", audio: "english/en-021.mp3", favorite: false },
  { id: "en-025", title: "Love Me Harder ft. The Weeknd", artist: "Ariana Grande", album: "Love Me Harder ft. The Weeknd (English)", language: "English", duration: "3:30", audio: "english/en-025.mp3", favorite: false },
  { id: "en-027", title: "One Last Time", artist: "Ariana Grande", album: "One Last Time (English)", language: "English", duration: "3:30", audio: "english/en-027.mp3", favorite: false },
  { id: "en-029", title: "Side To Side ft. Nicki Minaj", artist: "Ariana Grande", album: "Side To Side ft. Nicki Minaj (English)", language: "English", duration: "3:30", audio: "english/en-029.mp3", favorite: false },
  { id: "en-033", title: "As It Was", artist: "Various Artists", album: "As It Was (English)", language: "English", duration: "3:30", audio: "english/en-033.mp3", favorite: false },
  { id: "en-037", title: "Dynamite", artist: "BTS (방탄소년단)", album: "Dynamite (English)", language: "English", duration: "3:30", audio: "english/en-037.mp3", favorite: false },
  { id: "en-043", title: "Eastside FT. Halsey & Khalid", artist: "Benny Blanco", album: "Eastside FT. Halsey & Khalid (English)", language: "English", duration: "3:30", audio: "english/en-043.mp3", favorite: false },
  { id: "en-046", title: "Bury a Friend When we all fall asleep, where do we go？", artist: "Billie Eilish", album: "Bury a Friend When we all fall asleep, where do we go？ (English)", language: "English", duration: "3:30", audio: "english/en-046.mp3", favorite: false },
  { id: "en-050", title: "Ocean Eyes", artist: "Billie Eilish", album: "Ocean Eyes (English)", language: "English", duration: "3:30", audio: "english/en-050.mp3", favorite: false },
  { id: "en-051", title: "When The Party’s Over", artist: "Billie Eilish", album: "When The Party’s Over (English)", language: "English", duration: "3:30", audio: "english/en-051.mp3", favorite: false },
  { id: "en-055", title: "bad guy", artist: "Billie Eilish", album: "bad guy (English)", language: "English", duration: "3:30", audio: "english/en-055.mp3", favorite: false },
  { id: "en-058", title: "Blinding Lights", artist: "Various Artists", album: "Blinding Lights (English)", language: "English", duration: "3:30", audio: "english/en-058.mp3", favorite: false },
  { id: "en-066", title: "Havana ft. Young Thug", artist: "Camila Cabello", album: "Havana ft. Young Thug (English)", language: "English", duration: "3:30", audio: "english/en-066.mp3", favorite: false },
  { id: "en-068", title: "We Don't Talk Anymore", artist: "Charlie Puth & Selena Gomez", album: "We Don't Talk Anymore (English)", language: "English", duration: "3:30", audio: "english/en-068.mp3", favorite: false },
  { id: "en-069", title: "Attention", artist: "Charlie Puth", album: "Attention (English)", language: "English", duration: "3:30", audio: "english/en-069.mp3", favorite: false },
  { id: "en-079", title: "Stunnin' ft. Harm Franklin", artist: "Curtis Waters", album: "Stunnin' ft. Harm Franklin (English)", language: "English", duration: "3:30", audio: "english/en-079.mp3", favorite: false },
  { id: "en-080", title: "ROCKSTAR ft. Roddy Ricch", artist: "DaBaby", album: "ROCKSTAR ft. Roddy Ricch (English)", language: "English", duration: "3:30", audio: "english/en-080.mp3", favorite: false },
  { id: "en-088", title: "Die With A Smile", artist: "Various Artists", album: "Die With A Smile (English)", language: "English", duration: "3:30", audio: "english/en-088.mp3", favorite: false },
  { id: "en-091", title: "Say So", artist: "Doja Cat", album: "Say So (English)", language: "English", duration: "3:30", audio: "english/en-091.mp3", favorite: false },
  { id: "en-098", title: "Olivia Rodrigo", artist: "Drivers License", album: "Olivia Rodrigo (English)", language: "English", duration: "3:30", audio: "english/en-098.mp3", favorite: false },
  { id: "en-099", title: "Easy On Me", artist: "Various Artists", album: "Easy On Me (English)", language: "English", duration: "3:30", audio: "english/en-099.mp3", favorite: false },
  { id: "en-102", title: "I See Fire", artist: "Ed Sheeran", album: "I See Fire (English)", language: "English", duration: "3:30", audio: "english/en-102.mp3", favorite: false },
  { id: "en-104", title: "The Monster ft. Rihanna", artist: "Eminem", album: "The Monster ft. Rihanna (English)", language: "English", duration: "3:30", audio: "english/en-104.mp3", favorite: false },
  { id: "en-106", title: "Mockingbird", artist: "Eminem", album: "Mockingbird (English)", language: "English", duration: "3:30", audio: "english/en-106.mp3", favorite: false },
  { id: "en-107", title: "Stan ft. Dido", artist: "Eminem", album: "Stan ft. Dido (English)", language: "English", duration: "3:30", audio: "english/en-107.mp3", favorite: false },
  { id: "en-114", title: "Espresso", artist: "Various Artists", album: "Espresso (English)", language: "English", duration: "3:30", audio: "english/en-114.mp3", favorite: false },
  { id: "en-118", title: "Big Girls Don't Cry It's time to be a big girl now", artist: "Fergie", album: "Big Girls Don't Cry It's time to be a big girl now (English)", language: "English", duration: "3:30", audio: "english/en-118.mp3", favorite: false },
  { id: "en-120", title: "Flowers", artist: "Various Artists", album: "Flowers (English)", language: "English", duration: "3:30", audio: "english/en-120.mp3", favorite: false },
  { id: "en-131", title: "Without Me", artist: "Halsey", album: "Without Me (English)", language: "English", duration: "3:30", audio: "english/en-131.mp3", favorite: false },
  { id: "en-133", title: "Heartbreak Anthem", artist: "Various Artists", album: "Heartbreak Anthem (English)", language: "English", duration: "3:30", audio: "english/en-133.mp3", favorite: false },
  { id: "en-136", title: "Houdini", artist: "Various Artists", album: "Houdini (English)", language: "English", duration: "3:30", audio: "english/en-136.mp3", favorite: false },
  { id: "en-149", title: "James Arthur", artist: "Impossible", album: "James Arthur (English)", language: "English", duration: "3:30", audio: "english/en-149.mp3", favorite: false },
  { id: "en-152", title: "Here's Your Perfect", artist: "Jamie Miller", album: "Here's Your Perfect (English)", language: "English", duration: "3:30", audio: "english/en-152.mp3", favorite: false },
  { id: "en-154", title: "Infinity", artist: "Jaymes Young", album: "Infinity (English)", language: "English", duration: "3:30", audio: "english/en-154.mp3", favorite: false },
  { id: "en-155", title: "On The Floor Ft. Pitbull ＂Tonight, we gon' be it on the floor＂", artist: "Jennifer Lopez", album: "On The Floor Ft. Pitbull ＂Tonight, we gon' be it on the floor＂ (English)", language: "English", duration: "3:30", audio: "english/en-155.mp3", favorite: false },
  { id: "en-159", title: "Cause I give you all of me (All of Me)", artist: "John Legend", album: "Cause I give you all of me (All of Me) (English)", language: "English", duration: "3:30", audio: "english/en-159.mp3", favorite: false },
  { id: "en-163", title: "Ghost", artist: "Justin Bieber", album: "Ghost (English)", language: "English", duration: "3:30", audio: "english/en-163.mp3", favorite: false },
  { id: "en-171", title: "Never Say Never ft. Jaden Smith", artist: "Justin Bieber", album: "Never Say Never ft. Jaden Smith (English)", language: "English", duration: "3:30", audio: "english/en-171.mp3", favorite: false },
  { id: "en-175", title: "Peaches ft. Daniel Caesar & Giveon", artist: "Justin Bieber", album: "Peaches ft. Daniel Caesar & Giveon (English)", language: "English", duration: "3:30", audio: "english/en-175.mp3", favorite: false },
  { id: "en-178", title: "beauty and a beat ft. Nicki Minaj", artist: "Justin Bieber", album: "beauty and a beat ft. Nicki Minaj (English)", language: "English", duration: "3:30", audio: "english/en-178.mp3", favorite: false },
  { id: "en-183", title: "Dark Horse ft. Juicy J", artist: "Katy Perry", album: "Dark Horse ft. Juicy J (English)", language: "English", duration: "3:30", audio: "english/en-183.mp3", favorite: false },
  { id: "en-187", title: "Better", artist: "Khalid", album: "Better (English)", language: "English", duration: "3:30", audio: "english/en-187.mp3", favorite: false },
  { id: "en-189", title: "Talk", artist: "Khalid", album: "Talk (English)", language: "English", duration: "3:30", audio: "english/en-189.mp3", favorite: false },
  { id: "en-192", title: "I crossed the ocean of my mind (Can We Kiss Forever)", artist: "Kina", album: "I crossed the ocean of my mind (Can We Kiss Forever) (English)", language: "English", duration: "3:30", audio: "english/en-192.mp3", favorite: false },
  { id: "en-195", title: "Applause", artist: "Lady Gaga", album: "Applause (English)", language: "English", duration: "3:30", audio: "english/en-195.mp3", favorite: false },
  { id: "en-205", title: "Someone You Loved", artist: "Lewis Capaldi", album: "Someone You Loved (English)", language: "English", duration: "3:30", audio: "english/en-205.mp3", favorite: false },
  { id: "en-207", title: "Montero (Call Me By Your Name)", artist: "Lil Nas X", album: "Montero (Call Me By Your Name) (English)", language: "English", duration: "3:30", audio: "english/en-207.mp3", favorite: false },
  { id: "en-208", title: "Industry Baby", artist: "Lil Nas X, Jack Harlow", album: "Industry Baby (English)", language: "English", duration: "3:30", audio: "english/en-208.mp3", favorite: false },
  { id: "en-210", title: "Justin Bieber FT. benny blanco", artist: "Lonely", album: "Justin Bieber FT. benny blanco (English)", language: "English", duration: "3:30", audio: "english/en-210.mp3", favorite: false },
  { id: "en-211", title: "Lose Control", artist: "Various Artists", album: "Lose Control (English)", language: "English", duration: "3:30", audio: "english/en-211.mp3", favorite: false },
  { id: "en-212", title: "Ellie Goulding", artist: "Love Me Like You Do", album: "Ellie Goulding (English)", language: "English", duration: "3:30", audio: "english/en-212.mp3", favorite: false },
  { id: "en-216", title: "Animals", artist: "Maroon 5", album: "Animals (English)", language: "English", duration: "3:30", audio: "english/en-216.mp3", favorite: false },
  { id: "en-222", title: "Maps", artist: "Maroon 5", album: "Maps (English)", language: "English", duration: "3:30", audio: "english/en-222.mp3", favorite: false },
  { id: "en-223", title: "Sugar", artist: "Maroon 5", album: "Sugar (English)", language: "English", duration: "3:30", audio: "english/en-223.mp3", favorite: false },
  { id: "en-225", title: "Silence", artist: "Marshmello & Khalid", album: "Silence (English)", language: "English", duration: "3:30", audio: "english/en-225.mp3", favorite: false },
  { id: "en-226", title: "Astronaut In The Ocean", artist: "Masked Wolf", album: "Astronaut In The Ocean (English)", language: "English", duration: "3:30", audio: "english/en-226.mp3", favorite: false },
  { id: "en-235", title: "Mansion ft. Fleurie", artist: "NF", album: "Mansion ft. Fleurie (English)", language: "English", duration: "3:30", audio: "english/en-235.mp3", favorite: false },
  { id: "en-249", title: "good 4 u", artist: "Olivia Rodrigo", album: "good 4 u (English)", language: "English", duration: "3:30", audio: "english/en-249.mp3", favorite: false },
  { id: "en-275", title: "Roses (Imanbek Remix)", artist: "Various Artists", album: "Roses (Imanbek Remix) (English)", language: "English", duration: "3:30", audio: "english/en-275.mp3", favorite: false },
  { id: "en-278", title: "STAY", artist: "Various Artists", album: "STAY (English)", language: "English", duration: "3:30", audio: "english/en-278.mp3", favorite: false },
  { id: "en-281", title: "I'm Not The Only One", artist: "Sam Smith", album: "I'm Not The Only One (English)", language: "English", duration: "3:30", audio: "english/en-281.mp3", favorite: false },
  { id: "en-287", title: "Wolves", artist: "Selena Gomez & Marshmello", album: "Wolves (English)", language: "English", duration: "3:30", audio: "english/en-287.mp3", favorite: false },
  { id: "en-290", title: "Seventeen Going Under (Edit)", artist: "Various Artists", album: "Seventeen Going Under (Edit) (English)", language: "English", duration: "3:30", audio: "english/en-290.mp3", favorite: false },
  { id: "en-291", title: "I Know What You Did Last Summer", artist: "Shawn Mendes & Camila Cabello", album: "I Know What You Did Last Summer (English)", language: "English", duration: "3:30", audio: "english/en-291.mp3", favorite: false },
  { id: "en-299", title: "Chandelier", artist: "Sia", album: "Chandelier (English)", language: "English", duration: "3:30", audio: "english/en-299.mp3", favorite: false },
  { id: "en-302", title: "Elastic Heart ＂I've got an elastic heart＂", artist: "Sia", album: "Elastic Heart ＂I've got an elastic heart＂ (English)", language: "English", duration: "3:30", audio: "english/en-302.mp3", favorite: false },
  { id: "en-309", title: "The Greatest ft. Kendrick Lamar", artist: "Sia", album: "The Greatest ft. Kendrick Lamar (English)", language: "English", duration: "3:30", audio: "english/en-309.mp3", favorite: false },
  { id: "en-317", title: "Stick Season", artist: "Various Artists", album: "Stick Season (English)", language: "English", duration: "3:30", audio: "english/en-317.mp3", favorite: false },
  { id: "en-326", title: "That’s So True", artist: "Various Artists", album: "That’s So True (English)", language: "English", duration: "3:30", audio: "english/en-326.mp3", favorite: false },
  { id: "en-327", title: "I Gotta Feeling", artist: "The Black Eyed Peas", album: "I Gotta Feeling (English)", language: "English", duration: "3:30", audio: "english/en-327.mp3", favorite: false },
  { id: "en-334", title: "Eminem", artist: "The Real Slim Shady", album: "Eminem (English)", language: "English", duration: "3:30", audio: "english/en-334.mp3", favorite: false },
  { id: "en-335", title: "Too Sweet", artist: "Various Artists", album: "Too Sweet (English)", language: "English", duration: "3:30", audio: "english/en-335.mp3", favorite: false },
  { id: "en-338", title: "Unholy", artist: "Various Artists", album: "Unholy (English)", language: "English", duration: "3:30", audio: "english/en-338.mp3", favorite: false },
  { id: "en-343", title: "Into Your Arms (tiktok version)", artist: "Witt Lowry, Ava Max", album: "Into Your Arms (tiktok version) (English)", language: "English", duration: "3:30", audio: "english/en-343.mp3", favorite: false },
  { id: "en-353", title: "abc (nicer)", artist: "Various Artists", album: "abc (nicer) (English)", language: "English", duration: "3:30", audio: "english/en-353.mp3", favorite: false },
  { id: "en-356", title: "love nwantiti", artist: "ckay", album: "love nwantiti (English)", language: "English", duration: "3:30", audio: "english/en-356.mp3", favorite: false },
  { id: "en-359", title: "lose yourself", artist: "eminem", album: "lose yourself (English)", language: "English", duration: "3:30", audio: "english/en-359.mp3", favorite: false },
  { id: "en-360", title: "without me", artist: "eminem", album: "without me (English)", language: "English", duration: "3:30", audio: "english/en-360.mp3", favorite: false },
  { id: "en-363", title: "greedy", artist: "Various Artists", album: "greedy (English)", language: "English", duration: "3:30", audio: "english/en-363.mp3", favorite: false },
  { id: "en-364", title: "i like the way you kiss me", artist: "Various Artists", album: "i like the way you kiss me (English)", language: "English", duration: "3:30", audio: "english/en-364.mp3", favorite: false },
  { id: "en-365", title: "billie eilish", artist: "idontwannabeyouanymore", album: "billie eilish (English)", language: "English", duration: "3:30", audio: "english/en-365.mp3", favorite: false },
  { id: "en-371", title: "always remember us this way", artist: "lady gaga", album: "always remember us this way (English)", language: "English", duration: "3:30", audio: "english/en-371.mp3", favorite: false },
  { id: "en-374", title: "what lovers do ft. sza", artist: "maroon 5", album: "what lovers do ft. sza (English)", language: "English", duration: "3:30", audio: "english/en-374.mp3", favorite: false },
  { id: "en-377", title: "cheap Thrills ft. sean paul", artist: "sia", album: "cheap Thrills ft. sean paul (English)", language: "English", duration: "3:30", audio: "english/en-377.mp3", favorite: false },
  { id: "en-379", title: "billie eilish", artist: "therefore i am", album: "billie eilish (English)", language: "English", duration: "3:30", audio: "english/en-379.mp3", favorite: false },
  { id: "en-381", title: "vampire", artist: "Various Artists", album: "vampire (English)", language: "English", duration: "3:30", audio: "english/en-381.mp3", favorite: false },
  { id: "ml-106", title: "Anjanamani", artist: "Vaikom Vijayalakshmi, Jay Stellar", album: "Innocent (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-106.mp3", favorite: false },
  { id: "ml-108", title: "Arike Ninna", artist: "Pranav, Darshana", album: "Hridayam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-108.mp3", favorite: false },
  { id: "ml-109", title: "Armadham", artist: "Jithu Madhavan, Fahadh Faasil", album: "Aavesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-109.mp3", favorite: false },
  { id: "ml-110", title: "Athimanoharam", artist: "Rajat Prakash, Vipin Das", album: "Vaazha (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-110.mp3", favorite: false },
  { id: "ml-111", title: "Bhairavan Pattu", artist: "Tovino Thomas, Jithin Laal", album: "ARM (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-111.mp3", favorite: false },
  { id: "ml-112", title: "Darshana", artist: "Pranav, Darshana", album: "Hridayam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-112.mp3", favorite: false },
  { id: "ml-113", title: "Duppattawaali", artist: "Fahadh Faasil, Kalyani", album: "Odum Kuthira Chaadum Kuthira (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-113.mp3", favorite: false },
  { id: "ml-114", title: "Ethra Naal (Sulaikha Manzil Version)", artist: "Vishnu Vijay, Ashraf Hamza", album: "Lukman, Anarkali (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-114.mp3", favorite: false },
  { id: "ml-115", title: "Eyy Banane", artist: "Vipin Das, Anand Menen", album: "Vaazha (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-115.mp3", favorite: false },
  { id: "ml-117", title: "Galatta", artist: "Jithu Madhavan, Fahadh Faasil", album: "Aavesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-117.mp3", favorite: false },
  { id: "ml-118", title: "Haalaake Maarunne", artist: "Lukman, Anarkali", album: "Sulaikha Manzil (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-118.mp3", favorite: false },
  { id: "ml-119", title: "Hatja", artist: "Khalid Rahman, Naslen", album: "Alappuzha Gymkhana (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-119.mp3", favorite: false },
  { id: "ml-120", title: "Heart Attack", artist: "Sajin Gopu, Anaswara Rajan", album: "Painkili (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-120.mp3", favorite: false },
  { id: "ml-121", title: "Hope", artist: "Asif Ali, Thamar", album: "Sarkeet (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-121.mp3", favorite: false },
  { id: "ml-122", title: "Ilakozhiye", artist: "Arjun Ashokan, Revathy", album: "Thalavara (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-122.mp3", favorite: false },
  { id: "ml-123", title: "Illuminati", artist: "Jithu Madhavan, Fahadh Faasil", album: "Aavesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-123.mp3", favorite: false },
  { id: "ml-124", title: "JIL JIL JIL", artist: "Lukman Avaran, Anarkali", album: "Sulaikha Manzil (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-124.mp3", favorite: false },
  { id: "ml-125", title: "Jaada", artist: "Jithu Madhavan, Fahadh Faasil", album: "Aavesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-125.mp3", favorite: false },
  { id: "ml-129", title: "Kalamkaval", artist: "Jithin K Jose, Mujeeb Majeed", album: "Mammootty (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-129.mp3", favorite: false },
  { id: "ml-130", title: "Kattu Mooliyo", artist: "Nivin Pauly, Nazriya Nazim", album: "Ohm Shanthi Oshaana (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-130.mp3", favorite: false },
  { id: "ml-131", title: "Kiliye Kiliye - Afrobeat X Kalyani Priyadarshan ( )", artist: "Aa Raathri, S Janaki", album: "The Independeners (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-131.mp3", favorite: false },
  { id: "ml-132", title: "Kokkedelic", artist: "The Imbachi, Bhadra Rajin", album: "Sahasam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-132.mp3", favorite: false },
  { id: "ml-134", title: "Kuthanthram", artist: "Chidambaram, Sushin Shyam", album: "Manjummel Boys (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-134.mp3", favorite: false },
  { id: "ml-135", title: "Maarante Pennalle", artist: "Naslen, Mathew", album: "Journey of Love 18+ (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-135.mp3", favorite: false },
  { id: "ml-136", title: "Madhu Pakaroo", artist: "Pranav, Amrit Ramnath", album: "Varshangalkku Shesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-136.mp3", favorite: false },
  { id: "ml-137", title: "Mathapithakkale", artist: "Jithu Madhavan, Fahadh Faasil", album: "Aavesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-137.mp3", favorite: false },
  { id: "ml-138", title: "Mazhavillile", artist: "Basil Joseph, Nithish Sahadev", album: "Falimy (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-138.mp3", favorite: false },
  { id: "ml-139", title: "Minnal Minnane", artist: "Tovino Thomas, Jude Anthany Joseph", album: "2018 (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-139.mp3", favorite: false },
  { id: "ml-140", title: "Nagumo", artist: "Pranav, Darshana", album: "Hridayam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-140.mp3", favorite: false },
  { id: "ml-141", title: "Naruchiriyude Minnayam", artist: "Arjun, Anaswara", album: "Pranaya Vilasam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-141.mp3", favorite: false },
  { id: "ml-142", title: "Neeye Punchiri", artist: "Hanan Sha, Reyan", album: "Lokah (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-142.mp3", favorite: false },
  { id: "ml-143", title: "Odimaga", artist: "Jithu Madhavan, Fahadh Faasil", album: "Aavesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-143.mp3", favorite: false },
  { id: "ml-144", title: "Mandaarame", artist: "Nivin Pauly, Nazriya Nazim", album: "Ohm Shanthi Oshaana (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-144.mp3", favorite: false },
  { id: "ml-146", title: "Paalmanam", artist: "Mathew, Malavika", album: "Christy (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-146.mp3", favorite: false },
  { id: "ml-147", title: "Parayuvaan", artist: "ShaneNigam, Ann Sheethal", album: "Ishq Movie (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-147.mp3", favorite: false },
  { id: "ml-148", title: "Polika Polika", artist: "Tinu Pappachan, Kunchacko Boban", album: "Chaaver (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-148.mp3", favorite: false },
  { id: "ml-149", title: "Pottu Thotta Pournami", artist: "Pranav, Kalyani", album: "Hridayam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-149.mp3", favorite: false },
  { id: "ml-150", title: "Premakkathu Pattu", artist: "Basil Joseph, Muhashin", album: "Kadina Kadoramee Andakadaham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-150.mp3", favorite: false },
  { id: "ml-151", title: "Puthiyoru Lokam", artist: "Pranav, Kalyani", album: "Hridayam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-151.mp3", favorite: false },
  { id: "ml-152", title: "Puthu Mazha", artist: "Nivin Pauly, Riya Shibu", album: "Sarvam Maya (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-152.mp3", favorite: false },
  { id: "ml-153", title: "Thathaka Theithare", artist: "Pranav, Vineeth", album: "Hridayam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-153.mp3", favorite: false },
  { id: "ml-155", title: "Thumbi", artist: "Ullas Chemban, Lukman Avaran", album: "Anchakkallakokkan (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-155.mp3", favorite: false },
  { id: "ml-156", title: "Vaathil Melle", artist: "Nivin Pauly, Nazriya Nazim", album: "Neram (Malayalam) (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-156.mp3", favorite: false },
  { id: "ml-157", title: "Venmathi - Hridayapoorvam", artist: "Sathyan Anthikad, Sid Sriram", album: "Mohanlal (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-157.mp3", favorite: false },
  { id: "ml-158", title: "Venmegham", artist: "Tovino Thomas, Jude Anthany Joseph", album: "2018 (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-158.mp3", favorite: false },
  { id: "ml-159", title: "Vijay Superum Pournamiyum", artist: "Asif Ali, Aishwarya", album: "Etho Mazhayil (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-159.mp3", favorite: false },
  { id: "ml-160", title: "Ya Rabbe", artist: "Basil Joseph, Muhashin", album: "Kadina Kadoramee Andakadaham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-160.mp3", favorite: false },
  { id: "ml-161", title: "Yaathonnum Parayathe", artist: "Tovino Thomas, Keerthy Suresh", album: "Vaashi (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-161.mp3", favorite: false },
  { id: "ml-162", title: "ഉയിരിൽ തൊടും Uyiril Thodum - Kumbalangi Nights Official", artist: "Anne Amie", album: "Sooraj Santhosh (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-162.mp3", favorite: false },
  { id: "ta-636", title: "Idhazhin Oram", artist: "Dhanush, Shruti", album: "3 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-636.mp3", favorite: false },
  { id: "ta-637", title: "Kannazhaga", artist: "Dhanush, Shruti", album: "3 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-637.mp3", favorite: false },
  { id: "ta-638", title: "Why This Kolaveri Di", artist: "Dhanush, Shruti Haasan", album: "3 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-638.mp3", favorite: false },
  { id: "ta-639", title: "7 Aum Arivu - Mun Andhi", artist: "Harris", album: "7 Aum Arivu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-639.mp3", favorite: false },
  { id: "ta-641", title: "Katchi Sera", artist: "Ken Royson", album: "Samyuktha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-641.mp3", favorite: false },
  { id: "ta-642", title: "AR Rahman Hit Songs", artist: "Kadhal Desam Tamil Movie, Vineeth", album: "Ennai Kaanavillaye Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-642.mp3", favorite: false },
  { id: "ta-643", title: "Aadukalam - Ayyayo Tamil", artist: "G.V. Prakash Kumar", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-643.mp3", favorite: false },
  { id: "ta-646", title: "Agayam Theepiditha Official", artist: "Karthi, Catherine Tresa", album: "Madras (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-646.mp3", favorite: false },
  { id: "ta-647", title: "Ale Ale", artist: "Siddharth, Genelia", album: "Boys Tamil Movie (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-647.mp3", favorite: false },
  { id: "ta-648", title: "Anandham Tamil Movie HD", artist: "Sneha, Abbas", album: "Pallangkuzhiyin Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-648.mp3", favorite: false },
  { id: "ta-649", title: "Anbe Anbe", artist: "GV Prakash Kumar, Nikki Galrani", album: "Darling (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-649.mp3", favorite: false },
  { id: "ta-650", title: "Anegan - Aathadi Aathadi", artist: "Harris Jayaraj", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-650.mp3", favorite: false },
  { id: "ta-651", title: "Anegan - Thodu Vaanam", artist: "Harris Jayaraj", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-651.mp3", favorite: false },
  { id: "ta-652", title: "Anegan - Aathadi Aathadi Dhanush Harris Jayaraj", artist: "Various Artists", album: "Anegan - Aathadi Aathadi Dhanush Harris Jayaraj (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-652.mp3", favorite: false },
  { id: "ta-656", title: "Chellame Chellam", artist: "Shreya Ghoshal, Hariharan", album: "Shrutika, Aryan Rajesh (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-656.mp3", favorite: false },
  { id: "ta-657", title: "David - Kanave Kanave HD", artist: "Various Artists", album: "David - Kanave Kanave HD (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-657.mp3", favorite: false },
  { id: "ta-661", title: "Dhool - Aasai Aasai", artist: "Various Artists", album: "Dhool - Aasai Aasai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-661.mp3", favorite: false },
  { id: "ta-664", title: "En Anbae En Anbae", artist: "Yuvan Shankar Raja, Surya", album: "Mounam Pesiyadhe Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-664.mp3", favorite: false },
  { id: "ta-665", title: "Enakku 20 Unakku 18 Tamil Movie - Yedho Onru", artist: "Trisha, AR Rahman", album: "Tarun (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-665.mp3", favorite: false },
  { id: "ta-666", title: "Engeyum Kaadhal - Engeyum Kaadhal", artist: "Harris", album: "Jayam Ravi, Hansika (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-666.mp3", favorite: false },
  { id: "ta-667", title: "Engeyum Kadhal - Nenjil Nenjil Tamil", artist: "Harris Jayaraj", album: "Jayam Ravi, Hansikha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-667.mp3", favorite: false },
  { id: "ta-668", title: "Enkannukulla appuchi gramam", artist: "Various Artists", album: "Enkannukulla appuchi gramam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-668.mp3", favorite: false },
  { id: "ta-669", title: "Ennavale Adi Ennavale - Kaadhalan - HD", artist: "Various Artists", album: "Ennavale Adi Ennavale - Kaadhalan - HD (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-669.mp3", favorite: false },
  { id: "ta-670", title: "Ethir Neechal - Boomi Enna Suthudhe", artist: "Various Artists", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-670.mp3", favorite: false },
  { id: "ta-671", title: "Ethir Neechal - Velicha Poove", artist: "Sivakarthikeyan,  Priya", album: "Sivakarthikeyan, Priya (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-671.mp3", favorite: false },
  { id: "ta-673", title: "Gemini Ganeshanum Suruli Raajanum - Ammukuttiye", artist: "Atharvaa", album: "D. Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-673.mp3", favorite: false },
  { id: "ta-674", title: "Gulaebaghavali", artist: "Kalyaan, Prabhu Deva", album: "Seramal Ponal Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-674.mp3", favorite: false },
  { id: "ta-675", title: "Guru - Aaruyirae", artist: "Various Artists", album: "A.R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-675.mp3", favorite: false },
  { id: "ta-676", title: "I - Ennodu Nee Irundhaal", artist: "Vikram, Shankar", album: "A.R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-676.mp3", favorite: false },
  { id: "ta-678", title: "Idu Enna Maayam - Iravaaga Nee", artist: "Vikram Prabhu,  G.V. Prakash Kumar", album: "Vikram Prabhu, G.V. Prakash Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-678.mp3", favorite: false },
  { id: "ta-679", title: "Idu Enna Maayam - Irukkiraai", artist: "G.V. Prakash", album: "Vikram Prabhu, Keerthy (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-679.mp3", favorite: false },
  { id: "ta-680", title: "Imaikkaa Nodigal", artist: "Hiphop Tamizha, Atharvaa", album: "Kadhal Oru Aagayam Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-680.mp3", favorite: false },
  { id: "ta-681", title: "Innum Konjam Naeram - With Lyrics", artist: "Various Artists", album: "Innum Konjam Naeram - With Lyrics (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-681.mp3", favorite: false },
  { id: "ta-682", title: "Iru Mugan - Kannai Vittu Tamil", artist: "Harris", album: "Vikram, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-682.mp3", favorite: false },
  { id: "ta-684", title: "Kaatru Veliyidai - Nallai Allai", artist: "Karthi", album: "Mani Ratnam, AR Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-684.mp3", favorite: false },
  { id: "ta-687", title: "Kadhal Sadugudu Tamil Movie HD", artist: "Vikram, Priyanka", album: "Megathil Ondrai Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-687.mp3", favorite: false },
  { id: "ta-689", title: "Kanaa - Vaayadi Petha Pulla", artist: "Dhibu Ninan Thomas", album: "AishwaryaRajesh, Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-689.mp3", favorite: false },
  { id: "ta-690", title: "Kanave Nee Naan -Kannum Kannum Kollaiyadithaal", artist: "Masala Coffee, Tamil Song", album: "Dulquer S, Ritu V,Rakshan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-690.mp3", favorite: false },
  { id: "ta-691", title: "Kanchana 2 Movie Songs", artist: "Raghava Lawrence, Taapsee", album: "Vaaya En Veera Song With Lyrics (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-691.mp3", favorite: false },
  { id: "ta-692", title: "Kannukkulle Unnai Vaithen Songs# Pennin Manathai Thottu# Tamil Songs# Prabhu Dev", artist: "Various Artists", album: "Kannukkulle Unnai Vaithen Songs# Pennin Manathai Thottu# Tamil Songs# Prabhu Dev (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-692.mp3", favorite: false },
  { id: "ta-693", title: "Karupputhaan Ennaku Pudicha Coloru Tamil", artist: "murali", album: "Vetri Kodi Kattu movie (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-693.mp3", favorite: false },
  { id: "ta-694", title: "Kattappava Kaanom - Hey Penne Tamil", artist: "Santhosh Dhayanidhi", album: "Sibiraj (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-694.mp3", favorite: false },
  { id: "ta-695", title: "Kavalai Vendam - Nee Tholaindhaayo Tamil", artist: "Leon James", album: "Jiiva (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-695.mp3", favorite: false },
  { id: "ta-696", title: "Kiss - Thirudi", artist: "Sathish, Jen Martin", album: "Kavin (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-696.mp3", favorite: false },
  { id: "ta-697", title: "Ko - Ennamo Yeadho", artist: "Harris", album: "Jiiva, Karthika (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-697.mp3", favorite: false },
  { id: "ta-701", title: "Laali Laali With Lyrics", artist: "Karthi, Rakul Preet", album: "Theeran Adhigaaram Ondru Movie (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-701.mp3", favorite: false },
  { id: "ta-705", title: "Madharasapattinam - Pookkal Pookkum Aarya, Amy Jackson", artist: "Various Artists", album: "Madharasapattinam - Pookkal Pookkum Aarya, Amy Jackson (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-705.mp3", favorite: false },
  { id: "ta-706", title: "Manithan - Aval", artist: "Santhosh Narayanan", album: "Udhayanidhi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-706.mp3", favorite: false },
  { id: "ta-709", title: "Maryan - Innum Konjam Naeram", artist: "Dhanush, Super Hit Song", album: "A. R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-709.mp3", favorite: false },
  { id: "ta-710", title: "Maryan - Naetru Aval Irundhal", artist: "Dhanush,  Parvathy", album: "Dhanush, Parvathy (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-710.mp3", favorite: false },
  { id: "ta-713", title: "Mersal - Neethanae Tamil", artist: "A R Rahman, Atlee", album: "Vijay, Samantha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-713.mp3", favorite: false },
  { id: "ta-714", title: "Minnalai Pidithu - Shajahan - Tamil Songs HD", artist: "Various Artists", album: "Minnalai Pidithu - Shajahan - Tamil Songs HD (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-714.mp3", favorite: false },
  { id: "ta-715", title: "Minnale", artist: "Various Artists", album: "Azhagiya Theeye song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-715.mp3", favorite: false },
  { id: "ta-716", title: "Minnale", artist: "Bombay Jayashri, Harris Jayaraj", album: "Vaseegara song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-716.mp3", favorite: false },
  { id: "ta-717", title: "Mona Gasolina", artist: "Rajinikanth, Anushka Shetty", album: "Lingaa (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-717.mp3", favorite: false },
  { id: "ta-718", title: "Moongil Thottam - Full & Lyrics - Kadal AR Rahman, Mani Ratnam", artist: "Various Artists", album: "Moongil Thottam - Full & Lyrics - Kadal AR Rahman, Mani Ratnam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-718.mp3", favorite: false },
  { id: "ta-719", title: "Mr.Romeo-Romeo Attam HD", artist: "Various Artists", album: "Mr.Romeo-Romeo Attam HD (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-719.mp3", favorite: false },
  { id: "ta-720", title: "Mudhal Kanave Majunu from Tamil on Vimeo", artist: "Various Artists", album: "Mudhal Kanave Majunu from Tamil on Vimeo (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-720.mp3", favorite: false },
  { id: "ta-721", title: "Mugavaree - Yeh Nilavae Nilavae", artist: "Jyothika, Vivek", album: "Ajith Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-721.mp3", favorite: false },
  { id: "ta-722", title: "Mukkala Mukkabala", artist: "Prabhudeva, Nagma", album: "Kadhalan Movie (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-722.mp3", favorite: false },
  { id: "ta-723", title: "Mun Paniya HD for Google Android⧸Apple iOS", artist: "Various Artists", album: "Mun Paniya HD for Google Android⧸Apple iOS (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-723.mp3", favorite: false },
  { id: "ta-724", title: "Naam - Adi Penne (Duet) [ ] - T Suriavelan", artist: "Stephen Zechariah ft Srinisha", album: "Rupiny (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-724.mp3", favorite: false },
  { id: "ta-726", title: "Naan Nee-Madras", artist: "Various Artists", album: "Naan Nee-Madras (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-726.mp3", favorite: false },
  { id: "ta-727", title: "Naanum Rowdy Dhaan - Neeyum Naanum", artist: "Neeti Mohan, Anirudh", album: "Lyric Video (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-727.mp3", favorite: false },
  { id: "ta-728", title: "Naerukku Naer - Aval Varuvala", artist: "Various Artists", album: "Naerukku Naer - Aval Varuvala (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-728.mp3", favorite: false },
  { id: "ta-729", title: "Neethaane En Ponvasantham - Sattru Munbu", artist: "Jiiva,  Samantha", album: "Jiiva, Samantha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-729.mp3", favorite: false },
  { id: "ta-730", title: "Nenjukkule Official Full - Kadal - AR Rahman 1080p HD", artist: "Various Artists", album: "Nenjukkule Official Full - Kadal - AR Rahman 1080p HD (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-730.mp3", favorite: false },
  { id: "ta-731", title: "OK Kanmani - Mental Manadhil", artist: "A. R. Rahman, Super Hit Song", album: "Dulquer (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-731.mp3", favorite: false },
  { id: "ta-732", title: "Oh My Kadavule - Marappadhilai Nenje", artist: "Leon James", album: "Ashok Selvan, Ritika Singh (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-732.mp3", favorite: false },
  { id: "ta-734", title: "Oru Paadhi Kadhavu 1080p HD Bluray +3D Thaandavam", artist: "Various Artists", album: "Oru Paadhi Kadhavu 1080p HD Bluray +3D Thaandavam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-734.mp3", favorite: false },
  { id: "ta-735", title: "Paiya - Thuli Thuli", artist: "Yuvan Shankar Raja", album: "Karthi, Tamannah (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-735.mp3", favorite: false },
  { id: "ta-736", title: "Paiya - Yedho Ondru Ennai", artist: "Yuvan Shankar Raja", album: "Karthi, Tamannah (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-736.mp3", favorite: false },
  { id: "ta-737", title: "Penne Neeyum Penna - Priyamana Thozhi Songs", artist: "Jyotika, S A Rajkumar", album: "Madhavan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-737.mp3", favorite: false },
  { id: "ta-738", title: "Pennoruthi - Gemini", artist: "Various Artists", album: "Pennoruthi - Gemini (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-738.mp3", favorite: false },
  { id: "ta-739", title: "Petta - Marana Mass", artist: "Anirudh Ravichander", album: "Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-739.mp3", favorite: false },
  { id: "ta-740", title: "Po Urave", artist: "Jyotika, A H Kaashif", album: "Kaatrin Mozhi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-740.mp3", favorite: false },
  { id: "ta-741", title: "Poi Solla Intha Manasukku Theriyavillai", artist: "April Mathathil", album: "yuvan shankar raja (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-741.mp3", favorite: false },
  { id: "ta-742", title: "Pudichirukku", artist: "Vikram, Trisha", album: "Saamy (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-742.mp3", favorite: false },
  { id: "ta-743", title: "Pugazh - Neeyae", artist: "Vivek - Mervin", album: "Jai, Surabhi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-743.mp3", favorite: false },
  { id: "ta-745", title: "Rasaali", artist: "STR, A R Rahman", album: "Achcham Yenbadhu Madamaiyada (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-745.mp3", favorite: false },
  { id: "ta-746", title: "Rekka - Kannamma Tamil Vijay Sethupathi D. Imman", artist: "Various Artists", album: "Rekka - Kannamma Tamil Vijay Sethupathi D. Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-746.mp3", favorite: false },
  { id: "ta-747", title: "Rummy - Koodamela Koodavechi", artist: "Vijay Sethupathi", album: "Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-747.mp3", favorite: false },
  { id: "ta-748", title: "Run Minsaram en meethu", artist: "Various Artists", album: "Run Minsaram en meethu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-748.mp3", favorite: false },
  { id: "ta-749", title: "Saamurai - Moongil Kaadugale", artist: "Various Artists", album: "Saamurai - Moongil Kaadugale (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-749.mp3", favorite: false },
  { id: "ta-754", title: "Sillunu Oru Kadhal Tamil Movie Songs HD", artist: "Suriya, Bhumika", album: "Munbe Vaa Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-754.mp3", favorite: false },
  { id: "ta-755", title: "Sillunu Oru Kadhal Tamil Movie Songs", artist: "Suriya, Jyothika", album: "New York Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-755.mp3", favorite: false },
  { id: "ta-756", title: "Sivappu Manjal Pachai", artist: "Siddharth, G.V.Prakash Kumar", album: "Usure Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-756.mp3", favorite: false },
  { id: "ta-757", title: "Sollamal Thottu Sellum Thendral-YUVAN SAHANKER HITZS-(NORMAL VERSION ).flv", artist: "Various Artists", album: "Sollamal Thottu Sellum Thendral-YUVAN SAHANKER HITZS-(NORMAL VERSION ).flv (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-757.mp3", favorite: false },
  { id: "ta-758", title: "Tamil Bharathi Nirpathuve Nadapathuve Parapathuve", artist: "Various Artists", album: "Tamil Bharathi Nirpathuve Nadapathuve Parapathuve (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-758.mp3", favorite: false },
  { id: "ta-759", title: "Tamil Songs", artist: "Elangaathu Veesudhey, Ilaiyaraja Songs", album: "இளங்காத்து வீசுதே (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-759.mp3", favorite: false },
  { id: "ta-762", title: "The Life of Ram", artist: "Vijay Sethupathi, Trisha", album: "96 (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-762.mp3", favorite: false },
  { id: "ta-763", title: "Theekkoluthi Bison Kaalamaadan Dhruv, Anupama Mari Selvaraj Nivas K Prasanna", artist: "Various Artists", album: "Theekkoluthi Bison Kaalamaadan Dhruv, Anupama Mari Selvaraj Nivas K Prasanna (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-763.mp3", favorite: false },
  { id: "ta-764", title: "Thenali (2000)", artist: "Kamal Haasan, Jyothika", album: "Swasame Swasame (New Zealand) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-764.mp3", favorite: false },
  { id: "ta-765", title: "Thithikudhe Tamil Movie Songs HD", artist: "Jeeva, Sridevi", album: "Silendra Theepori Ondru Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-765.mp3", favorite: false },
  { id: "ta-766", title: "Tum Tum", artist: "Vishal, Arya", album: "Enemy (Tamil) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-766.mp3", favorite: false },
  { id: "ta-767", title: "Udhayam NH4 - Yaaro Ivan", artist: "Siddharth,  Ashrita", album: "Siddharth, Ashrita (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-767.mp3", favorite: false },
  { id: "ta-768", title: "Ullam Kollai Poguthae Tamil Movie - Kavidhaigal (Sad)", artist: "Anjala, Karthik Raja", album: "Prabhudeva (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-768.mp3", favorite: false },
  { id: "ta-769", title: "Uriyadi - Maane Maane", artist: "Anthony Daasan", album: "Vijay Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-769.mp3", favorite: false },
  { id: "ta-770", title: "VADACHENNAI - Ennadi Maayavi Nee Dhanush Vetri Maaran Santhosh Narayanan", artist: "Various Artists", album: "VADACHENNAI - Ennadi Maayavi Nee Dhanush Vetri Maaran Santhosh Narayanan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-770.mp3", favorite: false },
  { id: "ta-771", title: "Vaamanan - Oru Devathai", artist: "Yuvanshankar Raja", album: "Jai, Priya Anand (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-771.mp3", favorite: false },
  { id: "ta-772", title: "Vaanaviley", artist: "Vijayakanth, Simran", album: "Ramanaa Tamil Movie (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-772.mp3", favorite: false },
  { id: "ta-774", title: "Vadacurry - Nenjukulle Nee", artist: "Vivek - Mervin", album: "Jai, Swathi Reddy, RJ Balaji (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-774.mp3", favorite: false },
  { id: "ta-775", title: "Vai Raja Vai - Pachchai Vanna", artist: "Gautham Karthik,  Priya Anand", album: "Gautham Karthik, Priya Anand (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-775.mp3", favorite: false },
  { id: "ta-776", title: "Vanakkam Chennai - Oh Penne", artist: "Shiva,  Priya Anand", album: "Shiva, Priya Anand (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-776.mp3", favorite: false },
  { id: "ta-778", title: "Veera - Verrattaama Verratturiye Tamil", artist: "Kreshna,  Leon James", album: "Kreshna, Leon James (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-778.mp3", favorite: false },
  { id: "ta-779", title: "Velai Illa Pattadhaari vip Po Indru Neeyaga", artist: "Various Artists", album: "Velai Illa Pattadhaari vip Po Indru Neeyaga (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-779.mp3", favorite: false },
  { id: "ta-780", title: "Velai Illa Pattadhaari #D25 #VIP - Udhungada Sangu", artist: "Various Artists", album: "Full Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-780.mp3", favorite: false },
  { id: "ta-781", title: "Vijay Hits", artist: "Friends Movie Songs, Vijay", album: "Thendral Varum Full Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-781.mp3", favorite: false },
  { id: "ta-782", title: "Vikram Vedha Songs", artist: "R. Madhavan, Sam C S", album: "Tasakku Tasakku Video Song feat. Vijay Sethupathi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-782.mp3", favorite: false },
  { id: "ta-784", title: "Vinnaithaandi Varuvaayaa - Anbil Avan", artist: "STR, Trisha", album: "A.R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-784.mp3", favorite: false },
  { id: "ta-786", title: "Vinnaithaandi Varuvaayaa - Omana Penne Tamil", artist: "STR", album: "A.R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-786.mp3", favorite: false },
  { id: "ta-787", title: "Visiri - Teaser", artist: "Dhanush, Darbuka Siva", album: "Enai Noki Paayum Thota (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-787.mp3", favorite: false },
  { id: "ta-788", title: "Whistle - Azhagiya Asura", artist: "Various Artists", album: "Whistle - Azhagiya Asura (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-788.mp3", favorite: false },
  { id: "ta-789", title: "Whistlu Whistlu Whistluma", artist: "A R. Rahman", album: "Thalapathy Vijay, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-789.mp3", favorite: false },
  { id: "ta-790", title: "Yaarumillaa", artist: "Gireesaaya, Radhan", album: "Dhruv Vikram,Banita Sandhu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-790.mp3", favorite: false },
  { id: "ta-793", title: "YouTube - Kushi - Yaar solvatho HD.mp4 djvijay", artist: "Various Artists", album: "YouTube - Kushi - Yaar solvatho HD.mp4 djvijay (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-793.mp3", favorite: false },
  { id: "ta-794", title: "adi kadhal enbathu", artist: "Various Artists", album: "adi kadhal enbathu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-794.mp3", favorite: false },
  { id: "ta-795", title: "hHey Nee Romba Azhaga Irukke - tThottu Thottu Sellum.avi", artist: "Various Artists", album: "hHey Nee Romba Azhaga Irukke - tThottu Thottu Sellum.avi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-795.mp3", favorite: false },
  { id: "ta-796", title: "ninaithu ninaithu female version", artist: "Various Artists", album: "ninaithu ninaithu female version (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-796.mp3", favorite: false },
  { id: "ta-797", title: "இரவா பகலா குளிரா வெயிலா - Poovellam Kettu Paar HQ", artist: "Various Artists", album: "இரவா பகலா குளிரா வெயிலா - Poovellam Kettu Paar HQ (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-797.mp3", favorite: false },
  { id: "ml-164", title: "KALYANI (with Shreya Ghoshal)", artist: "KDS, FIFTY4", album: "ARJN (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-164.mp3", favorite: false },
  { id: "ml-166", title: "Neon Ride", artist: "Kunchacko Boban, Jakes Bejoy", album: "Officer On Duty (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-166.mp3", favorite: false },
  { id: "ml-167", title: "Ranam Title Track", artist: "Prithviraj Sukumaran, Rahman", album: "You Made Me Feel (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-167.mp3", favorite: false },
  { id: "en-391", title: "Woman", artist: "Doja Cat", album: "Woman (English)", language: "English", duration: "3:30", audio: "english/en-391.mp3", favorite: false },
  { id: "en-393", title: "One Dance", artist: "Drake, Wizkid, Kyla", album: "One Dance (English)", language: "English", duration: "3:30", audio: "english/en-393.mp3", favorite: false },
  { id: "en-397", title: "Unforgettable", artist: "French Montana, Swae Lee", album: "Unforgettable (English)", language: "English", duration: "3:30", audio: "english/en-397.mp3", favorite: false },
  { id: "en-400", title: "Sorry", artist: "Justin Bieber", album: "Purpose (English)", language: "English", duration: "3:30", audio: "english/en-400.mp3", favorite: false },
  { id: "en-401", title: "People", artist: "Libianca", album: "People (English)", language: "English", duration: "3:30", audio: "english/en-401.mp3", favorite: false },
  { id: "en-408", title: "Hips Don't Lie", artist: "Shakira, Wyclef Jean", album: "Hips Don't Lie (English)", language: "English", duration: "3:30", audio: "english/en-408.mp3", favorite: false },
  { id: "en-411", title: "Jalebi Baby", artist: "Tesher", album: "Jalebi Baby (English)", language: "English", duration: "3:30", audio: "english/en-411.mp3", favorite: false },
  { id: "en-412", title: "Starboy", artist: "The Weeknd, Daft Punk", album: "Starboy (English)", language: "English", duration: "3:30", audio: "english/en-412.mp3", favorite: false },
  { id: "en-413", title: "Popular", artist: "The Weeknd, Madonna, Playboi Carti", album: "Popular (English)", language: "English", duration: "3:30", audio: "english/en-413.mp3", favorite: false },
  { id: "ta-798", title: "Indru Netru Naalai", artist: "Various Artists", album: "Indru Netru Naalai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-798.mp3", favorite: false },
  { id: "ta-799", title: "3 - Idhazhin Oram", artist: "Various Artists", album: "3 - Idhazhin Oram (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-799.mp3", favorite: false },
  { id: "ta-800", title: "3 - Kannazhaga", artist: "Various Artists", album: "3 - Kannazhaga (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-800.mp3", favorite: false },
  { id: "ta-801", title: "3 - Nee Paartha Vizhigal", artist: "Various Artists", album: "3 - Nee Paartha Vizhigal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-801.mp3", favorite: false },
  { id: "ta-802", title: "7 Aum Arivu - Yamma Yamma", artist: "Various Artists", album: "7 Aum Arivu - Yamma Yamma (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-802.mp3", favorite: false },
  { id: "ta-803", title: "7UP Madras Gig - Orasaadha", artist: "Various Artists", album: "7UP Madras Gig - Orasaadha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-803.mp3", favorite: false },
  { id: "ta-806", title: "AASAI", artist: "Various Artists", album: "AASAI (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-806.mp3", favorite: false },
  { id: "ta-807", title: "Aadukalam - Ayyayo", artist: "Various Artists", album: "Aadukalam - Ayyayo (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-807.mp3", favorite: false },
  { id: "ta-808", title: "Adiye", artist: "Various Artists", album: "Adiye (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-808.mp3", favorite: false },
  { id: "ta-810", title: "Anbe En Anbe", artist: "Various Artists", album: "Anbe En Anbe (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-810.mp3", favorite: false },
  { id: "ta-811", title: "Arabu Naade", artist: "Various Artists", album: "Arabu Naade (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-811.mp3", favorite: false },
  { id: "ta-812", title: "Asku Laska", artist: "Various Artists", album: "Asku Laska (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-812.mp3", favorite: false },
  { id: "ta-813", title: "Baana - En Nenjil", artist: "Various Artists", album: "Baana - En Nenjil (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-813.mp3", favorite: false },
  { id: "ta-815", title: "En Kadhaliya Romba Pidikum", artist: "Various Artists", album: "En Kadhaliya Romba Pidikum (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-815.mp3", favorite: false },
  { id: "ta-816", title: "Engeyum Kaadhal - Dhimu Dhimu", artist: "Various Artists", album: "Engeyum Kaadhal - Dhimu Dhimu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-816.mp3", favorite: false },
  { id: "ta-817", title: "Engeyum Kaadhal - Thee Illai", artist: "Various Artists", album: "Engeyum Kaadhal - Thee Illai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-817.mp3", favorite: false },
  { id: "ta-818", title: "Enkeyo Paartha Mayakkam", artist: "Various Artists", album: "Enkeyo Paartha Mayakkam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-818.mp3", favorite: false },
  { id: "ta-819", title: "Enna Solla Pogirai", artist: "Various Artists", album: "Enna Solla Pogirai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-819.mp3", favorite: false },
  { id: "ta-821", title: "Ethir Neechal - Velicha Poove", artist: "Various Artists", album: "Ethir Neechal - Velicha Poove (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-821.mp3", favorite: false },
  { id: "ta-822", title: "Kaadhalai Solla Mudiyaadha Galatta Kalyaanam", artist: "Various Artists", album: "Kaadhalai Solla Mudiyaadha Galatta Kalyaanam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-822.mp3", favorite: false },
  { id: "ta-823", title: "Hangova (From ＂DC＂)", artist: "Various Artists", album: "Hangova (From ＂DC＂) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-823.mp3", favorite: false },
  { id: "ta-824", title: "Imaikkaa Nodigal - Kadhal Oru Aagayam", artist: "Various Artists", album: "Imaikkaa Nodigal - Kadhal Oru Aagayam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-824.mp3", favorite: false },
  { id: "ta-825", title: "Imaikkaa Nodigal - Neeyum Naanum Anbe", artist: "Various Artists", album: "Imaikkaa Nodigal - Neeyum Naanum Anbe (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-825.mp3", favorite: false },
  { id: "ta-826", title: "Iravukku Aayiram Kangal - Uyir Uruvaatha", artist: "Various Artists", album: "Iravukku Aayiram Kangal - Uyir Uruvaatha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-826.mp3", favorite: false },
  { id: "ta-827", title: "Iru Mugan - Kannai Vittu", artist: "Various Artists", album: "Iru Mugan - Kannai Vittu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-827.mp3", favorite: false },
  { id: "ml-169", title: "KALYANI", artist: "Various Artists", album: "KALYANI (Malayalam)", language: "Malayalam", duration: "3:30", audio: "malayalam/ml-169.mp3", favorite: false },
  { id: "ta-828", title: "Kadhal Vaithu", artist: "Various Artists", album: "Kadhal Vaithu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-828.mp3", favorite: false },
  { id: "ta-829", title: "Kan Pesum Varthaigal", artist: "Various Artists", album: "Kan Pesum Varthaigal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-829.mp3", favorite: false },
  { id: "ta-830", title: "Kanave Kanave", artist: "Various Artists", album: "Kanave Kanave (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-830.mp3", favorite: false },
  { id: "ta-831", title: "Kanave Nee Naan - Kannum Kannum Kollaiyadithaal", artist: "Various Artists", album: "Kanave Nee Naan - Kannum Kannum Kollaiyadithaal (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-831.mp3", favorite: false },
  { id: "ta-832", title: "Kanave Unnai Vandhu Sera X Qalb", artist: "Various Artists", album: "Kanave Unnai Vandhu Sera X Qalb (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-832.mp3", favorite: false },
  { id: "ta-833", title: "Kannadi Poove", artist: "Various Artists", album: "Kannadi Poove (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-833.mp3", favorite: false },
  { id: "ta-834", title: "Kathali - Best of Havoc Brothers", artist: "Various Artists", album: "Kathali - Best of Havoc Brothers (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-834.mp3", favorite: false },
  { id: "ta-835", title: "Konjam - M.S. Dhoni", artist: "Various Artists", album: "Konjam - M.S. Dhoni (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-835.mp3", favorite: false },
  { id: "ta-836", title: "Konjam", artist: "Various Artists", album: "Konjam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-836.mp3", favorite: false },
  { id: "ta-837", title: "Kumki - Nee Yeppo Pulla", artist: "Various Artists", album: "Kumki - Nee Yeppo Pulla (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-837.mp3", favorite: false },
  { id: "ta-838", title: "Kumki - Onnum Puriyala", artist: "Various Artists", album: "Kumki - Onnum Puriyala (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-838.mp3", favorite: false },
  { id: "ta-839", title: "Laali Laali", artist: "Various Artists", album: "Laali Laali (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-839.mp3", favorite: false },
  { id: "ta-840", title: "Love Today - Ennai Vittu", artist: "Various Artists", album: "Love Today - Ennai Vittu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-840.mp3", favorite: false },
  { id: "ta-841", title: "Maari - Don’u Don’u Don’u", artist: "Various Artists", album: "Maari - Don’u Don’u Don’u (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-841.mp3", favorite: false },
  { id: "ta-842", title: "Maattrraan - Yaaro Yaaro", artist: "Various Artists", album: "Maattrraan - Yaaro Yaaro (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-842.mp3", favorite: false },
  { id: "ta-843", title: "Maragatha Naanayam - Nee Kavithaigala", artist: "Various Artists", album: "Maragatha Naanayam - Nee Kavithaigala (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-843.mp3", favorite: false },
  { id: "ta-844", title: "Maryan - Innum Konjam Naeram", artist: "Various Artists", album: "Maryan - Innum Konjam Naeram (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-844.mp3", favorite: false },
  { id: "ta-845", title: "Meesaya Murukku - Enna Nadanthalum", artist: "Various Artists", album: "Meesaya Murukku - Enna Nadanthalum (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-845.mp3", favorite: false },
  { id: "ta-846", title: "Megham Karukatha", artist: "Various Artists", album: "Megham Karukatha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-846.mp3", favorite: false },
  { id: "ta-847", title: "Minnale - Venmathi Venmathiye", artist: "Various Artists", album: "Minnale - Venmathi Venmathiye (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-847.mp3", favorite: false },
  { id: "ta-848", title: "Munbe Vaa", artist: "Various Artists", album: "Munbe Vaa (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-848.mp3", favorite: false },
  { id: "ta-849", title: "Naam - Adi Penne (Duet)", artist: "Various Artists", album: "Naam - Adi Penne (Duet) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-849.mp3", favorite: false },
  { id: "ta-850", title: "Naam 2 - Kannoram", artist: "Various Artists", album: "Naam 2 - Kannoram (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-850.mp3", favorite: false },
  { id: "ta-852", title: "Nesamaguren", artist: "Various Artists", album: "Nesamaguren (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-852.mp3", favorite: false },
  { id: "ta-853", title: "New York Nagaram", artist: "Various Artists", album: "New York Nagaram (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-853.mp3", favorite: false },
  { id: "ta-854", title: "Nira", artist: "Various Artists", album: "Nira (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-854.mp3", favorite: false },
  { id: "ta-856", title: "Oh My Kadavule - Marappadhilai Nenje", artist: "Various Artists", album: "Oh My Kadavule - Marappadhilai Nenje (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-856.mp3", favorite: false },
  { id: "ta-857", title: "Oorum Blood", artist: "Various Artists", album: "Oorum Blood (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-857.mp3", favorite: false },
  { id: "ta-858", title: "Oru Kal Oru Kannadi - Siva Manasula Sakthi", artist: "Various Artists", album: "Oru Kal Oru Kannadi - Siva Manasula Sakthi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-858.mp3", favorite: false },
  { id: "ta-859", title: "Oru Paadhikadhavu Neeyadi", artist: "Various Artists", album: "Oru Paadhikadhavu Neeyadi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-859.mp3", favorite: false },
  { id: "ta-860", title: "Paakatha Ena Paakatha", artist: "Various Artists", album: "Paakatha Ena Paakatha (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-860.mp3", favorite: false },
  { id: "ta-861", title: "Paiya - Yedho Ondru Ennai", artist: "Various Artists", album: "Paiya - Yedho Ondru Ennai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-861.mp3", favorite: false },
  { id: "ta-862", title: "Pattampoochi", artist: "Various Artists", album: "Pattampoochi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-862.mp3", favorite: false },
  { id: "ta-865", title: "Po Nee Po", artist: "Various Artists", album: "Po Nee Po (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-865.mp3", favorite: false },
  { id: "ta-866", title: "Po Urave", artist: "Various Artists", album: "Po Urave (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-866.mp3", favorite: false },
  { id: "ta-868", title: "Poovukkul", artist: "Various Artists", album: "Poovukkul (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-868.mp3", favorite: false },
  { id: "ta-870", title: "Sakkarai Nilavea", artist: "Various Artists", album: "Sakkarai Nilavea (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-870.mp3", favorite: false },
  { id: "ta-871", title: "Sirai - Neelothi", artist: "Various Artists", album: "Sirai - Neelothi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-871.mp3", favorite: false },
  { id: "ta-872", title: "Sivappu Manjal Pachai - Usure", artist: "Various Artists", album: "Sivappu Manjal Pachai - Usure (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-872.mp3", favorite: false },
  { id: "ta-873", title: "Snehithane Cover (Alaipayuthe) - Masala Coffee", artist: "Various Artists", album: "Snehithane Cover (Alaipayuthe) - Masala Coffee (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-873.mp3", favorite: false },
  { id: "ta-874", title: "TeeJay - Muttu Muttu ft. Sri Mathumitha, Mc Sai", artist: "Various Artists", album: "TeeJay - Muttu Muttu ft. Sri Mathumitha, Mc Sai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-874.mp3", favorite: false },
  { id: "ta-875", title: "Thaalam Trip (Instrumental)", artist: "Various Artists", album: "Thaalam Trip (Instrumental) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-875.mp3", favorite: false },
  { id: "ta-876", title: "Thalaivaa - Yaar Indha Saalai Oram", artist: "Various Artists", album: "Thalaivaa - Yaar Indha Saalai Oram (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-876.mp3", favorite: false },
  { id: "ta-877", title: "Thani Oruvan - Kannala Kannala", artist: "Various Artists", album: "Thani Oruvan - Kannala Kannala (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-877.mp3", favorite: false },
  { id: "ta-878", title: "The Life of Ram", artist: "Various Artists", album: "The Life of Ram (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-878.mp3", favorite: false },
  { id: "ta-879", title: "Thean Kudika", artist: "Various Artists", album: "Thean Kudika (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-879.mp3", favorite: false },
  { id: "ta-880", title: "Theekkoluthi", artist: "Various Artists", album: "Theekkoluthi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-880.mp3", favorite: false },
  { id: "ta-881", title: "Thenmozhi", artist: "Various Artists", album: "Thenmozhi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-881.mp3", favorite: false },
  { id: "ta-883", title: "Trisha Illana Nayanthara - Yennachu Yedhachu", artist: "Various Artists", album: "Trisha Illana Nayanthara - Yennachu Yedhachu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-883.mp3", favorite: false },
  { id: "ta-884", title: "Udhayam NH4 - Yaaro Ivan", artist: "Various Artists", album: "Udhayam NH4 - Yaaro Ivan (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-884.mp3", favorite: false },
  { id: "ta-885", title: "Udhungada sangu", artist: "Various Artists", album: "Udhungada sangu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-885.mp3", favorite: false },
  { id: "ta-886", title: "Unnaale Unnaale", artist: "Various Artists", album: "Unnaale Unnaale (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-886.mp3", favorite: false },
  { id: "ta-887", title: "Usuraiya Tholaichaen - Stephen Zechariah", artist: "Various Artists", album: "Usuraiya Tholaichaen - Stephen Zechariah (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-887.mp3", favorite: false },
  { id: "ta-888", title: "Usurey Poguthey", artist: "Various Artists", album: "Usurey Poguthey (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-888.mp3", favorite: false },
  { id: "ta-889", title: "Uyire En Uyire - Poojai", artist: "Various Artists", album: "Uyire En Uyire - Poojai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-889.mp3", favorite: false },
  { id: "ta-890", title: "Uyire Un Uyirena", artist: "Various Artists", album: "Uyire Un Uyirena (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-890.mp3", favorite: false },
  { id: "ta-891", title: "Uyire Uyire", artist: "Various Artists", album: "Uyire Uyire (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-891.mp3", favorite: false },
  { id: "ta-892", title: "Vaadi Pulla Vaadi", artist: "Various Artists", album: "Vaadi Pulla Vaadi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-892.mp3", favorite: false },
  { id: "ta-893", title: "Vaaranam Aayiram - Annul Maelae", artist: "Various Artists", album: "Vaaranam Aayiram - Annul Maelae (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-893.mp3", favorite: false },
  { id: "ta-895", title: "Vaayamoodi Summa Iru Da", artist: "Various Artists", album: "Vaayamoodi Summa Iru Da (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-895.mp3", favorite: false },
  { id: "ta-896", title: "Vanakkam Chennai - Oh Penne", artist: "Various Artists", album: "Vanakkam Chennai - Oh Penne (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-896.mp3", favorite: false },
  { id: "ta-897", title: "Velai Illa Pattadhaari #D25 #VIP - Udhungada Sangu", artist: "Various Artists", album: "Velai Illa Pattadhaari #D25 #VIP - Udhungada Sangu (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-897.mp3", favorite: false },
  { id: "ta-898", title: "Venghai - Orey Oru", artist: "Various Artists", album: "Venghai - Orey Oru (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-898.mp3", favorite: false },
  { id: "ta-901", title: "Vizhi Moodi", artist: "Various Artists", album: "Vizhi Moodi (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-901.mp3", favorite: false },
  { id: "ta-902", title: "Vizhigalil Oru", artist: "Various Artists", album: "Vizhigalil Oru (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-902.mp3", favorite: false },
  { id: "ta-903", title: "Yaaradi Nee Mohini - Venmegam", artist: "Various Artists", album: "Yaaradi Nee Mohini - Venmegam (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-903.mp3", favorite: false },
  { id: "ta-904", title: "Yaaro Manadhile", artist: "Various Artists", album: "Yaaro Manadhile (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-904.mp3", favorite: false },
  { id: "ta-905", title: "Yaayum", artist: "Various Artists", album: "Yaayum (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-905.mp3", favorite: false },
  { id: "ta-906", title: "Yaen Ennai Pirindhaai", artist: "Various Artists", album: "Yaen Ennai Pirindhaai (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-906.mp3", favorite: false },
  { id: "ta-907", title: "Yendi Vittu Pona", artist: "Various Artists", album: "Yendi Vittu Pona (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-907.mp3", favorite: false },
  { id: "ta-908", title: "Romeo Juliet", artist: "Various Artists", album: "Romeo Juliet (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-908.mp3", favorite: false },
  { id: "ta-909", title: "அனேகன் - தொடு வானம் தமிழ் பாடல்வரிகள்", artist: "Various Artists", album: "அனேகன் - தொடு வானம் தமிழ் பாடல்வரிகள் (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-909.mp3", favorite: false },
  { id: "ta-910", title: "ஐ - என்னோடு நீ இருந்தால் தமிழ் லிரிக்", artist: "Various Artists", album: "ஐ - என்னோடு நீ இருந்தால் தமிழ் லிரிக் (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-910.mp3", favorite: false },
  { id: "ta-911", title: "கட்டா குஸ்தி 2 - சம்பவக்காரி தமிழ் பாடல்வரிகள்", artist: "Various Artists", album: "கட்டா குஸ்தி 2 - சம்பவக்காரி தமிழ் பாடல்வரிகள் (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-911.mp3", favorite: false },
  { id: "ta-912", title: "Ava Enna (Slowed + Reverb)", artist: "Various Artists", album: "Ava Enna (Slowed + Reverb) (Tamil)", language: "Tamil", duration: "3:30", audio: "tamil/ta-912.mp3", favorite: false }
];

// Elements — preserved layout, no changes
const audio = document.getElementById('audio');
const artwork = document.getElementById('artwork');
const artworkFallback = document.getElementById('artworkFallback');
const fallbackInitials = document.getElementById('fallbackInitials');
const fallbackComposer = document.getElementById('fallbackComposer');
const langBadge = document.getElementById('langBadge');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const songMovie = document.getElementById('songMovie');
const songComposer = document.getElementById('songComposer');
const songAlbum = document.getElementById('songAlbum');
const previewStatus = document.getElementById('previewStatus');
const youtubeWrap = document.getElementById('youtubeWrap');
const youtubePlayerEl = document.getElementById('youtubePlayer');
const spotifyFrame = document.getElementById('spotifyFrame');
const spotifyPlaceholder = document.getElementById('spotifyPlaceholder');
const spotifyTrackTitle = document.getElementById('spotifyTrackTitle');
const spotifyTrackArtist = document.getElementById('spotifyTrackArtist');
const spotifyTrackAlbum = document.getElementById('spotifyTrackAlbum');
const spotifyLang = document.getElementById('spotifyLang');
const spotifyOpenLink = document.getElementById('spotifyOpenLink');
const spotifyCardPlayBtn = document.getElementById('spotifyCardPlayBtn');
const spotifyCardArtwork = document.getElementById('spotifyCardArtwork');
const spotifyCardTitle = document.getElementById('spotifyCardTitle');
const spotifyCardArtist = document.getElementById('spotifyCardArtist');
const spotifyCardDuration = document.getElementById('spotifyCardDuration');
const spotifyCardProgressBar = document.getElementById('spotifyCardProgressBar');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const progressWrap = document.getElementById('progressWrap');
const progressBar = document.getElementById('progressBar');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const saveSpotifyBtn = document.getElementById('saveSpotifyBtn');
const nowPlayingSub = document.getElementById('nowPlayingSub');
const volumeSlider = document.getElementById('volumeSlider');
const muteBtn = document.getElementById('muteBtn');
const volIcon = document.getElementById('volIcon');
const muteIcon = document.getElementById('muteIcon');
const volPercent = document.getElementById('volPercent');
const favBtn = document.getElementById('favBtn');
const playingBadge = document.getElementById('playingBadge');
const songListEl = document.getElementById('songList');
const playlistInfo = document.getElementById('playlistInfo');
const composerInfo = document.getElementById('composerInfo');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const emptyFav = document.getElementById('emptyFav');
const emptySearch = document.getElementById('emptySearch');
const toast = document.getElementById('toast');

let currentIndex = 0;
let isPlaying = false;
let filter = 'all';
let searchQuery = '';
let isDragging = false;
// Repeat modes: 0=OFF, 1=ALL, 2=ONE
let isShuffle = false;
let repeatMode = 0; // 0 OFF, 1 ALL, 2 ONE
let favorites = loadFavorites();
let audioVolume = parseFloat(localStorage.getItem('isai_volume') || '0.8');
let shuffleHistory = [];

function loadFavorites(){
  try{ return JSON.parse(localStorage.getItem('isai_favorites')||'[]'); }catch{return []}
}
function saveFavorites(){ localStorage.setItem('isai_favorites', JSON.stringify(favorites)); }
function isFav(id){ return favorites.includes(id); }
function toggleFav(id){
  const idx = favorites.indexOf(id);
  if(idx>-1) favorites.splice(idx,1); else favorites.push(id);
  favorites = [...new Set(favorites)];
  saveFavorites();
  updateFavUI();
  renderPlaylist();
  updateCounts();
  showToast(isFav(id) ? 'Added to favorites ❤️' : 'Removed from favorites');
}
function getCover(song){ return song.cover || ''; }

// --- Clean song display: verified playback singer(s) + release year ---
// `singer`/`year` are curated ONLY from verifiable sources (film soundtrack
// credits). The legacy `artist` field often holds film actors, composers or
// "Various Artists", so it is NEVER presented as the singer. Unverified rows
// fall back to the film name, or "Unknown artist" when even that would just
// repeat the title. Nothing here is guessed.
const METADATA_SOURCES = {
  'ta-084': 'Bombay (1995): K. S. Chithra, A. R. Rahman — Gaana/JioSaavn/Wikipedia',
  'ta-104': 'Guna (1991): Kamal Haasan, S. Janaki — Wikipedia/Gaana/Apple Music',
  'ta-113': 'Master single (10 Mar 2020): Anirudh Ravichander, Gana Balachandar — Wikipedia/Gaana',
  'ta-129': 'Ponniyin Selvan 1 single (31 Jul 2022): A. R. Rahman, A. R. Raihanah, Bamba Bakya — Wikipedia/Apple Music',
  'ta-144': 'Muthu (1995): Mano, Sujatha Mohan — Wikipedia/JioSaavn/Apple Music',
  'ta-187': 'Beast single (14 Feb 2022): Anirudh Ravichander, Jonita Gandhi — Wikipedia/Apple Music/Spotify'
};
function isGenericArtist(name){
  return /^\s*(various artists|unknown artist|various|unknown)\s*$/i.test(String(name || ''));
}
function getFilm(song){
  // `album` holds the film name plus a redundant " (Language)" suffix — strip it.
  const cleaned = String(song.album || '').replace(/\s*\((Tamil|Telugu|English|Malayalam|Hindi|Punjabi)\)\s*/gi, ' ').replace(/\s+/g, ' ').trim();
  // Hide when the "film" just repeats the song title.
  if(!cleaned || cleaned.toLowerCase() === String(song.title || '').toLowerCase()) return '';
  return cleaned;
}
function getSinger(song){ return String(song.singer || '').trim(); }
function getYear(song){ return song.year || ''; }
function getDisplaySub(song){
  const singer = getSinger(song);
  const year = getYear(song);
  const film = getFilm(song);
  if(singer && year) return `${singer} • ${year}`;
  if(singer) return singer;
  if(film && year) return `${film} • ${year}`;
  if(film) return film;
  if(year) return String(year);
  return 'Unknown artist';
}
function getAlbum(song){ return song.album || ''; }
function getComposer(song){ return song.composer || ''; }
function formatTime(s){
  if(isNaN(s) || !isFinite(s)) return '0:00';
  const m=Math.floor(s/60), sec=Math.floor(s%60);
  return `${m}:${String(sec).padStart(2,'0')}`;
}
function parseDuration(str){
  if(!str) return 0;
  const parts=str.split(':').map(Number);
  if(parts.length===2) return parts[0]*60+parts[1];
  return 0;
}
function getInitials(title){
  const w=title.trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();
  return w || 'IS';
}
function showToast(msg){
  toast.textContent=msg;
  toast.classList.remove('hidden');
  clearTimeout(showToast._t);
  showToast._t=setTimeout(()=>toast.classList.add('hidden'), 2400);
}

function updateCounts(){
  const counts = {
    all: songs.length,
    tamil: songs.filter(s=>s.language==='Tamil').length,
    telugu: songs.filter(s=>s.language==='Telugu').length,
    english: songs.filter(s=>s.language==='English').length,
    malayalam: songs.filter(s=>s.language==='Malayalam').length,
    favorites: favorites.length
  };
  document.getElementById('countAll').textContent=counts.all;
  document.getElementById('countTamil').textContent=counts.tamil;
  document.getElementById('countTelugu').textContent=counts.telugu;
  document.getElementById('countEnglish').textContent=counts.english;
  document.getElementById('countMalayalam').textContent=counts.malayalam;
  document.getElementById('countFav').textContent=counts.favorites;
}

// Ensure audio element is single persistent instance
if(audio){
  audio.preload = 'metadata';
  audio.volume = audioVolume;
}

function validateSong(song){
  if(!song || !song.id || !song.title || !song.artist || !song.language || !song.audio) return false;
  if(!isValidAudioPath(song.audio)) return false;
  return true;
}

function updateAudioVisual(song){
  // For local audio, visual area is artwork (or placeholder), not YouTube
  // Keep youtubeWrap but show artwork-like placeholder for audio
  const ytWrap = document.getElementById('youtubeWrap');
  const ytPlayer = document.getElementById('youtubePlayer');
  const sFrame = document.getElementById('spotifyFrame');
  const sPlace = document.getElementById('spotifyPlaceholder');
  if(ytWrap){
    ytWrap.style.display = 'block';
    ytWrap.classList.remove('hidden');
    // Hide YouTube specific elements, show audio visual
    if(ytPlayer) ytPlayer.style.display = 'none';
    if(sFrame){
      sFrame.style.display = 'none';
      sFrame.classList.add('hidden');
      sFrame.removeAttribute('src');
    }
    if(sPlace){
      sPlace.classList.remove('hidden');
      sPlace.style.display = 'grid';
      // Show audio visual: use cover or initials
      const cover = getCover(song);
      const initials = getInitials(song.title);
      // If cover exists, try to show, otherwise show initials
      // We will update sPlace content to show Now Playing audio visual
      sPlace.innerHTML = cover
        ? `<div style="width:100%;height:100%;display:grid;place-items:center;background:linear-gradient(135deg,#1a1c33 0%, #252850 45%, #3b2f7a 100%);border-radius:14px;"><img src="${cover}" alt="${song.title}" style="width:100%;height:100%;object-fit:cover;border-radius:14px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid'"><div style="display:none;place-items:center;place-content:center;gap:6px;text-align:center;padding:20px;"><span style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:36px;letter-spacing:-0.04em;background:var(--accent-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${initials}</span><small style="color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:0.12em;text-transform:uppercase">${escapeHtml(getDisplaySub(song))}</small></div></div>`
        : `<div class="artwork-fallback" style="position:static;inset:auto;display:grid;place-items:center;place-content:center;gap:6px;background:linear-gradient(135deg,#1a1c33 0%, #252850 45%, #3b2f7a 100%);text-align:center;padding:20px;border-radius:14px;width:100%;height:100%;"><span style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:36px;letter-spacing:-0.04em;background:var(--accent-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${initials}</span><small style="color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:0.12em;text-transform:uppercase">${escapeHtml(getDisplaySub(song))}</small></div>`;
      // Keep placeholder visible as audio visual, not error
    }
  }
}

function loadSong(index, autoplay=false){
  if(songs.length===0) return;
  currentIndex = (index + songs.length) % songs.length;
  const song = songs[currentIndex];
  const cover = getCover(song);
  const album = getAlbum(song);
  const composer = getComposer(song);

  // Update Now Playing header (film without the redundant language suffix)
  const film = getFilm(song);
  const sub = getDisplaySub(song);
  if(nowPlayingSub) nowPlayingSub.textContent = film ? `${song.language} • ${film}` : song.language;

  // Update song meta (centered below controls): title + singer • year
  const leftMeta = document.getElementById('leftMeta');
  if(leftMeta){
    leftMeta.classList.remove('hidden');
    leftMeta.style.display = 'block';
  }
  if(songTitle) songTitle.textContent = song.title;
  if(songArtist) songArtist.textContent = sub;
  if(songMovie){
    songMovie.textContent = film;
    songMovie.classList.toggle('hidden', !film);
  }
  if(songComposer) songComposer.textContent = '';
  if(songAlbum){
    songAlbum.textContent = '';
    songAlbum.classList.add('hidden');
  }

  // Artwork fallback for legacy (if still present)
  if(fallbackInitials) fallbackInitials.textContent = getInitials(song.title);
  if(fallbackComposer) fallbackComposer.textContent = composer || song.language;
  if(langBadge){
    langBadge.textContent = song.language.toUpperCase();
    langBadge.style.background = song.language==='Tamil' ? 'rgba(124,92,255,0.92)' : song.language==='Telugu' ? 'rgba(236,72,153,0.92)' : song.language==='English' ? 'rgba(59,130,246,0.92)' : song.language==='Hindi' ? 'rgba(249,115,22,0.92)' : song.language==='Punjabi' ? 'rgba(234,179,8,0.92)' : 'rgba(16,185,129,0.92)';
  }
  if(artwork){
    artwork.classList.add('hidden');
    if(artworkFallback) artworkFallback.classList.remove('hidden');
    if(cover){
      const testImg = new Image();
      testImg.onload = ()=>{
        artwork.src = cover;
        artwork.alt = `${song.title} — ${album}`;
        artwork.classList.remove('hidden');
        if(artworkFallback) artworkFallback.classList.add('hidden');
      };
      testImg.onerror = ()=>{
        artwork.classList.add('hidden');
        if(artworkFallback) artworkFallback.classList.remove('hidden');
      };
      testImg.src = cover;
    }
  }

  // Update audio visual area
  updateAudioVisual(song);

  // Hide Spotify/YouTube specific UI
  if(saveSpotifyBtn){
    saveSpotifyBtn.classList.add('hidden');
    saveSpotifyBtn.style.display = 'none';
  }
  const spotifyCard = document.getElementById('spotifyCard');
  if(spotifyCard){
    spotifyCard.classList.add('hidden');
    spotifyCard.style.display = 'none';
  }
  if(spotifyTrackTitle) spotifyTrackTitle.textContent = song.title;
  if(spotifyTrackArtist) spotifyTrackArtist.textContent = getSinger(song) || 'Unknown artist';
  if(spotifyTrackAlbum) spotifyTrackAlbum.textContent = album + " • " + song.language;
  if(spotifyLang) spotifyLang.textContent = song.language + " • " + album;
  if(spotifyOpenLink){
    spotifyOpenLink.classList.add('hidden');
    spotifyOpenLink.style.display = 'none';
  }
  if(spotifyCardArtwork && cover) { spotifyCardArtwork.src = cover; spotifyCardArtwork.alt = song.title; }
  if(spotifyCardTitle) spotifyCardTitle.textContent = song.title;
  if(spotifyCardArtist) spotifyCardArtist.textContent = getSinger(song) || 'Unknown artist';
  if(spotifyCardDuration) spotifyCardDuration.textContent = song.duration || '03:30';

  // Reset progress
  if(totalTimeEl) totalTimeEl.textContent = song.duration || '—';
  if(currentTimeEl) currentTimeEl.textContent = '0:00';
  if(progressBar) progressBar.style.width='0%';
  if(spotifyCardProgressBar) spotifyCardProgressBar.style.width='0%';

  // Preview status
  const previewParent = previewStatus ? previewStatus.parentElement : null;
  if(previewParent){
    previewParent.classList.remove('hidden');
    previewParent.style.display = 'block';
  }
  if(previewStatus){
    previewStatus.style.display = 'block';
    previewStatus.classList.remove('hidden');
    // Will be updated after validation
  }

  console.log("Selected song:", song.title);
  console.log("Audio:", audioUrl(song));

  document.title = `${song.title} — Mr. Music Player`;

  updateFavUI();
  renderPlaylist();
  updateMediaSession();
  updatePlayButton();

  // Validate and handle audio existence
  if(!validateSong(song)){
    if(previewStatus){
      previewStatus.textContent = 'Audio unavailable';
      previewStatus.classList.remove('hidden');
    }
    showToast('Audio unavailable');
    isPlaying = false;
    updatePlayButton();
    return;
  }

  // Check if file exists via manifest validation (we do not actually fetch, just set src and handle error)
  if(previewStatus){
    previewStatus.textContent = 'Ready to play';
    previewStatus.classList.remove('hidden');
  }

  if(autoplay){
    // Use playSong for autoplay
    playSong(song);
  } else {
    // Preload metadata (resolved R2 URL)
    if(audio){
      audio.src = audioUrl(song);
      audio.load();
    }
  }
}

function playSong(song){
  if(!validateSong(song)){
    console.warn('Audio failed: Invalid song', song);
    if(previewStatus){
      previewStatus.textContent = 'Audio unavailable';
      previewStatus.classList.remove('hidden');
    }
    showToast('Audio unavailable');
    return;
  }
  // Ensure audio element exists
  if(!audio){
    console.error('Audio element not found');
    showToast('Audio unavailable');
    return;
  }
  // Update currentIndex to this song's index if not already
  const idx = songs.findIndex(s=>s.id===song.id);
  if(idx !== -1) currentIndex = idx;

  // Update UI
  const album = getAlbum(song);
  const film = getFilm(song);
  if(nowPlayingSub) nowPlayingSub.textContent = film ? `${song.language} • ${film}` : song.language;
  updateAudioVisual(song);
  updateFavUI();
  renderPlaylist();
  updateMediaSession();

  // Set source and play
  try {
    // Only change src if different to avoid reload
    const currentSrc = audio.getAttribute('src') || audio.src;
    // Compare decoded R2 URL
    const targetSrc = audioUrl(song);
    // If audio path is relative, browser will resolve to absolute, so we compare endsWith
    const shouldChange = !currentSrc || !currentSrc.endsWith(targetSrc) && currentSrc !== targetSrc;
    if(shouldChange){
      audio.src = audioUrl(song);
      audio.load();
    }
    const playPromise = audio.play();
    if(playPromise !== undefined){
      playPromise.then(()=>{
        isPlaying = true;
        updatePlayButton();
        if(previewStatus){
          previewStatus.textContent = 'Now Playing';
          previewStatus.classList.remove('hidden');
        }
        showToast('Playing: ' + song.title);
      }).catch(err=>{
        console.warn('Playback blocked', err);
        isPlaying = false;
        updatePlayButton();
        if(previewStatus){
          previewStatus.textContent = 'Click Play to start';
          previewStatus.classList.remove('hidden');
        }
        showToast('Click Play to start');
      });
    }
  } catch(e){
    console.warn('Audio failed:', e, 'Song:', song.title, 'Path:', audioUrl(song));
    if(previewStatus){
      previewStatus.textContent = 'Audio unavailable';
      previewStatus.classList.remove('hidden');
    }
    showToast('Audio unavailable');
    isPlaying = false;
    updatePlayButton();
  }
}

function play(){
  const song = songs[currentIndex];
  if(!validateSong(song)){
    if(previewStatus){
      previewStatus.textContent = songs.length===0 ? 'No songs available' : 'Audio unavailable';
      previewStatus.classList.remove('hidden');
    }
    showToast(songs.length===0 ? 'No songs available' : 'Audio unavailable');
    console.warn('Audio failed: Song:', song ? song.title : 'none', 'Path:', song ? audioUrl(song) : 'none');
    return;
  }
  if(audio){
    // If src not set or different, set it (compare resolved R2 URL)
    if(!audio.src || !audio.src.endsWith(audioUrl(song))){
      audio.src = audioUrl(song);
      audio.load();
    }
    audio.play().then(()=>{
      isPlaying = true;
      updatePlayButton();
      if(previewStatus){
        previewStatus.textContent = 'Now Playing';
        previewStatus.classList.remove('hidden');
      }
    }).catch(e=>{
      console.warn('Playback failed', e);
      if(previewStatus){
        previewStatus.textContent = 'Click Play to start';
        previewStatus.classList.remove('hidden');
      }
      showToast('Click Play to start');
    });
  }
}
function pause(){
  if(audio) audio.pause();
  isPlaying = false;
  updatePlayButton();
  if(previewStatus){
    previewStatus.textContent = 'Paused';
    previewStatus.classList.remove('hidden');
  }
}
function togglePlay(){
  if(isPlaying) pause(); else play();
}

function getFilteredList(){
  return filteredSongs();
}
function next(){
  const list = getFilteredList();
  if(list.length===0){
    showToast('No songs in list');
    return;
  }
  if(isShuffle){
    const currId = songs[currentIndex].id;
    let rand;
    let attempts = 0;
    do {
      rand = list[Math.floor(Math.random()*list.length)];
      attempts++;
      if(attempts > 10) break;
    } while(list.length>1 && rand.id===currId && shuffleHistory.includes(rand.id));
    shuffleHistory.push(rand.id);
    if(shuffleHistory.length > 20) shuffleHistory.shift();
    const idx = songs.findIndex(s=>s.id===rand.id);
    loadSong(idx, false);
    playSong(rand);
    return;
  }
  // Handle repeat ALL
  const currId = songs[currentIndex].id;
  let pos = list.findIndex(s=>s.id===currId);
  if(pos===-1) pos=0;
  else {
    if(pos === list.length -1){
      if(repeatMode === 1){ // ALL
        pos = 0;
      } else if(repeatMode === 0){ // OFF
        // stop after final
        isPlaying = false;
        updatePlayButton();
        showToast('End of playlist');
        return;
      }
    } else {
      pos=(pos+1)%list.length;
    }
  }
  // If repeat ALL and was at end, pos is 0, else next
  if(pos===-1) pos=0;
  // For OFF mode at end, we already returned
  const nextSong = list[pos];
  const idx = songs.findIndex(s=>s.id===nextSong.id);
  loadSong(idx, false);
  playSong(nextSong);
}
function prev(){
  // If current track played >3 seconds, restart
  if(audio && audio.currentTime > 3){
    audio.currentTime = 0;
    if(!isPlaying) play();
    return;
  }
  const list = getFilteredList();
  if(list.length===0){
    showToast('No songs in list');
    return;
  }
  const currId = songs[currentIndex].id;
  let pos = list.findIndex(s=>s.id===currId);
  if(pos===-1) pos=0;
  else pos=(pos-1+list.length)%list.length;
  const prevSong = list[pos];
  const idx = songs.findIndex(s=>s.id===prevSong.id);
  loadSong(idx, false);
  playSong(prevSong);
}

function updatePlayButton(){
  const song = songs[currentIndex];
  const canPlay = validateSong(song);
  if(playBtn){
    playBtn.disabled = !canPlay;
    playBtn.style.opacity = canPlay ? '1' : '0.55';
    playBtn.style.cursor = canPlay ? 'pointer' : 'not-allowed';
    if(isPlaying && canPlay){
      if(playIcon) playIcon.classList.add('hidden');
      if(pauseIcon) pauseIcon.classList.remove('hidden');
      playBtn.setAttribute('aria-label','Pause');
    } else {
      if(playIcon) playIcon.classList.remove('hidden');
      if(pauseIcon) pauseIcon.classList.add('hidden');
      playBtn.setAttribute('aria-label', canPlay ? 'Play' : 'Audio unavailable');
    }
  }
  if(isPlaying && canPlay){
    if(artwork) artwork.classList.add('playing');
    if(playingBadge) playingBadge.classList.add('show');
  } else {
    if(artwork) artwork.classList.remove('playing');
    if(playingBadge) playingBadge.classList.remove('show');
  }
  if(spotifyCardPlayBtn){
    spotifyCardPlayBtn.setAttribute('aria-label', isPlaying && canPlay ? 'Pause' : 'Play');
    spotifyCardPlayBtn.innerHTML = isPlaying && canPlay ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6zm8-14v14h4V5z"/></svg>' : '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v14l11-7z"/></svg>';
    spotifyCardPlayBtn.disabled = !canPlay;
    spotifyCardPlayBtn.style.opacity = canPlay ? '1' : '0.55';
  }
}
function updateFavUI(){
  const song = songs[currentIndex];
  if(!song) return;
  const fav = isFav(song.id);
  if(!favBtn) return;
  favBtn.classList.toggle('active', fav);
  favBtn.setAttribute('aria-label', fav ? 'Remove from favorites' : 'Add to favorites');
  favBtn.setAttribute('aria-pressed', String(fav));
}
function updateMediaSession(){
  if('mediaSession' in navigator){
    const s=songs[currentIndex];
    if(!s) return;
    try{
      navigator.mediaSession.metadata = new MediaMetadata({
        title: s.title, artist: getSinger(s) || 'Unknown artist', album: getFilm(s) || s.language,
        artwork: [{src: getCover(s), sizes:'512x512', type:'image/jpeg'}]
      });
    }catch{}
    try{
      navigator.mediaSession.setActionHandler('play', play);
      navigator.mediaSession.setActionHandler('pause', pause);
      navigator.mediaSession.setActionHandler('nexttrack', next);
      navigator.mediaSession.setActionHandler('previoustrack', prev);
      navigator.mediaSession.setActionHandler('seekto', (d)=>{
        if(d.seekTime!=null && audio) audio.currentTime=d.seekTime;
      });
    }catch{}
  }
}

function filteredSongs(){
  let list = songs.filter(s=>{
    const q=searchQuery.toLowerCase();
    if(!q) return true;
    const album = getAlbum(s).toLowerCase();
    const composer = getComposer(s).toLowerCase();
    const singer = getSinger(s).toLowerCase();
    const film = getFilm(s).toLowerCase();
    const year = String(getYear(s) || '').toLowerCase();
    return s.title.toLowerCase().includes(q) ||
           s.artist.toLowerCase().includes(q) ||
           singer.includes(q) ||
           film.includes(q) ||
           year.includes(q) ||
           album.toLowerCase().includes(q) ||
           composer.toLowerCase().includes(q) ||
           s.language.toLowerCase().includes(q);
  });
  if(filter==='favorites'){
    list = list.filter(s=> isFav(s.id));
  } else if(filter!=='all'){
    list = list.filter(s=> s.language.toLowerCase()===filter);
  }
  return list;
}

function renderPlaylist(){
  const list = filteredSongs();
  songListEl.innerHTML='';
  const isSearchEmpty = searchQuery && list.length===0;
  const isFavEmpty = filter==='favorites' && list.length===0 && !searchQuery;

  emptySearch.classList.toggle('hidden', !isSearchEmpty);
  emptyFav.classList.toggle('hidden', !isFavEmpty);
  songListEl.classList.toggle('hidden', list.length===0);

  const counts = {
    all: songs.length,
    tamil: songs.filter(s=>s.language==='Tamil').length,
    telugu: songs.filter(s=>s.language==='Telugu').length,
    english: songs.filter(s=>s.language==='English').length,
    malayalam: songs.filter(s=>s.language==='Malayalam').length,
  };
  const labelMap={all:'All Languages',tamil:'Tamil',telugu:'Telugu',english:'English',malayalam:'Malayalam',favorites:'Favorites'};
  if(filter==='favorites') playlistInfo.textContent = `${favorites.length} favorites`;
  else if(filter==='all') playlistInfo.textContent = `All Languages • ${songs.length} Songs`;
  else playlistInfo.textContent = `${labelMap[filter]} • ${counts[filter]} Songs`;
  if(searchQuery) playlistInfo.textContent += ` • ${list.length} results`;
  composerInfo.textContent = `• ${labelMap[filter] || ''}`;
  if(filter!=='all' && filter!=='favorites') composerInfo.textContent += ` • ${list.length} shown`;

  document.querySelectorAll('.tab').forEach(btn=>{
    const f=btn.dataset.filter;
    const active=f===filter;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', String(active));
  });

  list.forEach(song=>{
    const isActive = songs[currentIndex].id===song.id;
    const fav = isFav(song.id);
    const initials = getInitials(song.title);
    const cover = getCover(song);
    const film = getFilm(song);
    const sub = getDisplaySub(song);
    const canPlay = isValidAudioPath(song.audio);
    const el=document.createElement('div');
    el.className='song-item'+(isActive?' active':'');
    el.setAttribute('role','listitem');
    el.tabIndex=0;
    el.setAttribute('aria-label', `${song.title} — ${sub}${film ? ` — ${film}` : ''}`);
    el.innerHTML=`
      <div class="song-thumb-fallback" aria-hidden="true"><span>${initials}</span></div>
      <img class="song-thumb hidden" src="${cover || ''}" alt="" loading="lazy" style="${cover ? '' : 'display:none'}" />
      <div class="song-info">
        <div class="song-name">${escapeHtml(song.title)}</div>
        <div class="song-artist-sm">${escapeHtml(sub)}</div>
      </div>
      ${isActive && isPlaying && canPlay ? '<div class="playing-eq" aria-hidden="true"><i style="height:6px"></i><i style="height:12px"></i><i style="height:9px"></i></div>' : `<span class="song-duration">${escapeHtml(song.duration||'')}</span>`}
      <a href="${audioUrl(song)}" target="_blank" rel="noopener" class="song-spotify" aria-label="${canPlay ? 'Open audio' : 'Audio unavailable'}" onclick="event.stopPropagation(); if(!isValidAudioPath('${audioUrl(song)}')){event.preventDefault(); showToast('Audio unavailable'); return false;} // Let browser handle audio file play in new tab" title="${canPlay ? 'Open audio' : 'Audio unavailable'}" style="${canPlay ? 'background:rgba(124,92,255,0.14);border-color:rgba(124,92,255,0.25);color:#7c5cff' : 'opacity:0.5;'}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
      </a>
      <button class="song-fav ${fav?'active':''}" aria-label="${fav?'Remove from favorites':'Add to favorites'}" data-fav="${song.id}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${fav?'currentColor':'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2.08C10.5 3.5 9.5 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
      </button>
    `;
    const thumbImg = el.querySelector('.song-thumb');
    const thumbFallback = el.querySelector('.song-thumb-fallback');
    if(cover){
      const test = new Image();
      test.onload=()=>{ thumbImg.classList.remove('hidden'); thumbFallback.style.display='none'; thumbImg.src=cover; };
      test.onerror=()=>{ thumbImg.classList.add('hidden'); thumbFallback.style.display='grid'; };
      test.src=cover;
    } else {
      if(thumbImg) thumbImg.style.display='none';
      if(thumbFallback) thumbFallback.style.display='grid';
    }

    el.addEventListener('click', (e)=>{
      if(e.target.closest('.song-fav') || e.target.closest('.song-spotify')) return;
      const idx=songs.findIndex(x=>x.id===song.id);
      loadSong(idx, false);
      playSong(song);
    });
    el.addEventListener('keydown', (e)=>{
      if(e.key==='Enter' || e.key===' '){ e.preventDefault(); const idx=songs.findIndex(x=>x.id===song.id); loadSong(idx,false); playSong(songs[idx]); }
    });
    const favButton = el.querySelector('.song-fav');
    favButton.addEventListener('click', (e)=>{
      e.stopPropagation();
      toggleFav(song.id);
      favButton.classList.add('anim');
      setTimeout(()=>favButton.classList.remove('anim'),400);
    });
    songListEl.appendChild(el);
  });
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function updateProgress(){
  if(!audio) return;
  const pct = audio.duration ? (audio.currentTime/audio.duration)*100 : 0;
  if(progressBar) progressBar.style.width = pct + '%';
  if(progressWrap) progressWrap.setAttribute('aria-valuenow', Math.round(pct));
  if(currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
  const curSong = songs[currentIndex];
  const fallbackDur = curSong ? (curSong.duration||'—') : '—';
  if(totalTimeEl) totalTimeEl.textContent = isFinite(audio.duration) ? formatTime(audio.duration) : fallbackDur;
  const totalDur = isFinite(audio.duration) ? formatTime(audio.duration) : fallbackDur;
  if(spotifyCardProgressBar) spotifyCardProgressBar.style.width = pct + '%';
  if(spotifyCardDuration) spotifyCardDuration.textContent = totalDur;
}
function seekFromEvent(e){
  if(!audio || !audio.duration || !isFinite(audio.duration)) return;
  const rect=progressWrap.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const pct=Math.max(0,Math.min(1, x/rect.width));
  audio.currentTime = pct * audio.duration;
  progressBar.style.width = (pct*100)+'%';
}
function updateVolumeUI(){
  const vol = audio ? audio.volume : audioVolume;
  const isMuted = audio ? audio.muted : ytMuted;
  if(volPercent) volPercent.textContent = Math.round(vol*100)+'%';
  if(isMuted || vol===0){ if(volIcon) volIcon.classList.add('hidden'); if(muteIcon) muteIcon.classList.remove('hidden'); }
  else { if(volIcon) volIcon.classList.remove('hidden'); if(muteIcon) muteIcon.classList.add('hidden'); }
  if(volumeSlider) volumeSlider.value = Math.round(vol*100);
  localStorage.setItem('isai_volume', String(vol));
  localStorage.setItem('isai_muted', String(isMuted));
}

if(audio){
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('loadedmetadata', ()=>{
    const s=songs[currentIndex];
    if(s && isFinite(audio.duration)) s._dur = formatTime(audio.duration);
    renderPlaylist();
    updateProgress();
    updatePlayButton();
  });
  audio.addEventListener('durationchange', updateProgress);
  audio.addEventListener('ended', ()=>{
    if(repeatMode === 2){
      audio.currentTime=0;
      audio.play();
    } else if(repeatMode === 1){
      next();
    } else {
      // OFF: if not last, next, else stop
      const list = getFilteredList();
      const currId = songs[currentIndex].id;
      const pos = list.findIndex(s=>s.id===currId);
      if(pos === list.length -1){
        isPlaying=false;
        updatePlayButton();
        showToast('End of playlist');
      } else {
        next();
      }
    }
  });
  audio.addEventListener('play', ()=>{ isPlaying=true; updatePlayButton(); renderPlaylist(); if(playingBadge) playingBadge.classList.add('show'); if(artwork) artwork.classList.add('playing'); });
  audio.addEventListener('pause', ()=>{ isPlaying=false; updatePlayButton(); renderPlaylist(); if(playingBadge) playingBadge.classList.remove('show'); if(artwork) artwork.classList.remove('playing'); });
  audio.addEventListener('error', (e)=>{
    const song = songs[currentIndex];
    console.warn('Audio failed: Song:', song.title, 'Path:', audioUrl(song), e);
    if(previewStatus){
      previewStatus.textContent='Audio unavailable';
      previewStatus.classList.remove('hidden');
      previewStatus.style.display='block';
      const pp = previewStatus.parentElement;
      if(pp){ pp.classList.remove('hidden'); pp.style.display='block'; }
    }
    showToast('Audio unavailable');
    isPlaying=false;
    updatePlayButton();
    renderPlaylist();
  });
  audio.addEventListener('volumechange', updateVolumeUI);
}

// Controls
if(playBtn) playBtn.addEventListener('click', togglePlay);
if(nextBtn) nextBtn.addEventListener('click', next);
if(prevBtn) prevBtn.addEventListener('click', prev);
if(favBtn){
  favBtn.addEventListener('click', ()=>{
    const song=songs[currentIndex];
    toggleFav(song.id);
    favBtn.classList.add('anim');
    setTimeout(()=>favBtn.classList.remove('anim'),450);
  });
}
if(shuffleBtn){
  shuffleBtn.addEventListener('click', ()=>{
    isShuffle=!isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
    showToast(isShuffle?'Shuffle on':'Shuffle off');
    if(isShuffle) shuffleHistory = [];
  });
}
if(repeatBtn){
  repeatBtn.addEventListener('click', ()=>{
    repeatMode = (repeatMode + 1) % 3;
    repeatBtn.classList.toggle('active', repeatMode!==0);
    // Update icon/title based on mode
    if(repeatMode===0) repeatBtn.title = 'Repeat off';
    else if(repeatMode===1) repeatBtn.title = 'Repeat all';
    else repeatBtn.title = 'Repeat one';
    showToast(repeatMode===0?'Repeat off':repeatMode===1?'Repeat all':'Repeat one');
    // Visual cue
    if(repeatMode===2) repeatBtn.style.color = '#a78bfa';
    else if(repeatMode===1) repeatBtn.style.color = '#7c5cff';
    else repeatBtn.style.color = '';
  });
}
if(saveSpotifyBtn){
  saveSpotifyBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const song = songs[currentIndex];
    if(!isValidAudioPath(song.audio)){
      showToast('Audio unavailable');
      return;
    }
    // For R2 audio, this button is hidden; if visible, just show info
    showToast('Audio: ' + audioUrl(song));
  });
}
if(spotifyCardPlayBtn){
  spotifyCardPlayBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    togglePlay();
  });
}
if(spotifyOpenLink){
  spotifyOpenLink.addEventListener('click', (e)=>{
    e.preventDefault();
    const song = songs[currentIndex];
    if(!isValidAudioPath(song.audio)){
      showToast('Audio unavailable');
      return;
    }
    showToast('Local audio');
  });
}

if(progressWrap){
  progressWrap.addEventListener('click', seekFromEvent);
  progressWrap.addEventListener('mousedown', (e)=>{ isDragging=true; progressWrap.classList.add('dragging'); seekFromEvent(e); });
  window.addEventListener('mousemove', (e)=>{ if(isDragging) seekFromEvent(e); });
  window.addEventListener('mouseup', ()=>{ isDragging=false; progressWrap.classList.remove('dragging'); });
  progressWrap.addEventListener('touchstart', (e)=>{ isDragging=true; seekFromEvent(e); }, {passive:true});
  window.addEventListener('touchmove', (e)=>{ if(isDragging) seekFromEvent(e); }, {passive:true});
  window.addEventListener('touchend', ()=>{ isDragging=false; });
  progressWrap.addEventListener('keydown', (e)=>{
    if(!audio) return;
    if(e.key==='ArrowLeft' || e.key==='ArrowRight'){
      e.preventDefault();
      const step=5;
      if(e.key==='ArrowLeft') audio.currentTime=Math.max(0,audio.currentTime-step);
      else audio.currentTime=Math.min(audio.duration||0,audio.currentTime+step);
    }
    if(e.key==='Home') audio.currentTime=0;
    if(e.key==='End' && audio.duration) audio.currentTime=audio.duration;
  });
}

if(volumeSlider){
  volumeSlider.addEventListener('input', ()=>{
    const v=volumeSlider.value/100;
    if(audio){
      audio.volume=v;
      audio.muted=v===0;
      audioVolume=v;
    }
    updateVolumeUI();
  });
}
if(muteBtn){
  muteBtn.addEventListener('click', ()=>{
    if(audio) audio.muted=!audio.muted;
    ytMuted = audio ? audio.muted : !ytMuted;
    updateVolumeUI();
  });
}

document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filter=btn.dataset.filter;
    renderPlaylist();
  });
});

searchInput.addEventListener('input', ()=>{
  searchQuery=searchInput.value.trim();
  clearSearch.classList.toggle('hidden', !searchQuery);
  renderPlaylist();
});
clearSearch.addEventListener('click', ()=>{ searchInput.value=''; searchQuery=''; clearSearch.classList.add('hidden'); renderPlaylist(); searchInput.focus(); });

window.addEventListener('keydown', (e)=>{
  const tag=document.activeElement.tagName;
  const isInput = tag==='INPUT' || tag==='TEXTAREA' || document.activeElement.isContentEditable;
  if(isInput) { if(e.key==='Escape'){ document.activeElement.blur(); } return; }
  switch(e.key){
    case ' ': e.preventDefault(); togglePlay(); break;
    case 'ArrowRight': e.preventDefault(); if(audio && audio.duration) audio.currentTime=Math.min(audio.duration, audio.currentTime+5); break;
    case 'ArrowLeft': e.preventDefault(); if(audio) audio.currentTime=Math.max(0, audio.currentTime-5); break;
    case 'ArrowUp': e.preventDefault(); if(audio){ audio.volume=Math.min(1, audio.volume+0.05); volumeSlider.value=Math.round(audio.volume*100); updateVolumeUI(); } break;
    case 'ArrowDown': e.preventDefault(); if(audio){ audio.volume=Math.max(0, audio.volume-0.05); volumeSlider.value=Math.round(audio.volume*100); updateVolumeUI(); } break;
  }
});

// Unhide legacy controls as single row — preserve layout, no duplicate controls
(function unhideLegacyControls(){
  const hiddenControls = document.querySelector('div.hidden[aria-hidden="true"]');
  if(!hiddenControls) return;
  // Check if already visible
  if(hiddenControls.style.display === 'flex') return;
  const playerCard = document.querySelector('.player-card');
  if(!playerCard) return;
  // Make hidden controls visible as single row
  hiddenControls.classList.remove('hidden');
  hiddenControls.removeAttribute('aria-hidden');
  hiddenControls.style.display = 'flex';
  hiddenControls.style.flexDirection = 'column';
  hiddenControls.style.gap = '12px';
  hiddenControls.style.marginTop = '8px';
  // Ensure progressWrap visible
  if(progressWrap) {
    progressWrap.style.display = 'block';
    progressWrap.style.height = '6px';
  }
  if(currentTimeEl) currentTimeEl.style.display = 'block';
  if(totalTimeEl) totalTimeEl.style.display = 'block';
  // Style controls row
  const controlsRow = document.createElement('div');
  // Check if controls already exist inside hiddenControls
  let hasControls = hiddenControls.querySelector('.controls');
  if(!hasControls){
    controlsRow.className = 'controls';
    controlsRow.style.display = 'flex';
    controlsRow.style.alignItems = 'center';
    controlsRow.style.justifyContent = 'center';
    controlsRow.style.gap = '12px';
    const shuffle = document.getElementById('shuffleBtn');
    const prev = document.getElementById('prevBtn');
    const play = document.getElementById('playBtn');
    const next = document.getElementById('nextBtn');
    const repeat = document.getElementById('repeatBtn');
    if(shuffle) { shuffle.classList.add('ctrl-btn','small'); if(!shuffle.innerHTML.trim()) shuffle.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>'; }
    if(prev) { prev.classList.add('ctrl-btn','small'); if(!prev.innerHTML.trim()) prev.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6z"/></svg>'; }
    if(play) { play.classList.add('play-btn'); play.style.display = 'grid'; }
    if(next) { next.classList.add('ctrl-btn','small'); if(!next.innerHTML.trim()) next.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6v12l8.5-6-8.5-6zM11 18l-8.5-6 8.5-6z"/></svg>'; }
    if(repeat) { repeat.classList.add('ctrl-btn','small'); if(!repeat.innerHTML.trim()) repeat.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>'; }
    // Re-append in order
    if(shuffle) controlsRow.appendChild(shuffle);
    if(prev) controlsRow.appendChild(prev);
    if(play) controlsRow.appendChild(play);
    if(next) controlsRow.appendChild(next);
    if(repeat) controlsRow.appendChild(repeat);
    // Find where to insert controlsRow - after progress
    const progWrap = document.getElementById('progressWrap');
    if(progWrap && progWrap.parentNode === hiddenControls){
      // progWrap is direct child, insert controlsRow after it and time row
      // Find time row (contains currentTime)
      let timeRow = null;
      for(const child of hiddenControls.children){
        if(child.contains(currentTimeEl)) timeRow = child;
      }
      if(timeRow) timeRow.after(controlsRow);
      else hiddenControls.appendChild(controlsRow);
    } else {
      hiddenControls.appendChild(controlsRow);
    }
  }
  // Volume row
  let volRow = hiddenControls.querySelector('.volume-row');
  if(!volRow){
    volRow = document.createElement('div');
    volRow.className = 'volume-row';
    const mute = document.getElementById('muteBtn');
    const volSliderEl = document.getElementById('volumeSlider');
    const volPct = document.getElementById('volPercent');
    if(mute){
      mute.classList.add('mute-btn');
      if(!mute.innerHTML.trim()) mute.innerHTML = '<svg id="volIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg><svg id="muteIcon" class="hidden" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
      volRow.appendChild(mute);
    }
    if(volSliderEl){
      const wrap = document.createElement('div');
      wrap.className = 'volume-slider-wrap';
      wrap.style.flex = '1';
      volSliderEl.style.width = '100%';
      wrap.appendChild(volSliderEl);
      volRow.appendChild(wrap);
    }
    if(volPct) volRow.appendChild(volPct);
    hiddenControls.appendChild(volRow);
  }
  // Ensure playerCard contains controls
  if(!playerCard.contains(hiddenControls)){
    // Find leftMeta and insert controls before it
    const leftMeta = document.getElementById('leftMeta');
    if(leftMeta) leftMeta.before(hiddenControls);
    else playerCard.appendChild(hiddenControls);
  }
  hiddenControls.style.display = 'flex';
})();

// Init
if(audio){
  audio.volume = audioVolume;
  const isMutedStored = localStorage.getItem('isai_muted') === 'true';
  audio.muted = isMutedStored;
  ytMuted = isMutedStored;
}
if(volumeSlider) volumeSlider.value = Math.round((audio ? audio.volume : audioVolume)*100);
updateVolumeUI();
updateCounts();
loadSong(0, false);
renderPlaylist();
updateFavUI();
updatePlayButton();
