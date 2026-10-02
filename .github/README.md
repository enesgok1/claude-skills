# 🧰 Claude Skill'leri

Claude Code'un tüm projelerde kullandığı, Türkiye'ye yönelik uygulama ve sitelerde işe yarayan skill'ler. Claude yazdı; Sonra Bakarım ve sevgilify projelerinde kullanılıyor.

| Skill | Ne işe yarar |
|---|---|
| [`turkce-arayuz-metni`](../turkce-arayuz-metni/SKILL.md) | Doğal Türkçe arayüz metni: ton, düğme ve hata mesajları, dinamik değerlere ek getirme ("Trendyol'dan", "PTT'ye", "3'te"), `tr-TR` büyük/küçük harf, para ve tarih biçimleri |
| [`kvkk-kontrol-listesi`](../kvkk-kontrol-listesi/SKILL.md) | Kişisel veri işleyen özellikler için KVKK ve İYS mühendislik kontrol listesi. Hukuki görüş değildir. |
| [`sahip-belgeleri`](../sahip-belgeleri/SKILL.md) | Kod yazmayan ürün sahibi için yol haritası, emojili yapılacaklar listesi ve proje CLAUDE.md'si düzeni |

## 📁 Nasıl çalışır

Bu depo doğrudan bilgisayardaki `~/.claude/skills/` klasörüdür. Claude Code bu klasördeki skill'leri her projede kullanır.

Klasörde başka kaynaklardan kurulan skill'ler de durur (frontend-design, ui-ux-pro-max, claude.ai'den eşitlenenler). `.gitignore` her şeyi dışarıda bırakır, yalnızca yukarıdaki üç skill'i depoya alır. Bu yüzden bir skill düzenlenince ayrı bir kopyayı güncellemek gerekmez: commit ve push yeter.

## 💻 Başka bir bilgisayara kurmak

`~/.claude/skills/` klasörü henüz yoksa:

```bash
git clone https://github.com/hayrigok/claude-skills.git ~/.claude/skills
```

Klasör varsa (içinde başka skill'ler duruyorsa):

```bash
cd ~/.claude/skills
git init -b main
git remote add origin https://github.com/hayrigok/claude-skills.git
git pull origin main
git branch --set-upstream-to=origin/main
```

⚠️ Klasörde bu depodaki skill'lerle aynı adlı bir klasör varsa `git pull` durur. Önce o klasörü silin ya da yeniden adlandırın.

Kurulumdan sonra Claude Code'u yeniden başlatın. Skill'ler tüm projelerde görünür.

## 📦 Tek bir projeye eklemek

Skill'in klasörünü projenin `.claude/skills/` klasörüne kopyalayıp projeyle birlikte commit edin. Böylece projeyi açan herkes ve bulut oturumları da skill'i görür. Bu kopya depodan bağımsızdır; depodaki skill güncellenince elle yenilenir.

## ➕ Yeni skill eklemek

1. `~/.claude/skills/<ad>/SKILL.md` dosyasını yazın.
2. `.gitignore`'a `!/<ad>/` satırını ekleyin.
3. Bu README'deki tabloya ekleyin, commit edip push edin.
