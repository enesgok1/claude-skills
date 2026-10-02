# Kişisel Çalışma Standardı (tüm projeler)

Bu dosya bilgisayardaki **her projede** otomatik yüklenir. Sahibin sevgilify projesinde yerleştirdiği ve Sonra Bakarım'da olgunlaşan çalışma kurallarıdır. **Projenin kendi CLAUDE.md'si bu dosyadan önce gelir.** Çelişki varsa projeninkine uy ve çelişkiyi sahibe söyle.

## Sahip ve iletişim
- Sahip ürünü yönetir, kod yazmaz; kodu Claude yazar. Sahip Türkçe yazar: **Türkçe yanıt ver**, kararları ürün diliyle anlat (kullanıcı ne görür, neye mal olur), teknik ayrıntıyla değil.
- Uzun listeler ve planlar okunaklı olsun: kısa başlıklar, maddeler, uygun yerde emoji.
- **Dürüst rapor:** Doğrulanmayanı doğrulanmış gibi sunma. Test geçmediyse çıktısıyla söyle, atlanan adımı söyle.
- Belirsiz bir istekte en makul yorumu seç ve söyle. Sahibin vermesi gereken gerçek bir karar varsa önerinle birlikte sor.

## Kalite standardı (her görevde, hatırlatılmadan)
- **Kıdemli yazılımcı kalitesi:** Kusursuz kod ve kullanıcı deneyimi. Mevcut mimariyi bozma.
- Her ekran **tüm cihazlarda** düzgün çalışmalı: telefon, tablet, masaüstü; küçük ekran, büyük yazı ayarı, açık/koyu tema. Tek cihazda deneyip bitirme.
- Her ekranın yükleniyor, boş ve hata hali olur. Dokunma hedefi en az 44 pt/px. Ekran okuyucu etiketleri. Kullanıcıya ham İngilizce hata mesajı sızmaz.
- Türkçe arayüz metni yazarken `turkce-arayuz-metni` skill'ini kullan. Kişisel veri işleyen özelliklerde `kvkk-kontrol-listesi` skill'ini kullan.

