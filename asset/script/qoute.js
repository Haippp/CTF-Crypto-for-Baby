let currentIndex = 0
const qoute = document.getElementById('qoute')

const qoutes = [
    [
        "Kriptografi adalah seni menciptakan kepercayaan di dunia yang penuh ancaman",
        "Dan Boneh"
    ],
    [
        "Matematika adalah fondasi utama kriptografi.",
        "Ron Rivest"
    ],
    [
        "Sistem kriptografi yang baik tetap aman meski semua detailnya diketahui, kecuali kuncinya.",
        "Auguste Kerckhoffs"
    ],
    [
        "Bagian tersulit dari kriptografi bukan merancang algoritma, tapi menggunakannya dengan benar.",
        "Moxie Marlinspike"
    ],
    [
        "Dalam kriptografi, kepercayaan digantikan oleh pembuktian.",
        "Prinsip umum kriptografi"
    ],
    [
        "Keamanan yang bergantung pada kerahasiaan desain adalah keamanan yang rapuh.",
        "Auguste Kerckhoffs"
    ],
    [
        "Kriptografi yang buruk lebih berbahaya daripada tidak menggunakan kriptografi sama sekali.",
        "Matt Green"
    ],
    [
        "Jika kunci digunakan ulang, maka kegagalan hanyalah soal waktu.",
        "Thomas Pornin"
    ],
    [
        "Enkripsi yang kuat tidak berarti apa-apa jika kunci disimpan dengan ceroboh.",
        "Niels Ferguson"
    ],
    [
        "Penyerang tidak perlu memecahkan cipher jika mereka bisa mengeksploitasi kesalahan logika.",
        "Adi Shamir"
    ],
    [
        "Tujuan enkripsi adalah membuat pesan tidak dapat dipahami oleh pihak yang tidak berhak.",
        "Julius Caesar"
    ],
    [
        "Kriptografi kunci publik memungkinkan komunikasi aman antar pihak yang saling tidak mengenal.",
        "Whitfield Diffie"
    ],
    [
        "RSA menunjukkan bahwa matematika murni bisa melindungi informasi digital.",
        "Ron Rivest"
    ],
    [
        "mXpCTF{j3li_jug4_lu_b4n9!}",
        "Hidden-Flag"
    ]
]

function renderQoute(index){
    qoute.innerHTML = `
    "${qoutes[index][0]}" 
    <br/><br/>
    — <span class="font-semibold text-yellow-200">${qoutes[index][1]}</span>`
}

function changeQoute() {
    qoute.classList.remove("opacity-100")
    qoute.classList.add("opacity-0")

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % qoutes.length
        renderQoute(currentIndex)

        qoute.classList.remove("opacity-0")
        qoute.classList.add("opacity-100")
    }, 700)
}


renderQoute(currentIndex)
setInterval(changeQoute, 6000)
console.log("Sudah di ubah")