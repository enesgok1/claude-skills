# 🧰 Claude Skill'leri ve Çalışma Standardı

Claude Code'un tüm projelerde kullandığı kişisel çalışma standardı ve Türkiye'ye yönelik uygulama ve sitelerde işe yarayan skill'ler. Claude yazdı; Sonra Bakarım ve sevgilify projelerinde kullanılıyor.

| Dosya | Ne işe yarar |
|---|---|
| [`CALISMA-STANDARDI.md`](../CALISMA-STANDARDI.md) | Sahibin tüm projelerdeki çalışma kuralları: iletişim, kalite çıtası, doğrulama, git ve push onayı, güvenlik, belgeler, tasarım, token tasarrufu ve context-mode eklentisi. Bilgisayarda `~/.claude/CLAUDE.md` olarak durur. |
| [`turkce-arayuz-metni`](../turkce-arayuz-metni/SKILL.md) | Doğal Türkçe arayüz metni: ton, düğme ve hata mesajları, dinamik değerlere ek getirme ("Trendyol'dan", "PTT'ye", "3'te"), `tr-TR` büyük/küçük harf, para ve tarih biçimleri |
| [`kvkk-kontrol-listesi`](../kvkk-kontrol-listesi/SKILL.md) | Kişisel veri işleyen özellikler için KVKK ve İYS mühendislik kontrol listesi. Hukuki görüş değildir. |
| [`sahip-belgeleri`](../sahip-belgeleri/SKILL.md) | Kod yazmayan ürün sahibi için yol haritası, emojili yapılacaklar listesi ve proje CLAUDE.md'si düzeni |

## 📁 Nasıl çalışır

- **Skill'ler:** Bu depo doğrudan bilgisayardaki `~/.claude/skills/` klasörüdür. Claude Code bu klasördeki skill'leri her projede kullanır. Klasörde başka kaynaklardan kurulan skill'ler de durur (frontend-design, ui-ux-pro-max, claude.ai'den eşitlenenler); `.gitignore` onları dışarıda bırakır, yalnızca yukarıdaki dosyaları depoya alır.
- **Çalışma standardı:** Claude Code standardı `~/.claude/CLAUDE.md`'den okur. Bu depoda kopyası durur: `CALISMA-STANDARDI.md`. `~/.claude` klasörünün kendisi depo yapılmaz, çünkü içinde giriş bilgileri ve oturum kayıtları var.

## 💻 Yeni bir bilgisayara kurmak

En kolayı: Claude Code'u kurup GitHub'a giriş yaptıktan sonra Claude'a **"github.com/hayrigok/claude-skills deposunu README'ye göre kur"** yazmak. Depo özel olduğu için bilgisayarda GitHub hesabıyla giriş yapılmış olmalı (`gh auth login` ya da ilk `git clone`'da açılan giriş penceresi).

Elle kurmak için:

**1. Skill'ler.** `~/.claude/skills/` klasörü henüz yoksa:

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

**2. Çalışma standardı.** Kopyayı Claude Code'un okuduğu yere koyun. O bilgisayarda zaten bir `~/.claude/CLAUDE.md` varsa önce yedekleyin, çünkü üstüne yazılır.

```bash
cp ~/.claude/skills/CALISMA-STANDARDI.md ~/.claude/CLAUDE.md
```

Windows PowerShell'de: `Copy-Item "$HOME\.claude\skills\CALISMA-STANDARDI.md" "$HOME\.claude\CLAUDE.md"`

**3. Token tasarrufu ayarları ve context-mode eklentisi.** Çalışma standardının "Token tasarrufu" ve "context-mode eklentisi" bölümleri bunlara dayanır.

- `~/.claude/settings.json` dosyasına şunları ekleyin (dosyada başka ayarlar varsa silmeden yanlarına):

  ```json
  "env": { "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "50" },
  "modelSettings": { "claude-opus-5-5": { "effortLevel": "high" } },
  "statusLine": { "type": "command", "command": "node \"C:/Users/<kullanıcı>/.claude/skills/statusline.mjs\"" }
  ```

  `statusLine`, bu depodaki [`statusline.mjs`](../statusline.mjs) betiğiyle terminalin altında Türkçe bir durum satırı gösterir: model ve düşünme seviyesi, bağlam doluluğu, 5 saatlik ve haftalık kullanım hakkı, git dalı. Yolda ters bölü değil `/` kullanın. Durum satırı yalnızca terminalde görünür, VS Code'un sohbet panelinde görünmez.

- context-mode eklentisini kurun ([mksglu/context-mode](https://github.com/mksglu/context-mode)). Terminal sürümünde `/plugin` komutlarıyla, VS Code'da eklentinin içindeki `claude.exe` ile:

  ```bash
  claude plugin marketplace add mksglu/context-mode
  claude plugin install context-mode@context-mode
  ```

  Windows'ta `claude` yerine `~/.vscode/extensions/anthropic.claude-code-*/resources/native-binary/claude.exe` yazılır. Kurulumdan sonra Claude'a `ctx doctor` yazdırarak çalıştığını doğrulayın.

- Kullanım ölçme aracı [claude-usage](https://github.com/phuryn/claude-usage) (yerel, veri göndermez): `uv tool install git+https://github.com/phuryn/claude-usage@3eea154` (2026-10-02'de incelenen sürüm). Sonra `claude-usage scan` ve `claude-usage today`.

- **Eklentiler varsayılan olarak kapalı:** Eklentileri kurduktan sonra `~/.claude/settings.json` içindeki `enabledPlugins` değerlerini `false` yapın; yalnızca token tasarrufu sağlayan `context-mode@context-mode` `true` kalır. Her projede gereken eklentiler, sahibin onayıyla o projenin `.claude/settings.local.json` dosyasında açılır (çalışma standardı → "Eklenti ve skill seçimi").

**4.** Claude Code'u yeniden başlatın. Standart, skill'ler ve eklenti tüm projelerde geçerli olur.

## 🔄 Güncel tutmak

**Bir bilgisayarda değişiklik yapınca:**

```bash
cp ~/.claude/CLAUDE.md ~/.claude/skills/CALISMA-STANDARDI.md   # standart değiştiyse
cd ~/.claude/skills
git add -A
git commit -m "<ne değişti>"
git push
```

**Öbür bilgisayarda değişiklikleri almak:**

```bash
cd ~/.claude/skills
git pull
cp ~/.claude/skills/CALISMA-STANDARDI.md ~/.claude/CLAUDE.md
```

## 📦 Tek bir projeye eklemek

Skill'in klasörünü projenin `.claude/skills/` klasörüne kopyalayıp projeyle birlikte commit edin. Böylece projeyi açan herkes ve bulut oturumları da skill'i görür. Bu kopya depodan bağımsızdır; depodaki skill güncellenince elle yenilenir.

## ➕ Yeni skill eklemek

1. `~/.claude/skills/<ad>/SKILL.md` dosyasını yazın.
2. `.gitignore`'a `!/<ad>/` satırını ekleyin.
3. Bu README'deki tabloya ekleyin, commit edip push edin.
