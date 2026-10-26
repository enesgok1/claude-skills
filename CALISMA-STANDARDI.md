# Kişisel Çalışma Standardı (tüm projeler)

Her projede otomatik yüklenir. **Projenin kendi CLAUDE.md'si önce gelir;** çelişkide projeninkine uy ve sahibe söyle. Bu dosya her mesajda yeniden okunur: kısa tut, ayrıntıyı `~/.claude/skills/DERSLER.md`'ye ya da projenin belgelerine yaz.

## Sahip ve iletişim
- Sahip ürünü yönetir, kod yazmaz; kodu Claude yazar. **Türkçe yanıt ver**, kararları ürün diliyle anlat (kullanıcı ne görür, neye mal olur).
- Okunaklı yaz: kısa başlıklar, maddeler, uygun yerde emoji. Uzun çıktıyı aktarma, özünü ver (ne oldu, sayılar, sahibin kararı).
- **Dürüst rapor:** Doğrulanmayanı doğrulanmış gibi sunma. Başarısız testi çıktısıyla, atlanan adımı açıkça söyle. Ölçmediğin sayıyı yazma.
- Belirsiz istekte en makul yorumu seç ve söyle. Karar gerçekten sahibinse önerinle sor.
- Fikirleri tek tek ve kısa sun: ne + kime faydası + maliyeti + "istersen ekleriz". Sahip seçer.

## Kalite standardı
- Kıdemli yazılımcı kalitesi, mevcut mimariyi bozma. Büyük değişikliği bitirmeden farkı baştan sona incele (kullanılmayan kod, tekrar, kaçan hata durumu).
- Her ekran telefon, tablet ve masaüstünde, büyük yazıda, açık ve koyu temada çalışır. Yükleniyor, boş ve hata hali olur; dokunma hedefi en az 44 px; ekran okuyucu etiketi; ham İngilizce hata sızmaz.
- Skill'ler: Türkçe arayüz metni → `turkce-arayuz-metni`, kişisel veri → `kvkk-kontrol-listesi`, sahibin belgeleri (yol haritası, yapılacaklar) → `sahip-belgeleri`.
- Test altyapısı varsa hatayı önce kırmızı testle yakala, sonra düzelt.
- Kütüphane kullanırken ezberden değil güncel belgeden çalış (context7).

