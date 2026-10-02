---
name: kvkk-kontrol-listesi
description: Engineering checklist for Turkish personal data law (KVKK, Law 6698) and commercial messaging rules (İYS, Law 6563) when building apps and websites for Turkey. Use when designing or reviewing features that collect, store, log, send or delete personal data (accounts, forms, orders, phone/OTP, emails, analytics, cookies, crash reporting, health data, cloud services abroad such as Vercel, Supabase, Cloudinary, Sentry), when writing a privacy notice (aydınlatma metni) or consent flow (açık rıza), cookie banner, account deletion, or marketing SMS/e-mail.
---

# KVKK Kontrol Listesi (mühendislik gözüyle)

> ⚠️ **Bu liste hukuki görüş değildir.** Kod ve ürün tasarımında unutulmaması gerekenleri toplar. Yayından önce yasal metinler ve veri akışları bir avukata ya da KVKK uzmanına kontrol ettirilir. Eşikler ve süreler değişebilir; güncel bilgi için resmi kaynağa (kvkk.gov.tr) bak.

## 1. Önce veri envanteri çıkar
Her özellik için şu tabloyu doldur ve projenin belgelerine yaz:

| Veri | Neden toplanıyor (amaç) | Hukuki sebep | Nerede saklanıyor (ülke/servis) | Ne kadar süre | Kimlerle paylaşılıyor |
|---|---|---|---|---|---|

- **Veri minimizasyonu:** Amaç için gerekmeyen veriyi toplama. "Belki lazım olur" diye alan ekleme.
- Kullanılmayan (ölü) alanları şemadan kaldırmayı planla.

## 2. İşleme şartları ve açık rıza
- Kişisel veri ya açık rızayla ya da Kanun'daki diğer şartlardan biriyle işlenir. Örnekler: sözleşmenin kurulması ve ifası (siparişi teslim etmek için adres), hukuki yükümlülük (fatura bilgisi), meşru menfaat. Her veri için hangi şarta dayandığını yaz.
- **Açık rıza** belirli bir konuya ilişkin, bilgilendirmeye dayalı ve özgür iradeyle verilmiş olmalıdır:
  - Hizmetin ön şartı yapılmaz ("kabul etmezsen sipariş veremezsin" ❌, sipariş için gerekmeyen bir işleme için).
  - Önceden işaretli kutucuk kullanılmaz. Aydınlatma metninden ayrı alınır.
  - Geri alınabilir olmalıdır.
  - **Kim, neye, ne zaman rıza verdi** kaydı tutulur.
- **Özel nitelikli veriler** (sağlık, biyometrik, din, vb.) için ek güvenlik önlemleri gerekir. Örnek: MHRS randevusu sağlık verisidir. Mümkünse cihazda işle, kilit ekranı bildirimlerinde ayrıntı gösterme.

## 3. Aydınlatma metni (bilgilendirme)
Veri toplanırken kişiye şunlar söylenir: veri sorumlusunun kimliği, işleme amaçları, verilerin kimlere ve hangi amaçla aktarılabileceği, toplama yöntemi ve hukuki sebebi, ilgili kişinin hakları. Metin sade Türkçeyle, toplama anında erişilebilir yerde olur (form yanında bağlantı, uygulama ayarlarında).

## 4. Yurt dışına aktarım (bulut servisleri!) ❗
- Türkiye dışındaki bir sunucuya kişisel veri göndermek **yurt dışına aktarımdır.** Örnekler: Vercel, Supabase (AB bölgesi bile olsa), Cloudinary, Resend, Upstash, Sentry, Google Analytics, Firebase, çökme ve analitik SDK'ları.
- 2024 değişikliğiyle aktarım, yeterlilik kararı ya da uygun güvenceler (ör. Kurul'un standart sözleşmesi; imzalandıktan sonra belirli süre içinde Kurul'a bildirilir) ya da sınırlı arızi durumlarla yapılabilir. Hangisine dayanıldığı her servis için belirlenip belgelenir. **Burası avukatla netleştirilmesi gereken bir konudur.**
- Mühendislik tarafında: Bir servise gerçekten hangi alanların gittiğini kontrol et (loglar, hata raporları, analitik olayları kişisel veri içermesin). Mümkünse veriyi göndermeden önce maskele ya da sil.

