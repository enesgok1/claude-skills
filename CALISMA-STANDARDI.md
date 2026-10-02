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
- Hata düzeltirken, projede test altyapısı varsa önce hatayı yakalayan testi yaz, sonra düzelt. Test önce kırmızı, düzeltmeden sonra yeşil olmalı.
- Kütüphane ve framework kullanırken ezberden değil güncel belgeden çalış (context7). Sürüm farkı en sık hata kaynağıdır.
- Büyük bir değişikliği bitirmeden önce farkı (diff) baştan sona kendin incele: kullanılmayan kod, tekrar, gözden kaçan hata durumu, mimariye uymayan parça.

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
- Yeni ekran yapmadan önce projedeki mevcut ekranlara ve tasarım sistemine bak. Renk, boşluk, yazı tipi ve köşe yuvarlaklığı için projenin tasarım değişkenlerini (token) kullan, koda doğrudan renk kodu yazma. Var olan bileşeni yeniden kullan, benzerini sıfırdan yazma.
- Hazır şablon görünümünden kaçın: yeni ekran ya da sayfa tasarlarken web için `frontend-design`, mobil için `expo-design-system` ve `expo-native-ui` skill'lerini kullan.
- Metin ile arka plan arasında okunabilir kontrast olsun (normal metinde en az 4,5:1). Bilgiyi yalnızca renkle verme. Animasyonlar "hareketi azalt" ayarına uysun.
- Arayüz değişikliğini mümkünse ekran görüntüsüyle doğrula (emülatör ya da cihaz). Tarayıcı açmak gerekiyorsa önce sor.