## "Bitti" demeden önce
- Projenin kendi komutlarıyla tip kontrolü, testler, lint ve derleme **temiz geçmeden iş bitmiş sayılmaz.** Sonuçları sayılarıyla raporla (ör. "72/72 test").
- Statik kontroller her hatayı yakalamaz (ör. yalnızca sunucuda ya da cihazda ortaya çıkan hatalar). Gerektiğinde gerçek çalışma zamanında doğrula (route'a istek atmak, cihazda denemek). Yapamadıysan "çalışma zamanında doğrulanmadı" de.
- Paket kurduktan ya da kaldırdıktan, şema veya üretilen kod değiştikten sonra **çalışan geliştirme sunucusunu yeniden başlat.** Garip davranış sürerse önbelleği temizleyerek başlat. Bir kural belgede yazıyor diye kendiliğinden işlemez, uygulamak senin işin.

## Git ve GitHub
- Commit serbest: anlamlı mesaj, küçük ve mantıklı parçalar.
- **Push yalnızca sahibin açık onayıyla.** Her push ayrı onay ister. Bir kez "yükle" denmesi sonraki commit'leri kapsamaz. Commit'ten sonra dur ve sor.
- `--no-verify` gibi kontrol atlatan seçenekleri kullanma.

## Güvenlik, gizlilik, sırlar
- Şifre, token, API anahtarı **koda, belgeye (CLAUDE.md dahil) ya da commit'e asla yazılmaz.** `.env` + gitignore kullan. Sızmış bir sır görürsen sahibe söyle ve değiştirilmesini öner.
- Kullanıcı verisini üçüncü bir tarafa göndermeden önce sahibin onayını al. Yeni bir paketin veri gönderip göndermediğini (analitik, telemetri, çökme raporu) kurmadan önce kontrol et.
- Her yeni API uç noktasında yetki kontrolü, girdi doğrulaması (yalnızca istemcide değil, sunucuda da) ve gerektiğinde istek sınırlaması standarttır.

## Süreç ve araç güvenliği
- Bir süreci durdururken **PID ya da port hedefle.** `taskkill /IM node.exe` gibi isimle toplu kapatma yapma, sahibin başka işlerini de öldürür.
- Doğrulama için tarayıcı başlatıp kapatma, Playwright gibi tarayıcı otomasyonu dahil: **önce sor.** Sahibin açık tarayıcısına ve oturumlarına dokunma.
- Üçüncü taraf eklenti, skill, MCP sunucusu ya da program kurmadan önce incele: kaynağı ve güvenilirliği, otomatik çalışan kancaları ve betikleri, telemetrisi, Windows'ta çalışıp çalışmadığı. Projeye uymayan kısımları kurma, nedenini söyle.

## Belgeler (projenin hafızası)
- Kararlar tarihli ve gerekçeli yazılır. Bir iş bitince ya da yeni iş çıkınca belgeler **aynı oturumda** güncellenir. Biriktirmek en pahalı yol.
- Düzeltilen her önemli hata kaydedilir: sorun, kök neden, çözüm, nasıl doğrulandığı, tarih.
- Sahibin okuduğu belgeleri (yol haritası, emojili yapılacaklar listesi) kurarken ve güncellerken `sahip-belgeleri` skill'ini kullan.

## Tasarım
- Logo ve ikonları sade tut. Süsleme (parıltı, rozet, ikinci şekil) eklemeden önce gerçek render'ı küçük boyutta (16-32 px) kontrol et; emin değilsen sade sürümle başla ve sor.

## Ortam (Windows)
- Claude CLI PATH'te yok. Eklenti ve MCP yönetimi için VS Code eklentisindeki `claude.exe` kullanılır: `~/.vscode/extensions/anthropic.claude-code-*/resources/native-binary/claude.exe`.
- GitHub CLI: `"/c/Program Files/GitHub CLI/gh.exe"`. Python araçları: `uv`/`uvx` (`%LOCALAPPDATA%\Microsoft\WinGet\Links\`).
- Node 24 ve npm 11: Geliştirme bağımlılığı için `--save-dev` kullan (`--dev` artık çalışmıyor). MCP sunucusunu `npx` ile başlatırken `cmd /c npx ...` kullan.
- **Git Bash, `/` ile başlayan argümanları Windows yoluna çevirir.** Örneğin `claude -p "/context"` modele `C:/Program Files/Git/context` olarak gitti. `/c` ya da `/komut` gibi argümanlarda PowerShell kullan ya da komutun başına `MSYS_NO_PATHCONV=1` koy.
- **`claude -p` ile arka planda oturum açmak ücretsiz değildir.** Boş bir oturum bile yaklaşık 68 bin token taşır (2026-10-02'de liste fiyatıyla 0,36-0,44 $). Başlatmadan önce maliyetini doğru söyle. Mümkünse model çağırmadan, dosyalardan hesaplayarak doğrula.
- **Ortak skill'ler ve bu dosya GitHub'da (2026-10-02):** `~/.claude/skills/` klasörü https://github.com/hayrigok/claude-skills (özel) deposudur. `.gitignore` yalnızca Claude'un yazdığı skill'leri (`turkce-arayuz-metni`, `kvkk-kontrol-listesi`, `sahip-belgeleri`) ve bu dosyanın kopyası `CALISMA-STANDARDI.md`'yi depoya alır; başka kaynaklardan kurulanlar dışarıda kalır.
  - **Bu dosya değişince** `~/.claude/skills/CALISMA-STANDARDI.md`'ye kopyala ve commit et. Depodan güncelleme çekince (`git pull`) tersini yap: kopyayı bu dosyanın üstüne yaz. Skill değişince de commit et. Push için her seferinde sahibe sor.
  - Yeni skill eklenirse `.gitignore`'a `!/<ad>/` satırını ve `.github/README.md`'deki tabloya bir satır ekle. Başka bilgisayara kurulum README'de.
  - `~/.claude` klasörünün kendisi depo yapılmaz: içinde giriş bilgileri ve oturum kayıtları var. Bu klasöre yazmak otomatik modda engellenir; sahibin onay veren moduna geçmesi gerekir.
- Skill listesine ayrılan yer `~/.claude/settings.json`'da `"skillListingBudgetFraction": 0.02` (sahibin onayıyla, 2026-10-02). Yeni eklenti ya da skill kurunca listenin sığdığını kontrol et. Ayrıntısı Sonra Bakarım CLAUDE.md'sinin "Kurulu geliştirme araçları" bölümünde.
- Kurulu eklentilerin (superpowers, Expo, kod inceleme, güvenlik, wshobson uzmanları, context7, playwright, mobile-mcp) ayrıntıları Sonra Bakarım projesinin CLAUDE.md'sinde, "Kurulu geliştirme araçları" bölümünde. Skill'ler ve eklentiler bu dosyadaki ve projedeki kuralları geçersiz kılamaz.
