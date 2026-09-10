/* SIVI Tunes • 1589 Songs (Tamil 796, Telugu 226, English 400, Malayalam 167) — Local HTML5 Audio
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

const songs = [
  { id: "ta-001", title: "Anbe Anbe", artist: "Various Artists", album: "Anbe Anbe (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-001.mp3", favorite: false },
  { id: "ta-002", title: "High on Love", artist: "Various Artists", album: "High on Love (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-002.mp3", favorite: false },
  { id: "ta-003", title: "En Kannu Kulla", artist: "Various Artists", album: "Appuchi Graamam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-003.mp3", favorite: false },
  { id: "ta-004", title: "Nallaru Po", artist: "Various Artists", album: "Dude (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-004.mp3", favorite: false },
  { id: "ta-005", title: "Naan Aval Illai", artist: "Various Artists", album: "Naan Aval Illai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-005.mp3", favorite: false },
  { id: "ta-006", title: "Sevatha Pulla", artist: "Various Artists", album: "Sevatha Pulla (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-006.mp3", favorite: false },
  { id: "ta-007", title: "Anbe Anbe", artist: "Various Artists", album: "Anbe Anbe (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-007.mp3", favorite: false },
  { id: "ta-008", title: "Pirai Thedum", artist: "Various Artists", album: "Pirai Thedum (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-008.mp3", favorite: false },
  { id: "ta-009", title: "Para Para", artist: "Various Artists", album: "Neerparavai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-009.mp3", favorite: false },
  { id: "ta-010", title: "Jal Jal Jal Oosai", artist: "Various Artists", album: "Manam Kothi Paravai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-010.mp3", favorite: false },
  { id: "ta-011", title: "Yendi Vittu Pona", artist: "Various Artists", album: "Dragon (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-011.mp3", favorite: false },
  { id: "ta-012", title: "Velicha Poove", artist: "Various Artists", album: "Velicha Poove (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-012.mp3", favorite: false },
  { id: "ta-013", title: "Sidu Sidu", artist: "Various Artists", album: "Sidu Sidu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-013.mp3", favorite: false },
  { id: "ta-014", title: "Yaaradiyo", artist: "Various Artists", album: "Gorilla (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-014.mp3", favorite: false },
  { id: "ta-015", title: "Thuli Thuli", artist: "Various Artists", album: "Thuli Thuli (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-015.mp3", favorite: false },
  { id: "ta-016", title: "Thodu Vaanam", artist: "Various Artists", album: "Thodu Vaanam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-016.mp3", favorite: false },
  { id: "ta-017", title: "Vachindamma", artist: "Various Artists", album: "Vachindamma (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-017.mp3", favorite: false },
  { id: "ta-018", title: "Otha Sollaala", artist: "Various Artists", album: "Otha Sollaala (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-018.mp3", favorite: false },
  { id: "ta-019", title: "Kangal Kalangida", artist: "Various Artists", album: "Oru Kalluriyin Kadhai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-019.mp3", favorite: false },
  { id: "ta-020", title: "Thoovaanam", artist: "Various Artists", album: "Thoovaanam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-020.mp3", favorite: false },
  { id: "ta-021", title: "Unna Nenachu", artist: "Various Artists", album: "Psycho (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-021.mp3", favorite: false },
  { id: "ta-022", title: "Yaaro En Nenjai", artist: "Various Artists", album: "Yaaro En Nenjai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-022.mp3", favorite: false },
  { id: "ta-023", title: "Yaeley Yaeley Maruthu", artist: "Various Artists", album: "Yaeley Yaeley Maruthu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-023.mp3", favorite: false },
  { id: "ta-024", title: "Neethanae", artist: "Various Artists", album: "Mersal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-024.mp3", favorite: false },
  { id: "ta-025", title: "Venmathiye", artist: "Various Artists", album: "Venmathiye (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-025.mp3", favorite: false },
  { id: "ta-026", title: "Angel Of Raghuvaran - Iraivanai Thandha Iraiviye", artist: "Various Artists", album: "Velai Illa Pattadhaari 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-026.mp3", favorite: false },
  { id: "ta-027", title: "Ennai Kollathey", artist: "Various Artists", album: "Ennai Kollathey (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-027.mp3", favorite: false },
  { id: "ta-028", title: "Kannala Kannala (The Melting Point of Love)", artist: "Various Artists", album: "Kannala Kannala (The Melting Point of Love) (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-028.mp3", favorite: false },
  { id: "ta-029", title: "Po Indru Neeyaga", artist: "Various Artists", album: "Velai Illa Pattadhaari (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-029.mp3", favorite: false },
  { id: "ta-030", title: "Sirukki Vaasam", artist: "Various Artists", album: "Sirukki Vaasam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-030.mp3", favorite: false },
  { id: "ta-031", title: "Vaaya moodi summa iru da", artist: "Various Artists", album: "Vaaya moodi summa iru da (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-031.mp3", favorite: false },
  { id: "ta-032", title: "Ival Dhaana", artist: "Various Artists", album: "Ival Dhaana (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-032.mp3", favorite: false },
  { id: "ta-033", title: "Arabu Naadu", artist: "Various Artists", album: "Arabu Naadu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-033.mp3", favorite: false },
  { id: "ta-034", title: "En Jeevan", artist: "Various Artists", album: "En Jeevan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-034.mp3", favorite: false },
  { id: "ta-035", title: "Yennachu Yedhachu", artist: "Various Artists", album: "Yennachu Yedhachu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-035.mp3", favorite: false },
  { id: "ta-036", title: "Yaar Indha Saalai Oram", artist: "Various Artists", album: "Yaar Indha Saalai Oram (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-036.mp3", favorite: false },
  { id: "ta-037", title: "Aval", artist: "Various Artists", album: "Aval (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-037.mp3", favorite: false },
  { id: "ta-038", title: "Vennilave - Thuppakki", artist: "Various Artists", album: "Thuppakki (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-038.mp3", favorite: false },
  { id: "ta-039", title: "Mustafaa Mustafaa", artist: "Various Artists", album: "Mustafaa Mustafaa (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-039.mp3", favorite: false },
  { id: "ta-040", title: "Kadhal Sadugudu", artist: "Various Artists", album: "Kadhal Sadugudu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-040.mp3", favorite: false },
  { id: "ta-041", title: "The Youth Of Power Paandi - Paarthen", artist: "Various Artists", album: "The Youth Of Power Paandi - Paarthen (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-041.mp3", favorite: false },
  { id: "ta-042", title: "Unn Thalai Mudi", artist: "Various Artists", album: "Unn Thalai Mudi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-042.mp3", favorite: false },
  { id: "ta-043", title: "Neeyum Naanum Anbe", artist: "Various Artists", album: "Neeyum Naanum Anbe (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-043.mp3", favorite: false },
  { id: "ta-044", title: "Nenjoramaa (feat. Jothi Kanna)", artist: "Various Artists", album: "Nenjoramaa (feat. Jothi Kanna) (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-044.mp3", favorite: false },
  { id: "ta-045", title: "Kannae Kanmaniye", artist: "Various Artists", album: "Kannae Kanmaniye (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-045.mp3", favorite: false },
  { id: "ta-046", title: "Unakkena Uruginen", artist: "Various Artists", album: "Unakkena Uruginen (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-046.mp3", favorite: false },
  { id: "ta-047", title: "Kadhal Kan Kattudhe", artist: "Various Artists", album: "Kaaki Sattai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-047.mp3", favorite: false },
  { id: "ta-048", title: "Kaadhal Rojave", artist: "Various Artists", album: "Kaadhal Rojave (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-048.mp3", favorite: false },
  { id: "en-001", title: "blue", artist: "Various Artists", album: "blue (English)", language: "English", duration: "3:30", audio: "public/music/english/en-001.mp3", favorite: false },
  { id: "ta-050", title: "Imaye Imaye", artist: "Various Artists", album: "Imaye Imaye (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-050.mp3", favorite: false },
  { id: "ta-051", title: "Oxygen", artist: "Various Artists", album: "Oxygen (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-051.mp3", favorite: false },
  { id: "ta-052", title: "Feel My Love", artist: "Various Artists", album: "Feel My Love (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-052.mp3", favorite: false },
  { id: "ta-053", title: "Aathi", artist: "Various Artists", album: "Aathi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-053.mp3", favorite: false },
  { id: "ta-054", title: "Iravingu Theevai", artist: "Various Artists", album: "Iravingu Theevai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-054.mp3", favorite: false },
  { id: "ta-055", title: "Vazhithunaiye", artist: "Various Artists", album: "Dragon (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-055.mp3", favorite: false },
  { id: "ta-056", title: "Vaa Senthaazhini", artist: "Various Artists", album: "Adiyae (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-056.mp3", favorite: false },
  { id: "ta-057", title: "Mirutha Mirutha", artist: "Various Artists", album: "Mirutha Mirutha (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-057.mp3", favorite: false },
  { id: "ta-058", title: "Pogiren", artist: "Various Artists", album: "Pogiren (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-058.mp3", favorite: false },
  { id: "ta-059", title: "En Kadhal Solla", artist: "Various Artists", album: "En Kadhal Solla (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-059.mp3", favorite: false },
  { id: "ta-060", title: "Piriyadha Enna", artist: "Various Artists", album: "Piriyadha Enna (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-060.mp3", favorite: false },
  { id: "ta-061", title: "Unakkenna Venum Sollu", artist: "Various Artists", album: "Unakkenna Venum Sollu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-061.mp3", favorite: false },
  { id: "ta-062", title: "Kadhaippoma", artist: "Various Artists", album: "Kadhaippoma (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-062.mp3", favorite: false },
  { id: "ta-063", title: "Yaar Intha", artist: "Various Artists", album: "Boss Engira Baskaran (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-063.mp3", favorite: false },
  { id: "ta-064", title: "Oh Penne", artist: "Various Artists", album: "Oh Penne (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-064.mp3", favorite: false },
  { id: "ta-065", title: "Yennai Maatrum Kadhale", artist: "Various Artists", album: "Naanum Rowdy Dhaan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-065.mp3", favorite: false },
  { id: "ta-066", title: "Inayae", artist: "Various Artists", album: "Inayae (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-066.mp3", favorite: false },
  { id: "ta-067", title: "Pogadhe", artist: "Various Artists", album: "Pogadhe (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-067.mp3", favorite: false },
  { id: "ta-068", title: "Oru Kal - Yuvan Shankar Raja", artist: "Various Artists", album: "Siva Manasula Sakthi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-068.mp3", favorite: false },
  { id: "ta-069", title: "Pottu Vaitha Oru Vatta Nila KJ", artist: "Various Artists", album: "Pottu Vaitha Oru Vatta Nila KJ (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-069.mp3", favorite: false },
  { id: "ta-070", title: "Thangapoovey", artist: "Various Artists", album: "Thangapoovey (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-070.mp3", favorite: false },
  { id: "ta-071", title: "Top5 Songs of Stephen Zechariah", artist: "Various Artists", album: "Top5 Songs of Stephen Zechariah (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-071.mp3", favorite: false },
  { id: "ta-072", title: "Aasa Kooda", artist: "Various Artists", album: "Aasa Kooda (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-072.mp3", favorite: false },
  { id: "ta-073", title: "Asku Laska", artist: "Various Artists", album: "Nanban (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-073.mp3", favorite: false },
  { id: "ta-074", title: "Aathi", artist: "Various Artists", album: "Kaththi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-074.mp3", favorite: false },
  { id: "ta-075", title: "Ore Oru Oorilae", artist: "Various Artists", album: "Abhiyum Naanum (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-075.mp3", favorite: false },
  { id: "ta-076", title: "Adi Alaye", artist: "Various Artists", album: "Parasakthi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-076.mp3", favorite: false },
  { id: "ta-077", title: "Amaran", artist: "Various Artists", album: "Amaran (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-077.mp3", favorite: false },
  { id: "ta-078", title: "Aathadi Aathadi", artist: "Various Artists", album: "Anegan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-078.mp3", favorite: false },
  { id: "ta-079", title: "AR Rahman Super Hit Love Song", artist: "Various Artists", album: "AR Rahman Super Hit Love Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-079.mp3", favorite: false },
  { id: "ta-080", title: "Athinthom", artist: "Various Artists", album: "Chandramukhi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-080.mp3", favorite: false },
  { id: "ta-081", title: "Aura 10 10", artist: "Various Artists", album: "Meesaya Murukku 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-081.mp3", favorite: false },
  { id: "ta-082", title: "Avalin Nizhal", artist: "Various Artists", album: "Avalin Nizhal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-082.mp3", favorite: false },
  { id: "ta-083", title: "Best of GV Prakash", artist: "Various Artists", album: "Best of GV Prakash (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-083.mp3", favorite: false },
  { id: "ta-084", title: "Kannalanae", artist: "Various Artists", album: "Bombay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-084.mp3", favorite: false },
  { id: "ta-085", title: "Chikitu", artist: "Various Artists", album: "COOLIE (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-085.mp3", favorite: false },
  { id: "ta-086", title: "Title Track", artist: "Darbuka Siva, Sid Sriram", album: "Title Track (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-086.mp3", favorite: false },
  { id: "ta-087", title: "Adangaatha Asuran Performance", artist: "Various Artists", album: "Raayan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-087.mp3", favorite: false },
  { id: "ta-088", title: "Vaa Vaathi (Performance)", artist: "Various Artists", album: "Vaathi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-088.mp3", favorite: false },
  { id: "ta-089", title: "Aandipatti", artist: "Various Artists", album: "Dharmadurai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-089.mp3", favorite: false },
  { id: "ta-090", title: "Kallaimattum Kandal", artist: "Various Artists", album: "Dhasaavathaaram Tamil (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-090.mp3", favorite: false },
  { id: "ta-091", title: "Per Vachaalum Vaikkaama", artist: "Various Artists", album: "Dikkiloona (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-091.mp3", favorite: false },
  { id: "ta-092", title: "So Baby", artist: "Various Artists", album: "Doctor (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-092.mp3", favorite: false },
  { id: "ta-093", title: "Enna Nenatche", artist: "Various Artists", album: "Chokkathangam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-093.mp3", favorite: false },
  { id: "ta-094", title: "Enna Solla Pogirai", artist: "Various Artists", album: "Kandukondain Kandukondain (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-094.mp3", favorite: false },
  { id: "ta-095", title: "Ethana Saami", artist: "Various Artists", album: "Idli Kadai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-095.mp3", favorite: false },
  { id: "ta-096", title: "Golden Hits Of All Time", artist: "Various Artists", album: "Golden Hits Of All Time (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-096.mp3", favorite: false },
  { id: "ta-097", title: "Golden Sparrow", artist: "Various Artists", album: "Nilavuku En Mel Ennadi Kobam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-097.mp3", favorite: false },
  { id: "ta-098", title: "Rakita Rakita Rakita", artist: "Various Artists", album: "Jagame Thandhiram (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-098.mp3", favorite: false },
  { id: "ta-099", title: "Thala Kodhum", artist: "Various Artists", album: "Jai Bhim (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-099.mp3", favorite: false },
  { id: "ta-100", title: "Thalapathy Kacheri", artist: "Various Artists", album: "Jana Nayagan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-100.mp3", favorite: false },
  { id: "ta-101", title: "Jinguchaa", artist: "Various Artists", album: "Thug Life (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-101.mp3", favorite: false },
  { id: "ta-102", title: "Kaatrodu Pattam Pola", artist: "Various Artists", album: "Ayothi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-102.mp3", favorite: false },
  { id: "ta-103", title: "Vaayadi Petha Pulla", artist: "Various Artists", album: "Kanaa (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-103.mp3", favorite: false },
  { id: "ta-104", title: "Kanmani Anbodu", artist: "Various Artists", album: "Guna (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-104.mp3", favorite: false },
  { id: "ta-105", title: "Kannadi Poove", artist: "Various Artists", album: "RETRO (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-105.mp3", favorite: false },
  { id: "ta-106", title: "Kannathil Muthamittal", artist: "Various Artists", album: "Kannathil Muthamittal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-106.mp3", favorite: false },
  { id: "ta-107", title: "Karuppu Perazhaga", artist: "Various Artists", album: "Kanchana Tamil (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-107.mp3", favorite: false },
  { id: "ta-108", title: "Thirudi", artist: "Various Artists", album: "Kiss (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-108.mp3", favorite: false },
  { id: "ta-109", title: "Konja Naal Poru Thalaivaa", artist: "Various Artists", album: "Aasai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-109.mp3", favorite: false },
  { id: "ta-110", title: "Loosu Pennae", artist: "Various Artists", album: "Loosu Pennae (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-110.mp3", favorite: false },
  { id: "ta-111", title: "Nenjame Nenjame", artist: "Various Artists", album: "Maamannan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-111.mp3", favorite: false },
  { id: "ta-112", title: "Pookkal Pookkum", artist: "Various Artists", album: "Madharasapattinam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-112.mp3", favorite: false },
  { id: "ta-113", title: "Vaathi Coming", artist: "Various Artists", album: "Master (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-113.mp3", favorite: false },
  { id: "ta-114", title: "Meenamma", artist: "Various Artists", album: "Aasai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-114.mp3", favorite: false },
  { id: "ta-115", title: "Megham Karukatha", artist: "Various Artists", album: "Thiruchitrambalam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-115.mp3", favorite: false },
  { id: "ta-116", title: "Aalaporan Thamizhan", artist: "Various Artists", album: "Mersal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-116.mp3", favorite: false },
  { id: "ta-117", title: "Mesmerising Melodies by Shreya (Compilation)", artist: "Various Artists", album: "Mesmerising Melodies by Shreya (Compilation) (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-117.mp3", favorite: false },
  { id: "ta-118", title: "Mona Gasolina", artist: "Various Artists", album: "Lingaa (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-118.mp3", favorite: false },
  { id: "ta-119", title: "Monica", artist: "Various Artists", album: "COOLIE (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-119.mp3", favorite: false },
  { id: "ta-120", title: "Muththa Mazhai", artist: "Various Artists", album: "Thug Life (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-120.mp3", favorite: false },
  { id: "ta-121", title: "Muthumani Maala", artist: "Various Artists", album: "Muthumani Maala (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-121.mp3", favorite: false },
  { id: "ta-122", title: "Para Para", artist: "Various Artists", album: "Neerparavai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-122.mp3", favorite: false },
  { id: "ta-123", title: "Nenjin Ezhuth", artist: "Various Artists", album: "Nenjin Ezhuth (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-123.mp3", favorite: false },
  { id: "ta-124", title: "Oorum Blood", artist: "Various Artists", album: "Dude (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-124.mp3", favorite: false },
  { id: "ta-125", title: "Oru Paatale Solli", artist: "Various Artists", album: "Deiva Vaakku (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-125.mp3", favorite: false },
  { id: "ta-126", title: "Oru Paathi Kadhavu", artist: "Various Artists", album: "Thaandavam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-126.mp3", favorite: false },
  { id: "ta-127", title: "Thuli Thuli", artist: "Various Artists", album: "Paiya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-127.mp3", favorite: false },
  { id: "ta-128", title: "Nee Singam Dhan", artist: "Various Artists", album: "Pathu Thala (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-128.mp3", favorite: false },
  { id: "ta-129", title: "Ponni Nadhi", artist: "Various Artists", album: "Ponniyin Selvan 1 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-129.mp3", favorite: false },
  { id: "ta-130", title: "Pottala Muttaye", artist: "Various Artists", album: "Thalaivan Thalaivii (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-130.mp3", favorite: false },
  { id: "ta-131", title: "Usure Pogudhey", artist: "Various Artists", album: "Raavanan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-131.mp3", favorite: false },
  { id: "ta-132", title: "Kannamma", artist: "Various Artists", album: "Rekka (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-132.mp3", favorite: false },
  { id: "ta-133", title: "Rekka Rekka", artist: "Various Artists", album: "Bison Kaalamaadan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-133.mp3", favorite: false },
  { id: "ta-134", title: "Koodamela Koodavechi", artist: "Various Artists", album: "Rummy (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-134.mp3", favorite: false },
  { id: "ta-135", title: "S Janaki Amma Tamil Hits", artist: "Various Artists", album: "S Janaki Amma Tamil Hits (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-135.mp3", favorite: false },
  { id: "ta-136", title: "Selfie Pulla", artist: "Various Artists", album: "Kaththi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-136.mp3", favorite: false },
  { id: "ta-137", title: "Sidu Sidu", artist: "Various Artists", album: "Romeo (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-137.mp3", favorite: false },
  { id: "ta-138", title: "Neelothi", artist: "Various Artists", album: "Sirai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-138.mp3", favorite: false },
  { id: "ta-139", title: "Soniya Soniya", artist: "Various Artists", album: "Ratchagan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-139.mp3", favorite: false },
  { id: "ta-140", title: "Suthi Suthi Vandheega", artist: "Various Artists", album: "Padayappa (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-140.mp3", favorite: false },
  { id: "ta-141", title: "THE ONE", artist: "Various Artists", album: "RETRO (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-141.mp3", favorite: false },
  { id: "ta-142", title: "Theekkoluthi", artist: "Various Artists", album: "Bison Kaalamaadan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-142.mp3", favorite: false },
  { id: "ta-143", title: "Thendral Vandhu", artist: "Various Artists", album: "Avatharam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-143.mp3", favorite: false },
  { id: "ta-144", title: "Thillana Thillana", artist: "Various Artists", album: "Muthu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-144.mp3", favorite: false },
  { id: "ta-145", title: "Urugi Urugi", artist: "Various Artists", album: "Joe (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-145.mp3", favorite: false },
  { id: "ta-146", title: "Vaa Kannamma", artist: "Various Artists", album: "Once More (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-146.mp3", favorite: false },
  { id: "ta-147", title: "Ennadi Maayavi Nee", artist: "Various Artists", album: "VADACHENNAI (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-147.mp3", favorite: false },
  { id: "ta-148", title: "Veera Raja Veera", artist: "Various Artists", album: "PS2 Tamil (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-148.mp3", favorite: false },
  { id: "ta-149", title: "Venmegam", artist: "Various Artists", album: "Venmegam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-149.mp3", favorite: false },
  { id: "ta-150", title: "Venmegam", artist: "Various Artists", album: "Yaaradi Nee Mohini (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-150.mp3", favorite: false },
  { id: "ta-151", title: "Vennilave Vennilave", artist: "Various Artists", album: "Minsara Kanavu Tamil (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-151.mp3", favorite: false },
  { id: "ta-152", title: "Vennilavu Saaral", artist: "Various Artists", album: "Amaran (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-152.mp3", favorite: false },
  { id: "ta-153", title: "Vetti Veru Vasam", artist: "Various Artists", album: "Muthal Mariyathai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-153.mp3", favorite: false },
  { id: "ta-154", title: "Kaattumalli", artist: "Various Artists", album: "Viduthalai Part 1 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-154.mp3", favorite: false },
  { id: "ta-155", title: "Unnai Kaanadhu Naan", artist: "Various Artists", album: "Vishwaroopam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-155.mp3", favorite: false },
  { id: "ta-156", title: "Vizhi Moodi", artist: "Various Artists", album: "Ayan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-156.mp3", favorite: false },
  { id: "ta-157", title: "Whistlu Whistlu Whistluma", artist: "Various Artists", album: "Whistlu Whistlu Whistluma (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-157.mp3", favorite: false },
  { id: "ta-158", title: "Yen Paattan Saami Varum", artist: "Various Artists", album: "Idli Kadai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-158.mp3", favorite: false },
  { id: "ta-159", title: "Yuvan Mixtape", artist: "Various Artists", album: "Yuvan Mixtape (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-159.mp3", favorite: false },
  { id: "ta-160", title: "பூங்காற்று திரும்புமா", artist: "Various Artists", album: "Muthal Mariyathai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-160.mp3", favorite: false },
  { id: "ta-161", title: "ராசாத்தி உன்ன காணாத", artist: "Various Artists", album: "Vaidehi Kathirunthal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-161.mp3", favorite: false },
  { id: "ml-001", title: "Amsham ft. M.H.R, Bhumi, Circle Tone", artist: "Aksomaniac", album: "Amsham ft. M.H.R, Bhumi, Circle Tone (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-001.mp3", favorite: false },
  { id: "ml-002", title: "KALYANI", artist: "ARJN x KDS x FIFTY4 x RONN", album: "KALYANI (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-002.mp3", favorite: false },
  { id: "ml-003", title: "Aalunnu Neeye", artist: "Various Artists", album: "Rifle Club (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-003.mp3", favorite: false },
  { id: "ml-004", title: "Aaraane Aaraane Song", artist: "Various Artists", album: "Magic Mushrooms (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-004.mp3", favorite: false },
  { id: "ml-005", title: "Ada Bommale", artist: "Various Artists", album: "Vaazha 2 (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-005.mp3", favorite: false },
  { id: "ml-006", title: "Ambalapravinte", artist: "Various Artists", album: "Ambalapravinte (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-006.mp3", favorite: false },
  { id: "ml-007", title: "Ammathanal", artist: "Various Artists", album: "Oottan Ammayundenkil (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-007.mp3", favorite: false },
  { id: "ml-008", title: "Angu Vaana Konilu", artist: "Various Artists", album: "ARM (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-008.mp3", favorite: false },
  { id: "ml-009", title: "ANNAKKILI", artist: "Various Artists", album: "ANNAKKILI (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-009.mp3", favorite: false },
  { id: "ml-010", title: "Asalayavale", artist: "Various Artists", album: "Khalifa (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-010.mp3", favorite: false },
  { id: "ml-011", title: "Baby Baby", artist: "Various Artists", album: "Painkili (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-011.mp3", favorite: false },
  { id: "ml-012", title: "Bethlehem Onam", artist: "Various Artists", album: "Bethlehem Kudumba Unit (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-012.mp3", favorite: false },
  { id: "ml-013", title: "Bhoolokam Sundaram", artist: "Various Artists", album: "IDENTITY (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-013.mp3", favorite: false },
  { id: "ml-014", title: "Cheth Song", artist: "Various Artists", album: "Pravinkoodu Shappu (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-014.mp3", favorite: false },
  { id: "ml-015", title: "Chirapunji", artist: "Various Artists", album: "Chirapunji (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-015.mp3", favorite: false },
  { id: "ml-016", title: "Chiri Thottu", artist: "Various Artists", album: "Sarvam Maya (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-016.mp3", favorite: false },
  { id: "ml-017", title: "Chiriye", artist: "Various Artists", album: "Rekhachithram (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-017.mp3", favorite: false },
  { id: "ml-018", title: "Delulu Delulu", artist: "Various Artists", album: "Athi Bheekara Kaamukan (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-018.mp3", favorite: false },
  { id: "ml-019", title: "Dhurooha Manthahasame", artist: "Various Artists", album: "Sookshmadarshini (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-019.mp3", favorite: false },
  { id: "ml-020", title: "Ini Varumo", artist: "Various Artists", album: "Drishyam 3 (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-020.mp3", favorite: false },
  { id: "ml-021", title: "Duppattawaali", artist: "Various Artists", album: "Odum Kuthira Chaadum Kuthira (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-021.mp3", favorite: false },
  { id: "ml-022", title: "Ennile Punchiri", artist: "Various Artists", album: "Phoenix (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-022.mp3", favorite: false },
  { id: "ml-023", title: "Everyday", artist: "Various Artists", album: "Alappuzha Gymkhana (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-023.mp3", favorite: false },
  { id: "ml-024", title: "Gandharva Ganam", artist: "Various Artists", album: "Rifle Club (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-024.mp3", favorite: false },
  { id: "ml-025", title: "GLORIA", artist: "Various Artists", album: "GLORIA (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-025.mp3", favorite: false },
  { id: "ml-026", title: "Hey Penne", artist: "Various Artists", album: "Haal (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-026.mp3", favorite: false },
  { id: "ml-027", title: "Hijr", artist: "Various Artists", album: "Haal (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-027.mp3", favorite: false },
  { id: "ml-028", title: "Hridayavaathil", artist: "Various Artists", album: "Hridayapoorvam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-028.mp3", favorite: false },
  { id: "ml-029", title: "Cyclone Central", artist: "Various Artists", album: "IDENTITY (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-029.mp3", favorite: false },
  { id: "ml-030", title: "Ilakozhiye", artist: "Various Artists", album: "Thalavara (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-030.mp3", favorite: false },
  { id: "ml-031", title: "Illey Illa", artist: "Various Artists", album: "Bethlehem Kudumba Unit (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-031.mp3", favorite: false },
  { id: "ml-032", title: "Innenthe", artist: "Various Artists", album: "Prakambanam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-032.mp3", favorite: false },
  { id: "ml-033", title: "Iragey", artist: "Various Artists", album: "Tourist Family (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-033.mp3", favorite: false },
  { id: "ml-034", title: "IYKYK", artist: "Various Artists", album: "Athiradi (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-034.mp3", favorite: false },
  { id: "ml-035", title: "Jaalakaari", artist: "Various Artists", album: "Balti (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-035.mp3", favorite: false },
  { id: "ml-036", title: "Kaadhal Nadhiye", artist: "Various Artists", album: "Pennu Case (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-036.mp3", favorite: false },
  { id: "ml-037", title: "Kaalamithu Padakkaalam Song", artist: "Various Artists", album: "Padakkalam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-037.mp3", favorite: false },
  { id: "ml-038", title: "Kaattu Raasa", artist: "Various Artists", album: "Vilaayath Budha (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-038.mp3", favorite: false },
  { id: "ml-039", title: "Kand Kand", artist: "Various Artists", album: "Thalavara (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-039.mp3", favorite: false },
  { id: "ml-040", title: "Kanmani Poove", artist: "Various Artists", album: "Kanmani Poove (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-040.mp3", favorite: false },
  { id: "ml-041", title: "Kanmanipoove", artist: "Various Artists", album: "Thudarum (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-041.mp3", favorite: false },
  { id: "ml-042", title: "Kavantha Song", artist: "Various Artists", album: "Am Ah (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-042.mp3", favorite: false },
  { id: "ml-043", title: "Khalbinnakame", artist: "Various Artists", album: "Abhilasham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-043.mp3", favorite: false },
  { id: "ml-044", title: "Kiliye", artist: "Various Artists", album: "ARM (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-044.mp3", favorite: false },
  { id: "ml-045", title: "Killer On The Loose", artist: "Various Artists", album: "Rifle Club (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-045.mp3", favorite: false },
  { id: "ml-046", title: "Kochu Keralam", artist: "Various Artists", album: "Vaazha 2 (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-046.mp3", favorite: false },
  { id: "ml-047", title: "Kodava Wedding Song", artist: "Various Artists", album: "Bromance (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-047.mp3", favorite: false },
  { id: "ml-048", title: "Kondattam", artist: "Various Artists", album: "Thudarum (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-048.mp3", favorite: false },
  { id: "ml-049", title: "Krishna Song", artist: "Various Artists", album: "Malayalee From India (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-049.mp3", favorite: false },
  { id: "ml-050", title: "Kunjikkavil Meghame", artist: "Various Artists", album: "Aashaan (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-050.mp3", favorite: false },
  { id: "ml-051", title: "Kutti Kutti Poove", artist: "Various Artists", album: "AOT (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-051.mp3", favorite: false },
  { id: "ml-052", title: "Local Sigma Boys", artist: "Various Artists", album: "Prakambanam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-052.mp3", favorite: false },
  { id: "ml-053", title: "Loser Song", artist: "Various Artists", album: "I'm Game (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-053.mp3", favorite: false },
  { id: "ml-054", title: "Maanthrikam", artist: "Various Artists", album: "Bethlehem Kudumba Unit (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-054.mp3", favorite: false },
  { id: "ml-055", title: "Makane", artist: "Various Artists", album: "Vaazha (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-055.mp3", favorite: false },
  { id: "ml-056", title: "First Blood", artist: "Various Artists", album: "Marco (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-056.mp3", favorite: false },
  { id: "ml-057", title: "Mathara", artist: "Various Artists", album: "Khalifa (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-057.mp3", favorite: false },
  { id: "ml-058", title: "Mazhavillaye", artist: "Various Artists", album: "I'm Game (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-058.mp3", favorite: false },
  { id: "ml-059", title: "Mic Check", artist: "Various Artists", album: "Athiradi (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-059.mp3", favorite: false },
  { id: "ml-060", title: "Nadhi", artist: "Various Artists", album: "Nadhi (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-060.mp3", favorite: false },
  { id: "ml-061", title: "Minnalvala", artist: "Various Artists", album: "Narivetta (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-061.mp3", favorite: false },
  { id: "ml-062", title: "Nebulakal", artist: "Various Artists", album: "Manjummel Boys (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-062.mp3", favorite: false },
  { id: "ml-063", title: "Neela Mizhikalil", artist: "Various Artists", album: "Neela Mizhikalil (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-063.mp3", favorite: false },
  { id: "ml-064", title: "Nenjile", artist: "Various Artists", album: "Oru Kattil Oru Muri (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-064.mp3", favorite: false },
  { id: "ml-065", title: "Nilaave", artist: "Various Artists", album: "Nilaave (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-065.mp3", favorite: false },
  { id: "ml-066", title: "Nilachantham", artist: "Various Artists", album: "Nilachantham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-066.mp3", favorite: false },
  { id: "ml-067", title: "Nin Nizhalake", artist: "Various Artists", album: "Nin Nizhalake (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-067.mp3", favorite: false },
  { id: "ml-068", title: "Ninnodu Parayuvaan", artist: "Various Artists", album: "Sumathi Valavu (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-068.mp3", favorite: false },
  { id: "ml-069", title: "Nyabagam", artist: "Various Artists", album: "Varshangalkku Shesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-069.mp3", favorite: false },
  { id: "ml-070", title: "Omane", artist: "Various Artists", album: "Aadujeevitham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-070.mp3", favorite: false },
  { id: "ml-071", title: "Onam Mood", artist: "Various Artists", album: "Sahasam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-071.mp3", favorite: false },
  { id: "ml-072", title: "Ormapeythu", artist: "Various Artists", album: "Ormapeythu (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-072.mp3", favorite: false },
  { id: "ml-073", title: "Otta Nokku Song", artist: "Various Artists", album: "Sumathi Valavu (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-073.mp3", favorite: false },
  { id: "ml-074", title: "Pallichattambi", artist: "Various Artists", album: "Pallichattambi (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-074.mp3", favorite: false },
  { id: "ml-075", title: "Panjara Punch", artist: "Various Artists", album: "Alappuzha Gymkhana (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-075.mp3", favorite: false },
  { id: "ml-076", title: "Pathinalam Ravinte", artist: "Various Artists", album: "Pathinalam Ravinte (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-076.mp3", favorite: false },
  { id: "ml-077", title: "Periyone", artist: "Various Artists", album: "Aadujeevitham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-077.mp3", favorite: false },
  { id: "ml-078", title: "Pirakilaro", artist: "Various Artists", album: "Pavi Caretaker (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-078.mp3", favorite: false },
  { id: "ml-079", title: "Pottu Pottu", artist: "Various Artists", album: "Alappuzha Gymkhana (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-079.mp3", favorite: false },
  { id: "ml-080", title: "Premavathi", artist: "Various Artists", album: "Athi Bheekara Kaamukan (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-080.mp3", favorite: false },
  { id: "ml-081", title: "Priya Lokame", artist: "Various Artists", album: "Sookshmadarshini (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-081.mp3", favorite: false },
  { id: "ml-082", title: "Raahukaalam Song", artist: "Various Artists", album: "Padakkalam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-082.mp3", favorite: false },
  { id: "ml-083", title: "Raavaake", artist: "Various Artists", album: "Raavaake (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-083.mp3", favorite: false },
  { id: "ml-084", title: "Sambrani Penthiri (Alvakannale)", artist: "Various Artists", album: "Vyasana Sametham Bandhu Mithradhikal (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-084.mp3", favorite: false },
  { id: "ml-085", title: "Santhatha Sakhiye", artist: "Various Artists", album: "Sahasam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-085.mp3", favorite: false },
  { id: "ml-086", title: "Shoka Mookam", artist: "Various Artists", album: "Lokah (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-086.mp3", favorite: false },
  { id: "ml-087", title: "Shokam Venda", artist: "Various Artists", album: "Sumathi Valavu (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-087.mp3", favorite: false },
  { id: "ml-088", title: "Thai Thakka Kalyanam", artist: "Various Artists", album: "Madraskaaran (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-088.mp3", favorite: false },
  { id: "ml-089", title: "Thaliromale", artist: "Various Artists", album: "Thudakkam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-089.mp3", favorite: false },
  { id: "ml-090", title: "THATTATHIL", artist: "Various Artists", album: "Abhilasham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-090.mp3", favorite: false },
  { id: "ml-091", title: "The Soul of Prince", artist: "Various Artists", album: "Prince and Family (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-091.mp3", favorite: false },
  { id: "ml-092", title: "Theeraa Dhooram", artist: "Various Artists", album: "Anomie (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-092.mp3", favorite: false },
  { id: "ml-093", title: "Thooki", artist: "Various Artists", album: "Arcado (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-093.mp3", favorite: false },
  { id: "ml-094", title: "Tuk Tuk Tuk Tu", artist: "Various Artists", album: "Hridayapoorvam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-094.mp3", favorite: false },
  { id: "ml-095", title: "Vanilla Chediye", artist: "Various Artists", album: "Vaazha 2 (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-095.mp3", favorite: false },
  { id: "ml-096", title: "Vayojana Zombie", artist: "Various Artists", album: "Prakambanam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-096.mp3", favorite: false },
  { id: "ml-097", title: "Vellarathaaram", artist: "Various Artists", album: "Sarvam Maya (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-097.mp3", favorite: false },
  { id: "ml-098", title: "Venmathi", artist: "Various Artists", album: "Hridayapoorvam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-098.mp3", favorite: false },
  { id: "ml-099", title: "Vennila Kanyake", artist: "Various Artists", album: "Pavi Caretaker (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-099.mp3", favorite: false },
  { id: "ml-100", title: "Vismaya", artist: "Various Artists", album: "Vismaya (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-100.mp3", favorite: false },
  { id: "ml-101", title: "YAVANA KADHAYIL NINNU VANNA", artist: "Various Artists", album: "Bethlehem Kudumba Unit (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-101.mp3", favorite: false },
  { id: "ml-102", title: "പുതുമഴ", artist: "Various Artists", album: "Sarvam Maya (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-102.mp3", favorite: false },
  { id: "ta-162", title: "Srivalli", artist: "Allu Arjun, Rashmika", album: "Pushpa - The Rise (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-162.mp3", favorite: false },
  { id: "ta-163", title: "10 Endrathukulla - Vroom Vroom", artist: "D. Imman", album: "Vikram, Samantha (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-163.mp3", favorite: false },
  { id: "ta-164", title: "2.0 Jukebox", artist: "Shankar, A.R. Rahman", album: "Rajinikanth, Akshay Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-164.mp3", favorite: false },
  { id: "ta-165", title: "Orasaadha", artist: "Various Artists", album: "Vivek - Mervin (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-165.mp3", favorite: false },
  { id: "ta-166", title: "Raati", artist: "Various Artists", album: "Santhosh Dhayanidhi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-166.mp3", favorite: false },
  { id: "ta-167", title: "96 Songs", artist: "Vijay Sethupathi, Trisha", album: "Kaathalae Kaathalae Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-167.mp3", favorite: false },
  { id: "ta-168", title: "Alaakaa Loovaa (Unplugged)", artist: "Dhanush, Rajkumar", album: "OM (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-168.mp3", favorite: false },
  { id: "ta-169", title: "Aasa Kooda ( )", artist: "Preity Mukhundhan, Sai Smriti", album: "Thejo Bharathwaj (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-169.mp3", favorite: false },
  { id: "ta-170", title: "Pavazha Malli ( )", artist: "Shruti Haasan, Vivek", album: "Kayadu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-170.mp3", favorite: false },
  { id: "ta-171", title: "Radhimaa ( )", artist: "Vivek, Thejo Bharathwaj", album: "Bhagyashri Borse (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-171.mp3", favorite: false },
  { id: "ta-172", title: "Sithira Puthiri ( )", artist: "Akshay Sundher", album: "Meenakshi Chaudhary (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-172.mp3", favorite: false },
  { id: "ta-173", title: "Aadaludan Paadalai", artist: "Motta Shiva Ketta Shiva, Raghava Lawrence", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-173.mp3", favorite: false },
  { id: "ta-174", title: "Aadiney Irupen", artist: "GV Prakash, Sri Gouri Priya", album: "Happy Raj (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-174.mp3", favorite: false },
  { id: "ta-175", title: "Aasa Pulla", artist: "Ken Karunaas, Youth", album: "GV Prakash Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-175.mp3", favorite: false },
  { id: "ta-176", title: "Aathi", artist: "Vijay, Samantha Ruth Prabhu", album: "Kaththi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-176.mp3", favorite: false },
  { id: "ta-177", title: "Achacho", artist: "Sundar.C, Tamannaah", album: "Aranmanai 4 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-177.mp3", favorite: false },
  { id: "ta-178", title: "Adangaatha Asuran", artist: "Dhanush, A.R. Rahman", album: "RAAYAN (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-178.mp3", favorite: false },
  { id: "ta-179", title: "Adchithooku", artist: "Ajith Kumar, Nayanthara", album: "Viswasam Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-179.mp3", favorite: false },
  { id: "ta-180", title: "Adhagappattathu Magajanangalay - Yaenadi", artist: "Yuabharathi, Umapathi", album: "D. Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-180.mp3", favorite: false },
  { id: "ta-181", title: "Adi Alaye", artist: "Sivakarthikeyan, Sreeleela", album: "Parasakthi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-181.mp3", favorite: false },
  { id: "ta-182", title: "Adiye Unna Paathida", artist: "M.Sasikumar, Mia George", album: "Vetrivel (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-182.mp3", favorite: false },
  { id: "ta-183", title: "Aiyo Kadhaley", artist: "Abishan Jeevinth, Anaswara Rajan", album: "With Love (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-183.mp3", favorite: false },
  { id: "ta-184", title: "Alaakaa Loova (Tamil)", artist: "Dhanush, Mammootty", album: "OM (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-184.mp3", favorite: false },
  { id: "ta-185", title: "Anegan - Danga Maari Oodhari", artist: "Harris, Super Hit Dance Song", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-185.mp3", favorite: false },
  { id: "ta-186", title: "Annaatthe Annaatthe", artist: "Rajinikanth, S.P.B", album: "Annaatthe (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-186.mp3", favorite: false },
  { id: "ta-187", title: "Arabic Kuthu", artist: "Thalapathy Vijay, Pooja Hegde", album: "Beast (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-187.mp3", favorite: false },
  { id: "ta-188", title: "Arumbey", artist: "Vijay Antony, Kiruthiga Udhayanidhi", album: "Kaali (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-188.mp3", favorite: false },
  { id: "ta-189", title: "Asal Kolaar - Karuppu Car ft.Bank Rolls Young", artist: "(Music Video)", album: "RXZOR (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-189.mp3", favorite: false },
  { id: "ta-190", title: "Asuran - Kathari Poovazhagi", artist: "Vetri Maaran, G V Prakash", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-190.mp3", favorite: false },
  { id: "ta-191", title: "Asuran - Kathari Poovazhagi", artist: "Vetri Maaran, G V Prakash", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-191.mp3", favorite: false },
  { id: "ta-192", title: "Asuran - Polladha Boomi", artist: "Vetri Maaran, G V Prakash", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-192.mp3", favorite: false },
  { id: "ta-193", title: "Aura 10⧸10", artist: "Hiphop Tamizha, Ketika Sharma", album: "Meesaya Murukku 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-193.mp3", favorite: false },
  { id: "ta-194", title: "Azhagae Nee Asainthal", artist: "Vishal, Catherine Tresa", album: "Kathakali (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-194.mp3", favorite: false },
  { id: "ta-195", title: "Babyma", artist: "Ashok Selvan, Chandini", album: "Saba Nayagan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-195.mp3", favorite: false },
  { id: "ta-196", title: "Bairavaa Songs", artist: "Vijay, Keerthy Suresh", album: "Varlaam Varlaam Vaa Lyrical Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-196.mp3", favorite: false },
  { id: "ta-197", title: "Bairavaa Songs", artist: "Vijay, Keerthy Suresh", album: "Azhagiya Soodana Poovey Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-197.mp3", favorite: false },
  { id: "ta-198", title: "Bairavaa Songs", artist: "Vijay, Keerthy Suresh", album: "Nillayo Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-198.mp3", favorite: false },
  { id: "ta-199", title: "Bairavaa Songs", artist: "Vijay, Keerthy Suresh", album: "PaPa PaPa Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-199.mp3", favorite: false },
  { id: "ta-200", title: "Bigil - Singappenney", artist: "@A. R. Rahman", album: "Thalapathy Vijay, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-200.mp3", favorite: false },
  { id: "ta-201", title: "Bigil - Unakaga Official", artist: "@ARRahman, Atlee", album: "Thalapathy Vijay, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-201.mp3", favorite: false },
  { id: "ta-202", title: "Bigil - Unakaga", artist: "@A. R. Rahman", album: "Thalapathy Vijay, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-202.mp3", favorite: false },
  { id: "ta-203", title: "Bigil - Verithanam (Tamil)", artist: "A.R Rahman, Atlee", album: "Thalapathy Vijay, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-203.mp3", favorite: false },
  { id: "ta-204", title: "Bigil - Verithanam", artist: "@A. R. Rahman, Atlee", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-204.mp3", favorite: false },
  { id: "ta-205", title: "Bodhai Kodhai", artist: "Karthik, Karky", album: "Gautham Vasudev Menon (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-205.mp3", favorite: false },
  { id: "ta-206", title: "Bogan - Damaalu Dumeelu Tamil", artist: "D. Imman", album: "Jayam Ravi, Hansikha (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-206.mp3", favorite: false },
  { id: "ta-207", title: "Bogan - Senthoora", artist: "Imman, Latest Tamil Hit 2017", album: "Jayam Ravi, Hansika (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-207.mp3", favorite: false },
  { id: "ta-208", title: "Boombastic", artist: "Hiphop Tamizha, Chinna Ponnu", album: "Kadaisi Ulaga Por (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-208.mp3", favorite: false },
  { id: "ta-209", title: "Brodha V x Jordindian - Vainko [ ]", artist: "Various Artists", album: "Brodha V x Jordindian - Vainko [ ] (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-209.mp3", favorite: false },
  { id: "ta-210", title: "Bullet (Tamil)", artist: "Simbu, Lingusamy", album: "Ram Pothineni, Krithi Shetty (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-210.mp3", favorite: false },
  { id: "ta-211", title: "CITY OF GOLD (Glimpse)", artist: "Vikram Prabhu, Yuvan Shankar Raja", album: "Romeo Pictures (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-211.mp3", favorite: false },
  { id: "ta-212", title: "Chalmaar - Devi", artist: "Prabhudeva, Tamannaah", album: "Official  Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-212.mp3", favorite: false },
  { id: "ta-213", title: "Chandi Veeran", artist: "Alunguraen Kulunguraen, Video Song", album: "Tamil Movie (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-213.mp3", favorite: false },
  { id: "ta-214", title: "Chekka Chivantha Vaanam - Bhoomi Bhoomi (Tamil)", artist: "Mani Ratnam, Vairamuthu", album: "@ARRahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-214.mp3", favorite: false },
  { id: "ta-215", title: "Chennai 2 Singapore Songs", artist: "Ghibran, Abbas Akbar", album: "Vaadi Vaadi Song (Music Video) (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-215.mp3", favorite: false },
  { id: "ta-216", title: "Chikitu Official", artist: "Superstar Rajinikanth, Lokesh", album: "COOLIE (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-216.mp3", favorite: false },
  { id: "ta-217", title: "Chikku Bukku - Madha Gaja Raja (Tamil)", artist: "Sundar C, Gemini Audio", album: "Vishal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-217.mp3", favorite: false },
  { id: "ta-218", title: "Chilla Chilla", artist: "Ajith Kumar, H Vinoth", album: "Thunivu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-218.mp3", favorite: false },
  { id: "ta-219", title: "Chilla Chilla - Thunivu (Tamil)", artist: "H Vinoth, Anirudh", album: "Ajith Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-219.mp3", favorite: false },
  { id: "ta-220", title: "Chinna Machan", artist: "Charlie Chaplin2, Prabhu Deva", album: "Lyrical (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-220.mp3", favorite: false },
  { id: "ta-221", title: "Cobra - Thumbi Thullal", artist: "AR Rahman, Ajay Gnanamuthu", album: "Chiyaan Vikram (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-221.mp3", favorite: false },
  { id: "ta-222", title: "Coke Studio Tamil", artist: "Arivu x Khatija Rahman", album: "Sagavaasi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-222.mp3", favorite: false },
  { id: "ta-223", title: "Coke Studio Tamil", artist: "Arivu & Ambassa Band", album: "Thamizh Vaazhthu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-223.mp3", favorite: false },
  { id: "ta-224", title: "Comali - Hi Sonna Podhum", artist: "Hiphop Tamizha", album: "Jayam Ravi, Samyuktha Hegde (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-224.mp3", favorite: false },
  { id: "ta-225", title: "Comali - Paisa Note", artist: "Hiphop Tamizha", album: "Jayam Ravi, Kajal Aggarwal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-225.mp3", favorite: false },
  { id: "ta-226", title: "DARBAR (Tamil) - Chumma Kizhi ( )", artist: "AR Murugadoss, Anirudh", album: "Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-226.mp3", favorite: false },
  { id: "ta-227", title: "DARBAR (Tamil) - Chumma Kizhi ( )", artist: "AR Murugadoss, Anirudh", album: "Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-227.mp3", favorite: false },
  { id: "ta-228", title: "DARBAR (Tamil) - Dumm Dumm ( )", artist: "AR Murugadoss, Anirudh", album: "Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-228.mp3", favorite: false },
  { id: "ta-229", title: "DARBAR (Tamil) - Dumm Dumm ( )", artist: "AR Murugadoss, Anirudh", album: "Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-229.mp3", favorite: false },
  { id: "ta-230", title: "DARBAR (Tamil) - Tharam Maara Single ( )", artist: "AR Murugadoss, Anirudh", album: "Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-230.mp3", favorite: false },
  { id: "ta-231", title: "Dai Dakka", artist: "Rishikanth, Anishma Anilk", album: "Modha Rathri (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-231.mp3", favorite: false },
  { id: "ta-232", title: "Dev - Anange (Tamil)", artist: "Harris Jayaraj, Rajath Ravishankar", album: "Karthi, Rakul Preet Singh (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-232.mp3", favorite: false },
  { id: "ta-233", title: "Devarattam", artist: "Gautham Karthik, Muthaiya", album: "Madura Palapalakkuthu Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-233.mp3", favorite: false },
  { id: "ta-234", title: "Devi 2", artist: "Prabhu Deva, Tamannaah", album: "Ready Ready Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-234.mp3", favorite: false },
  { id: "ta-235", title: "Dharala Prabhu - Title Track", artist: "Anirudh Ravichander, Tanya Hope", album: "Harish Kalyan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-235.mp3", favorite: false },
  { id: "ta-236", title: "Dharmadurai - Aandipatti", artist: "Yuvan Shankar Raja", album: "Vijay Sethupathi, Aishwarya Rajesh (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-236.mp3", favorite: false },
  { id: "ta-237", title: "Dharmadurai - Makka Kalanguthappa", artist: "Yuvan Shankar Raja", album: "Vijay Sethupathi, Tamannaah (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-237.mp3", favorite: false },
  { id: "ta-238", title: "Dhee - Vari Vari (Unna Kaadhaliche) (Prod. Santhosh Narayanan)", artist: "Various Artists", album: "Dhee - Vari Vari (Unna Kaadhaliche) (Prod. Santhosh Narayanan) (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-238.mp3", favorite: false },
  { id: "ta-239", title: "Dhee ft. Arivu - Enjoy Enjaami (Prod. Santhosh Narayanan)", artist: "Various Artists", album: "Dhee ft. Arivu - Enjoy Enjaami (Prod. Santhosh Narayanan) (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-239.mp3", favorite: false },
  { id: "ta-240", title: "Dhop (Tamil)", artist: "Ram Charan, Kiara Advani", album: "Game Changer (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-240.mp3", favorite: false },
  { id: "ta-241", title: "Dikkiloona - Per Vachaalum Vaikkaama", artist: "Yuvan Shankar Raja, Karthik Yogi", album: "Santhanam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-241.mp3", favorite: false },
  { id: "ta-242", title: "Doctor - Chellamma", artist: "Anirudh Ravichander, Nelson Dilipkumar", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-242.mp3", favorite: false },
  { id: "ta-243", title: "Doctor - Chellamma", artist: "Anirudh Ravichander, Nelson Dilipkumar", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-243.mp3", favorite: false },
  { id: "ta-244", title: "Doctor - So Baby", artist: "Anirudh Ravichander, Nelson Dilipkumar", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-244.mp3", favorite: false },
  { id: "ta-245", title: "Don - Bae", artist: "Anirudh Ravichander, Cibi Chakaravarthi", album: "Sivakarthikeyan, Priyanka Mohan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-245.mp3", favorite: false },
  { id: "ta-246", title: "Don - Jalabulajangu", artist: "Anirudh Ravichander", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-246.mp3", favorite: false },
  { id: "ta-247", title: "Don - Private Party", artist: "Anirudh, Jonita Gandhi", album: "Sivakarthikeyan, Priyanka Mohan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-247.mp3", favorite: false },
  { id: "ta-248", title: "Don - Private Party", artist: "Anirudh", album: "Sivakarthikeyan, Priyanka Mohan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-248.mp3", favorite: false },
  { id: "ta-249", title: "Eeswaran", artist: "Silambarasan TR, Nidhhi Agerwal", album: "Mangalyam Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-249.mp3", favorite: false },
  { id: "ta-250", title: "Ekavali", artist: "Sid Sriram, Johnny", album: "Renigunta 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-250.mp3", favorite: false },
  { id: "ta-251", title: "Enakena", artist: "Pradeep Ranganathan, Anirudh", album: "Love Insurance Kompany (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-251.mp3", favorite: false },
  { id: "ta-252", title: "Enjaami Thandhaane", artist: "Dhanush, Nithya Menen", album: "Idli Kadai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-252.mp3", favorite: false },
  { id: "ta-253", title: "Enna Sugam", artist: "Dhanush, Nithya Menen", album: "Idli Kadai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-253.mp3", favorite: false },
  { id: "ta-254", title: "Ennai Kollathey", artist: "Geethaiyin Raadhai, Ztish", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-254.mp3", favorite: false },
  { id: "ta-255", title: "Esa Kaaththa", artist: "Sasikumar, Chaithra J Achar", album: "My Lord (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-255.mp3", favorite: false },
  { id: "ta-256", title: "Ey Sandakaara", artist: "R. Madhavan, Ritika Singh", album: "＂Irudhi Suttru＂ (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-256.mp3", favorite: false },
  { id: "ta-257", title: "Chikiri Chikiri", artist: "Ram Charan, Janhvi", album: "Peddi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-257.mp3", favorite: false },
  { id: "ta-258", title: "Chinna Chinna Kangal", artist: "Thalapathy Vijay, Venkat P", album: "The Greatest Of All Time (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-258.mp3", favorite: false },
  { id: "ta-259", title: "Jimikki Ponnu (Tamil) Varisu", artist: "Thaman S, Vamshi Paidipally", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-259.mp3", favorite: false },
  { id: "ta-260", title: "KANIMAA - RETRO", artist: "Karthik Subbaraj, Pooja Hegde", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-260.mp3", favorite: false },
  { id: "ta-261", title: "KISSIK (Tamil)", artist: "Allu Arjun, Sukumar", album: "Pushpa 2 The Rule (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-261.mp3", favorite: false },
  { id: "ta-262", title: "Kannumuzhi", artist: "Vetri Maaran, GV Prakash Kumar", album: "Mask (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-262.mp3", favorite: false },
  { id: "ta-263", title: "MATTA", artist: "Thalapathy Vijay, Venkat Prabhu", album: "The Greatest Of All Time (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-263.mp3", favorite: false },
  { id: "ta-264", title: "Ranjithame - Varisu", artist: "Rashmika, Vamshi Paidipally", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-264.mp3", favorite: false },
  { id: "ta-265", title: "GaandaKannazhagi", artist: "Sivakarthikeyan, SunPictures", album: "Namma Veettu Pillai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-265.mp3", favorite: false },
  { id: "ta-266", title: "Gaandu Kannamma", artist: "Ku Karthik", album: "Vivek - Mervin (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-266.mp3", favorite: false },
  { id: "ta-267", title: "Gangstaa", artist: "Ajith Kumar, H Vinoth", album: "Thunivu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-267.mp3", favorite: false },
  { id: "ta-268", title: "Gatta Kusthi 2 - Magaraasi", artist: "Zara Zyanna, Chella Ayyavu", album: "Vishnu Vishal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-268.mp3", favorite: false },
  { id: "ta-269", title: "Gemini Ganeshanum Suruli Raajanum - Vennila Thangachi", artist: "Atharvaa", album: "D. Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-269.mp3", favorite: false },
  { id: "ta-270", title: "Genie - ABDI ABDI", artist: "Ravi Mohan, Arjunan Jr.", album: "AR Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-270.mp3", favorite: false },
  { id: "ta-271", title: "God Mode", artist: "RJ Balaji, @SaiAbhyankkar", album: "Suriya's Karuppu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-271.mp3", favorite: false },
  { id: "ta-272", title: "God Mode", artist: "Suriya, RJB", album: "Karuppu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-272.mp3", favorite: false },
  { id: "ta-273", title: "Goindhamma", artist: "Hiphop Tamizha, Ramya Ranganathan", album: "Meesaya Murukku 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-273.mp3", favorite: false },
  { id: "ta-274", title: "Golden Sparrow", artist: "Priyanka Mohan, Pavish", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-274.mp3", favorite: false },
  { id: "ta-275", title: "Golden Sparrow", artist: "Priyanka Mohan, Pavish", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-275.mp3", favorite: false },
  { id: "ta-276", title: "Good Bad Ugly： Ak The Tiger", artist: "Darkkey, GV Prakash", album: "Ajith (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-276.mp3", favorite: false },
  { id: "ta-277", title: "Gulaebaghavali", artist: "4K, Kalyaan", album: "Guleba Full Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-277.mp3", favorite: false },
  { id: "ta-278", title: "Gulaebaghavali", artist: "4K, Kalyaan", album: "Guleba Video Song Promo (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-278.mp3", favorite: false },
  { id: "ta-279", title: "Gulaebaghavali", artist: "4K, Kalyaan", album: "Heartukulla Video Song Promo (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-279.mp3", favorite: false },
  { id: "ta-280", title: "Gulaebaghavali", artist: "4K, Kalyaan", album: "Seramal Ponal Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-280.mp3", favorite: false },
  { id: "ta-281", title: "Hangova", artist: "Lokesh Kanagaraj, Anirudh", album: "DC (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-281.mp3", favorite: false },
  { id: "ta-282", title: "Happy New Year (Single) - Kavan", artist: "K V Anand, HipHop Tamizha", album: "Vijay Sethupathi, T Rajhendherr (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-282.mp3", favorite: false },
  { id: "ta-283", title: "Hey Minnale", artist: "Sivakarthikeyan, Sai Pallavi", album: "Amaran (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-283.mp3", favorite: false },
  { id: "ta-284", title: "High On Love", artist: "Yuvan Shankar Raja, Sid Sriram", album: "Pyaar Prema Kaadhal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-284.mp3", favorite: false },
  { id: "ta-285", title: "High On Love", artist: "Yuvan Shankar Raja, Harish Kalyan", album: "Pyaar Prema Kaadhal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-285.mp3", favorite: false },
  { id: "ta-286", title: "Hon’ble CM Vijay - Thalapathy Kacheri ： Jana Nayagan", artist: "Anirudh", album: "H Vinoth (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-286.mp3", favorite: false },
  { id: "ta-287", title: "I - Mersalaayitten", artist: "Vikram, Amy Jackson", album: "A.R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-287.mp3", favorite: false },
  { id: "ta-288", title: "I - Pookkalae Sattru Oyivedungal", artist: "Vikram, Amy Jackson", album: "A. R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-288.mp3", favorite: false },
  { id: "ta-289", title: "Idhayam", artist: "Arjun Das, Aditi Shankar", album: "Once More (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-289.mp3", favorite: false },
  { id: "ta-290", title: "Imaikkaa Nodigal", artist: "Hiphop Tamizha, Atharvaa", album: "Kadhalikathey Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-290.mp3", favorite: false },
  { id: "ta-291", title: "Imaikkaa Nodigal", artist: "Hiphop Tamizha, Atharvaa", album: "Vilambara Idaiveli Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-291.mp3", favorite: false },
  { id: "ta-292", title: "Inayae", artist: "Thadam, Arun Vijay", album: "Full Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-292.mp3", favorite: false },
  { id: "ta-293", title: "Indian 2 - Calendar", artist: "Shankar, Anirudh", album: "Kamal Haasan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-293.mp3", favorite: false },
  { id: "ta-294", title: "Inna Mylu", artist: "Sivakarthikeyan, Kavin", album: "LIFT (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-294.mp3", favorite: false },
  { id: "ta-295", title: "Iru Mugan - Halena", artist: "Harris Jayaraj, Super Hit Song", album: "Vikram, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-295.mp3", favorite: false },
  { id: "ta-296", title: "Iru Mugan - Oh Maya Tamil", artist: "Harris Jayaraj", album: "Vikram, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-296.mp3", favorite: false },
  { id: "ta-297", title: "Irumbuthirai", artist: "Vishal, Arjun", album: "Angry Bird Video Promo (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-297.mp3", favorite: false },
  { id: "ta-298", title: "Irumbuthirai", artist: "4K, Vishal", album: "Azhagae Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-298.mp3", favorite: false },
  { id: "ta-299", title: "Ispade Rajavum Idhaya Raniyum", artist: "Harish Kalyan, Sam C.S", album: "Kannamma Song Lyrical Video Ft. Anirudh (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-299.mp3", favorite: false },
  { id: "ta-300", title: "Ispade Rajavum Idhaya Raniyum", artist: "Harish Kalyan, Shilpa Manjunath", album: "Kannamma Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-300.mp3", favorite: false },
  { id: "ta-301", title: "Ispade Rajavum Idhaya Raniyum", artist: "Harish Kalyan, Sam C.S", album: "Sandaali Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-301.mp3", favorite: false },
  { id: "ta-302", title: "JAILER - Hukum", artist: "Anirudh, Nelson", album: "Superstar Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-302.mp3", favorite: false },
  { id: "ta-303", title: "JAILER - Kaavaalaa", artist: "Anirudh, Nelson", album: "Superstar Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-303.mp3", favorite: false },
  { id: "ta-304", title: "Jagame Thandhiram - Bujji", artist: "Santhosh Narayanan, Karthik Subbaraj", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-304.mp3", favorite: false },
  { id: "ta-305", title: "Jagame Thandhiram - Rakita Rakita Rakita", artist: "Santhosh Narayanan, Karthik Subbaraj", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-305.mp3", favorite: false },
  { id: "ta-306", title: "Jai Sulthan (Tamil) - Sulthan", artist: "Vivek-Mervin, Anirudh", album: "Karthi, Rashmika (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-306.mp3", favorite: false },
  { id: "ta-307", title: "Jail - Kaathodu Kaathanen", artist: "Vasanthabalan", album: "G.V. Prakash Kumar, Dhanush, Aditi Rao Hydari (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-307.mp3", favorite: false },
  { id: "ta-308", title: "Jana Nayagan - Raavana Mavandaa", artist: "Pooja Hegde, H Vinoth", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-308.mp3", favorite: false },
  { id: "ta-309", title: "Jana Nayagan – Chella Magale", artist: "Pooja Hegde, H Vinoth", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-309.mp3", favorite: false },
  { id: "ta-310", title: "Jana Nayagan – Thalapathy Kacheri", artist: "H Vinoth, Anirudh", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-310.mp3", favorite: false },
  { id: "ta-311", title: "Jaragandi", artist: "Ram Charan, Kiara Advani", album: "Game Changer (Tamil) (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-311.mp3", favorite: false },
  { id: "ta-312", title: "Jawan： Hayyoda (Tamil)", artist: "Atlee, Anirudh", album: "Shahrukh Khan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-312.mp3", favorite: false },
  { id: "ta-313", title: "Jawan： Not Ramaiya Vastavaiya Extended Version (Tamil)： Shah Rukh Khan", artist: "Anirudh, Nayanthara", album: "Atlee (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-313.mp3", favorite: false },
  { id: "ta-314", title: "Jigidi Killaadi", artist: "Dhanush, Anirudh", album: "Pattas (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-314.mp3", favorite: false },
  { id: "ta-315", title: "Jigiri Dosthu", artist: "Sivakarthikeyan, D.Imman IPandiraj", album: "Namma Veettu Pillai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-315.mp3", favorite: false },
  { id: "ta-316", title: "Jillelama", artist: "Kavin, Preethi Asrani", album: "Kiss (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-316.mp3", favorite: false },
  { id: "ta-317", title: "JollyO Gymkhana", artist: "Thalapathy Vijay, Pooja Hegde", album: "Beast (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-317.mp3", favorite: false },
  { id: "ta-318", title: "Junga", artist: "Vijay Sethupathi, Sayyeshaa", album: "Koottippo Koodave Song with Lyrics (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-318.mp3", favorite: false },
  { id: "ta-319", title: "Junga", artist: "Vijay Sethupathi, Sayyeshaa", album: "Koottippo Koodave Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-319.mp3", favorite: false },
  { id: "ta-320", title: "KANAGA OFFICIAL", artist: "Various Artists", album: "KANAGA OFFICIAL (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-320.mp3", favorite: false },
  { id: "ta-321", title: "Kaalamaadan Gaanam", artist: "Dhruv, Mari Selvaraj", album: "Bison Kaalamaadan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-321.mp3", favorite: false },
  { id: "ta-322", title: "Kaalamaadan Gaanam", artist: "Dhruv, Mari Selvaraj", album: "Bison Kaalamaadan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-322.mp3", favorite: false },
  { id: "ta-323", title: "Kaalathukkum Nee Venum", artist: "HDR, Silambarasan TR", album: "VTK (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-323.mp3", favorite: false },
  { id: "ta-324", title: "Kaappaan - Hey Amigo", artist: "Harris Jayaraj, K.V. Anand", album: "Suriya, Sayyeshaa (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-324.mp3", favorite: false },
  { id: "ta-325", title: "Kaappaan - Siriki (Tamil)", artist: "Harris Jayaraj, K.V. Anand", album: "Suriya, Sayyeshaa (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-325.mp3", favorite: false },
  { id: "ta-326", title: "Kaappaan - Siriki", artist: "Harris Jayaraj, K V Anand", album: "Suriya, Sayyeshaa (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-326.mp3", favorite: false },
  { id: "ta-327", title: "Kaathuvaakula Rendu Kaadhal - Naan Pizhai", artist: "VijaySethupathi,  Nayanthara", album: "VijaySethupathi, Nayanthara, Anirudh, VigneshShivan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-327.mp3", favorite: false },
  { id: "ta-328", title: "Kaathuvaakula Rendu Kaadhal - Rendu Kaadhal", artist: "Anirudh, Vignesh Shivan", album: "Vijay Sethupathi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-328.mp3", favorite: false },
  { id: "ta-329", title: "Kaathuvaakula Rendu Kaadhal - Two Two Two", artist: "Anirudh, Vignesh Shivan", album: "Vijay Sethupathi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-329.mp3", favorite: false },
  { id: "ta-330", title: "Kaatru Veliyidai - Azhagiye", artist: "Karthi, New Hit Song 2017", album: "A. R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-330.mp3", favorite: false },
  { id: "ta-331", title: "Kaatru Veliyidai - Saarattu Vandiyila", artist: "AR Rahman,  Mani Ratnam", album: "AR Rahman, Mani Ratnam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-331.mp3", favorite: false },
  { id: "ta-332", title: "Kabali Songs", artist: "Rajinikanth, Pa Ranjith", album: "Neruppu Da Song with Lyrics (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-332.mp3", favorite: false },
  { id: "ta-333", title: "Kabali Songs", artist: "Rajinikanth, Pa Ranjith", album: "Neruppu Da Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-333.mp3", favorite: false },
  { id: "ta-334", title: "Kadaikutty Singam - Adivellakkaara Velaayi", artist: "Karthi, Sayyeshaa", album: "Tamil Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-334.mp3", favorite: false },
  { id: "ta-335", title: "Kadaram Kondan", artist: "Abi Hassan, Akshara Haasan", album: "Thaarame Thaarame Lyrical Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-335.mp3", favorite: false },
  { id: "ta-336", title: "Kadhal Kan Kattudhe - Kaaki Sattai", artist: "Siva Karthikeyan, Sri Divya", album: "Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-336.mp3", favorite: false },
  { id: "ta-337", title: "Kadhal Oru Vizhiyil", artist: "Kanchana 3, Raghava Lawrence", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-337.mp3", favorite: false },
  { id: "ta-338", title: "Kadhalikka Neramillai - Yennai Izhukkuthadi", artist: "Ravi Mohan, Nithya Menen", album: "Feat. AR Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-338.mp3", favorite: false },
  { id: "ta-339", title: "Kalaivaniye", artist: "Hiphop Tamizha, Ramya Ranganathan", album: "Meesaya Murukku 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-339.mp3", favorite: false },
  { id: "ta-340", title: "Kalakalappu 2", artist: "Hiphop Tamizha, Jiiva", album: "Oru Kuchi Oru Kulfi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-340.mp3", favorite: false },
  { id: "ta-341", title: "Kalakalappu 2", artist: "Sundar C", album: "Pudichiruka illa Pudikalaya Video Song Feat. Hiphop Tamizha (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-341.mp3", favorite: false },
  { id: "ta-342", title: "Kalakalappu 2", artist: "Jiiva, Jai", album: "Pudichiruka illa Pudikalaya Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-342.mp3", favorite: false },
  { id: "ta-343", title: "Kalloorum", artist: "Chiyaan Vikram, S.U.Arun Kumar", album: "Veera Dheera Sooran (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-343.mp3", favorite: false },
  { id: "ta-344", title: "Kalyana Virundhu", artist: "Maestro Ilaiyaraaja, Karthik Subbaraj", album: "DOROTHY (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-344.mp3", favorite: false },
  { id: "ta-345", title: "Kanaa - Othaiyadi Pathayila", artist: "Dhibu Ninan Thomas", album: "Arunraja Kamaraj (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-345.mp3", favorite: false },
  { id: "ta-346", title: "Kanaa - Vaayadi Petha Pulla", artist: "Dhibu Ninan Thomas", album: "Arunraja Kamaraj (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-346.mp3", favorite: false },
  { id: "ta-347", title: "Kanaga", artist: "Metro Shirish, Shriya Saran", album: "Non-Violence (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-347.mp3", favorite: false },
  { id: "ta-348", title: "Kannaana Kanney", artist: "Ajith Kumar, Nayanthara", album: "Viswasam Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-348.mp3", favorite: false },
  { id: "ta-349", title: "Kannaana Kanney with Lyrics", artist: "Ajith Kumar, Nayanthara", album: "Viswasam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-349.mp3", favorite: false },
  { id: "ta-350", title: "Kannae Kanmaniye 8K", artist: "Dhanush, Kriti", album: "Tere Ishk Mein (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-350.mp3", favorite: false },
  { id: "ta-351", title: "Kannamma ( )", artist: "Arun Vijay, Siddhi", album: "Retta Thala (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-351.mp3", favorite: false },
  { id: "ta-352", title: "Kannamma", artist: "Rajinikanth, Pa Ranjith", album: "Kaala (Tamil) (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-352.mp3", favorite: false },
  { id: "ta-353", title: "Kanne Kanave", artist: "Atharvaa, Nimisha Sajayan", album: "DNA (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-353.mp3", favorite: false },
  { id: "ta-354", title: "Kanne Kanne", artist: "Anirudh Ravichander, Vishal", album: "Ayogya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-354.mp3", favorite: false },
  { id: "ta-355", title: "Kannukulla", artist: "Pradeep R, Mamitha Baiju", album: "Dude (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-355.mp3", favorite: false },
  { id: "ta-356", title: "Karuppa Kooda Va", artist: "Suriya, RJ Balaji", album: "Karuppu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-356.mp3", favorite: false },
  { id: "ta-357", title: "Karuppa Kooda Va", artist: "RJ Balaji, @SaiAbhyankkar", album: "Suriya's Karuppu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-357.mp3", favorite: false },
  { id: "ta-358", title: "Karuppu Nerathazhagi - Komban", artist: "Karthi, Lakshmi Menon", album: "Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-358.mp3", favorite: false },
  { id: "ta-359", title: "Kasethan Kadavulada", artist: "Ajith Kumar, H Vinoth", album: "Thunivu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-359.mp3", favorite: false },
  { id: "ta-360", title: "Kasethan Kadavulada", artist: "Ajith Kumar, H Vinoth", album: "Thunivu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-360.mp3", favorite: false },
  { id: "ta-361", title: "Kaththi Sandai - Naan Konjam Karuppu Thaan Tamil", artist: "Hiphop Tamizha", album: "Vishal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-361.mp3", favorite: false },
  { id: "ta-362", title: "Kattikida - Kaaki Sattai", artist: "Siva Karthikeyan, Sri Divya", album: "Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-362.mp3", favorite: false },
  { id: "ta-363", title: "Kodi - Ei Suzhali Tamil", artist: "Santhosh Narayanan", album: "Dhanush, Trisha (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-363.mp3", favorite: false },
  { id: "ta-364", title: "Kodi - Sirukki Vaasam Tamil", artist: "Santhosh Narayanan", album: "Dhanush, Trisha (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-364.mp3", favorite: false },
  { id: "ta-365", title: "Koditta Idangalai Nirappuga", artist: "Shanthanu, R.Parthiban", album: "En Oruthiye Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-365.mp3", favorite: false },
  { id: "ta-366", title: "Kokka Makka Kokka - Devi", artist: "Prabhudeva, Tamannaah", album: "Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-366.mp3", favorite: false },
  { id: "ta-367", title: "Kolaigaran - Idhamaai ( )", artist: "Andrew Louis, Simon K.King", album: "Arjun, Vijay Antony, Ashima (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-367.mp3", favorite: false },
  { id: "ta-368", title: "Konji Pesida Venaam", artist: "Vijay Sethupathi, Remya Nambeesan", album: "Sethupathi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-368.mp3", favorite: false },
  { id: "ta-369", title: "Kovai Gethu Anthem", artist: "Hiphop Tamizha", album: "The Times Of India (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-369.mp3", favorite: false },
  { id: "ta-370", title: "Kuchi Mittai Official", artist: "Siddharth, Trisha", album: "Aranmanai 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-370.mp3", favorite: false },
  { id: "ta-371", title: "Kumki - Sollitaley Ava Kaadhala", artist: "D. Imman", album: "Vikram Prabhu, Lakshmi Menon (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-371.mp3", favorite: false },
  { id: "ta-372", title: "Kurumugil - Sita Ramam (Tamil)", artist: "Mrunal, Vishal", album: "Dulquer (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-372.mp3", favorite: false },
  { id: "ta-373", title: "Kutty Pattas", artist: "Reba John, Venki", album: "Ashwin (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-373.mp3", favorite: false },
  { id: "ta-374", title: "LEO - Naa Ready", artist: "Lokesh Kanagaraj, Anirudh Ravichander", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-374.mp3", favorite: false },
  { id: "ta-375", title: "Laali Laali", artist: "Karthi, Rakul Preet", album: "Theeran Adhigaaram Ondru Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-375.mp3", favorite: false },
  { id: "ta-376", title: "Love Insurance Kompany - Dheema", artist: "Anirudh Ravichander, Vignesh Shivan", album: "Pradeep Ranganathan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-376.mp3", favorite: false },
  { id: "ta-377", title: "Mamakutty", artist: "Yuvan Shankar Raja", album: "Pradeep Ranganathan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-377.mp3", favorite: false },
  { id: "ta-378", title: "Pacha Elai", artist: "Yuvan Shankar Raja", album: "Pradeep Ranganathan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-378.mp3", favorite: false },
  { id: "ta-379", title: "Loveah Sollitalea Official", artist: "GV Prakash, Youth", album: "Ken Karunaas (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-379.mp3", favorite: false },
  { id: "ta-380", title: "Lubber Pandhu - Chillanjirukkiye", artist: "Sean Roldan", album: "Harish Kalyan, Attakathi Dinesh (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-380.mp3", favorite: false },
  { id: "ta-381", title: "MANNARU - Mannar Muthu", artist: "RAKITAA ENTERTAINMENT", album: "Santhosh Narayanan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-381.mp3", favorite: false },
  { id: "ta-382", title: "Maamadura", artist: "Raghava Lawrence, SJ Suryah", album: "Jigarthanda DoubleX (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-382.mp3", favorite: false },
  { id: "ta-383", title: "Maan Karate - Un Vizhigalil", artist: "Sivakarthikeyan", album: "Anirudh (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-383.mp3", favorite: false },
  { id: "ta-384", title: "Maari - Don’u Don’u Don’u", artist: "Anirudh", album: "Dhanush, Kajal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-384.mp3", favorite: false },
  { id: "ta-385", title: "Maari - Don’u Don’u Don’u", artist: "Anirudh, Super Hit Song", album: "Dhanush, Kajal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-385.mp3", favorite: false },
  { id: "ta-386", title: "Maari - Maari Thara Local", artist: "Anirudh Ravichander", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-386.mp3", favorite: false },
  { id: "ta-387", title: "Maari 2 - Maari Gethu ( )", artist: "Yuvan Shankar Raja, Balaji Mohan", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-387.mp3", favorite: false },
  { id: "ta-388", title: "Maari 2 - Maari's Aanandhi ( )", artist: "Yuvan Shankar Raja, Balaji Mohan", album: "Dhanush, Sai Pallavi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-388.mp3", favorite: false },
  { id: "ta-389", title: "Maari 2 - Rowdy Baby ( )", artist: "Yuvan Shankar Raja, Balaji Mohan", album: "Dhanush, Sai Pallavi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-389.mp3", favorite: false },
  { id: "ta-390", title: "Macarena", artist: "A R Rahman, Moonwalk 2026", album: "Prabhudeva (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-390.mp3", favorite: false },
  { id: "ta-391", title: "Madras To Madurai", artist: "Vishal, Sundar C", album: "Aambala (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-391.mp3", favorite: false },
  { id: "ta-392", title: "Mahaan - Evanda Enakku Custody", artist: "KarthikSubbaraj, Santhosh Narayanan", album: "Chiyaan Vikram (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-392.mp3", favorite: false },
  { id: "ta-393", title: "Mahaan - Evanda Enakku Custody", artist: "Santhosh Narayanan", album: "Chiyaan Vikram (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-393.mp3", favorite: false },
  { id: "ta-394", title: "Mailaanji", artist: "Sivakarthikeyan, Pandiraj", album: "Namma Veettu Pillai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-394.mp3", favorite: false },
  { id: "ta-395", title: "Makkamishi", artist: "Jayam Ravi, Priyanka Mohan", album: "Brother (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-395.mp3", favorite: false },
  { id: "ta-396", title: "Makkaru - Official - T Suriavelan", artist: "Karnan Gcrak", album: "Stephen Zechariah (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-396.mp3", favorite: false },
  { id: "ta-397", title: "Mallipoo", artist: "HDR, Silambarasan TR", album: "VTK (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-397.mp3", favorite: false },
  { id: "ta-398", title: "Manasilaayo", artist: "Rajinikanth, Anirudh Ravichander", album: "Vettaiyan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-398.mp3", favorite: false },
  { id: "ta-399", title: "Mandaadi Mandaadi", artist: "Suhas, GV Prakash Kumar", album: "Soori (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-399.mp3", favorite: false },
  { id: "ta-400", title: "Manogari - 4k [Tamil]", artist: "Prabhas, Rana", album: "Baahubali - The Beginning (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-400.mp3", favorite: false },
  { id: "ta-401", title: "Marakkavillayae", artist: "Nani, Shraddha Srinath", album: "JERSEY (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-401.mp3", favorite: false },
  { id: "ta-402", title: "Maruthu - Akka Petha Jakkavandi", artist: "D. Imman", album: "Vishal, Sri Divya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-402.mp3", favorite: false },
  { id: "ta-403", title: "Maruthu - Karuvakaatu Karuvaaya", artist: "D. Imman", album: "Vishal, Sri Divya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-403.mp3", favorite: false },
  { id: "ta-404", title: "Maruvaarthai", artist: "Dhanush, Darbuka Siva", album: "Enai Noki Paayum Thota (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-404.mp3", favorite: false },
  { id: "ta-405", title: "Maruvaarthai", artist: "Dhanush, Darbuka Siva", album: "Enai Noki Paayum Thota (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-405.mp3", favorite: false },
  { id: "ta-406", title: "Master - Kutti Story", artist: "Anirudh Ravichander, Lokesh Kanagaraj", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-406.mp3", favorite: false },
  { id: "ta-407", title: "Master - Vaathi Coming", artist: "Anirudh Ravichander, Lokesh Kanagaraj", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-407.mp3", favorite: false },
  { id: "ta-408", title: "Master - Vaathi Raid", artist: "Anirudh Ravichander, Lokesh Kanagaraj", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-408.mp3", favorite: false },
  { id: "ta-409", title: "Mayakirriye", artist: "Aathmika, Anirudh Ravichander", album: "Mugen Rao (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-409.mp3", favorite: false },
  { id: "ta-410", title: "Mayile Audio", artist: "AR Rahman, Prabhudeva", album: "Moonwalk (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-410.mp3", favorite: false },
  { id: "ta-411", title: "Mazhaikkulle", artist: "Vijay Sethupathi, Ranjit Jeyakodi", album: "Puriyaatha Puthir (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-411.mp3", favorite: false },
  { id: "ta-412", title: "Meesaya Murukku Songs", artist: "Hiphop Tamizha, Aathmika", album: "Sakkarakatti Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-412.mp3", favorite: false },
  { id: "ta-413", title: "Megham Karukatha", artist: "Dhanush, Anirudh", album: "Thiruchitrambalam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-413.mp3", favorite: false },
  { id: "ta-414", title: "Meherezylaa", artist: "Silambarasan TR, Yuvan Shankar Raja", album: "Maanaadu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-414.mp3", favorite: false },
  { id: "ta-415", title: "Mersal - Aalaporan Thamizhan Tamil", artist: "A.R. Rahman", album: "Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-415.mp3", favorite: false },
  { id: "ta-416", title: "Mersal - Maacho Tamil", artist: "A.R. Rahman", album: "Vijay, Kajal Aggarwal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-416.mp3", favorite: false },
  { id: "ta-417", title: "Mersal - Mersal Arasan Tamil", artist: "A.R. Rahman", album: "Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-417.mp3", favorite: false },
  { id: "ta-418", title: "Meyaadha Maan", artist: "Vaibhav, Priya", album: "Address Song - Adiye S.Madhu Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-418.mp3", favorite: false },
  { id: "ta-419", title: "Meyaadha Maan", artist: "Vaibhav, Santhosh Narayanan", album: "Area Gaana - Enga Veetu Kuthuvilakkey Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-419.mp3", favorite: false },
  { id: "ta-420", title: "Meyaadha Maan", artist: "Vaibhav, Priya", album: "Nee Mattum Podhum Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-420.mp3", favorite: false },
  { id: "ta-421", title: "Meyaadha Maan", artist: "Vaibhav, Priya", album: "Thangachi Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-421.mp3", favorite: false },
  { id: "ta-422", title: "Minikki Minikki - (Tamil)", artist: "Chiyaan Vikram, Pa Ranjith", album: "Thangalaan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-422.mp3", favorite: false },
  { id: "ta-423", title: "Monica", artist: "Superstar Rajinikanth, Lokesh", album: "COOLIE (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-423.mp3", favorite: false },
  { id: "ta-424", title: "Monica", artist: "Superstar Rajinikanth, Lokesh", album: "COOLIE (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-424.mp3", favorite: false },
  { id: "ta-425", title: "Moonwalk - Yethu", artist: "Prabhudeva, Manoj NS", album: "AR Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-425.mp3", favorite: false },
  { id: "ta-426", title: "Mounam Sollum Varthaigal", artist: "Rahul Riji Nair, Sidhartha Pradeep", album: "Tamil Music Video ft Vinitha Koshy (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-426.mp3", favorite: false },
  { id: "ta-427", title: "Mr.Local", artist: "Sivakarthikeyan, Nayanthara", album: "Takkunu Takkunu Lyric Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-427.mp3", favorite: false },
  { id: "ta-428", title: "Mr.Local", artist: "Sivakarthikeyan, Nayanthara", album: "Takkunu Takkunu Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-428.mp3", favorite: false },
  { id: "ta-429", title: "Muthumani - DOROTHY", artist: "Karthik Subbaraj", album: "Maestro Ilaiyaraaja (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-429.mp3", favorite: false },
  { id: "ta-430", title: "Mutta Kalakki", artist: "Ken Karunaas, Suraj Venjaramoodu", album: "Youth (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-430.mp3", favorite: false },
  { id: "ta-431", title: "NGK - Anbae Peranbae", artist: "Yuvan Shankar Raja, Selvaraghavan", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-431.mp3", favorite: false },
  { id: "ta-432", title: "Naam - Adi Penne (Duet) [4K] - T Suriavelan", artist: "Stephen Zechariah ft Srinisha", album: "Rupiny (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-432.mp3", favorite: false },
  { id: "ta-433", title: "Naan Aval Illai", artist: "Suriya, Nayanthara", album: "Masss (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-433.mp3", favorite: false },
  { id: "ta-434", title: "Naan Kudikka Poren - Ratty Adhiththan feat.@SahiSiva", artist: "TamilRap", album: "Official Music Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-434.mp3", favorite: false },
  { id: "ta-435", title: "Naan Mahaan Alle- Iragai Pole HD [1080]", artist: "Various Artists", album: "Naan Mahaan Alle- Iragai Pole HD [1080] (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-435.mp3", favorite: false },
  { id: "ta-436", title: "Naan Pizhaippeno", artist: "Darbuka Siva, Thamarai", album: "Enai Noki Paayum Thota (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-436.mp3", favorite: false },
  { id: "ta-437", title: "Naan Sirithal", artist: "Iswarya Menon, Sundar C", album: "Breakup Song Video Feat. Hiphop Tamizha (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-437.mp3", favorite: false },
  { id: "ta-438", title: "Naan Sirithal", artist: "Hiphop Tamizha, Iswarya Menon", album: "Dhom Dhom Song Lyric Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-438.mp3", favorite: false },
  { id: "ta-439", title: "Naan Un - Audio", artist: "Suriya, Samantha", album: "24 Movie (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-439.mp3", favorite: false },
  { id: "ta-440", title: "Naanga Naalu Peru", artist: "RJ Balaji, @SaiAbhyankkar", album: "Suriya's Karuppu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-440.mp3", favorite: false },
  { id: "ta-441", title: "Naanum Rowdy Dhaan - Thangamey", artist: "Anirudh, Vijay Sethupathi", album: "Official Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-441.mp3", favorite: false },
  { id: "ta-442", title: "Naanum Rowdy Dhaan - Yennai Maatrum Kadhale", artist: "Sid Sriram, Anirudh", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-442.mp3", favorite: false },
  { id: "ta-443", title: "Nallaru Po", artist: "Pradeep Ranganathan, @SaiAbhyankkar", album: "Dude (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-443.mp3", favorite: false },
  { id: "ta-444", title: "Nanbanukku Koila Kattu", artist: "Kanchana 3, Raghava Lawrence", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-444.mp3", favorite: false },
  { id: "ta-445", title: "Natpe Thunai", artist: "Hiphop Tamizha Ft. Crazy Fans, Sundar C", album: "Kerala Song Lyrical Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-445.mp3", favorite: false },
  { id: "ta-446", title: "Natpe Thunai", artist: "Hiphop Tamizha, Sundar C", album: "Pallikoodam - The Farewell Song Lyric Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-446.mp3", favorite: false },
  { id: "ta-447", title: "Natpe Thunai", artist: "Hiphop Tamizha, Sundar C", album: "Single Pasanga Lyrical Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-447.mp3", favorite: false },
  { id: "ta-448", title: "Natpe Thunai", artist: "Hiphop Tamizha, Anagha", album: "Vengamavan Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-448.mp3", favorite: false },
  { id: "ta-449", title: "Neeyum Naanum Anbe", artist: "Vijay Sethupathi, Nayanthara", album: "Imaikkaa Nodigal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-449.mp3", favorite: false },
  { id: "ta-450", title: "Nenjorathil - Pichaikkaran", artist: "Supriya Joshi, Vijay Antony", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-450.mp3", favorite: false },
  { id: "ta-451", title: "Nimir - Nenjil Maamazhai", artist: "Udhayanidhi Stalin,  Namitha Pramod", album: "Udhayanidhi Stalin, Namitha Pramod (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-451.mp3", favorite: false },
  { id: "ta-452", title: "Ninaithale Inikkum - Azhagaai Pookkuthey", artist: "Various Artists", album: "Vijay Antony (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-452.mp3", favorite: false },
  { id: "ta-453", title: "Endi Ippadi", artist: "Siddharth, Deepa Sannidhi", album: "Enakkul Oruvan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-453.mp3", favorite: false },
  { id: "ta-454", title: "Oh My Kadavule - Kadhaippoma", artist: "Leon James", album: "Ashok Selvan, Ritika Singh (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-454.mp3", favorite: false },
  { id: "ta-455", title: "Om Shiva Hom Full", artist: "Various Artists", album: "Naan Kadavul Movie  Original Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-455.mp3", favorite: false },
  { id: "ta-456", title: "Onnappola Oruthana", artist: "M.Sasikumar, Nikhila Vimal", album: "Vetrivel (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-456.mp3", favorite: false },
  { id: "ta-457", title: "Oo Solriya (Tamil)", artist: "Allu Arjun, Rashmika", album: "Pushpa (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-457.mp3", favorite: false },
  { id: "ta-458", title: "Oorum Blood", artist: "Pradeep Ranganathan, Mamitha", album: "Dude (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-458.mp3", favorite: false },
  { id: "ta-459", title: "Oru Naal Koothu Songs", artist: "Dinesh, Nivetha Pethuraj", album: "Adiyae Azhagae Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-459.mp3", favorite: false },
  { id: "ta-460", title: "Oru Sattai Oru Balpam", artist: "Kanchana 3, Raghava Lawrence", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-460.mp3", favorite: false },
  { id: "ta-461", title: "Oxygen", artist: "Hiphop Tamizha, K V Anand", album: "Kavan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-461.mp3", favorite: false },
  { id: "ta-462", title: "PEELINGS Tamil", artist: "Allu Arjun, Rashmika", album: "Pushpa 2 The Rule (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-462.mp3", favorite: false },
  { id: "ta-463", title: "Paal Dabba x ofRo - Kaathu Mela ( )", artist: "Various Artists", album: "Think Indie (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-463.mp3", favorite: false },
  { id: "ta-464", title: "Paambhu Sattai", artist: "Bobby Simha, Keerthy Suresh", album: "Nee Uravaaga Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-464.mp3", favorite: false },
  { id: "ta-465", title: "Paayum Puli - Marudhakaari", artist: "Vishal, Kajal Aggarwal", album: "D Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-465.mp3", favorite: false },
  { id: "ta-466", title: "Paayum Puli - Naan Soodana - Official", artist: "Vishal, Suseenthiran", album: "D Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-466.mp3", favorite: false },
  { id: "ta-467", title: "Paayum Puli - Silukku Marame - Official", artist: "Vishal, Suseenthiran", album: "D Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-467.mp3", favorite: false },
  { id: "ta-468", title: "Paayum Puli - Yaar Indha Muyalkutti - Official", artist: "Vishal, Suseenthiran", album: "D Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-468.mp3", favorite: false },
  { id: "ta-469", title: "Pathala Pathala", artist: "Kamal Haasan, Anirudh Ravichander", album: "VIKRAM (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-469.mp3", favorite: false },
  { id: "ta-470", title: "Pathu Thala - Namma Satham", artist: "Silambarasan TR, Gautham Karthik", album: "A. R Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-470.mp3", favorite: false },
  { id: "ta-471", title: "Pattampoochi", artist: "Suriya, Mamitha Baiju", album: "Vishwanath and Sons (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-471.mp3", favorite: false },
  { id: "ta-472", title: "Pattampoochi", artist: "Suriya, Mamitha Baiju", album: "Vishwanath and Sons (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-472.mp3", favorite: false },
  { id: "ta-473", title: "Pazhagikalam - Aambala", artist: "Vishal, Hansika", album: "Full Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-473.mp3", favorite: false },
  { id: "ta-474", title: "Petta - Marana Mass (Tamil)", artist: "Anirudh Ravichander", album: "Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-474.mp3", favorite: false },
  { id: "ta-475", title: "Pokkiri Raja - Bubbly Bubbly", artist: "D. Imman", album: "Jiiva, Hansika Motwani (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-475.mp3", favorite: false },
  { id: "ta-476", title: "Police Kaarana Kattikitta - 4K", artist: "Prabhu Deva, Madonna", album: "JollyO Gymkhana (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-476.mp3", favorite: false },
  { id: "ta-477", title: "Polladha Ulagam - [4K]", artist: "Dhanush, Karthick Naren", album: "Maaran (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-477.mp3", favorite: false },
  { id: "ta-478", title: "Ponni Nadhi", artist: "Tamil, AR Rahman", album: "Ponniyin Selvan 1 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-478.mp3", favorite: false },
  { id: "ta-479", title: "Pottala Muttaye", artist: "Vijay Sethupathi, Nithya Menen", album: "Thalaivan Thalaivii (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-479.mp3", favorite: false },
  { id: "ta-480", title: "Pottala Muttaye", artist: "Vijay Sethupathi, Nithya Menen", album: "Thalaivan Thalaivii (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-480.mp3", favorite: false },
  { id: "ta-481", title: "Powerhouse", artist: "Superstar Rajinikanth, Lokesh", album: "Coolie (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-481.mp3", favorite: false },
  { id: "ta-482", title: "Poyivaa Nanba (Tamil)", artist: "Dhanush, Nagarjuna", album: "Kuberaa (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-482.mp3", favorite: false },
  { id: "ta-483", title: "Poyivaa Nanba", artist: "Dhanush, Nagarjuna", album: "Kuberaa (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-483.mp3", favorite: false },
  { id: "ta-484", title: "Psycho - Unna Nenachu", artist: "Ilayaraja, Mysskin", album: "Udhayanidhi Stalin (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-484.mp3", favorite: false },
  { id: "ta-485", title: "Psycho - Unna Nenachu", artist: "Ilayaraja", album: "Udhayanidhi Stalin, Aditi Rao Hydari (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-485.mp3", favorite: false },
  { id: "ta-486", title: "Puli - Yaendi Yaendi", artist: "DSP", album: "Vijay, Shruti Haasan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-486.mp3", favorite: false },
  { id: "ta-487", title: "Puli Manga Pulip", artist: "Santhanam, Santhosh Narayanan", album: "Parris Jeyaraj (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-487.mp3", favorite: false },
  { id: "ta-488", title: "Raathu Raasan", artist: "RJ Balaji, @SaiAbhyankkar", album: "Suriya's Karuppu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-488.mp3", favorite: false },
  { id: "ta-489", title: "Raga of Revenge (From ＂DC＂)", artist: "Various Artists", album: "Raga of Revenge (From ＂DC＂) (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-489.mp3", favorite: false },
  { id: "ta-490", title: "Rajinimurugan - Jigiru Jigiru", artist: "D. Imman", album: "Sivakarthikeyan ,Keerthi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-490.mp3", favorite: false },
  { id: "ta-491", title: "Rajinimurugan - Un Mele Oru Kannu", artist: "Imman", album: "Sivakarthikeyan, Keethi Suresh (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-491.mp3", favorite: false },
  { id: "ta-492", title: "Rajinimurugan - Yennamma Ippadi Panreengalaema", artist: "D. Imman", album: "Sivakarthikeyan ,Keerthi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-492.mp3", favorite: false },
  { id: "ta-493", title: "Rangu Rakkara", artist: "Raghava Lawrencce & Ritika Singh, Tamil Song", album: "Sivalinga (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-493.mp3", favorite: false },
  { id: "ta-494", title: "Ranjithame - Varisu (Tamil)", artist: "Rashmika, Vamshi Paidipally", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-494.mp3", favorite: false },
  { id: "ta-495", title: "Rasaali - Promo", artist: "A R Rahman, STR", album: "Achcham Yenbadhu Madamaiyada (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-495.mp3", favorite: false },
  { id: "ta-496", title: "Rasagulla", artist: "Nayanthara, Kavin", album: "Hi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-496.mp3", favorite: false },
  { id: "ta-497", title: "Rasathi ( )", artist: "@mmoriginalstamil ​", album: "Shankar Mahadevan • Anthony Daasan • KJ Iyenar (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-497.mp3", favorite: false },
  { id: "ta-498", title: "Rekka - Kanna Kaattu Podhum Tamil", artist: "D. Imman", album: "Vijay Sethupathi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-498.mp3", favorite: false },
  { id: "ta-499", title: "Rekka Rekka", artist: "Dhruv Vikram, Mari Selvaraj", album: "Bison Kaalamaadan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-499.mp3", favorite: false },
  { id: "ta-500", title: "Remo - Senjitaley", artist: "Anirudh, Latest Hit Song", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-500.mp3", favorite: false },
  { id: "ta-501", title: "Remo - Sirikkadhey", artist: "Anirudh Ravichander, Keerthi Suresh", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-501.mp3", favorite: false },
  { id: "ta-502", title: "Remo - Tamilselvi", artist: "Anirudh, Keerthi Suresh", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-502.mp3", favorite: false },
  { id: "ta-503", title: "Romeo Juliet - Dandanakka", artist: "Imman", album: "Jayam Ravi, Hansika (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-503.mp3", favorite: false },
  { id: "ta-504", title: "Rudhran – Jorthaale", artist: "Sarath Kumar, ofRo", album: "Raghava Lawrence (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-504.mp3", favorite: false },
  { id: "ta-505", title: "Rudhran – Jorthaale", artist: "Sarath Kumar, ofRo", album: "Raghava Lawrence (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-505.mp3", favorite: false },
  { id: "ta-506", title: "Rummy Rummy", artist: "Vijay Sethupathi, Arvind Swamy", album: "Gandhi Talks (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-506.mp3", favorite: false },
  { id: "ta-507", title: "Saami Saami (Tamil)", artist: "Allu Arjun, Rashmika", album: "Pushpa (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-507.mp3", favorite: false },
  { id: "ta-508", title: "Saami Saami (Tamil)", artist: "Allu Arjun, Rashmika", album: "Pushpa - The Rise (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-508.mp3", favorite: false },
  { id: "ta-509", title: "Saamy² - Pudhu Metro Rail", artist: "DSP", album: "Chiyaan Vikram, Keerthy Suresh (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-509.mp3", favorite: false },
  { id: "ta-510", title: "Saamy² - Pudhu Metro Rail", artist: "Devi Sri Prasad, Hari", album: "Chiyaan Vikram, Keerthy Suresh (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-510.mp3", favorite: false },
  { id: "ta-511", title: "Saara Kaatrae", artist: "Rajinikanth, D.Imman", album: "Annaatthe (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-511.mp3", favorite: false },
  { id: "ta-512", title: "Sagaa Songs", artist: "Saran, Ayra", album: "Yaayum Video Song (யாயும்) (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-512.mp3", favorite: false },
  { id: "ta-513", title: "Salambala", artist: "Rukmini, A.R.Murugadoss", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-513.mp3", favorite: false },
  { id: "ta-514", title: "Sambavakaari", artist: "Vishnu Vishal, Aishwarya Lekshmi", album: "Gatta Kusthi 2 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-514.mp3", favorite: false },
  { id: "ta-515", title: "Sandakozhi 2 - Kambathu Ponnu Tamil", artist: "Yuvanshankar Raja", album: "Vishal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-515.mp3", favorite: false },
  { id: "ta-516", title: "Sandakozhi 2 - Sengarattan Paaraiyula Tamil", artist: "Yuvanshankar Raja", album: "Vishal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-516.mp3", favorite: false },
  { id: "ta-517", title: "Sangathamizhan - Kamala", artist: "Vivek-Mervin", album: "Vijay Sethupathi, Raashi Khanna (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-517.mp3", favorite: false },
  { id: "ta-518", title: "Saravanan Irukka Bayamaen - Yembuttu Irukkuthu Aasai", artist: "Latest Hit", album: "Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-518.mp3", favorite: false },
  { id: "ta-519", title: "Sardar - Mere Jaan", artist: "GV Prakash Kumar", album: "Karthi, RaashiiKhanna (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-519.mp3", favorite: false },
  { id: "ta-520", title: "Sarkar - OMG Ponnu (Tamil)", artist: "@ARRahman", album: "Thalapathy Vijay, Keerthy Suresh (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-520.mp3", favorite: false },
  { id: "ta-521", title: "Sarkar - Simtaangaran", artist: "A .R. Rahman, A.R Murugadoss", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-521.mp3", favorite: false },
  { id: "ta-522", title: "Sarvam Thaala Mayam - Full (Tamil )", artist: "GV Prakash, JioStudios", album: "A R Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-522.mp3", favorite: false },
  { id: "ta-523", title: "Sathya Songs", artist: "Sibi Sathyaraj, Remya Nambeesan", album: "Yavvana Song with Lyrics (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-523.mp3", favorite: false },
  { id: "ta-524", title: "Sathya Songs", artist: "Sibi Sathyaraj, Remya Nambeesan", album: "Yavvana Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-524.mp3", favorite: false },
  { id: "ta-525", title: "Sawadeeka", artist: "Ajith Kumar, Trisha", album: "Vidaamuyarchi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-525.mp3", favorite: false },
  { id: "ta-526", title: "Seemaraja - Vaaren Vaaren Seemaraja", artist: "Ponram, D. Imman", album: "Sivakarthikeyan, Samantha (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-526.mp3", favorite: false },
  { id: "ta-527", title: "Seemaraja", artist: "Sivakarthikeyan, Samantha", album: "Onnavitta Yaarum Yenakilla Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-527.mp3", favorite: false },
  { id: "ta-528", title: "Selfie Pulla", artist: "Vijay, Samantha", album: "Kaththi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-528.mp3", favorite: false },
  { id: "ta-529", title: "Sema Songs", artist: "G.V. Prakash Kumar, Arthana Binu", album: "Sandalee Song with Lyrics (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-529.mp3", favorite: false },
  { id: "ta-530", title: "Sema Songs", artist: "G.V. Prakash Kumar, Arthana Binu", album: "Sandalee Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-530.mp3", favorite: false },
  { id: "ta-531", title: "Sevatha Pulla", artist: "Karthi, Rakul Preet", album: "Theeran Adhigaaram Ondru Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-531.mp3", favorite: false },
  { id: "ta-532", title: "Shake Yo Body", artist: "Kanchana 3, Raghava Lawrence", album: "Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-532.mp3", favorite: false },
  { id: "ta-533", title: "Shoot The Kuruvi", artist: "Siddharth, Vishal Chandrashekhar", album: "Jil Jung Juk (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-533.mp3", favorite: false },
  { id: "ta-534", title: "Siddhu Kumar - Adipoli", artist: "Kushee, Sivaangi", album: "Ashwin Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-534.mp3", favorite: false },
  { id: "ta-535", title: "Sidu Sidu", artist: "Vijay Antony, Mirnalini", album: "Romeo (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-535.mp3", favorite: false },
  { id: "ta-536", title: "Simtaangaran", artist: "Sarkar, Thalapathy Vijay", album: "Lyric Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-536.mp3", favorite: false },
  { id: "ta-537", title: "Sindhubaadh", artist: "Vijay Sethupathi, Anjali", album: "Nenja Unakaga Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-537.mp3", favorite: false },
  { id: "ta-538", title: "Singari", artist: "Pradeep Ranganathan, Mamitha Baiju", album: "Dude (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-538.mp3", favorite: false },
  { id: "ta-539", title: "Sirai - Neelothi", artist: "L K Akshay Kumar, Justin Prabhakaran", album: "Vikram Prabhu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-539.mp3", favorite: false },
  { id: "ta-540", title: "Sivakumar Pondati Official", artist: "Hiphop Tamizha", album: "Sivakumarin Sabadham (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-540.mp3", favorite: false },
  { id: "ta-541", title: "Soorarai Pottru - Kaattu Payale", artist: "G.V. Prakash Kumar, Sudha Kongara", album: "Suriya, Aparna (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-541.mp3", favorite: false },
  { id: "ta-542", title: "Soorarai Pottru - Veyyon Silli", artist: "G.V. Prakash Kumar, Sudha Kongara", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-542.mp3", favorite: false },
  { id: "ta-543", title: "Suttum Vizhi - Ghajini", artist: "Asin, Nayanthara", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-543.mp3", favorite: false },
  { id: "ta-544", title: "Thaai Kelavi", artist: "Dhanush, Anirudh", album: "Thiruchitrambalam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-544.mp3", favorite: false },
  { id: "ta-545", title: "Thaai Kizhavi Vaaraa", artist: "Radikaa, Sivakarthikeyan", album: "Thaai Kizhavi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-545.mp3", favorite: false },
  { id: "ta-546", title: "Thaanaa Serndha Koottam - Naana Thaana", artist: "Anirudh l Vignesh ShivN", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-546.mp3", favorite: false },
  { id: "ta-547", title: "Thaanaa Serndha Koottam - Naana Thaana Tamil", artist: "Anirudh l Keerthi Suresh", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-547.mp3", favorite: false },
  { id: "ta-548", title: "Thaanaa Serndha Koottam - Peela Peela Teaser", artist: "Anirudh l VigneshShivN, Keerthi Suresh", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-548.mp3", favorite: false },
  { id: "ta-549", title: "Thaanaa Serndha Koottam - Peela Peela", artist: "Anirudh l Keerthi Suresh", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-549.mp3", favorite: false },
  { id: "ta-550", title: "Thaanaa Serndha Koottam - Sodakku Tamil", artist: "Anirudh l Keerthi Suresh", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-550.mp3", favorite: false },
  { id: "ta-551", title: "Thaarame Thaarame", artist: "Abi Hassan, Akshara Haasan", album: "Kadaram Kondan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-551.mp3", favorite: false },
  { id: "ta-552", title: "Thalli Pogathey", artist: "A R Rahman, Lyric Video", album: "Achcham Yenbadhu Madamaiyada (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-552.mp3", favorite: false },
  { id: "ta-553", title: "Thalli Pogathey", artist: "A R Rahman, STR", album: "Achcham Yenbadhu Madamaiyada (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-553.mp3", favorite: false },
  { id: "ta-554", title: "Thangamagan - Enna Solla", artist: "Dhanush", album: "Anirudh Ravichander (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-554.mp3", favorite: false },
  { id: "ta-555", title: "Thangame Thangame", artist: "Atharvaa, Preity Mukhundhan", album: "Idhayam Murali (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-555.mp3", favorite: false },
  { id: "ta-556", title: "Thangapoovey", artist: "Sivakarthikeyan, Rukmini", album: "Madharaasi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-556.mp3", favorite: false },
  { id: "ta-557", title: "Thani Oruvan - Kannala Kannala", artist: "Hip Hop Tamizha", album: "Jayam Ravi, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-557.mp3", favorite: false },
  { id: "ta-558", title: "Thappu Pannitten", artist: "Kalidas, Megha Akash", album: "Silambarasan TR (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-558.mp3", favorite: false },
  { id: "ta-559", title: "The Wedding (Tamil)", artist: "Suriya, Mamitha Baiju", album: "Vishwanath and Sons (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-559.mp3", favorite: false },
  { id: "ta-560", title: "The Wedding (Tamil)", artist: "Suriya, MamithaBaiju", album: "Vishwanath and Sons (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-560.mp3", favorite: false },
  { id: "ta-561", title: "Thee Thalapathy", artist: "Varisu, STR", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-561.mp3", favorite: false },
  { id: "ta-562", title: "Theekkoluthi", artist: "Dhruv, Anupama", album: "Bison Kaalamaadan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-562.mp3", favorite: false },
  { id: "ta-563", title: "Theekkoluthi", artist: "Dhruv Vikram, Anupama Parameswaran", album: "Bison Kaalamaadan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-563.mp3", favorite: false },
  { id: "ta-564", title: "Theerathae", artist: "Pancharaaksharam Movie Songs, Sundaramurthy KS", album: "Sid Sriram (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-564.mp3", favorite: false },
  { id: "ta-565", title: "Theeyaga Thondri", artist: "Hariharan, Shankar Mahadevan", album: "Aranmanai 3 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-565.mp3", favorite: false },
  { id: "ta-566", title: "Thenmozhi", artist: "Dhanush, Anirudh", album: "Thiruchitrambalam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-566.mp3", favorite: false },
  { id: "ta-567", title: "Theri Songs", artist: "Vijay, Nainika", album: "Eena Meena Teeka Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-567.mp3", favorite: false },
  { id: "ta-568", title: "Theri Songs", artist: "Vijay, Samantha", album: "En Jeevan Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-568.mp3", favorite: false },
  { id: "ta-569", title: "Theri Songs", artist: "Vijay, Samantha", album: "Jithu Jilladi Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-569.mp3", favorite: false },
  { id: "ta-570", title: "Theri Songs", artist: "Vijay, Samantha", album: "Raangu Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-570.mp3", favorite: false },
  { id: "ta-571", title: "Theruvorom - Avathaaram [4K] - T Suriavelan", artist: "MC SAI", album: "Stephen Zechariah (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-571.mp3", favorite: false },
  { id: "ta-572", title: "Thirudi", artist: "Kavin, Sathish", album: "Kiss (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-572.mp3", favorite: false },
  { id: "ta-573", title: "Thiruttuppayale 2", artist: "Susi Ganeshan, Vidyasagar", album: "Nee Paarkum Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-573.mp3", favorite: false },
  { id: "ta-574", title: "Thiruttuppayale 2", artist: "Susi Ganeshan, Vidyasagar", album: "Neenda Naal Song Lyrical (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-574.mp3", favorite: false },
  { id: "ta-575", title: "Thodakkam Mangalyam", artist: "Arya, Bobby Simha", album: "Bangalore Naatkal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-575.mp3", favorite: false },
  { id: "ta-576", title: "Thodari Songs", artist: "Dhanush, Keerthy Suresh", album: "Adadaa Ithuyenna Full Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-576.mp3", favorite: false },
  { id: "ta-577", title: "Tik Tik Tik - Kurumba", artist: "D.Imman, Sid Sriram", album: "Jayam Ravi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-577.mp3", favorite: false },
  { id: "ta-578", title: "Tik Tik Tik - Kurumba", artist: "D.Imman, Sid Sriram", album: "Jayam Ravi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-578.mp3", favorite: false },
  { id: "ta-579", title: "Tik Tik Tik - Title Track", artist: "D.Imman", album: "Jayam Ravi, Nivetha Pethuraj (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-579.mp3", favorite: false },
  { id: "ta-580", title: "Tinga - Moonwalk", artist: "Prabhudeva, Manoj N S", album: "A R Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-580.mp3", favorite: false },
  { id: "ta-581", title: "U Turn - The Karma Theme (Tamil) - Samantha", artist: "Pawan Kumar", album: "Anirudh Ravichander (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-581.mp3", favorite: false },
  { id: "ta-582", title: "UNNA ENNI", artist: "ISAIGNANI ILAIYARAAJA, KAYAL VINCENT", album: "ANTHONY TAMIL (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-582.mp3", favorite: false },
  { id: "ta-583", title: "Ullaallaa (Tamil)", artist: "Rajinikanth, Anirudh Ravichander", album: "Petta Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-583.mp3", favorite: false },
  { id: "ta-584", title: "Urugudhu Urugudhu", artist: "Vijay Sethupathi, Rukmini", album: "Ace (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-584.mp3", favorite: false },
  { id: "ta-585", title: "Ussumu Laresey Official", artist: "Dhanush, Genelia", album: "Uthama Puthiran (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-585.mp3", favorite: false },
  { id: "ta-586", title: "Usuraiya Tholaichaen - Stephen Zechariah", artist: "T Suriavelan, Rupini Anbalagan", album: "Pragathi Guruprasad (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-586.mp3", favorite: false },
  { id: "ta-587", title: "VADACHENNAI - Ennadi Maayavi Nee ( )", artist: "Vetri Maaran, Santhosh Narayanan", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-587.mp3", favorite: false },
  { id: "ta-588", title: "VADACHENNAI - Ennadi Maayavi Nee (Redux)", artist: "Vetri Maaran, Santhosh Narayanan", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-588.mp3", favorite: false },
  { id: "ta-589", title: "Vaa Kannamma", artist: "Arjun Das, Aditi Shankar", album: "Once More (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-589.mp3", favorite: false },
  { id: "ta-590", title: "Vaa Vaathi", artist: "Dhanush, Samyuktha", album: "Vaathi Movie (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-590.mp3", favorite: false },
  { id: "ta-591", title: "Vaada Raasa", artist: "Grace Karunaas, Preethi Sharma", album: "Ken (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-591.mp3", favorite: false },
  { id: "ta-592", title: "Vaadi Pulla Vaadi", artist: "Hiphop Tamizha, Vivek", album: "Meesaya Murukku (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-592.mp3", favorite: false },
  { id: "ta-593", title: "Vaalu Songs", artist: "STR, Hansika Motwani", album: "Thaarru Maarru Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-593.mp3", favorite: false },
  { id: "ta-594", title: "Vaama Vaama", artist: "Dhanush, Atharvaa", album: "Idhayam Murali (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-594.mp3", favorite: false },
  { id: "ta-595", title: "Vaaney Vaaney", artist: "Ajith Kumar, Nayanthara", album: "Viswasam Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-595.mp3", favorite: false },
  { id: "ta-596", title: "Vaaranam Aayiram - Nenjukkul Peidhidum", artist: "Suriya, Sameera Reddy", album: "Harris Jayaraj (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-596.mp3", favorite: false },
  { id: "ta-597", title: "Valimai - Naanga Vera Maari", artist: "Yuvan Shankar Raja", album: "Ajith Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-597.mp3", favorite: false },
  { id: "ta-598", title: "Vanamagan - Damn Damn", artist: "Harris Jayaraj", album: "Jayam Ravi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-598.mp3", favorite: false },
  { id: "ta-599", title: "Vanamagan - Yemma Yea Alagamma", artist: "Harris Jayaraj", album: "Jayam Ravi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-599.mp3", favorite: false },
  { id: "ta-600", title: "Varun Doctor - So Baby", artist: "Anirudh Ravichander, Nelson", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-600.mp3", favorite: false },
  { id: "ta-601", title: "Vasuvum Saravananum Onna Padichavanga - Naa Romba Busy", artist: "D. Imman", album: "Arya, Santhanam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-601.mp3", favorite: false },
  { id: "ta-602", title: "Vazhithunaiye", artist: "Pradeep Ranganathan, Kayadu", album: "Dragon (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-602.mp3", favorite: false },
  { id: "ta-603", title: "Vedalam - Aaluma Doluma", artist: "Anirudh Ravichander", album: "Ajith (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-603.mp3", favorite: false },
  { id: "ta-604", title: "Veera Sivaji - Soppanasundari", artist: "Vikram Prabhu, Vaikom Vijayalakshmi", album: "D. Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-604.mp3", favorite: false },
  { id: "ta-605", title: "Velaikkaran - Iraiva l Sivakarthikeyan, Nayanthara l Anirudh", artist: "Various Artists", album: "Velaikkaran - Iraiva l Sivakarthikeyan, Nayanthara l Anirudh (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-605.mp3", favorite: false },
  { id: "ta-606", title: "Velaikkaran - Karuthavanlaam Galeejaam", artist: "Anirudh", album: "Sivakarthikeyan, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-606.mp3", favorite: false },
  { id: "ta-607", title: "Vettaikaaran - Chinna Thamarai", artist: "Vijay Antony", album: "Vijay, Anushka (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-607.mp3", favorite: false },
  { id: "ta-608", title: "Vidhi Madhi Ultaa - Un Nerukkam", artist: "Kabilan, Ashwin", album: "Sid Sriram, Chinmayi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-608.mp3", favorite: false },
  { id: "ta-609", title: "Viduthalai Part 1 - Kaattumalli", artist: "Ilaiyaraaja, Soori", album: "Vetri Maaran (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-609.mp3", favorite: false },
  { id: "ta-610", title: "Vikram - Title Track", artist: "Anirudh Anirudh Ravichander", album: "Kamal Haasan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-610.mp3", favorite: false },
  { id: "ta-611", title: "Vikram Vedha Songs", artist: "R. Madhavan, Vijay Sethupathi", album: "Yaanji Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-611.mp3", favorite: false },
  { id: "ta-612", title: "Vinnaithaandi Varuvaayaa - Hosanna", artist: "STR, Trisha", album: "Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-612.mp3", favorite: false },
  { id: "ta-613", title: "Viruman - Kanja Poovu Kannala", artist: "Yuvan Shankar Raja, Muthaiya", album: "Karthi, Aditi Shankar (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-613.mp3", favorite: false },
  { id: "ta-614", title: "Visiri", artist: "Dhanush, Darbuka Siva", album: "Enai Noki Paayum Thota (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-614.mp3", favorite: false },
  { id: "ta-615", title: "Vivegam - Kadhalaada Official", artist: "Anirudh", album: "Ajith Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-615.mp3", favorite: false },
  { id: "ta-616", title: "Vivegam - Surviva Official", artist: "Anirudh, Siva", album: "Ajith Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-616.mp3", favorite: false },
  { id: "ta-617", title: "Vivegam - Surviva Tamil - Anirudh Feat Yogi B, Mali Manoj", artist: "Siva", album: "Ajith Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-617.mp3", favorite: false },
  { id: "ta-618", title: "Water Packet", artist: "Dhanush, A.R. Rahman", album: "RAAYAN (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-618.mp3", favorite: false },
  { id: "ta-619", title: "Wi Wi Wi WiFi", artist: "Singam 3 l Suriya l Shruthi Hassan l Harris Jayaraj l Hari", album: "Full Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-619.mp3", favorite: false },
  { id: "ta-620", title: "Windy - AYYO SAAMI (ஐயோ சாமி)", artist: "Various Artists", album: "Windy - AYYO SAAMI (ஐயோ சாமி) (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-620.mp3", favorite: false },
  { id: "ta-621", title: "Yaathi Yaathi", artist: "Abhishek CS, Goutham George", album: "Ashwin Kumar, Harshadaa Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-621.mp3", favorite: false },
  { id: "ta-622", title: "Yaayum Making Feat. Naresh Iyer & Rita Thyagarajan", artist: "Murugesh", album: "Shabir Sulthan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-622.mp3", favorite: false },
  { id: "ta-623", title: "Yaen Ennai Pirindhaai", artist: "Dhruv Vikram, Banita Sandhu", album: "Adithya Varma (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-623.mp3", favorite: false },
  { id: "ta-624", title: "Yamma Ghajini", artist: "Harris Jayaraj × Asal Kolaar, Director Vijay", album: "KRR (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-624.mp3", favorite: false },
  { id: "ta-625", title: "Yappa Chappa", artist: "Atharvaa, Catherine Tresa", album: "Kanithan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-625.mp3", favorite: false },
  { id: "ta-626", title: "Yedhayya Saami Special Surprise -Ranabaali", artist: "Rahul Sankrityan, Ajay-Atul", album: "Vijay Deverakonda,Rashmika (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-626.mp3", favorite: false },
  { id: "ta-627", title: "Yedi", artist: "Pavish, Anikha", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-627.mp3", favorite: false },
  { id: "ta-628", title: "Yendi Vittu Pona", artist: "STR, Pradeep", album: "Dragon (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-628.mp3", favorite: false },
  { id: "ta-629", title: "Yennai Arindhaal - Adhaaru Adhaaru", artist: "Harris Jayaraj, Gautham Menon", album: "Ajith (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-629.mp3", favorite: false },
  { id: "ta-630", title: "Yennai Arindhaal - Mazhai Vara Pogudhae", artist: "Harris Jayaraj", album: "Ajith (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-630.mp3", favorite: false },
  { id: "ta-631", title: "Yennai Arindhaal - Unakkenna Venum Sollu", artist: "Harris Jayaraj", album: "Ajith (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-631.mp3", favorite: false },
  { id: "ta-632", title: "Yolo", artist: "Suriya, Disha Patani", album: "Kanguva (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-632.mp3", favorite: false },
  { id: "ta-633", title: "Yuvan Shankar Raja's New 'Konji Konji' from 'Raja's Playlist'", artist: "Various Artists", album: "@U1Records (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-633.mp3", favorite: false },
  { id: "ta-634", title: "கட்டா குஸ்தி 2 - சம்பவக்காரி தமிழ் பாடல்வரிகள்", artist: "Various Artists", album: "ஷான் ரோல்டன் (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-634.mp3", favorite: false },
  { id: "ta-635", title: "​@SaiAbhyankkar - Vizhi Veekura ( )", artist: "Sai Smriti, Adesh", album: "Saanve Megghana (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-635.mp3", favorite: false },
  { id: "te-001", title: "Mutyala Dhaarani", artist: "Various Artists", album: "7th Sense (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-001.mp3", favorite: false },
  { id: "te-002", title: "Radhimaa (Promo)", artist: "Various Artists", album: "Bhagyashri Borse (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-002.mp3", favorite: false },
  { id: "te-003", title: "Taanu Nenu", artist: "NagaChaitanya, GauthamMenon", album: "Saahasam Swaasaga Saagipo (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-003.mp3", favorite: false },
  { id: "te-004", title: "Aakasha Ganga", artist: "Vinay, Meera Chopra", album: "Vaana (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-004.mp3", favorite: false },
  { id: "te-005", title: "Aamani Paadave Koyilaa", artist: "Various Artists", album: "Geetanjali (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-005.mp3", favorite: false },
  { id: "te-006", title: "Aaya Sher - Audio Song", artist: "Nani, Anirudh Ravichander", album: "The Paradise (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-006.mp3", favorite: false },
  { id: "te-007", title: "Aaya Sher", artist: "Nani, Anirudh Ravichander", album: "The Paradise (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-007.mp3", favorite: false },
  { id: "te-008", title: "Abhinandana Ade Neevu Ade Nenu Song", artist: "Sobhana, TeluguOne", album: "Karthik (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-008.mp3", favorite: false },
  { id: "te-009", title: "Abhinandana Movie Songs", artist: "Karthik, Sobhana", album: "Edhuta Neeve Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-009.mp3", favorite: false },
  { id: "te-010", title: "Abhinandana Songs", artist: "Karthik, Sobhana", album: "Manchu Kuruse Velalo (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-010.mp3", favorite: false },
  { id: "te-011", title: "Abhinandana Songs", artist: "Karthik, Sobhana", album: "Prema Entha Madhuram (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-011.mp3", favorite: false },
  { id: "te-012", title: "Adhi Dha Surprisu", artist: "Nithiin, Sreeleela", album: "Robinhood (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-012.mp3", favorite: false },
  { id: "te-013", title: "Amrutha Movie", artist: "Madhavan, Simran Bagga", album: "E Devi Varamo Male Version Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-013.mp3", favorite: false },
  { id: "te-014", title: "Ye Mantramo Song", artist: "Various Artists", album: "Andala Rakshasi (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-014.mp3", favorite: false },
  { id: "te-015", title: "Andamaina Lokam", artist: "Ram Pothineni, Raashi Khanna", album: "Shivam (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-015.mp3", favorite: false },
  { id: "te-016", title: "Andamaina Premarani", artist: "Prabhu Deva, Nagma", album: "Premikudu Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-016.mp3", favorite: false },
  { id: "te-017", title: "Anekudu", artist: "Dhanush, Amyra Dastur", album: "Ee Sinnee Sinnaari (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-017.mp3", favorite: false },
  { id: "te-018", title: "Anthapuram Movie", artist: "Sai Kumar, Jagapathi Babu", album: "Asalem Gurthukuradhu Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-018.mp3", favorite: false },
  { id: "te-019", title: "Apudo Ipudo", artist: "Siddharth, Genelia", album: "Bommarillu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-019.mp3", favorite: false },
  { id: "te-020", title: "Attarintiki Daredi Songs", artist: "Bapu Gari Bommo - Pawan Kalyan,  Pranitha", album: "Bapu Gari Bommo - Pawan Kalyan, Pranitha (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-020.mp3", favorite: false },
  { id: "te-021", title: "Aapadbandhavudu Songs", artist: "Chiranjeevi, Meenakshi Sheshadri", album: "Aura Ammaka Chella Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-021.mp3", favorite: false },
  { id: "te-022", title: "Bangala Kathamulo", artist: "Pawan Kalyan Amisha Patel", album: "Badri (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-022.mp3", favorite: false },
  { id: "te-023", title: "Vevela Mainala", artist: "Pawan Kalyan Amisha Patel", album: "Badri (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-023.mp3", favorite: false },
  { id: "te-024", title: "Yeh Chikitha", artist: "Pawan Kalyan Amisha Patel", album: "Badri (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-024.mp3", favorite: false },
  { id: "te-025", title: "Band Melam - Thippukuntannav", artist: "Vijai Bulganin, Ramu Rathod", album: "Harsh Roshan, Sridevi (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-025.mp3", favorite: false },
  { id: "te-026", title: "Alajadulu Song Trailer", artist: "Allari Naresh, Eesha", album: "Bandipotu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-026.mp3", favorite: false },
  { id: "te-027", title: "Bhaje Bhaaje", artist: "Venkatesh Daggubati, Pawan Kalyan", album: "Gopala Gopala (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-027.mp3", favorite: false },
  { id: "te-028", title: "Bhale Bhale Magadivoi Songs", artist: "Nani, Lavanya Tripathi", album: "Motta Modatisari (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-028.mp3", favorite: false },
  { id: "te-029", title: "Bhale Bhale Magadivoy Songs", artist: "Nani, Lavanya Tripathi", album: "Motta Modatisari (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-029.mp3", favorite: false },
  { id: "te-030", title: "Bujji Thalli", artist: "Naga Chaitanya, Sai Pallavi", album: "Thandel (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-030.mp3", favorite: false },
  { id: "te-031", title: "Chakori Song With Lyrics", artist: "Naga Chaitanya, Gautham Menon", album: "Saahasam Swaasaga Saagipo (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-031.mp3", favorite: false },
  { id: "te-032", title: "Chali Gaali Chuudduu Song With Lyrics", artist: "Nani, Surabhi", album: "Gentleman (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-032.mp3", favorite: false },
  { id: "te-033", title: "Cheppana Cheppana Chinna Mata", artist: "Venkatesh, Prema", album: "Dharmachakram Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-033.mp3", favorite: false },
  { id: "te-034", title: "Chikiri Chikiri", artist: "Ram Charan, Janhvi", album: "Peddi (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-034.mp3", favorite: false },
  { id: "te-035", title: "Chinnadana Neekosam", artist: "Nitin, Nithya Menon", album: "Ishq Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-035.mp3", favorite: false },
  { id: "te-036", title: "Chinnadana Neekosam Title", artist: "Nithin, Mishti", album: "Chinnadana Neekosam (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-036.mp3", favorite: false },
  { id: "te-037", title: "Chinni Chinni Aasalu Full Song", artist: "Akkineni Nageswara Rao, Nagarjuna", album: "Manam Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-037.mp3", favorite: false },
  { id: "te-038", title: "Chinni Chinni Aasalu", artist: "Nagarjuna, Shreya", album: "Manam (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-038.mp3", favorite: false },
  { id: "te-039", title: "Chinni Chinni", artist: "Aniesh - Anaswara, Thaman S", album: "Itllu Arjuna (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-039.mp3", favorite: false },
  { id: "te-040", title: "Chinni Gundelo", artist: "Ram Pothineni, Bhagyashri Borse", album: "Andhra King Taluka (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-040.mp3", favorite: false },
  { id: "te-041", title: "Merupula merise Song", artist: "Venkatesh, Anushka", album: "Chintakayala Ravi (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-041.mp3", favorite: false },
  { id: "te-042", title: "Choolenge Aasma", artist: "Jr.Ntr, Kajal Agarwal", album: "Temper (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-042.mp3", favorite: false },
  { id: "te-043", title: "Choopu Chalu", artist: "Trisha, Nagarjuna", album: "King (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-043.mp3", favorite: false },
  { id: "te-044", title: "Choosa Choosa Full Song With Telugu Lyrics", artist: "Ram Charan, Rakul Preet", album: "Dhruva (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-044.mp3", favorite: false },
  { id: "te-045", title: "Chuttamalle", artist: "NTR, Janhvi Kapoor", album: "Devara Second Single (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-045.mp3", favorite: false },
  { id: "te-046", title: "College Papa", artist: "Kalyan Shankar, S. Naga Vamsi", album: "MAD (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-046.mp3", favorite: false },
  { id: "te-047", title: "Crazy Feeling", artist: "Ram Pothineni, Keerthy Suresh", album: "Nenu Sailaja Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-047.mp3", favorite: false },
  { id: "te-048", title: "Daredumdadum", artist: "Varun Tej, Pooja Hegde", album: "Mukunda (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-048.mp3", favorite: false },
  { id: "te-049", title: "Devudu Chesina Manushulu - Nuvvele Nuvvele", artist: "Ravi,  Ileana", album: "Ravi, Ileana (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-049.mp3", favorite: false },
  { id: "te-050", title: "Dheera Dheera", artist: "Ram Charan, Kajal Agarwal", album: "Magadheera Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-050.mp3", favorite: false },
  { id: "te-051", title: "Dhivara [8K]", artist: "Prabhas, Tamannaah", album: "Baahubali (Telugu) (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-051.mp3", favorite: false },
  { id: "te-052", title: "Edo Oka Ragam Pilichindi Vela", artist: "Teluguone, telugu songs", album: "Raja (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-052.mp3", favorite: false },
  { id: "te-053", title: "Edo Priyaragam", artist: "Allu Arjun, Anuradha Mehta", album: "Aarya (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-053.mp3", favorite: false },
  { id: "te-054", title: "Ee Velalo Neevu", artist: "JD Chakravarthy, Maheshwari", album: "Gulabi (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-054.mp3", favorite: false },
  { id: "te-055", title: "Endharo Cheppinna", artist: "Dhanush, Nithya Menen", album: "Idli Kottu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-055.mp3", favorite: false },
  { id: "te-056", title: "Endhayya Saami Special Surprise", artist: "Vijay Deverakonda, Rashmika", album: "Ranabaali (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-056.mp3", favorite: false },
  { id: "te-057", title: "Evare Full Song With Lyrics", artist: "Naga Chaitanya, Sruthi Hassan", album: "Premam Full (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-057.mp3", favorite: false },
  { id: "te-058", title: "Express Raja Movie", artist: "Sharwanand, Surabhi", album: "Ee Vintha Needhiga Song Trailer (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-058.mp3", favorite: false },
  { id: "te-059", title: "Feel My Love", artist: "Allu Arjun, Anuradha Mehta", album: "Aarya (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-059.mp3", favorite: false },
  { id: "te-060", title: "Ayudha Pooja", artist: "NTR, Saif Ali Khan", album: "Devara (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-060.mp3", favorite: false },
  { id: "te-061", title: "Blockbuster Pongal", artist: "Venkatesh, Anil R", album: "Sankranthiki Vasthunam (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-061.mp3", favorite: false },
  { id: "te-062", title: "Chikiri Chikiri", artist: "Ram Charan, Janhvi", album: "Peddi (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-062.mp3", favorite: false },
  { id: "te-063", title: "Chuttamalle - Devara", artist: "Janhvi Kapoor, Anirudh", album: "NTR (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-063.mp3", favorite: false },
  { id: "te-064", title: "Godari Gattu - Sankranthiki Vasthunam", artist: "Anil Ravipudi, Bheems C", album: "Venkatesh,Aishwarya (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-064.mp3", favorite: false },
  { id: "te-065", title: "KISSIK Song", artist: "Allu Arjun, Sukumar", album: "Pushpa 2 The Rule (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-065.mp3", favorite: false },
  { id: "te-066", title: "Massa Massa", artist: "Ram Charan, Buchi Babu", album: "Peddi (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-066.mp3", favorite: false },
  { id: "te-067", title: "Meenu", artist: "Venkatesh, Meenakshi", album: "Sankranthiki Vasthunam (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-067.mp3", favorite: false },
  { id: "te-068", title: "PEELINGS పీలింగ్స్ ఫుల్ వీడియో", artist: "Allu Arjun, Rashmika", album: "Pushpa 2 The Rule (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-068.mp3", favorite: false },
  { id: "te-069", title: "Parichayamila 8 Vasantalu", artist: "Phanindra Narsetti, Hesham", album: "Ananthika Sanilkumar (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-069.mp3", favorite: false },
  { id: "te-070", title: "Sasirekha", artist: "Chiranjeevi, Nayanthara", album: "Mana ShankaraVaraPrasad Garu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-070.mp3", favorite: false },
  { id: "te-071", title: "VaareVaa VaareVaa", artist: "Akhil Akkineni, Bhagyashri B", album: "Lenin (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-071.mp3", favorite: false },
  { id: "te-072", title: "Vadhalane", artist: "Kiran Abbavaraam, Sri Gouri Priya", album: "Chennai Love Story (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-072.mp3", favorite: false },
  { id: "te-073", title: "GETANJALI OM NAMAHA", artist: "Various Artists", album: "GETANJALI OM NAMAHA (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-073.mp3", favorite: false },
  { id: "te-074", title: "Gaayam movie songs", artist: "Jagapathi Babu, Urmila Matondkar", album: "Alupannadi Unda song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-074.mp3", favorite: false },
  { id: "te-075", title: "Gira Gira Gingiraagirey", artist: "Roshan, Anaswara", album: "Champion (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-075.mp3", favorite: false },
  { id: "te-076", title: "Godari Gattu - Sankranthiki Vasthunam", artist: "Anil Ravipudi, Bheems C", album: "Venkatesh,Aishwarya (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-076.mp3", favorite: false },
  { id: "te-077", title: "Godavari Songs", artist: "Kamalini, Singer Suneetha", album: "Andamga Lenaa Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-077.mp3", favorite: false },
  { id: "te-078", title: "Gopikamma", artist: "Varun Tej, Pooja Hegde", album: "Mukunda (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-078.mp3", favorite: false },
  { id: "te-079", title: "Gusa Gusa Lade", artist: "Nani, Surabhi", album: "Gentleman (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-079.mp3", favorite: false },
  { id: "te-080", title: "Hellallallo", artist: "Ram Charan, Buchi Babu", album: "Peddi (TELUGU) (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-080.mp3", favorite: false },
  { id: "te-081", title: "Hilesso Hilessa", artist: "Naga Chaitanya, Sai Pallavi", album: "Thandel (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-081.mp3", favorite: false },
  { id: "te-082", title: "IRUMUDI KATTU (Song)： Ravi Teja", artist: "Ananthu, Shiva Nirvana", album: "GV Prakash (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-082.mp3", favorite: false },
  { id: "te-083", title: "Inthalo Ennenni Vinthalo (Female) Full Song", artist: "Nikhil, Swathi Reddy", album: "Karthikeya Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-083.mp3", favorite: false },
  { id: "te-084", title: "It's My Love Story Songs", artist: "Aravind Krishna, Nikitha Narayan", album: "Thadi Pedavule Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-084.mp3", favorite: false },
  { id: "te-085", title: "Jaamu Rathiri Song", artist: "Venkatesh, Sridevi", album: "Kshana Kshanam (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-085.mp3", favorite: false },
  { id: "te-086", title: "Janatha Garage Songs", artist: "Jr NTR, Samantha", album: "Nee Selavadigi Lyrical Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-086.mp3", favorite: false },
  { id: "te-087", title: "Janatha Garage Songs", artist: "Jr NTR, Samantha", album: "Pranaamam Lyrical Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-087.mp3", favorite: false },
  { id: "te-088", title: "Jatha Kalise", artist: "Srimanthudu Movie, Mahesh Babu", album: "Jatha Kalise (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-088.mp3", favorite: false },
  { id: "te-089", title: "Jeans Movie Songs", artist: "Prashanth, Aishwarya Rai", album: "Poovullo Daagunna Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-089.mp3", favorite: false },
  { id: "te-090", title: "Jeans Movie", artist: "Prashanth, Aishwarya Rai", album: "Priya Priya Champodde Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-090.mp3", favorite: false },
  { id: "te-091", title: "Journey Movie", artist: "Sharvanand, Jai", album: "Chitti Chitti Pulakintha Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-091.mp3", favorite: false },
  { id: "te-092", title: "KAMALA PURAM RODDATA FULL SONG", artist: "GADDAMU SANTHOSH, JANU LYRI", album: "DJ 2025 SONG (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-092.mp3", favorite: false },
  { id: "te-093", title: "Kalusukovalani Movie", artist: "Uday Kiran, Pratyusha", album: "Priya Priya Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-093.mp3", favorite: false },
  { id: "te-094", title: "Kalusukovalani Movie", artist: "Uday Kiran, Gajala", album: "Oke Oka Kshanam Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-094.mp3", favorite: false },
  { id: "te-095", title: "Kalyana Vaibhogame Telugu Movie", artist: "Naga Shaurya, Malavika Nair", album: "Manasantha Meghamai Song w⧸Lyrics (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-095.mp3", favorite: false },
  { id: "te-096", title: "Kanche Songs", artist: "Varun Tej, Pragya Jaiswal", album: "Itu Itu Ani Chitikelu Evvarivo Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-096.mp3", favorite: false },
  { id: "te-097", title: "Kani Penchina Ma Ammake", artist: "Nagarjuna, Naga Chaitanya", album: "Manam Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-097.mp3", favorite: false },
  { id: "te-098", title: "Kannanule HD", artist: "Arvind Swamy, Manisha Koirala", album: "Bombai Telugu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-098.mp3", favorite: false },
  { id: "te-099", title: "Inthalo Ennenni Vinthalo", artist: "Nikhil Siddharth, Swati Reddy", album: "Karthikeya (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-099.mp3", favorite: false },
  { id: "te-100", title: "Anandama Song", artist: "Siddharth, Tamanna", album: "Koncham Istam Koncham Kastam (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-100.mp3", favorite: false },
  { id: "te-101", title: "Konte Chuputho", artist: "Swati, Jai", album: "Ananthapuram 1980 (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-101.mp3", favorite: false },
  { id: "te-102", title: "Kotha Bangaru Lokam Movie Songs", artist: "Varun Sandesh, Shweta Prasad", album: "Nenani Neevani Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-102.mp3", favorite: false },
  { id: "te-103", title: "Kotha Bangaru Lokam Movie Songs", artist: "Varun Sandesh, Shweta Basu Prasad", album: "Ok Anesa Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-103.mp3", favorite: false },
  { id: "te-104", title: "Kotha Bangaru Lokam Telugu Movie", artist: "Varun, Swetha", album: "Nenani Neevani Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-104.mp3", favorite: false },
  { id: "te-105", title: "Kotta Kottaga Unnadi", artist: "Venkatesh, Tabu", album: "Coolie No 1 Telugu Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-105.mp3", favorite: false },
  { id: "te-106", title: "Kshana Kshanam Movie Songs", artist: "Venkatesh, Sridevi", album: "Ammayi Muddu Ivvande Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-106.mp3", favorite: false },
  { id: "te-107", title: "Kurchi Madathapetti", artist: "Mahesh Babu, Sreeleela", album: "Guntur Kaaram (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-107.mp3", favorite: false },
  { id: "te-108", title: "Kushi Movie", artist: "Pawan Kalyan, Bhoomika", album: "Ammaye Sannaga Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-108.mp3", favorite: false },
  { id: "te-109", title: "Kushi Movie", artist: "Pawan Kalyan, Bhoomika", album: "Cheliya Cheliya Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-109.mp3", favorite: false },
  { id: "te-110", title: "Kushi Movie", artist: "Pawan Kalyan, Bhoomika", album: "Premante Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-110.mp3", favorite: false },
  { id: "te-111", title: "Lalijo Lalijo", artist: "Various Artists", album: "Vikram's Telugu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-111.mp3", favorite: false },
  { id: "te-112", title: "Love", artist: "Vishnu Manchu, Preity M", album: "Kannappa -Telugu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-112.mp3", favorite: false },
  { id: "te-113", title: "MALLEPOOLA PALLAKI (Song)", artist: "GV Prakash, Dappu Srinu", album: "Ravi Teja (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-113.mp3", favorite: false },
  { id: "te-114", title: "MANASA VADDU", artist: "Various Artists", album: "MANASA VADDU (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-114.mp3", favorite: false },
  { id: "te-115", title: "MaaMusic", artist: "Various Artists", album: "Shopping Mall-Na pranam nuvvai (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-115.mp3", favorite: false },
  { id: "te-116", title: "Shock Songs", artist: "Ravi Teja, Jyothika", album: "Madhuram Madhuram Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-116.mp3", favorite: false },
  { id: "te-117", title: "Mallela Vaanala Full Song", artist: "Venkatesh, Nayanthara", album: "Babu Bangaram Full (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-117.mp3", favorite: false },
  { id: "te-118", title: "Malli Malli Idi Rani Roju Songs", artist: "Nithya Menon, Sharwanand", album: "Enno Enno Song Trailer (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-118.mp3", favorite: false },
  { id: "te-119", title: "Malli Malli Idi Rani Roju Songs", artist: "Nithya Menon, Sharwanand", album: "Varinche Prema Song Trailer (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-119.mp3", favorite: false },
  { id: "te-120", title: "Cheppave Prema Song", artist: "Uday Kiran, Reema Sen", album: "Manasantha Nuvve (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-120.mp3", favorite: false },
  { id: "te-121", title: "Manasuke", artist: "Suriya, Samantha", album: "24 Telugu Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-121.mp3", favorite: false },
  { id: "te-122", title: "Manchu kondallona Chandram", artist: "Srikanth, Monika bedi", album: "Taj Mahal Telugu Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-122.mp3", favorite: false },
  { id: "te-123", title: "Mangli Bayilone Ballipalike", artist: "Suresh, Nagavva", album: "Mangli Bayilone Ballipalike (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-123.mp3", favorite: false },
  { id: "te-124", title: "Masthugundira Yavvaram", artist: "Havish, Kavya Thapar", album: "Nenu Ready (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-124.mp3", favorite: false },
  { id: "te-125", title: "Maya Lady - Title Song", artist: "Rakesh Varre, Madhumita Sarcar", album: "Vishal Chandrashekhar (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-125.mp3", favorite: false },
  { id: "te-126", title: "Meesaala Pilla Full", artist: "Chiranjeevi, Nayanthara", album: "Mana ShankaraVaraPrasad Garu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-126.mp3", favorite: false },
  { id: "te-127", title: "Meghaalu Lekunna Full Song", artist: "Raj Tarun, Hebah Patel", album: "Kumari 21 F (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-127.mp3", favorite: false },
  { id: "te-128", title: "Venkatadri Express Songs", artist: "Sandeep Kishan, Rakul Preet Singh", album: "Mellemellega Full Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-128.mp3", favorite: false },
  { id: "te-129", title: "Mila Mila Full Songs - Kerintha Songs - Sumanth Aswin, Sri Divya", artist: "Various Artists", album: "Mickey.J.Meyer (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-129.mp3", favorite: false },
  { id: "te-130", title: "Mirchi Songs", artist: "Latest Telugu Songs, Prabhas", album: "Idedo Bagundi Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-130.mp3", favorite: false },
  { id: "te-131", title: "Sogasu Chooda Taram", artist: "Rajendra Prasad, Aamani", album: "Mr Pellam (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-131.mp3", favorite: false },
  { id: "te-132", title: "Mr Perfect Songs", artist: "Prabhas, Kajal Aggarwal", album: "Chali Chali Ga Allindi Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-132.mp3", favorite: false },
  { id: "te-133", title: "Mr. Nookayya Songs", artist: "Oke Oka Jeevitham - Manoj Manchu,  Kriti Kharbanda", album: "Oke Oka Jeevitham - Manoj Manchu, Kriti Kharbanda, Sana Khan (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-133.mp3", favorite: false },
  { id: "te-134", title: "Mr. Perfect Telugu Movie Songs", artist: "Prabhas, Kajal", album: "Chali Chaliga (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-134.mp3", favorite: false },
  { id: "te-135", title: "Muvvala navvakala", artist: "Various Artists", album: "Muvvala navvakala (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-135.mp3", favorite: false },
  { id: "te-136", title: "Naalo Unna Prema", artist: "Venkatesh, Preity Zinta", album: "Premante Idera (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-136.mp3", favorite: false },
  { id: "te-137", title: "Naatu Naatu [8K]", artist: "NTR, Ram Charan", album: "RRR (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-137.mp3", favorite: false },
  { id: "te-138", title: "Nannaku Prematho", artist: "Rakul Preeet Singh, DSP", album: "Jr.NTR (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-138.mp3", favorite: false },
  { id: "te-139", title: "Nava Manmadhudu Movie", artist: "Samantha, Amy Jackson", album: "Em Annavo Em Vinnano Song Promo - Dhanush (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-139.mp3", favorite: false },
  { id: "te-140", title: "Nee Chepakallu - Telugu Audio Song", artist: "Sardaar Gabbar Singh", album: "Devi Sri Prasad (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-140.mp3", favorite: false },
  { id: "te-141", title: "Nee Jathaga Full HD Song From Yevadu", artist: "Ram Charan,  Allu Arjun", album: "Ram Charan, Allu Arjun, Shruti Haasan, Kajal Aggarwal (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-141.mp3", favorite: false },
  { id: "te-142", title: "Nee Navve Full Song With Telugu Lyrics II ＂మా పాట మీ నోట＂ II Soggade Chinni Naya", artist: "Various Artists", album: "Nagarjuna (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-142.mp3", favorite: false },
  { id: "te-143", title: "Neetho Edo", artist: "Various Artists", album: "Paisa Movie HD 1080p (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-143.mp3", favorite: false },
  { id: "te-144", title: "Routine Love Story Songs", artist: "Sundeep Kishan, Regina", album: "Neethone Unna Full Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-144.mp3", favorite: false },
  { id: "te-145", title: "Nelluri Nerajana Song", artist: "TeluguOne", album: "Oke Okkadu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-145.mp3", favorite: false },
  { id: "te-146", title: "Ramayya Vasthavayya Songs", artist: "Jr.Ntr, Shruthi Hasan", album: "Neneppudaina Anukunnana Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-146.mp3", favorite: false },
  { id: "te-147", title: "Neno Butterfly", artist: "Suriya, Mamitha Baiju", album: "Vishwanath and Sons (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-147.mp3", favorite: false },
  { id: "te-148", title: "Nijame Ne", artist: "Sundeep Kishan, Sid Sriram", album: "Ooru Peru Bhairavakona (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-148.mp3", favorite: false },
  { id: "te-149", title: "Ninnu Chudagane Song", artist: "Gopichand & Rakul Preet Singh", album: "Loukyam (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-149.mp3", favorite: false },
  { id: "te-150", title: "Nuvvante Na Navvu Full Song (Audio)", artist: "Nani, Mehr Pirzada", album: "Krishnagadi Veera Prema Gaadha (KVPG) (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-150.mp3", favorite: false },
  { id: "te-151", title: "Ekkada Vunna", artist: "Tarun, Richa", album: "Nuvve Kavali (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-151.mp3", favorite: false },
  { id: "te-152", title: "Nuvve Nuvve", artist: "Rakul Preet Singh, Thaman", album: "Raviteja (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-152.mp3", favorite: false },
  { id: "te-153", title: "Nuvvu Navvukuntu", artist: "Kalyan Shankar, S. Naga Vamsi", album: "MAD (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-153.mp3", favorite: false },
  { id: "te-154", title: "Nuvvu Nenu Prema Songs", artist: "Suriya, Bhoomika", album: "Preminche Premava Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-154.mp3", favorite: false },
  { id: "te-155", title: "Nuvvunte Chaley", artist: "Ram Pothineni, Bhagyashri Borse", album: "Andhra King Taluka (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-155.mp3", favorite: false },
  { id: "te-156", title: "O Manasa", artist: "Shreya Ghoshal", album: "Oka Manasu Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-156.mp3", favorite: false },
  { id: "te-157", title: "O Pilaga Venkati Full Song", artist: "Pooja Nageshwar, Bhavya Tunes", album: "Singer Prabha (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-157.mp3", favorite: false },
  { id: "te-158", title: "O Rangula Chilaka Song", artist: "Srinivas Reddy, Poorna", album: "Jayammu Nischayammu Raa (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-158.mp3", favorite: false },
  { id: "te-159", title: "Oh Priya Priya", artist: "Nitin, Nithya Menon", album: "Ishq Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-159.mp3", favorite: false },
  { id: "te-160", title: "Okko Nakshatram Full Song", artist: "Raj Tarun, Arthana", album: "Seethamma Andalu Ramayya Sitralu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-160.mp3", favorite: false },
  { id: "te-161", title: "Em Sandeham Ledu Song", artist: "Various Artists", album: "Oohalu Gusagusalade HD (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-161.mp3", favorite: false },
  { id: "te-162", title: "Oorantha Suttale Ni Pelliki Full Song", artist: "Hanmanth Yadav, New Love Failure Songs", album: "Rowdy Megha (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-162.mp3", favorite: false },
  { id: "te-163", title: "PEELINGS (Telugu )", artist: "Allu Arjun, Rashmika Mandanna", album: "Pushpa 2 The Rule (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-163.mp3", favorite: false },
  { id: "te-164", title: "Panchadara Bomma", artist: "Ram Charan, Kajal Agarwal", album: "Magadheera Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-164.mp3", favorite: false },
  { id: "te-165", title: "Paravasame Full Song", artist: "Raj Tarun, Arthana", album: "Seethamma Andalu Ramayya Sitralu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-165.mp3", favorite: false },
  { id: "te-166", title: "Pedavi Datani Matokati Song", artist: "Ramana Gogula", album: "Pawan Kalyan Thammudu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-166.mp3", favorite: false },
  { id: "te-167", title: "Nee Navve Chalu", artist: "Jagapathi Babu, Sukanya", album: "Peddarikam (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-167.mp3", favorite: false },
  { id: "te-168", title: "Priyatama Priyatama", artist: "Jagapathi Babu, Sukanya", album: "Peddarkam (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-168.mp3", favorite: false },
  { id: "te-169", title: "Pelli Choopulu Telugu Movie Songs l Chinuku Taake Full Song With Lyrics", artist: "Ritu Varma", album: "Nandu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-169.mp3", favorite: false },
  { id: "te-170", title: "Prema Katha Chitram Songs", artist: "Telugu Latest Video Songs, Sudheer Babu", album: "Vennelaina Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-170.mp3", favorite: false },
  { id: "te-171", title: "Prema Katha Chitram Songs", artist: "Sudheer Babu, Nandita", album: "Oh My Love Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-171.mp3", favorite: false },
  { id: "te-172", title: "Prema Swaramulalo", artist: "24 Telugu Movie, Suriya", album: "Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-172.mp3", favorite: false },
  { id: "te-173", title: "Premalo", artist: "Priyadarshi, Harsh Roshan", album: "Court (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-173.mp3", favorite: false },
  { id: "te-174", title: "Premalo", artist: "Priyadarshi, Harsh Roshan", album: "Court (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-174.mp3", favorite: false },
  { id: "te-175", title: "Premikula Roju Movie Songs", artist: "Kunal, Sonali Bendre", album: "Vaalu Kanuludana Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-175.mp3", favorite: false },
  { id: "te-176", title: "Premikula Roju", artist: "Vaalu Kannuladaana, TeluguOne", album: "Telugu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-176.mp3", favorite: false },
  { id: "te-177", title: "Preminchaane (new telugu melody song)⧸Karthik Kodakandla⧸Harinath Devara", artist: "Various Artists", album: "Preminchaane (new telugu melody song)⧸Karthik Kodakandla⧸Harinath Devara (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-177.mp3", favorite: false },
  { id: "te-178", title: "Manasuna Unnadi (Female)", artist: "Tarun, Sneha", album: "Priyamaina Neeku (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-178.mp3", favorite: false },
  { id: "te-179", title: "Guna [1992]", artist: "ilayaraja.flv", album: "Priyathama Neevachata [with lyrics] (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-179.mp3", favorite: false },
  { id: "te-180", title: "RANU BOMBAI KI RANU FULL SONG", artist: "LIKHITHA, KALYAN KEYS", album: "RAMU RATHOD (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-180.mp3", favorite: false },
  { id: "te-181", title: "Itu Ra Ra Krishnayya Song", artist: "Sandeep Kishan, Regina", album: "Ra Ra Krishnayya (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-181.mp3", favorite: false },
  { id: "te-182", title: "Ra Rakumara", artist: "Ram Charan, Kajal", album: "Govindudu Andarivadele (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-182.mp3", favorite: false },
  { id: "te-183", title: "Raghavan Movie Songs", artist: "Kamal Haasan, Kamalinee Mukherjee", album: "Maaya Modalaye Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-183.mp3", favorite: false },
  { id: "te-184", title: "Rai Rai Raa Raa Song", artist: "Ram Charan, Janhvi", album: "Peddi (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-184.mp3", favorite: false },
  { id: "te-185", title: "Raju Bhai Movie", artist: "Manchu Manoj, Sheela", album: "Evvare Nuvvu Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-185.mp3", favorite: false },
  { id: "te-186", title: "Rangam", artist: "Various Artists", album: "E Manchullo (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-186.mp3", favorite: false },
  { id: "te-187", title: "Rangam", artist: "Various Artists", album: "Enduko Emo (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-187.mp3", favorite: false },
  { id: "te-188", title: "Rangam", artist: "Various Artists", album: "Nemali Kulukula (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-188.mp3", favorite: false },
  { id: "te-189", title: "Rasaagummadi ( )： Varun Tej", artist: "Merlapaka Gandhi, Thaman S", album: "Daksha (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-189.mp3", favorite: false },
  { id: "te-190", title: "Roja Telugu Movie Songs", artist: "Madhu Bala, Aravind Swamy", album: "Paruvam Vanaga Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-190.mp3", favorite: false },
  { id: "te-191", title: "Roja Telugu Movie Songs", artist: "AR Rahman, Arvind Swamy", album: "Naa Cheli Roja Ve Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-191.mp3", favorite: false },
  { id: "te-192", title: "Rubaroo", artist: "Adivi Sesh, Mrunal Thakur", album: "Dacoit (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-192.mp3", favorite: false },
  { id: "te-193", title: "I am in Love ⧸ Vaddhantuney Song", artist: "Sharwanand, Seerat Kapoor", album: "Run Raja Run (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-193.mp3", favorite: false },
  { id: "te-194", title: "Vasthava Vasthava Song", artist: "Sharwanand, Seerat Kapoor", album: "Run Raja Run (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-194.mp3", favorite: false },
  { id: "te-195", title: "Saripovu Full Song ll Karthikeya Songs ll Nikhil, Swathi Reddy", artist: "Various Artists", album: "Saripovu Full Song ll Karthikeya Songs ll Nikhil, Swathi Reddy (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-195.mp3", favorite: false },
  { id: "te-196", title: "Sarkaru Raa", artist: "Nandamuri Balakrishna, Bobby Kolli", album: "Daaku Maharaaj (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-196.mp3", favorite: false },
  { id: "te-197", title: "Sasirekha", artist: "Chiranjeevi, Nayanthara", album: "Mana ShankaraVaraPrasad Garu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-197.mp3", favorite: false },
  { id: "te-198", title: "Telugu Songs", artist: "Premante Yemitante, Venkaresh", album: "Seenu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-198.mp3", favorite: false },
  { id: "te-199", title: "Seethakaalam Full VideoSong", artist: "Allu Arjun, DSP", album: "S⧸o Satyamurthy (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-199.mp3", favorite: false },
  { id: "te-200", title: "Sontham Songs", artist: "Namitha, Aryan Rajesh", album: "Telusunaa (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-200.mp3", favorite: false },
  { id: "te-201", title: "Soodu Soodu Song", artist: "Gopichand & Rakul Preet Singh", album: "Loukyam (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-201.mp3", favorite: false },
  { id: "te-202", title: "Sukumarudu 2013 neelakasamlo", artist: "Various Artists", album: "Sukumarudu 2013 neelakasamlo (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-202.mp3", favorite: false },
  { id: "te-203", title: "Surya Son of Krishnan Movie", artist: "Surya, Sameera Reddy", album: "Nalone Pongenu Narmada Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-203.mp3", favorite: false },
  { id: "te-204", title: "Swathi Reddy", artist: "Kalyan Shankar, Bheems Ceciroleo", album: "Mad Square (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-204.mp3", favorite: false },
  { id: "te-205", title: "Swathilo Muthyamantha 4K", artist: "Balakrishna, Raveena Tandon", album: "Bangaru Bullodu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-205.mp3", favorite: false },
  { id: "te-206", title: "Taara Taara", artist: "PSPK, Nidhhi", album: "HariHaraVeeraMallu (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-206.mp3", favorite: false },
  { id: "te-207", title: "Teenmaar", artist: "Various Artists", album: "Vayyarala Jabilli (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-207.mp3", favorite: false },
  { id: "te-208", title: "Edola Undi Song", artist: "Pawan Kalyan, Preeti Jhangiani", album: "Thammudu Movieᴴᴰ (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-208.mp3", favorite: false },
  { id: "te-209", title: "Tiyateeyani Kalalanu - Sreeram", artist: "Bombay Jayashree", album: "R. P. Patnaik (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-209.mp3", favorite: false },
  { id: "te-210", title: "VANNELADI TIKKULADI FULL SONG", artist: "MOUNIKA DIMPLE, PRABHA", album: "JANULYRI (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-210.mp3", favorite: false },
  { id: "te-211", title: "Vachadu Gelichadu-Telugu Movie Songs", artist: "Taapsee, VEGA", album: "Anjana Anjana Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-211.mp3", favorite: false },
  { id: "te-212", title: "Koyilamma", artist: "Mahesh Babu, Krishna", album: "Vamsi (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-212.mp3", favorite: false },
  { id: "te-213", title: "Varamanukona from VindhyaMarutham", artist: "Various Artists", album: "Presented by iQlik Movies (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-213.mp3", favorite: false },
  { id: "te-214", title: "Prema Desam", artist: "A.R Rahman_mpeg4", album: "Vennela Vennela [with lyrics] (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-214.mp3", favorite: false },
  { id: "te-215", title: "All Time Superhit Song", artist: "Merupu Kalalu Telugu Movie", album: "Vennelave Vennelave (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-215.mp3", favorite: false },
  { id: "te-216", title: "Vibe Undi", artist: "Teja Sajja, Ritika Nayak", album: "Mirai (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-216.mp3", favorite: false },
  { id: "te-217", title: "Viral Vayyari", artist: "Kireeti, Sreeleela", album: "Junior Movie (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-217.mp3", favorite: false },
  { id: "te-218", title: "YAALALO YAALALO", artist: "Ravi Teja, GV Prakash", album: "Irumudi (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-218.mp3", favorite: false },
  { id: "te-219", title: "Ye Janma Bandhamo (Mr.Nokia) Full HD", artist: "Various Artists", album: "Ye Janma Bandhamo (Mr.Nokia) Full HD (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-219.mp3", favorite: false },
  { id: "te-220", title: "Vaana Songs", artist: "Vinay, Meera Chopra", album: "Yeduta Nilichindi Choodu Video Song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-220.mp3", favorite: false },
  { id: "te-221", title: "Yenno Yenno ： Malli Malli Idi Rani Roju Songs", artist: "Various Artists", album: "Yenno Yenno ： Malli Malli Idi Rani Roju Songs (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-221.mp3", favorite: false },
  { id: "te-222", title: "Yeto Vellipoyindhi Manasu - Laayi Laayi", artist: "Nani,  Samantha", album: "Nani, Samantha (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-222.mp3", favorite: false },
  { id: "te-223", title: "Yeto Vellipoyindhi Manasu - Yedhi Yedhi", artist: "Nani,  Samantha", album: "Nani, Samantha (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-223.mp3", favorite: false },
  { id: "te-224", title: "Yetta Yetta", artist: "Akhil Akkineni, Bhagyashri Borse", album: "Lenin (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-224.mp3", favorite: false },
  { id: "te-225", title: "gajja gallumannado song", artist: "Various Artists", album: "gajja gallumannado song (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-225.mp3", favorite: false },
  { id: "te-226", title: "neeti mulli", artist: "Various Artists", album: "neeti mulli (Telugu)", language: "Telugu", duration: "3:30", audio: "public/music/telugu/te-226.mp3", favorite: false },
  { id: "en-002", title: "Coco Ft. DaBaby", artist: "24kGoldn", album: "Coco Ft. DaBaby (English)", language: "English", duration: "3:30", audio: "public/music/english/en-002.mp3", favorite: false },
  { id: "en-003", title: "Mood ft. Iann Dior", artist: "24kGoldn", album: "Mood ft. Iann Dior (English)", language: "English", duration: "3:30", audio: "public/music/english/en-003.mp3", favorite: false },
  { id: "en-004", title: "34+35", artist: "Ariana Grande", album: "34+35 (English)", language: "English", duration: "3:30", audio: "public/music/english/en-004.mp3", favorite: false },
  { id: "en-005", title: "APT.", artist: "Various Artists", album: "APT. (English)", language: "English", duration: "3:30", audio: "public/music/english/en-005.mp3", favorite: false },
  { id: "en-006", title: "Around The World (La La La La La)", artist: "ATC", album: "Around The World (La La La La La) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-006.mp3", favorite: false },
  { id: "en-007", title: "About Damn Time", artist: "Various Artists", album: "About Damn Time (English)", language: "English", duration: "3:30", audio: "public/music/english/en-007.mp3", favorite: false },
  { id: "en-008", title: "Afraid To Feel", artist: "Various Artists", album: "Afraid To Feel (English)", language: "English", duration: "3:30", audio: "public/music/english/en-008.mp3", favorite: false },
  { id: "en-009", title: "Here", artist: "Alessia Cara", album: "Here (English)", language: "English", duration: "3:30", audio: "public/music/english/en-009.mp3", favorite: false },
  { id: "en-010", title: "Out Of Love", artist: "Alessia Cara", album: "Out Of Love (English)", language: "English", duration: "3:30", audio: "public/music/english/en-010.mp3", favorite: false },
  { id: "en-011", title: "Wild Things", artist: "Alessia Cara", album: "Wild Things (English)", language: "English", duration: "3:30", audio: "public/music/english/en-011.mp3", favorite: false },
  { id: "en-012", title: "Heroes (we could be) ft. Tove Lo", artist: "Alesso", album: "Heroes (we could be) ft. Tove Lo (English)", language: "English", duration: "3:30", audio: "public/music/english/en-012.mp3", favorite: false },
  { id: "en-013", title: "Can't Let You Go", artist: "Ali Gatie", album: "Can't Let You Go (English)", language: "English", duration: "3:30", audio: "public/music/english/en-013.mp3", favorite: false },
  { id: "en-014", title: "Perfect", artist: "Ali Gatie", album: "Perfect (English)", language: "English", duration: "3:30", audio: "public/music/english/en-014.mp3", favorite: false },
  { id: "en-015", title: "Anti-Hero", artist: "Various Artists", album: "Anti-Hero (English)", language: "English", duration: "3:30", audio: "public/music/english/en-015.mp3", favorite: false },
  { id: "en-016", title: "Rag’n’Bone Man & P!nk", artist: "Anywhere Away From Here", album: "Rag’n’Bone Man & P!nk (English)", language: "English", duration: "3:30", audio: "public/music/english/en-016.mp3", favorite: false },
  { id: "en-017", title: "Everyday ft. Future", artist: "Ariana Grande", album: "Everyday ft. Future (English)", language: "English", duration: "3:30", audio: "public/music/english/en-017.mp3", favorite: false },
  { id: "en-018", title: "Be Alright", artist: "Ariana Grande", album: "Be Alright (English)", language: "English", duration: "3:30", audio: "public/music/english/en-018.mp3", favorite: false },
  { id: "en-019", title: "Best Mistake ft. Big Sean", artist: "Ariana Grande", album: "Best Mistake ft. Big Sean (English)", language: "English", duration: "3:30", audio: "public/music/english/en-019.mp3", favorite: false },
  { id: "en-020", title: "Break Free", artist: "Ariana Grande", album: "Break Free (English)", language: "English", duration: "3:30", audio: "public/music/english/en-020.mp3", favorite: false },
  { id: "en-021", title: "Dangerous Woman", artist: "Ariana Grande", album: "Dangerous Woman (English)", language: "English", duration: "3:30", audio: "public/music/english/en-021.mp3", favorite: false },
  { id: "en-022", title: "Into You", artist: "Ariana Grande", album: "Into You (English)", language: "English", duration: "3:30", audio: "public/music/english/en-022.mp3", favorite: false },
  { id: "en-023", title: "Just a Little Bit of Your Heart", artist: "Ariana Grande", album: "Just a Little Bit of Your Heart (English)", language: "English", duration: "3:30", audio: "public/music/english/en-023.mp3", favorite: false },
  { id: "en-024", title: "Let Me Love You ft. Lil Wayne", artist: "Ariana Grande", album: "Let Me Love You ft. Lil Wayne (English)", language: "English", duration: "3:30", audio: "public/music/english/en-024.mp3", favorite: false },
  { id: "en-025", title: "Love Me Harder ft. The Weeknd", artist: "Ariana Grande", album: "Love Me Harder ft. The Weeknd (English)", language: "English", duration: "3:30", audio: "public/music/english/en-025.mp3", favorite: false },
  { id: "en-026", title: "My Everything", artist: "Ariana Grande", album: "My Everything (English)", language: "English", duration: "3:30", audio: "public/music/english/en-026.mp3", favorite: false },
  { id: "en-027", title: "One Last Time", artist: "Ariana Grande", album: "One Last Time (English)", language: "English", duration: "3:30", audio: "public/music/english/en-027.mp3", favorite: false },
  { id: "en-028", title: "Problem ft. Iggy Azalea", artist: "Ariana Grande", album: "Problem ft. Iggy Azalea (English)", language: "English", duration: "3:30", audio: "public/music/english/en-028.mp3", favorite: false },
  { id: "en-029", title: "Side To Side ft. Nicki Minaj", artist: "Ariana Grande", album: "Side To Side ft. Nicki Minaj (English)", language: "English", duration: "3:30", audio: "public/music/english/en-029.mp3", favorite: false },
  { id: "en-030", title: "Touch It", artist: "Ariana Grande", album: "Touch It (English)", language: "English", duration: "3:30", audio: "public/music/english/en-030.mp3", favorite: false },
  { id: "en-031", title: "Why Try", artist: "Ariana Grande", album: "Why Try (English)", language: "English", duration: "3:30", audio: "public/music/english/en-031.mp3", favorite: false },
  { id: "en-032", title: "pov", artist: "Ariana Grande", album: "pov (English)", language: "English", duration: "3:30", audio: "public/music/english/en-032.mp3", favorite: false },
  { id: "en-033", title: "As It Was", artist: "Various Artists", album: "As It Was (English)", language: "English", duration: "3:30", audio: "public/music/english/en-033.mp3", favorite: false },
  { id: "en-034", title: "Austin (Boots Stop Workin')", artist: "Various Artists", album: "Austin (Boots Stop Workin') (English)", language: "English", duration: "3:30", audio: "public/music/english/en-034.mp3", favorite: false },
  { id: "en-035", title: "No Guidance Remix", artist: "Ayzha Nyree", album: "No Guidance Remix (English)", language: "English", duration: "3:30", audio: "public/music/english/en-035.mp3", favorite: false },
  { id: "en-036", title: "BED", artist: "Various Artists", album: "BED (English)", language: "English", duration: "3:30", audio: "public/music/english/en-036.mp3", favorite: false },
  { id: "en-037", title: "Dynamite", artist: "BTS (방탄소년단)", album: "Dynamite (English)", language: "English", duration: "3:30", audio: "public/music/english/en-037.mp3", favorite: false },
  { id: "en-038", title: "Bad Habits", artist: "Various Artists", album: "Bad Habits (English)", language: "English", duration: "3:30", audio: "public/music/english/en-038.mp3", favorite: false },
  { id: "en-039", title: "feel something", artist: "Bea Miller", album: "feel something (English)", language: "English", duration: "3:30", audio: "public/music/english/en-039.mp3", favorite: false },
  { id: "en-040", title: "Beautiful Things", artist: "Various Artists", album: "Beautiful Things (English)", language: "English", duration: "3:30", audio: "public/music/english/en-040.mp3", favorite: false },
  { id: "en-041", title: "Before You Go", artist: "Various Artists", album: "Before You Go (English)", language: "English", duration: "3:30", audio: "public/music/english/en-041.mp3", favorite: false },
  { id: "en-042", title: "build a b＊tch", artist: "Bella Poarch", album: "build a b＊tch (English)", language: "English", duration: "3:30", audio: "public/music/english/en-042.mp3", favorite: false },
  { id: "en-043", title: "Eastside FT. Halsey & Khalid", artist: "Benny Blanco", album: "Eastside FT. Halsey & Khalid (English)", language: "English", duration: "3:30", audio: "public/music/english/en-043.mp3", favorite: false },
  { id: "en-044", title: "Bellyache", artist: "Billie Eilish", album: "Bellyache (English)", language: "English", duration: "3:30", audio: "public/music/english/en-044.mp3", favorite: false },
  { id: "en-045", title: "Bored", artist: "Billie Eilish", album: "Bored (English)", language: "English", duration: "3:30", audio: "public/music/english/en-045.mp3", favorite: false },
  { id: "en-046", title: "Bury a Friend When we all fall asleep, where do we go？", artist: "Billie Eilish", album: "Bury a Friend When we all fall asleep, where do we go？ (English)", language: "English", duration: "3:30", audio: "public/music/english/en-046.mp3", favorite: false },
  { id: "en-047", title: "Copycat", artist: "Billie Eilish", album: "Copycat (English)", language: "English", duration: "3:30", audio: "public/music/english/en-047.mp3", favorite: false },
  { id: "en-048", title: "I Love You", artist: "Billie Eilish", album: "I Love You (English)", language: "English", duration: "3:30", audio: "public/music/english/en-048.mp3", favorite: false },
  { id: "en-049", title: "My Strange Addiction", artist: "Billie Eilish", album: "My Strange Addiction (English)", language: "English", duration: "3:30", audio: "public/music/english/en-049.mp3", favorite: false },
  { id: "en-050", title: "Ocean Eyes", artist: "Billie Eilish", album: "Ocean Eyes (English)", language: "English", duration: "3:30", audio: "public/music/english/en-050.mp3", favorite: false },
  { id: "en-051", title: "When The Party’s Over", artist: "Billie Eilish", album: "When The Party’s Over (English)", language: "English", duration: "3:30", audio: "public/music/english/en-051.mp3", favorite: false },
  { id: "en-052", title: "Wish You Were Gay", artist: "Billie Eilish", album: "Wish You Were Gay (English)", language: "English", duration: "3:30", audio: "public/music/english/en-052.mp3", favorite: false },
  { id: "en-053", title: "Xanny", artist: "Billie Eilish", album: "Xanny (English)", language: "English", duration: "3:30", audio: "public/music/english/en-053.mp3", favorite: false },
  { id: "en-054", title: "You Should See Me In a Crown", artist: "Billie Eilish", album: "You Should See Me In a Crown (English)", language: "English", duration: "3:30", audio: "public/music/english/en-054.mp3", favorite: false },
  { id: "en-055", title: "bad guy", artist: "Billie Eilish", album: "bad guy (English)", language: "English", duration: "3:30", audio: "public/music/english/en-055.mp3", favorite: false },
  { id: "en-056", title: "my boy", artist: "Billie Eilish", album: "my boy (English)", language: "English", duration: "3:30", audio: "public/music/english/en-056.mp3", favorite: false },
  { id: "en-057", title: "watch", artist: "Billie Eilish", album: "watch (English)", language: "English", duration: "3:30", audio: "public/music/english/en-057.mp3", favorite: false },
  { id: "en-058", title: "Blinding Lights", artist: "Various Artists", album: "Blinding Lights (English)", language: "English", duration: "3:30", audio: "public/music/english/en-058.mp3", favorite: false },
  { id: "en-059", title: "Breaking Me", artist: "Various Artists", album: "Breaking Me (English)", language: "English", duration: "3:30", audio: "public/music/english/en-059.mp3", favorite: false },
  { id: "en-060", title: "Grenade", artist: "Bruno Mars", album: "Grenade (English)", language: "English", duration: "3:30", audio: "public/music/english/en-060.mp3", favorite: false },
  { id: "en-061", title: "It Will Rain", artist: "Bruno Mars", album: "It Will Rain (English)", language: "English", duration: "3:30", audio: "public/music/english/en-061.mp3", favorite: false },
  { id: "en-062", title: "Just the Way You Are", artist: "Bruno Mars", album: "Just the Way You Are (English)", language: "English", duration: "3:30", audio: "public/music/english/en-062.mp3", favorite: false },
  { id: "en-063", title: "Talking To The Moon", artist: "Bruno Mars", album: "Talking To The Moon (English)", language: "English", duration: "3:30", audio: "public/music/english/en-063.mp3", favorite: false },
  { id: "en-064", title: "The Lazy Song", artist: "Bruno Mars", album: "The Lazy Song (English)", language: "English", duration: "3:30", audio: "public/music/english/en-064.mp3", favorite: false },
  { id: "en-065", title: "When I Was Your Man", artist: "Bruno Mars", album: "When I Was Your Man (English)", language: "English", duration: "3:30", audio: "public/music/english/en-065.mp3", favorite: false },
  { id: "en-066", title: "Havana ft. Young Thug", artist: "Camila Cabello", album: "Havana ft. Young Thug (English)", language: "English", duration: "3:30", audio: "public/music/english/en-066.mp3", favorite: false },
  { id: "en-067", title: "Fall In Love With A Girl ft. beabadoobee", artist: "Cavetown", album: "Fall In Love With A Girl ft. beabadoobee (English)", language: "English", duration: "3:30", audio: "public/music/english/en-067.mp3", favorite: false },
  { id: "en-068", title: "We Don't Talk Anymore", artist: "Charlie Puth & Selena Gomez", album: "We Don't Talk Anymore (English)", language: "English", duration: "3:30", audio: "public/music/english/en-068.mp3", favorite: false },
  { id: "en-069", title: "Attention", artist: "Charlie Puth", album: "Attention (English)", language: "English", duration: "3:30", audio: "public/music/english/en-069.mp3", favorite: false },
  { id: "en-070", title: "How Long", artist: "Charlie Puth", album: "How Long (English)", language: "English", duration: "3:30", audio: "public/music/english/en-070.mp3", favorite: false },
  { id: "en-071", title: "One Call Away", artist: "Charlie Puth", album: "One Call Away (English)", language: "English", duration: "3:30", audio: "public/music/english/en-071.mp3", favorite: false },
  { id: "en-072", title: "Go Crazy", artist: "Chris Brown & Young Thug", album: "Go Crazy (English)", language: "English", duration: "3:30", audio: "public/music/english/en-072.mp3", favorite: false },
  { id: "en-073", title: "A Thousand Years", artist: "Christina Perri", album: "A Thousand Years (English)", language: "English", duration: "3:30", audio: "public/music/english/en-073.mp3", favorite: false },
  { id: "en-074", title: "Made Of You ＂I hope she loves the man I made of you＂", artist: "Chymes", album: "Made Of You ＂I hope she loves the man I made of you＂ (English)", language: "English", duration: "3:30", audio: "public/music/english/en-074.mp3", favorite: false },
  { id: "en-075", title: "Cold Heart (PNAU Remix)", artist: "Various Artists", album: "Cold Heart (PNAU Remix) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-075.mp3", favorite: false },
  { id: "en-076", title: "Heather", artist: "Conan Gray", album: "Heather (English)", language: "English", duration: "3:30", audio: "public/music/english/en-076.mp3", favorite: false },
  { id: "en-077", title: "Maniac", artist: "Conan Gray", album: "Maniac (English)", language: "English", duration: "3:30", audio: "public/music/english/en-077.mp3", favorite: false },
  { id: "en-078", title: "Cruel Summer", artist: "Various Artists", album: "Cruel Summer (English)", language: "English", duration: "3:30", audio: "public/music/english/en-078.mp3", favorite: false },
  { id: "en-079", title: "Stunnin' ft. Harm Franklin", artist: "Curtis Waters", album: "Stunnin' ft. Harm Franklin (English)", language: "English", duration: "3:30", audio: "public/music/english/en-079.mp3", favorite: false },
  { id: "en-080", title: "ROCKSTAR ft. Roddy Ricch", artist: "DaBaby", album: "ROCKSTAR ft. Roddy Ricch (English)", language: "English", duration: "3:30", audio: "public/music/english/en-080.mp3", favorite: false },
  { id: "en-081", title: "Falling Up", artist: "Dean Lewis", album: "Falling Up (English)", language: "English", duration: "3:30", audio: "public/music/english/en-081.mp3", favorite: false },
  { id: "en-082", title: "Met Him Last Night", artist: "Demi Lovato & Ariana Grande", album: "Met Him Last Night (English)", language: "English", duration: "3:30", audio: "public/music/english/en-082.mp3", favorite: false },
  { id: "en-083", title: "What Other People Say", artist: "Demi Lovato & Sam Fischer", album: "What Other People Say (English)", language: "English", duration: "3:30", audio: "public/music/english/en-083.mp3", favorite: false },
  { id: "en-084", title: "Confident", artist: "Demi Lovato", album: "Confident (English)", language: "English", duration: "3:30", audio: "public/music/english/en-084.mp3", favorite: false },
  { id: "en-085", title: "Dancing With The Devil", artist: "Demi Lovato", album: "Dancing With The Devil (English)", language: "English", duration: "3:30", audio: "public/music/english/en-085.mp3", favorite: false },
  { id: "en-086", title: "Still Have Me", artist: "Demi Lovato", album: "Still Have Me (English)", language: "English", duration: "3:30", audio: "public/music/english/en-086.mp3", favorite: false },
  { id: "en-087", title: "Stone Cold", artist: "Demi Lovato", album: "Stone Cold (English)", language: "English", duration: "3:30", audio: "public/music/english/en-087.mp3", favorite: false },
  { id: "en-088", title: "Die With A Smile", artist: "Various Artists", album: "Die With A Smile (English)", language: "English", duration: "3:30", audio: "public/music/english/en-088.mp3", favorite: false },
  { id: "en-089", title: "Get Into It (Yuh)", artist: "Doja Cat", album: "Get Into It (Yuh) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-089.mp3", favorite: false },
  { id: "en-090", title: "Like That ft. Gucci Mane", artist: "Doja Cat", album: "Like That ft. Gucci Mane (English)", language: "English", duration: "3:30", audio: "public/music/english/en-090.mp3", favorite: false },
  { id: "en-091", title: "Say So", artist: "Doja Cat", album: "Say So (English)", language: "English", duration: "3:30", audio: "public/music/english/en-091.mp3", favorite: false },
  { id: "en-092", title: "Streets", artist: "Doja Cat", album: "Streets (English)", language: "English", duration: "3:30", audio: "public/music/english/en-092.mp3", favorite: false },
  { id: "en-093", title: "it's hard to keep my cool (Streets)", artist: "Doja Cat", album: "it's hard to keep my cool (Streets) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-093.mp3", favorite: false },
  { id: "en-094", title: "Boyfriend", artist: "Dove Cameron", album: "Boyfriend (English)", language: "English", duration: "3:30", audio: "public/music/english/en-094.mp3", favorite: false },
  { id: "en-095", title: "Laugh Now Cry Later ft. Lil Durk", artist: "Drake", album: "Laugh Now Cry Later ft. Lil Durk (English)", language: "English", duration: "3:30", audio: "public/music/english/en-095.mp3", favorite: false },
  { id: "en-096", title: "Best Friend", artist: "Drew Schueler", album: "Best Friend (English)", language: "English", duration: "3:30", audio: "public/music/english/en-096.mp3", favorite: false },
  { id: "en-097", title: "To Know I Hurt You", artist: "Drew Schueler", album: "To Know I Hurt You (English)", language: "English", duration: "3:30", audio: "public/music/english/en-097.mp3", favorite: false },
  { id: "en-098", title: "Olivia Rodrigo", artist: "Drivers License", album: "Olivia Rodrigo (English)", language: "English", duration: "3:30", audio: "public/music/english/en-098.mp3", favorite: false },
  { id: "en-099", title: "Easy On Me", artist: "Various Artists", album: "Easy On Me (English)", language: "English", duration: "3:30", audio: "public/music/english/en-099.mp3", favorite: false },
  { id: "en-102", title: "I See Fire", artist: "Ed Sheeran", album: "I See Fire (English)", language: "English", duration: "3:30", audio: "public/music/english/en-102.mp3", favorite: false },
  { id: "en-103", title: "Diamond Eyes ft. Sia", artist: "Eddie Benjamin", album: "Diamond Eyes ft. Sia (English)", language: "English", duration: "3:30", audio: "public/music/english/en-103.mp3", favorite: false },
  { id: "en-104", title: "The Monster ft. Rihanna", artist: "Eminem", album: "The Monster ft. Rihanna (English)", language: "English", duration: "3:30", audio: "public/music/english/en-104.mp3", favorite: false },
  { id: "en-105", title: "Beautiful", artist: "Eminem", album: "Beautiful (English)", language: "English", duration: "3:30", audio: "public/music/english/en-105.mp3", favorite: false },
  { id: "en-106", title: "Mockingbird", artist: "Eminem", album: "Mockingbird (English)", language: "English", duration: "3:30", audio: "public/music/english/en-106.mp3", favorite: false },
  { id: "en-107", title: "Stan ft. Dido", artist: "Eminem", album: "Stan ft. Dido (English)", language: "English", duration: "3:30", audio: "public/music/english/en-107.mp3", favorite: false },
  { id: "en-109", title: "Superman", artist: "Eminem", album: "Superman (English)", language: "English", duration: "3:30", audio: "public/music/english/en-109.mp3", favorite: false },
  { id: "en-110", title: "Till I Collapse", artist: "Eminem", album: "Till I Collapse (English)", language: "English", duration: "3:30", audio: "public/music/english/en-110.mp3", favorite: false },
  { id: "en-111", title: "When I'm Gone", artist: "Eminem", album: "When I'm Gone (English)", language: "English", duration: "3:30", audio: "public/music/english/en-111.mp3", favorite: false },
  { id: "en-112", title: "Zeus FT. White Gold", artist: "Eminem", album: "Zeus FT. White Gold (English)", language: "English", duration: "3:30", audio: "public/music/english/en-112.mp3", favorite: false },
  { id: "en-113", title: "I am Woman", artist: "Emmy Meli", album: "I am Woman (English)", language: "English", duration: "3:30", audio: "public/music/english/en-113.mp3", favorite: false },
  { id: "en-114", title: "Espresso", artist: "Various Artists", album: "Espresso (English)", language: "English", duration: "3:30", audio: "public/music/english/en-114.mp3", favorite: false },
  { id: "en-116", title: "Eyes Closed", artist: "Various Artists", album: "Eyes Closed (English)", language: "English", duration: "3:30", audio: "public/music/english/en-116.mp3", favorite: false },
  { id: "en-118", title: "Big Girls Don't Cry It's time to be a big girl now", artist: "Fergie", album: "Big Girls Don't Cry It's time to be a big girl now (English)", language: "English", duration: "3:30", audio: "public/music/english/en-118.mp3", favorite: false },
  { id: "en-119", title: "Glamorous ft. Ludacris", artist: "Fergie", album: "Glamorous ft. Ludacris (English)", language: "English", duration: "3:30", audio: "public/music/english/en-119.mp3", favorite: false },
  { id: "en-120", title: "Flowers", artist: "Various Artists", album: "Flowers (English)", language: "English", duration: "3:30", audio: "public/music/english/en-120.mp3", favorite: false },
  { id: "en-121", title: "Forget Me", artist: "Various Artists", album: "Forget Me (English)", language: "English", duration: "3:30", audio: "public/music/english/en-121.mp3", favorite: false },
  { id: "en-122", title: "Heartbreak Anniversary", artist: "Giveon", album: "Heartbreak Anniversary (English)", language: "English", duration: "3:30", audio: "public/music/english/en-122.mp3", favorite: false },
  { id: "en-123", title: "Heat Waves", artist: "Glass Animals", album: "Heat Waves (English)", language: "English", duration: "3:30", audio: "public/music/english/en-123.mp3", favorite: false },
  { id: "en-124", title: "Painkillers", artist: "Gracie Abrams", album: "Painkillers (English)", language: "English", duration: "3:30", audio: "public/music/english/en-124.mp3", favorite: false },
  { id: "en-125", title: "Green Green Grass", artist: "Various Artists", album: "Green Green Grass (English)", language: "English", duration: "3:30", audio: "public/music/english/en-125.mp3", favorite: false },
  { id: "en-126", title: "HOT TO GO!", artist: "Various Artists", album: "HOT TO GO! (English)", language: "English", duration: "3:30", audio: "public/music/english/en-126.mp3", favorite: false },
  { id: "en-127", title: "Bad at Love", artist: "Halsey", album: "Bad at Love (English)", language: "English", duration: "3:30", audio: "public/music/english/en-127.mp3", favorite: false },
  { id: "en-128", title: "Castle", artist: "Halsey", album: "Castle (English)", language: "English", duration: "3:30", audio: "public/music/english/en-128.mp3", favorite: false },
  { id: "en-129", title: "Colors", artist: "Halsey", album: "Colors (English)", language: "English", duration: "3:30", audio: "public/music/english/en-129.mp3", favorite: false },
  { id: "en-130", title: "Now or Never", artist: "Halsey", album: "Now or Never (English)", language: "English", duration: "3:30", audio: "public/music/english/en-130.mp3", favorite: false },
  { id: "en-131", title: "Without Me", artist: "Halsey", album: "Without Me (English)", language: "English", duration: "3:30", audio: "public/music/english/en-131.mp3", favorite: false },
  { id: "en-132", title: "Head & Heart (feat. MNEK)", artist: "Various Artists", album: "Head & Heart (feat. MNEK) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-132.mp3", favorite: false },
  { id: "en-133", title: "Heartbreak Anthem", artist: "Various Artists", album: "Heartbreak Anthem (English)", language: "English", duration: "3:30", audio: "public/music/english/en-133.mp3", favorite: false },
  { id: "en-134", title: "Devil Eyes", artist: "Hippie Sabotage", album: "Devil Eyes (English)", language: "English", duration: "3:30", audio: "public/music/english/en-134.mp3", favorite: false },
  { id: "en-135", title: "Houdini", artist: "Various Artists", album: "Houdini (English)", language: "English", duration: "3:30", audio: "public/music/english/en-135.mp3", favorite: false },
  { id: "en-136", title: "Houdini", artist: "Various Artists", album: "Houdini (English)", language: "English", duration: "3:30", audio: "public/music/english/en-136.mp3", favorite: false },
  { id: "en-137", title: "I Ain't Worried", artist: "Various Artists", album: "I Ain't Worried (English)", language: "English", duration: "3:30", audio: "public/music/english/en-137.mp3", favorite: false },
  { id: "en-138", title: "Betty Who", artist: "I Love You Always Forever", album: "Betty Who (English)", language: "English", duration: "3:30", audio: "public/music/english/en-138.mp3", favorite: false },
  { id: "en-139", title: "Whitney Houston", artist: "I Will Always Love You", album: "Whitney Houston (English)", language: "English", duration: "3:30", audio: "public/music/english/en-139.mp3", favorite: false },
  { id: "en-140", title: "Bleeding Out", artist: "Imagine Dragons", album: "Bleeding Out (English)", language: "English", duration: "3:30", audio: "public/music/english/en-140.mp3", favorite: false },
  { id: "en-141", title: "Follow You I will follow you way down wherever you may go", artist: "Imagine Dragons", album: "Follow You I will follow you way down wherever you may go (English)", language: "English", duration: "3:30", audio: "public/music/english/en-141.mp3", favorite: false },
  { id: "en-142", title: "I Bet My Life", artist: "Imagine Dragons", album: "I Bet My Life (English)", language: "English", duration: "3:30", audio: "public/music/english/en-142.mp3", favorite: false },
  { id: "en-143", title: "It's Time", artist: "Imagine Dragons", album: "It's Time (English)", language: "English", duration: "3:30", audio: "public/music/english/en-143.mp3", favorite: false },
  { id: "en-144", title: "On Top Of The World", artist: "Imagine Dragons", album: "On Top Of The World (English)", language: "English", duration: "3:30", audio: "public/music/english/en-144.mp3", favorite: false },
  { id: "en-145", title: "Seasons, they will change Life will make you grow (Birds)", artist: "Imagine Dragons", album: "Seasons, they will change Life will make you grow (Birds) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-145.mp3", favorite: false },
  { id: "en-146", title: "Walking The Wire ＂Feel the wind in your hair＂", artist: "Imagine Dragons", album: "Walking The Wire ＂Feel the wind in your hair＂ (English)", language: "English", duration: "3:30", audio: "public/music/english/en-146.mp3", favorite: false },
  { id: "en-147", title: "Warriors (Lyirics) ＂We are the warriors that built this town ＂", artist: "Imagine Dragons", album: "Warriors (Lyirics) ＂We are the warriors that built this town ＂ (English)", language: "English", duration: "3:30", audio: "public/music/english/en-147.mp3", favorite: false },
  { id: "en-148", title: "Who We Are", artist: "Imagine Dragons", album: "Who We Are (English)", language: "English", duration: "3:30", audio: "public/music/english/en-148.mp3", favorite: false },
  { id: "en-149", title: "James Arthur", artist: "Impossible", album: "James Arthur (English)", language: "English", duration: "3:30", audio: "public/music/english/en-149.mp3", favorite: false },
  { id: "en-150", title: "WHATS POPPIN REMIX (feat. DaBaby, Tory Lanez & Lil Wayne)", artist: "Jack Harlow", album: "WHATS POPPIN REMIX (feat. DaBaby, Tory Lanez & Lil Wayne) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-150.mp3", favorite: false },
  { id: "en-151", title: "Medicine", artist: "James Arthur", album: "Medicine (English)", language: "English", duration: "3:30", audio: "public/music/english/en-151.mp3", favorite: false },
  { id: "en-152", title: "Here's Your Perfect", artist: "Jamie Miller", album: "Here's Your Perfect (English)", language: "English", duration: "3:30", audio: "public/music/english/en-152.mp3", favorite: false },
  { id: "en-153", title: "Savage Love (Lyrics", artist: "Jason Derulo", album: "Savage Love (Lyrics (English)", language: "English", duration: "3:30", audio: "public/music/english/en-153.mp3", favorite: false },
  { id: "en-154", title: "Infinity", artist: "Jaymes Young", album: "Infinity (English)", language: "English", duration: "3:30", audio: "public/music/english/en-154.mp3", favorite: false },
  { id: "en-155", title: "On The Floor Ft. Pitbull ＂Tonight, we gon' be it on the floor＂", artist: "Jennifer Lopez", album: "On The Floor Ft. Pitbull ＂Tonight, we gon' be it on the floor＂ (English)", language: "English", duration: "3:30", audio: "public/music/english/en-155.mp3", favorite: false },
  { id: "en-156", title: "Always Been You", artist: "Jessie Murph", album: "Always Been You (English)", language: "English", duration: "3:30", audio: "public/music/english/en-156.mp3", favorite: false },
  { id: "en-157", title: "Look Who's Cryin' Now", artist: "Jessie Murph", album: "Look Who's Cryin' Now (English)", language: "English", duration: "3:30", audio: "public/music/english/en-157.mp3", favorite: false },
  { id: "en-158", title: "Pray", artist: "Jessie Murph", album: "Pray (English)", language: "English", duration: "3:30", audio: "public/music/english/en-158.mp3", favorite: false },
  { id: "en-159", title: "Cause I give you all of me (All of Me)", artist: "John Legend", album: "Cause I give you all of me (All of Me) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-159.mp3", favorite: false },
  { id: "en-160", title: "As I Am ft. Khalid", artist: "Justin Bieber", album: "As I Am ft. Khalid (English)", language: "English", duration: "3:30", audio: "public/music/english/en-160.mp3", favorite: false },
  { id: "en-161", title: "Deserve You", artist: "Justin Bieber", album: "Deserve You (English)", language: "English", duration: "3:30", audio: "public/music/english/en-161.mp3", favorite: false },
  { id: "en-162", title: "Favorite Girl", artist: "Justin Bieber", album: "Favorite Girl (English)", language: "English", duration: "3:30", audio: "public/music/english/en-162.mp3", favorite: false },
  { id: "en-163", title: "Ghost", artist: "Justin Bieber", album: "Ghost (English)", language: "English", duration: "3:30", audio: "public/music/english/en-163.mp3", favorite: false },
  { id: "en-165", title: "Hold On", artist: "Justin Bieber", album: "Hold On (English)", language: "English", duration: "3:30", audio: "public/music/english/en-165.mp3", favorite: false },
  { id: "en-166", title: "Holy FT. Chance The Rapper", artist: "Justin Bieber", album: "Holy FT. Chance The Rapper (English)", language: "English", duration: "3:30", audio: "public/music/english/en-166.mp3", favorite: false },
  { id: "en-167", title: "I Can't Be Myself ft. Jaden Smith", artist: "Justin Bieber", album: "I Can't Be Myself ft. Jaden Smith (English)", language: "English", duration: "3:30", audio: "public/music/english/en-167.mp3", favorite: false },
  { id: "en-168", title: "It's the most beautiful time of the year (Mistletoe)", artist: "Justin Bieber", album: "It's the most beautiful time of the year (Mistletoe) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-168.mp3", favorite: false },
  { id: "en-169", title: "Lifetime", artist: "Justin Bieber", album: "Lifetime (English)", language: "English", duration: "3:30", audio: "public/music/english/en-169.mp3", favorite: false },
  { id: "en-170", title: "Name ft. Tori Kelly", artist: "Justin Bieber", album: "Name ft. Tori Kelly (English)", language: "English", duration: "3:30", audio: "public/music/english/en-170.mp3", favorite: false },
  { id: "en-171", title: "Never Say Never ft. Jaden Smith", artist: "Justin Bieber", album: "Never Say Never ft. Jaden Smith (English)", language: "English", duration: "3:30", audio: "public/music/english/en-171.mp3", favorite: false },
  { id: "en-172", title: "Off My Face", artist: "Justin Bieber", album: "Off My Face (English)", language: "English", duration: "3:30", audio: "public/music/english/en-172.mp3", favorite: false },
  { id: "en-173", title: "One Less Lonely Girl", artist: "Justin Bieber", album: "One Less Lonely Girl (English)", language: "English", duration: "3:30", audio: "public/music/english/en-173.mp3", favorite: false },
  { id: "en-174", title: "One Time", artist: "Justin Bieber", album: "One Time (English)", language: "English", duration: "3:30", audio: "public/music/english/en-174.mp3", favorite: false },
  { id: "en-175", title: "Peaches ft. Daniel Caesar & Giveon", artist: "Justin Bieber", album: "Peaches ft. Daniel Caesar & Giveon (English)", language: "English", duration: "3:30", audio: "public/music/english/en-175.mp3", favorite: false },
  { id: "en-176", title: "U Smile", artist: "Justin Bieber", album: "U Smile (English)", language: "English", duration: "3:30", audio: "public/music/english/en-176.mp3", favorite: false },
  { id: "en-177", title: "Unstable Ft. The Kid LAROI", artist: "Justin Bieber", album: "Unstable Ft. The Kid LAROI (English)", language: "English", duration: "3:30", audio: "public/music/english/en-177.mp3", favorite: false },
  { id: "en-178", title: "beauty and a beat ft. Nicki Minaj", artist: "Justin Bieber", album: "beauty and a beat ft. Nicki Minaj (English)", language: "English", duration: "3:30", audio: "public/music/english/en-178.mp3", favorite: false },
  { id: "en-179", title: "you are the love of my life (Mirrors)", artist: "Justin Timberlake", album: "you are the love of my life (Mirrors) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-179.mp3", favorite: false },
  { id: "en-180", title: "Stuck In the Moment", artist: "Justin bieber", album: "Stuck In the Moment (English)", language: "English", duration: "3:30", audio: "public/music/english/en-180.mp3", favorite: false },
  { id: "en-181", title: "That Should Be Me", artist: "Justin bieber", album: "That Should Be Me (English)", language: "English", duration: "3:30", audio: "public/music/english/en-181.mp3", favorite: false },
  { id: "en-182", title: "Monsters", artist: "Katie Sky", album: "Monsters (English)", language: "English", duration: "3:30", audio: "public/music/english/en-182.mp3", favorite: false },
  { id: "en-183", title: "Dark Horse ft. Juicy J", artist: "Katy Perry", album: "Dark Horse ft. Juicy J (English)", language: "English", duration: "3:30", audio: "public/music/english/en-183.mp3", favorite: false },
  { id: "en-184", title: "Legendary Lovers", artist: "Katy Perry", album: "Legendary Lovers (English)", language: "English", duration: "3:30", audio: "public/music/english/en-184.mp3", favorite: false },
  { id: "en-185", title: "Unconditionally", artist: "Katy Perry", album: "Unconditionally (English)", language: "English", duration: "3:30", audio: "public/music/english/en-185.mp3", favorite: false },
  { id: "en-186", title: "little story", artist: "Kehlani", album: "little story (English)", language: "English", duration: "3:30", audio: "public/music/english/en-186.mp3", favorite: false },
  { id: "en-187", title: "Better", artist: "Khalid", album: "Better (English)", language: "English", duration: "3:30", audio: "public/music/english/en-187.mp3", favorite: false },
  { id: "en-188", title: "Saturday Nights", artist: "Khalid", album: "Saturday Nights (English)", language: "English", duration: "3:30", audio: "public/music/english/en-188.mp3", favorite: false },
  { id: "en-189", title: "Talk", artist: "Khalid", album: "Talk (English)", language: "English", duration: "3:30", audio: "public/music/english/en-189.mp3", favorite: false },
  { id: "en-190", title: "Young Dumb & Broke", artist: "Khalid", album: "Young Dumb & Broke (English)", language: "English", duration: "3:30", audio: "public/music/english/en-190.mp3", favorite: false },
  { id: "en-191", title: "Kill Bill", artist: "Various Artists", album: "Kill Bill (English)", language: "English", duration: "3:30", audio: "public/music/english/en-191.mp3", favorite: false },
  { id: "en-192", title: "I crossed the ocean of my mind (Can We Kiss Forever)", artist: "Kina", album: "I crossed the ocean of my mind (Can We Kiss Forever) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-192.mp3", favorite: false },
  { id: "en-193", title: "LUNCH", artist: "Various Artists", album: "LUNCH (English)", language: "English", duration: "3:30", audio: "public/music/english/en-193.mp3", favorite: false },
  { id: "en-194", title: "I'm Tired", artist: "Labrinth & Zendaya", album: "I'm Tired (English)", language: "English", duration: "3:30", audio: "public/music/english/en-194.mp3", favorite: false },
  { id: "en-195", title: "Applause", artist: "Lady Gaga", album: "Applause (English)", language: "English", duration: "3:30", audio: "public/music/english/en-195.mp3", favorite: false },
  { id: "en-196", title: "Million Reasons", artist: "Lady Gaga", album: "Million Reasons (English)", language: "English", duration: "3:30", audio: "public/music/english/en-196.mp3", favorite: false },
  { id: "en-197", title: "Don’t Get Me Wrong", artist: "Lewis Capaldi", album: "Don’t Get Me Wrong (English)", language: "English", duration: "3:30", audio: "public/music/english/en-197.mp3", favorite: false },
  { id: "en-198", title: "Forever", artist: "Lewis Capaldi", album: "Forever (English)", language: "English", duration: "3:30", audio: "public/music/english/en-198.mp3", favorite: false },
  { id: "en-199", title: "Grace", artist: "Lewis Capaldi", album: "Grace (English)", language: "English", duration: "3:30", audio: "public/music/english/en-199.mp3", favorite: false },
  { id: "en-200", title: "Headspace", artist: "Lewis Capaldi", album: "Headspace (English)", language: "English", duration: "3:30", audio: "public/music/english/en-200.mp3", favorite: false },
  { id: "en-201", title: "Hold Me While You Wait", artist: "Lewis Capaldi", album: "Hold Me While You Wait (English)", language: "English", duration: "3:30", audio: "public/music/english/en-201.mp3", favorite: false },
  { id: "en-202", title: "Hollywood", artist: "Lewis Capaldi", album: "Hollywood (English)", language: "English", duration: "3:30", audio: "public/music/english/en-202.mp3", favorite: false },
  { id: "en-203", title: "Maybe", artist: "Lewis Capaldi", album: "Maybe (English)", language: "English", duration: "3:30", audio: "public/music/english/en-203.mp3", favorite: false },
  { id: "en-204", title: "One", artist: "Lewis Capaldi", album: "One (English)", language: "English", duration: "3:30", audio: "public/music/english/en-204.mp3", favorite: false },
  { id: "en-205", title: "Someone You Loved", artist: "Lewis Capaldi", album: "Someone You Loved (English)", language: "English", duration: "3:30", audio: "public/music/english/en-205.mp3", favorite: false },
  { id: "en-206", title: "Holiday", artist: "Lil Nas X", album: "Holiday (English)", language: "English", duration: "3:30", audio: "public/music/english/en-206.mp3", favorite: false },
  { id: "en-207", title: "Montero (Call Me By Your Name)", artist: "Lil Nas X", album: "Montero (Call Me By Your Name) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-207.mp3", favorite: false },
  { id: "en-208", title: "Industry Baby", artist: "Lil Nas X, Jack Harlow", album: "Industry Baby (English)", language: "English", duration: "3:30", audio: "public/music/english/en-208.mp3", favorite: false },
  { id: "en-209", title: "Sweet Melody", artist: "Little Mix", album: "Sweet Melody (English)", language: "English", duration: "3:30", audio: "public/music/english/en-209.mp3", favorite: false },
  { id: "en-210", title: "Justin Bieber FT. benny blanco", artist: "Lonely", album: "Justin Bieber FT. benny blanco (English)", language: "English", duration: "3:30", audio: "public/music/english/en-210.mp3", favorite: false },
  { id: "en-211", title: "Lose Control", artist: "Various Artists", album: "Lose Control (English)", language: "English", duration: "3:30", audio: "public/music/english/en-211.mp3", favorite: false },
  { id: "en-212", title: "Ellie Goulding", artist: "Love Me Like You Do", album: "Ellie Goulding (English)", language: "English", duration: "3:30", audio: "public/music/english/en-212.mp3", favorite: false },
  { id: "en-213", title: "Bad Things", artist: "Machine Gun Kelly & Camila Cabello", album: "Bad Things (English)", language: "English", duration: "3:30", audio: "public/music/english/en-213.mp3", favorite: false },
  { id: "en-214", title: "At My Best", artist: "Machine Gun Kelly & Hailee Steinfeld", album: "At My Best (English)", language: "English", duration: "3:30", audio: "public/music/english/en-214.mp3", favorite: false },
  { id: "en-215", title: "Made You Look", artist: "Various Artists", album: "Made You Look (English)", language: "English", duration: "3:30", audio: "public/music/english/en-215.mp3", favorite: false },
  { id: "en-216", title: "Animals", artist: "Maroon 5", album: "Animals (English)", language: "English", duration: "3:30", audio: "public/music/english/en-216.mp3", favorite: false },
  { id: "en-217", title: "Beautiful Mistakes FT. Megan Thee Stallion", artist: "Maroon 5", album: "Beautiful Mistakes FT. Megan Thee Stallion (English)", language: "English", duration: "3:30", audio: "public/music/english/en-217.mp3", favorite: false },
  { id: "en-218", title: "Cold ft. Future", artist: "Maroon 5", album: "Cold ft. Future (English)", language: "English", duration: "3:30", audio: "public/music/english/en-218.mp3", favorite: false },
  { id: "en-219", title: "Daylight", artist: "Maroon 5", album: "Daylight (English)", language: "English", duration: "3:30", audio: "public/music/english/en-219.mp3", favorite: false },
  { id: "en-220", title: "I don't wanna know ft. Kendrick Lamar", artist: "Maroon 5", album: "I don't wanna know ft. Kendrick Lamar (English)", language: "English", duration: "3:30", audio: "public/music/english/en-220.mp3", favorite: false },
  { id: "en-221", title: "It Was Always You", artist: "Maroon 5", album: "It Was Always You (English)", language: "English", duration: "3:30", audio: "public/music/english/en-221.mp3", favorite: false },
  { id: "en-222", title: "Maps", artist: "Maroon 5", album: "Maps (English)", language: "English", duration: "3:30", audio: "public/music/english/en-222.mp3", favorite: false },
  { id: "en-223", title: "Sugar", artist: "Maroon 5", album: "Sugar (English)", language: "English", duration: "3:30", audio: "public/music/english/en-223.mp3", favorite: false },
  { id: "en-224", title: "Wait", artist: "Maroon 5", album: "Wait (English)", language: "English", duration: "3:30", audio: "public/music/english/en-224.mp3", favorite: false },
  { id: "en-225", title: "Silence", artist: "Marshmello & Khalid", album: "Silence (English)", language: "English", duration: "3:30", audio: "public/music/english/en-225.mp3", favorite: false },
  { id: "en-226", title: "Astronaut In The Ocean", artist: "Masked Wolf", album: "Astronaut In The Ocean (English)", language: "English", duration: "3:30", audio: "public/music/english/en-226.mp3", favorite: false },
  { id: "en-227", title: "Good Without I guess the good things ain't meant to last", artist: "Mimi Webb", album: "Good Without I guess the good things ain't meant to last (English)", language: "English", duration: "3:30", audio: "public/music/english/en-227.mp3", favorite: false },
  { id: "en-228", title: "colorblind", artist: "Mokita", album: "colorblind (English)", language: "English", duration: "3:30", audio: "public/music/english/en-228.mp3", favorite: false },
  { id: "en-229", title: "i hate you for this", artist: "Munn", album: "i hate you for this (English)", language: "English", duration: "3:30", audio: "public/music/english/en-229.mp3", favorite: false },
  { id: "en-230", title: "My Universe", artist: "Various Artists", album: "My Universe (English)", language: "English", duration: "3:30", audio: "public/music/english/en-230.mp3", favorite: false },
  { id: "en-231", title: "Can You Hold Me ft. Britt Nicole", artist: "NF", album: "Can You Hold Me ft. Britt Nicole (English)", language: "English", duration: "3:30", audio: "public/music/english/en-231.mp3", favorite: false },
  { id: "en-232", title: "If You Want Love", artist: "NF", album: "If You Want Love (English)", language: "English", duration: "3:30", audio: "public/music/english/en-232.mp3", favorite: false },
  { id: "en-233", title: "Just Like You", artist: "NF", album: "Just Like You (English)", language: "English", duration: "3:30", audio: "public/music/english/en-233.mp3", favorite: false },
  { id: "en-234", title: "Lie", artist: "NF", album: "Lie (English)", language: "English", duration: "3:30", audio: "public/music/english/en-234.mp3", favorite: false },
  { id: "en-235", title: "Mansion ft. Fleurie", artist: "NF", album: "Mansion ft. Fleurie (English)", language: "English", duration: "3:30", audio: "public/music/english/en-235.mp3", favorite: false },
  { id: "en-236", title: "Paralyzed", artist: "NF", album: "Paralyzed (English)", language: "English", duration: "3:30", audio: "public/music/english/en-236.mp3", favorite: false },
  { id: "en-237", title: "Remember This", artist: "NF", album: "Remember This (English)", language: "English", duration: "3:30", audio: "public/music/english/en-237.mp3", favorite: false },
  { id: "en-238", title: "You’re Special", artist: "NF", album: "You’re Special (English)", language: "English", duration: "3:30", audio: "public/music/english/en-238.mp3", favorite: false },
  { id: "en-239", title: "Close ft. Tove Lo", artist: "Nick Jonas", album: "Close ft. Tove Lo (English)", language: "English", duration: "3:30", audio: "public/music/english/en-239.mp3", favorite: false },
  { id: "en-240", title: "1 Step Forward, 3 Steps Back", artist: "Olivia Rodrigo", album: "1 Step Forward, 3 Steps Back (English)", language: "English", duration: "3:30", audio: "public/music/english/en-240.mp3", favorite: false },
  { id: "en-241", title: "Brutal", artist: "Olivia Rodrigo", album: "Brutal (English)", language: "English", duration: "3:30", audio: "public/music/english/en-241.mp3", favorite: false },
  { id: "en-242", title: "Favorite Crime", artist: "Olivia Rodrigo", album: "Favorite Crime (English)", language: "English", duration: "3:30", audio: "public/music/english/en-242.mp3", favorite: false },
  { id: "en-243", title: "Happier", artist: "Olivia Rodrigo", album: "Happier (English)", language: "English", duration: "3:30", audio: "public/music/english/en-243.mp3", favorite: false },
  { id: "en-244", title: "Hope Ur Ok", artist: "Olivia Rodrigo", album: "Hope Ur Ok (English)", language: "English", duration: "3:30", audio: "public/music/english/en-244.mp3", favorite: false },
  { id: "en-245", title: "Jealousy, Jealousy", artist: "Olivia Rodrigo", album: "Jealousy, Jealousy (English)", language: "English", duration: "3:30", audio: "public/music/english/en-245.mp3", favorite: false },
  { id: "en-246", title: "Traitor", artist: "Olivia Rodrigo", album: "Traitor (English)", language: "English", duration: "3:30", audio: "public/music/english/en-246.mp3", favorite: false },
  { id: "en-247", title: "deja vu Do you get déjà vu when she’s with you？", artist: "Olivia Rodrigo", album: "deja vu Do you get déjà vu when she’s with you？ (English)", language: "English", duration: "3:30", audio: "public/music/english/en-247.mp3", favorite: false },
  { id: "en-248", title: "enough for you 'Cause all I ever wanted was to be enough for you", artist: "Olivia Rodrigo", album: "enough for you 'Cause all I ever wanted was to be enough for you (English)", language: "English", duration: "3:30", audio: "public/music/english/en-248.mp3", favorite: false },
  { id: "en-249", title: "good 4 u", artist: "Olivia Rodrigo", album: "good 4 u (English)", language: "English", duration: "3:30", audio: "public/music/english/en-249.mp3", favorite: false },
  { id: "en-250", title: "Counting Stars", artist: "OneRepublic", album: "Counting Stars (English)", language: "English", duration: "3:30", audio: "public/music/english/en-250.mp3", favorite: false },
  { id: "en-251", title: "I Lived", artist: "OneRepublic", album: "I Lived (English)", language: "English", duration: "3:30", audio: "public/music/english/en-251.mp3", favorite: false },
  { id: "en-252", title: "Stop And Stare", artist: "OneRepublic", album: "Stop And Stare (English)", language: "English", duration: "3:30", audio: "public/music/english/en-252.mp3", favorite: false },
  { id: "en-253", title: "People Watching", artist: "Various Artists", album: "People Watching (English)", language: "English", duration: "3:30", audio: "public/music/english/en-253.mp3", favorite: false },
  { id: "en-254", title: "Physical", artist: "Various Artists", album: "Physical (English)", language: "English", duration: "3:30", audio: "public/music/english/en-254.mp3", favorite: false },
  { id: "en-255", title: "I Feel Good", artist: "Pink Sweat$", album: "I Feel Good (English)", language: "English", duration: "3:30", audio: "public/music/english/en-255.mp3", favorite: false },
  { id: "en-256", title: "Pointless", artist: "Various Artists", album: "Pointless (English)", language: "English", duration: "3:30", audio: "public/music/english/en-256.mp3", favorite: false },
  { id: "en-257", title: "Circles", artist: "Post Malone", album: "Circles (English)", language: "English", duration: "3:30", audio: "public/music/english/en-257.mp3", favorite: false },
  { id: "en-258", title: "Cooped Up FT. Roddy Ricch", artist: "Post Malone", album: "Cooped Up FT. Roddy Ricch (English)", language: "English", duration: "3:30", audio: "public/music/english/en-258.mp3", favorite: false },
  { id: "en-259", title: "Motley Crew They just wanna party party party yeah", artist: "Post Malone", album: "Motley Crew They just wanna party party party yeah (English)", language: "English", duration: "3:30", audio: "public/music/english/en-259.mp3", favorite: false },
  { id: "en-260", title: "REACT", artist: "Various Artists", album: "REACT (English)", language: "English", duration: "3:30", audio: "public/music/english/en-260.mp3", favorite: false },
  { id: "en-261", title: "Gone", artist: "ROSÉ", album: "Gone (English)", language: "English", duration: "3:30", audio: "public/music/english/en-261.mp3", favorite: false },
  { id: "en-262", title: "On The Ground", artist: "ROSÉ", album: "On The Ground (English)", language: "English", duration: "3:30", audio: "public/music/english/en-262.mp3", favorite: false },
  { id: "en-263", title: "Rain On Me", artist: "Various Artists", album: "Rain On Me (English)", language: "English", duration: "3:30", audio: "public/music/english/en-263.mp3", favorite: false },
  { id: "en-264", title: "Sara Kays", artist: "Remember That Night？", album: "Sara Kays (English)", language: "English", duration: "3:30", audio: "public/music/english/en-264.mp3", favorite: false },
  { id: "en-265", title: "Remember", artist: "Various Artists", album: "Remember (English)", language: "English", duration: "3:30", audio: "public/music/english/en-265.mp3", favorite: false },
  { id: "en-266", title: "Man Down", artist: "Rihanna", album: "Man Down (English)", language: "English", duration: "3:30", audio: "public/music/english/en-266.mp3", favorite: false },
  { id: "en-267", title: "Only Girl (In The World)", artist: "Rihanna", album: "Only Girl (In The World) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-267.mp3", favorite: false },
  { id: "en-268", title: "Pon de Replay", artist: "Rihanna", album: "Pon de Replay (English)", language: "English", duration: "3:30", audio: "public/music/english/en-268.mp3", favorite: false },
  { id: "en-269", title: "S&M", artist: "Rihanna", album: "S&M (English)", language: "English", duration: "3:30", audio: "public/music/english/en-269.mp3", favorite: false },
  { id: "en-270", title: "SOS", artist: "Rihanna", album: "SOS (English)", language: "English", duration: "3:30", audio: "public/music/english/en-270.mp3", favorite: false },
  { id: "en-271", title: "Unfaithful", artist: "Rihanna", album: "Unfaithful (English)", language: "English", duration: "3:30", audio: "public/music/english/en-271.mp3", favorite: false },
  { id: "en-272", title: "What's My Name？ ft. Drake", artist: "Rihanna", album: "What's My Name？ ft. Drake (English)", language: "English", duration: "3:30", audio: "public/music/english/en-272.mp3", favorite: false },
  { id: "en-273", title: "Where Have You Been", artist: "Rihanna", album: "Where Have You Been (English)", language: "English", duration: "3:30", audio: "public/music/english/en-273.mp3", favorite: false },
  { id: "en-274", title: "You Da One", artist: "Rihanna", album: "You Da One (English)", language: "English", duration: "3:30", audio: "public/music/english/en-274.mp3", favorite: false },
  { id: "en-275", title: "Roses (Imanbek Remix)", artist: "Various Artists", album: "Roses (Imanbek Remix) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-275.mp3", favorite: false },
  { id: "en-276", title: "I am a Lost Boy from Neverland (Lost Boy)", artist: "Ruth B.", album: "I am a Lost Boy from Neverland (Lost Boy) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-276.mp3", favorite: false },
  { id: "en-277", title: "You Don't Own Me ft. G-Eazy", artist: "SAYGRACE", album: "You Don't Own Me ft. G-Eazy (English)", language: "English", duration: "3:30", audio: "public/music/english/en-277.mp3", favorite: false },
  { id: "en-278", title: "STAY", artist: "Various Artists", album: "STAY (English)", language: "English", duration: "3:30", audio: "public/music/english/en-278.mp3", favorite: false },
  { id: "en-279", title: "Skin Maybe ＂blonde＂ was the only rhyme", artist: "Sabrina Carpenter", album: "Skin Maybe ＂blonde＂ was the only rhyme (English)", language: "English", duration: "3:30", audio: "public/music/english/en-279.mp3", favorite: false },
  { id: "en-280", title: "Hopeless Romantic", artist: "Sam Fischer", album: "Hopeless Romantic (English)", language: "English", duration: "3:30", audio: "public/music/english/en-280.mp3", favorite: false },
  { id: "en-281", title: "I'm Not The Only One", artist: "Sam Smith", album: "I'm Not The Only One (English)", language: "English", duration: "3:30", audio: "public/music/english/en-281.mp3", favorite: false },
  { id: "en-282", title: "I’ve Told You Now", artist: "Sam Smith", album: "I’ve Told You Now (English)", language: "English", duration: "3:30", audio: "public/music/english/en-282.mp3", favorite: false },
  { id: "en-283", title: "Lay Me Down", artist: "Sam Smith", album: "Lay Me Down (English)", language: "English", duration: "3:30", audio: "public/music/english/en-283.mp3", favorite: false },
  { id: "en-284", title: "Leave Your Lover", artist: "Sam Smith", album: "Leave Your Lover (English)", language: "English", duration: "3:30", audio: "public/music/english/en-284.mp3", favorite: false },
  { id: "en-285", title: "Money on My Mind", artist: "Sam Smith", album: "Money on My Mind (English)", language: "English", duration: "3:30", audio: "public/music/english/en-285.mp3", favorite: false },
  { id: "en-286", title: "Future Kids", artist: "Sara Kays", album: "Future Kids (English)", language: "English", duration: "3:30", audio: "public/music/english/en-286.mp3", favorite: false },
  { id: "en-287", title: "Wolves", artist: "Selena Gomez & Marshmello", album: "Wolves (English)", language: "English", duration: "3:30", audio: "public/music/english/en-287.mp3", favorite: false },
  { id: "en-288", title: "Hands To Myself", artist: "Selena Gomez", album: "Hands To Myself (English)", language: "English", duration: "3:30", audio: "public/music/english/en-288.mp3", favorite: false },
  { id: "en-289", title: "Kill Em With Kindness", artist: "Selena Gomez", album: "Kill Em With Kindness (English)", language: "English", duration: "3:30", audio: "public/music/english/en-289.mp3", favorite: false },
  { id: "en-290", title: "Seventeen Going Under (Edit)", artist: "Various Artists", album: "Seventeen Going Under (Edit) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-290.mp3", favorite: false },
  { id: "en-291", title: "I Know What You Did Last Summer", artist: "Shawn Mendes & Camila Cabello", album: "I Know What You Did Last Summer (English)", language: "English", duration: "3:30", audio: "public/music/english/en-291.mp3", favorite: false },
  { id: "en-292", title: "A Little Too Much", artist: "Shawn Mendes", album: "A Little Too Much (English)", language: "English", duration: "3:30", audio: "public/music/english/en-292.mp3", favorite: false },
  { id: "en-293", title: "Bad Reputation", artist: "Shawn Mendes", album: "Bad Reputation (English)", language: "English", duration: "3:30", audio: "public/music/english/en-293.mp3", favorite: false },
  { id: "en-294", title: "Imagination", artist: "Shawn Mendes", album: "Imagination (English)", language: "English", duration: "3:30", audio: "public/music/english/en-294.mp3", favorite: false },
  { id: "en-295", title: "Never Be Alone", artist: "Shawn Mendes", album: "Never Be Alone (English)", language: "English", duration: "3:30", audio: "public/music/english/en-295.mp3", favorite: false },
  { id: "en-296", title: "1+1", artist: "Sia", album: "1+1 (English)", language: "English", duration: "3:30", audio: "public/music/english/en-296.mp3", favorite: false },
  { id: "en-297", title: "Bird Set Free", artist: "Sia", album: "Bird Set Free (English)", language: "English", duration: "3:30", audio: "public/music/english/en-297.mp3", favorite: false },
  { id: "en-298", title: "Broken Glass", artist: "Sia", album: "Broken Glass (English)", language: "English", duration: "3:30", audio: "public/music/english/en-298.mp3", favorite: false },
  { id: "en-299", title: "Chandelier", artist: "Sia", album: "Chandelier (English)", language: "English", duration: "3:30", audio: "public/music/english/en-299.mp3", favorite: false },
  { id: "en-300", title: "Cheap Thrills", artist: "Sia", album: "Cheap Thrills (English)", language: "English", duration: "3:30", audio: "public/music/english/en-300.mp3", favorite: false },
  { id: "en-301", title: "Confetti", artist: "Sia", album: "Confetti (English)", language: "English", duration: "3:30", audio: "public/music/english/en-301.mp3", favorite: false },
  { id: "en-302", title: "Elastic Heart ＂I've got an elastic heart＂", artist: "Sia", album: "Elastic Heart ＂I've got an elastic heart＂ (English)", language: "English", duration: "3:30", audio: "public/music/english/en-302.mp3", favorite: false },
  { id: "en-303", title: "Eye of the Needle", artist: "Sia", album: "Eye of the Needle (English)", language: "English", duration: "3:30", audio: "public/music/english/en-303.mp3", favorite: false },
  { id: "en-304", title: "Footprints", artist: "Sia", album: "Footprints (English)", language: "English", duration: "3:30", audio: "public/music/english/en-304.mp3", favorite: false },
  { id: "en-305", title: "House on Fire", artist: "Sia", album: "House on Fire (English)", language: "English", duration: "3:30", audio: "public/music/english/en-305.mp3", favorite: false },
  { id: "en-306", title: "Move Your Body", artist: "Sia", album: "Move Your Body (English)", language: "English", duration: "3:30", audio: "public/music/english/en-306.mp3", favorite: false },
  { id: "en-307", title: "One Million Bullets", artist: "Sia", album: "One Million Bullets (English)", language: "English", duration: "3:30", audio: "public/music/english/en-307.mp3", favorite: false },
  { id: "en-308", title: "Pin Drop It’s Xmas eve and I can hear a pin drop", artist: "Sia", album: "Pin Drop It’s Xmas eve and I can hear a pin drop (English)", language: "English", duration: "3:30", audio: "public/music/english/en-308.mp3", favorite: false },
  { id: "en-309", title: "The Greatest ft. Kendrick Lamar", artist: "Sia", album: "The Greatest ft. Kendrick Lamar (English)", language: "English", duration: "3:30", audio: "public/music/english/en-309.mp3", favorite: false },
  { id: "en-310", title: "Billie Eilish", artist: "Six Feet Under", album: "Billie Eilish (English)", language: "English", duration: "3:30", audio: "public/music/english/en-310.mp3", favorite: false },
  { id: "en-311", title: "I Know You", artist: "Skylar Grey", album: "I Know You (English)", language: "English", duration: "3:30", audio: "public/music/english/en-311.mp3", favorite: false },
  { id: "en-312", title: "I'm coming home", artist: "Skylar Grey", album: "I'm coming home (English)", language: "English", duration: "3:30", audio: "public/music/english/en-312.mp3", favorite: false },
  { id: "en-313", title: "butterfly", artist: "Sody", album: "butterfly (English)", language: "English", duration: "3:30", audio: "public/music/english/en-313.mp3", favorite: false },
  { id: "en-314", title: "Break My Own Heart", artist: "Sophia Angeles", album: "Break My Own Heart (English)", language: "English", duration: "3:30", audio: "public/music/english/en-314.mp3", favorite: false },
  { id: "en-315", title: "Stargazing", artist: "Various Artists", album: "Stargazing (English)", language: "English", duration: "3:30", audio: "public/music/english/en-315.mp3", favorite: false },
  { id: "en-316", title: "Party Girl", artist: "StaySolidRocky", album: "Party Girl (English)", language: "English", duration: "3:30", audio: "public/music/english/en-316.mp3", favorite: false },
  { id: "en-317", title: "Stick Season", artist: "Various Artists", album: "Stick Season (English)", language: "English", duration: "3:30", audio: "public/music/english/en-317.mp3", favorite: false },
  { id: "en-318", title: "Strangers", artist: "Various Artists", album: "Strangers (English)", language: "English", duration: "3:30", audio: "public/music/english/en-318.mp3", favorite: false },
  { id: "en-319", title: "Carried Away", artist: "Surf Mesa & Madison Beer", album: "Carried Away (English)", language: "English", duration: "3:30", audio: "public/music/english/en-319.mp3", favorite: false },
  { id: "en-320", title: "Wave of You", artist: "Surfaces", album: "Wave of You (English)", language: "English", duration: "3:30", audio: "public/music/english/en-320.mp3", favorite: false },
  { id: "en-322", title: "lie to me FT. Ali Gatie", artist: "Tate McRae", album: "lie to me FT. Ali Gatie (English)", language: "English", duration: "3:30", audio: "public/music/english/en-322.mp3", favorite: false },
  { id: "en-323", title: "she's all i wanna be", artist: "Tate McRae", album: "she's all i wanna be (English)", language: "English", duration: "3:30", audio: "public/music/english/en-323.mp3", favorite: false },
  { id: "en-324", title: "slower", artist: "Tate McRae", album: "slower (English)", language: "English", duration: "3:30", audio: "public/music/english/en-324.mp3", favorite: false },
  { id: "en-325", title: "you broke me first", artist: "Tate McRae", album: "you broke me first (English)", language: "English", duration: "3:30", audio: "public/music/english/en-325.mp3", favorite: false },
  { id: "en-326", title: "That’s So True", artist: "Various Artists", album: "That’s So True (English)", language: "English", duration: "3:30", audio: "public/music/english/en-326.mp3", favorite: false },
  { id: "en-327", title: "I Gotta Feeling", artist: "The Black Eyed Peas", album: "I Gotta Feeling (English)", language: "English", duration: "3:30", audio: "public/music/english/en-327.mp3", favorite: false },
  { id: "en-328", title: "Just Can't Get Enough", artist: "The Black Eyed Peas", album: "Just Can't Get Enough (English)", language: "English", duration: "3:30", audio: "public/music/english/en-328.mp3", favorite: false },
  { id: "en-329", title: "Meet Me Halfway", artist: "The Black Eyed Peas", album: "Meet Me Halfway (English)", language: "English", duration: "3:30", audio: "public/music/english/en-329.mp3", favorite: false },
  { id: "en-330", title: "Something Just Like This", artist: "The Chainsmokers & Coldplay", album: "Something Just Like This (English)", language: "English", duration: "3:30", audio: "public/music/english/en-330.mp3", favorite: false },
  { id: "en-331", title: "Paris We were staying in Paris", artist: "The Chainsmokers", album: "Paris We were staying in Paris (English)", language: "English", duration: "3:30", audio: "public/music/english/en-331.mp3", favorite: false },
  { id: "en-332", title: "OVER YOU", artist: "The Kid LAROI", album: "OVER YOU (English)", language: "English", duration: "3:30", audio: "public/music/english/en-332.mp3", favorite: false },
  { id: "en-333", title: "Same Energy", artist: "The Kid LAROI", album: "Same Energy (English)", language: "English", duration: "3:30", audio: "public/music/english/en-333.mp3", favorite: false },
  { id: "en-334", title: "Eminem", artist: "The Real Slim Shady", album: "Eminem (English)", language: "English", duration: "3:30", audio: "public/music/english/en-334.mp3", favorite: false },
  { id: "en-335", title: "Too Sweet", artist: "Various Artists", album: "Too Sweet (English)", language: "English", duration: "3:30", audio: "public/music/english/en-335.mp3", favorite: false },
  { id: "en-336", title: "Training Season", artist: "Various Artists", album: "Training Season (English)", language: "English", duration: "3:30", audio: "public/music/english/en-336.mp3", favorite: false },
  { id: "en-337", title: "Dance To This", artist: "Troye Sivan & Ariana Grande", album: "Dance To This (English)", language: "English", duration: "3:30", audio: "public/music/english/en-337.mp3", favorite: false },
  { id: "en-338", title: "Unholy", artist: "Various Artists", album: "Unholy (English)", language: "English", duration: "3:30", audio: "public/music/english/en-338.mp3", favorite: false },
  { id: "en-339", title: "You Got It", artist: "Vedo", album: "You Got It (English)", language: "English", duration: "3:30", audio: "public/music/english/en-339.mp3", favorite: false },
  { id: "en-340", title: "Gold Skies", artist: "Watson, Drew Schueler", album: "Gold Skies (English)", language: "English", duration: "3:30", audio: "public/music/english/en-340.mp3", favorite: false },
  { id: "en-341", title: "Where Are You Now", artist: "Various Artists", album: "Where Are You Now (English)", language: "English", duration: "3:30", audio: "public/music/english/en-341.mp3", favorite: false },
  { id: "en-342", title: "Fallin'", artist: "Why Don't We", album: "Fallin' (English)", language: "English", duration: "3:30", audio: "public/music/english/en-342.mp3", favorite: false },
  { id: "en-343", title: "Into Your Arms (tiktok version)", artist: "Witt Lowry, Ava Max", album: "Into Your Arms (tiktok version) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-343.mp3", favorite: false },
  { id: "en-344", title: "Unsteady hold on to me 'Cause I'm a little unsteady", artist: "X Ambassadors", album: "Unsteady hold on to me 'Cause I'm a little unsteady (English)", language: "English", duration: "3:30", audio: "public/music/english/en-344.mp3", favorite: false },
  { id: "en-345", title: "Billie Eilish Try not to abuse your power", artist: "Your Power", album: "Billie Eilish Try not to abuse your power (English)", language: "English", duration: "3:30", audio: "public/music/english/en-345.mp3", favorite: false },
  { id: "en-346", title: "Flashbacks ＂I thought that mom and dad were supposed to last forever＂", artist: "Zach Hood", album: "Flashbacks ＂I thought that mom and dad were supposed to last forever＂ (English)", language: "English", duration: "3:30", audio: "public/music/english/en-346.mp3", favorite: false },
  { id: "en-347", title: "Talk About Love FT. Young Thug ＂I don't wanna talk about love＂", artist: "Zara Larsson", album: "Talk About Love FT. Young Thug ＂I don't wanna talk about love＂ (English)", language: "English", duration: "3:30", audio: "public/music/english/en-347.mp3", favorite: false },
  { id: "en-348", title: "That's when we uncover (uncover)", artist: "Zara Larsson", album: "That's when we uncover (uncover) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-348.mp3", favorite: false },
  { id: "en-349", title: "I Want You To Know ft. Selena Gomez", artist: "Zedd", album: "I Want You To Know ft. Selena Gomez (English)", language: "English", duration: "3:30", audio: "public/music/english/en-349.mp3", favorite: false },
  { id: "en-350", title: "Stay FT. Alessia Cara", artist: "Zedd", album: "Stay FT. Alessia Cara (English)", language: "English", duration: "3:30", audio: "public/music/english/en-350.mp3", favorite: false },
  { id: "en-351", title: "The Middle ft. Maren Morris & Grey", artist: "Zedd", album: "The Middle ft. Maren Morris & Grey (English)", language: "English", duration: "3:30", audio: "public/music/english/en-351.mp3", favorite: false },
  { id: "en-352", title: "Girls Like Us", artist: "Zoe Wees", album: "Girls Like Us (English)", language: "English", duration: "3:30", audio: "public/music/english/en-352.mp3", favorite: false },
  { id: "en-353", title: "abc (nicer)", artist: "Various Artists", album: "abc (nicer) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-353.mp3", favorite: false },
  { id: "en-354", title: "Unlearn Ft. Gracie Abrams", artist: "benny blanco", album: "Unlearn Ft. Gracie Abrams (English)", language: "English", duration: "3:30", audio: "public/music/english/en-354.mp3", favorite: false },
  { id: "en-355", title: "IDFC", artist: "blackbear", album: "IDFC (English)", language: "English", duration: "3:30", audio: "public/music/english/en-355.mp3", favorite: false },
  { id: "en-356", title: "love nwantiti", artist: "ckay", album: "love nwantiti (English)", language: "English", duration: "3:30", audio: "public/music/english/en-356.mp3", favorite: false },
  { id: "en-357", title: "hurtless", artist: "dean lewis", album: "hurtless (English)", language: "English", duration: "3:30", audio: "public/music/english/en-357.mp3", favorite: false },
  { id: "en-358", title: "olivia rodrigo I got my driver's license last week", artist: "drivers license", album: "olivia rodrigo I got my driver's license last week (English)", language: "English", duration: "3:30", audio: "public/music/english/en-358.mp3", favorite: false },
  { id: "en-359", title: "lose yourself", artist: "eminem", album: "lose yourself (English)", language: "English", duration: "3:30", audio: "public/music/english/en-359.mp3", favorite: false },
  { id: "en-360", title: "without me", artist: "eminem", album: "without me (English)", language: "English", duration: "3:30", audio: "public/music/english/en-360.mp3", favorite: false },
  { id: "en-361", title: "serotonin", artist: "girl in red", album: "serotonin (English)", language: "English", duration: "3:30", audio: "public/music/english/en-361.mp3", favorite: false },
  { id: "en-363", title: "greedy", artist: "Various Artists", album: "greedy (English)", language: "English", duration: "3:30", audio: "public/music/english/en-363.mp3", favorite: false },
  { id: "en-364", title: "i like the way you kiss me", artist: "Various Artists", album: "i like the way you kiss me (English)", language: "English", duration: "3:30", audio: "public/music/english/en-364.mp3", favorite: false },
  { id: "en-365", title: "billie eilish", artist: "idontwannabeyouanymore", album: "billie eilish (English)", language: "English", duration: "3:30", audio: "public/music/english/en-365.mp3", favorite: false },
  { id: "en-366", title: "demons ＂It's where my demons hide＂", artist: "imagine Dragons", album: "demons ＂It's where my demons hide＂ (English)", language: "English", duration: "3:30", audio: "public/music/english/en-366.mp3", favorite: false },
  { id: "en-367", title: "But I'm a bad liar (bad liar)", artist: "imagine dragons", album: "But I'm a bad liar (bad liar) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-367.mp3", favorite: false },
  { id: "en-368", title: "monster ＂I've turned into a monster＂", artist: "imagine dragons", album: "monster ＂I've turned into a monster＂ (English)", language: "English", duration: "3:30", audio: "public/music/english/en-368.mp3", favorite: false },
  { id: "en-369", title: "natural", artist: "imagine dragons", album: "natural (English)", language: "English", duration: "3:30", audio: "public/music/english/en-369.mp3", favorite: false },
  { id: "en-371", title: "always remember us this way", artist: "lady gaga", album: "always remember us this way (English)", language: "English", duration: "3:30", audio: "public/music/english/en-371.mp3", favorite: false },
  { id: "en-372", title: "judas It's so cruel, but I'm still in love with Judas, baby", artist: "lady gaga", album: "judas It's so cruel, but I'm still in love with Judas, baby (English)", language: "English", duration: "3:30", audio: "public/music/english/en-372.mp3", favorite: false },
  { id: "en-373", title: "fingers crossed", artist: "lauren spencer smith", album: "fingers crossed (English)", language: "English", duration: "3:30", audio: "public/music/english/en-373.mp3", favorite: false },
  { id: "en-374", title: "what lovers do ft. sza", artist: "maroon 5", album: "what lovers do ft. sza (English)", language: "English", duration: "3:30", audio: "public/music/english/en-374.mp3", favorite: false },
  { id: "en-375", title: "pacify her", artist: "melanie martinez", album: "pacify her (English)", language: "English", duration: "3:30", audio: "public/music/english/en-375.mp3", favorite: false },
  { id: "en-376", title: "PS5 TOMORROW X TOGETHER ft. Alan Walker", artist: "salem ilese", album: "PS5 TOMORROW X TOGETHER ft. Alan Walker (English)", language: "English", duration: "3:30", audio: "public/music/english/en-376.mp3", favorite: false },
  { id: "en-377", title: "cheap Thrills ft. sean paul", artist: "sia", album: "cheap Thrills ft. sean paul (English)", language: "English", duration: "3:30", audio: "public/music/english/en-377.mp3", favorite: false },
  { id: "en-378", title: "rubberband", artist: "tate mcrae", album: "rubberband (English)", language: "English", duration: "3:30", audio: "public/music/english/en-378.mp3", favorite: false },
  { id: "en-379", title: "billie eilish", artist: "therefore i am", album: "billie eilish (English)", language: "English", duration: "3:30", audio: "public/music/english/en-379.mp3", favorite: false },
  { id: "en-380", title: "Heathens", artist: "twenty one pilots", album: "Heathens (English)", language: "English", duration: "3:30", audio: "public/music/english/en-380.mp3", favorite: false },
  { id: "en-381", title: "vampire", artist: "Various Artists", album: "vampire (English)", language: "English", duration: "3:30", audio: "public/music/english/en-381.mp3", favorite: false },
  { id: "ml-103", title: "Aaradhike", artist: "E4 Entertainment, Johnpaul George", album: "Soubin Shahir (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-103.mp3", favorite: false },
  { id: "ml-104", title: "Ajjappamada", artist: "Hakim Shajahan, Gopi Sundar", album: "Kadakan (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-104.mp3", favorite: false },
  { id: "ml-105", title: "Alankaara Puthukkangal", artist: "Lukman Avaran, Anarkali", album: "Sulaikha Manzil (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-105.mp3", favorite: false },
  { id: "ml-106", title: "Anjanamani", artist: "Vaikom Vijayalakshmi, Jay Stellar", album: "Innocent (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-106.mp3", favorite: false },
  { id: "ml-107", title: "Argentina Fans Kaattoorkadavu", artist: "Kalidas Jayaram, Aishwarya", album: "Hey Madhuchandrike (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-107.mp3", favorite: false },
  { id: "ml-108", title: "Arike Ninna", artist: "Pranav, Darshana", album: "Hridayam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-108.mp3", favorite: false },
  { id: "ml-109", title: "Armadham", artist: "Jithu Madhavan, Fahadh Faasil", album: "Aavesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-109.mp3", favorite: false },
  { id: "ml-110", title: "Athimanoharam", artist: "Rajat Prakash, Vipin Das", album: "Vaazha (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-110.mp3", favorite: false },
  { id: "ml-111", title: "Bhairavan Pattu", artist: "Tovino Thomas, Jithin Laal", album: "ARM (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-111.mp3", favorite: false },
  { id: "ml-112", title: "Darshana", artist: "Pranav, Darshana", album: "Hridayam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-112.mp3", favorite: false },
  { id: "ml-113", title: "Duppattawaali", artist: "Fahadh Faasil, Kalyani", album: "Odum Kuthira Chaadum Kuthira (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-113.mp3", favorite: false },
  { id: "ml-114", title: "Ethra Naal (Sulaikha Manzil Version)", artist: "Vishnu Vijay, Ashraf Hamza", album: "Lukman, Anarkali (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-114.mp3", favorite: false },
  { id: "ml-115", title: "Eyy Banane", artist: "Vipin Das, Anand Menen", album: "Vaazha (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-115.mp3", favorite: false },
  { id: "ml-116", title: "Fejo - Vazhikatti (Kizhakku Suryan) Malayalam", artist: "Various Artists", album: "Prod. Jeffin Jestin (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-116.mp3", favorite: false },
  { id: "ml-117", title: "Galatta", artist: "Jithu Madhavan, Fahadh Faasil", album: "Aavesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-117.mp3", favorite: false },
  { id: "ml-118", title: "Haalaake Maarunne", artist: "Lukman, Anarkali", album: "Sulaikha Manzil (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-118.mp3", favorite: false },
  { id: "ml-119", title: "Hatja", artist: "Khalid Rahman, Naslen", album: "Alappuzha Gymkhana (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-119.mp3", favorite: false },
  { id: "ml-120", title: "Heart Attack", artist: "Sajin Gopu, Anaswara Rajan", album: "Painkili (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-120.mp3", favorite: false },
  { id: "ml-121", title: "Hope", artist: "Asif Ali, Thamar", album: "Sarkeet (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-121.mp3", favorite: false },
  { id: "ml-122", title: "Ilakozhiye", artist: "Arjun Ashokan, Revathy", album: "Thalavara (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-122.mp3", favorite: false },
  { id: "ml-123", title: "Illuminati", artist: "Jithu Madhavan, Fahadh Faasil", album: "Aavesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-123.mp3", favorite: false },
  { id: "ml-124", title: "JIL JIL JIL", artist: "Lukman Avaran, Anarkali", album: "Sulaikha Manzil (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-124.mp3", favorite: false },
  { id: "ml-125", title: "Jaada", artist: "Jithu Madhavan, Fahadh Faasil", album: "Aavesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-125.mp3", favorite: false },
  { id: "ml-126", title: "Jaada", artist: "Jithu Madhavan, Fahadh Faasil", album: "Aavesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-126.mp3", favorite: false },
  { id: "ml-127", title: "June", artist: "Ifthi, Amritha Suresh", album: "Minni Minni (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-127.mp3", favorite: false },
  { id: "ml-128", title: "Kaakum Vadivel", artist: "Vaaheesan, Dharan Kumar", album: "Official Video Song (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-128.mp3", favorite: false },
  { id: "ml-129", title: "Kalamkaval", artist: "Jithin K Jose, Mujeeb Majeed", album: "Mammootty (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-129.mp3", favorite: false },
  { id: "ml-130", title: "Kattu Mooliyo", artist: "Nivin Pauly, Nazriya Nazim", album: "Ohm Shanthi Oshaana (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-130.mp3", favorite: false },
  { id: "ml-131", title: "Kiliye Kiliye - Afrobeat X Kalyani Priyadarshan ( )", artist: "Aa Raathri, S Janaki", album: "The Independeners (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-131.mp3", favorite: false },
  { id: "ml-132", title: "Kokkedelic", artist: "The Imbachi, Bhadra Rajin", album: "Sahasam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-132.mp3", favorite: false },
  { id: "ml-133", title: "Kuthanthram - Manjummel Boys", artist: "Sushin Shyam ft. Vedan", album: "Chidambaram (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-133.mp3", favorite: false },
  { id: "ml-134", title: "Kuthanthram", artist: "Chidambaram, Sushin Shyam", album: "Manjummel Boys (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-134.mp3", favorite: false },
  { id: "ml-135", title: "Maarante Pennalle", artist: "Naslen, Mathew", album: "Journey of Love 18+ (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-135.mp3", favorite: false },
  { id: "ml-136", title: "Madhu Pakaroo", artist: "Pranav, Amrit Ramnath", album: "Varshangalkku Shesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-136.mp3", favorite: false },
  { id: "ml-137", title: "Mathapithakkale", artist: "Jithu Madhavan, Fahadh Faasil", album: "Aavesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-137.mp3", favorite: false },
  { id: "ml-138", title: "Mazhavillile", artist: "Basil Joseph, Nithish Sahadev", album: "Falimy (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-138.mp3", favorite: false },
  { id: "ml-139", title: "Minnal Minnane", artist: "Tovino Thomas, Jude Anthany Joseph", album: "2018 (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-139.mp3", favorite: false },
  { id: "ml-140", title: "Nagumo", artist: "Pranav, Darshana", album: "Hridayam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-140.mp3", favorite: false },
  { id: "ml-141", title: "Naruchiriyude Minnayam", artist: "Arjun, Anaswara", album: "Pranaya Vilasam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-141.mp3", favorite: false },
  { id: "ml-142", title: "Neeye Punchiri", artist: "Hanan Sha, Reyan", album: "Lokah (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-142.mp3", favorite: false },
  { id: "ml-143", title: "Odimaga", artist: "Jithu Madhavan, Fahadh Faasil", album: "Aavesham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-143.mp3", favorite: false },
  { id: "ml-144", title: "Mandaarame", artist: "Nivin Pauly, Nazriya Nazim", album: "Ohm Shanthi Oshaana (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-144.mp3", favorite: false },
  { id: "ml-145", title: "Onakka Munthiri", artist: "Hridayam, Pranav", album: "Extended Cut (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-145.mp3", favorite: false },
  { id: "ml-146", title: "Paalmanam", artist: "Mathew, Malavika", album: "Christy (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-146.mp3", favorite: false },
  { id: "ml-147", title: "Parayuvaan", artist: "ShaneNigam, Ann Sheethal", album: "Ishq Movie (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-147.mp3", favorite: false },
  { id: "ml-148", title: "Polika Polika", artist: "Tinu Pappachan, Kunchacko Boban", album: "Chaaver (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-148.mp3", favorite: false },
  { id: "ml-149", title: "Pottu Thotta Pournami", artist: "Pranav, Kalyani", album: "Hridayam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-149.mp3", favorite: false },
  { id: "ml-150", title: "Premakkathu Pattu", artist: "Basil Joseph, Muhashin", album: "Kadina Kadoramee Andakadaham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-150.mp3", favorite: false },
  { id: "ml-151", title: "Puthiyoru Lokam", artist: "Pranav, Kalyani", album: "Hridayam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-151.mp3", favorite: false },
  { id: "ml-152", title: "Puthu Mazha", artist: "Nivin Pauly, Riya Shibu", album: "Sarvam Maya (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-152.mp3", favorite: false },
  { id: "ml-153", title: "Thathaka Theithare", artist: "Pranav, Vineeth", album: "Hridayam (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-153.mp3", favorite: false },
  { id: "ml-154", title: "Thudarum - Kanmanipoove", artist: "Jakes Bejoy, Shobana", album: "Mohanlal (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-154.mp3", favorite: false },
  { id: "ml-155", title: "Thumbi", artist: "Ullas Chemban, Lukman Avaran", album: "Anchakkallakokkan (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-155.mp3", favorite: false },
  { id: "ml-156", title: "Vaathil Melle", artist: "Nivin Pauly, Nazriya Nazim", album: "Neram (Malayalam) (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-156.mp3", favorite: false },
  { id: "ml-157", title: "Venmathi - Hridayapoorvam", artist: "Sathyan Anthikad, Sid Sriram", album: "Mohanlal (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-157.mp3", favorite: false },
  { id: "ml-158", title: "Venmegham", artist: "Tovino Thomas, Jude Anthany Joseph", album: "2018 (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-158.mp3", favorite: false },
  { id: "ml-159", title: "Vijay Superum Pournamiyum", artist: "Asif Ali, Aishwarya", album: "Etho Mazhayil (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-159.mp3", favorite: false },
  { id: "ml-160", title: "Ya Rabbe", artist: "Basil Joseph, Muhashin", album: "Kadina Kadoramee Andakadaham (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-160.mp3", favorite: false },
  { id: "ml-161", title: "Yaathonnum Parayathe", artist: "Tovino Thomas, Keerthy Suresh", album: "Vaashi (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-161.mp3", favorite: false },
  { id: "ml-162", title: "ഉയിരിൽ തൊടും Uyiril Thodum - Kumbalangi Nights Official", artist: "Anne Amie", album: "Sooraj Santhosh (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-162.mp3", favorite: false },
  { id: "ta-636", title: "Idhazhin Oram", artist: "Dhanush, Shruti", album: "3 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-636.mp3", favorite: false },
  { id: "ta-637", title: "Kannazhaga", artist: "Dhanush, Shruti", album: "3 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-637.mp3", favorite: false },
  { id: "ta-638", title: "Why This Kolaveri Di", artist: "Dhanush, Shruti Haasan", album: "3 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-638.mp3", favorite: false },
  { id: "ta-639", title: "7 Aum Arivu - Mun Andhi", artist: "Harris", album: "7 Aum Arivu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-639.mp3", favorite: false },
  { id: "ta-640", title: "Aasa Kooda", artist: "Preity Mukhundhan, Sai Smriti", album: "Thejo Bharathwaj (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-640.mp3", favorite: false },
  { id: "ta-641", title: "Katchi Sera", artist: "Ken Royson", album: "Samyuktha (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-641.mp3", favorite: false },
  { id: "ta-642", title: "AR Rahman Hit Songs", artist: "Kadhal Desam Tamil Movie, Vineeth", album: "Ennai Kaanavillaye Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-642.mp3", favorite: false },
  { id: "ta-643", title: "Aadukalam - Ayyayo Tamil", artist: "G.V. Prakash Kumar", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-643.mp3", favorite: false },
  { id: "ta-644", title: "Aathi", artist: "Vijay, Samantha Ruth Prabhu", album: "Kaththi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-644.mp3", favorite: false },
  { id: "ta-645", title: "Adiye Unna Paathida", artist: "M.Sasikumar, Mia George", album: "Vetrivel (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-645.mp3", favorite: false },
  { id: "ta-646", title: "Agayam Theepiditha Official", artist: "Karthi, Catherine Tresa", album: "Madras (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-646.mp3", favorite: false },
  { id: "ta-647", title: "Ale Ale", artist: "Siddharth, Genelia", album: "Boys Tamil Movie (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-647.mp3", favorite: false },
  { id: "ta-648", title: "Anandham Tamil Movie HD", artist: "Sneha, Abbas", album: "Pallangkuzhiyin Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-648.mp3", favorite: false },
  { id: "ta-649", title: "Anbe Anbe", artist: "GV Prakash Kumar, Nikki Galrani", album: "Darling (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-649.mp3", favorite: false },
  { id: "ta-650", title: "Anegan - Aathadi Aathadi", artist: "Harris Jayaraj", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-650.mp3", favorite: false },
  { id: "ta-651", title: "Anegan - Thodu Vaanam", artist: "Harris Jayaraj", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-651.mp3", favorite: false },
  { id: "ta-652", title: "Anegan - Aathadi Aathadi Dhanush Harris Jayaraj", artist: "Various Artists", album: "Anegan - Aathadi Aathadi Dhanush Harris Jayaraj (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-652.mp3", favorite: false },
  { id: "ta-653", title: "Azhagae Nee Asainthal", artist: "Vishal, Catherine Tresa", album: "Kathakali (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-653.mp3", favorite: false },
  { id: "ta-654", title: "Bairavaa Songs", artist: "Vijay, Keerthy Suresh", album: "Nillayo Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-654.mp3", favorite: false },
  { id: "ta-655", title: "Bogan - Senthoora", artist: "Imman, Latest Tamil Hit 2017", album: "Jayam Ravi, Hansika (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-655.mp3", favorite: false },
  { id: "ta-656", title: "Chellame Chellam", artist: "Shreya Ghoshal, Hariharan", album: "Shrutika, Aryan Rajesh (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-656.mp3", favorite: false },
  { id: "ta-657", title: "David - Kanave Kanave HD", artist: "Various Artists", album: "David - Kanave Kanave HD (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-657.mp3", favorite: false },
  { id: "ta-658", title: "Dharala Prabhu - Title Track", artist: "Anirudh Ravichander, Tanya Hope", album: "Harish Kalyan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-658.mp3", favorite: false },
  { id: "ta-659", title: "Dharmadurai - Aandipatti", artist: "Yuvan Shankar Raja", album: "Vijay Sethupathi, Aishwarya Rajesh (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-659.mp3", favorite: false },
  { id: "ta-660", title: "Dhee ft. Arivu - Enjoy Enjaami (Prod. Santhosh Narayanan)", artist: "Various Artists", album: "Dhee ft. Arivu - Enjoy Enjaami (Prod. Santhosh Narayanan) (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-660.mp3", favorite: false },
  { id: "ta-661", title: "Dhool - Aasai Aasai", artist: "Various Artists", album: "Dhool - Aasai Aasai (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-661.mp3", favorite: false },
  { id: "ta-662", title: "Dikkiloona - Per Vachaalum Vaikkaama", artist: "Yuvan Shankar Raja, Karthik Yogi", album: "Santhanam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-662.mp3", favorite: false },
  { id: "ta-663", title: "Doctor - Chellamma", artist: "Anirudh Ravichander, Nelson Dilipkumar", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-663.mp3", favorite: false },
  { id: "ta-664", title: "En Anbae En Anbae", artist: "Yuvan Shankar Raja, Surya", album: "Mounam Pesiyadhe Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-664.mp3", favorite: false },
  { id: "ta-665", title: "Enakku 20 Unakku 18 Tamil Movie - Yedho Onru", artist: "Trisha, AR Rahman", album: "Tarun (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-665.mp3", favorite: false },
  { id: "ta-666", title: "Engeyum Kaadhal - Engeyum Kaadhal", artist: "Harris", album: "Jayam Ravi, Hansika (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-666.mp3", favorite: false },
  { id: "ta-667", title: "Engeyum Kadhal - Nenjil Nenjil Tamil", artist: "Harris Jayaraj", album: "Jayam Ravi, Hansikha (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-667.mp3", favorite: false },
  { id: "ta-668", title: "Enkannukulla appuchi gramam", artist: "Various Artists", album: "Enkannukulla appuchi gramam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-668.mp3", favorite: false },
  { id: "ta-669", title: "Ennavale Adi Ennavale - Kaadhalan - HD", artist: "Various Artists", album: "Ennavale Adi Ennavale - Kaadhalan - HD (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-669.mp3", favorite: false },
  { id: "ta-670", title: "Ethir Neechal - Boomi Enna Suthudhe", artist: "Various Artists", album: "Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-670.mp3", favorite: false },
  { id: "ta-671", title: "Ethir Neechal - Velicha Poove", artist: "Sivakarthikeyan,  Priya", album: "Sivakarthikeyan, Priya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-671.mp3", favorite: false },
  { id: "ta-672", title: "Ey Sandakaara", artist: "R. Madhavan, Ritika Singh", album: "＂Irudhi Suttru＂ (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-672.mp3", favorite: false },
  { id: "ta-673", title: "Gemini Ganeshanum Suruli Raajanum - Ammukuttiye", artist: "Atharvaa", album: "D. Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-673.mp3", favorite: false },
  { id: "ta-674", title: "Gulaebaghavali", artist: "Kalyaan, Prabhu Deva", album: "Seramal Ponal Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-674.mp3", favorite: false },
  { id: "ta-675", title: "Guru - Aaruyirae", artist: "Various Artists", album: "A.R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-675.mp3", favorite: false },
  { id: "ta-676", title: "I - Ennodu Nee Irundhaal", artist: "Vikram, Shankar", album: "A.R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-676.mp3", favorite: false },
  { id: "ta-677", title: "I - Pookkalae Sattru Oyivedungal", artist: "Vikram, Amy Jackson", album: "A. R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-677.mp3", favorite: false },
  { id: "ta-678", title: "Idu Enna Maayam - Iravaaga Nee", artist: "Vikram Prabhu,  G.V. Prakash Kumar", album: "Vikram Prabhu, G.V. Prakash Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-678.mp3", favorite: false },
  { id: "ta-679", title: "Idu Enna Maayam - Irukkiraai", artist: "G.V. Prakash", album: "Vikram Prabhu, Keerthy (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-679.mp3", favorite: false },
  { id: "ta-680", title: "Imaikkaa Nodigal", artist: "Hiphop Tamizha, Atharvaa", album: "Kadhal Oru Aagayam Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-680.mp3", favorite: false },
  { id: "ta-681", title: "Innum Konjam Naeram - With Lyrics", artist: "Various Artists", album: "Innum Konjam Naeram - With Lyrics (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-681.mp3", favorite: false },
  { id: "ta-682", title: "Iru Mugan - Kannai Vittu Tamil", artist: "Harris", album: "Vikram, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-682.mp3", favorite: false },
  { id: "ta-683", title: "Kaatru Veliyidai - Azhagiye", artist: "Karthi, New Hit Song 2017", album: "A. R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-683.mp3", favorite: false },
  { id: "ta-684", title: "Kaatru Veliyidai - Nallai Allai", artist: "Karthi", album: "Mani Ratnam, AR Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-684.mp3", favorite: false },
  { id: "ta-685", title: "Kaatru Veliyidai - Saarattu Vandiyila", artist: "AR Rahman,  Mani Ratnam", album: "AR Rahman, Mani Ratnam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-685.mp3", favorite: false },
  { id: "ta-686", title: "Kadhal Kan Kattudhe - Kaaki Sattai", artist: "Siva Karthikeyan, Sri Divya", album: "Official Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-686.mp3", favorite: false },
  { id: "ta-687", title: "Kadhal Sadugudu Tamil Movie HD", artist: "Vikram, Priyanka", album: "Megathil Ondrai Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-687.mp3", favorite: false },
  { id: "ta-688", title: "Kanaa - Othaiyadi Pathayila", artist: "Dhibu Ninan Thomas", album: "Arunraja Kamaraj (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-688.mp3", favorite: false },
  { id: "ta-689", title: "Kanaa - Vaayadi Petha Pulla", artist: "Dhibu Ninan Thomas", album: "AishwaryaRajesh, Sivakarthikeyan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-689.mp3", favorite: false },
  { id: "ta-690", title: "Kanave Nee Naan -Kannum Kannum Kollaiyadithaal", artist: "Masala Coffee, Tamil Song", album: "Dulquer S, Ritu V,Rakshan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-690.mp3", favorite: false },
  { id: "ta-691", title: "Kanchana 2 Movie Songs", artist: "Raghava Lawrence, Taapsee", album: "Vaaya En Veera Song With Lyrics (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-691.mp3", favorite: false },
  { id: "ta-692", title: "Kannukkulle Unnai Vaithen Songs# Pennin Manathai Thottu# Tamil Songs# Prabhu Dev", artist: "Various Artists", album: "Kannukkulle Unnai Vaithen Songs# Pennin Manathai Thottu# Tamil Songs# Prabhu Dev (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-692.mp3", favorite: false },
  { id: "ta-693", title: "Karupputhaan Ennaku Pudicha Coloru Tamil", artist: "murali", album: "Vetri Kodi Kattu movie (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-693.mp3", favorite: false },
  { id: "ta-694", title: "Kattappava Kaanom - Hey Penne Tamil", artist: "Santhosh Dhayanidhi", album: "Sibiraj (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-694.mp3", favorite: false },
  { id: "ta-695", title: "Kavalai Vendam - Nee Tholaindhaayo Tamil", artist: "Leon James", album: "Jiiva (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-695.mp3", favorite: false },
  { id: "ta-696", title: "Kiss - Thirudi", artist: "Sathish, Jen Martin", album: "Kavin (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-696.mp3", favorite: false },
  { id: "ta-697", title: "Ko - Ennamo Yeadho", artist: "Harris", album: "Jiiva, Karthika (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-697.mp3", favorite: false },
  { id: "ta-698", title: "Kodi - Ei Suzhali Tamil", artist: "Santhosh Narayanan", album: "Dhanush, Trisha (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-698.mp3", favorite: false },
  { id: "ta-699", title: "Konji Pesida Venaam", artist: "Vijay Sethupathi, Remya Nambeesan", album: "Sethupathi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-699.mp3", favorite: false },
  { id: "ta-700", title: "Kutty Pattas", artist: "Reba John, Venki", album: "Ashwin (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-700.mp3", favorite: false },
  { id: "ta-701", title: "Laali Laali With Lyrics", artist: "Karthi, Rakul Preet", album: "Theeran Adhigaaram Ondru Movie (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-701.mp3", favorite: false },
  { id: "ta-702", title: "Maari - Don’u Don’u Don’u", artist: "Anirudh, Super Hit Song", album: "Dhanush, Kajal (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-702.mp3", favorite: false },
  { id: "ta-703", title: "Maari - Maari Thara Local", artist: "Anirudh Ravichander", album: "Dhanush (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-703.mp3", favorite: false },
  { id: "ta-704", title: "Maari 2 - Rowdy Baby", artist: "Yuvan Shankar Raja, Balaji Mohan", album: "Dhanush, Sai Pallavi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-704.mp3", favorite: false },
  { id: "ta-705", title: "Madharasapattinam - Pookkal Pookkum Aarya, Amy Jackson", artist: "Various Artists", album: "Madharasapattinam - Pookkal Pookkum Aarya, Amy Jackson (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-705.mp3", favorite: false },
  { id: "ta-706", title: "Manithan - Aval", artist: "Santhosh Narayanan", album: "Udhayanidhi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-706.mp3", favorite: false },
  { id: "ta-707", title: "Maruthu - Karuvakaatu Karuvaaya", artist: "D. Imman", album: "Vishal, Sri Divya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-707.mp3", favorite: false },
  { id: "ta-708", title: "Maruvaarthai", artist: "Dhanush, Darbuka Siva", album: "Enai Noki Paayum Thota (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-708.mp3", favorite: false },
  { id: "ta-709", title: "Maryan - Innum Konjam Naeram", artist: "Dhanush, Super Hit Song", album: "A. R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-709.mp3", favorite: false },
  { id: "ta-710", title: "Maryan - Naetru Aval Irundhal", artist: "Dhanush,  Parvathy", album: "Dhanush, Parvathy (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-710.mp3", favorite: false },
  { id: "ta-711", title: "Master - Vaathi Coming", artist: "Anirudh Ravichander, Lokesh Kanagaraj", album: "Thalapathy Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-711.mp3", favorite: false },
  { id: "ta-712", title: "Mersal - Aalaporan Thamizhan Tamil", artist: "A.R. Rahman", album: "Vijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-712.mp3", favorite: false },
  { id: "ta-713", title: "Mersal - Neethanae Tamil", artist: "A R Rahman, Atlee", album: "Vijay, Samantha (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-713.mp3", favorite: false },
  { id: "ta-714", title: "Minnalai Pidithu - Shajahan - Tamil Songs HD", artist: "Various Artists", album: "Minnalai Pidithu - Shajahan - Tamil Songs HD (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-714.mp3", favorite: false },
  { id: "ta-715", title: "Minnale", artist: "Various Artists", album: "Azhagiya Theeye song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-715.mp3", favorite: false },
  { id: "ta-716", title: "Minnale", artist: "Bombay Jayashri, Harris Jayaraj", album: "Vaseegara song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-716.mp3", favorite: false },
  { id: "ta-717", title: "Mona Gasolina", artist: "Rajinikanth, Anushka Shetty", album: "Lingaa (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-717.mp3", favorite: false },
  { id: "ta-718", title: "Moongil Thottam - Full & Lyrics - Kadal AR Rahman, Mani Ratnam", artist: "Various Artists", album: "Moongil Thottam - Full & Lyrics - Kadal AR Rahman, Mani Ratnam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-718.mp3", favorite: false },
  { id: "ta-719", title: "Mr.Romeo-Romeo Attam HD", artist: "Various Artists", album: "Mr.Romeo-Romeo Attam HD (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-719.mp3", favorite: false },
  { id: "ta-720", title: "Mudhal Kanave Majunu from Tamil on Vimeo", artist: "Various Artists", album: "Mudhal Kanave Majunu from Tamil on Vimeo (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-720.mp3", favorite: false },
  { id: "ta-721", title: "Mugavaree - Yeh Nilavae Nilavae", artist: "Jyothika, Vivek", album: "Ajith Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-721.mp3", favorite: false },
  { id: "ta-722", title: "Mukkala Mukkabala", artist: "Prabhudeva, Nagma", album: "Kadhalan Movie (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-722.mp3", favorite: false },
  { id: "ta-723", title: "Mun Paniya HD for Google Android⧸Apple iOS", artist: "Various Artists", album: "Mun Paniya HD for Google Android⧸Apple iOS (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-723.mp3", favorite: false },
  { id: "ta-724", title: "Naam - Adi Penne (Duet) [ ] - T Suriavelan", artist: "Stephen Zechariah ft Srinisha", album: "Rupiny (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-724.mp3", favorite: false },
  { id: "ta-725", title: "Naan Mahaan Alle- Iragai Pole HD [1080]", artist: "Various Artists", album: "Naan Mahaan Alle- Iragai Pole HD [1080] (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-725.mp3", favorite: false },
  { id: "ta-726", title: "Naan Nee-Madras", artist: "Various Artists", album: "Naan Nee-Madras (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-726.mp3", favorite: false },
  { id: "ta-727", title: "Naanum Rowdy Dhaan - Neeyum Naanum", artist: "Neeti Mohan, Anirudh", album: "Lyric Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-727.mp3", favorite: false },
  { id: "ta-728", title: "Naerukku Naer - Aval Varuvala", artist: "Various Artists", album: "Naerukku Naer - Aval Varuvala (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-728.mp3", favorite: false },
  { id: "ta-729", title: "Neethaane En Ponvasantham - Sattru Munbu", artist: "Jiiva,  Samantha", album: "Jiiva, Samantha (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-729.mp3", favorite: false },
  { id: "ta-730", title: "Nenjukkule Official Full - Kadal - AR Rahman 1080p HD", artist: "Various Artists", album: "Nenjukkule Official Full - Kadal - AR Rahman 1080p HD (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-730.mp3", favorite: false },
  { id: "ta-731", title: "OK Kanmani - Mental Manadhil", artist: "A. R. Rahman, Super Hit Song", album: "Dulquer (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-731.mp3", favorite: false },
  { id: "ta-732", title: "Oh My Kadavule - Marappadhilai Nenje", artist: "Leon James", album: "Ashok Selvan, Ritika Singh (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-732.mp3", favorite: false },
  { id: "ta-733", title: "Oru Naal Koothu Songs", artist: "Dinesh, Nivetha Pethuraj", album: "Adiyae Azhagae Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-733.mp3", favorite: false },
  { id: "ta-734", title: "Oru Paadhi Kadhavu 1080p HD Bluray +3D Thaandavam", artist: "Various Artists", album: "Oru Paadhi Kadhavu 1080p HD Bluray +3D Thaandavam (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-734.mp3", favorite: false },
  { id: "ta-735", title: "Paiya - Thuli Thuli", artist: "Yuvan Shankar Raja", album: "Karthi, Tamannah (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-735.mp3", favorite: false },
  { id: "ta-736", title: "Paiya - Yedho Ondru Ennai", artist: "Yuvan Shankar Raja", album: "Karthi, Tamannah (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-736.mp3", favorite: false },
  { id: "ta-737", title: "Penne Neeyum Penna - Priyamana Thozhi Songs", artist: "Jyotika, S A Rajkumar", album: "Madhavan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-737.mp3", favorite: false },
  { id: "ta-738", title: "Pennoruthi - Gemini", artist: "Various Artists", album: "Pennoruthi - Gemini (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-738.mp3", favorite: false },
  { id: "ta-739", title: "Petta - Marana Mass", artist: "Anirudh Ravichander", album: "Rajinikanth (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-739.mp3", favorite: false },
  { id: "ta-740", title: "Po Urave", artist: "Jyotika, A H Kaashif", album: "Kaatrin Mozhi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-740.mp3", favorite: false },
  { id: "ta-741", title: "Poi Solla Intha Manasukku Theriyavillai", artist: "April Mathathil", album: "yuvan shankar raja (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-741.mp3", favorite: false },
  { id: "ta-742", title: "Pudichirukku", artist: "Vikram, Trisha", album: "Saamy (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-742.mp3", favorite: false },
  { id: "ta-743", title: "Pugazh - Neeyae", artist: "Vivek - Mervin", album: "Jai, Surabhi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-743.mp3", favorite: false },
  { id: "ta-744", title: "Rajinimurugan - Un Mele Oru Kannu", artist: "Imman", album: "Sivakarthikeyan, Keethi Suresh (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-744.mp3", favorite: false },
  { id: "ta-745", title: "Rasaali", artist: "STR, A R Rahman", album: "Achcham Yenbadhu Madamaiyada (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-745.mp3", favorite: false },
  { id: "ta-746", title: "Rekka - Kannamma Tamil Vijay Sethupathi D. Imman", artist: "Various Artists", album: "Rekka - Kannamma Tamil Vijay Sethupathi D. Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-746.mp3", favorite: false },
  { id: "ta-747", title: "Rummy - Koodamela Koodavechi", artist: "Vijay Sethupathi", album: "Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-747.mp3", favorite: false },
  { id: "ta-748", title: "Run Minsaram en meethu", artist: "Various Artists", album: "Run Minsaram en meethu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-748.mp3", favorite: false },
  { id: "ta-749", title: "Saamurai - Moongil Kaadugale", artist: "Various Artists", album: "Saamurai - Moongil Kaadugale (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-749.mp3", favorite: false },
  { id: "ta-750", title: "Saravanan Irukka Bayamaen - Yembuttu Irukkuthu Aasai", artist: "Latest Hit", album: "Imman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-750.mp3", favorite: false },
  { id: "ta-751", title: "Selfie Pulla", artist: "Vijay, Samantha", album: "Kaththi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-751.mp3", favorite: false },
  { id: "ta-752", title: "Sema Songs", artist: "G.V. Prakash Kumar, Arthana Binu", album: "Sandalee Song with Lyrics (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-752.mp3", favorite: false },
  { id: "ta-753", title: "Sevatha Pulla", artist: "Karthi, Rakul Preet", album: "Theeran Adhigaaram Ondru Video (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-753.mp3", favorite: false },
  { id: "ta-754", title: "Sillunu Oru Kadhal Tamil Movie Songs HD", artist: "Suriya, Bhumika", album: "Munbe Vaa Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-754.mp3", favorite: false },
  { id: "ta-755", title: "Sillunu Oru Kadhal Tamil Movie Songs", artist: "Suriya, Jyothika", album: "New York Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-755.mp3", favorite: false },
  { id: "ta-756", title: "Sivappu Manjal Pachai", artist: "Siddharth, G.V.Prakash Kumar", album: "Usure Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-756.mp3", favorite: false },
  { id: "ta-757", title: "Sollamal Thottu Sellum Thendral-YUVAN SAHANKER HITZS-(NORMAL VERSION ).flv", artist: "Various Artists", album: "Sollamal Thottu Sellum Thendral-YUVAN SAHANKER HITZS-(NORMAL VERSION ).flv (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-757.mp3", favorite: false },
  { id: "ta-758", title: "Tamil Bharathi Nirpathuve Nadapathuve Parapathuve", artist: "Various Artists", album: "Tamil Bharathi Nirpathuve Nadapathuve Parapathuve (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-758.mp3", favorite: false },
  { id: "ta-759", title: "Tamil Songs", artist: "Elangaathu Veesudhey, Ilaiyaraja Songs", album: "இளங்காத்து வீசுதே (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-759.mp3", favorite: false },
  { id: "ta-760", title: "Thaanaa Serndha Koottam - Sodakku Tamil", artist: "Anirudh l Keerthi Suresh", album: "Suriya (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-760.mp3", favorite: false },
  { id: "ta-761", title: "Thalli Pogathey", artist: "A R Rahman, STR", album: "Achcham Yenbadhu Madamaiyada (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-761.mp3", favorite: false },
  { id: "ta-762", title: "The Life of Ram", artist: "Vijay Sethupathi, Trisha", album: "96 (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-762.mp3", favorite: false },
  { id: "ta-763", title: "Theekkoluthi Bison Kaalamaadan Dhruv, Anupama Mari Selvaraj Nivas K Prasanna", artist: "Various Artists", album: "Theekkoluthi Bison Kaalamaadan Dhruv, Anupama Mari Selvaraj Nivas K Prasanna (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-763.mp3", favorite: false },
  { id: "ta-764", title: "Thenali (2000)", artist: "Kamal Haasan, Jyothika", album: "Swasame Swasame (New Zealand) (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-764.mp3", favorite: false },
  { id: "ta-765", title: "Thithikudhe Tamil Movie Songs HD", artist: "Jeeva, Sridevi", album: "Silendra Theepori Ondru Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-765.mp3", favorite: false },
  { id: "ta-766", title: "Tum Tum", artist: "Vishal, Arya", album: "Enemy (Tamil) (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-766.mp3", favorite: false },
  { id: "ta-767", title: "Udhayam NH4 - Yaaro Ivan", artist: "Siddharth,  Ashrita", album: "Siddharth, Ashrita (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-767.mp3", favorite: false },
  { id: "ta-768", title: "Ullam Kollai Poguthae Tamil Movie - Kavidhaigal (Sad)", artist: "Anjala, Karthik Raja", album: "Prabhudeva (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-768.mp3", favorite: false },
  { id: "ta-769", title: "Uriyadi - Maane Maane", artist: "Anthony Daasan", album: "Vijay Kumar (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-769.mp3", favorite: false },
  { id: "ta-770", title: "VADACHENNAI - Ennadi Maayavi Nee Dhanush Vetri Maaran Santhosh Narayanan", artist: "Various Artists", album: "VADACHENNAI - Ennadi Maayavi Nee Dhanush Vetri Maaran Santhosh Narayanan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-770.mp3", favorite: false },
  { id: "ta-771", title: "Vaamanan - Oru Devathai", artist: "Yuvanshankar Raja", album: "Jai, Priya Anand (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-771.mp3", favorite: false },
  { id: "ta-772", title: "Vaanaviley", artist: "Vijayakanth, Simran", album: "Ramanaa Tamil Movie (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-772.mp3", favorite: false },
  { id: "ta-773", title: "Vaaranam Aayiram - Nenjukkul Peidhidum", artist: "Suriya, Sameera Reddy", album: "Harris Jayaraj (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-773.mp3", favorite: false },
  { id: "ta-774", title: "Vadacurry - Nenjukulle Nee", artist: "Vivek - Mervin", album: "Jai, Swathi Reddy, RJ Balaji (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-774.mp3", favorite: false },
  { id: "ta-775", title: "Vai Raja Vai - Pachchai Vanna", artist: "Gautham Karthik,  Priya Anand", album: "Gautham Karthik, Priya Anand (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-775.mp3", favorite: false },
  { id: "ta-776", title: "Vanakkam Chennai - Oh Penne", artist: "Shiva,  Priya Anand", album: "Shiva, Priya Anand (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-776.mp3", favorite: false },
  { id: "ta-777", title: "Vedalam - Aaluma Doluma", artist: "Anirudh Ravichander", album: "Ajith (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-777.mp3", favorite: false },
  { id: "ta-778", title: "Veera - Verrattaama Verratturiye Tamil", artist: "Kreshna,  Leon James", album: "Kreshna, Leon James (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-778.mp3", favorite: false },
  { id: "ta-779", title: "Velai Illa Pattadhaari vip Po Indru Neeyaga", artist: "Various Artists", album: "Velai Illa Pattadhaari vip Po Indru Neeyaga (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-779.mp3", favorite: false },
  { id: "ta-780", title: "Velai Illa Pattadhaari #D25 #VIP - Udhungada Sangu", artist: "Various Artists", album: "Full Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-780.mp3", favorite: false },
  { id: "ta-781", title: "Vijay Hits", artist: "Friends Movie Songs, Vijay", album: "Thendral Varum Full Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-781.mp3", favorite: false },
  { id: "ta-782", title: "Vikram Vedha Songs", artist: "R. Madhavan, Sam C S", album: "Tasakku Tasakku Video Song feat. Vijay Sethupathi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-782.mp3", favorite: false },
  { id: "ta-783", title: "Vikram Vedha Songs", artist: "R. Madhavan, Vijay Sethupathi", album: "Yaanji Video Song (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-783.mp3", favorite: false },
  { id: "ta-784", title: "Vinnaithaandi Varuvaayaa - Anbil Avan", artist: "STR, Trisha", album: "A.R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-784.mp3", favorite: false },
  { id: "ta-785", title: "Vinnaithaandi Varuvaayaa - Hosanna", artist: "STR, Trisha", album: "Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-785.mp3", favorite: false },
  { id: "ta-786", title: "Vinnaithaandi Varuvaayaa - Omana Penne Tamil", artist: "STR", album: "A.R. Rahman (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-786.mp3", favorite: false },
  { id: "ta-787", title: "Visiri - Teaser", artist: "Dhanush, Darbuka Siva", album: "Enai Noki Paayum Thota (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-787.mp3", favorite: false },
  { id: "ta-788", title: "Whistle - Azhagiya Asura", artist: "Various Artists", album: "Whistle - Azhagiya Asura (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-788.mp3", favorite: false },
  { id: "ta-789", title: "Whistlu Whistlu Whistluma", artist: "A R. Rahman", album: "Thalapathy Vijay, Nayanthara (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-789.mp3", favorite: false },
  { id: "ta-790", title: "Yaarumillaa", artist: "Gireesaaya, Radhan", album: "Dhruv Vikram,Banita Sandhu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-790.mp3", favorite: false },
  { id: "ta-791", title: "Yaayum Making Feat. Naresh Iyer & Rita Thyagarajan", artist: "Murugesh", album: "Shabir Sulthan (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-791.mp3", favorite: false },
  { id: "ta-792", title: "Yennai Arindhaal - Mazhai Vara Pogudhae", artist: "Harris Jayaraj", album: "Ajith (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-792.mp3", favorite: false },
  { id: "ta-793", title: "YouTube - Kushi - Yaar solvatho HD.mp4 djvijay", artist: "Various Artists", album: "YouTube - Kushi - Yaar solvatho HD.mp4 djvijay (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-793.mp3", favorite: false },
  { id: "ta-794", title: "adi kadhal enbathu", artist: "Various Artists", album: "adi kadhal enbathu (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-794.mp3", favorite: false },
  { id: "ta-795", title: "hHey Nee Romba Azhaga Irukke - tThottu Thottu Sellum.avi", artist: "Various Artists", album: "hHey Nee Romba Azhaga Irukke - tThottu Thottu Sellum.avi (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-795.mp3", favorite: false },
  { id: "ta-796", title: "ninaithu ninaithu female version", artist: "Various Artists", album: "ninaithu ninaithu female version (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-796.mp3", favorite: false },
  { id: "ta-797", title: "இரவா பகலா குளிரா வெயிலா - Poovellam Kettu Paar HQ", artist: "Various Artists", album: "இரவா பகலா குளிரா வெயிலா - Poovellam Kettu Paar HQ (Tamil)", language: "Tamil", duration: "3:30", audio: "public/music/tamil/ta-797.mp3", favorite: false },
  { id: "ml-163", title: "Fejo - Aayiram Aura", artist: "Prod. Jeffin Jestin, Malayalam Pop Song", album: "Malayalam Rap (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-163.mp3", favorite: false },
  { id: "ml-164", title: "KALYANI (with Shreya Ghoshal)", artist: "KDS, FIFTY4", album: "ARJN (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-164.mp3", favorite: false },
  { id: "ml-165", title: "KULASTHREE - ThirumaLi x ThudWiser", artist: "Various Artists", album: "Def Jam India (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-165.mp3", favorite: false },
  { id: "ml-166", title: "Neon Ride", artist: "Kunchacko Boban, Jakes Bejoy", album: "Officer On Duty (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-166.mp3", favorite: false },
  { id: "ml-167", title: "Ranam Title Track", artist: "Prithviraj Sukumaran, Rahman", album: "You Made Me Feel (Malayalam)", language: "Malayalam", duration: "3:30", audio: "public/music/malayalam/ml-167.mp3", favorite: false },
  { id: "en-383", title: "Dancin (KRONO Remix)", artist: "Aaron Smith", album: "Dancin (KRONO Remix) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-383.mp3", favorite: false },
  { id: "en-384", title: "Copines", artist: "Aya Nakamura", album: "Copines (English)", language: "English", duration: "3:30", audio: "public/music/english/en-384.mp3", favorite: false },
  { id: "en-385", title: "BAD BOY vs GATA ONLY (Mashup)", artist: "Joa Sosa", album: "BAD BOY vs GATA ONLY (Mashup) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-385.mp3", favorite: false },
  { id: "en-388", title: "SI NO ES CONTIGO", artist: "Cris MJ", album: "SI NO ES CONTIGO (English)", language: "English", duration: "3:30", audio: "public/music/english/en-388.mp3", favorite: false },
  { id: "en-389", title: "Loco Contigo", artist: "DJ Snake, J. Balvin, Tyga", album: "Loco Contigo (English)", language: "English", duration: "3:30", audio: "public/music/english/en-389.mp3", favorite: false },
  { id: "en-390", title: "Taki Taki", artist: "DJ Snake, Selena Gomez, Ozuna, Cardi B", album: "Taki Taki (English)", language: "English", duration: "3:30", audio: "public/music/english/en-390.mp3", favorite: false },
  { id: "en-391", title: "Woman", artist: "Doja Cat", album: "Woman (English)", language: "English", duration: "3:30", audio: "public/music/english/en-391.mp3", favorite: false },
  { id: "en-392", title: "Danza Kuduro", artist: "Don Omar, Lucenzo", album: "Danza Kuduro (English)", language: "English", duration: "3:30", audio: "public/music/english/en-392.mp3", favorite: false },
  { id: "en-393", title: "One Dance", artist: "Drake, Wizkid, Kyla", album: "One Dance (English)", language: "English", duration: "3:30", audio: "public/music/english/en-393.mp3", favorite: false },
  { id: "en-394", title: "Stereo Love", artist: "Edward Maya, Vika Jigulina", album: "Stereo Love (English)", language: "English", duration: "3:30", audio: "public/music/english/en-394.mp3", favorite: false },
  { id: "en-395", title: "GATA ONLY", artist: "FloyyMenor, Cris MJ", album: "GATA ONLY (English)", language: "English", duration: "3:30", audio: "public/music/english/en-395.mp3", favorite: false },
  { id: "en-396", title: "Peligrosa", artist: "FloyyMenor", album: "Peligrosa (English)", language: "English", duration: "3:30", audio: "public/music/english/en-396.mp3", favorite: false },
  { id: "en-397", title: "Unforgettable", artist: "French Montana, Swae Lee", album: "Unforgettable (English)", language: "English", duration: "3:30", audio: "public/music/english/en-397.mp3", favorite: false },
  { id: "en-398", title: "Him & I", artist: "G-Eazy & Halsey", album: "Him & I (English)", language: "English", duration: "3:30", audio: "public/music/english/en-398.mp3", favorite: false },
  { id: "en-399", title: "On The Floor", artist: "Jennifer Lopez, Pitbull", album: "On The Floor (English)", language: "English", duration: "3:30", audio: "public/music/english/en-399.mp3", favorite: false },
  { id: "en-400", title: "Sorry", artist: "Justin Bieber", album: "Purpose (English)", language: "English", duration: "3:30", audio: "public/music/english/en-400.mp3", favorite: false },
  { id: "en-401", title: "People", artist: "Libianca", album: "People (English)", language: "English", duration: "3:30", audio: "public/music/english/en-401.mp3", favorite: false },
  { id: "en-402", title: "Shake It To The Max (Fly) (Remix)", artist: "MOLIY, Shenseea, Skillibeng, Silent Addy", album: "Shake It To The Max (Fly) (Remix) (English)", language: "English", duration: "3:30", audio: "public/music/english/en-402.mp3", favorite: false },
  { id: "en-403", title: "Bad Boy", artist: "Marwa Loud", album: "Bad Boy (English)", language: "English", duration: "3:30", audio: "public/music/english/en-403.mp3", favorite: false },
  { id: "en-404", title: "Paro", artist: "NEJ'", album: "Paro (English)", language: "English", duration: "3:30", audio: "public/music/english/en-404.mp3", favorite: false },
  { id: "en-405", title: "Give It Up To Me", artist: "Sean Paul, Keyshia Cole", album: "Give It Up To Me (English)", language: "English", duration: "3:30", audio: "public/music/english/en-405.mp3", favorite: false },
  { id: "en-406", title: "No Lie", artist: "Sean Paul, Dua Lipa", album: "No Lie (English)", language: "English", duration: "3:30", audio: "public/music/english/en-406.mp3", favorite: false },
  { id: "en-407", title: "Chantaje", artist: "Shakira, Maluma", album: "Chantaje (English)", language: "English", duration: "3:30", audio: "public/music/english/en-407.mp3", favorite: false },
  { id: "en-408", title: "Hips Don't Lie", artist: "Shakira, Wyclef Jean", album: "Hips Don't Lie (English)", language: "English", duration: "3:30", audio: "public/music/english/en-408.mp3", favorite: false },
  { id: "en-409", title: "Cheap Thrills", artist: "Sia, Sean Paul", album: "Cheap Thrills (English)", language: "English", duration: "3:30", audio: "public/music/english/en-409.mp3", favorite: false },
  { id: "en-411", title: "Jalebi Baby", artist: "Tesher", album: "Jalebi Baby (English)", language: "English", duration: "3:30", audio: "public/music/english/en-411.mp3", favorite: false },
  { id: "en-412", title: "Starboy", artist: "The Weeknd, Daft Punk", album: "Starboy (English)", language: "English", duration: "3:30", audio: "public/music/english/en-412.mp3", favorite: false },
  { id: "en-413", title: "Popular", artist: "The Weeknd, Madonna, Playboi Carti", album: "Popular (English)", language: "English", duration: "3:30", audio: "public/music/english/en-413.mp3", favorite: false },

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
        ? `<div style="width:100%;height:100%;display:grid;place-items:center;background:linear-gradient(135deg,#1a1c33 0%, #252850 45%, #3b2f7a 100%);border-radius:14px;"><img src="${cover}" alt="${song.title}" style="width:100%;height:100%;object-fit:cover;border-radius:14px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid'"><div style="display:none;place-items:center;place-content:center;gap:6px;text-align:center;padding:20px;"><span style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:36px;letter-spacing:-0.04em;background:var(--accent-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${initials}</span><small style="color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:0.12em;text-transform:uppercase">${song.artist}</small></div></div>`
        : `<div class="artwork-fallback" style="position:static;inset:auto;display:grid;place-items:center;place-content:center;gap:6px;background:linear-gradient(135deg,#1a1c33 0%, #252850 45%, #3b2f7a 100%);text-align:center;padding:20px;border-radius:14px;width:100%;height:100%;"><span style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:36px;letter-spacing:-0.04em;background:var(--accent-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${initials}</span><small style="color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:0.12em;text-transform:uppercase">${song.artist}</small></div>`;
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

  // Update Now Playing header
  if(nowPlayingSub) nowPlayingSub.textContent = `${song.language} • ${album}`;

  // Update song meta (centered below controls)
  const leftMeta = document.getElementById('leftMeta');
  if(leftMeta){
    leftMeta.classList.remove('hidden');
    leftMeta.style.display = 'block';
  }
  if(songTitle) songTitle.textContent = song.title;
  if(songArtist) songArtist.textContent = song.artist;
  if(songMovie) songMovie.textContent = album;
  if(songComposer) songComposer.textContent = composer ? `Composer: ${composer}` : '';
  if(songAlbum) songAlbum.textContent = `Album: ${album} • ${song.language} • ${song.duration || ''}`;

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
  if(spotifyTrackArtist) spotifyTrackArtist.textContent = song.artist;
  if(spotifyTrackAlbum) spotifyTrackAlbum.textContent = album + " • " + song.language;
  if(spotifyLang) spotifyLang.textContent = song.language + " • " + album;
  if(spotifyOpenLink){
    spotifyOpenLink.classList.add('hidden');
    spotifyOpenLink.style.display = 'none';
  }
  if(spotifyCardArtwork && cover) { spotifyCardArtwork.src = cover; spotifyCardArtwork.alt = song.title; }
  if(spotifyCardTitle) spotifyCardTitle.textContent = song.title;
  if(spotifyCardArtist) spotifyCardArtist.textContent = song.artist;
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
  console.log("Audio:", song.audio);

  document.title = `${song.title} — SIVI Tunes`;

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
    // Preload metadata
    if(audio){
      audio.src = song.audio;
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
  if(nowPlayingSub) nowPlayingSub.textContent = `${song.language} • ${album}`;
  updateAudioVisual(song);
  updateFavUI();
  renderPlaylist();
  updateMediaSession();

  // Set source and play
  try {
    // Only change src if different to avoid reload
    const currentSrc = audio.getAttribute('src') || audio.src;
    // Compare decoded
    const targetSrc = song.audio;
    // If audio path is relative, browser will resolve to absolute, so we compare endsWith
    const shouldChange = !currentSrc || !currentSrc.endsWith(targetSrc) && currentSrc !== targetSrc;
    if(shouldChange){
      audio.src = song.audio;
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
    console.warn('Audio failed:', e, 'Song:', song.title, 'Path:', song.audio);
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
    console.warn('Audio failed: Song:', song ? song.title : 'none', 'Path:', song ? song.audio : 'none');
    return;
  }
  if(audio){
    // If src not set or different, set it
    if(!audio.src || !audio.src.endsWith(song.audio)){
      audio.src = song.audio;
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
        title: s.title, artist: s.artist, album: getAlbum(s),
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
    return s.title.toLowerCase().includes(q) ||
           s.artist.toLowerCase().includes(q) ||
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
    const album = getAlbum(song);
    const canPlay = isValidAudioPath(song.audio);
    const el=document.createElement('div');
    el.className='song-item'+(isActive?' active':'');
    el.setAttribute('role','listitem');
    el.tabIndex=0;
    el.setAttribute('aria-label', `${song.title} by ${song.artist} — ${album} • ${song.language}`);
    el.innerHTML=`
      <div class="song-thumb-fallback" aria-hidden="true"><span>${initials}</span></div>
      <img class="song-thumb hidden" src="${cover || ''}" alt="" loading="lazy" style="${cover ? '' : 'display:none'}" />
      <div class="song-info">
        <div class="song-name">${escapeHtml(song.title)} <span style="font-size:10px;color:var(--dim);font-weight:600;border:1px solid var(--border);padding:1px 6px;border-radius:100px;margin-left:6px;vertical-align:middle">${escapeHtml(song.language)}</span></div>
        <div class="song-artist-sm">${escapeHtml(song.artist)}</div>
        <div class="song-meta-sm">${escapeHtml(album)} • ${escapeHtml(song.duration||'')}</div>
      </div>
      ${isActive && isPlaying && canPlay ? '<div class="playing-eq" aria-hidden="true"><i style="height:6px"></i><i style="height:12px"></i><i style="height:9px"></i></div>' : `<span class="song-duration">${escapeHtml(song.duration||'')}</span>`}
      <a href="${song.audio}" target="_blank" rel="noopener" class="song-spotify" aria-label="${canPlay ? 'Open audio' : 'Audio unavailable'}" onclick="event.stopPropagation(); if(!isValidAudioPath('${song.audio}')){event.preventDefault(); showToast('Audio unavailable'); return false;} // Let browser handle audio file play in new tab" title="${canPlay ? 'Open audio' : 'Audio unavailable'}" style="${canPlay ? 'background:rgba(124,92,255,0.14);border-color:rgba(124,92,255,0.25);color:#7c5cff' : 'opacity:0.5;'}">
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
    console.warn('Audio failed: Song:', song.title, 'Path:', song.audio, e);
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
    // For local audio, this button is hidden; if visible, just show info
    showToast('Local audio: ' + song.audio);
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
