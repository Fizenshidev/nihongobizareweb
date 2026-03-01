// ============== NAVIGATION ============== 
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link:not(.logout-btn)');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Update active link (only for non-auth links)
        if (!link.closest('.auth-menu') && !link.closest('.no-auth-menu')) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ============== PRACTICE MODAL ============== 
const modal = document.getElementById('practiceModal');
const closeBtn = document.querySelector('.close');
const practiceArea = document.getElementById('practiceArea');
const practiceTitle = document.getElementById('practiceTitle');

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Practice content
// Hiragana and Katakana datasets (46 basic each) and quiz logic
const HIRAGANA = [
    ['あ','a'],['い','i'],['う','u'],['え','e'],['お','o'],
    ['か','ka'],['き','ki'],['く','ku'],['け','ke'],['こ','ko'],
    ['さ','sa'],['し','shi'],['す','su'],['せ','se'],['そ','so'],
    ['た','ta'],['ち','chi'],['つ','tsu'],['て','te'],['と','to'],
    ['な','na'],['に','ni'],['ぬ','nu'],['ね','ne'],['の','no'],
    ['は','ha'],['ひ','hi'],['ふ','fu'],['へ','he'],['ほ','ho'],
    ['ま','ma'],['み','mi'],['む','mu'],['め','me'],['も','mo'],
    ['や','ya'],['ゆ','yu'],['よ','yo'],
    ['ら','ra'],['り','ri'],['る','ru'],['れ','re'],['ろ','ro'],
    ['わ','wa'],['を','wo'],['ん','n']
];

const KATAKANA = [
    ['ア','a'],['イ','i'],['ウ','u'],['エ','e'],['オ','o'],
    ['カ','ka'],['キ','ki'],['ク','ku'],['ケ','ke'],['コ','ko'],
    ['サ','sa'],['シ','shi'],['ス','su'],['セ','se'],['ソ','so'],
    ['タ','ta'],['チ','chi'],['ツ','tsu'],['テ','te'],['ト','to'],
    ['ナ','na'],['ニ','ni'],['ヌ','nu'],['ネ','ne'],['ノ','no'],
    ['ハ','ha'],['ヒ','hi'],['フ','fu'],['ヘ','he'],['ホ','ho'],
    ['マ','ma'],['ミ','mi'],['ム','mu'],['メ','me'],['モ','mo'],
    ['ヤ','ya'],['ユ','yu'],['ヨ','yo'],
    ['ラ','ra'],['リ','ri'],['ル','ru'],['レ','re'],['ロ','ro'],
    ['ワ','wa'],['ヲ','wo'],['ン','n']
];

function shuffle(array) {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function startKanaQuiz(type) {
    const data = type === 'hiragana' ? HIRAGANA : KATAKANA;
    const items = shuffle(data).slice(0, data.length); // all 46 in random order
    let index = 0;
    let score = 0;

    practiceTitle.textContent = type === 'hiragana' ? '🔤 Latihan Hiragana — Tebak ke Romaji' : '🔤 Latihan Katakana — Tebak ke Romaji';

    function render() {
        const [kana, romaji] = items[index];
        practiceArea.innerHTML = `
            <div class="kana-quiz">
                <p style="color:var(--text-light); margin-bottom:0.5rem;">Pertanyaan ${index+1} dari ${items.length}</p>
                <div style="font-size:4rem; text-align:center; margin:1rem 0;">${kana}</div>
                <div style="display:flex; gap:0.5rem; justify-content:center; align-items:center;">
                    <input id="answerInput" type="text" placeholder="Tulis romaji..." style="padding:0.6rem 0.8rem; width:60%; border:1px solid var(--border-color); border-radius:6px; font-size:1rem; text-align:center;" />
                    <button id="submitAnswer" class="btn btn-primary">Cek</button>
                </div>
                <div id="feedback" style="text-align:center; margin-top:1rem; color:var(--text-light);"></div>
            </div>
        `;

        const input = document.getElementById('answerInput');
        const submit = document.getElementById('submitAnswer');
        const feedback = document.getElementById('feedback');
        input.focus();

        function checkAnswer() {
            const val = input.value.trim().toLowerCase();
            if (!val) return;
            if (val === romaji) {
                score += 5; // 5 points per correct
                feedback.textContent = 'Benar! ✅ (+5)';
                feedback.style.color = '#2ecc71';
            } else {
                feedback.textContent = `Salah — jawaban: ${romaji}`;
                feedback.style.color = '#e74c3c';
            }
            submit.disabled = true;
            setTimeout(() => {
                index++;
                if (index < items.length) {
                    render();
                } else {
                    practiceArea.innerHTML = `
                        <div style="text-align:center; padding:1rem;">
                            <h3 style="color:var(--primary-color);">Selesai!</h3>
                            <p style="font-size:1.1rem; color:var(--text-light);">Skor Anda: <strong>${score} / ${items.length * 5}</strong></p>
                            <button id="closeQuiz" class="btn btn-primary">Tutup</button>
                        </div>
                    `;
                    document.getElementById('closeQuiz').addEventListener('click', () => modal.style.display = 'none');
                }
            }, 900);
        }

        submit.addEventListener('click', checkAnswer);
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkAnswer(); });
    }

    render();
    modal.style.display = 'block';
}

