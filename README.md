# Tsu List Backend

## Deskripsi
Tsu List Backend adalah REST API yang digunakan untuk mengelola daftar anime dan drama. API ini memungkinkan pengguna untuk mencari, menambahkan, memperbarui, dan menghapus data anime dan drama, serta mengelola akun pengguna.

## URL Base
`https://tsu-list-backend.vercel.app/`

## Fitur Utama
- **Manajemen Anime & Drama**: Fetch data, tambah, perbarui status & episode, serta hapus.
- **Autentikasi Pengguna**: Signup, login, logout, dan pengelolaan profil.
- **Keamanan**: Menggunakan `authMiddleware` untuk melindungi endpoint tertentu.

## Endpoint
### **Anime**
| Method | Endpoint | Deskripsi |
|--------|---------|-----------|
| GET    | `/anime/fetch-anime` | Ambil semua anime |
| GET    | `/anime/fetch-anime/:id` | Ambil detail anime berdasarkan ID |
| POST   | `/anime/add` | Tambah anime ke daftar (**Auth diperlukan**) |
| PUT    | `/anime/update/:id` | Perbarui status anime (**Auth diperlukan**) |
| PUT    | `/anime/updateEps/:id` | Perbarui jumlah episode anime (**Auth diperlukan**) |
| GET    | `/anime/` | Ambil semua anime pengguna (**Auth diperlukan**) |
| GET    | `/anime/:id` | Ambil detail anime pengguna berdasarkan ID (**Auth diperlukan**) |
| DELETE | `/anime/delete/:id` | Hapus anime dari daftar (**Auth diperlukan**) |

### **Drama**
| Method | Endpoint | Deskripsi |
|--------|---------|-----------|
| GET    | `/drama/fetch-drama` | Ambil semua drama |
| GET    | `/drama/fetch-drama/:id` | Ambil detail drama berdasarkan ID |
| POST   | `/drama/add` | Tambah drama ke daftar (**Auth diperlukan**) |
| PUT    | `/drama/update/:id` | Perbarui status drama (**Auth diperlukan**) |
| PUT    | `/drama/updateEps/:id` | Perbarui jumlah episode drama (**Auth diperlukan**) |
| GET    | `/drama/` | Ambil semua drama pengguna (**Auth diperlukan**) |
| GET    | `/drama/:id` | Ambil detail drama pengguna berdasarkan ID (**Auth diperlukan**) |
| DELETE | `/drama/delete/:id` | Hapus drama dari daftar (**Auth diperlukan**) |

### **User**
| Method | Endpoint | Deskripsi |
|--------|---------|-----------|
| POST   | `/user/signup` | Daftar akun baru |
| POST   | `/user/login` | Login pengguna |
| GET    | `/user/profile` | Ambil data profil (**Auth diperlukan**) |
| POST   | `/user/logout` | Logout pengguna |
| PUT    | `/user/profile` | Perbarui profil (**Auth diperlukan**) |
| DELETE | `/user/profile` | Hapus akun (**Auth diperlukan**) |

## Cara Penggunaan
1. **Clone Repository**: `git clone https://github.com/username/tsu-list-backend.git`
2. **Install Dependencies**: `npm install`
3. **Konfigurasi Environment**: Buat `.env` file dan isi dengan konfigurasi yang diperlukan.
4. **Jalankan Server**: `npm start`

## Teknologi yang Digunakan
- **Node.js** dengan **Express.js** sebagai backend framework.
- **MongoDB** atau **PostgreSQL** untuk penyimpanan data.
- **JWT (JSON Web Token)** untuk autentikasi.
- **Vercel** untuk deployment backend.

## Kontributor
- **Ridho** *(Owner & Developer)*

---
Backend ini dikembangkan untuk mempermudah pengguna dalam mengelola daftar anime dan drama yang mereka ikuti. Silakan gunakan dan kontribusikan! 🚀

