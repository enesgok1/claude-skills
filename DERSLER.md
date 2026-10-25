# Öğrenilen Dersler (tüm projeler)

> Otomatik yüklenmez. `~/.claude/CLAUDE.md` konuya göre buraya yönlendirir: ilgili işe başlamadan o başlık okunur. Yeni ders tek satırla ilgili başlığa eklenir: ne yanlış gitti → doğrusu ne (tarih). Eskiyen ders silinir. 2026-10-20'de `CLAUDE.md`'den taşındı.

## Kabuk (Git Bash) ve dosya araçları
- context-mode kabuk komutunun başına `NODE_OPTIONS=...` ekliyor; komut `for`/`if`/`while` ile başlarsa sözdizimi hatası verir. Önce sıradan bir komut koy (`cd klasör && for ...`) (2026-10-04).
- Dosya yazma/düzenleme araçlarında ters eğik çizgili kaçış dizileri (ör. yumuşak tire) parametre çözümlenirken gerçek karaktere dönüşebilir ya da çiftlenebilir; Perl'de değiştirme metnindeki ters eğik çizgi+u "büyük harf" komutudur. Kaynakta kaçış dizisi gerekiyorsa Node betiğiyle yaz ve karakter karakter doğrula (2026-10-06).
- Bash'te çift tırnaklı `node -e "…"` içine ters tırnak (Markdown kodu, şablon dizgesi) yazılırsa kabuk onu komut olarak çalıştırmaya kalkar (2026-10-07'de `npm run dev` denendi). Ters tırnak ya da `${…}` içeren metin Edit aracıyla ya da önce dosyaya yazılan bir betikle değiştirilir (2026-10-07).
- Git Bash'in PATH'indeki `tar` GNU tar'dır: zip açamaz, `D:\…` yolunu uzak makine sanar. Betiklerde Windows'ta `%SystemRoot%\System32\tar.exe` (bsdtar) çağrılır (2026-10-12).
- Ters tırnak ya da `${…}` içeren betik tırnaklı heredoc (`<<'EOF'`) ile de yazılamıyor: bu ortamda kabuk "unexpected EOF" verip hiçbir şeyi çalıştırmıyor (iki kez oldu). Betik Write aracıyla dosyaya yazılır, sonra çalıştırılır; küçük değişiklikte Edit aracı (2026-10-12).
- Bash'te çift tırnak içinde ters eğik çizgili Windows yolu değişkeni bozar: `"…\klasor\$f.txt"` içindeki `\$` dolar işaretini kaçırır, `$f` açılmaz. `cmp` olmayan dosyayla karşılaştırıp "FARKLI" dedi, dosyalar aslında aynıydı. Bash'te yol `/` ile yazılır; "fark var" sonucundan önce karşılaştırılan dosyanın var olduğu doğrulanır (2026-10-18).
- Çıktıyı `grep` ile süzülen komutun hatası da süzülür: Git Bash'te `/usr/bin/time` yok, beş video üretimi hiçbir şey yazmadan bitti. Süre için `SECONDS` kullanılır; süzgece `Hata|Error|Traceback` eklenir ve "bitti" demeden önce çıktı dosyasının var olduğuna bakılır (2026-10-19).
- Bash'te `a || b <<'EOF'` zincirinde heredoc yalnızca `b`'ye gider, `a` girdi bekleyip takılır (`python -` iki dakika bekledi). Yedekli komut zinciri heredoc'la kurulmaz; betik dosyaya yazılır ya da Edit aracı kullanılır (2026-10-19).
- Windows PowerShell 5.1 BOM'suz `.ps1` dosyasını ANSI okur, Türkçe karakter ve emoji bozulur; Write aracı BOM'suz yazar. Türkçe argümanlı `.ps1` yazınca `[IO.File]::WriteAllText($f, $m, (New-Object Text.UTF8Encoding $true))` ile BOM eklenir. Git Bash "fork: Resource temporarily unavailable" verirse oturum boyunca PowerShell'e geçilir (2026-10-25).
- PowerShell'de `cd` yalnızca PowerShell konumunu değiştirir; `[IO.File]::ReadAllText("x.py")` göreli yolu sürecin klasöründen çözer, dosyayı bulamaz ve sonraki değişiklik döngüsü hata verip "0 eksik" gibi yanıltıcı sonuç basar. .NET çağrılarında her zaman tam yol; toplu değiştirmede kaç tanesinin uygulandığını say (2026-10-26).