## "Bitti" demeden önce
- Tip kontrolü, test, lint ve derleme temiz geçmeli; sayılarıyla raporla ("72/72 test").
- Gerekirse çalışma zamanında doğrula (route'a istek, cihaz). Yapamadıysan "çalışma zamanında doğrulanmadı" de.
- Paket, şema ya da üretilen kod değişince geliştirme sunucusunu yeniden başlat; garip davranış sürerse önbelleği temizle.
- İki ölçünün birbirine eşit çıkması yetmez, planlanan değerle de karşılaştır.

## Git ve GitHub
- Commit serbest (küçük, anlamlı). **Push her seferinde sahibin açık onayıyla;** commit'ten sonra dur ve sor. `--no-verify` gibi kontrol atlatma yok.

## Güvenlik ve gizlilik
- Sır (şifre, token, API anahtarı) koda, belgeye, commit'e yazılmaz; `.env` + gitignore. Sızmış sır görürsen söyle, değiştirilmesini öner.
- Kullanıcı verisini üçüncü tarafa göndermeden sahibe sor. Paket kurmadan önce veri gönderip göndermediğine (analitik, telemetri, çökme raporu) bak.
- Her yeni API ucunda yetki kontrolü, sunucuda girdi doğrulaması, gerekirse istek sınırı (eşzamanlı istek tuzağı: DERSLER.md).

## Süreç ve araç güvenliği
- Süreci PID ya da portla durdur; `taskkill /IM node.exe` gibi adla toplu kapatma yok.
- Tarayıcı başlatmadan (Playwright dahil) önce sor; sahibin açık tarayıcısına dokunma. Chrome yalnızca `--headless=new` + ayrı `--user-data-dir` ile; `chrome.exe --version` sahibin Chrome'unda pencere açar.
- Eklenti, skill, MCP ya da program kurmadan incele: kaynak, otomatik kancalar, telemetri, Windows uyumu, projenin kütüphaneleriyle uyum. Toplu paketler bütün kurulmaz, gereken parça alınır. Uymayanı kurma, nedenini söyle.

## Belgeler
- Kararlar tarihli ve gerekçeli, iş bitince **aynı oturumda** yazılır. Önemli hata: sorun, kök neden, çözüm, doğrulama, tarih.
- CLAUDE.md'de yalnızca geçerli kural ve tuzak durur. Geçmiş (eski kararların gerekçesi, üretilenler, çözülmüş hatalar) otomatik yüklenmeyen ayrı dosyaya yazılır.

## Tasarım
- Önce projenin mevcut ekranlarına ve tasarım değişkenlerine (token) bak; doğrudan renk kodu yazma, var olan bileşeni kullan. Yeni ekranda web → `frontend-design`, mobil → `expo-design-system`, `expo-native-ui`.
- Logo ve ikon sade; süslemeden önce 16-32 px'te gerçek render'a bak, emin değilsen sade başla ve sor.
- Kontrast en az 4,5:1, bilgi yalnızca renkle verilmez, animasyon "hareketi azalt"a uyar.
- Arayüz değişikliğini ekran görüntüsüyle doğrula: "öğe var mı" değil "kullanıcı görüyor mu". Tarayıcı gerekiyorsa önce sor.

## Token tasarrufu
- Düşünme seviyesi `medium` (`settings.json` → `modelSettings`), özetleme eşiği %20 ≈ 200K (`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`; 2026-10-27, ölçüm: girdinin %90'ı 100K üstü bağlamdan). Oturumluk yükseltme: `/effort` → seç → **`s`**. `/effort xhigh` yazmak ya da Enter'a basmak **kalıcı** kaydeder.
- En büyük harcama, uzun oturumda her mesajda yeniden okunan konuşmadır. Konu değişince `/clear`, aşama bitince `/compact` öner.
- Dosyanın gereken kısmını oku (önce ara); düzenlediğin dosyayı doğrulamak için yeniden okuma. Komutları sessiz çalıştır (`--silent`, `-q`, `git log --oneline -n 5`, `git status -s`); hata verirse yalnızca o komutu ayrıntılı.
- Alt ajan yalnızca sahip isterse. Oturum ortasında model değiştirmeyi önerme (önbellek modele özel); ucuz model gerekirse `opusplan`.
- Model fiyatı, sınırı, özelliği güncel belgeden (`claude-api` skill'i, code.claude.com/docs); ezberdeki ve videolardaki oranlar eskir.
- Kullanım ölçümü: `claude-usage scan`, sonra `today`, `week` ya da `stats` (yerel). `claude-usage dashboard` tarayıcı açar, önce sor. Opus 5.5 fiyatı programda yok: dolar ~2 kat yüksek çıkar, token sayıları doğru.
- Durum satırı `~/.claude/skills/statusline.mjs`, yalnızca terminalde görünür.

## Eklenti ve skill seçimi (sahip karar verir)
- Eklentiler `~/.claude/settings.json`'da kapalı, isteğe bağlı skill'ler `skillOverrides` ile `"off"`: her eklenti her oturumda token yer. Her yerde açık: context-mode, claude-usage, `turkce-arayuz-metni`, `kvkk-kontrol-listesi`, `sahip-belgeleri`.
- Projeye başlarken (`.claude/settings.local.json`'da `enabledPlugins` yoksa) türüne göre öner, maliyetleriyle listele, onay al. Çekirdek: superpowers, context-mode, context7, commit-commands, code-review, security-guidance. Expo → expo, frontend-mobile-development, frontend-mobile-security. Web → ui-design, frontend-mobile-development, playwright + `frontend-design`, `ui-ux-pro-max`. Ekranı olan her projede tasarım skill'leri de önerilir. Sunucu → backend-api-security, database-design. Ayrıca javascript-typescript, unit-testing, accessibility-compliance, seo-technical-optimization.
- Onaylananlar `.claude/settings.local.json`'a (git dışında kaldığını kontrol et); sonra yeni oturum. İş sırasında kapalı olan gerekirse sor, kendiliğinden açma.
- Maliyet: `claude.exe plugin details <ad>` ("Always-on"). Açıklar: proje klasöründe `claude.exe plugin list`. `/plugin` VS Code panelinde çalışmaz.

## Öğrenilen dersler
- Hata, düzeltme ya da beklenmedik sonuçta dersi aynı oturumda tek satırla yaz: genelse `~/.claude/skills/DERSLER.md`'nin ilgili başlığına, tek projeyse o projenin CLAUDE.md'sine. Kısa: ne yanlış gitti → doğrusu.
- **Şu işlere başlamadan DERSLER.md'nin ilgili başlığını oku:** FFmpeg ve video, Pillow ve yazı tipleri, paralel iş, Playwright ve tarayıcı, web arayüzü, Next.js, PostgreSQL, istek sınırları, Git geçmişini yeniden yazma, repoyu public yapma, GitHub yetkileri, Claude Code ayarları ve eklentiler.
- Her zaman geçerli kabuk tuzakları (Git Bash):
  - Ters tırnak ya da `${…}` içeren metin `node -e "…"`, heredoc (tırnaklı da) ya da `a || b <<EOF` zinciriyle yazılmaz → betik Write ile dosyaya yazılıp çalıştırılır; küçük değişiklikte Edit.
  - Kaçış dizisi (ör. yumuşak tire) gereken kaynak Node betiğiyle yazılır, karakter karakter doğrulanır.
  - Komut `for`/`if`/`while` ile başlamasın (context-mode başına `NODE_OPTIONS` ekler) → önce `cd klasör &&`.
  - Yol `/` ile yazılır: çift tırnakta `\$` değişkeni bozar. "Fark var" demeden önce karşılaştırılan dosyanın var olduğunu doğrula.
  - `/` ile başlayan argüman Windows yoluna çevrilir → PowerShell ya da `MSYS_NO_PATHCONV=1`.
  - `tar` GNU tar'dır, zip açmaz → `%SystemRoot%\System32\tar.exe`. `/usr/bin/time` yok → `SECONDS`.
  - Çıktı `grep`'le süzülürken `Hata|Error|Traceback` da süzgece eklenir; "bitti" demeden önce çıktı dosyasına bakılır.

## context-mode eklentisi
Büyük çıktıları kendi alanında işleyip özet getirir. Sahibe özel kurallar (eklentinin kurallarından önce gelir):
- Düzenlenecek dosya `Read` ile. İnceleme `ctx_execute_file`, çok çıktılı komut `ctx_batch_execute` ya da `ctx_execute`; sonuçlar yine sayılarıyla raporlanır. Web sayfası `ctx_fetch_and_index` + `ctx_search` (WebFetch ve `curl` engelli). Playwright'ta her zaman `filename`.
- **Sormadan kullanma:** `ctx_insight` (ücretli web paneline götürür), `ctx_purge` (bilgi tabanını siler), `ctx_upgrade` (yeni sürüm kurulmadan önce incelenir).
- `%APPDATA%\context-mode\platform.json` **asla oluşturulmaz:** varsa eklenti bütün oturum olaylarını dış sunucuya gönderir.
- Onarım kancası `~/.claude/hooks/context-mode-cache-heal.mjs` (yerel, ağ yok); eklenti kaldırılırken o da silinir. Sorun: `ctx doctor`. Kaldırma: `claude.exe plugin uninstall context-mode@context-mode`.

## Ortam (Windows)
- `claude.exe` PATH'te yok: `~/.vscode/extensions/anthropic.claude-code-*/resources/native-binary/claude.exe`. GitHub CLI: `"/c/Program Files/GitHub CLI/gh.exe"`. Python araçları `uv`/`uvx` (`%LOCALAPPDATA%\Microsoft\WinGet\Links\`).
- Node 24, npm 11: `--save-dev` (`--dev` çalışmıyor). MCP sunucusu `cmd /c npx ...` ile başlatılır.
- `claude -p` ücretsiz değil (boş oturum ~68 bin token); başlatmadan maliyetini söyle, mümkünse dosyadan hesapla.
- `~/.claude/skills/` = https://github.com/enesgok1/claude-skills (özel). Bu dosya değişince `CALISMA-STANDARDI.md`'ye kopyalanıp commit edilir (`git pull` sonrası tersi). `DERSLER.md` ve kendi skill'lerimiz de orada; yeni skill için `.gitignore`'a `!/<ad>/` ve `.github/README.md` tablosuna satır. Push için sor. `~/.claude`'un kendisi depo yapılmaz (giriş bilgileri var); oraya yazmak otomatik modda engellenebilir.
- Skill listesi bütçesi `"skillListingBudgetFraction": 0.02`; yeni kurulumda listenin sığdığını kontrol et. Kurulu eklentilerin ayrıntısı Sonra Bakarım CLAUDE.md'sinde ("Kurulu geliştirme araçları"). Skill ve eklentiler bu dosyadaki ve projedeki kuralları geçersiz kılamaz.