// End kana quiz logic

// --- multi-choice quiz helper and data ---
function startMultiChoiceQuiz(title, questions) {
    let index = 0;
    let score = 0;
    practiceTitle.textContent = title;

    function renderQuestion() {
        const q = questions[index];
        practiceArea.innerHTML = `
            <div class="multiple-choice">
                <p style="margin-bottom:1.5rem; color:var(--text-light);"><strong>Pertanyaan ${index+1} dari ${questions.length}:</strong> ${q.question}</p>
                <div style="margin-bottom:2rem;">
                    ${q.choices.map((c,i) =>
                        `<label style="display:block; margin-bottom:0.8rem;"><input type=\"radio\" name=\"ans\" value=\"${i}\" style=\"margin-right:0.5rem;\">${c}</label>`
                    ).join('')}
                </div>
                <button id="nextBtn" class="btn btn-primary">${index+1 === questions.length ? 'Selesaikan' : 'Lanjutkan'}</button>
            </div>
        `;
        const nextBtn = document.getElementById('nextBtn');
        nextBtn.addEventListener('click', () => {
            const chosen = document.querySelector('input[name="ans"]:checked');
            if (!chosen) return;
            if (parseInt(chosen.value,10) === q.answer) score += 5;
            index++;
            if (index < questions.length) {
                renderQuestion();
            } else {
                practiceArea.innerHTML = `
                    <div style="text-align:center; padding:1rem;">
                        <h3 style="color:var(--primary-color);">Selesai!</h3>
                        <p style="font-size:1.1rem; color:var(--text-light);">Skor Anda: <strong>${score} / ${questions.length * 5}</strong></p>
                        <button id="closeQuiz" class="btn btn-primary">Tutup</button>
                    </div>
                `;
                document.getElementById('closeQuiz').addEventListener('click', () => modal.style.display = 'none');
                // increment practice count for profile stats
                try { incrementPracticeCount(); } catch(e) { console.warn(e); }
            }
        });
    }
    renderQuestion();
    modal.style.display = 'block';
}

// Update profile stats helper to increment practicesCompleted
function incrementPracticeCount() {
    try {
        const profile = getUserProfile() || {};
        profile.practicesCompleted = (profile.practicesCompleted || 0) + 1;
        saveUserProfile(profile);
    } catch (e) {
        console.warn('Could not update profile stats', e);
    }
}

// VOCAB POOL — Japanese word and Indonesian meaning
const VOCAB_POOL = [
    {jp: 'りんご', id: 'apel'},
    {jp: 'みず', id: 'air'},
    {jp: 'ねこ', id: 'kucing'},
    {jp: 'いぬ', id: 'anjing'},
    {jp: 'たべる', id: 'makan'},
    {jp: 'のむ', id: 'minum'},
    {jp: 'みる', id: 'melihat'},
    {jp: 'いく', id: 'pergi'},
    {jp: 'くる', id: 'datang'},
    {jp: 'はなす', id: 'berbicara'},
    {jp: 'よむ', id: 'membaca'},
    {jp: 'かく', id: 'menulis'},
    {jp: 'ねる', id: 'tidur'},
    {jp: 'おきる', id: 'bangun'},
    {jp: 'はしる', id: 'lari'},
    {jp: 'あるく', id: 'jalan'},
    {jp: 'くるま', id: 'mobil'},
    {jp: 'じてんしゃ', id: 'sepeda'},
    {jp: 'でんしゃ', id: 'kereta'},
    {jp: 'バス', id: 'bus'},
    {jp: 'まち', id: 'kota'},
    {jp: 'いえ', id: 'rumah'},
    {jp: 'がっこう', id: 'sekolah'},
    {jp: 'せんせい', id: 'guru'},
    {jp: 'がくせい', id: 'mahasiswa'},
    {jp: 'ともだち', id: 'teman'},
    {jp: 'せかい', id: 'dunia'},
    {jp: 'てんき', id: 'cuaca'},
    {jp: 'あめ', id: 'hujan'},
    {jp: 'ゆき', id: 'salju'},
    {jp: 'くもり', id: 'mendung'},
    {jp: 'きょう', id: 'hari ini'},
    {jp: 'あした', id: 'besok'},
    {jp: 'きのう', id: 'kemarin'},
    {jp: 'ほん', id: 'buku'},
    {jp: 'ざっし', id: 'majalah'},
    {jp: 'でんわ', id: 'telepon'},
    {jp: 'てがみ', id: 'surat'},
    {jp: 'おかね', id: 'uang'},
    {jp: 'しごと', id: 'pekerjaan'},
    {jp: 'やすみ', id: 'libur'},
    {jp: 'にく', id: 'daging'},
    {jp: 'さかな', id: 'ikan'},
    {jp: 'たまご', id: 'telur'},
    {jp: 'やさい', id: 'sayuran'},
    {jp: 'くだもの', id: 'buah'},
    {jp: 'みせ', id: 'toko'},
    {jp: 'しろ', id: 'putih'},
    {jp: 'くろ', id: 'hitam'}
];

function startVocabQuiz() {
    const pool = VOCAB_POOL.slice();
    if (pool.length === 0) return;

    const count = Math.min(pool.length, Math.floor(Math.random() * (20 - 10 + 1)) + 10); // 10-20
    const items = shuffle(pool).slice(0, count);

    // Build questions with 4 choices (1 correct + 3 random wrong meanings)
    const questions = items.map(item => {
        const others = shuffle(pool.filter(p => p.jp !== item.jp)).slice(0, 3).map(o => o.id);
        const choices = shuffle([item.id, ...others]);
        const answer = choices.indexOf(item.id);
        return {
            question: `Apa arti dari "${item.jp}"?`,
            choices: choices,
            answer: answer
        };
    });

    // Start the multi-choice quiz (this will also update modal visibility)
    startMultiChoiceQuiz('📚 Kosakata Quiz', questions);
}

const vocabQuestions = [
    {question:'Apa arti dari りんご?', choices:['Jeruk','Apel','Mangga','Pisang'], answer:1},
    {question:'Apa arti dari ねこ?', choices:['Anjing','Kucing','Burung','Ikan'], answer:1},
    {question:'Apa arti dari たべる?', choices:['Minum','Melihat','Makan','Berbicara'], answer:2},
    {question:'Bagaimana membaca みず?', choices:['Mizu','Mito','Mizu','Misu'], answer:0},
    {question:'Apa arti dari つくえ?', choices:['Meja','Kursi','Pintu','Jendela'], answer:0},
    {question:'Bagaimana membaca でんしゃ?', choices:['Densha','Densu','Densya','Densya'], answer:0},
    {question:'Apa arti dari ほん?', choices:['Buku','Kalung','Kunci','Motor'], answer:0},
    {question:'Apa arti dari くるま?', choices:['Bus','Mobil','Sepeda','Pesawat'], answer:1},
    {question:'Bagaimana membaca みせ?', choices:['Mise','Misa','Misu','Mesi'], answer:0},
    {question:'Apa arti dari えいが?', choices:['Film','Acara','Lagu','Buku'], answer:0}
];

const grammarQuestions = [
    {question:'Partikel mana yang digunakan untuk menunjukkan objek langsung?', choices:['に','を','が','は'], answer:1},
    {question:'Bagaimana menyatakan "Saya akan makan"?', choices:['食べる','食べます','食べました','食べません'], answer:1},
    {question:'Pilihan mana yang bukan bentuk negatif sopan?', choices:['行きません','見ません','あります','来ません'], answer:2},
    {question:'Apa urutan umum tata bahasa Jepang?', choices:['SOV','SVO','VSO','OSV'], answer:0},
    {question:'Partikel mana yang menandakan tempat aksi?', choices:['で','に','へ','と'], answer:0}
];

// generated kanji lists (111 and 300 entries)
const KANJI_N5 = Array.from({length:111},(_,i)=>String.fromCharCode(0x4E00+i));
const KANJI_N4 = Array.from({length:300},(_,i)=>String.fromCharCode(0x4E00+111+i));

/* Small readings map for common kanji (hiragana + romaji) - extend as needed */
const KANJI_READINGS = {
    '日': {hiragana: 'にち', romaji: 'nichi'},
    '一': {hiragana: 'いち', romaji: 'ichi'},
    '国': {hiragana: 'くに', romaji: 'kuni'},
    '人': {hiragana: 'ひと', romaji: 'hito'},
    '年': {hiragana: 'ねん', romaji: 'nen'},
    '大': {hiragana: 'だい', romaji: 'dai'},
    '十': {hiragana: 'じゅう', romaji: 'juu'},
    '二': {hiragana: 'に', romaji: 'ni'},
    '本': {hiragana: 'ほん', romaji: 'hon'},
    '中': {hiragana: 'なか', romaji: 'naka'},
    '長': {hiragana: 'ちょう', romaji: 'cho'},
    '出': {hiragana: 'でる', romaji: 'deru'},
    '三': {hiragana: 'さん', romaji: 'san'},
    '見': {hiragana: 'みる', romaji: 'miru'},
    '月': {hiragana: 'つき', romaji: 'tsuki'},
    '分': {hiragana: 'ふん', romaji: 'fun'},
    '前': {hiragana: 'まえ', romaji: 'mae'},
    '生': {hiragana: 'せい', romaji: 'sei'},
    '五': {hiragana: 'ご', romaji: 'go'},
    '間': {hiragana: 'あいだ', romaji: 'aida'},
    '上': {hiragana: 'うえ', romaji: 'ue'},
    '東': {hiragana: 'ひがし', romaji: 'higashi'},
    '四': {hiragana: 'よん', romaji: 'yon'},
    '今': {hiragana: 'いま', romaji: 'ima'},
    '金': {hiragana: 'きん', romaji: 'kin'},
    '九': {hiragana: 'きゅう', romaji: 'kyuu'},
    '入': {hiragana: 'いり', romaji: 'iri'},
    '学': {hiragana: 'がく', romaji: 'gaku'},
    '高': {hiragana: 'たか', romaji: 'taka'},
    '円': {hiragana: 'えん', romaji: 'en'},
    '子': {hiragana: 'こ', romaji: 'ko'},
    '外': {hiragana: 'そと', romaji: 'soto'},
    '八': {hiragana: 'はち', romaji: 'hachi'},
    '六': {hiragana: 'ろく', romaji: 'roku'},
    '下': {hiragana: 'した', romaji: 'shita'},
    '来': {hiragana: 'くる', romaji: 'kuru'},
    '気': {hiragana: 'き', romaji: 'ki'},
    '小': {hiragana: 'ちいさい', romaji: 'chiisai'},
    '七': {hiragana: 'なな', romaji: 'nana'},
    '山': {hiragana: 'やま', romaji: 'yama'},
    '話': {hiragana: 'はなす', romaji: 'hanasu'},
    '女': {hiragana: 'おんな', romaji: 'onna'},
    '北': {hiragana: 'きた', romaji: 'kita'},
    '午': {hiragana: 'ご', romaji: 'go'},
    '百': {hiragana: 'ひゃく', romaji: 'hyaku'},
    '書': {hiragana: 'かく', romaji: 'kaku'},
    '先': {hiragana: 'さき', romaji: 'saki'},
    '名': {hiragana: 'な', romaji: 'na'},
    '川': {hiragana: 'かわ', romaji: 'kawa'},
    '千': {hiragana: 'せん', romaji: 'sen'},
    '水': {hiragana: 'みず', romaji: 'mizu'},
    '半': {hiragana: 'はん', romaji: 'han'},
    '男': {hiragana: 'おとこ', romaji: 'otoko'},
    '外': {hiragana: 'そと', romaji: 'soto'},
    '電': {hiragana: 'でん', romaji: 'den'}
};

function startKanjiQuiz(list) {
    const items = shuffle(list).slice(0, list.length);
    let index=0, score=0;
    practiceTitle.textContent = `🈶 Latihan Kanji (${list===KANJI_N5? 'N5':'N4'})`;
    function render() {
        const char = items[index];
        const reading = KANJI_READINGS[char];
        const promptHint = reading ? 'Tulis romaji atau hiragana dari kanji ini' : 'Tulis karakter yang sama atau bacaannya (fallback)';

        practiceArea.innerHTML = `
            <div class="kana-quiz">
                <p style="color:var(--text-light); margin-bottom:0.5rem;">Pertanyaan ${index+1} dari ${items.length}</p>
                <div class="kanji-handwritten">${char}</div>
                <div style="text-align:center; color:var(--text-light); margin-bottom:0.5rem;">${promptHint}</div>
                <div style="display:flex; gap:0.5rem; justify-content:center; align-items:center;">
                    <input id="answerInput" type="text" placeholder="Tulis romaji atau hiragana..." style="padding:0.6rem 0.8rem; width:60%; border:1px solid var(--border-color); border-radius:6px; font-size:1rem; text-align:center;" />
                    <button id="submitAnswer" class="btn btn-primary">Cek</button>
                </div>
                <div id="feedback" style="text-align:center; margin-top:1rem; color:var(--text-light);"></div>
            </div>
        `;
        const input = document.getElementById('answerInput');
        const submit = document.getElementById('submitAnswer');
        const feedback = document.getElementById('feedback');
        input.focus();
        function check() {
            const val=input.value.trim().toLowerCase();
            let correct = false;
            if (reading) {
                const romaji = (reading.romaji || '').toLowerCase();
                const hira = (reading.hiragana || '').toLowerCase();
                if (val === romaji || val === hira) correct = true;
            } else {
                // fallback: accept exact kanji match
                if (val === char) correct = true;
            }

            if(correct){score+=5;feedback.textContent='Benar! ✅';feedback.style.color='#2ecc71';}
            else {
                const correctMsg = reading ? `${reading.hiragana} (${reading.romaji})` : char;
                feedback.textContent=`Salah — jawaban: ${correctMsg}`;
                feedback.style.color='#e74c3c';
            }
            submit.disabled=true;
            setTimeout(()=>{
                index++;
                if(index<items.length){render();}
                else{
                    practiceArea.innerHTML=`<div style="text-align:center; padding:1rem;"><h3 style="color:var(--primary-color);">Selesai!</h3><p style="font-size:1.1rem; color:var(--text-light);">Skor Anda: <strong>${score} / ${items.length*5}</strong></p><button id="closeQuiz" class="btn btn-primary">Tutup</button></div>`;
                    document.getElementById('closeQuiz').addEventListener('click',()=>modal.style.display='none');
                    try { incrementPracticeCount(); } catch(e) { console.warn(e); }
                }
            },900);
        }
        submit.addEventListener('click',check);
        input.addEventListener('keydown',e=>{if(e.key==='Enter')check();});
    }
    render();modal.style.display='block';
}

const practiceContent = {
    vocab: {
        title: '📚 Kosakata Quiz',
        html: `
            <div class="practice-content">
                <p style="margin-bottom: 1.5rem; color: #5a7577;"><strong>Pertanyaan 1 dari 5:</strong> Apa arti dari "りんご"?</p>
                <div style="margin-bottom: 2rem;">
                    <label style="display: block; margin-bottom: 0.8rem;">
                        <input type="radio" name="q1" style="margin-right: 0.5rem;"> Jeruk
                    </label>
                    <label style="display: block; margin-bottom: 0.8rem;">
                        <input type="radio" name="q1" style="margin-right: 0.5rem;"> Apel
                    </label>
                    <label style="display: block; margin-bottom: 0.8rem;">
                        <input type="radio" name="q1" style="margin-right: 0.5rem;"> Mangga
                    </label>
                    <label style="display: block;">
                        <input type="radio" name="q1" style="margin-right: 0.5rem;"> Pisang
                    </label>
                </div>
                <button style="background-color: #4a7c7e; color: white; padding: 0.7rem 1.5rem; border: none; border-radius: 5px; cursor: pointer; font-weight: 600;">Lanjut ke Pertanyaan Berikutnya</button>
            </div>
        `
    },
    grammar: {
        title: '✍️ Tata Bahasa Quiz',
        html: `
            <div class="practice-content">
                <p style="margin-bottom: 1.5rem; color: #5a7577;"><strong>Pertanyaan 1 dari 3:</strong> Partikel mana yang digunakan untuk menunjukkan objek langsung?</p>
                <div style="margin-bottom: 2rem;">
                    <label style="display: block; margin-bottom: 0.8rem;">
                        <input type="radio" name="q1" style="margin-right: 0.5rem;"> に (ni) - lokasi
                    </label>
                    <label style="display: block; margin-bottom: 0.8rem;">
                        <input type="radio" name="q1" style="margin-right: 0.5rem;"> を (wo) - objek
                    </label>
                    <label style="display: block; margin-bottom: 0.8rem;">
                        <input type="radio" name="q1" style="margin-right: 0.5rem;"> が (ga) - subjek
                    </label>
                    <label style="display: block;">
                        <input type="radio" name="q1" style="margin-right: 0.5rem;"> は (wa) - topik
                    </label>
                </div>
                <button style="background-color: #4a7c7e; color: white; padding: 0.7rem 1.5rem; border: none; border-radius: 5px; cursor: pointer; font-weight: 600;">Lanjut ke Pertanyaan Berikutnya</button>
            </div>
        `
    }
};

// Start practice function
function startPractice(type) {
    if (type === 'hiragana' || type === 'katakana') {
        startKanaQuiz(type);
        return;
    }
    if (type === 'vocab') {
        startVocabQuiz();
        return;
    }
    if (type === 'grammar') {
        startMultiChoiceQuiz('✍️ Tata Bahasa Quiz', grammarQuestions);
        return;
    }
    if (type === 'kanjiN5') {
        startKanjiQuiz(KANJI_N5);
        return;
    }
    if (type === 'kanjiN4') {
        startKanjiQuiz(KANJI_N4);
        return;
    }
    const content = practiceContent[type];
    if (content) {
        practiceTitle.textContent = content.title;
        practiceArea.innerHTML = content.html;
        modal.style.display = 'block';
    }
}

// ============== SMOOTH SCROLL & ANIMATIONS ============== 
// Add fade-in animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Intersection Observer for animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe article cards
document.querySelectorAll('.article-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
});

// Observe practice cards
document.querySelectorAll('.practice-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
});

// ============== INTERACTIVE FEEDBACK ============== 
// Add click feedback to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============== UTILITY FUNCTIONS ============== 
// Function to show success message
function showSuccess(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4a7c7e;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations if not already in stylesheet
if (!document.querySelector('style[data-animations]')) {
    const style = document.createElement('style');
    style.setAttribute('data-animations', 'true');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Console message
console.log('%cNihongo Bizzare', 'color: #4a7c7e; font-size: 20px; font-weight: bold;');
console.log('%cSelamat datang di platform belajar bahasa Jepang terbaik! 🎌', 'color: #5a7577; font-size: 14px;');

// Theme handling is centralized in auth.js. profile.js updates and localStorage
// is used to persist the user's theme preference. No duplicate logic here.