## FFmpeg, Pillow ve Python
- FFmpeg'de kare hızı ve kare sayısı (Uzun Video'da ölçüldü, 2026-10-19). `ffmpeg -i`'deki "fps" ortalamadır, kesilmiş videoda 30 yerine "30.02" görünür. Kare hızı `tbr` ile karşılaştırılıp alınır. `fps` süzgeci son kareyi atar → önüne `tpad=stop_mode=clone`, çıkışa `-frames:v N`. Her `-f rawvideo` çıkışına (sayarken de, Python'a kare akıtırken de) `-fps_mode passthrough` eklenir. Eklenmezse kare tekrarlanır ve atılır, görüntü sesten 1 kare kayar. Sınamanın başvurusu baştan çözüp `select='eq(n\,K)'` ile seçilen karedir; tekil `-ss` karesi aynı hatadan geçtiği için başvuru olamaz.
- İki ölçünün birbirine eşit çıkması doğru oldukları anlamına gelmez, planlanan değerle de karşılaştırılır: videoda ses ile görüntü eşitti ama ikisi de planlanandan 0,1 sn kısaydı. FFmpeg `loudnorm` zaman damgasını kaydırmış, `-t` sesi, `-shortest` görüntüyü kesmişti; çözüm zincirin sonuna `asetpts=N/SR/TB` (2026-10-19).
- Pillow (ve benzeri) ile yazı çizerken yazı tipinde olmayan karakter hata vermeden kutu (□) olur: Windows'ta Bahnschrift'te ≠ ≈ oklar ● yok, Georgia'da oklar yok, Segoe UI'da var. Özel işaretten önce yazı tipinin karakter tablosu fontTools ile denetlenir (2026-10-17).
- Paralel iş (çok süreçli çizim, derleme) başlatmadan önce tek sürecin tepe belleği ölçülür, süreç sayısı boş belleğe göre seçilir: 16 çekirdek var diye 8 süreç açmak (süreç başına ~1 GB) 6,5 GB boş belleği aşardı. Python'da Windows API'yi `ctypes` ile çağırırken `restype`/`argtypes` (HANDLE) tanımlanmazsa 64 bitte tanıtıcı kesilir, çağrı sessizce başarısız olur (ölçüm 0 MB döndü) (2026-10-17).

- Pillow `ImageDraw` RGBA görüntüde saydam rengi karıştırmaz, pikselin üstüne yazar (%4 beyaz çizgi bembeyaz çıktı, belirme animasyonu anında çıktı). Saydam çizim ya ayrı saydam katmana + `alpha_composite`, ya da RGB görüntü + `ImageDraw.Draw(im, "RGBA")`. "F" kipli görüntü `GaussianBlur` almaz → numpy ile bulanıklaştır (2026-10-26).
- Anlatımlı videoda efekt (bip, vuruş) kelimenin başına konmaz, ~0,25 sn arkasına ve alçak: kat bipi "On dört. On beş."i örttü, Whisper atladı. Karışımdan sonra `dinle.py` her cümleyi bulmalı (2026-10-26).
- İki videonun sesi karşılaştırılırken ikisi de aynı betik ve aynı yöntemle ölçülür: kelime arası maskesindeki ±0,05 sn ve pencere seçimi farkı konuşma–altlık farkını 7,0 ile 4,6 dB arasında oynattı, "müziği 3 dB yükselt" diye yanlış öneriye götürdü. Kanıtlanmış ölçüm betiğe bağlanır, örneğin değeri JSON'a kaydedilir. Ses hakkında "sessiz", "boğuk" gibi yargı ölçülmeden kurala yazılmaz (2026-10-26).
- FFmpeg ile video analizi (2026-10-25): `metadata=print` önüne `select` konmazsa her kareyi yazar, çıktıyı sohbete basma; dosyaya yazdırıp Python'la özetle. Süzgeçteki `file=C:/...` yolunun iki noktası süzgeci bozar: klasöre geçip göreli ad ver. Animasyonda sahneler çözülme ve kamera hareketiyle değiştiği için `scene`/`scdet` sabit eşiği kesmelerin çoğunu kaçırır: saniyede bir kare paftası daha güvenilir. `drawtext` Windows'ta fontconfig bulamazsa `fontfile='C\:/Windows/Fonts/arial.ttf'` ver.