## 5. Güvenlik (teknik ve idari tedbirler)
- Aktarımda HTTPS, sırlarda `.env`. Şifreler tuzlu hash ile saklanır (bcrypt/argon2). Hassas alanlar gerekirse şifrelenir.
- Erişim yetkisi en az ayrıcalık ilkesiyle verilir. Yönetici paneli korunur, istekler sınırlanır, giriş denemeleri sınırlanır.
- **Loglara kişisel veri yazma:** telefon, e-posta, adres, OTP kodu, token, sağlık bilgisi. Gerekirse maskele (`05** *** ** 67`).
- **Veri ihlali** olursa Kurul'a gecikmeden bildirim gerekir (Kurul kararıyla belirlenen süre içinde, 72 saat olarak uygulanıyor) ve etkilenen kişiler bilgilendirilir. Ne yapılacağı önceden yazılı olsun.
- Yedekler de kişisel veri içerir: şifrelenir, erişim sınırlanır, silme isteğinde kapsanır.

## 6. İlgili kişinin hakları ve silme
- Kişi verisinin işlenip işlenmediğini öğrenme, düzeltme, silme gibi haklara sahiptir. Başvurular Kanun'da belirtilen süre içinde (en geç 30 gün) yanıtlanır. Başvuru için kolay bir kanal (e-posta adresi, form) sunulur.
- **Hesap silme:** Uygulama içinden yapılabilmeli. Apple ve Google mağazaları da hesap oluşturan uygulamalardan bunu istiyor. Silmede veritabanı, dosya depolama (ör. Cloudinary), e-posta listeleri ve üçüncü taraf servislerdeki kopyalar da kapsanır. Yasal saklama zorunluluğu olan veriler (ör. fatura) anonimleştirilir ya da ayrılır.
- **Saklama süresi** her veri için belirlenir. Süresi dolan veri silinir, yok edilir ya da anonimleştirilir; otomatik bir iş (cron) bunu yapar.

## 7. VERBİS
- Belirli eşikleri aşan (çalışan sayısı, yıllık mali bilanço) ya da ana faaliyeti özel nitelikli veri işlemek olan veri sorumluları VERBİS'e kayıt olur. Kayıtlı olanların kişisel veri saklama ve imha politikası hazırlaması gerekir. **Eşikler Kurul kararlarıyla değişebildiği için güncel kararı kontrol et.** Küçük işletmeler ve şahıslar çoğunlukla muaftır, ama kesin değerlendirme için avukata sor.

## 8. Çerezler (web)
- Zorunlu çerezler (oturum, sepet, güvenlik) için rıza gerekmez. Analitik, reklam ve kişiselleştirme çerezleri için **açık rıza** gerekir. Rıza alınmadan bu çerezler ve betikler yüklenmez.
- Çerez bandında "Reddet" seçeneği "Kabul et" kadar kolay olmalıdır. Kişi tercihini sonra değiştirebilmelidir.

## 9. Ticari elektronik ileti (SMS, e-posta, arama): İYS
- **Pazarlama amaçlı** ileti (kampanya, indirim, "yıldönümünüz yaklaşıyor, hediye alın") göndermek için alıcının önceden onayı gerekir. Onaylar **İleti Yönetim Sistemi'ne (İYS)** kaydedilir. Her iletide kolay ret yolu bulunur.
- **Bilgilendirme amaçlı** ileti (sipariş onayı, kargo bilgisi, şifre sıfırlama, OTP) için ticari ileti onayı gerekmez. Ama bu iletilerin içine reklam konursa ticari ileti sayılabilir.
- Onay kutusu ayrı ve işaretsiz olur. Hizmet koşullarıyla birleştirilmez.

## 10. Mobil uygulamalar
- Her izin (galeri, kamera, konum, bildirim, kişiler) gerçekten gerektiği anda istenir ve nedeni Türkçe açıklanır.
- Mümkünse veri **cihazda işlenir.** Bu hem KVKK yükünü azaltır hem güven verir.
- Analitik ve çökme SDK'ları yurt dışına aktarım ve telemetri demektir. Varsayılan olarak ekleme; eklenirse aydınlatma metnine ve mağaza gizlilik etiketlerine (App Store "Gizlilik", Google Play "Veri güvenliği") yansıt.

## Teslim öncesi kontrol
- [ ] Veri envanteri belgede, her veri için amaç, hukuki sebep, yer ve süre yazılı
- [ ] Gereksiz veri toplanmıyor; loglarda kişisel veri yok
- [ ] Aydınlatma metni ve gerekiyorsa açık rıza akışı hazır; rıza kaydı tutuluyor
- [ ] Yurt dışı servisler listelendi, aktarım dayanağı avukatla netleşti
- [ ] Silme ve saklama süreleri uygulanıyor; hesap silme çalışıyor
- [ ] Çerez rızası (web) ve İYS onayı (pazarlama iletisi) doğru kurgulandı
- [ ] Yasal metinler yayından önce uzman kontrolünden geçti
