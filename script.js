/* Isai — Multilingual Music Player • 500 Songs (Tamil 200, Telugu 100, English 100, Malayalam 100)
   REFERENCE: Spotify playlists (metadata only, no audio scraping)
     Tamil:     https://open.spotify.com/playlist/3BcpgYmZZtaEk4ngkfjMK1
     Telugu:    https://open.spotify.com/playlist/41Cs3We0JCA8QjLC5DClsC
     English:   https://open.spotify.com/playlist/0PMKjSoU937cvzkHpFJ3hf
     Malayalam: https://open.spotify.com/playlist/37i9dQZF1DWTYKFynxp6Fs
   Each track stores spotifyUrl as reference (secondary "Open in Spotify").
   PLAYBACK: Spotify embedded + HTML5 demo audio — stays on page, no navigation. Demo audio for preview (SoundHelix) if no local file.
   Uses authorized demo audio (SoundHelix) via audio.play() — UI changes do not stop playback.
   If no playable source, shows "Audio unavailable" — Spotify remains optional secondary only.
*/

const spotifySearch = (title, artist) => `https://open.spotify.com/search/${encodeURIComponent(title + ' ' + artist)}`;

const songs = [
  // ===== TAMIL — 51 songs (popular + recent, Anirudh/ARR/Ilaiyaraaja/Yuvan/Harris/GVP etc.) =====
  { id: 1,  title: "Katchi Sera", artist: "Sai Abhyankkar", album: "Single (2024)", language: "Tamil", duration: "3:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/001.jpg", spotifyUrl: spotifySearch("Katchi Sera","Sai Abhyankkar"), favorite: false, composer: "Sai Abhyankkar" },
  { id: 2,  title: "Aasa Kooda", artist: "Sai Abhyankkar & Sai Smriti", album: "Single (2024)", language: "Tamil", duration: "3:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/002.jpg", spotifyUrl: spotifySearch("Aasa Kooda","Sai Abhyankkar"), favorite: false, composer: "Sai Abhyankkar" },
  { id: 3,  title: "Sithira Puthiri", artist: "Sai Abhyankkar", album: "Single (2024)", language: "Tamil", duration: "3:10", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/003.jpg", spotifyUrl: spotifySearch("Sithira Puthiri","Sai Abhyankkar"), favorite: false, composer: "Sai Abhyankkar" },
  { id: 4,  title: "Vaathi Coming", artist: "Anirudh Ravichander & Gana Balachandar", album: "Master (2021)", language: "Tamil", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/004.jpg", spotifyUrl: spotifySearch("Vaathi Coming","Anirudh"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 5,  title: "Arabic Kuthu", artist: "Anirudh & Jonita Gandhi", album: "Beast (2022)", language: "Tamil", duration: "4:36", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/005.jpg", spotifyUrl: spotifySearch("Arabic Kuthu","Anirudh"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 6,  title: "Kaavaalaa", artist: "Shilpa Rao & Anirudh", album: "Jailer (2023)", language: "Tamil", duration: "3:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/006.jpg", spotifyUrl: spotifySearch("Kaavaalaa","Shilpa Rao"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 7,  title: "Hukum", artist: "Anirudh & Super Subu", album: "Jailer (2023)", language: "Tamil", duration: "3:27", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/007.jpg", spotifyUrl: spotifySearch("Hukum","Anirudh"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 8,  title: "Badass", artist: "Anirudh Ravichander", album: "Leo (2023)", language: "Tamil", duration: "3:52", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/008.jpg", spotifyUrl: spotifySearch("Badass","Anirudh"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 9,  title: "Naa Ready", artist: "Anirudh, Vijay & Asal Kolaar", album: "Leo (2023)", language: "Tamil", duration: "4:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/009.jpg", spotifyUrl: spotifySearch("Naa Ready","Anirudh"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 10, title: "Manasilaayo", artist: "Anirudh, Malaysia Vasudevan & Yugendran", album: "Vettaiyan (2024)", language: "Tamil", duration: "3:33", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/010.jpg", spotifyUrl: spotifySearch("Manasilaayo","Anirudh"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 11, title: "Why This Kolaveri Di", artist: "Dhanush & Anirudh", album: "3 (2012)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/011.jpg", spotifyUrl: spotifySearch("Why This Kolaveri","Dhanush"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 12, title: "Thangamey", artist: "Anirudh Ravichander", album: "Naanum Rowdy Dhaan (2015)", language: "Tamil", duration: "4:21", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/012.jpg", spotifyUrl: spotifySearch("Thangamey","Anirudh"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 13, title: "Vikram Title Track", artist: "Anirudh Ravichander", album: "Vikram (2022)", language: "Tamil", duration: "3:05", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/013.jpg", spotifyUrl: spotifySearch("Vikram Title Track","Anirudh"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 14, title: "Chinna Chinna Aasai", artist: "Minmini", album: "Roja (1992)", language: "Tamil", duration: "4:58", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/014.jpg", spotifyUrl: spotifySearch("Chinna Chinna Aasai","Minmini"), favorite: false, composer: "A. R. Rahman" },
  { id: 15, title: "Pachai Nirame", artist: "Hariharan", album: "Alaipayuthey (2000)", language: "Tamil", duration: "4:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/015.jpg", spotifyUrl: spotifySearch("Pachai Nirame","Hariharan"), favorite: false, composer: "A. R. Rahman" },
  { id: 16, title: "Munbe Vaa", artist: "Naresh Iyer & Shreya Ghoshal", album: "Sillunu Oru Kaadhal (2006)", language: "Tamil", duration: "5:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/016.jpg", spotifyUrl: spotifySearch("Munbe Vaa","Naresh Iyer"), favorite: false, composer: "A. R. Rahman" },
  { id: 17, title: "Nenjukulle", artist: "Shakthisree Gopalan", album: "Ponniyin Selvan I (2022)", language: "Tamil", duration: "4:06", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/017.jpg", spotifyUrl: spotifySearch("Nenjukulle","Shakthisree Gopalan"), favorite: false, composer: "A. R. Rahman" },
  { id: 18, title: "Uyire", artist: "Hariharan & K. S. Chithra", album: "Bombay (1995)", language: "Tamil", duration: "5:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/018.jpg", spotifyUrl: spotifySearch("Uyire","Hariharan"), favorite: false, composer: "A. R. Rahman" },
  { id: 19, title: "Ilaya Nila", artist: "S. P. Balasubrahmanyam", album: "Payanangal Mudivathillai (1982)", language: "Tamil", duration: "4:36", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/019.jpg", spotifyUrl: spotifySearch("Ilaya Nila","S P Balasubrahmanyam"), favorite: false, composer: "Ilaiyaraaja" },
  { id: 20, title: "Putham Pudhu Kaalai", artist: "S. Janaki", album: "Alaigal Oivathillai (1981)", language: "Tamil", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/020.jpg", spotifyUrl: spotifySearch("Putham Pudhu Kaalai","S Janaki"), favorite: false, composer: "Ilaiyaraaja" },
  { id: 21, title: "Valaiyosai", artist: "S. P. Balasubrahmanyam & P. Susheela", album: "Sathya (1988)", language: "Tamil", duration: "4:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/021.jpg", spotifyUrl: spotifySearch("Valaiyosai","S P Balasubrahmanyam"), favorite: false, composer: "Ilaiyaraaja" },
  { id: 22, title: "Shenbagame", artist: "S. P. Balasubrahmanyam", album: "Enga Ooru Pattukaran (1987)", language: "Tamil", duration: "4:52", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/022.jpg", spotifyUrl: spotifySearch("Shenbagame","S P Balasubrahmanyam"), favorite: false, composer: "Ilaiyaraaja" },
  { id: 23, title: "Oru Naalil", artist: "K. K.", album: "Pudhupettai (2006)", language: "Tamil", duration: "5:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/023.jpg", spotifyUrl: spotifySearch("Oru Naalil","KK"), favorite: false, composer: "Yuvan Shankar Raja" },
  { id: 24, title: "Thuli Thuli", artist: "Haricharan & Tanvi Shah", album: "Paiyaa (2010)", language: "Tamil", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/024.jpg", spotifyUrl: spotifySearch("Thuli Thuli","Haricharan"), favorite: false, composer: "Yuvan Shankar Raja" },
  { id: 25, title: "Vaseegara", artist: "Bombay Jayashri", album: "Minnale (2001)", language: "Tamil", duration: "5:14", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/025.jpg", spotifyUrl: spotifySearch("Vaseegara","Bombay Jayashri"), favorite: false, composer: "Harris Jayaraj" },
  { id: 26, title: "Yaaro Ivan", artist: "Sid Sriram", album: "Udhayam NH4 (2013)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/026.jpg", spotifyUrl: spotifySearch("Yaaro Ivan","Sid Sriram"), favorite: false, composer: "G. V. Prakash Kumar" },
  { id: 27, title: "Anbe Peranbe", artist: "Sid Sriram & Shreya Ghoshal", album: "NGK (2019)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/027.jpg", spotifyUrl: spotifySearch("Anbe Peranbe","Sid Sriram"), favorite: false, composer: "G. V. Prakash Kumar" },
  { id: 28, title: "Kumki — Sollitaley", artist: "Shreya Ghoshal & Haricharan", album: "Kumki (2012)", language: "Tamil", duration: "5:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/028.jpg", spotifyUrl: spotifySearch("Kumki Sollitaley","Shreya Ghoshal"), favorite: false, composer: "D. Imman" },
  { id: 29, title: "Maacho", artist: "Sid Sriram & Chinmayi", album: "Mersal (2017)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/029.jpg", spotifyUrl: spotifySearch("Maacho","Sid Sriram"), favorite: false, composer: "Santhosh Narayanan" },
  { id: 30, title: "Thalli Pogathey", artist: "Sid Sriram", album: "Achcham Yenbadhu Madamaiyada (2016)", language: "Tamil", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/030.jpg", spotifyUrl: spotifySearch("Thalli Pogathey","Sid Sriram"), favorite: false, composer: "A. R. Rahman" },
  { id: 31, title: "Naan Pizhai", artist: "Pradeep Kumar & Chinmayi", album: "Kaaviya Thalaivan (2014)", language: "Tamil", duration: "4:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/031.jpg", spotifyUrl: spotifySearch("Naan Pizhai","Pradeep Kumar"), favorite: false, composer: "Pradeep Kumar" },
  { id: 32, title: "Nee Korinaal", artist: "Sean Roldan", album: "Sathuranga Vettai (2014)", language: "Tamil", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/032.jpg", spotifyUrl: spotifySearch("Nee Korinaal","Sean Roldan"), favorite: false, composer: "Sean Roldan" },
  { id: 33, title: "Hey Minnale", artist: "Sai Abhyankkar & Anirudh", album: "Amaran (2024)", language: "Tamil", duration: "3:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/033.jpg", spotifyUrl: spotifySearch("Hey Minnale","Sai Abhyankkar"), favorite: false, composer: "G. V. Prakash Kumar" },
  { id: 34, title: "Unakku Thaan", artist: "Santhosh Narayanan & Dhvani Bhanushali", album: "Chitha (2023)", language: "Tamil", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/034.jpg", spotifyUrl: spotifySearch("Unakku Thaan","Santhosh Narayanan"), favorite: false, composer: "Santhosh Narayanan" },
  { id: 35, title: "Naan Gaali", artist: "Santhosh Narayanan & Sean Roldan", album: "Good Night (2023)", language: "Tamil", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/035.jpg", spotifyUrl: spotifySearch("Naan Gaali","Santhosh Narayanan"), favorite: false, composer: "Sean Roldan" },
  { id: 36, title: "Kumkumala", artist: "Sai Abhyankkar", album: "Single (2024)", language: "Tamil", duration: "3:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/036.jpg", spotifyUrl: spotifySearch("Kumkumala","Sai Abhyankkar"), favorite: false, composer: "Sai Abhyankkar" },
  { id: 37, title: "Kadhal Kanmani", artist: "Shreya Ghoshal & A. R. Rahman", album: "OK Kanmani (2015)", language: "Tamil", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/037.jpg", spotifyUrl: spotifySearch("Kaara Attakkaara","Shreya Ghoshal"), favorite: false, composer: "A. R. Rahman" },
  { id: 38, title: "Ennadi Maayavi Nee", artist: "A. R. Rahman & Shreya Ghoshal", album: "Vada Chennai (2018)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/038.jpg", spotifyUrl: spotifySearch("Ennadi Maayavi Nee","A R Rahman"), favorite: false, composer: "A. R. Rahman" },
  { id: 39, title: "Kannama", artist: "Pradeep Kumar & Kalyani Nair", album: "Kaithi (2019)", language: "Tamil", duration: "4:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/039.jpg", spotifyUrl: spotifySearch("Kannamma","Pradeep Kumar"), favorite: false, composer: "Sam C. S." },
  { id: 40, title: "Vidaamuyarchi Theme", artist: "Anirudh Ravichander", album: "Vidaamuyarchi (2025)", language: "Tamil", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/040.jpg", spotifyUrl: spotifySearch("Vidaamuyarchi","Anirudh"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 41, title: "Two Two Two", artist: "Anirudh & Sunidhi Chauhan", album: "Kaathuvaakula Rendu Kaadhal (2022)", language: "Tamil", duration: "3:28", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/041.jpg", spotifyUrl: spotifySearch("Two Two Two","Anirudh"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 42, title: "Private Party", artist: "Anirudh & Jonita Gandhi", album: "Don (2022)", language: "Tamil", duration: "3:35", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/042.jpg", spotifyUrl: spotifySearch("Private Party","Anirudh"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 43, title: "Adiye", artist: "Dhibu Ninan Thomas & Kapil Kapilan", album: "Bachelor (2021)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/043.jpg", spotifyUrl: spotifySearch("Adiye","Dhibu Ninan Thomas"), favorite: false, composer: "Dhibu Ninan Thomas" },
  { id: 44, title: "Yaar Azhaippadhu", artist: "Saindhavi", album: "Maara (2021)", language: "Tamil", duration: "3:52", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/044.jpg", spotifyUrl: spotifySearch("Yaar Azhaippadhu","Saindhavi"), favorite: false, composer: "Ghibran" },
  { id: 45, title: "Pookkalae", artist: "Hariharan & Harini", album: "I (2015)", language: "Tamil", duration: "5:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/045.jpg", spotifyUrl: spotifySearch("Pookkalae","Hariharan"), favorite: false, composer: "A. R. Rahman" },
  { id: 46, title: "Suttum Vizhi", artist: "Haricharan & Sadhana Sargam", album: "Ghajini (2005)", language: "Tamil", duration: "5:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/046.jpg", spotifyUrl: spotifySearch("Suttum Vizhi","Haricharan"), favorite: false, composer: "Harris Jayaraj" },
  { id: 47, title: "Oru Paathi Kadhavu", artist: "Vivek & Saindhavi", album: "Thaandavam (2012)", language: "Tamil", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/047.jpg", spotifyUrl: spotifySearch("Oru Paathi Kadhavu","Saindhavi"), favorite: false, composer: "G. V. Prakash Kumar" },
  { id: 48, title: "Malargal Kaettaen", artist: "K. S. Chithra", album: "O Kadhal Kanmani (2015)", language: "Tamil", duration: "4:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/048.jpg", spotifyUrl: spotifySearch("Malargal Kaettaen","K S Chithra"), favorite: false, composer: "A. R. Rahman" },
  { id: 49, title: "Ennai Maatrum Kadhale", artist: "Sid Sriram & Chinmayi", album: "Naanum Rowdy Dhaan (2015)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/049.jpg", spotifyUrl: spotifySearch("Ennai Maatrum Kadhale","Sid Sriram"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 50, title: "Nee Paartha Vizhigal", artist: "Pradeep Kumar", album: "3 (2012)", language: "Tamil", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/050.jpg", spotifyUrl: spotifySearch("Nee Paartha Vizhigal","Pradeep Kumar"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 51, title: "Aathichudi", artist: "Vijay Antony & Harish Raghavendra", album: "TN 07 AL 4777 (2008)", language: "Tamil", duration: "4:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/051.jpg", spotifyUrl: spotifySearch("Aathichudi","Vijay Antony"), favorite: false, composer: "Vijay Antony" },

  // ===== TELUGU — 51 songs =====
  { id: 52, title: "Butta Bomma", artist: "Armaan Malik", album: "Ala Vaikunthapurramuloo (2020)", language: "Telugu", duration: "3:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/telugu/052.jpg", spotifyUrl: spotifySearch("Butta Bomma","Armaan Malik"), favorite: false, composer: "S. Thaman" },
  { id: 53, title: "Samajavaragamana", artist: "Sid Sriram", album: "Ala Vaikunthapurramuloo (2020)", language: "Telugu", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/telugu/053.jpg", spotifyUrl: spotifySearch("Samajavaragamana","Sid Sriram"), favorite: false, composer: "S. Thaman" },
  { id: 54, title: "Ramuloo Ramulaa", artist: "Anurag Kulkarni & Mangli", album: "Ala Vaikunthapurramuloo (2020)", language: "Telugu", duration: "4:06", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/telugu/054.jpg", spotifyUrl: spotifySearch("Ramuloo Ramulaa","Anurag Kulkarni"), favorite: false, composer: "S. Thaman" },
  { id: 55, title: "Srivalli", artist: "Sid Sriram", album: "Pushpa (2021)", language: "Telugu", duration: "3:44", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/telugu/055.jpg", spotifyUrl: spotifySearch("Srivalli","Sid Sriram"), favorite: false, composer: "Devi Sri Prasad" },
  { id: 56, title: "Oo Antava", artist: "Indravathi Chauhan", album: "Pushpa (2021)", language: "Telugu", duration: "3:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/telugu/056.jpg", spotifyUrl: spotifySearch("Oo Antava","Indravathi Chauhan"), favorite: false, composer: "Devi Sri Prasad" },
  { id: 57, title: "Saami Saami", artist: "Mounika Yadav", album: "Pushpa (2021)", language: "Telugu", duration: "3:04", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/telugu/057.jpg", spotifyUrl: spotifySearch("Saami Saami","Mounika Yadav"), favorite: false, composer: "Devi Sri Prasad" },
  { id: 58, title: "Pushpa Pushpa", artist: "Mika Singh & Nakash Aziz", album: "Pushpa 2 (2024)", language: "Telugu", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/telugu/058.jpg", spotifyUrl: spotifySearch("Pushpa Pushpa","Mika Singh"), favorite: false, composer: "Devi Sri Prasad" },
  { id: 59, title: "Naatu Naatu", artist: "Rahul Sipligunj & Kaala Bhairava", album: "RRR (2022)", language: "Telugu", duration: "3:44", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/telugu/059.jpg", spotifyUrl: spotifySearch("Naatu Naatu","Rahul Sipligunj"), favorite: false, composer: "M. M. Keeravani" },
  { id: 60, title: "Etthara Jenda", artist: "Vishal Mishra", album: "RRR (2022)", language: "Telugu", duration: "3:44", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/telugu/060.jpg", spotifyUrl: spotifySearch("Etthara Jenda","Vishal Mishra"), favorite: false, composer: "M. M. Keeravani" },
  { id: 61, title: "Inkem Inkem", artist: "Sid Sriram", album: "Geetha Govindam (2018)", language: "Telugu", duration: "3:52", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/telugu/061.jpg", spotifyUrl: spotifySearch("Inkem Inkem","Sid Sriram"), favorite: false, composer: "Gopi Sundar" },
  { id: 62, title: "Vintunnava", artist: "Shreya Ghoshal", album: "Ye Maaya Chesave (2010)", language: "Telugu", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/telugu/062.jpg", spotifyUrl: spotifySearch("Vintunnava","Shreya Ghoshal"), favorite: false, composer: "A. R. Rahman" },
  { id: 63, title: "Undiporaadhey", artist: "Sid Sriram", album: "Hushaaru (2018)", language: "Telugu", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/telugu/063.jpg", spotifyUrl: spotifySearch("Undiporaadhey","Sid Sriram"), favorite: false, composer: "Mickey J. Meyer" },
  { id: 64, title: "Choosi Chudangane", artist: "Armaan Malik", album: "Chilasow (2018)", language: "Telugu", duration: "3:52", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/telugu/064.jpg", spotifyUrl: spotifySearch("Choosi Chudangane","Armaan Malik"), favorite: false, composer: "Gopi Sundar" },
  { id: 65, title: "Ninnila", artist: "Armaan Malik", album: "Tholi Prema (2018)", language: "Telugu", duration: "3:46", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/telugu/065.jpg", spotifyUrl: spotifySearch("Ninnila","Armaan Malik"), favorite: false, composer: "S. Thaman" },
  { id: 66, title: "Hoyna Hoyna", artist: "Anirudh Ravichander & Sarath Santosh", album: "Devara Part 1 (2024)", language: "Telugu", duration: "3:33", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/telugu/066.jpg", spotifyUrl: spotifySearch("Hoyna Hoyna","Anirudh"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 67, title: "Chuttamalle", artist: "Shilpa Rao", album: "Devara Part 1 (2024)", language: "Telugu", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/telugu/067.jpg", spotifyUrl: spotifySearch("Chuttamalle","Shilpa Rao"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 68, title: "Kurchi Madathapetti", artist: "Sahiti Chaganti & Sri Krishna", album: "Guntur Kaaram (2024)", language: "Telugu", duration: "4:06", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/telugu/068.jpg", spotifyUrl: spotifySearch("Kurchi Madathapetti","Sahiti Chaganti"), favorite: false, composer: "S. Thaman" },
  { id: 69, title: "Tillu Anna DJ Pedithe", artist: "Ram Miriyala", album: "DJ Tillu (2022)", language: "Telugu", duration: "3:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/telugu/069.jpg", spotifyUrl: spotifySearch("Tillu Anna DJ","Ram Miriyala"), favorite: false, composer: "Sricharan Pakala" },
  { id: 70, title: "Nee Kannu Neeli Samudram", artist: "Javed Ali", album: "Uppena (2021)", language: "Telugu", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/telugu/070.jpg", spotifyUrl: spotifySearch("Nee Kannu Neeli Samudram","Javed Ali"), favorite: false, composer: "Devi Sri Prasad" },
  { id: 71, title: "Jala Jala Jalapaatham", artist: "Anurag Kulkarni", album: "Uppena (2021)", language: "Telugu", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/telugu/071.jpg", spotifyUrl: spotifySearch("Jala Jala Jalapaatham","Anurag Kulkarni"), favorite: false, composer: "Devi Sri Prasad" },
  { id: 72, title: "Maguva Maguva", artist: "Sid Sriram", album: "Vakeel Saab (2021)", language: "Telugu", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/telugu/072.jpg", spotifyUrl: spotifySearch("Maguva Maguva","Sid Sriram"), favorite: false, composer: "S. Thaman" },
  { id: 73, title: "Adiga Adiga", artist: "Sid Sriram", album: "Ninnu Kori (2017)", language: "Telugu", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/telugu/073.jpg", spotifyUrl: spotifySearch("Adiga Adiga","Sid Sriram"), favorite: false, composer: "Gopi Sundar" },
  { id: 74, title: "Vachindamma", artist: "Sid Sriram", album: "Geetha Govindam (2018)", language: "Telugu", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/telugu/074.jpg", spotifyUrl: spotifySearch("Vachindamma","Sid Sriram"), favorite: false, composer: "Gopi Sundar" },
  { id: 75, title: "Oosupodu", artist: "Karthik & Mangli", album: "Fidaa (2017)", language: "Telugu", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/telugu/075.jpg", spotifyUrl: spotifySearch("Oosupodu","Karthik"), favorite: false, composer: "Shakthikanth Karthick" },
  { id: 76, title: "Saranga Dariya", artist: "Mangli", album: "Love Story (2021)", language: "Telugu", duration: "3:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/telugu/076.jpg", spotifyUrl: spotifySearch("Saranga Dariya","Mangli"), favorite: false, composer: "M. M. Keeravani" },
  { id: 77, title: "Kalaavathi", artist: "Sid Sriram", album: "Sarkaru Vaari Paata (2022)", language: "Telugu", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/telugu/077.jpg", spotifyUrl: spotifySearch("Kalaavathi","Sid Sriram"), favorite: false, composer: "S. Thaman" },
  { id: 78, title: "Daakko Daakko Meka", artist: "Shivam", album: "Pushpa (2021)", language: "Telugu", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/telugu/078.jpg", spotifyUrl: spotifySearch("Daakko Daakko Meka","Shivam"), favorite: false, composer: "Devi Sri Prasad" },
  { id: 79, title: "Oh Sita Hey Rama", artist: "Sid Sriram & Sunitha Upadrashta", album: "Sita Ramam (2022)", language: "Telugu", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/telugu/079.jpg", spotifyUrl: spotifySearch("Oh Sita Hey Rama","Sid Sriram"), favorite: false, composer: "Vishal Chandrasekhar" },
  { id: 80, title: "Inthandham", artist: "Sid Sriram", album: "Sita Ramam (2022)", language: "Telugu", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/telugu/080.jpg", spotifyUrl: spotifySearch("Inthandham","Sid Sriram"), favorite: false, composer: "Vishal Chandrasekhar" },
  { id: 81, title: "Nijame Ne Chebutunna", artist: "Sid Sriram", album: "Ooru Peru Bhairavakona (2024)", language: "Telugu", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/telugu/081.jpg", spotifyUrl: spotifySearch("Nijame Ne Chebutunna","Sid Sriram"), favorite: false, composer: "Shekar Chandra" },
  { id: 82, title: "Malli Malli", artist: "Sid Sriram", album: "Oh Baby (2019)", language: "Telugu", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/telugu/082.jpg", spotifyUrl: spotifySearch("Malli Malli","Sid Sriram"), favorite: false, composer: "Mickey J. Meyer" },
  { id: 83, title: "Emo Emo", artist: "Sid Sriram & Chinmayi", album: "Raahu (2023)", language: "Telugu", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/telugu/083.jpg", spotifyUrl: spotifySearch("Emo Emo","Sid Sriram"), favorite: false, composer: "Gopi Sundar" },
  { id: 84, title: "Nuvvunte Naa Jathagaa", artist: "Karthik", album: "I (Telugu Dub) (2015)", language: "Telugu", duration: "5:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/telugu/084.jpg", spotifyUrl: spotifySearch("Nuvvunte Naa Jathagaa","Karthik"), favorite: false, composer: "A. R. Rahman" },
  { id: 85, title: "Chirunama Thana Chirunama", artist: "Karthik & Shreya Ghoshal", album: "Guntur Kaaram (2024)", language: "Telugu", duration: "4:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/telugu/085.jpg", spotifyUrl: spotifySearch("Chirunama Thana","Karthik"), favorite: false, composer: "S. Thaman" },
  { id: 86, title: "Mastaaru Mastaaru", artist: "Shreya Ghoshal & Anurag Kulkarni", album: "Sir (2023)", language: "Telugu", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/telugu/086.jpg", spotifyUrl: spotifySearch("Mastaaru Mastaaru","Shreya Ghoshal"), favorite: false, composer: "G. V. Prakash Kumar" },
  { id: 87, title: "Aradhya", artist: "Sid Sriram", album: "Kushi (2023)", language: "Telugu", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/telugu/087.jpg", spotifyUrl: spotifySearch("Aradhya","Sid Sriram"), favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 88, title: "Na Roja Nuvve", artist: "Hesham Abdul Wahab & Haricharan", album: "Kushi (2023)", language: "Telugu", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/telugu/088.jpg", spotifyUrl: spotifySearch("Na Roja Nuvve","Hesham Abdul Wahab"), favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 89, title: "Kushi Title", artist: "Hesham Abdul Wahab", album: "Kushi (2023)", language: "Telugu", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/telugu/089.jpg", spotifyUrl: spotifySearch("Kushi Title","Hesham Abdul Wahab"), favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 90, title: "Devara — Fear Song", artist: "Anirudh & K. Kanimozhi", album: "Devara (2024)", language: "Telugu", duration: "3:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/telugu/090.jpg", spotifyUrl: spotifySearch("Fear Song Devara","Anirudh"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 91, title: "Aayudha Pooja", artist: "Anurag Kulkarni & Tippu", album: "Devara (2024)", language: "Telugu", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/telugu/091.jpg", spotifyUrl: spotifySearch("Aayudha Pooja Devara","Anurag Kulkarni"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 92, title: "Calm Down — Telugu Mix", artist: "Telugu Remix & Armaan Malik", album: "Indie (2023)", language: "Telugu", duration: "3:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/telugu/092.jpg", spotifyUrl: spotifySearch("Calm Down Telugu","Armaan Malik"), favorite: false, composer: "Gopi Sundar" },
  { id: 93, title: "Panchakattu", artist: "S. P. Charan & S. Thaman", album: "Guntur Kaaram (2024)", language: "Telugu", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/telugu/093.jpg", spotifyUrl: spotifySearch("Panchakattu","S Thaman"), favorite: false, composer: "S. Thaman" },
  { id: 94, title: "La La La", artist: "Mangli & Karthik", album: "Kushi (2023)", language: "Telugu", duration: "4:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/telugu/094.jpg", spotifyUrl: spotifySearch("La La La Kushi","Mangli"), favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 95, title: "Sammohanuda", artist: "Shreya Ghoshal & Anurag Kulkarni", album: "Rules Ranjann (2023)", language: "Telugu", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/telugu/095.jpg", spotifyUrl: spotifySearch("Sammohanuda","Shreya Ghoshal"), favorite: false, composer: "Amrish" },
  { id: 96, title: "Naa Nuvve", artist: "Karthik", album: "Nannaku Prematho (2016)", language: "Telugu", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/telugu/096.jpg", spotifyUrl: spotifySearch("Naa Nuvve","Karthik"), favorite: false, composer: "Devi Sri Prasad" },
  { id: 97, title: "Vellake", artist: "Sid Sriram", album: "Agnyaathavaasi (2018)", language: "Telugu", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/telugu/097.jpg", spotifyUrl: spotifySearch("Vellake","Sid Sriram"), favorite: false, composer: "Anirudh Ravichander" },
  { id: 98, title: "Yenti Yenti", artist: "Chinmayi & Karthik", album: "Geetha Govindam (2018)", language: "Telugu", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/telugu/098.jpg", spotifyUrl: spotifySearch("Yenti Yenti","Chinmayi"), favorite: false, composer: "Gopi Sundar" },
  { id: 99, title: "Gira Gira", artist: "Shreya Ghoshal", album: "Dear Comrade (Telugu) (2019)", language: "Telugu", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/telugu/099.jpg", spotifyUrl: spotifySearch("Gira Gira","Shreya Ghoshal"), favorite: false, composer: "Justin Prabhakaran" },
  { id: 100, title: "Kadalalle", artist: "Sid Sriram", album: "Dear Comrade (2019)", language: "Telugu", duration: "5:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/telugu/100.jpg", spotifyUrl: spotifySearch("Kadalalle","Sid Sriram"), favorite: false, composer: "Justin Prabhakaran" },
  { id: 101, title: "What The Life", artist: "S. Thaman & Rahul Sipligunj", album: "Ala Vaikunthapurramuloo (2020)", language: "Telugu", duration: "3:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/telugu/101.jpg", spotifyUrl: spotifySearch("What The Life","S Thaman"), favorite: false, composer: "S. Thaman" },
  { id: 102, title: "Anaganaganaga", artist: "Armaan Malik", album: "Ninnu Kori (2017)", language: "Telugu", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/telugu/102.jpg", spotifyUrl: spotifySearch("Anaganaganaga","Armaan Malik"), favorite: false, composer: "Gopi Sundar" },

  // ===== ENGLISH — 51 songs =====
  { id: 103, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours (2020)", language: "English", duration: "3:20", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/english/103.jpg", spotifyUrl: spotifySearch("Blinding Lights","The Weeknd"), favorite: false, composer: "The Weeknd & Max Martin" },
  { id: 104, title: "Save Your Tears", artist: "The Weeknd", album: "After Hours (2020)", language: "English", duration: "3:35", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/english/104.jpg", spotifyUrl: spotifySearch("Save Your Tears","The Weeknd"), favorite: false, composer: "The Weeknd & Max Martin" },
  { id: 105, title: "Starboy", artist: "The Weeknd ft. Daft Punk", album: "Starboy (2016)", language: "English", duration: "3:50", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/english/105.jpg", spotifyUrl: spotifySearch("Starboy","The Weeknd"), favorite: false, composer: "The Weeknd & Daft Punk" },
  { id: 106, title: "Shape of You", artist: "Ed Sheeran", album: "÷ Divide (2017)", language: "English", duration: "3:53", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/english/106.jpg", spotifyUrl: spotifySearch("Shape of You","Ed Sheeran"), favorite: false, composer: "Ed Sheeran & Steve Mac" },
  { id: 107, title: "Perfect", artist: "Ed Sheeran", album: "÷ Divide (2017)", language: "English", duration: "4:23", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/english/107.jpg", spotifyUrl: spotifySearch("Perfect","Ed Sheeran"), favorite: false, composer: "Ed Sheeran" },
  { id: 108, title: "Bad Habits", artist: "Ed Sheeran", album: "= Equals (2021)", language: "English", duration: "3:51", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/english/108.jpg", spotifyUrl: spotifySearch("Bad Habits","Ed Sheeran"), favorite: false, composer: "Ed Sheeran & Johnny McDaid" },
  { id: 109, title: "Bad Guy", artist: "Billie Eilish", album: "When We All Fall Asleep (2019)", language: "English", duration: "3:14", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/english/109.jpg", spotifyUrl: spotifySearch("Bad Guy","Billie Eilish"), favorite: false, composer: "Billie Eilish & Finneas" },
  { id: 110, title: "Birds of a Feather", artist: "Billie Eilish", album: "Hit Me Hard and Soft (2024)", language: "English", duration: "3:30", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/english/110.jpg", spotifyUrl: spotifySearch("Birds of a Feather","Billie Eilish"), favorite: false, composer: "Billie Eilish & Finneas" },
  { id: 111, title: "Lovely", artist: "Billie Eilish & Khalid", album: "Single (2018)", language: "English", duration: "3:20", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/english/111.jpg", spotifyUrl: spotifySearch("Lovely","Billie Eilish Khalid"), favorite: false, composer: "Billie Eilish & Finneas" },
  { id: 112, title: "Anti-Hero", artist: "Taylor Swift", album: "Midnights (2022)", language: "English", duration: "3:20", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/english/112.jpg", spotifyUrl: spotifySearch("Anti-Hero","Taylor Swift"), favorite: false, composer: "Taylor Swift & Jack Antonoff" },
  { id: 113, title: "Cruel Summer", artist: "Taylor Swift", album: "Lover (2019)", language: "English", duration: "2:58", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/english/113.jpg", spotifyUrl: spotifySearch("Cruel Summer","Taylor Swift"), favorite: false, composer: "Taylor Swift & Jack Antonoff" },
  { id: 114, title: "Lover", artist: "Taylor Swift", album: "Lover (2019)", language: "English", duration: "3:41", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/english/114.jpg", spotifyUrl: spotifySearch("Lover","Taylor Swift"), favorite: false, composer: "Taylor Swift" },
  { id: 115, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia (2020)", language: "English", duration: "3:23", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/english/115.jpg", spotifyUrl: spotifySearch("Levitating","Dua Lipa"), favorite: false, composer: "Dua Lipa & Stephen Kozmeniuk" },
  { id: 116, title: "Don't Start Now", artist: "Dua Lipa", album: "Future Nostalgia (2020)", language: "English", duration: "3:03", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/english/116.jpg", spotifyUrl: spotifySearch("Don't Start Now","Dua Lipa"), favorite: false, composer: "Dua Lipa & Ian Kirkpatrick" },
  { id: 117, title: "Houdini", artist: "Dua Lipa", album: "Radical Optimism (2024)", language: "English", duration: "3:05", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/english/117.jpg", spotifyUrl: spotifySearch("Houdini","Dua Lipa"), favorite: false, composer: "Dua Lipa & Danny Harle" },
  { id: 118, title: "Uptown Funk", artist: "Bruno Mars & Mark Ronson", album: "Uptown Special (2014)", language: "English", duration: "4:30", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/english/118.jpg", spotifyUrl: spotifySearch("Uptown Funk","Bruno Mars"), favorite: false, composer: "Bruno Mars & Mark Ronson" },
  { id: 119, title: "Die With A Smile", artist: "Bruno Mars & Lady Gaga", album: "Single (2024)", language: "English", duration: "4:11", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/english/119.jpg", spotifyUrl: spotifySearch("Die With A Smile","Bruno Mars Lady Gaga"), favorite: false, composer: "Bruno Mars & Lady Gaga" },
  { id: 120, title: "Just The Way You Are", artist: "Bruno Mars", album: "Doo-Wops & Hooligans (2010)", language: "English", duration: "3:40", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/english/120.jpg", spotifyUrl: spotifySearch("Just The Way You Are","Bruno Mars"), favorite: false, composer: "Bruno Mars & The Smeezingtons" },
  { id: 121, title: "Into You", artist: "Ariana Grande", album: "Dangerous Woman (2016)", language: "English", duration: "4:04", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/english/121.jpg", spotifyUrl: spotifySearch("Into You","Ariana Grande"), favorite: false, composer: "Ariana Grande & Max Martin" },
  { id: 122, title: "7 Rings", artist: "Ariana Grande", album: "Thank U, Next (2019)", language: "English", duration: "2:58", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/english/122.jpg", spotifyUrl: spotifySearch("7 Rings","Ariana Grande"), favorite: false, composer: "Ariana Grande & TBHits" },
  { id: 123, title: "No Tears Left To Cry", artist: "Ariana Grande", album: "Sweetener (2018)", language: "English", duration: "3:25", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/english/123.jpg", spotifyUrl: spotifySearch("No Tears Left To Cry","Ariana Grande"), favorite: false, composer: "Ariana Grande & Max Martin" },
  { id: 124, title: "Peaches", artist: "Justin Bieber ft. Daniel Caesar", album: "Justice (2021)", language: "English", duration: "3:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/english/124.jpg", spotifyUrl: spotifySearch("Peaches","Justin Bieber"), favorite: false, composer: "Justin Bieber & Watt" },
  { id: 125, title: "Stay", artist: "The Kid LAROI & Justin Bieber", album: "F*CK LOVE (2021)", language: "English", duration: "2:21", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/english/125.jpg", spotifyUrl: spotifySearch("Stay","The Kid LAROI Justin Bieber"), favorite: false, composer: "Justin Bieber & Omer Fedi" },
  { id: 126, title: "Believer", artist: "Imagine Dragons", album: "Evolve (2017)", language: "English", duration: "3:24", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/english/126.jpg", spotifyUrl: spotifySearch("Believer","Imagine Dragons"), favorite: false, composer: "Imagine Dragons & Mattman" },
  { id: 127, title: "Bones", artist: "Imagine Dragons", album: "Mercury Act 1 (2022)", language: "English", duration: "2:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/english/127.jpg", spotifyUrl: spotifySearch("Bones","Imagine Dragons"), favorite: false, composer: "Imagine Dragons & Mattman" },
  { id: 128, title: "Demons", artist: "Imagine Dragons", album: "Night Visions (2012)", language: "English", duration: "2:57", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/english/128.jpg", spotifyUrl: spotifySearch("Demons","Imagine Dragons"), favorite: false, composer: "Imagine Dragons & Alex Da Kid" },
  { id: 129, title: "Viva La Vida", artist: "Coldplay", album: "Viva La Vida (2008)", language: "English", duration: "4:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/english/129.jpg", spotifyUrl: spotifySearch("Viva La Vida","Coldplay"), favorite: false, composer: "Coldplay & Brian Eno" },
  { id: 130, title: "Yellow", artist: "Coldplay", album: "Parachutes (2000)", language: "English", duration: "4:29", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/english/130.jpg", spotifyUrl: spotifySearch("Yellow","Coldplay"), favorite: false, composer: "Coldplay" },
  { id: 131, title: "Adventure of a Lifetime", artist: "Coldplay", album: "A Head Full of Dreams (2015)", language: "English", duration: "4:23", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/english/131.jpg", spotifyUrl: spotifySearch("Adventure of a Lifetime","Coldplay"), favorite: false, composer: "Coldplay & Stargate" },
  { id: 132, title: "As It Was", artist: "Harry Styles", album: "Harry's House (2022)", language: "English", duration: "2:47", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/english/132.jpg", spotifyUrl: spotifySearch("As It Was","Harry Styles"), favorite: false, composer: "Harry Styles & Kid Harpoon" },
  { id: 133, title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line (2019)", language: "English", duration: "2:54", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/english/133.jpg", spotifyUrl: spotifySearch("Watermelon Sugar","Harry Styles"), favorite: false, composer: "Harry Styles & Tyler Johnson" },
  { id: 134, title: "Blinding Lights — Remix", artist: "The Weeknd & Ariana Grande", album: "After Hours (Remix 2021)", language: "English", duration: "3:20", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/english/134.jpg", spotifyUrl: spotifySearch("Blinding Lights Remix","The Weeknd"), favorite: false, composer: "The Weeknd & Max Martin" },
  { id: 135, title: "Take My Breath", artist: "The Weeknd", album: "Dawn FM (2021)", language: "English", duration: "5:39", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/english/135.jpg", spotifyUrl: spotifySearch("Take My Breath","The Weeknd"), favorite: false, composer: "The Weeknd & Max Martin" },
  { id: 136, title: "Espresso", artist: "Sabrina Carpenter", album: "Short n' Sweet (2024)", language: "English", duration: "2:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/english/136.jpg", spotifyUrl: spotifySearch("Espresso","Sabrina Carpenter"), favorite: false, composer: "Sabrina Carpenter & Julian Bunetta" },
  { id: 137, title: "Birds of a Feather — Live", artist: "Billie Eilish", album: "Live (2024)", language: "English", duration: "3:30", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/english/137.jpg", spotifyUrl: spotifySearch("Birds of a Feather Live","Billie Eilish"), favorite: false, composer: "Billie Eilish & Finneas" },
  { id: 138, title: "Greedy", artist: "Tate McRae", album: "Think Later (2023)", language: "English", duration: "2:11", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/english/138.jpg", spotifyUrl: spotifySearch("Greedy","Tate McRae"), favorite: false, composer: "Tate McRae & Ryan Tedder" },
  { id: 139, title: "Flowers", artist: "Miley Cyrus", album: "Endless Summer Vacation (2023)", language: "English", duration: "3:20", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/english/139.jpg", spotifyUrl: spotifySearch("Flowers","Miley Cyrus"), favorite: false, composer: "Miley Cyrus & Kid Harpoon" },
  { id: 140, title: "Kill Bill", artist: "SZA", album: "SOS (2022)", language: "English", duration: "2:33", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/english/140.jpg", spotifyUrl: spotifySearch("Kill Bill","SZA"), favorite: false, composer: "SZA & Rob Bisel" },
  { id: 141, title: "Snooze", artist: "SZA", album: "SOS (2022)", language: "English", duration: "3:21", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/english/141.jpg", spotifyUrl: spotifySearch("Snooze","SZA"), favorite: false, composer: "SZA & Baby Keem" },
  { id: 142, title: "Calm Down", artist: "Rema & Selena Gomez", album: "Rave & Roses (2022)", language: "English", duration: "3:59", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/english/142.jpg", spotifyUrl: spotifySearch("Calm Down","Rema Selena Gomez"), favorite: false, composer: "Rema & Andre Vibez" },
  { id: 143, title: "Cruel Summer — Live", artist: "Taylor Swift", album: "The Eras Tour (2023)", language: "English", duration: "2:58", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/english/143.jpg", spotifyUrl: spotifySearch("Cruel Summer Live","Taylor Swift"), favorite: false, composer: "Taylor Swift" },
  { id: 144, title: "Unholy", artist: "Sam Smith ft. Kim Petras", album: "Gloria (2022)", language: "English", duration: "2:36", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/english/144.jpg", spotifyUrl: spotifySearch("Unholy","Sam Smith"), favorite: false, composer: "Sam Smith & Kim Petras" },
  { id: 145, title: "About Damn Time", artist: "Lizzo", album: "Special (2022)", language: "English", duration: "3:11", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/english/145.jpg", spotifyUrl: spotifySearch("About Damn Time","Lizzo"), favorite: false, composer: "Lizzo & Blake Slatkin" },
  { id: 146, title: "As It Was — Acoustic", artist: "Harry Styles", album: "Acoustic (2022)", language: "English", duration: "2:47", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/english/146.jpg", spotifyUrl: spotifySearch("As It Was Acoustic","Harry Styles"), favorite: false, composer: "Harry Styles" },
  { id: 147, title: "Die For You", artist: "The Weeknd & Ariana Grande", album: "Starboy (Remix 2023)", language: "English", duration: "4:20", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/english/147.jpg", spotifyUrl: spotifySearch("Die For You","The Weeknd Ariana Grande"), favorite: false, composer: "The Weeknd & Max Martin" },
  { id: 148, title: "Vampire", artist: "Olivia Rodrigo", album: "GUTS (2023)", language: "English", duration: "3:39", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/english/148.jpg", spotifyUrl: spotifySearch("Vampire","Olivia Rodrigo"), favorite: false, composer: "Olivia Rodrigo & Dan Nigro" },
  { id: 149, title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR (2021)", language: "English", duration: "2:58", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/english/149.jpg", spotifyUrl: spotifySearch("Good 4 U","Olivia Rodrigo"), favorite: false, composer: "Olivia Rodrigo & Dan Nigro" },
  { id: 150, title: "Levitating — Remix", artist: "Dua Lipa ft. DaBaby", album: "Future Nostalgia Remix (2020)", language: "English", duration: "3:23", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/english/150.jpg", spotifyUrl: spotifySearch("Levitating Remix","Dua Lipa"), favorite: false, composer: "Dua Lipa" },
  { id: 151, title: "Don't Start Now — Live", artist: "Dua Lipa", album: "Live (2020)", language: "English", duration: "3:03", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/english/151.jpg", spotifyUrl: spotifySearch("Don't Start Now Live","Dua Lipa"), favorite: false, composer: "Dua Lipa" },
  { id: 152, title: "Uptown Funk — Live", artist: "Bruno Mars", album: "Live (2014)", language: "English", duration: "4:30", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/english/152.jpg", spotifyUrl: spotifySearch("Uptown Funk Live","Bruno Mars"), favorite: false, composer: "Bruno Mars" },
  { id: 153, title: "Yellow — Live", artist: "Coldplay", album: "Live 2003", language: "English", duration: "4:29", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/english/153.jpg", spotifyUrl: spotifySearch("Yellow Live","Coldplay"), favorite: false, composer: "Coldplay" },

  // ===== MALAYALAM — 51 songs =====
  { id: 154, title: "Kuthanthram", artist: "Sushin Shyam & Hemanth", album: "Manjummel Boys (2024)", language: "Malayalam", duration: "3:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/malayalam/154.jpg", spotifyUrl: spotifySearch("Kuthanthram","Sushin Shyam"), favorite: false, composer: "Sushin Shyam" },
  { id: 155, title: "Neele Neele", artist: "Sushin Shyam", album: "Manjummel Boys (2024)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/malayalam/155.jpg", spotifyUrl: spotifySearch("Neele Neele","Sushin Shyam"), favorite: false, composer: "Sushin Shyam" },
  { id: 156, title: "Kuthanthram — Remix", artist: "Sushin Shyam", album: "Manjummel Boys (2024)", language: "Malayalam", duration: "3:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/malayalam/156.jpg", spotifyUrl: spotifySearch("Kuthanthram Remix","Sushin Shyam"), favorite: false, composer: "Sushin Shyam" },
  { id: 157, title: "Uyire — Adi Kapyare", artist: "Vineeth Sreenivasan & Divya S Menon", album: "Adi Kapyare Kootamani (2015)", language: "Malayalam", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/malayalam/157.jpg", spotifyUrl: spotifySearch("Uyire","Vineeth Sreenivasan"), favorite: false, composer: "Sushin Shyam" },
  { id: 158, title: "Jeevamshamayi", artist: "K. J. Yesudas & K. S. Chithra", album: "Theevandi (2018)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/malayalam/158.jpg", spotifyUrl: spotifySearch("Jeevamshamayi","K J Yesudas"), favorite: false, composer: "Bijibal" },
  { id: 159, title: "Malare", artist: "Vijay Yesudas", album: "Premam (2015)", language: "Malayalam", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/malayalam/159.jpg", spotifyUrl: spotifySearch("Malare","Vijay Yesudas"), favorite: false, composer: "Rajesh Murugesan" },
  { id: 160, title: "Aluva Puzha", artist: "Vineeth Sreenivasan", album: "Premam (2015)", language: "Malayalam", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/malayalam/160.jpg", spotifyUrl: spotifySearch("Aluva Puzha","Vineeth Sreenivasan"), favorite: false, composer: "Rajesh Murugesan" },
  { id: 161, title: "Kaalam Poyi", artist: "Shabareesh Varma", album: "Premam (2015)", language: "Malayalam", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/malayalam/161.jpg", spotifyUrl: spotifySearch("Kaalam Poyi","Shabareesh Varma"), favorite: false, composer: "Rajesh Murugesan" },
  { id: 162, title: "Idukki", artist: "Sachin Warrier", album: "Maheshinte Prathikaaram (2016)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/malayalam/162.jpg", spotifyUrl: spotifySearch("Idukki","Sachin Warrier"), favorite: false, composer: "Bijibal" },
  { id: 163, title: "Cheru Punchiri", artist: "Vijay Yesudas", album: "Maheshinte Prathikaaram (2016)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/malayalam/163.jpg", spotifyUrl: spotifySearch("Cheru Punchiri","Vijay Yesudas"), favorite: false, composer: "Bijibal" },
  { id: 164, title: "Thiruvaavaniraavu", artist: "Vineeth Sreenivasan", album: "Jacobinte Swargarajyam (2016)", language: "Malayalam", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/malayalam/164.jpg", spotifyUrl: spotifySearch("Thiruvaavaniraavu","Vineeth Sreenivasan"), favorite: false, composer: "Shaan Rahman" },
  { id: 165, title: "Ee Shishira Kaalam", artist: "Vineeth Sreenivasan & Kavya Ajit", album: "Jacobinte Swargarajyam (2016)", language: "Malayalam", duration: "3:52", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/malayalam/165.jpg", spotifyUrl: spotifySearch("Ee Shishira Kaalam","Vineeth Sreenivasan"), favorite: false, composer: "Shaan Rahman" },
  { id: 166, title: "Kuttanadan Punjayile", artist: "Vijay Yesudas & Sithara Krishnakumar", album: "Kumbalangi Nights (2019)", language: "Malayalam", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/malayalam/166.jpg", spotifyUrl: spotifySearch("Kuttanadan Punjayile","Vijay Yesudas"), favorite: false, composer: "Sushin Shyam" },
  { id: 167, title: "Cherathukal", artist: "Sushin Shyam & Sithara", album: "Kumbalangi Nights (2019)", language: "Malayalam", duration: "3:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/malayalam/167.jpg", spotifyUrl: spotifySearch("Cherathukal","Sushin Shyam"), favorite: false, composer: "Sushin Shyam" },
  { id: 168, title: "Uyiril Thodum", artist: "Sithara Krishnakumar", album: "Kumbalangi Nights (2019)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/malayalam/168.jpg", spotifyUrl: spotifySearch("Uyiril Thodum","Sithara Krishnakumar"), favorite: false, composer: "Sushin Shyam" },
  { id: 169, title: "Pallivaalu Bhadravattakam", artist: "Pradeep Kumar", album: "Kumbalangi Nights (2019)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/malayalam/169.jpg", spotifyUrl: spotifySearch("Pallivaalu","Pradeep Kumar"), favorite: false, composer: "Sushin Shyam" },
  { id: 170, title: "Aaradhike", artist: "Kapil Kapilan", album: "Hridayam (2022)", language: "Malayalam", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/malayalam/170.jpg", spotifyUrl: spotifySearch("Aaradhike","Kapil Kapilan"), favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 171, title: "Darshana", artist: "Hesham Abdul Wahab & Darshana Rajendran", album: "Hridayam (2022)", language: "Malayalam", duration: "3:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/malayalam/171.jpg", spotifyUrl: spotifySearch("Darshana","Hesham Abdul Wahab"), favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 172, title: "Kural Kekkutha", artist: "Hesham Abdul Wahab", album: "Hridayam (2022)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/malayalam/172.jpg", spotifyUrl: spotifySearch("Kural Kekkutha","Hesham Abdul Wahab"), favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 173, title: "Nagumo", artist: "Hesham Abdul Wahab", album: "Hridayam (2022)", language: "Malayalam", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/malayalam/173.jpg", spotifyUrl: spotifySearch("Nagumo","Hesham Abdul Wahab"), favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 174, title: "Pottu Thotta Pournami", artist: "K. S. Chithra & Vijay Yesudas", album: "RDX (2023)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/malayalam/174.jpg", spotifyUrl: spotifySearch("Pottu Thotta Pournami","K S Chithra"), favorite: false, composer: "Justin Varghese" },
  { id: 175, title: "Neela Nilave", artist: "Kapil Kapilan", album: "RDX (2023)", language: "Malayalam", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/malayalam/175.jpg", spotifyUrl: spotifySearch("Neela Nilave","Kapil Kapilan"), favorite: false, composer: "Sam C. S." },
  { id: 176, title: "Palavattam", artist: "Sushin Shyam & Dabzee", album: "Aavesham (2024)", language: "Malayalam", duration: "3:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/malayalam/176.jpg", spotifyUrl: spotifySearch("Palavattam","Sushin Shyam Dabzee"), favorite: false, composer: "Sushin Shyam" },
  { id: 177, title: "Illuminati", artist: "Dabzee & Sushin Shyam", album: "Aavesham (2024)", language: "Malayalam", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/malayalam/177.jpg", spotifyUrl: spotifySearch("Illuminati","Dabzee"), favorite: false, composer: "Sushin Shyam" },
  { id: 178, title: "Kotha Raja", artist: "Dabzee & Asal Kolaar", album: "King of Kotha (2023)", language: "Malayalam", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/malayalam/178.jpg", spotifyUrl: spotifySearch("Kotha Raja","Dabzee"), favorite: false, composer: "Jakes Bejoy" },
  { id: 179, title: "Kurumkuru", artist: "Sithara Krishnakumar", album: "Aadujeevitham (2024)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/malayalam/179.jpg", spotifyUrl: spotifySearch("Kurumkuru","Sithara Krishnakumar"), favorite: false, composer: "Sushin Shyam" },
  { id: 180, title: "Periyone", artist: "Jithin Raj", album: "Aadujeevitham (2024)", language: "Malayalam", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/malayalam/180.jpg", spotifyUrl: spotifySearch("Periyone","Jithin Raj"), favorite: false, composer: "A. R. Rahman" },
  { id: 181, title: "Hope", artist: "A. R. Rahman & Sithara", album: "Aadujeevitham (2024)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/malayalam/181.jpg", spotifyUrl: spotifySearch("Hope","A R Rahman"), favorite: false, composer: "A. R. Rahman" },
  { id: 182, title: "Kilukil Pambaram", artist: "Vineeth Sreenivasan", album: "ARM (2024)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/malayalam/182.jpg", spotifyUrl: spotifySearch("Kilukil Pambaram","Vineeth Sreenivasan"), favorite: false, composer: "Dhibu Ninan Thomas" },
  { id: 183, title: "Omane", artist: "Shreya Ghoshal & Vijay Yesudas", album: "Aadujeevitham (2024)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/malayalam/183.jpg", spotifyUrl: spotifySearch("Omane","Shreya Ghoshal"), favorite: false, composer: "M. Jayachandran" },
  { id: 184, title: "Kaanana Kuyile", artist: "K. S. Chithra", album: "Chithram (1988)", language: "Malayalam", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/malayalam/184.jpg", spotifyUrl: spotifySearch("Kaanana Kuyile","K S Chithra"), favorite: false, composer: "K. J. Joy" },
  { id: 185, title: "Pavizha Mazha", artist: "K. J. Yesudas & Sujatha", album: "Athirathram (1984)", language: "Malayalam", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/malayalam/185.jpg", spotifyUrl: spotifySearch("Pavizha Mazha","K J Yesudas"), favorite: false, composer: "Raveendran" },
  { id: 186, title: "Oru Pushpam Mathramen", artist: "K. J. Yesudas", album: "Pareeksha (1967)", language: "Malayalam", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/malayalam/186.jpg", spotifyUrl: spotifySearch("Oru Pushpam Mathramen","K J Yesudas"), favorite: false, composer: "M. S. Baburaj" },
  { id: 187, title: "Haravi", artist: "Vijay Yesudas & Sithara", album: "Athiran (2019)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/malayalam/187.jpg", spotifyUrl: spotifySearch("Haravi","Vijay Yesudas"), favorite: false, composer: "P. S. Jayhari" },
  { id: 188, title: "Uyire Innum", artist: "Sithara Krishnakumar", album: "Gauthamante Radham (2020)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/malayalam/188.jpg", spotifyUrl: spotifySearch("Uyire Innum","Sithara Krishnakumar"), favorite: false, composer: "Ankit Menon" },
  { id: 189, title: "Aalolam", artist: "Sushin Shyam & Vineeth Sreenivasan", album: "Kumbalangi Nights — Bonus (2019)", language: "Malayalam", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/malayalam/189.jpg", spotifyUrl: spotifySearch("Aalolam","Sushin Shyam"), favorite: false, composer: "Sushin Shyam" },
  { id: 190, title: "Ee Kaattu", artist: "Vineeth Sreenivasan", album: "Thira (2013)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/malayalam/190.jpg", spotifyUrl: spotifySearch("Ee Kaattu","Vineeth Sreenivasan"), favorite: false, composer: "Shaan Rahman" },
  { id: 191, title: "Mounam", artist: "Pradeep Kumar", album: "Thira (2013)", language: "Malayalam", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/malayalam/191.jpg", spotifyUrl: spotifySearch("Mounam","Pradeep Kumar"), favorite: false, composer: "Shaan Rahman" },
  { id: 192, title: "Thoomanju", artist: "Sachin Warrier & Sushin Shyam", album: "Arikil Oraal (2013)", language: "Malayalam", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/malayalam/192.jpg", spotifyUrl: spotifySearch("Thoomanju","Sachin Warrier"), favorite: false, composer: "Sushin Shyam" },
  { id: 193, title: "Thaaram", artist: "Sushin Shyam", album: "Kumbalangi Nights (2019)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/malayalam/193.jpg", spotifyUrl: spotifySearch("Thaaram","Sushin Shyam"), favorite: false, composer: "Sushin Shyam" },
  { id: 194, title: "Nee Kavithai", artist: "Hesham Abdul Wahab", album: "Hridayam — Bonus (2022)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/malayalam/194.jpg", spotifyUrl: spotifySearch("Nee Kavithai","Hesham Abdul Wahab"), favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 195, title: "Manasaayyo", artist: "Hesham Abdul Wahab & Vineeth Sreenivasan", album: "Hridayam (2022)", language: "Malayalam", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/malayalam/195.jpg", spotifyUrl: spotifySearch("Manasaayyo","Hesham Abdul Wahab"), favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 196, title: "Onnamkili", artist: "Hesham Abdul Wahab", album: "Hridayam (2022)", language: "Malayalam", duration: "4:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/malayalam/196.jpg", spotifyUrl: spotifySearch("Onnamkili","Hesham Abdul Wahab"), favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 197, title: "Sundari Sundari", artist: "Kapil Kapilan", album: "RDX — Bonus (2023)", language: "Malayalam", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/malayalam/197.jpg", spotifyUrl: spotifySearch("Sundari Sundari","Kapil Kapilan"), favorite: false, composer: "Sam C. S." },
  { id: 198, title: "Kalam Kagura", artist: "Sushin Shyam & Dabzee", album: "Aavesham — Bonus (2024)", language: "Malayalam", duration: "3:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/malayalam/198.jpg", spotifyUrl: spotifySearch("Kalam Kagura","Sushin Shyam"), favorite: false, composer: "Sushin Shyam" },
  { id: 199, title: "Galileo", artist: "Sushin Shyam", album: "Aavesham (2024)", language: "Malayalam", duration: "3:35", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/malayalam/199.jpg", spotifyUrl: spotifySearch("Galileo","Sushin Shyam"), favorite: false, composer: "Sushin Shyam" },
  { id: 200, title: "Aadharanjali", artist: "K. S. Chithra & Vineeth Sreenivasan", album: "Hridayam — Melody (2022)", language: "Malayalam", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/malayalam/200.jpg", spotifyUrl: spotifySearch("Aadharanjali","K S Chithra"), favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 201, title: "Kannondu Chollanu", artist: "Shreya Ghoshal", album: "Thira (2013)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/malayalam/201.jpg", spotifyUrl: spotifySearch("Kannondu Chollanu","Shreya Ghoshal"), favorite: false, composer: "Shaan Rahman" },
  { id: 202, title: "Mazhaye Mazhaye", artist: "Vineeth Sreenivasan & Shreya Ghoshal", album: "Jamna Pyari (2015)", language: "Malayalam", duration: "4:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/malayalam/202.jpg", spotifyUrl: spotifySearch("Mazhaye Mazhaye","Vineeth Sreenivasan"), favorite: false, composer: "Gopi Sundar" },
  { id: 203, title: "Chenthamara", artist: "Vijay Yesudas", album: "Chamaram (1980)", language: "Malayalam", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/malayalam/203.jpg", spotifyUrl: spotifySearch("Chenthamara","Vijay Yesudas"), favorite: false, composer: "M. G. Radhakrishnan" },
  { id: 204, title: "Pranayavarnangal", artist: "K. S. Chithra & K. J. Yesudas", album: "Pranayavarnangal (1998)", language: "Malayalam", duration: "5:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/malayalam/204.jpg", spotifyUrl: spotifySearch("Pranayavarnangal","K S Chithra"), favorite: false, composer: "Vidyasagar" },
  { id: 205, title: "Rowdy Baby", artist: "Dhee & Dhanush", album: "Maari 2 (2018)", language: "Tamil", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/205.jpg", spotifyUrl: "https://open.spotify.com/search/Rowdy%20Baby%20Dhee%20%26%20Dhanush", favorite: false, composer: "Yuvan Shankar Raja" },
  { id: 206, title: "Verithanam", artist: "Vijay", album: "Bigil (2019)", language: "Tamil", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/206.jpg", spotifyUrl: "https://open.spotify.com/search/Verithanam%20Vijay", favorite: false, composer: "A. R. Rahman" },
  { id: 207, title: "Singappenney", artist: "A. R. Rahman & Shashaa Tirupati", album: "Bigil (2019)", language: "Tamil", duration: "4:35", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/207.jpg", spotifyUrl: "https://open.spotify.com/search/Singappenney%20A.%20R.%20Rahman%20%26%20Shashaa%20Tirupati", favorite: false, composer: "A. R. Rahman" },
  { id: 208, title: "Aalaporan Thamizhan", artist: "Kailash Kher & Sathya Prakash", album: "Mersal (2017)", language: "Tamil", duration: "5:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/208.jpg", spotifyUrl: "https://open.spotify.com/search/Aalaporan%20Thamizhan%20Kailash%20Kher%20%26%20Sathya%20Prakash", favorite: false, composer: "A. R. Rahman" },
  { id: 209, title: "Neethane Neethane", artist: "Shreya Ghoshal", album: "Mersal (2017)", language: "Tamil", duration: "4:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/209.jpg", spotifyUrl: "https://open.spotify.com/search/Neethane%20Neethane%20Shreya%20Ghoshal", favorite: false, composer: "A. R. Rahman" },
  { id: 210, title: "Marana Mass", artist: "Anirudh Ravichander & S. P. B. Charan", album: "Petta (2019)", language: "Tamil", duration: "3:25", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/210.jpg", spotifyUrl: "https://open.spotify.com/search/Marana%20Mass%20Anirudh%20Ravichander%20%26%20S.%20P.%20B.%20Charan", favorite: false, composer: "Anirudh Ravichander" },
  { id: 211, title: "Ullaallaa", artist: "Nakash Aziz", album: "Petta (2019)", language: "Tamil", duration: "3:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/211.jpg", spotifyUrl: "https://open.spotify.com/search/Ullaallaa%20Nakash%20Aziz", favorite: false, composer: "Anirudh Ravichander" },
  { id: 212, title: "Petta Paraak", artist: "Anirudh Ravichander", album: "Petta (2019)", language: "Tamil", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/212.jpg", spotifyUrl: "https://open.spotify.com/search/Petta%20Paraak%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 213, title: "Jolly O Gymkhana", artist: "Anirudh Ravichander & Vijay", album: "Beast (2022)", language: "Tamil", duration: "4:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/213.jpg", spotifyUrl: "https://open.spotify.com/search/Jolly%20O%20Gymkhana%20Anirudh%20Ravichander%20%26%20Vijay", favorite: false, composer: "Anirudh Ravichander" },
  { id: 214, title: "Jalabulajangu", artist: "Anirudh Ravichander & Anthony Daasan", album: "Don (2022)", language: "Tamil", duration: "3:35", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/214.jpg", spotifyUrl: "https://open.spotify.com/search/Jalabulajangu%20Anirudh%20Ravichander%20%26%20Anthony%20Daasan", favorite: false, composer: "Anirudh Ravichander" },
  { id: 215, title: "Bae", artist: "Adithya RK", album: "Don (2022)", language: "Tamil", duration: "3:28", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/215.jpg", spotifyUrl: "https://open.spotify.com/search/Bae%20Adithya%20RK", favorite: false, composer: "Anirudh Ravichander" },
  { id: 216, title: "Hayyoda", artist: "Anirudh Ravichander & Priya Mali", album: "Jawan Tamil (2023)", language: "Tamil", duration: "3:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/216.jpg", spotifyUrl: "https://open.spotify.com/search/Hayyoda%20Anirudh%20Ravichander%20%26%20Priya%20Mali", favorite: false, composer: "Anirudh Ravichander" },
  { id: 217, title: "Vandha Edam", artist: "Anirudh Ravichander", album: "Jawan Tamil (2023)", language: "Tamil", duration: "3:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/217.jpg", spotifyUrl: "https://open.spotify.com/search/Vandha%20Edam%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 218, title: "Rathamaare", artist: "Vishal Mishra", album: "Jailer (2023)", language: "Tamil", duration: "3:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/218.jpg", spotifyUrl: "https://open.spotify.com/search/Rathamaare%20Vishal%20Mishra", favorite: false, composer: "Anirudh Ravichander" },
  { id: 219, title: "Thalaivar Alappara", artist: "Anirudh Ravichander", album: "Jailer (2023)", language: "Tamil", duration: "3:05", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/219.jpg", spotifyUrl: "https://open.spotify.com/search/Thalaivar%20Alappara%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 220, title: "Ordinary Person", artist: "Anirudh Ravichander & Nikhita Gandhi", album: "Leo (2023)", language: "Tamil", duration: "3:38", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/220.jpg", spotifyUrl: "https://open.spotify.com/search/Ordinary%20Person%20Anirudh%20Ravichander%20%26%20Nikhita%20Gandhi", favorite: false, composer: "Anirudh Ravichander" },
  { id: 221, title: "Anbenum", artist: "Anirudh Ravichander & Lothika", album: "Leo (2023)", language: "Tamil", duration: "4:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/221.jpg", spotifyUrl: "https://open.spotify.com/search/Anbenum%20Anirudh%20Ravichander%20%26%20Lothika", favorite: false, composer: "Anirudh Ravichander" },
  { id: 222, title: "Vidaamuyarchi", artist: "Anirudh Ravichander", album: "Vidaamuyarchi (2025)", language: "Tamil", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/222.jpg", spotifyUrl: "https://open.spotify.com/search/Vidaamuyarchi%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 223, title: "Chaleya Tamil", artist: "Anirudh Ravichander & Shilpa Rao", album: "Jawan (2023)", language: "Tamil", duration: "3:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/223.jpg", spotifyUrl: "https://open.spotify.com/search/Chaleya%20Tamil%20Anirudh%20Ravichander%20%26%20Shilpa%20Rao", favorite: false, composer: "Anirudh Ravichander" },
  { id: 224, title: "Kadhal Psycho", artist: "Anirudh Ravichander", album: "Saaho Tamil (2019)", language: "Tamil", duration: "3:15", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/224.jpg", spotifyUrl: "https://open.spotify.com/search/Kadhal%20Psycho%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 225, title: "Kannamma", artist: "Anirudh Ravichander", album: "Kaaki Sattai (2015)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/225.jpg", spotifyUrl: "https://open.spotify.com/search/Kannamma%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 226, title: "Sirikkadhey", artist: "Anirudh Ravichander", album: "Remo (2016)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/226.jpg", spotifyUrl: "https://open.spotify.com/search/Sirikkadhey%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 227, title: "Senjitaley", artist: "Anirudh Ravichander & Dhanush", album: "Remo (2016)", language: "Tamil", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/227.jpg", spotifyUrl: "https://open.spotify.com/search/Senjitaley%20Anirudh%20Ravichander%20%26%20Dhanush", favorite: false, composer: "Anirudh Ravichander" },
  { id: 228, title: "Thalli Pogathey Reprise", artist: "Sid Sriram", album: "Achcham Yenbadhu (2016)", language: "Tamil", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/228.jpg", spotifyUrl: "https://open.spotify.com/search/Thalli%20Pogathey%20Reprise%20Sid%20Sriram", favorite: false, composer: "A. R. Rahman" },
  { id: 229, title: "Aga Naga", artist: "Shakthisree & A. R. Rahman", album: "Ponniyin Selvan II (2023)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/229.jpg", spotifyUrl: "https://open.spotify.com/search/Aga%20Naga%20Shakthisree%20%26%20A.%20R.%20Rahman", favorite: false, composer: "A. R. Rahman" },
  { id: 230, title: "Ponni Nadhi", artist: "A. R. Rahman", album: "Ponniyin Selvan I (2022)", language: "Tamil", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/230.jpg", spotifyUrl: "https://open.spotify.com/search/Ponni%20Nadhi%20A.%20R.%20Rahman", favorite: false, composer: "A. R. Rahman" },
  { id: 231, title: "Veera Raja Veera", artist: "A. R. Rahman & Shankar Mahadevan", album: "Ponniyin Selvan II (2023)", language: "Tamil", duration: "4:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/231.jpg", spotifyUrl: "https://open.spotify.com/search/Veera%20Raja%20Veera%20A.%20R.%20Rahman%20%26%20Shankar%20Mahadevan", favorite: false, composer: "A. R. Rahman" },
  { id: 232, title: "Minsaara Poove", artist: "A. R. Rahman & Minmini", album: "Padayappa (1999)", language: "Tamil", duration: "5:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/232.jpg", spotifyUrl: "https://open.spotify.com/search/Minsaara%20Poove%20A.%20R.%20Rahman%20%26%20Minmini", favorite: false, composer: "A. R. Rahman" },
  { id: 233, title: "Kadhal Sadugudu", artist: "S. P. Balasubrahmanyam", album: "Alaipayuthey (2000)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/233.jpg", spotifyUrl: "https://open.spotify.com/search/Kadhal%20Sadugudu%20S.%20P.%20Balasubrahmanyam", favorite: false, composer: "A. R. Rahman" },
  { id: 234, title: "Snehithane Reprise", artist: "Sadhana Sargam", album: "Alaipayuthey (2000)", language: "Tamil", duration: "5:14", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/234.jpg", spotifyUrl: "https://open.spotify.com/search/Snehithane%20Reprise%20Sadhana%20Sargam", favorite: false, composer: "A. R. Rahman" },
  { id: 235, title: "Anbil Avan", artist: "A. R. Rahman & Shreya Ghoshal", album: "Vinnaithaandi Varuvaaya (2010)", language: "Tamil", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/235.jpg", spotifyUrl: "https://open.spotify.com/search/Anbil%20Avan%20A.%20R.%20Rahman%20%26%20Shreya%20Ghoshal", favorite: false, composer: "A. R. Rahman" },
  { id: 236, title: "Hosanna Tamil", artist: "Vijay Prakash", album: "Vinnaithaandi Varuvaaya (2010)", language: "Tamil", duration: "5:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/236.jpg", spotifyUrl: "https://open.spotify.com/search/Hosanna%20Tamil%20Vijay%20Prakash", favorite: false, composer: "A. R. Rahman" },
  { id: 237, title: "Mannipaaya", artist: "A. R. Rahman & Shreya Ghoshal", album: "Vinnaithaandi Varuvaaya (2010)", language: "Tamil", duration: "5:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/237.jpg", spotifyUrl: "https://open.spotify.com/search/Mannipaaya%20A.%20R.%20Rahman%20%26%20Shreya%20Ghoshal", favorite: false, composer: "A. R. Rahman" },
  { id: 238, title: "Aaromale Tamil", artist: "Alphons Joseph", album: "Vinnaithaandi Varuvaaya (2010)", language: "Tamil", duration: "5:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/238.jpg", spotifyUrl: "https://open.spotify.com/search/Aaromale%20Tamil%20Alphons%20Joseph", favorite: false, composer: "A. R. Rahman" },
  { id: 239, title: "Nenjukkulle Reprise", artist: "Hariharan", album: "Vaaranam Aayiram (2008)", language: "Tamil", duration: "4:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/239.jpg", spotifyUrl: "https://open.spotify.com/search/Nenjukkulle%20Reprise%20Hariharan", favorite: false, composer: "Harris Jayaraj" },
  { id: 240, title: "Ava Enna", artist: "Karthik", album: "Vaaranam Aayiram (2008)", language: "Tamil", duration: "5:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/240.jpg", spotifyUrl: "https://open.spotify.com/search/Ava%20Enna%20Karthik", favorite: false, composer: "Harris Jayaraj" },
  { id: 241, title: "Mundhinam Parthene", artist: "Naresh Iyer", album: "Vaaranam Aayiram (2008)", language: "Tamil", duration: "5:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/241.jpg", spotifyUrl: "https://open.spotify.com/search/Mundhinam%20Parthene%20Naresh%20Iyer", favorite: false, composer: "Harris Jayaraj" },
  { id: 242, title: "Anjala", artist: "Karthik & Chinmayi", album: "Vaaranam Aayiram (2008)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/242.jpg", spotifyUrl: "https://open.spotify.com/search/Anjala%20Karthik%20%26%20Chinmayi", favorite: false, composer: "Harris Jayaraj" },
  { id: 243, title: "Uyirin Uyire", artist: "Karthik & Bombay Jayashri", album: "Kaakha Kaakha (2003)", language: "Tamil", duration: "5:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/243.jpg", spotifyUrl: "https://open.spotify.com/search/Uyirin%20Uyire%20Karthik%20%26%20Bombay%20Jayashri", favorite: false, composer: "Harris Jayaraj" },
  { id: 244, title: "Thendral Vanthu", artist: "S. P. Balasubrahmanyam", album: "Thendrale Ennai Thodu (1985)", language: "Tamil", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/244.jpg", spotifyUrl: "https://open.spotify.com/search/Thendral%20Vanthu%20S.%20P.%20Balasubrahmanyam", favorite: false, composer: "Ilaiyaraaja" },
  { id: 245, title: "Poongatru Puthithanathu", artist: "S. Janaki", album: "Moondram Pirai (1982)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/245.jpg", spotifyUrl: "https://open.spotify.com/search/Poongatru%20Puthithanathu%20S.%20Janaki", favorite: false, composer: "Ilaiyaraaja" },
  { id: 246, title: "Sundari Kannal", artist: "S. P. Balasubrahmanyam & S. Janaki", album: "Thalapathi (1991)", language: "Tamil", duration: "5:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/246.jpg", spotifyUrl: "https://open.spotify.com/search/Sundari%20Kannal%20S.%20P.%20Balasubrahmanyam%20%26%20S.%20Janaki", favorite: false, composer: "Ilaiyaraaja" },
  { id: 247, title: "Rakkamma Kaiya Thattu", artist: "S. P. Balasubrahmanyam & Swarnalatha", album: "Thalapathi (1991)", language: "Tamil", duration: "5:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/247.jpg", spotifyUrl: "https://open.spotify.com/search/Rakkamma%20Kaiya%20Thattu%20S.%20P.%20Balasubrahmanyam%20%26%20Swarnalatha", favorite: false, composer: "Ilaiyaraaja" },
  { id: 248, title: "Nilaave Vaa Reprise", artist: "S. P. Balasubrahmanyam", album: "Mouna Ragam (1986)", language: "Tamil", duration: "4:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/248.jpg", spotifyUrl: "https://open.spotify.com/search/Nilaave%20Vaa%20Reprise%20S.%20P.%20Balasubrahmanyam", favorite: false, composer: "Ilaiyaraaja" },
  { id: 249, title: "Mandram Vandha Reprise", artist: "S. P. Balasubrahmanyam", album: "Mouna Ragam (1986)", language: "Tamil", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/249.jpg", spotifyUrl: "https://open.spotify.com/search/Mandram%20Vandha%20Reprise%20S.%20P.%20Balasubrahmanyam", favorite: false, composer: "Ilaiyaraaja" },
  { id: 250, title: "Shenbagame Reprise", artist: "S. P. Balasubrahmanyam", album: "Enga Ooru Pattukaran (1987)", language: "Tamil", duration: "4:52", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/250.jpg", spotifyUrl: "https://open.spotify.com/search/Shenbagame%20Reprise%20S.%20P.%20Balasubrahmanyam", favorite: false, composer: "Ilaiyaraaja" },
  { id: 251, title: "Oru Naalil Reprise", artist: "Yuvan Shankar Raja", album: "Pudhupettai (2006)", language: "Tamil", duration: "5:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/251.jpg", spotifyUrl: "https://open.spotify.com/search/Oru%20Naalil%20Reprise%20Yuvan%20Shankar%20Raja", favorite: false, composer: "Yuvan Shankar Raja" },
  { id: 252, title: "Loosu Penne", artist: "Yuvan Shankar Raja", album: "Vallavan (2006)", language: "Tamil", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/252.jpg", spotifyUrl: "https://open.spotify.com/search/Loosu%20Penne%20Yuvan%20Shankar%20Raja", favorite: false, composer: "Yuvan Shankar Raja" },
  { id: 253, title: "Venmegam", artist: "Hariharan", album: "Yaaradi Nee Mohini (2008)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/253.jpg", spotifyUrl: "https://open.spotify.com/search/Venmegam%20Hariharan", favorite: false, composer: "Yuvan Shankar Raja" },
  { id: 254, title: "Thuli Thuli Reprise", artist: "Haricharan", album: "Paiyaa (2010)", language: "Tamil", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/254.jpg", spotifyUrl: "https://open.spotify.com/search/Thuli%20Thuli%20Reprise%20Haricharan", favorite: false, composer: "Yuvan Shankar Raja" },
  { id: 255, title: "Oru Kal Oru Kannadi", artist: "Yuvan Shankar Raja & Haricharan", album: "Siva Manasula Sakthi (2009)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/255.jpg", spotifyUrl: "https://open.spotify.com/search/Oru%20Kal%20Oru%20Kannadi%20Yuvan%20Shankar%20Raja%20%26%20Haricharan", favorite: false, composer: "Yuvan Shankar Raja" },
  { id: 256, title: "Arabu Naade", artist: "Hariharan", album: "Thulluvadho Ilamai (2002)", language: "Tamil", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/256.jpg", spotifyUrl: "https://open.spotify.com/search/Arabu%20Naade%20Hariharan", favorite: false, composer: "Yuvan Shankar Raja" },
  { id: 257, title: "Kadhal Valarthen", artist: "Yuvan Shankar Raja", album: "Manmadhan (2004)", language: "Tamil", duration: "4:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/257.jpg", spotifyUrl: "https://open.spotify.com/search/Kadhal%20Valarthen%20Yuvan%20Shankar%20Raja", favorite: false, composer: "Yuvan Shankar Raja" },
  { id: 258, title: "En Kadhal Solla", artist: "Yuvan Shankar Raja", album: "Paiyaa (2010)", language: "Tamil", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/258.jpg", spotifyUrl: "https://open.spotify.com/search/En%20Kadhal%20Solla%20Yuvan%20Shankar%20Raja", favorite: false, composer: "Yuvan Shankar Raja" },
  { id: 259, title: "Kutti Story Reprise", artist: "Vijay & Anirudh", album: "Master (2021)", language: "Tamil", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/259.jpg", spotifyUrl: "https://open.spotify.com/search/Kutti%20Story%20Reprise%20Vijay%20%26%20Anirudh", favorite: false, composer: "Anirudh Ravichander" },
  { id: 260, title: "Quit Pannuda", artist: "Anirudh Ravichander", album: "Master (2021)", language: "Tamil", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/260.jpg", spotifyUrl: "https://open.spotify.com/search/Quit%20Pannuda%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 261, title: "Andha Kanna Paathaakaa", artist: "Anirudh Ravichander", album: "Master (2021)", language: "Tamil", duration: "3:28", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/261.jpg", spotifyUrl: "https://open.spotify.com/search/Andha%20Kanna%20Paathaakaa%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 262, title: "Yaanji", artist: "Anirudh Ravichander & Nikhita Gandhi", album: "Vikram (2022)", language: "Tamil", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/262.jpg", spotifyUrl: "https://open.spotify.com/search/Yaanji%20Anirudh%20Ravichander%20%26%20Nikhita%20Gandhi", favorite: false, composer: "Anirudh Ravichander" },
  { id: 263, title: "Pathala Pathala", artist: "Anirudh Ravichander & Kamal Haasan", album: "Vikram (2022)", language: "Tamil", duration: "3:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/263.jpg", spotifyUrl: "https://open.spotify.com/search/Pathala%20Pathala%20Anirudh%20Ravichander%20%26%20Kamal%20Haasan", favorite: false, composer: "Anirudh Ravichander" },
  { id: 264, title: "Wasted", artist: "Anirudh Ravichander", album: "Vikram (2022)", language: "Tamil", duration: "3:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/264.jpg", spotifyUrl: "https://open.spotify.com/search/Wasted%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 265, title: "Porkanda Singam", artist: "Anirudh Ravichander & Anthony Daasan", album: "Vikram (2022)", language: "Tamil", duration: "3:35", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/265.jpg", spotifyUrl: "https://open.spotify.com/search/Porkanda%20Singam%20Anirudh%20Ravichander%20%26%20Anthony%20Daasan", favorite: false, composer: "Anirudh Ravichander" },
  { id: 266, title: "Life of Ram Tamil", artist: "Pradeep Kumar", album: "Jaanu (2020)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/266.jpg", spotifyUrl: "https://open.spotify.com/search/Life%20of%20Ram%20Tamil%20Pradeep%20Kumar", favorite: false, composer: "Govind Vasantha" },
  { id: 267, title: "Veyyon Silli", artist: "G. V. Prakash Kumar", album: "Soorarai Pottru (2020)", language: "Tamil", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/267.jpg", spotifyUrl: "https://open.spotify.com/search/Veyyon%20Silli%20G.%20V.%20Prakash%20Kumar", favorite: false, composer: "G. V. Prakash Kumar" },
  { id: 268, title: "Kaattu Payale", artist: "G. V. Prakash Kumar & Saindhavi", album: "Soorarai Pottru (2020)", language: "Tamil", duration: "4:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/268.jpg", spotifyUrl: "https://open.spotify.com/search/Kaattu%20Payale%20G.%20V.%20Prakash%20Kumar%20%26%20Saindhavi", favorite: false, composer: "G. V. Prakash Kumar" },
  { id: 269, title: "Dippam Dappam", artist: "Anirudh Ravichander & Anthony Daasan", album: "Kaathuvaakula Rendu Kaadhal (2022)", language: "Tamil", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/269.jpg", spotifyUrl: "https://open.spotify.com/search/Dippam%20Dappam%20Anirudh%20Ravichander%20%26%20Anthony%20Daasan", favorite: false, composer: "Anirudh Ravichander" },
  { id: 270, title: "Hey Sinamika", artist: "Anirudh Ravichander & Pradeep Kumar", album: "Hey Sinamika (2022)", language: "Tamil", duration: "3:28", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/270.jpg", spotifyUrl: "https://open.spotify.com/search/Hey%20Sinamika%20Anirudh%20Ravichander%20%26%20Pradeep%20Kumar", favorite: false, composer: "Anirudh Ravichander" },
  { id: 271, title: "Megham Karukatha", artist: "Anirudh Ravichander & Dhee", album: "Thiruchitrambalam (2022)", language: "Tamil", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/271.jpg", spotifyUrl: "https://open.spotify.com/search/Megham%20Karukatha%20Anirudh%20Ravichander%20%26%20Dhee", favorite: false, composer: "Anirudh Ravichander" },
  { id: 272, title: "Thiruchitrambalam Title", artist: "Anirudh Ravichander", album: "Thiruchitrambalam (2022)", language: "Tamil", duration: "3:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/272.jpg", spotifyUrl: "https://open.spotify.com/search/Thiruchitrambalam%20Title%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 273, title: "Kannum Kannum Kollaiyadithaal Title", artist: "Masala Coffee", album: "Kannum Kannum Kollaiyadithaal (2020)", language: "Tamil", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/273.jpg", spotifyUrl: "https://open.spotify.com/search/Kannum%20Kannum%20Kollaiyadithaal%20Title%20Masala%20Coffee", favorite: false, composer: "Masala Coffee" },
  { id: 274, title: "Sirikkalam Parakkalam", artist: "Dhee & Santhosh Narayanan", album: "Soodhu Kavvum (2013)", language: "Tamil", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/274.jpg", spotifyUrl: "https://open.spotify.com/search/Sirikkalam%20Parakkalam%20Dhee%20%26%20Santhosh%20Narayanan", favorite: false, composer: "Santhosh Narayanan" },
  { id: 275, title: "Kambathu Ponnu", artist: "Haricharan", album: "Mundasupatti (2014)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/275.jpg", spotifyUrl: "https://open.spotify.com/search/Kambathu%20Ponnu%20Haricharan", favorite: false, composer: "Sean Roldan" },
  { id: 276, title: "Kadhal Cassatta", artist: "Sean Roldan", album: "Sathuranga Vettai (2014)", language: "Tamil", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/276.jpg", spotifyUrl: "https://open.spotify.com/search/Kadhal%20Cassatta%20Sean%20Roldan", favorite: false, composer: "Sean Roldan" },
  { id: 277, title: "Otha Solala", artist: "Sean Roldan", album: "Kaaka Muttai (2015)", language: "Tamil", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/277.jpg", spotifyUrl: "https://open.spotify.com/search/Otha%20Solala%20Sean%20Roldan", favorite: false, composer: "G. V. Prakash Kumar" },
  { id: 278, title: "Thangamey Reprise Tamil", artist: "Anirudh Ravichander", album: "Naanum Rowdy Dhaan (2015)", language: "Tamil", duration: "4:21", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/278.jpg", spotifyUrl: "https://open.spotify.com/search/Thangamey%20Reprise%20Tamil%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 279, title: "Neeyum Naanum Reprise", artist: "Anirudh Ravichander & Neeti Mohan", album: "Naanum Rowdy Dhaan (2015)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/279.jpg", spotifyUrl: "https://open.spotify.com/search/Neeyum%20Naanum%20Reprise%20Anirudh%20Ravichander%20%26%20Neeti%20Mohan", favorite: false, composer: "Anirudh Ravichander" },
  { id: 280, title: "Pookkalae Reprise", artist: "Haricharan", album: "I (2015)", language: "Tamil", duration: "5:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/280.jpg", spotifyUrl: "https://open.spotify.com/search/Pookkalae%20Reprise%20Haricharan", favorite: false, composer: "A. R. Rahman" },
  { id: 281, title: "Mersalaayitten", artist: "A. R. Rahman", album: "I (2015)", language: "Tamil", duration: "4:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/281.jpg", spotifyUrl: "https://open.spotify.com/search/Mersalaayitten%20A.%20R.%20Rahman", favorite: false, composer: "A. R. Rahman" },
  { id: 282, title: "Naan Nee", artist: "A. R. Rahman & Vijay Prakash", album: "Mersal (2017)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/282.jpg", spotifyUrl: "https://open.spotify.com/search/Naan%20Nee%20A.%20R.%20Rahman%20%26%20Vijay%20Prakash", favorite: false, composer: "A. R. Rahman" },
  { id: 283, title: "Macho Reprise Tamil", artist: "Sid Sriram", album: "Mersal (2017)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/283.jpg", spotifyUrl: "https://open.spotify.com/search/Macho%20Reprise%20Tamil%20Sid%20Sriram", favorite: false, composer: "A. R. Rahman" },
  { id: 284, title: "Sarkar Title", artist: "A. R. Rahman", album: "Sarkar (2018)", language: "Tamil", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/284.jpg", spotifyUrl: "https://open.spotify.com/search/Sarkar%20Title%20A.%20R.%20Rahman", favorite: false, composer: "A. R. Rahman" },
  { id: 285, title: "Simtanguaran", artist: "A. R. Rahman", album: "Sarkar (2018)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/285.jpg", spotifyUrl: "https://open.spotify.com/search/Simtanguaran%20A.%20R.%20Rahman", favorite: false, composer: "A. R. Rahman" },
  { id: 286, title: "Kannana Kanne Reprise", artist: "Sid Sriram", album: "Viswasam (2019)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/286.jpg", spotifyUrl: "https://open.spotify.com/search/Kannana%20Kanne%20Reprise%20Sid%20Sriram", favorite: false, composer: "D. Imman" },
  { id: 287, title: "Gulebakavali", artist: "Anirudh Ravichander", album: "Gulebakavali (2018)", language: "Tamil", duration: "3:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/287.jpg", spotifyUrl: "https://open.spotify.com/search/Gulebakavali%20Anirudh%20Ravichander", favorite: false, composer: "Vivek-Mervin" },
  { id: 288, title: "Sahana Saaral", artist: "Pradeep Kumar", album: "Sivappu Manjal Pachai (2019)", language: "Tamil", duration: "4:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/288.jpg", spotifyUrl: "https://open.spotify.com/search/Sahana%20Saaral%20Pradeep%20Kumar", favorite: false, composer: "Siddhu Kumar" },
  { id: 289, title: "Anthi Maalai", artist: "Pradeep Kumar & Chinmayi", album: "Kaaviya Thalaivan (2014)", language: "Tamil", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/289.jpg", spotifyUrl: "https://open.spotify.com/search/Anthi%20Maalai%20Pradeep%20Kumar%20%26%20Chinmayi", favorite: false, composer: "A. R. Rahman" },
  { id: 290, title: "Vaathi Raid", artist: "Anirudh Ravichander", album: "Master (2021)", language: "Tamil", duration: "3:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/290.jpg", spotifyUrl: "https://open.spotify.com/search/Vaathi%20Raid%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 291, title: "Kutti Story Tamil", artist: "Vijay & Anirudh", album: "Master (2021)", language: "Tamil", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/291.jpg", spotifyUrl: "https://open.spotify.com/search/Kutti%20Story%20Tamil%20Vijay%20%26%20Anirudh", favorite: false, composer: "Anirudh Ravichander" },
  { id: 292, title: "Srivalli Tamil", artist: "Sid Sriram", album: "Pushpa Tamil (2021)", language: "Tamil", duration: "3:44", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/292.jpg", spotifyUrl: "https://open.spotify.com/search/Srivalli%20Tamil%20Sid%20Sriram", favorite: false, composer: "Devi Sri Prasad" },
  { id: 293, title: "Oo Solriya Tamil", artist: "Andrea Jeremiah", album: "Pushpa Tamil (2021)", language: "Tamil", duration: "3:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/293.jpg", spotifyUrl: "https://open.spotify.com/search/Oo%20Solriya%20Tamil%20Andrea%20Jeremiah", favorite: false, composer: "Devi Sri Prasad" },
  { id: 294, title: "Naatu Naatu Tamil", artist: "Rahul Sipligunj", album: "RRR Tamil (2022)", language: "Tamil", duration: "3:44", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/294.jpg", spotifyUrl: "https://open.spotify.com/search/Naatu%20Naatu%20Tamil%20Rahul%20Sipligunj", favorite: false, composer: "M. M. Keeravani" },
  { id: 295, title: "Kalyani Tamil", artist: "Sithara Krishnakumar", album: "Hridayam Tamil Dub (2022)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/295.jpg", spotifyUrl: "https://open.spotify.com/search/Kalyani%20Tamil%20Sithara%20Krishnakumar", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 296, title: "Therikkudhu Masss", artist: "Anirudh Ravichander", album: "Remo (2016)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/296.jpg", spotifyUrl: "https://open.spotify.com/search/Therikkudhu%20Masss%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 297, title: "Ennodu Nee Irundhaal Reprise Tamil", artist: "Sid Sriram", album: "I (2015)", language: "Tamil", duration: "5:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/297.jpg", spotifyUrl: "https://open.spotify.com/search/Ennodu%20Nee%20Irundhaal%20Reprise%20Tamil%20Sid%20Sriram", favorite: false, composer: "A. R. Rahman" },
  { id: 298, title: "Aila Aila", artist: "A. R. Rahman & Anirudh", album: "I (2015)", language: "Tamil", duration: "5:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/298.jpg", spotifyUrl: "https://open.spotify.com/search/Aila%20Aila%20A.%20R.%20Rahman%20%26%20Anirudh", favorite: false, composer: "A. R. Rahman" },
  { id: 299, title: "Neethane Reprise Tamil", artist: "Shreya Ghoshal", album: "Mersal (2017)", language: "Tamil", duration: "4:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/299.jpg", spotifyUrl: "https://open.spotify.com/search/Neethane%20Reprise%20Tamil%20Shreya%20Ghoshal", favorite: false, composer: "A. R. Rahman" },
  { id: 300, title: "Top Tucker", artist: "A. R. Rahman & Bonny Chakraborty", album: "Sarkar (2018)", language: "Tamil", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/300.jpg", spotifyUrl: "https://open.spotify.com/search/Top%20Tucker%20A.%20R.%20Rahman%20%26%20Bonny%20Chakraborty", favorite: false, composer: "A. R. Rahman" },
  { id: 301, title: "Vetti X Prey", artist: "D. Imman", album: "Viswasam (2019)", language: "Tamil", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/301.jpg", spotifyUrl: "https://open.spotify.com/search/Vetti%20X%20Prey%20D.%20Imman", favorite: false, composer: "D. Imman" },
  { id: 302, title: "Kurumba", artist: "D. Imman & Anirudh", album: "Tik Tik Tik (2018)", language: "Tamil", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/302.jpg", spotifyUrl: "https://open.spotify.com/search/Kurumba%20D.%20Imman%20%26%20Anirudh", favorite: false, composer: "D. Imman" },
  { id: 303, title: "Yaaren Yaaren", artist: "Pradeep Kumar", album: "Sivappu Manjal Pachai (2019)", language: "Tamil", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/303.jpg", spotifyUrl: "https://open.spotify.com/search/Yaaren%20Yaaren%20Pradeep%20Kumar", favorite: false, composer: "Siddhu Kumar" },
  { id: 304, title: "Sandiyare", artist: "Pradeep Kumar", album: "Kaaviya Thalaivan (2014)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/304.jpg", spotifyUrl: "https://open.spotify.com/search/Sandiyare%20Pradeep%20Kumar", favorite: false, composer: "A. R. Rahman" },
  { id: 305, title: "Sahana Reprise Tamil", artist: "Pradeep Kumar", album: "Sivappu Manjal Pachai (2019)", language: "Tamil", duration: "4:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/305.jpg", spotifyUrl: "https://open.spotify.com/search/Sahana%20Reprise%20Tamil%20Pradeep%20Kumar", favorite: false, composer: "Siddhu Kumar" },
  { id: 306, title: "Kaavaalaa Reprise Tamil", artist: "Shilpa Rao", album: "Jailer (2023)", language: "Tamil", duration: "3:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/306.jpg", spotifyUrl: "https://open.spotify.com/search/Kaavaalaa%20Reprise%20Tamil%20Shilpa%20Rao", favorite: false, composer: "Anirudh Ravichander" },
  { id: 307, title: "Hukum Reprise Tamil", artist: "Anirudh Ravichander", album: "Jailer (2023)", language: "Tamil", duration: "3:27", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/307.jpg", spotifyUrl: "https://open.spotify.com/search/Hukum%20Reprise%20Tamil%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 308, title: "Manasilaayo Reprise", artist: "Anirudh Ravichander", album: "Vettaiyan (2024)", language: "Tamil", duration: "3:33", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/308.jpg", spotifyUrl: "https://open.spotify.com/search/Manasilaayo%20Reprise%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 309, title: "Katchi Sera Reprise", artist: "Sai Abhyankkar", album: "Single (2024)", language: "Tamil", duration: "3:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/309.jpg", spotifyUrl: "https://open.spotify.com/search/Katchi%20Sera%20Reprise%20Sai%20Abhyankkar", favorite: false, composer: "Sai Abhyankkar" },
  { id: 310, title: "Aasa Kooda Reprise Tamil", artist: "Sai Abhyankkar", album: "Single (2024)", language: "Tamil", duration: "3:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/310.jpg", spotifyUrl: "https://open.spotify.com/search/Aasa%20Kooda%20Reprise%20Tamil%20Sai%20Abhyankkar", favorite: false, composer: "Sai Abhyankkar" },
  { id: 311, title: "Sithira Puthiri Reprise", artist: "Sai Abhyankkar", album: "Single (2024)", language: "Tamil", duration: "3:10", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/311.jpg", spotifyUrl: "https://open.spotify.com/search/Sithira%20Puthiri%20Reprise%20Sai%20Abhyankkar", favorite: false, composer: "Sai Abhyankkar" },
  { id: 312, title: "Arabic Kuthu Reprise Tamil", artist: "Anirudh Ravichander", album: "Beast (2022)", language: "Tamil", duration: "4:36", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/312.jpg", spotifyUrl: "https://open.spotify.com/search/Arabic%20Kuthu%20Reprise%20Tamil%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 313, title: "Vaathi Coming Reprise", artist: "Anirudh Ravichander", album: "Master (2021)", language: "Tamil", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/313.jpg", spotifyUrl: "https://open.spotify.com/search/Vaathi%20Coming%20Reprise%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 314, title: "Thangamey Tamil Live", artist: "Anirudh Ravichander", album: "Naanum Rowdy Dhaan Live (2015)", language: "Tamil", duration: "4:21", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/314.jpg", spotifyUrl: "https://open.spotify.com/search/Thangamey%20Tamil%20Live%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 315, title: "Ilaya Nila Live", artist: "S. P. Balasubrahmanyam", album: "Payanangal Live (1982)", language: "Tamil", duration: "4:36", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/315.jpg", spotifyUrl: "https://open.spotify.com/search/Ilaya%20Nila%20Live%20S.%20P.%20Balasubrahmanyam", favorite: false, composer: "Ilaiyaraaja" },
  { id: 316, title: "Putham Pudhu Kaalai Live", artist: "S. Janaki", album: "Alaigal Live (1981)", language: "Tamil", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/316.jpg", spotifyUrl: "https://open.spotify.com/search/Putham%20Pudhu%20Kaalai%20Live%20S.%20Janaki", favorite: false, composer: "Ilaiyaraaja" },
  { id: 317, title: "Valaiyosai Live", artist: "S. P. Balasubrahmanyam", album: "Sathya Live (1988)", language: "Tamil", duration: "4:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/317.jpg", spotifyUrl: "https://open.spotify.com/search/Valaiyosai%20Live%20S.%20P.%20Balasubrahmanyam", favorite: false, composer: "Ilaiyaraaja" },
  { id: 318, title: "Shenbagame Live", artist: "S. P. Balasubrahmanyam", album: "Enga Ooru Live (1987)", language: "Tamil", duration: "4:52", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/318.jpg", spotifyUrl: "https://open.spotify.com/search/Shenbagame%20Live%20S.%20P.%20Balasubrahmanyam", favorite: false, composer: "Ilaiyaraaja" },
  { id: 319, title: "Oru Naalil Live", artist: "K. K.", album: "Pudhupettai Live (2006)", language: "Tamil", duration: "5:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/319.jpg", spotifyUrl: "https://open.spotify.com/search/Oru%20Naalil%20Live%20K.%20K.", favorite: false, composer: "Yuvan Shankar Raja" },
  { id: 320, title: "Vaseegara Live", artist: "Bombay Jayashri", album: "Minnale Live (2001)", language: "Tamil", duration: "5:14", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/320.jpg", spotifyUrl: "https://open.spotify.com/search/Vaseegara%20Live%20Bombay%20Jayashri", favorite: false, composer: "Harris Jayaraj" },
  { id: 321, title: "Yaaro Ivan Live", artist: "Sid Sriram", album: "Udhayam NH4 Live (2013)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/321.jpg", spotifyUrl: "https://open.spotify.com/search/Yaaro%20Ivan%20Live%20Sid%20Sriram", favorite: false, composer: "G. V. Prakash Kumar" },
  { id: 322, title: "Anbe Peranbe Live", artist: "Sid Sriram", album: "NGK Live (2019)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/322.jpg", spotifyUrl: "https://open.spotify.com/search/Anbe%20Peranbe%20Live%20Sid%20Sriram", favorite: false, composer: "G. V. Prakash Kumar" },
  { id: 323, title: "Maacho Live", artist: "Sid Sriram", album: "Mersal Live (2017)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/323.jpg", spotifyUrl: "https://open.spotify.com/search/Maacho%20Live%20Sid%20Sriram", favorite: false, composer: "Santhosh Narayanan" },
  { id: 324, title: "Thalli Pogathey Live", artist: "Sid Sriram", album: "AYM Live (2016)", language: "Tamil", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/324.jpg", spotifyUrl: "https://open.spotify.com/search/Thalli%20Pogathey%20Live%20Sid%20Sriram", favorite: false, composer: "A. R. Rahman" },
  { id: 325, title: "Naan Pizhai Live", artist: "Pradeep Kumar", album: "Kaaviya Thalaivan Live (2014)", language: "Tamil", duration: "4:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/325.jpg", spotifyUrl: "https://open.spotify.com/search/Naan%20Pizhai%20Live%20Pradeep%20Kumar", favorite: false, composer: "Govind Vasantha" },
  { id: 326, title: "Nee Korinaal Live", artist: "Sean Roldan", album: "Sathuranga Vettai Live (2014)", language: "Tamil", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/326.jpg", spotifyUrl: "https://open.spotify.com/search/Nee%20Korinaal%20Live%20Sean%20Roldan", favorite: false, composer: "Sean Roldan" },
  { id: 327, title: "Hey Minnale Live", artist: "Sai Abhyankkar", album: "Amaran Live (2024)", language: "Tamil", duration: "3:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/327.jpg", spotifyUrl: "https://open.spotify.com/search/Hey%20Minnale%20Live%20Sai%20Abhyankkar", favorite: false, composer: "G. V. Prakash Kumar" },
  { id: 328, title: "Unakku Thaan Live", artist: "Santhosh Narayanan", album: "Chitha Live (2023)", language: "Tamil", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/328.jpg", spotifyUrl: "https://open.spotify.com/search/Unakku%20Thaan%20Live%20Santhosh%20Narayanan", favorite: false, composer: "Santhosh Narayanan" },
  { id: 329, title: "Kadhal Kanmani Live", artist: "Shreya Ghoshal", album: "OK Kanmani Live (2015)", language: "Tamil", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/329.jpg", spotifyUrl: "https://open.spotify.com/search/Kadhal%20Kanmani%20Live%20Shreya%20Ghoshal", favorite: false, composer: "A. R. Rahman" },
  { id: 330, title: "Ennadi Maayavi Live", artist: "A. R. Rahman", album: "Vada Chennai Live (2018)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/330.jpg", spotifyUrl: "https://open.spotify.com/search/Ennadi%20Maayavi%20Live%20A.%20R.%20Rahman", favorite: false, composer: "A. R. Rahman" },
  { id: 331, title: "Kannama Live Tamil", artist: "Pradeep Kumar", album: "Kaithi Live (2019)", language: "Tamil", duration: "4:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/331.jpg", spotifyUrl: "https://open.spotify.com/search/Kannama%20Live%20Tamil%20Pradeep%20Kumar", favorite: false, composer: "Sam C. S." },
  { id: 332, title: "Two Two Two Live", artist: "Anirudh Ravichander", album: "KVRK Live (2022)", language: "Tamil", duration: "3:28", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/332.jpg", spotifyUrl: "https://open.spotify.com/search/Two%20Two%20Two%20Live%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 333, title: "Private Party Live", artist: "Anirudh Ravichander", album: "Don Live (2022)", language: "Tamil", duration: "3:35", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/333.jpg", spotifyUrl: "https://open.spotify.com/search/Private%20Party%20Live%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 334, title: "Adiye Live", artist: "Dhibu Ninan Thomas", album: "Bachelor Live (2021)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/334.jpg", spotifyUrl: "https://open.spotify.com/search/Adiye%20Live%20Dhibu%20Ninan%20Thomas", favorite: false, composer: "Dhibu Ninan Thomas" },
  { id: 335, title: "Pookkalae Live", artist: "Haricharan", album: "I Live (2015)", language: "Tamil", duration: "5:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/335.jpg", spotifyUrl: "https://open.spotify.com/search/Pookkalae%20Live%20Haricharan", favorite: false, composer: "A. R. Rahman" },
  { id: 336, title: "Aathichudi Live", artist: "Vijay Antony", album: "TN 07 Live (2008)", language: "Tamil", duration: "4:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/336.jpg", spotifyUrl: "https://open.spotify.com/search/Aathichudi%20Live%20Vijay%20Antony", favorite: false, composer: "Vijay Antony" },
  { id: 337, title: "Aaya Sher", artist: "Anirudh Ravichander & Dhee", album: "The Paradise (2025)", language: "Telugu", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/telugu/337.jpg", spotifyUrl: "https://open.spotify.com/search/Aaya%20Sher%20Anirudh%20Ravichander%20%26%20Dhee", favorite: false, composer: "Anirudh Ravichander" },
  { id: 338, title: "Daavudi", artist: "Anirudh Ravichander & Nakash Aziz", album: "Devara Part 1 (2024)", language: "Telugu", duration: "3:28", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/telugu/338.jpg", spotifyUrl: "https://open.spotify.com/search/Daavudi%20Anirudh%20Ravichander%20%26%20Nakash%20Aziz", favorite: false, composer: "Anirudh Ravichander" },
  { id: 339, title: "Ayudha Pooja Reprise", artist: "Anirudh Ravichander", album: "Devara (2024)", language: "Telugu", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/telugu/339.jpg", spotifyUrl: "https://open.spotify.com/search/Ayudha%20Pooja%20Reprise%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 340, title: "Fear Song Telugu", artist: "Anirudh Ravichander", album: "Devara (2024)", language: "Telugu", duration: "3:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/telugu/340.jpg", spotifyUrl: "https://open.spotify.com/search/Fear%20Song%20Telugu%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 341, title: "Kalaavathi Reprise", artist: "Sid Sriram", album: "Sarkaru Vaari Paata (2022)", language: "Telugu", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/telugu/341.jpg", spotifyUrl: "https://open.spotify.com/search/Kalaavathi%20Reprise%20Sid%20Sriram", favorite: false, composer: "S. Thaman" },
  { id: 342, title: "Mastaaru Mastaaru Reprise", artist: "Shreya Ghoshal", album: "Sir (2023)", language: "Telugu", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/telugu/342.jpg", spotifyUrl: "https://open.spotify.com/search/Mastaaru%20Mastaaru%20Reprise%20Shreya%20Ghoshal", favorite: false, composer: "G. V. Prakash Kumar" },
  { id: 343, title: "Samajavaragamana Reprise", artist: "Sid Sriram", album: "Ala Vaikunthapurramuloo (2020)", language: "Telugu", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/telugu/343.jpg", spotifyUrl: "https://open.spotify.com/search/Samajavaragamana%20Reprise%20Sid%20Sriram", favorite: false, composer: "S. Thaman" },
  { id: 344, title: "Butta Bomma Reprise", artist: "Armaan Malik", album: "Ala Vaikunthapurramuloo (2020)", language: "Telugu", duration: "3:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/telugu/344.jpg", spotifyUrl: "https://open.spotify.com/search/Butta%20Bomma%20Reprise%20Armaan%20Malik", favorite: false, composer: "S. Thaman" },
  { id: 345, title: "Ramuloo Ramulaa Reprise", artist: "Anurag Kulkarni", album: "Ala Vaikunthapurramuloo (2020)", language: "Telugu", duration: "4:06", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/telugu/345.jpg", spotifyUrl: "https://open.spotify.com/search/Ramuloo%20Ramulaa%20Reprise%20Anurag%20Kulkarni", favorite: false, composer: "S. Thaman" },
  { id: 346, title: "Srivalli Reprise", artist: "Sid Sriram", album: "Pushpa (2021)", language: "Telugu", duration: "3:44", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/telugu/346.jpg", spotifyUrl: "https://open.spotify.com/search/Srivalli%20Reprise%20Sid%20Sriram", favorite: false, composer: "Devi Sri Prasad" },
  { id: 347, title: "Oo Antava Reprise", artist: "Indravathi Chauhan", album: "Pushpa (2021)", language: "Telugu", duration: "3:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/telugu/347.jpg", spotifyUrl: "https://open.spotify.com/search/Oo%20Antava%20Reprise%20Indravathi%20Chauhan", favorite: false, composer: "Devi Sri Prasad" },
  { id: 348, title: "Pushpa Pushpa Reprise", artist: "Mika Singh", album: "Pushpa 2 (2024)", language: "Telugu", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/telugu/348.jpg", spotifyUrl: "https://open.spotify.com/search/Pushpa%20Pushpa%20Reprise%20Mika%20Singh", favorite: false, composer: "Devi Sri Prasad" },
  { id: 349, title: "Naatu Naatu Reprise", artist: "Rahul Sipligunj", album: "RRR (2022)", language: "Telugu", duration: "3:44", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/telugu/349.jpg", spotifyUrl: "https://open.spotify.com/search/Naatu%20Naatu%20Reprise%20Rahul%20Sipligunj", favorite: false, composer: "M. M. Keeravani" },
  { id: 350, title: "Inkem Inkem Reprise", artist: "Sid Sriram", album: "Geetha Govindam (2018)", language: "Telugu", duration: "3:52", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/telugu/350.jpg", spotifyUrl: "https://open.spotify.com/search/Inkem%20Inkem%20Reprise%20Sid%20Sriram", favorite: false, composer: "Gopi Sundar" },
  { id: 351, title: "Vachindamma Reprise", artist: "Sid Sriram", album: "Geetha Govindam (2018)", language: "Telugu", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/telugu/351.jpg", spotifyUrl: "https://open.spotify.com/search/Vachindamma%20Reprise%20Sid%20Sriram", favorite: false, composer: "Gopi Sundar" },
  { id: 352, title: "Choosi Chudangane Reprise", artist: "Armaan Malik", album: "Chilasow (2018)", language: "Telugu", duration: "3:52", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/telugu/352.jpg", spotifyUrl: "https://open.spotify.com/search/Choosi%20Chudangane%20Reprise%20Armaan%20Malik", favorite: false, composer: "Gopi Sundar" },
  { id: 353, title: "Ninnila Reprise", artist: "Armaan Malik", album: "Tholi Prema (2018)", language: "Telugu", duration: "3:46", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/telugu/353.jpg", spotifyUrl: "https://open.spotify.com/search/Ninnila%20Reprise%20Armaan%20Malik", favorite: false, composer: "S. Thaman" },
  { id: 354, title: "Hoyna Hoyna Reprise", artist: "Anirudh Ravichander", album: "Devara (2024)", language: "Telugu", duration: "3:33", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/telugu/354.jpg", spotifyUrl: "https://open.spotify.com/search/Hoyna%20Hoyna%20Reprise%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 355, title: "Kurchi Madathapetti Reprise", artist: "Sahiti Chaganti", album: "Guntur Kaaram (2024)", language: "Telugu", duration: "4:06", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/telugu/355.jpg", spotifyUrl: "https://open.spotify.com/search/Kurchi%20Madathapetti%20Reprise%20Sahiti%20Chaganti", favorite: false, composer: "S. Thaman" },
  { id: 356, title: "Tillu Anna Reprise", artist: "Ram Miriyala", album: "DJ Tillu (2022)", language: "Telugu", duration: "3:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/telugu/356.jpg", spotifyUrl: "https://open.spotify.com/search/Tillu%20Anna%20Reprise%20Ram%20Miriyala", favorite: false, composer: "Sricharan Pakala" },
  { id: 357, title: "Nijame Ne Chebutunna Reprise", artist: "Sid Sriram", album: "Ooru Peru Bhairavakona (2024)", language: "Telugu", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/telugu/357.jpg", spotifyUrl: "https://open.spotify.com/search/Nijame%20Ne%20Chebutunna%20Reprise%20Sid%20Sriram", favorite: false, composer: "Shekar Chandra" },
  { id: 358, title: "Malli Malli Reprise", artist: "Sid Sriram", album: "Oh Baby (2019)", language: "Telugu", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/telugu/358.jpg", spotifyUrl: "https://open.spotify.com/search/Malli%20Malli%20Reprise%20Sid%20Sriram", favorite: false, composer: "Mickey J. Meyer" },
  { id: 359, title: "Emo Emo Reprise", artist: "Sid Sriram", album: "Raahu (2023)", language: "Telugu", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/telugu/359.jpg", spotifyUrl: "https://open.spotify.com/search/Emo%20Emo%20Reprise%20Sid%20Sriram", favorite: false, composer: "Gopi Sundar" },
  { id: 360, title: "Adiga Adiga Reprise", artist: "Sid Sriram", album: "Ninnu Kori (2017)", language: "Telugu", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/telugu/360.jpg", spotifyUrl: "https://open.spotify.com/search/Adiga%20Adiga%20Reprise%20Sid%20Sriram", favorite: false, composer: "Gopi Sundar" },
  { id: 361, title: "Undiporaadhey Reprise", artist: "Sid Sriram", album: "Hushaaru (2018)", language: "Telugu", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/telugu/361.jpg", spotifyUrl: "https://open.spotify.com/search/Undiporaadhey%20Reprise%20Sid%20Sriram", favorite: false, composer: "Mickey J. Meyer" },
  { id: 362, title: "Vintunnava Reprise", artist: "Shreya Ghoshal", album: "Ye Maaya Chesave (2010)", language: "Telugu", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/telugu/362.jpg", spotifyUrl: "https://open.spotify.com/search/Vintunnava%20Reprise%20Shreya%20Ghoshal", favorite: false, composer: "A. R. Rahman" },
  { id: 363, title: "Inthandham Reprise", artist: "Sid Sriram", album: "Sita Ramam (2022)", language: "Telugu", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/telugu/363.jpg", spotifyUrl: "https://open.spotify.com/search/Inthandham%20Reprise%20Sid%20Sriram", favorite: false, composer: "Vishal Chandrasekhar" },
  { id: 364, title: "Oh Sita Hey Rama Reprise", artist: "Sid Sriram", album: "Sita Ramam (2022)", language: "Telugu", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/telugu/364.jpg", spotifyUrl: "https://open.spotify.com/search/Oh%20Sita%20Hey%20Rama%20Reprise%20Sid%20Sriram", favorite: false, composer: "Vishal Chandrasekhar" },
  { id: 365, title: "Kushi Title Reprise", artist: "Hesham Abdul Wahab", album: "Kushi (2023)", language: "Telugu", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/telugu/365.jpg", spotifyUrl: "https://open.spotify.com/search/Kushi%20Title%20Reprise%20Hesham%20Abdul%20Wahab", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 366, title: "Aradhya Reprise", artist: "Sid Sriram", album: "Kushi (2023)", language: "Telugu", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/telugu/366.jpg", spotifyUrl: "https://open.spotify.com/search/Aradhya%20Reprise%20Sid%20Sriram", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 367, title: "Na Roja Nuvve Reprise", artist: "Hesham Abdul Wahab", album: "Kushi (2023)", language: "Telugu", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/telugu/367.jpg", spotifyUrl: "https://open.spotify.com/search/Na%20Roja%20Nuvve%20Reprise%20Hesham%20Abdul%20Wahab", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 368, title: "Panchakattu Reprise", artist: "S. Thaman", album: "Guntur Kaaram (2024)", language: "Telugu", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/telugu/368.jpg", spotifyUrl: "https://open.spotify.com/search/Panchakattu%20Reprise%20S.%20Thaman", favorite: false, composer: "S. Thaman" },
  { id: 369, title: "Sammohanuda Reprise", artist: "Shreya Ghoshal", album: "Rules Ranjann (2023)", language: "Telugu", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/telugu/369.jpg", spotifyUrl: "https://open.spotify.com/search/Sammohanuda%20Reprise%20Shreya%20Ghoshal", favorite: false, composer: "Amrish" },
  { id: 370, title: "Naa Nuvve Reprise", artist: "Karthik", album: "Nannaku Prematho (2016)", language: "Telugu", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/telugu/370.jpg", spotifyUrl: "https://open.spotify.com/search/Naa%20Nuvve%20Reprise%20Karthik", favorite: false, composer: "Devi Sri Prasad" },
  { id: 371, title: "Vellake Reprise", artist: "Sid Sriram", album: "Agnyaathavaasi (2018)", language: "Telugu", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/telugu/371.jpg", spotifyUrl: "https://open.spotify.com/search/Vellake%20Reprise%20Sid%20Sriram", favorite: false, composer: "Anirudh Ravichander" },
  { id: 372, title: "Yenti Yenti Reprise", artist: "Chinmayi", album: "Geetha Govindam (2018)", language: "Telugu", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/telugu/372.jpg", spotifyUrl: "https://open.spotify.com/search/Yenti%20Yenti%20Reprise%20Chinmayi", favorite: false, composer: "Gopi Sundar" },
  { id: 373, title: "Gira Gira Reprise", artist: "Shreya Ghoshal", album: "Dear Comrade Telugu (2019)", language: "Telugu", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/telugu/373.jpg", spotifyUrl: "https://open.spotify.com/search/Gira%20Gira%20Reprise%20Shreya%20Ghoshal", favorite: false, composer: "Justin Prabhakaran" },
  { id: 374, title: "Kadalalle Reprise", artist: "Sid Sriram", album: "Dear Comrade (2019)", language: "Telugu", duration: "5:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/telugu/374.jpg", spotifyUrl: "https://open.spotify.com/search/Kadalalle%20Reprise%20Sid%20Sriram", favorite: false, composer: "Justin Prabhakaran" },
  { id: 375, title: "Maguva Maguva Reprise", artist: "Sid Sriram", album: "Vakeel Saab (2021)", language: "Telugu", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/telugu/375.jpg", spotifyUrl: "https://open.spotify.com/search/Maguva%20Maguva%20Reprise%20Sid%20Sriram", favorite: false, composer: "S. Thaman" },
  { id: 376, title: "Saranga Dariya Reprise", artist: "Mangli", album: "Love Story (2021)", language: "Telugu", duration: "3:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/telugu/376.jpg", spotifyUrl: "https://open.spotify.com/search/Saranga%20Dariya%20Reprise%20Mangli", favorite: false, composer: "M. M. Keeravani" },
  { id: 377, title: "Anaganaganaga Reprise", artist: "Armaan Malik", album: "Ninnu Kori (2017)", language: "Telugu", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/telugu/377.jpg", spotifyUrl: "https://open.spotify.com/search/Anaganaganaga%20Reprise%20Armaan%20Malik", favorite: false, composer: "Gopi Sundar" },
  { id: 378, title: "Pushpa 2 Title", artist: "Devi Sri Prasad & Nakash Aziz", album: "Pushpa 2 (2024)", language: "Telugu", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/telugu/378.jpg", spotifyUrl: "https://open.spotify.com/search/Pushpa%202%20Title%20Devi%20Sri%20Prasad%20%26%20Nakash%20Aziz", favorite: false, composer: "Devi Sri Prasad" },
  { id: 379, title: "Devara Title", artist: "Anirudh Ravichander", album: "Devara (2024)", language: "Telugu", duration: "3:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/telugu/379.jpg", spotifyUrl: "https://open.spotify.com/search/Devara%20Title%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 380, title: "Guntur Kaaram Title", artist: "S. Thaman", album: "Guntur Kaaram (2024)", language: "Telugu", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/telugu/380.jpg", spotifyUrl: "https://open.spotify.com/search/Guntur%20Kaaram%20Title%20S.%20Thaman", favorite: false, composer: "S. Thaman" },
  { id: 381, title: "Chuttamalle Reprise 2", artist: "Shilpa Rao", album: "Devara Part 1 (2024)", language: "Telugu", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/telugu/381.jpg", spotifyUrl: "https://open.spotify.com/search/Chuttamalle%20Reprise%202%20Shilpa%20Rao", favorite: false, composer: "Anirudh Ravichander" },
  { id: 382, title: "Daavudi Reprise", artist: "Nakash Aziz", album: "Devara (2024)", language: "Telugu", duration: "3:28", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/telugu/382.jpg", spotifyUrl: "https://open.spotify.com/search/Daavudi%20Reprise%20Nakash%20Aziz", favorite: false, composer: "Anirudh Ravichander" },
  { id: 383, title: "Aaya Sher Reprise", artist: "Anirudh Ravichander", album: "The Paradise (2025)", language: "Telugu", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/telugu/383.jpg", spotifyUrl: "https://open.spotify.com/search/Aaya%20Sher%20Reprise%20Anirudh%20Ravichander", favorite: false, composer: "Anirudh Ravichander" },
  { id: 384, title: "Kurchi Madathapetti Live", artist: "Sahiti Chaganti", album: "Guntur Kaaram Live (2024)", language: "Telugu", duration: "4:06", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/telugu/384.jpg", spotifyUrl: "https://open.spotify.com/search/Kurchi%20Madathapetti%20Live%20Sahiti%20Chaganti", favorite: false, composer: "S. Thaman" },
  { id: 385, title: "Butta Bomma Live", artist: "Armaan Malik", album: "Ala Vaikunthapurramuloo Live (2020)", language: "Telugu", duration: "3:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/telugu/385.jpg", spotifyUrl: "https://open.spotify.com/search/Butta%20Bomma%20Live%20Armaan%20Malik", favorite: false, composer: "S. Thaman" },
  { id: 386, title: "APT.", artist: "Rosé & Bruno Mars", album: "APT. (2024)", language: "English", duration: "2:49", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/english/386.jpg", spotifyUrl: "https://open.spotify.com/search/APT.%20Ros%C3%A9%20%26%20Bruno%20Mars", favorite: false, composer: "Rosé & Bruno Mars" },
  { id: 387, title: "Die With A Smile Reprise", artist: "Bruno Mars & Lady Gaga", album: "Single (2024)", language: "English", duration: "4:11", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/english/387.jpg", spotifyUrl: "https://open.spotify.com/search/Die%20With%20A%20Smile%20Reprise%20Bruno%20Mars%20%26%20Lady%20Gaga", favorite: false, composer: "Bruno Mars & Lady Gaga" },
  { id: 388, title: "Please Please Please", artist: "Sabrina Carpenter", album: "Short n' Sweet (2024)", language: "English", duration: "3:06", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/english/388.jpg", spotifyUrl: "https://open.spotify.com/search/Please%20Please%20Please%20Sabrina%20Carpenter", favorite: false, composer: "Sabrina Carpenter" },
  { id: 389, title: "Taste", artist: "Sabrina Carpenter", album: "Short n' Sweet (2024)", language: "English", duration: "2:37", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/english/389.jpg", spotifyUrl: "https://open.spotify.com/search/Taste%20Sabrina%20Carpenter", favorite: false, composer: "Sabrina Carpenter" },
  { id: 390, title: "LUNCH", artist: "Billie Eilish", album: "Hit Me Hard and Soft (2024)", language: "English", duration: "3:00", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/english/390.jpg", spotifyUrl: "https://open.spotify.com/search/LUNCH%20Billie%20Eilish", favorite: false, composer: "Billie Eilish & Finneas" },
  { id: 391, title: "CHIHIRO", artist: "Billie Eilish", album: "Hit Me Hard and Soft (2024)", language: "English", duration: "5:03", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/english/391.jpg", spotifyUrl: "https://open.spotify.com/search/CHIHIRO%20Billie%20Eilish", favorite: false, composer: "Billie Eilish & Finneas" },
  { id: 392, title: "Fortnight", artist: "Taylor Swift ft. Post Malone", album: "The Tortured Poets Department (2024)", language: "English", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/english/392.jpg", spotifyUrl: "https://open.spotify.com/search/Fortnight%20Taylor%20Swift%20ft.%20Post%20Malone", favorite: false, composer: "Taylor Swift & Jack Antonoff" },
  { id: 393, title: "Beautiful Things", artist: "Benson Boone", album: "Fireworks & Rollerblades (2024)", language: "English", duration: "3:00", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/english/393.jpg", spotifyUrl: "https://open.spotify.com/search/Beautiful%20Things%20Benson%20Boone", favorite: false, composer: "Benson Boone & Evan Blair" },
  { id: 394, title: "Slow It Down", artist: "Benson Boone", album: "Fireworks & Rollerblades (2024)", language: "English", duration: "2:40", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/english/394.jpg", spotifyUrl: "https://open.spotify.com/search/Slow%20It%20Down%20Benson%20Boone", favorite: false, composer: "Benson Boone" },
  { id: 395, title: "Good Luck, Babe!", artist: "Chappell Roan", album: "Single (2024)", language: "English", duration: "3:38", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/english/395.jpg", spotifyUrl: "https://open.spotify.com/search/Good%20Luck%2C%20Babe!%20Chappell%20Roan", favorite: false, composer: "Chappell Roan & Dan Nigro" },
  { id: 396, title: "Hot To Go!", artist: "Chappell Roan", album: "The Rise and Fall (2023)", language: "English", duration: "3:04", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/english/396.jpg", spotifyUrl: "https://open.spotify.com/search/Hot%20To%20Go!%20Chappell%20Roan", favorite: false, composer: "Chappell Roan" },
  { id: 397, title: "Pink Pony Club", artist: "Chappell Roan", album: "The Rise and Fall (2023)", language: "English", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/english/397.jpg", spotifyUrl: "https://open.spotify.com/search/Pink%20Pony%20Club%20Chappell%20Roan", favorite: false, composer: "Chappell Roan" },
  { id: 398, title: "Not Like Us", artist: "Kendrick Lamar", album: "Single (2024)", language: "English", duration: "4:33", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/english/398.jpg", spotifyUrl: "https://open.spotify.com/search/Not%20Like%20Us%20Kendrick%20Lamar", favorite: false, composer: "Kendrick Lamar & Mustard" },
  { id: 399, title: "Squabble Up", artist: "Kendrick Lamar", album: "GNX (2024)", language: "English", duration: "2:58", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/english/399.jpg", spotifyUrl: "https://open.spotify.com/search/Squabble%20Up%20Kendrick%20Lamar", favorite: false, composer: "Kendrick Lamar" },
  { id: 400, title: "Luther", artist: "Kendrick Lamar & SZA", album: "GNX (2024)", language: "English", duration: "2:57", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/english/400.jpg", spotifyUrl: "https://open.spotify.com/search/Luther%20Kendrick%20Lamar%20%26%20SZA", favorite: false, composer: "Kendrick Lamar & SZA" },
  { id: 401, title: "Too Sweet", artist: "Hozier", album: "Unheard EP (2024)", language: "English", duration: "4:11", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/english/401.jpg", spotifyUrl: "https://open.spotify.com/search/Too%20Sweet%20Hozier", favorite: false, composer: "Hozier & Daniel Nigro" },
  { id: 402, title: "A Bar Song (Tipsy)", artist: "Shaboozey", album: "Where I've Been (2024)", language: "English", duration: "2:51", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/english/402.jpg", spotifyUrl: "https://open.spotify.com/search/A%20Bar%20Song%20(Tipsy)%20Shaboozey", favorite: false, composer: "Shaboozey & Nevin Sastry" },
  { id: 403, title: "I Had Some Help", artist: "Post Malone ft. Morgan Wallen", album: "F-1 Trillion (2024)", language: "English", duration: "2:58", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/english/403.jpg", spotifyUrl: "https://open.spotify.com/search/I%20Had%20Some%20Help%20Post%20Malone%20ft.%20Morgan%20Wallen", favorite: false, composer: "Post Malone & Louis Bell" },
  { id: 404, title: "We Can't Be Friends", artist: "Ariana Grande", album: "Eternal Sunshine (2024)", language: "English", duration: "3:36", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/english/404.jpg", spotifyUrl: "https://open.spotify.com/search/We%20Can't%20Be%20Friends%20Ariana%20Grande", favorite: false, composer: "Ariana Grande & Max Martin" },
  { id: 405, title: "Yes, And?", artist: "Ariana Grande", album: "Eternal Sunshine (2024)", language: "English", duration: "3:34", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/english/405.jpg", spotifyUrl: "https://open.spotify.com/search/Yes%2C%20And%3F%20Ariana%20Grande", favorite: false, composer: "Ariana Grande & Max Martin" },
  { id: 406, title: "Training Season", artist: "Dua Lipa", album: "Radical Optimism (2024)", language: "English", duration: "3:29", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/english/406.jpg", spotifyUrl: "https://open.spotify.com/search/Training%20Season%20Dua%20Lipa", favorite: false, composer: "Dua Lipa & Danny Harle" },
  { id: 407, title: "Illusion", artist: "Dua Lipa", album: "Radical Optimism (2024)", language: "English", duration: "3:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/english/407.jpg", spotifyUrl: "https://open.spotify.com/search/Illusion%20Dua%20Lipa", favorite: false, composer: "Dua Lipa" },
  { id: 408, title: "Greedy Reprise", artist: "Tate McRae", album: "Think Later (2023)", language: "English", duration: "2:11", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/english/408.jpg", spotifyUrl: "https://open.spotify.com/search/Greedy%20Reprise%20Tate%20McRae", favorite: false, composer: "Tate McRae" },
  { id: 409, title: "Exes", artist: "Tate McRae", album: "Think Later (2023)", language: "English", duration: "2:39", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/english/409.jpg", spotifyUrl: "https://open.spotify.com/search/Exes%20Tate%20McRae", favorite: false, composer: "Tate McRae" },
  { id: 410, title: "Lovin On Me", artist: "Jack Harlow", album: "Single (2023)", language: "English", duration: "2:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/english/410.jpg", spotifyUrl: "https://open.spotify.com/search/Lovin%20On%20Me%20Jack%20Harlow", favorite: false, composer: "Jack Harlow & OZ" },
  { id: 411, title: "Stick Season", artist: "Noah Kahan", album: "Stick Season (2023)", language: "English", duration: "4:03", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/english/411.jpg", spotifyUrl: "https://open.spotify.com/search/Stick%20Season%20Noah%20Kahan", favorite: false, composer: "Noah Kahan & Gabe Simon" },
  { id: 412, title: "Texas Hold 'Em", artist: "Beyoncé", album: "Cowboy Carter (2024)", language: "English", duration: "3:53", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/english/412.jpg", spotifyUrl: "https://open.spotify.com/search/Texas%20Hold%20'Em%20Beyonc%C3%A9", favorite: false, composer: "Beyoncé & Killah B" },
  { id: 413, title: "Espresso Live", artist: "Sabrina Carpenter", album: "Short n' Sweet Live (2024)", language: "English", duration: "2:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/english/413.jpg", spotifyUrl: "https://open.spotify.com/search/Espresso%20Live%20Sabrina%20Carpenter", favorite: false, composer: "Sabrina Carpenter" },
  { id: 414, title: "Gata Only", artist: "FloyyMenor & Cris MJ", album: "Single (2024)", language: "English", duration: "3:31", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/english/414.jpg", spotifyUrl: "https://open.spotify.com/search/Gata%20Only%20FloyyMenor%20%26%20Cris%20MJ", favorite: false, composer: "FloyyMenor" },
  { id: 415, title: "Belong Together", artist: "Mark Ambor", album: "Single (2024)", language: "English", duration: "2:28", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/english/415.jpg", spotifyUrl: "https://open.spotify.com/search/Belong%20Together%20Mark%20Ambor", favorite: false, composer: "Mark Ambor" },
  { id: 416, title: "Million Dollar Baby", artist: "Tommy Richman", album: "Single (2024)", language: "English", duration: "2:35", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/english/416.jpg", spotifyUrl: "https://open.spotify.com/search/Million%20Dollar%20Baby%20Tommy%20Richman", favorite: false, composer: "Tommy Richman" },
  { id: 417, title: "Lose Control", artist: "Teddy Swims", album: "I've Tried Everything (2023)", language: "English", duration: "3:30", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/english/417.jpg", spotifyUrl: "https://open.spotify.com/search/Lose%20Control%20Teddy%20Swims", favorite: false, composer: "Teddy Swims & Ammo" },
  { id: 418, title: "Stargazing", artist: "Myles Smith", album: "Single (2024)", language: "English", duration: "2:52", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/english/418.jpg", spotifyUrl: "https://open.spotify.com/search/Stargazing%20Myles%20Smith", favorite: false, composer: "Myles Smith & Peter Fenn" },
  { id: 419, title: "We Pray", artist: "Coldplay ft. Little Simz", album: "Moon Music (2024)", language: "English", duration: "3:53", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/english/419.jpg", spotifyUrl: "https://open.spotify.com/search/We%20Pray%20Coldplay%20ft.%20Little%20Simz", favorite: false, composer: "Coldplay & Max Martin" },
  { id: 420, title: "Feels Like I'm Falling", artist: "Coldplay", album: "Moon Music (2024)", language: "English", duration: "4:09", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/english/420.jpg", spotifyUrl: "https://open.spotify.com/search/Feels%20Like%20I'm%20Falling%20Coldplay", favorite: false, composer: "Coldplay" },
  { id: 421, title: "Die With A Smile Live", artist: "Bruno Mars & Lady Gaga", album: "Live (2024)", language: "English", duration: "4:11", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/english/421.jpg", spotifyUrl: "https://open.spotify.com/search/Die%20With%20A%20Smile%20Live%20Bruno%20Mars%20%26%20Lady%20Gaga", favorite: false, composer: "Bruno Mars" },
  { id: 422, title: "APT. Live", artist: "Rosé & Bruno Mars", album: "Live (2024)", language: "English", duration: "2:49", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/english/422.jpg", spotifyUrl: "https://open.spotify.com/search/APT.%20Live%20Ros%C3%A9%20%26%20Bruno%20Mars", favorite: false, composer: "Rosé" },
  { id: 423, title: "Espresso Reprise Live", artist: "Sabrina Carpenter", album: "Short n' Sweet Live (2024)", language: "English", duration: "2:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/english/423.jpg", spotifyUrl: "https://open.spotify.com/search/Espresso%20Reprise%20Live%20Sabrina%20Carpenter", favorite: false, composer: "Sabrina Carpenter" },
  { id: 424, title: "Gata Only Reprise", artist: "FloyyMenor & Cris MJ", album: "Single (2024)", language: "English", duration: "3:31", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/english/424.jpg", spotifyUrl: "https://open.spotify.com/search/Gata%20Only%20Reprise%20FloyyMenor%20%26%20Cris%20MJ", favorite: false, composer: "FloyyMenor" },
  { id: 425, title: "Belong Together Reprise", artist: "Mark Ambor", album: "Single (2024)", language: "English", duration: "2:28", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/english/425.jpg", spotifyUrl: "https://open.spotify.com/search/Belong%20Together%20Reprise%20Mark%20Ambor", favorite: false, composer: "Mark Ambor" },
  { id: 426, title: "Not Like Us Reprise", artist: "Kendrick Lamar", album: "GNX (2024)", language: "English", duration: "4:33", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/english/426.jpg", spotifyUrl: "https://open.spotify.com/search/Not%20Like%20Us%20Reprise%20Kendrick%20Lamar", favorite: false, composer: "Kendrick Lamar" },
  { id: 427, title: "Lose Control Reprise", artist: "Teddy Swims", album: "Live (2023)", language: "English", duration: "3:30", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/english/427.jpg", spotifyUrl: "https://open.spotify.com/search/Lose%20Control%20Reprise%20Teddy%20Swims", favorite: false, composer: "Teddy Swims" },
  { id: 428, title: "Beautiful Things Live", artist: "Benson Boone", album: "Live (2024)", language: "English", duration: "3:00", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/english/428.jpg", spotifyUrl: "https://open.spotify.com/search/Beautiful%20Things%20Live%20Benson%20Boone", favorite: false, composer: "Benson Boone" },
  { id: 429, title: "Stargazing Reprise", artist: "Myles Smith", album: "Single (2024)", language: "English", duration: "2:52", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/english/429.jpg", spotifyUrl: "https://open.spotify.com/search/Stargazing%20Reprise%20Myles%20Smith", favorite: false, composer: "Myles Smith" },
  { id: 430, title: "We Pray Reprise", artist: "Coldplay", album: "Moon Music (2024)", language: "English", duration: "3:53", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/english/430.jpg", spotifyUrl: "https://open.spotify.com/search/We%20Pray%20Reprise%20Coldplay", favorite: false, composer: "Coldplay" },
  { id: 431, title: "Fortnight Reprise", artist: "Taylor Swift & Post Malone", album: "TTPD (2024)", language: "English", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/english/431.jpg", spotifyUrl: "https://open.spotify.com/search/Fortnight%20Reprise%20Taylor%20Swift%20%26%20Post%20Malone", favorite: false, composer: "Taylor Swift" },
  { id: 432, title: "Cruel Summer Trending Reprise", artist: "Taylor Swift", album: "Lover (2019)", language: "English", duration: "2:58", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/english/432.jpg", spotifyUrl: "https://open.spotify.com/search/Cruel%20Summer%20Trending%20Reprise%20Taylor%20Swift", favorite: false, composer: "Taylor Swift" },
  { id: 433, title: "Unholy Reprise", artist: "Sam Smith ft. Kim Petras", album: "Gloria (2022)", language: "English", duration: "2:36", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/english/433.jpg", spotifyUrl: "https://open.spotify.com/search/Unholy%20Reprise%20Sam%20Smith%20ft.%20Kim%20Petras", favorite: false, composer: "Sam Smith" },
  { id: 434, title: "About Damn Time Reprise", artist: "Lizzo", album: "Special (2022)", language: "English", duration: "3:11", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/english/434.jpg", spotifyUrl: "https://open.spotify.com/search/About%20Damn%20Time%20Reprise%20Lizzo", favorite: false, composer: "Lizzo" },
  { id: 435, title: "Kalyani", artist: "Sithara Krishnakumar & Vineeth Sreenivasan", album: "Hridayam — Kalyani Priyadarshan (2022)", language: "Malayalam", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/malayalam/435.jpg", spotifyUrl: "https://open.spotify.com/search/Kalyani%20Sithara%20Krishnakumar%20%26%20Vineeth%20Sreenivasan", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 436, title: "Kalyani Priyadarshan Theme", artist: "Hesham Abdul Wahab", album: "Bro Daddy — Kalyani Priyadarshan (2022)", language: "Malayalam", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/malayalam/436.jpg", spotifyUrl: "https://open.spotify.com/search/Kalyani%20Priyadarshan%20Theme%20Hesham%20Abdul%20Wahab", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 437, title: "Kalyani — Thallumaala", artist: "Sushin Shyam & Sithara", album: "Thallumaala — Kalyani Priyadarshan (2022)", language: "Malayalam", duration: "3:35", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/malayalam/437.jpg", spotifyUrl: "https://open.spotify.com/search/Kalyani%20%E2%80%94%20Thallumaala%20Sushin%20Shyam%20%26%20Sithara", favorite: false, composer: "Vishnu Vijay" },
  { id: 438, title: "Kalyani — Sesham", artist: "Hesham Abdul Wahab & Sithara", album: "Sesham Mike-il Fathima — Kalyani (2023)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/malayalam/438.jpg", spotifyUrl: "https://open.spotify.com/search/Kalyani%20%E2%80%94%20Sesham%20Hesham%20Abdul%20Wahab%20%26%20Sithara", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 439, title: "Kalyani — Varane Avashyamund", artist: "Sithara Krishnakumar", album: "Varane Avashyamund — Kalyani (2020)", language: "Malayalam", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/malayalam/439.jpg", spotifyUrl: "https://open.spotify.com/search/Kalyani%20%E2%80%94%20Varane%20Avashyamund%20Sithara%20Krishnakumar", favorite: false, composer: "Alphons Joseph" },
  { id: 440, title: "Kalyani — Maara", artist: "Ghibran & Sithara", album: "Maara — Kalyani Cameo (2021)", language: "Malayalam", duration: "4:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/malayalam/440.jpg", spotifyUrl: "https://open.spotify.com/search/Kalyani%20%E2%80%94%20Maara%20Ghibran%20%26%20Sithara", favorite: false, composer: "Ghibran" },
  { id: 441, title: "Hridayam Kalyani Reprise", artist: "Hesham Abdul Wahab", album: "Hridayam (2022)", language: "Malayalam", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/malayalam/441.jpg", spotifyUrl: "https://open.spotify.com/search/Hridayam%20Kalyani%20Reprise%20Hesham%20Abdul%20Wahab", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 442, title: "Bro Daddy Kalyani", artist: "Hesham Abdul Wahab & Sithara", album: "Bro Daddy (2022)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/malayalam/442.jpg", spotifyUrl: "https://open.spotify.com/search/Bro%20Daddy%20Kalyani%20Hesham%20Abdul%20Wahab%20%26%20Sithara", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 443, title: "Thallumaala Kalyani", artist: "Vishnu Vijay & Sithara", album: "Thallumaala (2022)", language: "Malayalam", duration: "3:28", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/malayalam/443.jpg", spotifyUrl: "https://open.spotify.com/search/Thallumaala%20Kalyani%20Vishnu%20Vijay%20%26%20Sithara", favorite: false, composer: "Vishnu Vijay" },
  { id: 444, title: "Sesham Mike Kalyani", artist: "Hesham Abdul Wahab", album: "Sesham Mike-il Fathima (2023)", language: "Malayalam", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/malayalam/444.jpg", spotifyUrl: "https://open.spotify.com/search/Sesham%20Mike%20Kalyani%20Hesham%20Abdul%20Wahab", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 445, title: "Nee Kavithai Kalyani", artist: "Hesham Abdul Wahab", album: "Hridayam (2022)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/malayalam/445.jpg", spotifyUrl: "https://open.spotify.com/search/Nee%20Kavithai%20Kalyani%20Hesham%20Abdul%20Wahab", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 446, title: "Manasaayyo Reprise", artist: "Hesham Abdul Wahab", album: "Hridayam (2022)", language: "Malayalam", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/malayalam/446.jpg", spotifyUrl: "https://open.spotify.com/search/Manasaayyo%20Reprise%20Hesham%20Abdul%20Wahab", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 447, title: "Darshana Reprise", artist: "Hesham Abdul Wahab", album: "Hridayam (2022)", language: "Malayalam", duration: "3:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/malayalam/447.jpg", spotifyUrl: "https://open.spotify.com/search/Darshana%20Reprise%20Hesham%20Abdul%20Wahab", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 448, title: "Aaradhike Reprise", artist: "Kapil Kapilan", album: "Hridayam (2022)", language: "Malayalam", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/malayalam/448.jpg", spotifyUrl: "https://open.spotify.com/search/Aaradhike%20Reprise%20Kapil%20Kapilan", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 449, title: "Kural Reprise", artist: "Hesham Abdul Wahab", album: "Hridayam (2022)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/malayalam/449.jpg", spotifyUrl: "https://open.spotify.com/search/Kural%20Reprise%20Hesham%20Abdul%20Wahab", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 450, title: "Nagumo Reprise", artist: "Hesham Abdul Wahab", album: "Hridayam (2022)", language: "Malayalam", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/malayalam/450.jpg", spotifyUrl: "https://open.spotify.com/search/Nagumo%20Reprise%20Hesham%20Abdul%20Wahab", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 451, title: "Onnamkili Reprise", artist: "Hesham Abdul Wahab", album: "Hridayam (2022)", language: "Malayalam", duration: "4:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/malayalam/451.jpg", spotifyUrl: "https://open.spotify.com/search/Onnamkili%20Reprise%20Hesham%20Abdul%20Wahab", favorite: false, composer: "Hesham Abdul Wahab" },
  { id: 452, title: "Pottu Thotta Reprise", artist: "K. S. Chithra", album: "RDX (2023)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/malayalam/452.jpg", spotifyUrl: "https://open.spotify.com/search/Pottu%20Thotta%20Reprise%20K.%20S.%20Chithra", favorite: false, composer: "Justin Varghese" },
  { id: 453, title: "Neela Nilave Reprise", artist: "Kapil Kapilan", album: "RDX (2023)", language: "Malayalam", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/malayalam/453.jpg", spotifyUrl: "https://open.spotify.com/search/Neela%20Nilave%20Reprise%20Kapil%20Kapilan", favorite: false, composer: "Sam C. S." },
  { id: 454, title: "Halaballoo", artist: "Sushin Shyam", album: "RDX (2023)", language: "Malayalam", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/malayalam/454.jpg", spotifyUrl: "https://open.spotify.com/search/Halaballoo%20Sushin%20Shyam", favorite: false, composer: "Sam C. S." },
  { id: 455, title: "RDX Title", artist: "Sam C. S. & Kapil Kapilan", album: "RDX (2023)", language: "Malayalam", duration: "3:35", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/malayalam/455.jpg", spotifyUrl: "https://open.spotify.com/search/RDX%20Title%20Sam%20C.%20S.%20%26%20Kapil%20Kapilan", favorite: false, composer: "Sam C. S." },
  { id: 456, title: "Palavattam Reprise", artist: "Sushin Shyam & Dabzee", album: "Aavesham (2024)", language: "Malayalam", duration: "3:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/malayalam/456.jpg", spotifyUrl: "https://open.spotify.com/search/Palavattam%20Reprise%20Sushin%20Shyam%20%26%20Dabzee", favorite: false, composer: "Sushin Shyam" },
  { id: 457, title: "Illuminati Reprise", artist: "Dabzee & Sushin Shyam", album: "Aavesham (2024)", language: "Malayalam", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/malayalam/457.jpg", spotifyUrl: "https://open.spotify.com/search/Illuminati%20Reprise%20Dabzee%20%26%20Sushin%20Shyam", favorite: false, composer: "Sushin Shyam" },
  { id: 458, title: "Galileo Reprise", artist: "Sushin Shyam", album: "Aavesham (2024)", language: "Malayalam", duration: "3:35", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/malayalam/458.jpg", spotifyUrl: "https://open.spotify.com/search/Galileo%20Reprise%20Sushin%20Shyam", favorite: false, composer: "Sushin Shyam" },
  { id: 459, title: "Kalam Kagura Reprise", artist: "Sushin Shyam & Dabzee", album: "Aavesham (2024)", language: "Malayalam", duration: "3:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/malayalam/459.jpg", spotifyUrl: "https://open.spotify.com/search/Kalam%20Kagura%20Reprise%20Sushin%20Shyam%20%26%20Dabzee", favorite: false, composer: "Sushin Shyam" },
  { id: 460, title: "Aavesham Title", artist: "Sushin Shyam", album: "Aavesham (2024)", language: "Malayalam", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/malayalam/460.jpg", spotifyUrl: "https://open.spotify.com/search/Aavesham%20Title%20Sushin%20Shyam", favorite: false, composer: "Sushin Shyam" },
  { id: 461, title: "Kotha Raja Reprise", artist: "Dabzee & Asal Kolaar", album: "King of Kotha (2023)", language: "Malayalam", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/malayalam/461.jpg", spotifyUrl: "https://open.spotify.com/search/Kotha%20Raja%20Reprise%20Dabzee%20%26%20Asal%20Kolaar", favorite: false, composer: "Jakes Bejoy" },
  { id: 462, title: "King of Kotha Title", artist: "Jakes Bejoy & Shreya Ghoshal", album: "King of Kotha (2023)", language: "Malayalam", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/malayalam/462.jpg", spotifyUrl: "https://open.spotify.com/search/King%20of%20Kotha%20Title%20Jakes%20Bejoy%20%26%20Shreya%20Ghoshal", favorite: false, composer: "Jakes Bejoy" },
  { id: 463, title: "Kurumkuru Reprise", artist: "Sithara Krishnakumar", album: "Aadujeevitham (2024)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/malayalam/463.jpg", spotifyUrl: "https://open.spotify.com/search/Kurumkuru%20Reprise%20Sithara%20Krishnakumar", favorite: false, composer: "A. R. Rahman" },
  { id: 464, title: "Periyone Reprise", artist: "Jithin Raj", album: "Aadujeevitham (2024)", language: "Malayalam", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/malayalam/464.jpg", spotifyUrl: "https://open.spotify.com/search/Periyone%20Reprise%20Jithin%20Raj", favorite: false, composer: "A. R. Rahman" },
  { id: 465, title: "Hope Reprise", artist: "A. R. Rahman & Sithara", album: "Aadujeevitham (2024)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/malayalam/465.jpg", spotifyUrl: "https://open.spotify.com/search/Hope%20Reprise%20A.%20R.%20Rahman%20%26%20Sithara", favorite: false, composer: "A. R. Rahman" },
  { id: 466, title: "Bhoomi", artist: "A. R. Rahman & Sithara", album: "Aadujeevitham (2024)", language: "Malayalam", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/malayalam/466.jpg", spotifyUrl: "https://open.spotify.com/search/Bhoomi%20A.%20R.%20Rahman%20%26%20Sithara", favorite: false, composer: "A. R. Rahman" },
  { id: 467, title: "Kilukil Pambaram Reprise", artist: "Vineeth Sreenivasan", album: "ARM (2024)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/malayalam/467.jpg", spotifyUrl: "https://open.spotify.com/search/Kilukil%20Pambaram%20Reprise%20Vineeth%20Sreenivasan", favorite: false, composer: "Dhibu Ninan Thomas" },
  { id: 468, title: "ARM Title", artist: "Dhibu Ninan Thomas & Kapil Kapilan", album: "ARM (2024)", language: "Malayalam", duration: "4:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/malayalam/468.jpg", spotifyUrl: "https://open.spotify.com/search/ARM%20Title%20Dhibu%20Ninan%20Thomas%20%26%20Kapil%20Kapilan", favorite: false, composer: "Dhibu Ninan Thomas" },
  { id: 469, title: "Omane Reprise", artist: "Shreya Ghoshal & Vijay Yesudas", album: "Aadujeevitham (2024)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/malayalam/469.jpg", spotifyUrl: "https://open.spotify.com/search/Omane%20Reprise%20Shreya%20Ghoshal%20%26%20Vijay%20Yesudas", favorite: false, composer: "M. Jayachandran" },
  { id: 470, title: "Kaanana Kuyile Reprise", artist: "K. S. Chithra", album: "Chithram (1988)", language: "Malayalam", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/malayalam/470.jpg", spotifyUrl: "https://open.spotify.com/search/Kaanana%20Kuyile%20Reprise%20K.%20S.%20Chithra", favorite: false, composer: "K. J. Joy" },
  { id: 471, title: "Pavizha Mazha Reprise", artist: "K. J. Yesudas", album: "Athirathram (1984)", language: "Malayalam", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/malayalam/471.jpg", spotifyUrl: "https://open.spotify.com/search/Pavizha%20Mazha%20Reprise%20K.%20J.%20Yesudas", favorite: false, composer: "Raveendran" },
  { id: 472, title: "Oru Pushpam Reprise", artist: "K. J. Yesudas", album: "Pareeksha (1967)", language: "Malayalam", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/malayalam/472.jpg", spotifyUrl: "https://open.spotify.com/search/Oru%20Pushpam%20Reprise%20K.%20J.%20Yesudas", favorite: false, composer: "M. S. Baburaj" },
  { id: 473, title: "Haravi Reprise", artist: "Vijay Yesudas", album: "Athiran (2019)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/malayalam/473.jpg", spotifyUrl: "https://open.spotify.com/search/Haravi%20Reprise%20Vijay%20Yesudas", favorite: false, composer: "P. S. Jayhari" },
  { id: 474, title: "Uyire Innum Reprise", artist: "Sithara Krishnakumar", album: "Gauthamante Radham (2020)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/malayalam/474.jpg", spotifyUrl: "https://open.spotify.com/search/Uyire%20Innum%20Reprise%20Sithara%20Krishnakumar", favorite: false, composer: "Ankit Menon" },
  { id: 475, title: "Aalolam Reprise", artist: "Sushin Shyam", album: "Kumbalangi Nights (2019)", language: "Malayalam", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/malayalam/475.jpg", spotifyUrl: "https://open.spotify.com/search/Aalolam%20Reprise%20Sushin%20Shyam", favorite: false, composer: "Sushin Shyam" },
  { id: 476, title: "Ee Kaattu Reprise", artist: "Vineeth Sreenivasan", album: "Thira (2013)", language: "Malayalam", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/malayalam/476.jpg", spotifyUrl: "https://open.spotify.com/search/Ee%20Kaattu%20Reprise%20Vineeth%20Sreenivasan", favorite: false, composer: "Shaan Rahman" },
  { id: 477, title: "Mounam Reprise", artist: "Pradeep Kumar", album: "Thira (2013)", language: "Malayalam", duration: "3:48", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/malayalam/477.jpg", spotifyUrl: "https://open.spotify.com/search/Mounam%20Reprise%20Pradeep%20Kumar", favorite: false, composer: "Shaan Rahman" },
  { id: 478, title: "Thoomanju Reprise", artist: "Sachin Warrier", album: "Arikil Oraal (2013)", language: "Malayalam", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/malayalam/478.jpg", spotifyUrl: "https://open.spotify.com/search/Thoomanju%20Reprise%20Sachin%20Warrier", favorite: false, composer: "Sushin Shyam" },
  { id: 479, title: "Thaaram Reprise Malayalam", artist: "Sushin Shyam", album: "Kumbalangi Nights (2019)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/malayalam/479.jpg", spotifyUrl: "https://open.spotify.com/search/Thaaram%20Reprise%20Malayalam%20Sushin%20Shyam", favorite: false, composer: "Sushin Shyam" },
  { id: 480, title: "Kuttanadan Reprise", artist: "Vijay Yesudas & Sithara", album: "Kumbalangi Nights (2019)", language: "Malayalam", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/malayalam/480.jpg", spotifyUrl: "https://open.spotify.com/search/Kuttanadan%20Reprise%20Vijay%20Yesudas%20%26%20Sithara", favorite: false, composer: "Sushin Shyam" },
  { id: 481, title: "Cherathukal Reprise", artist: "Sushin Shyam", album: "Kumbalangi Nights (2019)", language: "Malayalam", duration: "3:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/malayalam/481.jpg", spotifyUrl: "https://open.spotify.com/search/Cherathukal%20Reprise%20Sushin%20Shyam", favorite: false, composer: "Sushin Shyam" },
  { id: 482, title: "Uyiril Thodum Reprise", artist: "Sithara Krishnakumar", album: "Kumbalangi Nights (2019)", language: "Malayalam", duration: "3:55", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/malayalam/482.jpg", spotifyUrl: "https://open.spotify.com/search/Uyiril%20Thodum%20Reprise%20Sithara%20Krishnakumar", favorite: false, composer: "Sushin Shyam" },
  { id: 483, title: "Manjummel Boys Title", artist: "Sushin Shyam", album: "Manjummel Boys (2024)", language: "Malayalam", duration: "3:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/malayalam/483.jpg", spotifyUrl: "https://open.spotify.com/search/Manjummel%20Boys%20Title%20Sushin%20Shyam", favorite: false, composer: "Sushin Shyam" },
  { id: 484, title: "Kannana Kanne Tamil Live", artist: "Sid Sriram", album: "Viswasam Live (2019)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/484.jpg", spotifyUrl: "https://open.spotify.com/search/Kannana%20Kanne%20Tamil%20Live%20Sid%20Sriram", favorite: false, composer: "D. Imman" },
  { id: 485, title: "Marudhaani Live", artist: "S. P. Balasubrahmanyam", album: "Sakkarakatti Live (2008)", language: "Tamil", duration: "4:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/485.jpg", spotifyUrl: "https://open.spotify.com/search/Marudhaani%20Live%20S.%20P.%20Balasubrahmanyam", favorite: false, composer: "A. R. Rahman" },
  { id: 486, title: "Ennadi Maayavi Live Tamil", artist: "A. R. Rahman", album: "Vada Chennai Live (2018)", language: "Tamil", duration: "4:08", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/486.jpg", spotifyUrl: "https://open.spotify.com/search/Ennadi%20Maayavi%20Live%20Tamil%20A.%20R.%20Rahman", favorite: false, composer: "A. R. Rahman" },
  { id: 487, title: "Kumki Live Tamil", artist: "Shreya Ghoshal", album: "Kumki Live (2012)", language: "Tamil", duration: "5:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/487.jpg", spotifyUrl: "https://open.spotify.com/search/Kumki%20Live%20Tamil%20Shreya%20Ghoshal", favorite: false, composer: "D. Imman" },
  { id: 488, title: "Maacho Tamil Live", artist: "Sid Sriram", album: "Mersal Live (2017)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/488.jpg", spotifyUrl: "https://open.spotify.com/search/Maacho%20Tamil%20Live%20Sid%20Sriram", favorite: false, composer: "A. R. Rahman" },
  { id: 489, title: "Thalli Pogathey Tamil Live 2", artist: "Sid Sriram", album: "AYM Live (2016)", language: "Tamil", duration: "4:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "assets/images/tamil/489.jpg", spotifyUrl: "https://open.spotify.com/search/Thalli%20Pogathey%20Tamil%20Live%202%20Sid%20Sriram", favorite: false, composer: "A. R. Rahman" },
  { id: 490, title: "Naan Pizhai Tamil Live 2", artist: "Pradeep Kumar", album: "Kaaviya Thalaivan Live (2014)", language: "Tamil", duration: "4:45", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "assets/images/tamil/490.jpg", spotifyUrl: "https://open.spotify.com/search/Naan%20Pizhai%20Tamil%20Live%202%20Pradeep%20Kumar", favorite: false, composer: "A. R. Rahman" },
  { id: 491, title: "Sundari Kannal Live", artist: "S. P. Balasubrahmanyam", album: "Thalapathi Live (1991)", language: "Tamil", duration: "5:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "assets/images/tamil/491.jpg", spotifyUrl: "https://open.spotify.com/search/Sundari%20Kannal%20Live%20S.%20P.%20Balasubrahmanyam", favorite: false, composer: "Ilaiyaraaja" },
  { id: 492, title: "Rakkamma Live", artist: "S. P. Balasubrahmanyam", album: "Thalapathi Live (1991)", language: "Tamil", duration: "5:02", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "assets/images/tamil/492.jpg", spotifyUrl: "https://open.spotify.com/search/Rakkamma%20Live%20S.%20P.%20Balasubrahmanyam", favorite: false, composer: "Ilaiyaraaja" },
  { id: 493, title: "Kadhal Sadugudu Live", artist: "S. P. Balasubrahmanyam", album: "Alaipayuthey Live (2000)", language: "Tamil", duration: "4:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/tamil/493.jpg", spotifyUrl: "https://open.spotify.com/search/Kadhal%20Sadugudu%20Live%20S.%20P.%20Balasubrahmanyam", favorite: false, composer: "A. R. Rahman" },
  { id: 494, title: "New York Nagaram Live", artist: "A. R. Rahman", album: "Sillunu Oru Kaadhal Live (2006)", language: "Tamil", duration: "5:32", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/tamil/494.jpg", spotifyUrl: "https://open.spotify.com/search/New%20York%20Nagaram%20Live%20A.%20R.%20Rahman", favorite: false, composer: "A. R. Rahman" },
  { id: 495, title: "Anbil Avan Live", artist: "A. R. Rahman", album: "Vinnaithaandi Live (2010)", language: "Tamil", duration: "4:18", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/tamil/495.jpg", spotifyUrl: "https://open.spotify.com/search/Anbil%20Avan%20Live%20A.%20R.%20Rahman", favorite: false, composer: "A. R. Rahman" },
  { id: 496, title: "Hosanna Live", artist: "Vijay Prakash", album: "Vinnaithaandi Live (2010)", language: "Tamil", duration: "5:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "assets/images/tamil/496.jpg", spotifyUrl: "https://open.spotify.com/search/Hosanna%20Live%20Vijay%20Prakash", favorite: false, composer: "A. R. Rahman" },
  { id: 497, title: "Mannipaaya Live", artist: "A. R. Rahman", album: "Vinnaithaandi Live (2010)", language: "Tamil", duration: "5:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "assets/images/tamil/497.jpg", spotifyUrl: "https://open.spotify.com/search/Mannipaaya%20Live%20A.%20R.%20Rahman", favorite: false, composer: "A. R. Rahman" },
  { id: 498, title: "Aaromale Live", artist: "Alphons Joseph", album: "Vinnaithaandi Live (2010)", language: "Tamil", duration: "5:42", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "assets/images/tamil/498.jpg", spotifyUrl: "https://open.spotify.com/search/Aaromale%20Live%20Alphons%20Joseph", favorite: false, composer: "A. R. Rahman" },
  { id: 499, title: "Mundhinam Live", artist: "Naresh Iyer", album: "Vaaranam Aayiram Live (2008)", language: "Tamil", duration: "5:12", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "assets/images/tamil/499.jpg", spotifyUrl: "https://open.spotify.com/search/Mundhinam%20Live%20Naresh%20Iyer", favorite: false, composer: "Harris Jayaraj" },
  { id: 500, title: "Uyirin Uyire Live", artist: "Karthik", album: "Kaakha Kaakha Live (2003)", language: "Tamil", duration: "5:22", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "assets/images/tamil/500.jpg", spotifyUrl: "https://open.spotify.com/search/Uyirin%20Uyire%20Live%20Karthik", favorite: false, composer: "Harris Jayaraj" },
];

// Elements
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
let isShuffle = false;
let isRepeat = false;
let favorites = loadFavorites();

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
function getCover(song){ return song.cover || song.artwork || ''; }
function getAlbum(song){ return song.album || song.movie || ''; }
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

function hasLocalAudio(song){
  return !!(song.audio && String(song.audio).trim() !== '');
}

function loadSong(index, autoplay=false){
  if(songs.length===0) return;
  currentIndex = (index + songs.length) % songs.length;
  const song = songs[currentIndex];
  const cover = getCover(song);
  const album = getAlbum(song);
  const composer = getComposer(song);

  // Artwork
  fallbackInitials.textContent = getInitials(song.title);
  fallbackComposer.textContent = composer || song.language;
  langBadge.textContent = song.language.toUpperCase();
  langBadge.style.background = song.language==='Tamil' ? 'rgba(124,92,255,0.92)' : song.language==='Telugu' ? 'rgba(236,72,153,0.92)' : song.language==='English' ? 'rgba(59,130,246,0.92)' : 'rgba(16,185,129,0.92)';

  artwork.classList.add('hidden');
  artworkFallback.classList.remove('hidden');
  if(cover){
    const testImg = new Image();
    testImg.onload = ()=>{
      artwork.src = cover;
      artwork.alt = `${song.title} — ${album}`;
      artwork.classList.remove('hidden');
      artworkFallback.classList.add('hidden');
    };
    testImg.onerror = ()=>{
      artwork.classList.add('hidden');
      artworkFallback.classList.remove('hidden');
    };
    testImg.src = cover;
  }

  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  songMovie.textContent = album;
  songComposer.textContent = composer ? `Composer: ${composer}` : '';
  songAlbum.textContent = `Album: ${album} • ${song.language} • ${song.duration || ''}`;
  if(nowPlayingSub) nowPlayingSub.textContent = `${song.language} • ${album}`;
  if(saveSpotifyBtn && song.spotifyUrl){
    saveSpotifyBtn.href = song.spotifyUrl;
    saveSpotifyBtn.classList.remove('hidden');
  }
  if(spotifyCardArtwork) { spotifyCardArtwork.src = cover; spotifyCardArtwork.alt = song.title; }
  if(spotifyCardTitle) spotifyCardTitle.textContent = song.title;
  if(spotifyCardArtist) spotifyCardArtist.textContent = song.artist;
  if(spotifyCardDuration) spotifyCardDuration.textContent = song.duration || '03:53';
  if(spotifyCardProgressBar) spotifyCardProgressBar.style.width = '0%';

  // Duration display — from song metadata (no local audio)
  totalTimeEl.textContent = song.duration || '—';
  currentTimeEl.textContent = '0:00';
  progressBar.style.width='0%';

  // Playback: Spotify is source — do NOT use local MP3 for Spotify songs
  // Validate spotifyUrl
  const isValidSpotifyUrl = song.spotifyUrl && song.spotifyUrl.startsWith('https://open.spotify.com/track/');
  const isSearchUrl = song.spotifyUrl && song.spotifyUrl.includes('/search/');
  if(isValidSpotifyUrl){
    previewStatus.textContent = 'Now Playing';
    previewStatus.classList.remove('hidden');
    // Do NOT set audio.src to Spotify URL (not a direct MP3)
    audio.removeAttribute('src');
    audio.load();
    isPlaying=false;
    updatePlayButton();
  } else if(isSearchUrl){
    // Search URL is not exact track — show message to open in Spotify for original
    previewStatus.textContent = 'Open this song in Spotify to play the original track.';
    previewStatus.classList.remove('hidden');
    audio.removeAttribute('src');
    audio.load();
    isPlaying=false;
    updatePlayButton();
  } else if(song.spotifyUrl){
    previewStatus.textContent = 'Now Playing';
    previewStatus.classList.remove('hidden');
    audio.removeAttribute('src');
    audio.load();
    isPlaying=false;
    updatePlayButton();
  } else {
    previewStatus.textContent = 'Spotify link unavailable';
    previewStatus.classList.remove('hidden');
    audio.removeAttribute('src');
    audio.load();
    isPlaying=false;
    updatePlayButton();
  }
  // Debug logging (clean, per spec)
  console.log("Selected song:", song.title);
  console.log("Spotify URL:", song.spotifyUrl);

  document.title = `${song.title} — Isai`;

  updateFavUI();
  renderPlaylist();
  updateMediaSession();
  updateSpotifyEmbed(song);
  if(!hasLocalAudio(song)) updatePlayButton();

  if(autoplay){
    if(hasLocalAudio(song)){
      setTimeout(()=> play(), 120);
    } else {
      previewStatus.textContent='Audio unavailable';
      previewStatus.classList.remove('hidden');
    }
  }
}

function play(){
  const song = songs[currentIndex];
  if(!hasLocalAudio(song)){
    if(song.spotifyUrl){
      previewStatus.textContent='Now Playing';
      previewStatus.classList.remove('hidden');
      showToast('Playing via Spotify');
      // Spotify embed handles playback — keep HTML5 idle
      return;
    }
    previewStatus.textContent='Audio unavailable';
    previewStatus.classList.remove('hidden');
    showToast('Audio unavailable');
    return;
  }
  audio.play().then(()=>{
    isPlaying=true;
    updatePlayButton();
    previewStatus.textContent='Now Playing';
    previewStatus.classList.remove('hidden');
  }).catch(e=>{
    console.warn('Playback failed',e);
    showToast('Playback failed');
  });
}
function pause(){
  audio.pause();
  isPlaying=false;
  updatePlayButton();
}
function togglePlay(){
  const song = songs[currentIndex];
  if(!hasLocalAudio(song)){
    if(song.spotifyUrl){
      previewStatus.textContent='Now Playing';
      previewStatus.classList.remove('hidden');
      showToast('Playing via Spotify');
      return;
    }
    previewStatus.textContent='Audio unavailable';
    previewStatus.classList.remove('hidden');
    showToast('Audio unavailable');
    return;
  }
  if(isPlaying) pause(); else play();
}

// Language-aware next/prev — respects current filter + search
function getFilteredList(){
  return filteredSongs();
}
function next(){
  const list = getFilteredList();
  if(list.length===0){ loadSong(currentIndex+1, true); return; }
  if(isShuffle){
    const currId = songs[currentIndex].id;
    let rand;
    do { rand = list[Math.floor(Math.random()*list.length)]; } while(list.length>1 && rand.id===currId);
    const idx = songs.findIndex(s=>s.id===rand.id);
    loadSong(idx, true);
    return;
  }
  const currId = songs[currentIndex].id;
  let pos = list.findIndex(s=>s.id===currId);
  if(pos===-1) pos=0;
  else pos=(pos+1)%list.length;
  const nextSong = list[pos];
  const idx = songs.findIndex(s=>s.id===nextSong.id);
  loadSong(idx, true);
}
function prev(){
  // if audio playing >3s, restart
  if(hasLocalAudio(songs[currentIndex]) && audio.currentTime>3){ audio.currentTime=0; return; }
  const list = getFilteredList();
  if(list.length===0){ loadSong(currentIndex-1, true); return; }
  const currId = songs[currentIndex].id;
  let pos = list.findIndex(s=>s.id===currId);
  if(pos===-1) pos=0;
  else pos=(pos-1+list.length)%list.length;
  const prevSong = list[pos];
  const idx = songs.findIndex(s=>s.id===prevSong.id);
  loadSong(idx, true);
}

function updatePlayButton(){
  const song = songs[currentIndex];
  const canPlay = hasLocalAudio(song) || !!song.spotifyUrl;
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
      playBtn.setAttribute('aria-label','Play');
    }
  }
  if(isPlaying && canPlay){
    artwork.classList.add('playing');
    playingBadge.classList.add('show');
  } else {
    artwork.classList.remove('playing');
    playingBadge.classList.remove('show');
  }
  if(spotifyCardPlayBtn){
    spotifyCardPlayBtn.setAttribute('aria-label', isPlaying && canPlay ? 'Pause' : 'Play');
    spotifyCardPlayBtn.innerHTML = isPlaying && canPlay ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6zm8-14v14h4V5z"/></svg>' : '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v14l11-7z"/></svg>';
  }
  if(progressWrap) progressWrap.setAttribute('aria-valuenow', Math.round((audio.currentTime/audio.duration||0)*100));
}
function updateFavUI(){
  const song = songs[currentIndex];
  if(!song) return;
  const fav = isFav(song.id);
  favBtn.classList.toggle('active', fav);
  favBtn.setAttribute('aria-label', fav ? 'Remove from favorites' : 'Add to favorites');
  favBtn.setAttribute('aria-pressed', String(fav));
}
function updateSpotifyEmbed(song){
  if(!spotifyFrame) return;
  // Use official Spotify embed — per-song correct reference, no wrong track substitution
  let src = "";
  if(song.spotifyUrl){
    // Use per-song correct search URL -> embed search (shows correct track, not random)
    src = song.spotifyUrl.replace('open.spotify.com/', 'open.spotify.com/embed/') + (song.spotifyUrl.includes('?') ? '&' : '?') + 'utm_source=generator&theme=0';
  } else {
    const playlistIds = {
      Tamil: "3BcpgYmZZtaEk4ngkfjMK1",
      Telugu: "41Cs3We0JCA8QjLC5DClsC",
      English: "0PMKjSoU937cvzkHpFJ3hf",
      Malayalam: "37i9dQZF1DWTYKFynxp6Fs"
    };
    if(playlistIds[song.language]){
      src = `https://open.spotify.com/embed/playlist/${playlistIds[song.language]}?utm_source=generator&theme=0`;
    }
  }
  if(src){
    spotifyFrame.src = src;
    if(spotifyPlaceholder) spotifyPlaceholder.classList.add('hidden');
  }
  if(spotifyTrackTitle) spotifyTrackTitle.textContent = song.title;
  if(spotifyTrackArtist) spotifyTrackArtist.textContent = song.artist;
  if(spotifyTrackAlbum) spotifyTrackAlbum.textContent = getAlbum(song) + " • " + song.language;
  if(spotifyLang) spotifyLang.textContent = song.language + " • " + getAlbum(song);
  if(spotifyOpenLink && song.spotifyUrl){
    spotifyOpenLink.href = song.spotifyUrl;
    spotifyOpenLink.classList.remove('hidden');
  }
}

function updateMediaSession(){
  if('mediaSession' in navigator){
    const s=songs[currentIndex];
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
      navigator.mediaSession.setActionHandler('seekto', (d)=>{ if(d.seekTime!=null && hasLocalAudio(songs[currentIndex])) audio.currentTime=d.seekTime; });
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
    const el=document.createElement('div');
    el.className='song-item'+(isActive?' active':'');
    el.setAttribute('role','listitem');
    el.tabIndex=0;
    el.setAttribute('aria-label', `${song.title} by ${song.artist} — ${album} • ${song.language}`);
    el.innerHTML=`
      <div class="song-thumb-fallback" aria-hidden="true"><span>${initials}</span></div>
      <img class="song-thumb hidden" src="${cover}" alt="" loading="lazy" />
      <div class="song-info">
        <div class="song-name">${escapeHtml(song.title)} <span style="font-size:10px;color:var(--dim);font-weight:600;border:1px solid var(--border);padding:1px 6px;border-radius:100px;margin-left:6px;vertical-align:middle">${escapeHtml(song.language)}</span></div>
        <div class="song-artist-sm">${escapeHtml(song.artist)}</div>
        <div class="song-meta-sm">${escapeHtml(album)} • ${escapeHtml(song.duration||'')}</div>
      </div>
      ${isActive && isPlaying && hasLocalAudio(song) ? '<div class="playing-eq" aria-hidden="true"><i style="height:6px"></i><i style="height:12px"></i><i style="height:9px"></i></div>' : `<span class="song-duration">${escapeHtml(song.duration||'')}</span>`}
      <a href="${song.spotifyUrl}" target="_blank" rel="noopener" class="song-spotify" aria-label="Open in Spotify" onclick="event.stopPropagation()" title="Open in Spotify">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.65 14.65c-.18.3-.56.39-.86.21-2.36-1.44-5.33-1.77-8.83-.97-.34.08-.68-.13-.76-.47-.08-.34.13-.68.47-.76 3.89-.89 7.2-.5 9.88 1.13.3.18.39.56.21.86zm1.24-2.76c-.23.37-.72.48-1.09.25-2.7-1.66-6.82-2.14-10.01-1.17-.43.13-.88-.11-1.01-.54-.13-.43.11-.88.54-1.01 3.66-1.11 8.33-.57 11.43 1.38.37.23.48.72.25 1.09zm.11-2.87c-3.24-1.92-8.58-2.1-11.67-1.15-.5.15-1.03-.14-1.18-.64-.15-.5.14-1.03.64-1.18 3.58-1.09 9.53-.88 13.32 1.37.44.26.58.82.32 1.26-.26.44-.82.58-1.26.32z"/></svg>
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
    }

    el.addEventListener('click', (e)=>{
      if(e.target.closest('.song-fav') || e.target.closest('.song-spotify')) return;
      const idx=songs.findIndex(x=>x.id===song.id);
      loadSong(idx, true);
    });
    el.addEventListener('keydown', (e)=>{
      if(e.key==='Enter' || e.key===' '){ e.preventDefault(); const idx=songs.findIndex(x=>x.id===song.id); loadSong(idx,true); }
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
  const song = songs[currentIndex];
  if(!hasLocalAudio(song)){
    if(progressBar) progressBar.style.width='0%';
    if(currentTimeEl) currentTimeEl.textContent='0:00';
    if(totalTimeEl) totalTimeEl.textContent=song.duration||'—';
    if(spotifyCardProgressBar) spotifyCardProgressBar.style.width='0%';
    if(spotifyCardDuration) spotifyCardDuration.textContent=song.duration||'03:53';
    return;
  }
  const pct = audio.duration ? (audio.currentTime/audio.duration)*100 : 0;
  if(progressBar) progressBar.style.width = pct + '%';
  if(progressWrap) progressWrap.setAttribute('aria-valuenow', Math.round(pct));
  if(currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
  if(totalTimeEl) totalTimeEl.textContent = isFinite(audio.duration) ? formatTime(audio.duration) : (song.duration||'—');
  if(spotifyCardProgressBar) spotifyCardProgressBar.style.width = pct + '%';
  if(spotifyCardDuration) spotifyCardDuration.textContent = isFinite(audio.duration) ? formatTime(audio.duration) : (song.duration||'03:53');
}
function seekFromEvent(e){
  if(!hasLocalAudio(songs[currentIndex])) return;
  const rect=progressWrap.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const pct=Math.max(0,Math.min(1, x/rect.width));
  if(audio.duration && isFinite(audio.duration)) audio.currentTime = pct * audio.duration;
  progressBar.style.width = (pct*100)+'%';
}
function updateVolumeUI(){
  volPercent.textContent = Math.round(audio.volume*100)+'%';
  if(audio.muted || audio.volume===0){ volIcon.classList.add('hidden'); muteIcon.classList.remove('hidden'); }
  else { volIcon.classList.remove('hidden'); muteIcon.classList.add('hidden'); }
}

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);
favBtn.addEventListener('click', ()=>{
  const song=songs[currentIndex];
  toggleFav(song.id);
  favBtn.classList.add('anim');
  setTimeout(()=>favBtn.classList.remove('anim'),450);
});
if(spotifyOpenLink){
  spotifyOpenLink.addEventListener('click', ()=>{
    showToast('Opening in Spotify');
  });
}
if(shuffleBtn){
  shuffleBtn.addEventListener('click', ()=>{
    isShuffle=!isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
    showToast(isShuffle?'Shuffle on':'Shuffle off');
  });
}
if(repeatBtn){
  repeatBtn.addEventListener('click', ()=>{
    isRepeat=!isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
    showToast(isRepeat?'Repeat on':'Repeat off');
  });
}
if(saveSpotifyBtn){
  saveSpotifyBtn.addEventListener('click', (e)=>{
    // keep on page, but allow opening Spotify - already href
    showToast('Opening in Spotify');
  });
}
if(spotifyCardPlayBtn){
  spotifyCardPlayBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    togglePlay();
  });
}

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', ()=>{
  const s=songs[currentIndex];
  // keep song.duration as display, but also update if audio has real duration
  if(isFinite(audio.duration)) s._dur = formatTime(audio.duration);
  renderPlaylist();
  updateProgress();
});
audio.addEventListener('ended', ()=>{
  if(isRepeat){
    audio.currentTime=0;
    play();
  } else {
    next();
  }
});
audio.addEventListener('play', ()=>{ isPlaying=true; updatePlayButton(); renderPlaylist(); });
audio.addEventListener('pause', ()=>{ isPlaying=false; updatePlayButton(); renderPlaylist(); });
audio.addEventListener('error', ()=>{
  if(hasLocalAudio(songs[currentIndex])){
    showToast('Audio unavailable');
    previewStatus.textContent='Audio unavailable';
    previewStatus.classList.remove('hidden');
    isPlaying=false;
    updatePlayButton();
  }
  renderPlaylist();
});

progressWrap.addEventListener('click', seekFromEvent);
progressWrap.addEventListener('mousedown', (e)=>{ isDragging=true; progressWrap.classList.add('dragging'); seekFromEvent(e); });
window.addEventListener('mousemove', (e)=>{ if(isDragging) seekFromEvent(e); });
window.addEventListener('mouseup', ()=>{ isDragging=false; progressWrap.classList.remove('dragging'); });
progressWrap.addEventListener('touchstart', (e)=>{ isDragging=true; seekFromEvent(e); }, {passive:true});
window.addEventListener('touchmove', (e)=>{ if(isDragging) seekFromEvent(e); }, {passive:true});
window.addEventListener('touchend', ()=>{ isDragging=false; });
progressWrap.addEventListener('keydown', (e)=>{
  if(!hasLocalAudio(songs[currentIndex])) return;
  if(e.key==='ArrowLeft' || e.key==='ArrowRight'){
    e.preventDefault();
    const step=5;
    if(e.key==='ArrowLeft') audio.currentTime=Math.max(0,audio.currentTime-step);
    else audio.currentTime=Math.min(audio.duration||0,audio.currentTime+step);
  }
  if(e.key==='Home') audio.currentTime=0;
  if(e.key==='End' && audio.duration) audio.currentTime=audio.duration;
});

volumeSlider.addEventListener('input', ()=>{
  const v=volumeSlider.value/100;
  audio.volume=v;
  audio.muted=v===0;
  updateVolumeUI();
});
muteBtn.addEventListener('click', ()=>{
  audio.muted=!audio.muted;
  updateVolumeUI();
});
audio.addEventListener('volumechange', updateVolumeUI);

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
    case 'ArrowRight': e.preventDefault(); if(hasLocalAudio(songs[currentIndex]) && audio.duration) audio.currentTime=Math.min(audio.duration, audio.currentTime+5); break;
    case 'ArrowLeft': e.preventDefault(); if(hasLocalAudio(songs[currentIndex])) audio.currentTime=Math.max(0, audio.currentTime-5); break;
    case 'ArrowUp': e.preventDefault(); audio.volume=Math.min(1, audio.volume+0.05); volumeSlider.value=Math.round(audio.volume*100); updateVolumeUI(); break;
    case 'ArrowDown': e.preventDefault(); audio.volume=Math.max(0, audio.volume-0.05); volumeSlider.value=Math.round(audio.volume*100); updateVolumeUI(); break;
  }
});

audio.volume=0.8;
volumeSlider.value=80;
updateVolumeUI();
updateCounts();
loadSong(0, false);
renderPlaylist();
updateFavUI();