## Tarayıcı ve Playwright
- Windows'ta `chrome.exe --version` sürüm basmaz, sahibin açık Chrome'una "yeni pencere aç" gönderir. Chrome'u yalnızca `--headless=new` ve ayrı `--user-data-dir` ile çalıştır; sürüm gerekiyorsa dosya bilgisinden oku (2026-10-02).
- Chrome 149'da CDP ağ kısıtlaması `127.0.0.1` adresine uygulanmıyor, `localhost`'a uygulanıyor. Hız ölçümü `localhost` ile yapılır (2026-10-02).
- Görsel bileşende "öğe var mı" değil "kullanıcı görüyor mu" sınanır: Playwright `toBeVisible` üst öğesi tarafından tamamen kırpılmış öğede de geçer, `toBeInViewport` kırpılmayı hesaba katar. Üçüncü taraf stil dosyası (ör. MapLibre) kendi kutusunun konumlandırmasını ezip sıfır yükseklik bırakabilir; ekran görüntüsüne gerçek içerikle gözle bakılır (Servis Takip'te harita ilk hâlinde hiç görünmüyordu, 2026-10-12).

## Web arayüzü ve sunucu (Next.js, PostgreSQL, istek sınırları)
- Next.js 16: `next dev` yapay zekâ aracını görünce CLAUDE.md'ye İngilizce blok ekler → `next.config`'te `agentRules: false`. Sayfa silince `.next/types` bayat kalıp tsc'yi düşürür → `rm -rf .next/types`. Vitest yapılandırması `.mts` olsun (ESM uyarısı) (2026-10-06).
- Büyük yazıda (%200) dar ekran: sütun sayısı verilmemiş CSS `grid` en geniş içeriğe göre genişleyip sayfayı kaydırır → `grid-cols-1`; "yatay kayma yok" testi tek başına yetmez, kutusundan taşan öğe de denetlenir. `role="alert"` aynı metinle yerinde kalırsa ekran okuyucu ikinci hatayı okumaz → gönderim sürerken bildirimi kaldır (2026-10-06).
- Giriş/deneme sınırları eşzamanlı isteklerle atlatılır (önce oku sonra say): sayaç baştan artırılır, satır `FOR UPDATE` ile kilitlenir, her sınıra eşzamanlılık testi yazılır. Önde tek güvenilir ters vekil varken istemci IP'si `x-forwarded-for`'un en sağından alınır; soldakini istemci yazar (2026-10-06).
- PostgreSQL EDB kurulumu Türkçe Windows'ta `initdb`'de düşer (yerel ayar adı ASCII değil) → kümeyi `--locale C` ile kur, Türkçe sıralamayı veritabanında ICU `tr-TR` ile ver. winget `--override` ile verilen şifre winget günlüğüne açık yazılır → kurulumdan sonra şifreyi değiştir (2026-10-06).

## Git ve GitHub
- Repoyu public yapmadan önce tüm dalların tüm geçmişi taranır, arşivlerin (zip) içi dahil. Pull Request'li repoda geçmişi yeniden yazmak yetmez, GitHub PR'ın eski commit'lerini tutar → temiz geçmiş yeni repoya gönderilir, eskisi `-ozel` adıyla private kalır. `gh` oturumunda `workflow` izni yok: `.github/workflows` içeren repoyu göndermek için önce `gh auth refresh -h github.com -s workflow` (2026-10-08).
- `git-filter-repo --force` taze olmayan kopyada `origin`'deki uzak dalları yerel dal olarak geri açar (silinmiş eski dal geri geldi) → yeniden yazımdan önce `git bundle create … --all` ile yedek, sonra `git branch` bakılır, ana dalın içinde kalanlar silinir; dosya ağacının özeti (`HEAD^{tree}`) önce ve sonra aynı olmalı (2026-10-16).
- GitHub kişisel hesaptaki repoda ortağa "admin" verilemez (API 422 döner); yetki seçimi yalnızca organizasyon repolarında var. Yetki sormadan önce repo sahibinin kişi mi organizasyon mu olduğuna bak (2026-10-18).
- PowerShell 5.1'de `git commit -m @'…'@` mesajı içinde çift tırnak (`"…"`) varsa argümanlar bölünür, commit düşer ve sonraki `git add` + commit hepsini tek commit'e toplar → mesaj dosyaya yazılıp `git commit -F dosya`; zincirde her commit'ten sonra `$?` kontrolü. Yeni repoda ilk commit'ten sonra `git status -sb` ile upstream ve push durumuna bakılır (ilk commit bir hafta gönderilmeden kalmıştı) (2026-10-25).

## Claude Code, eklentiler ve modeller
- `/effort xhigh` yazmak oturumluk değil kalıcıdır; oturumluk yükseltme için `/effort` → seç → `s` (2026-10-02).
- `MAX_THINKING_TOKENS` Opus 5.5'te işe yaramaz; düşünme miktarı yalnızca effort ile ayarlanır (2026-10-02).
- Videolardaki model fiyatı ve "kaç kat pahalı" oranları eskiyebilir; güncel belgeden doğrula. 2026-10-02'de Haiku 4.5 / Sonnet 5.5 / Opus 5.5 = 1 / 2 / 4 $ (girdi, milyon token).
- `/plugin` komutları VS Code panelinde çalışmaz; eklentiyi `claude.exe plugin ...` ile kur (2026-10-02).
- Durum satırı (`statusLine`) VS Code sohbet panelinde görünmez, yalnızca terminal modunda görünür (2026-10-02).
- Dış kaynaklı skill'ler kendi kütüphane tercihlerini dayatabilir (ör. ECC `react-native-patterns`: TanStack, NativeWind, Expo SDK 55). Eklemeden önce projenin `package.json`'ıyla karşılaştır; uymuyorsa alma (2026-10-02).
- Toplu paketler (ör. ECC: 293 skill, 68 ajan) bütün olarak kurulmaz; liste yükü tasarrufu yok eder. Yalnızca gereken parça incelenip alınır (2026-10-02).
- `ANTHROPIC_BASE_URL` ile başka bir sağlayıcıya (ör. Qwen) geçmek token tasarrufu değildir: veri üçüncü tarafa gider, araç arama ve Remote Control kapanır (2026-10-02).
- Ekranı olan projede eklenti önerisine kapalı duran tasarım skill'lerini (`ui-ux-pro-max`, `frontend-design`) de koy; Servis Takip'te unutuldu, sahip sordu (2026-10-06).
- Sahip yavaşlıktan şikâyet etti: `settings.json`'daki kalıcı `effortLevel` `xhigh` çıktı, standart `high` diyordu. Yavaşlık ya da token şikâyetinde önce ayar dosyası belgeyle karşılaştırılır (2026-10-20).

## Genel
- Bir ölçüyü ölçmeden yazma: "3-4 kat tasarruf" tahmini gerçek dosyada %25-50 çıktı. Kod açıklamasına ve belgeye ölçülen sayı yazılır (2026-10-12).
- Kural dosyaları (genel 24 bin, Shorts 22 bin, gündem kanalı 28 bin karakter) her mesajda yeniden okunuyordu. CLAUDE.md'de yalnızca geçerli kural ve tuzak kalır; tarihli gerekçe, üretilenler ve çözülmüş hatalar otomatik yüklenmeyen dosyaya (`GECMIS.md`, bu dosya) taşınır (2026-10-20).