## Token tasarrufu (2026-10-02)
- Opus 5.5'in düşünme seviyesi `high` (`settings.json` → `modelSettings`), sohbet özetleme eşiği %50 (`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`). Zor bir işte yalnızca o oturum için yükseltmek: `/effort` yaz, seviyeyi seç, **`s`** tuşuna bas. `/effort xhigh` yazmak ya da Enter'a basmak seçimi kalıcı kaydeder.
- Konu değişince sahibe yeni oturum açmasını (`/clear`) öner. İlgisiz işleri aynı oturumda biriktirme.
- Dosyanın tamamını değil gereken kısmını oku: önce ara, sonra oku. Az önce düzenlediğin dosyayı doğrulamak için yeniden okuma.
- Komutları sessiz ya da kısa çıktı veren seçeneklerle çalıştır: `npm install --silent`, `pip install -q`, `git log --oneline -n 5`, `git status -s`, testlerde yalnızca özet ve başarısız olanlar. Komut hata verirse yalnızca o komutu ayrıntılı çıktıyla yeniden çalıştır.
- Uzun çıktıyı sahibe aynen aktarma, kısa bir öz çıkar: ne oldu, sonuç sayıları, sahibin karar vermesi gereken şey. Aynı bilgiyi tekrar etme, gereksiz giriş ve kapanış cümlesi yazma.
- Alt ajanı (subagent) yalnızca sahip isterse kullan. Her biri sıfırdan başlar ve küçük işte pahalıya gelir.
- Oturum ortasında model değiştirmeyi önerme. Önbellek modele özeldir, değiştirince bütün konuşma tam fiyatla yeniden işlenir. Daha ucuz model gerekirse `opusplan` seçeneğini anlat (planlamada Opus, uygulamada Sonnet).
- Model fiyatı, sınırı ya da özelliği sorulursa ezberden değil güncel belgeden yanıtla (`claude-api` skill'i, code.claude.com/docs).
- Durum satırı (2026-10-02): `~/.claude/skills/statusline.mjs`. Model, düşünme seviyesi, bağlam doluluğu ve 5 saatlik/haftalık kullanım hakkını gösterir; yalnızca terminalde görünür.
- Bu dosya her oturumda yüklenir, kısa tut. Projeye özel ayrıntı projenin CLAUDE.md'sine yazılır.

## Öğrenilen dersler (aynı hatayı iki kez yapma)
- Bir hata yaptığında, sahip seni düzelttiğinde ya da bir şey beklenenden farklı çıktığında dersi **aynı oturumda** tek satırla yaz: tüm projeleri ilgilendiriyorsa buraya, tek projeyi ilgilendiriyorsa o projenin CLAUDE.md'sine. Benzer bir işe başlamadan önce bu listeye bak.
- Ders kısa olur: ne yanlış gitti → doğrusu ne. Uzun hikâye yazma, liste şişerse eskimiş dersleri sil.
- `/effort xhigh` yazmak oturumluk değil kalıcıdır; oturumluk yükseltme için `/effort` → seç → `s` (2026-10-02).
- `MAX_THINKING_TOKENS` Opus 5.5'te işe yaramaz; düşünme miktarı yalnızca effort ile ayarlanır (2026-10-02).
- Videolardaki model fiyatı ve "kaç kat pahalı" oranları eskiyebilir; güncel belgeden doğrula. 2026-10-02'de Haiku 4.5 / Sonnet 5.5 / Opus 5.5 = 1 / 2 / 4 $ (girdi, milyon token).
- `/plugin` komutları VS Code panelinde çalışmaz; eklentiyi `claude.exe plugin ...` ile kur (2026-10-02).
- Durum satırı (`statusLine`) VS Code sohbet panelinde görünmez, yalnızca terminal modunda görünür (2026-10-02).
- `ANTHROPIC_BASE_URL` ile başka bir sağlayıcıya (ör. Qwen) geçmek token tasarrufu değildir: veri üçüncü tarafa gider, araç arama ve Remote Control kapanır (2026-10-02).

## context-mode eklentisi (2026-10-02, tüm projelerde)
Büyük araç çıktılarını (test, derleme, log, git geçmişi, tarayıcı dökümü, API yanıtı) sohbete dökmek yerine kendi alanında işler ve yalnızca özeti getirir. Kendi kurallarını her oturumun başında kendisi ekler (yaklaşık 1.300 token). Burada yalnızca sahibe özel kurallar var:
- Düzenlenecek dosya normal `Read` ile okunur. İnceleme ve özet için `ctx_execute_file`, çok çıktı üreten komutlar için `ctx_batch_execute` ya da `ctx_execute` kullan. Test ve derleme sonuçlarını yine sayılarıyla raporla.
- Web sayfası okuma aracı ve `curl` engellidir: `ctx_fetch_and_index` + `ctx_search` kullan. Kütüphane belgesi için context7 geçerli.
- Playwright araçlarında her zaman `filename` parametresini ver, çıktı dosyaya gitsin.
- **Sormadan kullanma:** `ctx_insight` (tarayıcı açar, ücretli bir web paneline götürür), `ctx_purge` (bilgi tabanını siler), `ctx_upgrade` (eklentiyi günceller; yeni sürüm kurulmadan önce yeniden incelenir).
- `%APPDATA%\context-mode\platform.json` dosyasını **asla oluşturma.** Bu dosya varsa eklenti bütün oturum olaylarını dış bir sunucuya gönderir.
- Eklenti `settings.json`'a kendi onarım kancasını ekler (`~/.claude/hooks/context-mode-cache-heal.mjs`; yalnızca yerel dosya yollarını onarır, ağ yok). Kaldırırken bunu da sil.
- Sorun çıkarsa `ctx doctor`. Kaldırmak için: `claude.exe plugin uninstall context-mode@context-mode`.
- Eklentinin kuralları bu dosyayla ya da proje kurallarıyla çelişirse bu dosya ve proje kuralları önce gelir.

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
- Kurulu eklentilerin (superpowers, Expo, kod inceleme, güvenlik, wshobson uzmanları, context7, playwright, mobile-mcp; context-mode için yukarıdaki bölüm) ayrıntıları Sonra Bakarım projesinin CLAUDE.md'sinde, "Kurulu geliştirme araçları" bölümünde. Skill'ler ve eklentiler bu dosyadaki ve projedeki kuralları geçersiz kılamaz.
